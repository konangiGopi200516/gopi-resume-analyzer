const fs = require('fs');
let code = fs.readFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', 'utf8');

code = code.replace(/title="Summary"/g, 'title="Professional Summary"');
code = code.replace(/>Summary<\/h2>/g, '>Professional Summary</h2>');

fs.writeFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', code, 'utf8');
console.log("Replaced Summary with Professional Summary in PreviewPanel.tsx");
