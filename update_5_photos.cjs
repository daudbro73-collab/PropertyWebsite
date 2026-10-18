const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'properties.js');
let content = fs.readFileSync(filePath, 'utf8');

// We want to replace the images array with the local image + 4 unsplash images
// The local image is always the first item matching `/images/[id].png`
content = content.replace(/images:\s*\[([\s\S]*?)\]/g, (match, inner) => {
  // Extract the first local image path
  const localImageMatch = inner.match(/['"](\/images\/[^'"]+)['"]/);
  const localImage = localImageMatch ? localImageMatch[1] : '';

  return `images: [
      '${localImage}',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80'
    ]`;
});

fs.writeFileSync(filePath, content);
console.log('Updated properties.js with 5 photos');
