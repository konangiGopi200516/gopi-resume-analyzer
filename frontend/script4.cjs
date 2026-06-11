const fs = require('fs');
let code = fs.readFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', 'utf8');

const projectsBlock = `
            {resumeData.projects && resumeData.projects.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Projects</h2>
                <div className="space-y-3">
                  {resumeData.projects.map(proj => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-[12px]">{proj.name}</h3>
                      <ul className="list-disc list-outside ml-4 text-[11px] mt-1 text-gray-700">
                        {proj.description.split('\\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}`;

// Find each <div className="col-span-full w-full grid-cols-1 flex flex-col space-y-4">
// We will inject the projectsBlock right after it.
// But we should ONLY inject it if the layout doesn't already have projects natively.
// We know Layout 1, Layout 2, and Fallback have native projects.
// Let's do it by layout index.

const layoutMarkers = [
  '// Layout 1:',
  '// Layout 2:',
  '// Layout 3:',
  '// Layout 4:',
  '// Layout 5:',
  '// Layout 6:',
  '// Layout 7:',
  '// Layout 8:',
  '// Default Layout'
];

let newCode = '';
let currentLayoutIdx = 0;
let parts = code.split('<div className="col-span-full w-full grid-cols-1 flex flex-col space-y-4">');

for (let i = 0; i < parts.length; i++) {
  newCode += parts[i];
  if (i < parts.length - 1) {
    newCode += '<div className="col-span-full w-full grid-cols-1 flex flex-col space-y-4">';
    // The injected div belongs to layout i+1 (Layout 1 is parts[1])
    // So parts[1] is Layout 1, parts[2] is Layout 2, parts[8] is Layout 8.
    // Layout 1 (i=0 -> 1), Layout 2 (i=1 -> 2), Default (i=8 -> Fallback).
    // Let's check if the layout chunk has `resumeData.projects.map` natively!
    // Since we removed the injected ones, if it has `resumeData.projects.map`, it's native.
    const layoutContent = parts[i];
    if (!layoutContent.includes('resumeData.projects.map')) {
       newCode += projectsBlock;
    }
  }
}

fs.writeFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', newCode, 'utf8');
console.log("Added missing projects blocks back");
