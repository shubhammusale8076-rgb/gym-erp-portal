const fs = require('fs');

function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace import
  content = content.replace(/import axios from 'axios';/g, "import axios from './axiosInstance';");
  
  // Remove token from params
  content = content.replace(/,\s*token/g, '');
  content = content.replace(/token,\s*/g, '');
  content = content.replace(/\(token\)/g, '()');
  
  // Remove manual headers argument
  content = content.replace(/,\s*\{\s*headers:\s*\{\s*(?:"Authorization"|Authorization):\s*`Bearer \$\{token\}`\s*\}\s*\}/g, '');
  
  fs.writeFileSync(filePath, content);
}

refactorFile('src/apiservice/apiservice.js');
refactorFile('src/apiservice/apiGoogle.js');
