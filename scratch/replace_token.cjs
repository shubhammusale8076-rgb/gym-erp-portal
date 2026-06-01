const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('localStorage.getItem("token")') || 
      content.includes("localStorage.getItem('token')") ||
      content.includes('localStorage.getItem("userId")') ||
      content.includes('localStorage.getItem("role")') ||
      content.includes("localStorage.getItem('userId')") ||
      content.includes("localStorage.getItem('role')")) {
      
    content = content.replace(/localStorage\.getItem\(['"]token['"]\)/g, 'getToken()');
    content = content.replace(/localStorage\.getItem\(['"]userId['"]\)/g, 'getUserId()');
    content = content.replace(/localStorage\.getItem\(['"]role['"]\)/g, 'getRole()');
    
    // Add imports if needed
    if (!content.includes('import { getToken') && !content.includes('import { getUserId') && !content.includes('import { getRole') && !content.includes('import { isAuthenticated')) {
      // Calculate relative path to utils/auth
      const depth = file.split(path.sep).length - 2; // src/ is depth 0
      let relativePath = '';
      if (depth === 0) relativePath = './utils/auth';
      else if (depth === 1) relativePath = '../utils/auth';
      else if (depth === 2) relativePath = '../../utils/auth';
      else if (depth === 3) relativePath = '../../../utils/auth';
      else if (depth === 4) relativePath = '../../../../utils/auth';
      
      const importLine = `import { getToken, getUserId, getRole } from '${relativePath}';\n`;
      content = importLine + content;
    }
    
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
