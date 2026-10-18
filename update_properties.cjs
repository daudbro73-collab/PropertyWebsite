const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'properties.js');
let content = fs.readFileSync(filePath, 'utf8');

// The regex will find images: ['...'] and add two more images
content = content.replace(/images:\s*\[([^\]]+)\]/g, (match, inner) => {
  if (inner.includes('unsplash.com')) return match; // already updated
  return `images: [
      ${inner.trim()},
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
    ]`;
});

fs.writeFileSync(filePath, content);
console.log('Updated properties.js');
