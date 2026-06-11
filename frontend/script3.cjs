const fs = require('fs');
let code = fs.readFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', 'utf8');

// Regex to find the injected projects block:
const regex = /\{resumeData\.projects \&\& resumeData\.projects\.length > 0 \&\& \([\s\S]*?<\/section>\s*\)\}/g;

// Instead of removing all, let's replace the injected `projects` block with an empty string, 
// EXCEPT we will check if the layout already has `projects` before we strip it out?
// Actually, it's easier to just remove ALL of the newly injected `projects` blocks:
code = code.replace(regex, '');

fs.writeFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', code, 'utf8');
console.log("Removed injected projects blocks");
