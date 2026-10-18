#!/usr/bin/env bash
# Remove PropertyWebsite (/property) from Oracle. Keeps Muzakkir + Qutub.
set -euo pipefail

sudo cp /etc/nginx/sites-available/muzakkir \
  "/etc/nginx/sites-available/muzakkir.bak.$(date +%Y%m%d%H%M%S)"

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
}
EOF

sudo nginx -t
sudo systemctl reload nginx

sudo rm -rf /var/www/property /var/www/realestate

echo "--- /var/www ---"
ls /var/www/
echo "--- checks ---"
curl -s -o /dev/null -w "Muzakkir /muzakkir/ -> HTTP %{http_code}\n" "http://127.0.0.1/muzakkir/"
curl -s -o /dev/null -w "Property /property/ -> HTTP %{http_code}\n" "http://127.0.0.1/property/"
