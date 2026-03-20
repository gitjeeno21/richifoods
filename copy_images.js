const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'pic assets');
const destDir = path.join(__dirname, 'public', 'images', 'products');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.png')) {
    let newName = file.toLowerCase().replace(/ /g, '_');
    if (newName === 'pineapple.png') newName = 'pine_apple.png';
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
  }
});
console.log('Images extracted successfully!');
