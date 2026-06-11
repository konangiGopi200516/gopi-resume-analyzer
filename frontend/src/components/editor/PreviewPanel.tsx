import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

export const PreviewPanel = () => {
  const { resumeData } = useResumeStore();
  const theme = resumeData.theme || {};
  const themeColor = theme.color || '#059669';
  const themeFont = theme.fontFamily || 'Inter';
  
  // Style mapping
  const getLineHeightClass = () => {
    if (theme.lineHeight === 'Compact') return 'leading-tight';
    if (theme.lineHeight === 'Spacious') return 'leading-loose';
    return 'leading-relaxed';
  };

  const getSpacingClass = () => {
    if (theme.spacing === 'Compact') return 'mb-3';
    if (theme.spacing === 'Relaxed') return 'mb-10';
    return 'mb-6';
  };

  const isTwoColumn = theme.layout === 'Two Column';

  // Skills rendering logic
  const renderSkills = (skillsText: string) => {
    if (!skillsText) return null;
    const skillsList = skillsText.split(',').map(s => s.trim()).filter(Boolean);
    
    if (theme.skillsStyle === 'Tags') {
      return (
        <div className="flex flex-wrap gap-2 mt-1">
          {skillsList.map((skill, i) => (
            <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
              {skill}
            </span>
          ))}
        </div>
      );
    }
    
    if (theme.skillsStyle === 'Progress Bars') {
      return (
        <div className="space-y-2 mt-2">
          {skillsList.map((skill, i) => (
            <div key={i} className="flex items-center text-xs">
              <span className="w-1/3 truncate pr-2 font-medium">{skill}</span>
              <div className="w-2/3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${Math.floor(Math.random() * 30 + 70)}%`, backgroundColor: themeColor }} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (theme.skillsStyle === 'Stars') {
      return (
        <div className="space-y-1 mt-1">
          {skillsList.map((skill, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="font-medium">{skill}</span>
              <div className="flex text-yellow-400 text-[10px]">
                ★★★★<span className="text-gray-300">★</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Default: Compact Text
    return <p className="mt-1">{skillsText}</p>;
  };

  const renderPhoto = () => {
    if (theme.photoStyle === 'Hidden') return null;
    
    let borderRadius = '0%';
    if (theme.photoStyle === 'Circular') borderRadius = '50%';
    if (theme.photoStyle === 'Rounded') borderRadius = '1rem';
    
    return (
      <div 
        className="w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden flex-shrink-0"
        style={{ borderRadius }}
      >
        {resumeData.personalInfo.photo ? (
          <img 
            src={resumeData.personalInfo.photo} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[10px] uppercase text-center px-2">Photo Placeholder</span>
        )}
      </div>
    );
  };

  const SectionHeader = ({ title, color = themeColor }: { title: string, color?: string }) => (
    <h2 className="text-sm font-bold mb-3 uppercase tracking-widest border-b pb-1" style={{ color: color, borderColor: color }}>
      {title}
    </h2>
  );

  // Layout 1: Left Sidebar
  if (theme.template === 'Left Sidebar' || theme.template === 'Modern Professional') {
    return (
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center items-start custom-scrollbar">
        <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] bg-white shadow-xl flex" style={{ fontFamily: themeFont }}>
          <div className="w-[35%] flex flex-col" style={{ backgroundColor: themeColor }}>
            <div className="p-8 pb-6 bg-black/10">
              {renderPhoto()}
              <h1 className="text-3xl font-extrabold text-white mt-4 leading-tight uppercase">{resumeData.personalInfo.name}</h1>
              <p className="text-sm font-bold text-white/80 mt-2">{resumeData.personalInfo.title}</p>
            </div>
            <div className="p-8 text-white space-y-8 flex-1">
              <section>
                <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest border-b border-white/20 pb-1 mb-3">Contact</h2>
                <div className="space-y-2 text-[11px] font-medium">
                  {resumeData.personalInfo.phone && <p>📞 {resumeData.personalInfo.phone}</p>}
                  {resumeData.personalInfo.email && <p>✉ {resumeData.personalInfo.email}</p>}
                  {resumeData.personalInfo.location && <p>📍 {resumeData.personalInfo.location}</p>}
                </div>
              </section>
              <section>
                <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest border-b border-white/20 pb-1 mb-3">Education</h2>
                <div className="space-y-4">
                  {resumeData.education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-sm text-white">{edu.degree}</h3>
                      <p className="text-[11px] text-white/80 mt-0.5">{edu.school}</p>
                      <p className="text-[10px] text-white/60 mt-0.5">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
          <div className="w-[65%] p-8 space-y-6">
            {resumeData.summary && (
              <section>
                <SectionHeader title="Professional Summary" color={themeColor} />
                <p className={`text-gray-700 text-[12px] whitespace-pre-wrap ${getLineHeightClass()}`}>{resumeData.summary}</p>
              </section>
            )}
            {resumeData.experience.length > 0 && (
              <section>
                <SectionHeader title="Experience" color={themeColor} />
                <div className="space-y-4">
                  {resumeData.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-900 text-[13px]">{exp.role}</h3>
                        <span className="text-[10px] font-semibold text-gray-500">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <p className="text-[11px] font-medium text-gray-600 mb-1">{exp.company}</p>
                      <ul className={`list-disc list-outside ml-4 text-gray-700 text-[12px] ${getLineHeightClass()}`}>
                        {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {resumeData.projects.length > 0 && (
              <section>
                <SectionHeader title="Projects" color={themeColor} />
                <div className="space-y-3">
                  {resumeData.projects.map(proj => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-gray-900 text-[12px]">{proj.name}</h3>
                      <ul className={`list-disc list-outside ml-4 text-gray-700 text-[11px] mt-1 ${getLineHeightClass()}`}>
                        {proj.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Layout 2: Right Sidebar
  if (theme.template === 'Right Sidebar') {
    return (
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center items-start custom-scrollbar">
        <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] bg-white shadow-xl flex flex-row-reverse" style={{ fontFamily: themeFont }}>
          <div className="w-[35%] flex flex-col" style={{ backgroundColor: themeColor }}>
            <div className="p-8 pb-6 bg-black/10 flex flex-col items-end text-right">
              {renderPhoto()}
              <h1 className="text-3xl font-extrabold text-white mt-4 leading-tight uppercase">{resumeData.personalInfo.name}</h1>
              <p className="text-sm font-bold text-white/80 mt-2">{resumeData.personalInfo.title}</p>
            </div>
            <div className="p-8 text-white space-y-8 flex-1 text-right">
              <section>
                <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest border-b border-white/20 pb-1 mb-3">Contact</h2>
                <div className="space-y-2 text-[11px] font-medium">
                  {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
                  {resumeData.personalInfo.email && <p>{resumeData.personalInfo.email}</p>}
                  {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
                </div>
              </section>
              <section>
                <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest border-b border-white/20 pb-1 mb-3">Skills</h2>
                <div className="text-[11px]">
                  {renderSkills(resumeData.skills.languages)}
                  {renderSkills(resumeData.skills.frameworks)}
                </div>
              </section>
            </div>
          </div>
          <div className="w-[65%] p-8 space-y-6">
            {resumeData.summary && (
              <section>
                <SectionHeader title="Professional Summary" color={themeColor} />
                <p className={`text-gray-700 text-[12px] whitespace-pre-wrap ${getLineHeightClass()}`}>{resumeData.summary}</p>
              </section>
            )}
            {resumeData.experience.length > 0 && (
              <section>
                <SectionHeader title="Experience" color={themeColor} />
                <div className="space-y-4">
                  {resumeData.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-900 text-[13px]">{exp.role}</h3>
                        <span className="text-[10px] font-semibold text-gray-500">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <p className="text-[11px] font-medium text-gray-600 mb-1">{exp.company}</p>
                      <ul className={`list-disc list-outside ml-4 text-gray-700 text-[12px] ${getLineHeightClass()}`}>
                        {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          
            <div className="col-span-full w-full grid-cols-1 flex flex-col space-y-4">

            {resumeData.certifications && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Certifications</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.certifications.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.achievements && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Achievements</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.achievements.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.hackathons && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Hackathons & Competitions</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.hackathons.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.extracurriculars && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Extracurriculars</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.extracurriculars.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
</div>
</div>
        </div>
      </div>
    );
  }

  // Layout 3: Creative Designer (Dark Sidebar)
  if (theme.template === 'Creative Designer') {
    return (
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center items-start custom-scrollbar">
        <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] bg-white shadow-xl flex" style={{ fontFamily: themeFont }}>
          <div className="w-[30%] text-white p-8 space-y-8" style={{ backgroundColor: themeColor }}>
            <div className="flex justify-center">{renderPhoto()}</div>
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3">Contact</h2>
              <div className="space-y-2 text-[11px]">
                {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
                {resumeData.personalInfo.email && <p className="break-words">{resumeData.personalInfo.email}</p>}
                {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
                {resumeData.personalInfo.linkedin && <p className="break-words">{resumeData.personalInfo.linkedin}</p>}
              </div>
            </section>
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3">Skills</h2>
              <div className="space-y-3 text-[11px]">
                {resumeData.skills.languages && <div><p className="font-bold mb-1">Languages</p>{renderSkills(resumeData.skills.languages)}</div>}
                {resumeData.skills.frameworks && <div><p className="font-bold mb-1">Frameworks</p>{renderSkills(resumeData.skills.frameworks)}</div>}
              </div>
            </section>
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3">Education</h2>
              <div className="space-y-3">
                {resumeData.education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-[12px]">{edu.degree}</h3>
                    <p className="text-[10px] text-white/80">{edu.school}</p>
                    <p className="text-[10px] text-white/60">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="w-[70%] p-10 space-y-8">
            <header>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">{resumeData.personalInfo.name}</h1>
              <p className="text-xl font-medium mt-2" style={{ color: themeColor }}>{resumeData.personalInfo.title}</p>
            </header>
            {resumeData.summary && (
              <section>
                <SectionHeader title="Profile" color={themeColor} />
                <p className={`text-gray-700 text-[13px] whitespace-pre-wrap ${getLineHeightClass()}`}>{resumeData.summary}</p>
              </section>
            )}
            {resumeData.experience.length > 0 && (
              <section>
                <SectionHeader title="Experience" color={themeColor} />
                <div className="space-y-5">
                  {resumeData.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-gray-900 text-sm">{exp.role}</h3>
                        <span className="text-[11px] font-bold" style={{ color: themeColor }}>{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-500 mb-2">{exp.company}</p>
                      <ul className={`list-disc list-outside ml-4 text-gray-700 text-[12px] ${getLineHeightClass()}`}>
                        {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {resumeData.projects.length > 0 && (
              <section>
                <SectionHeader title="Projects" color={themeColor} />
                <div className="space-y-4">
                  {resumeData.projects.map(proj => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-gray-900 text-[13px]">{proj.name}</h3>
                      <p className="text-[10px] text-gray-500 mb-1">{proj.technologies}</p>
                      <p className={`text-gray-700 text-[12px] ${getLineHeightClass()}`}>{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          
            <div className="col-span-full w-full grid-cols-1 flex flex-col space-y-4">

            {resumeData.certifications && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Certifications</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.certifications.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.achievements && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Achievements</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.achievements.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.hackathons && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Hackathons & Competitions</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.hackathons.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.extracurriculars && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Extracurriculars</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.extracurriculars.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
</div>
</div>
        </div>
      </div>
    );
  }

  // Layout 4: Top Header Dark
  if (theme.template === 'Top Header Dark') {
    return (
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center items-start custom-scrollbar">
        <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] bg-white shadow-xl flex flex-col" style={{ fontFamily: themeFont }}>
          <header className="p-10 text-white flex items-center gap-8" style={{ backgroundColor: themeColor }}>
            {renderPhoto()}
            <div>
              <h1 className="text-4xl font-extrabold uppercase tracking-widest">{resumeData.personalInfo.name}</h1>
              <p className="text-lg text-white/80 mt-1">{resumeData.personalInfo.title}</p>
              <div className="flex flex-wrap gap-4 text-xs mt-4 text-white/90">
                {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
              </div>
            </div>
          </header>
          <div className="p-12 space-y-8 flex-1">
            {resumeData.summary && (
              <section>
                <SectionHeader title="Professional Summary" />
                <p className={`text-gray-700 text-[13px] ${getLineHeightClass()}`}>{resumeData.summary}</p>
              </section>
            )}
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 space-y-8">
                <section>
                  <SectionHeader title="Experience" />
                  <div className="space-y-4">
                    {resumeData.experience.map(exp => (
                      <div key={exp.id}>
                        <h3 className="font-bold text-sm text-gray-900">{exp.role} <span className="text-xs text-gray-500 font-normal">at {exp.company}</span></h3>
                        <p className="text-[10px] text-gray-400 mb-1">{exp.startDate} - {exp.endDate}</p>
                        <ul className={`list-disc list-outside ml-4 text-gray-700 text-[12px] ${getLineHeightClass()}`}>
                          {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="col-span-1 space-y-8">
                <section>
                  <SectionHeader title="Education" />
                  <div className="space-y-3">
                    {resumeData.education.map(edu => (
                      <div key={edu.id}>
                        <h3 className="font-bold text-[12px] text-gray-900">{edu.degree}</h3>
                        <p className="text-[11px] text-gray-600">{edu.school}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <SectionHeader title="Skills" />
                  <div className="text-[12px] text-gray-700">
                    {renderSkills(resumeData.skills.languages)}
                    {renderSkills(resumeData.skills.frameworks)}
                  </div>
                </section>
              </div>
            
            <div className="col-span-full w-full grid-cols-1 flex flex-col space-y-4">
            {resumeData.projects && resumeData.projects.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Projects</h2>
                <div className="space-y-3">
                  {resumeData.projects.map(proj => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-[12px]">{proj.name}</h3>
                      <ul className="list-disc list-outside ml-4 text-[11px] mt-1 text-gray-700">
                        {proj.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
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
                  {resumeData.certifications.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.achievements && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Achievements</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.achievements.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.hackathons && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Hackathons & Competitions</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.hackathons.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.extracurriculars && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Extracurriculars</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.extracurriculars.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
</div>
</div>
          </div>
        </div>
      </div>
    );
  }

  // Layout 5: Modern Card
  if (theme.template === 'Modern Card') {
    return (
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center items-start custom-scrollbar">
        <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] bg-gray-50 shadow-xl p-8" style={{ fontFamily: themeFont }}>
          <header className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center text-center flex-col">
            {renderPhoto()}
            <h1 className="text-4xl font-black text-gray-900 mt-4" style={{ color: themeColor }}>{resumeData.personalInfo.name}</h1>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">{resumeData.personalInfo.title}</p>
            <div className="flex gap-4 mt-4 text-xs text-gray-400">
              {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
            </div>
          </header>
          <div className="space-y-6">
            {resumeData.summary && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Professional Summary</h2>
                <p className="text-gray-700 text-sm leading-relaxed">{resumeData.summary}</p>
              </div>
            )}
            {resumeData.experience.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Experience</h2>
                <div className="space-y-6">
                  {resumeData.experience.map(exp => (
                    <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: themeColor }}>
                      <h3 className="font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-xs text-gray-500">{exp.company} • {exp.startDate} - {exp.endDate}</p>
                      <ul className="mt-2 list-disc list-outside ml-4 text-gray-600 text-xs leading-relaxed">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Layout 6: Executive Professional
  if (theme.template === 'Executive Professional') {
    return (
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center items-start custom-scrollbar">
        <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-12" style={{ fontFamily: 'Merriweather, serif' }}>
          <header className="text-center border-b-4 border-double border-gray-800 pb-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wider">{resumeData.personalInfo.name}</h1>
            <p className="text-sm font-semibold text-gray-600 mt-2 uppercase tracking-widest">{resumeData.personalInfo.title}</p>
            <p className="text-xs text-gray-500 mt-3">{resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.location}</p>
          </header>
          {resumeData.summary && (
            <section className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase border-b-2 border-gray-300 mb-2 pb-1">Executive Summary</h2>
              <p className="text-sm text-gray-800 leading-relaxed">{resumeData.summary}</p>
            </section>
          )}
          {resumeData.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase border-b-2 border-gray-300 mb-3 pb-1">Professional Experience</h2>
              <div className="space-y-4">
                {resumeData.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-bold text-gray-900 text-sm">
                      <span>{exp.company}</span>
                      <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="italic text-gray-700 text-sm mb-1">{exp.role}</div>
                    <ul className="list-disc list-outside ml-5 text-gray-800 text-sm leading-relaxed">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // Layout 7: ATS Friendly
  if (theme.template === 'ATS Friendly') {
    return (
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center items-start custom-scrollbar">
        <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-12" style={{ fontFamily: 'Arial, sans-serif' }}>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-black uppercase">{resumeData.personalInfo.name}</h1>
            <p className="text-sm text-black">{resumeData.personalInfo.email} • {resumeData.personalInfo.phone} • {resumeData.personalInfo.location}</p>
            <p className="text-sm text-black">{resumeData.personalInfo.linkedin} • {resumeData.personalInfo.github}</p>
          </div>
          {resumeData.summary && (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-black uppercase border-b border-black mb-1">Professional Summary</h2>
              <p className="text-sm text-black leading-tight">{resumeData.summary}</p>
            </div>
          )}
          {resumeData.experience.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-black uppercase border-b border-black mb-1">Experience</h2>
              {resumeData.experience.map(exp => (
                <div key={exp.id} className="mb-2">
                  <div className="flex justify-between text-sm font-bold text-black">
                    <span>{exp.role}, {exp.company}</span>
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-sm text-black leading-tight">
                    {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-black uppercase border-b border-black mb-1">Education</h2>
            {resumeData.education.map(edu => (
              <div key={edu.id} className="flex justify-between text-sm text-black">
                <span className="font-bold">{edu.degree}, {edu.school}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-sm font-bold text-black uppercase border-b border-black mb-1">Skills</h2>
            <p className="text-sm text-black leading-tight">{resumeData.skills.languages}, {resumeData.skills.frameworks}, {resumeData.skills.tools}</p>
          
            <div className="col-span-full w-full grid-cols-1 flex flex-col space-y-4">
            {resumeData.projects && resumeData.projects.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Projects</h2>
                <div className="space-y-3">
                  {resumeData.projects.map(proj => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-[12px]">{proj.name}</h3>
                      <ul className="list-disc list-outside ml-4 text-[11px] mt-1 text-gray-700">
                        {proj.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
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
                  {resumeData.certifications.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.achievements && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Achievements</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.achievements.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.hackathons && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Hackathons & Competitions</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.hackathons.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.extracurriculars && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Extracurriculars</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.extracurriculars.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
</div>
</div>
        </div>
      </div>
    );
  }

  // Layout 8: Minimalist
  if (theme.template === 'Minimalist') {
    return (
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center items-start custom-scrollbar">
        <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-16" style={{ fontFamily: 'Lato, sans-serif' }}>
          <header className="mb-12">
            <h1 className="text-2xl font-light text-gray-800 tracking-widest uppercase mb-2">{resumeData.personalInfo.name}</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{resumeData.personalInfo.title}</p>
          </header>
          <div className="grid grid-cols-4 gap-12">
            <div className="col-span-1 space-y-8">
              <div>
                <h2 className="text-[9px] font-bold text-gray-800 uppercase tracking-widest mb-3">Contact</h2>
                <div className="text-[10px] text-gray-500 space-y-1">
                  <p>{resumeData.personalInfo.email}</p>
                  <p>{resumeData.personalInfo.phone}</p>
                </div>
              </div>
              <div>
                <h2 className="text-[9px] font-bold text-gray-800 uppercase tracking-widest mb-3">Education</h2>
                {resumeData.education.map(edu => (
                  <div key={edu.id} className="mb-2">
                    <p className="text-[10px] font-bold text-gray-700">{edu.degree}</p>
                    <p className="text-[9px] text-gray-400">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-3 space-y-8">
              {resumeData.summary && (
                <div>
                  <h2 className="text-[9px] font-bold text-gray-800 uppercase tracking-widest mb-3">Profile</h2>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{resumeData.summary}</p>
                </div>
              )}
              {resumeData.experience.length > 0 && (
                <div>
                  <h2 className="text-[9px] font-bold text-gray-800 uppercase tracking-widest mb-3">Experience</h2>
                  <div className="space-y-6">
                    {resumeData.experience.map(exp => (
                      <div key={exp.id}>
                        <h3 className="text-[11px] font-bold text-gray-800">{exp.role} <span className="font-normal text-gray-400">| {exp.company}</span></h3>
                        <ul className="mt-2 list-none space-y-1 text-[11px] text-gray-600 leading-relaxed">
                          {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>- {line}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          
            <div className="col-span-full w-full grid-cols-1 flex flex-col space-y-4">
            {resumeData.projects && resumeData.projects.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Projects</h2>
                <div className="space-y-3">
                  {resumeData.projects.map(proj => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-[12px]">{proj.name}</h3>
                      <ul className="list-disc list-outside ml-4 text-[11px] mt-1 text-gray-700">
                        {proj.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
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
                  {resumeData.certifications.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.achievements && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Achievements</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.achievements.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.hackathons && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Hackathons & Competitions</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.hackathons.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
            {resumeData.extracurriculars && (
              <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Extracurriculars</h2>
                <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700">
                  {resumeData.extracurriculars.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </section>
            )}
</div>
</div>
        </div>
      </div>
    );
  }

  // Default Layout (Software Engineer, ATS Friendly, Minimalist) - Single/Two Column standard
  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center items-start custom-scrollbar">
      <div 
        id="resume-preview-content"
        className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-12 transition-all duration-300 mb-12"
        style={{ fontFamily: themeFont }}
      >
        
        {/* Header */}
        <header className={`border-b-4 pb-6 ${getSpacingClass()} flex items-center gap-6 ${isTwoColumn ? 'text-left' : 'text-center flex-col'}`} style={{ borderColor: themeColor }}>
          {renderPhoto()}
          
          <div className={`flex-1 ${isTwoColumn ? '' : 'flex flex-col items-center'}`}>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight uppercase">
              {resumeData.personalInfo.name}
            </h1>
            {resumeData.personalInfo.title && (
              <p className="text-xl font-medium mt-1" style={{ color: themeColor }}>
                {resumeData.personalInfo.title}
              </p>
            )}
            <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600 font-medium ${isTwoColumn ? 'justify-start' : 'justify-center'}`}>
              {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{resumeData.personalInfo.phone}</span>
                </>
              )}
              {resumeData.personalInfo.location && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{resumeData.personalInfo.location}</span>
                </>
              )}
            </div>
            {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
              <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 font-medium ${isTwoColumn ? 'justify-start' : 'justify-center'}`}>
                {resumeData.personalInfo.linkedin && (
                  <a href={`https://${resumeData.personalInfo.linkedin}`} className="hover:text-blue-600">
                    {resumeData.personalInfo.linkedin}
                  </a>
                )}
                {resumeData.personalInfo.github && (
                  <>
                    <span className="text-gray-300">•</span>
                    <a href={`https://${resumeData.personalInfo.github}`} className="hover:text-blue-600">
                      {resumeData.personalInfo.github}
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </header>
        
        <div className={isTwoColumn ? "grid grid-cols-3 gap-8" : "flex flex-col"}>
          
          {/* Main Column (or full width) */}
          <div className={isTwoColumn ? "col-span-2 space-y-0" : ""}>
            
            {/* Summary */}
            {resumeData.summary && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Professional Summary" />
                <p className={`text-gray-700 whitespace-pre-wrap text-[13px] ${getLineHeightClass()}`}>
                  {resumeData.summary}
                </p>
              </section>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Experience" />
                <div className="space-y-4">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-bold text-gray-900 text-sm">{exp.role || 'Job Title'}</h3>
                        <span className="text-xs font-semibold whitespace-nowrap ml-4" style={{ color: themeColor }}>
                          {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                        </span>
                      </div>
                      <p className="text-[13px] font-medium text-gray-600 mb-1.5">{exp.company || 'Company Name'}</p>
                      <div className={`text-gray-700 space-y-1 whitespace-pre-wrap text-[13px] ${getLineHeightClass()}`}>
                        {exp.description ? (
                          <ul className="list-disc list-outside ml-4">
                            {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="italic text-gray-400 text-xs">Add your achievements...</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Projects" />
                <div className="space-y-4">
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-bold text-gray-900 text-sm">
                          {proj.name || 'Project Name'} 
                          {proj.technologies && <span className="text-gray-500 font-normal"> | {proj.technologies}</span>}
                        </h3>
                      </div>
                      <div className={`text-gray-700 space-y-1 whitespace-pre-wrap text-[13px] mt-1 ${getLineHeightClass()}`}>
                        {proj.description ? (
                          <ul className="list-disc list-outside ml-4">
                            {proj.description.split('\n').filter(line => line.trim()).map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="italic text-gray-400 text-xs">Add your project description...</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* If Single Column, render Education here */}
            {!isTwoColumn && resumeData.education.length > 0 && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Education" />
                <div className="space-y-3">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{edu.degree || 'Degree'}</h3>
                        <p className="text-[13px] text-gray-600 font-medium">
                          {edu.school || 'School Name'} {edu.cgpa && <span className="text-gray-500"> | CGPA: {edu.cgpa}</span>}
                        </p>
                      </div>
                      <span className="text-xs font-semibold whitespace-nowrap ml-4" style={{ color: themeColor }}>
                        {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Column (or integrated in Single Column) */}
          <div className={isTwoColumn ? "col-span-1 space-y-0 border-l pl-8 border-gray-100" : ""}>
            
            {/* Skills */}
            {(resumeData.skills.languages || resumeData.skills.frameworks || resumeData.skills.tools) && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Skills" />
                <div className={`text-[13px] text-gray-700 space-y-3 ${getLineHeightClass()}`}>
                  {resumeData.skills.languages && (
                    <div>
                      <span className="font-bold text-gray-900 block mb-0.5">Languages</span>
                      {renderSkills(resumeData.skills.languages)}
                    </div>
                  )}
                  {resumeData.skills.frameworks && (
                    <div>
                      <span className="font-bold text-gray-900 block mb-0.5">Frameworks</span>
                      {renderSkills(resumeData.skills.frameworks)}
                    </div>
                  )}
                  {resumeData.skills.tools && (
                    <div>
                      <span className="font-bold text-gray-900 block mb-0.5">Tools & Tech</span>
                      {renderSkills(resumeData.skills.tools)}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* If Two Column, render Education here */}
            {isTwoColumn && resumeData.education.length > 0 && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Education" />
                <div className="space-y-3">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="flex flex-col items-start">
                      <h3 className="font-bold text-gray-900 text-sm">{edu.degree || 'Degree'}</h3>
                      <p className="text-[13px] text-gray-600 font-medium leading-tight mt-0.5">
                        {edu.school || 'School Name'} 
                        {edu.cgpa && <span className="block mt-0.5 text-gray-500">CGPA: {edu.cgpa}</span>}
                      </p>
                      <span className="text-xs font-semibold mt-1" style={{ color: themeColor }}>
                        {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications & Achievements */}
            {resumeData.certifications && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Certifications" />
                <ul className={`list-disc list-outside ml-4 text-[13px] text-gray-700 ${getLineHeightClass()}`}>
                  {resumeData.certifications.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </section>
            )}

            {resumeData.achievements && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Achievements" />
                <ul className={`list-disc list-outside ml-4 text-[13px] text-gray-700 ${getLineHeightClass()}`}>
                  {resumeData.achievements.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </section>
            )}

            {resumeData.hackathons && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Hackathons & Competitions" />
                <ul className={`list-disc list-outside ml-4 text-[13px] text-gray-700 ${getLineHeightClass()}`}>
                  {resumeData.hackathons.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </section>
            )}

            {resumeData.extracurriculars && (
              <section className={getSpacingClass()}>
                <SectionHeader title="Extracurriculars" />
                <ul className={`list-disc list-outside ml-4 text-[13px] text-gray-700 ${getLineHeightClass()}`}>
                  {resumeData.extracurriculars.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </section>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
