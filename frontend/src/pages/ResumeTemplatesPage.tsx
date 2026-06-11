import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useResumeStore } from '../store/resumeStore';
import { Search, Filter } from 'lucide-react';

const TEMPLATES = [
  { id: 'Software Engineer 1', name: 'Software Engineer 1', category: 'Tech', image: '/software engineer templates/s1.jpg' },
  { id: 'Software Engineer 2', name: 'Software Engineer 2', category: 'Tech', image: '/software engineer templates/s2.jpg' },
  { id: 'Software Engineer 3', name: 'Software Engineer 3', category: 'Tech', image: '/software engineer templates/s3.jpg' },
  { id: 'Software Engineer 4', name: 'Software Engineer 4', category: 'Tech', image: '/software engineer templates/s4.jpg' },
  { id: 'Software Engineer 5', name: 'Software Engineer 5', category: 'Tech', image: '/software engineer templates/s5.png' },
  { id: 'Software Engineer 6', name: 'Software Engineer 6', category: 'Tech', image: '/software engineer templates/s6.jpg' },
  { id: 'Software Engineer 7', name: 'Software Engineer 7', category: 'Tech', image: '/software engineer templates/s7.jpg' },
  { id: 'Software Engineer 8', name: 'Software Engineer 8', category: 'Tech', image: '/software engineer templates/s8.png' },
  { id: 'Software Engineer 9', name: 'Software Engineer 9', category: 'Tech', image: '/software engineer templates/s9.jpg' },
  { id: 'Software Engineer 10', name: 'Software Engineer 10', category: 'Tech', image: '/software engineer templates/s10.jpg' },
  { id: 'Software Engineer 11', name: 'Software Engineer 11', category: 'Tech', image: '/software engineer templates/s11.png' },
  { id: 'Software Engineer 12', name: 'Software Engineer 12', category: 'Tech', image: '/software engineer templates/s12.jpg' },
  { id: 'Software Engineer 13', name: 'Software Engineer 13', category: 'Tech', image: '/software engineer templates/s13.png' },
  { id: 'Software Engineer 14', name: 'Software Engineer 14', category: 'Tech', image: '/software engineer templates/s14.jpg' },
  { id: 'Software Engineer 15', name: 'Software Engineer 15', category: 'Tech', image: '/software engineer templates/s15.jpg' },
];

export const ResumeTemplatesPage = () => {
  const navigate = useNavigate();
  const { loadResume, updateTheme } = useResumeStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [templateToCustomize, setTemplateToCustomize] = useState<string | null>(null);

  const handleCustomizeClick = (templateName: string) => {
    setTemplateToCustomize(templateName);
    setNewProjectName('');
    setIsModalOpen(true);
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim() || !templateToCustomize) return;
    setIsModalOpen(false);

    const newId = Date.now().toString();
    loadResume(newId, true, templateToCustomize);
    
    // Set the project name without overriding the template's dummy content
    const store = useResumeStore.getState();
    store.updateProjectName(newProjectName);

    // Map all extra mock templates back to one of our 10 actual supported themes
    let mappedTheme = templateToCustomize;
    if (templateToCustomize.startsWith('Software Engineer')) {
      const numMatch = templateToCustomize.match(/\d+/);
      const num = numMatch ? parseInt(numMatch[0]) : 1;
      const themes = [
        'Left Sidebar', 
        'Right Sidebar', 
        'Two Column Split', 
        'Single Column Centered', 
        'Top Header Dark', 
        'Modern Card', 
        'Creative Designer', 
        'Executive Professional', 
        'ATS Friendly', 
        'Minimalist'
      ];
      mappedTheme = themes[(num - 1) % 10];
    } else if (!['Left Sidebar', 'Right Sidebar', 'Two Column Split', 'Single Column Centered', 'Top Header Dark', 'Modern Card', 'Creative Designer', 'Executive Professional', 'ATS Friendly', 'Minimalist'].includes(templateToCustomize)) {
      mappedTheme = 'Modern Professional';
    }
    
    store.updateTheme({ template: mappedTheme });

    // Save immediately so it appears in My Projects
    await store.saveResume(newId);
    
    navigate(`/editor/${newId}#content`);
  };

  const handlePreviewTemplate = (templateName: string) => {
    const previewId = `preview-${Date.now()}`;
    loadResume(previewId, true, templateName);
    
    let mappedTheme = templateName;
    if (templateName.startsWith('Software Engineer')) {
      const numMatch = templateName.match(/\d+/);
      const num = numMatch ? parseInt(numMatch[0]) : 1;
      const themes = [
        'Left Sidebar', 'Right Sidebar', 'Two Column Split', 'Single Column Centered', 
        'Top Header Dark', 'Modern Card', 'Creative Designer', 'Executive Professional', 
        'ATS Friendly', 'Minimalist'
      ];
      mappedTheme = themes[(num - 1) % 10];
    } else if (!['Left Sidebar', 'Right Sidebar', 'Two Column Split', 'Single Column Centered', 'Top Header Dark', 'Modern Card', 'Creative Designer', 'Executive Professional', 'ATS Friendly', 'Minimalist'].includes(templateName)) {
      mappedTheme = 'Modern Professional';
    }
    
    const store = useResumeStore.getState();
    store.updateTheme({ template: mappedTheme });
    store.updateProjectName('Template Preview');
    
    navigate(`/editor/${previewId}#content`);
  };

  const filteredTemplates = TEMPLATES.filter(tpl => 
    tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tpl.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        
        {/* Header Section */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Resume templates</h1>
          <p className="text-lg text-gray-600">
            Stand out and get hired faster with our collection of professionally designed resume templates. Find the perfect layout for your industry.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search templates (e.g. Software, Creative...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 font-medium shadow-sm transition-colors">
            <Filter className="w-4 h-4" /> All Filters
          </button>
        </div>

        {/* Dense Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10">
          {filteredTemplates.map((tpl) => (
            <div 
              key={tpl.id} 
              className="group relative cursor-pointer"
              onMouseEnter={() => setSelectedTemplate(tpl.id)}
              onMouseLeave={() => setSelectedTemplate(null)}
              onClick={() => handlePreviewTemplate(tpl.id)}
            >
              {/* Card Thumbnail - A4 Aspect Ratio */}
              <div className="w-full aspect-[1/1.414] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative transition-all duration-300 group-hover:shadow-xl group-hover:border-emerald-300">
                <img 
                  src={tpl.image} 
                  alt={tpl.name} 
                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Hover Action Overlay */}
                <div className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${selectedTemplate === tpl.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCustomizeClick(tpl.id); }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                  >
                    Customize
                  </button>
                </div>
              </div>

              {/* Title & Category underneath */}
              <div className="mt-3 px-1">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{tpl.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{tpl.category}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Create New Project</h3>
              <p className="text-sm text-gray-500 mt-1">Give your new resume a name to get started.</p>
            </div>
            <div className="p-6">
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
              <input
                id="projectName"
                type="text"
                autoFocus
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateProject();
                  if (e.key === 'Escape') setIsModalOpen(false);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="e.g. Senior SWE 2025"
              />
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-xl border-t border-gray-100">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
