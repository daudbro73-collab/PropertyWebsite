#!/usr/bin/env bash
# Deploy Archipelago PropertyWebsite to Oracle at /property/
# Alongside Muzakkir (/muzakkir/) and optionally Qutub (/qutub/)
set -euo pipefail

SERVER_HOST="${DEPLOY_HOST:-92.5.234.30}"
SERVER_USER="${DEPLOY_USER:-ubuntu}"
SSH_KEY="${DEPLOY_KEY:-$HOME/Desktop/ssh-key-2026-06-26.key}"
REMOTE_DIR="/var/www/property"
BASE_PATH="/property/"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f "$SSH_KEY" ]]; then
  echo "SSH key not found: $SSH_KEY"
  exit 1
fi
chmod 600 "$SSH_KEY"

echo "==> Building PropertyWebsite (base ${BASE_PATH})..."
VITE_BASE_PATH="${BASE_PATH}" npm run build

echo "==> Preparing remote dir ${REMOTE_DIR}/..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}" \
  "sudo mkdir -p ${REMOTE_DIR} && sudo chown -R ubuntu:ubuntu ${REMOTE_DIR}"

echo "==> Uploading dist/..."
rsync -avz --delete \
  -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new" \
  "$ROOT/dist/" "${SERVER_USER}@${SERVER_HOST}:${REMOTE_DIR}/"

# Remove old /realestate path if present
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}" \
  "sudo rm -rf /var/www/realestate || true"

echo "==> Updating nginx (/property/ + /muzakkir/ + /qutub/)..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}" bash -s << 'REMOTE'
set -euo pipefail

sudo tee /etc/nginx/sites-available/muzakkir > /dev/null << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 10m;

    location = / {
        return 302 /muzakkir/;
    }

    location = /muzakkir {
        return 301 /muzakkir/;
    }

    location /muzakkir/ {
        proxy_pass http://127.0.0.1:3001/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location = /qutub {
        return 301 /qutub/;
    }

    location /qutub/ {
        root /var/www;
        try_files $uri $uri/ /qutub/index.html;
    }

    location = /property {
        return 301 /property/;
    }

    # Static property images — never fall back to SPA HTML
    location /property/images/ {
        root /var/www;
        try_files $uri =404;
        expires 7d;
        add_header Cache-Control "public";
    }

    location /property/ {
        root /var/www;
        try_files $uri $uri/ /property/index.html;
    }

    location = /realestate {
        return 301 /property/;
    }

    location /realestate/ {
        return 301 /property/;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/muzakkir /etc/nginx/sites-enabled/muzakkir
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "Property files:"
du -sh /var/www/property
curl -sf -o /dev/null -w "Root / → HTTP %{http_code}\n" "http://127.0.0.1/" || true
curl -sf -o /dev/null -w "Muzakkir /muzakkir/ → HTTP %{http_code}\n" "http://127.0.0.1/muzakkir/" || true
curl -sf -o /dev/null -w "Property /property/ → HTTP %{http_code}\n" "http://127.0.0.1/property/" || true
curl -sf -o /dev/null -w "Qutub /qutub/ → HTTP %{http_code}\n" "http://127.0.0.1/qutub/" || true
REMOTE

echo ""
echo "=========================================="
echo "  Property deployed!"
echo "  Site:  http://${SERVER_HOST}/property/"
echo "  Admin: http://${SERVER_HOST}/property/admin"
echo "  Password: admin123"
echo "  Muzakkir: http://${SERVER_HOST}/muzakkir/"
echo "=========================================="
