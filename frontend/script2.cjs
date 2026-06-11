const fs = require('fs');
let code = fs.readFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', 'utf8');

// The block we injected starts with `{resumeData.projects && resumeData.projects.length > 0 && (`
// and ends with the Extracurriculars block.

// Let's use a regex to find the entire injected block and wrap it in `<div className="col-span-full w-full space-y-4">`
const regex = /(\{resumeData\.projects \&\& resumeData\.projects\.length > 0 \&\& \([\s\S]*?\{resumeData\.extracurriculars\.split\('\\n'\)\.filter\(Boolean\)\.map\(\(line, i\) => <li key=\{i\}>\{line\}<\/li>\)\}\s*<\/ul>\s*<\/section>\s*\)\})/g;

code = code.replace(regex, '<div className="col-span-full w-full grid-cols-1 flex flex-col space-y-4">\n$1\n</div>');

fs.writeFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', code, 'utf8');
console.log("Wrapped injected sections with col-span-full");
