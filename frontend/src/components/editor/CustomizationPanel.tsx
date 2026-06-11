import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useResumeStore } from '../../store/resumeStore';
import { Trash2, Plus, Palette, Type, LayoutTemplate, Sparkles, Loader2 } from 'lucide-react';

export const CustomizationPanel = () => {
  const { hash } = useLocation();
  const currentTab = hash || '#content';

  if (currentTab === '#customize') {
    return <CustomizeTab />;
  }
  
  // Default to content tab (even if hash is #ai-tools, so the left bar stays content)
  return <ContentTab />;
};

const CustomizeTab = () => {
  const { resumeData, updateTheme } = useResumeStore();
  
  // Theme options
  const colors = ['#059669', '#2563eb', '#4f46e5', '#e11d48', '#d97706', '#1f2937', '#0891b2', '#9333ea'];
  const fonts = ['Inter', 'Roboto', 'Poppins', 'Open Sans', 'Montserrat', 'Lato', 'Merriweather'];
  const templates = ['Modern Professional', 'ATS Friendly', 'Software Engineer', 'Creative Designer', 'Minimalist'];
  
  // Advanced options
  const layouts = ['Single Column', 'Two Column'];
  const lineHeights = ['Compact', 'Normal', 'Spacious'];
  const spacings = ['Compact', 'Medium', 'Relaxed'];
  const photoStyles = ['Hidden', 'Circular', 'Square', 'Rounded'];
  const skillsStyles = ['Tags', 'Progress Bars', 'Stars', 'Compact Text'];

  return (
    <div className="w-[450px] border-r border-gray-200 bg-white p-6 overflow-y-auto font-sans shadow-sm z-10 custom-scrollbar pb-24 h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Palette className="w-6 h-6 mr-2 text-emerald-600" /> Customize
      </h2>
      
      <div className="space-y-8">
        
        {/* Templates */}
        <section>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Templates</h3>
          <div className="grid grid-cols-1 gap-2">
            {templates.map(tpl => (
              <button
                key={tpl}
                onClick={() => updateTheme({ template: tpl })}
                className={`w-full text-left px-4 py-2.5 border rounded-lg transition-colors text-sm font-medium ${resumeData.theme.template === tpl ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                {tpl}
              </button>
            ))}
          </div>
        </section>

        {/* Layout */}
        <section>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Layout Structure</h3>
          <div className="grid grid-cols-2 gap-2">
            {layouts.map(layout => (
              <button
                key={layout}
                onClick={() => updateTheme({ layout })}
                className={`px-3 py-2 border rounded-lg transition-colors text-xs font-medium text-center ${resumeData.theme.layout === layout ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                {layout}
              </button>
            ))}
          </div>
        </section>

        {/* Colors */}
        <section>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Accent Color</h3>
          <div className="flex flex-wrap gap-2.5">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => updateTheme({ color })}
                className={`w-8 h-8 rounded-full focus:outline-none transition-transform hover:scale-110 shadow-sm ${resumeData.theme.color === color ? 'ring-2 ring-emerald-500 ring-offset-2' : 'border border-gray-200'}`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Typography</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-medium">Font Family</label>
              <select 
                value={resumeData.theme.fontFamily}
                onChange={(e) => updateTheme({ fontFamily: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              >
                {fonts.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-2 font-medium">Line Height</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {lineHeights.map(lh => (
                    <button
                      key={lh}
                      onClick={() => updateTheme({ lineHeight: lh })}
                      className={`px-2 py-1.5 border rounded-md transition-colors text-xs ${resumeData.theme.lineHeight === lh ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {lh}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 font-medium">Section Spacing</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {spacings.map(sp => (
                    <button
                      key={sp}
                      onClick={() => updateTheme({ spacing: sp })}
                      className={`px-2 py-1.5 border rounded-md transition-colors text-xs ${resumeData.theme.spacing === sp ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Settings */}
        <section>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Visual Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-medium">Profile Photo</label>
              <div className="grid grid-cols-2 gap-2">
                {photoStyles.map(style => (
                  <button
                    key={style}
                    onClick={() => updateTheme({ photoStyle: style })}
                    className={`px-3 py-2 border rounded-lg transition-colors text-xs font-medium ${resumeData.theme.photoStyle === style ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-medium">Skills Display Style</label>
              <div className="grid grid-cols-2 gap-2">
                {skillsStyles.map(style => (
                  <button
                    key={style}
                    onClick={() => updateTheme({ skillsStyle: style })}
                    className={`px-3 py-2 border rounded-lg transition-colors text-xs font-medium ${resumeData.theme.skillsStyle === style ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

const ContentTab = () => {
  const { 
    resumeData, updatePersonalInfo, updateSummary, 
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addProject, updateProject, removeProject,
    updateSkills, updateCertifications, updateAchievements,
    updateHackathons,
    updateExtracurriculars
  } = useResumeStore();

  return (
    <div className="w-[450px] border-r border-gray-200 bg-white p-6 overflow-y-auto font-sans shadow-sm z-10 custom-scrollbar pb-24">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Content</h2>
      
      <div className="space-y-8">
        {/* Personal Details */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Personal Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Profile Photo</label>
              <div className="flex items-center gap-4">
                {resumeData.personalInfo.photo ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                    <img src={resumeData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => updatePersonalInfo({ photo: '' })}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
                <div className="flex-1">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updatePersonalInfo({ photo: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer" 
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Square images work best. Max 1MB.</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" value={resumeData.personalInfo.name} onChange={(e) => updatePersonalInfo({ name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Job Title</label>
              <input type="text" value={resumeData.personalInfo.title} onChange={(e) => updatePersonalInfo({ title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={resumeData.personalInfo.email} onChange={(e) => updatePersonalInfo({ email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" value={resumeData.personalInfo.phone} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn</label>
                <input type="text" value={resumeData.personalInfo.linkedin} onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="linkedin.com/in/..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">GitHub</label>
                <input type="text" value={resumeData.personalInfo.github} onChange={(e) => updatePersonalInfo({ github: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="github.com/..." />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={resumeData.personalInfo.location || ''} onChange={(e) => updatePersonalInfo({ location: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="City, State" />
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Professional Summary</h3>
          <textarea 
            rows={4}
            value={resumeData.summary}
            onChange={(e) => updateSummary(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-y"
            placeholder="A brief summary of your professional background..."
          />
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Skills</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Programming Languages</label>
              <input type="text" value={resumeData.skills.languages} onChange={(e) => updateSkills({ languages: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="Java, Python, C++" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Frameworks</label>
              <input type="text" value={resumeData.skills.frameworks} onChange={(e) => updateSkills({ frameworks: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="React, Spring Boot, Node.js" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tools & Technologies</label>
              <input type="text" value={resumeData.skills.tools} onChange={(e) => updateSkills({ tools: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="Git, Docker, AWS" />
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Experience</h3>
            <button onClick={addExperience} className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm font-medium">
              <Plus className="w-4 h-4 mr-1" /> Add
            </button>
          </div>
          <div className="space-y-6">
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative group shadow-sm transition-all hover:shadow-md hover:border-emerald-200">
                <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Delete Experience">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                    <input type="text" value={exp.role} onChange={(e) => updateExperience(exp.id, { role: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                      <input type="text" value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="Jan 2020" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                      <input type="text" value={exp.endDate} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="Present" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Description (bullet points)</label>
                    <textarea rows={4} value={exp.description} onChange={(e) => updateExperience(exp.id, { description: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-y" placeholder="Led a team of 5...&#10;Increased performance by..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Projects</h3>
            <button onClick={addProject} className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm font-medium">
              <Plus className="w-4 h-4 mr-1" /> Add
            </button>
          </div>
          <div className="space-y-6">
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative group shadow-sm transition-all hover:shadow-md hover:border-emerald-200">
                <button onClick={() => removeProject(proj.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Delete Project">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Project Name</label>
                    <input type="text" value={proj.name} onChange={(e) => updateProject(proj.id, { name: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Technologies Used</label>
                    <input type="text" value={proj.technologies} onChange={(e) => updateProject(proj.id, { technologies: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="React, Node, Express" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows={3} value={proj.description} onChange={(e) => updateProject(proj.id, { description: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-y" placeholder="Developed a full-stack application..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Education</h3>
            <button onClick={addEducation} className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm font-medium">
              <Plus className="w-4 h-4 mr-1" /> Add
            </button>
          </div>
          <div className="space-y-6">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative group shadow-sm transition-all hover:shadow-md hover:border-emerald-200">
                <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Delete Education">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Degree</label>
                    <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">College / University</label>
                    <input type="text" value={edu.school} onChange={(e) => updateEducation(edu.id, { school: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Start Year</label>
                      <input type="text" value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">End Year</label>
                      <input type="text" value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">CGPA</label>
                      <input type="text" value={edu.cgpa} onChange={(e) => updateEducation(edu.id, { cgpa: e.target.value })} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="e.g. 3.8/4.0" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Certifications</h3>
          <textarea 
            rows={3}
            value={resumeData.certifications}
            onChange={(e) => updateCertifications(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-y"
            placeholder="List your certifications (one per line)..."
          />
        </section>

        {/* Achievements */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Achievements</h3>
          <textarea 
            rows={3}
            value={resumeData.achievements}
            onChange={(e) => updateAchievements(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-y"
            placeholder="List your key achievements (one per line)..."
          />
        </section>

        {/* Hackathons & Global Competitions */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Hackathons & Global Competitions</h3>
          <textarea 
            rows={3}
            value={resumeData.hackathons || ''}
            onChange={(e) => updateHackathons(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-y"
            placeholder="List hackathons and global competitions you participated in (one per line)..."
          />
        </section>

        {/* Extracurricular Activities */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Extracurricular Activities</h3>
          <textarea 
            rows={3}
            value={resumeData.extracurriculars || ''}
            onChange={(e) => updateExtracurriculars(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-y"
            placeholder="List your extracurricular activities, leadership roles, etc (one per line)..."
          />
        </section>

      </div>
    </div>
  );
};
