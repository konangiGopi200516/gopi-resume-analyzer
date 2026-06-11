const fs = require('fs');
let code = fs.readFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', 'utf8');

const additionalSections = `
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
            )}
            {resumeData.certifications && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Certifications</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.certifications.split('\\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.achievements && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Achievements</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.achievements.split('\\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.hackathons && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Hackathons & Competitions</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.hackathons.split('\\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.extracurriculars && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Extracurriculars</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.extracurriculars.split('\\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
`;

// Helper to inject before the closing div sequence of a layout
function injectBefore(layoutComment, endingStr, injection) {
  const parts = code.split(layoutComment);
  if (parts.length < 2) return;
  const layoutContent = parts[1];
  
  const nextLayoutIndex = layoutContent.indexOf('// Layout');
  let targetArea = nextLayoutIndex !== -1 ? layoutContent.substring(0, nextLayoutIndex) : layoutContent;
  
  const injectIdx = targetArea.lastIndexOf(endingStr);
  if (injectIdx !== -1) {
    targetArea = targetArea.substring(0, injectIdx) + injection + targetArea.substring(injectIdx);
  }
  
  parts[1] = targetArea + (nextLayoutIndex !== -1 ? layoutContent.substring(nextLayoutIndex) : '');
  code = parts[0] + layoutComment + parts[1];
}

// Layout 1: Append to right column (before last 3 closing divs)
// Right column ends with:
//            )}
//          </div>
//        </div>
//      </div>
//    );
injectBefore('// Layout 2:', '</div>\n        </div>\n      </div>\n    );', additionalSections);

// Layout 2: Right Sidebar
injectBefore('// Layout 3:', '</div>\n        </div>\n      </div>\n    );', additionalSections);

// Layout 3: Creative Designer
injectBefore('// Layout 4:', '</div>\n          </div>\n        </div>\n      </div>\n    );', additionalSections);

// Layout 4: Top Header Dark
injectBefore('// Layout 5:', '</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    );', additionalSections);

// Layout 5: Modern Card
injectBefore('// Layout 6:', '</div>\n        </div>\n      </div>\n    );', additionalSections);

// Layout 6: Executive Professional
injectBefore('// Layout 7:', '</div>\n        </div>\n      </div>\n    );', additionalSections);

// Layout 7: ATS Friendly
injectBefore('// Layout 8:', '</div>\n        </div>\n      </div>\n    );', additionalSections);

// Layout 8: Minimalist
injectBefore('// Default Layout', '</div>\n          </div>\n        </div>\n      </div>\n    );', additionalSections);


fs.writeFileSync('e:/Resume Analyzer/frontend/src/components/editor/PreviewPanel.tsx', code, 'utf8');
console.log("Injected sections into PreviewPanel!");
