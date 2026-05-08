const fs = require('fs');

const files = [
  'src/pages/Location.jsx',
  'src/pages/ProductDetail.jsx',
  'src/pages/BlogPost.jsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/\\`/g, '`');
    fs.writeFileSync(f, content);
    console.log('Fixed backticks in', f);
  }
});
