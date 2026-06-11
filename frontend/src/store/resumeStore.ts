import { create } from 'zustand';
import { TEMPLATE_CONTENTS } from './templateData';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  cgpa: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
}

export interface Skills {
  languages: string;
  frameworks: string;
  tools: string;
}

export interface Theme {
  color: string;
  fontFamily: string;
  template: string;
  layout: string;
  lineHeight: string;
  spacing: string;
  photoStyle: string;
  skillsStyle: string;
}

export interface ResumeData {
  projectName?: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skills;
  certifications: string;
  achievements: string;
  hackathons: string;
  extracurriculars: string;
  theme: Theme;
}

export interface ResumeState {
  resumeData: ResumeData;
  loadResume: (id: string, isNew?: boolean, templateName?: string) => void;
  autoSave: () => void;
  saveResume: (forceId?: string) => Promise<void>;
  exportPdf: () => Promise<void>;
  exportDocx: () => Promise<void>;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  updateSkills: (data: Partial<Skills>) => void;
  updateCertifications: (certifications: string) => void;
  updateAchievements: (achievements: string) => void;
  updateHackathons: (hackathons: string) => void;
  updateExtracurriculars: (extracurriculars: string) => void;
  updateProjectName: (name: string) => void;
  updateTheme: (theme: Partial<Theme>) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumeData: {
    personalInfo: { 
      name: 'John Doe', 
      title: 'Java Full Stack Developer', 
      email: 'john@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      photo: ''
    },
    summary: 'Highly motivated Java Full Stack Developer with experience in building scalable web applications using Spring Boot, React, and MySQL.',
    experience: [
      {
        id: '1',
        company: 'Tech Solutions Inc.',
        role: 'Senior Software Engineer',
        startDate: '2021',
        endDate: 'Present',
        description: 'Architected and deployed a scalable microservices backend using Spring Boot, reducing API latency by 40%.\nMentored a team of 5 junior developers.'
      }
    ],
    education: [
      {
        id: '1',
        school: 'State University',
        degree: 'B.S. in Computer Science',
        startDate: '2014',
        endDate: '2018',
        cgpa: '3.8/4.0'
      }
    ],
    projects: [
      {
        id: '1',
        name: 'Kisan Mart',
        description: 'Developed a marketplace platform connecting farmers directly with buyers. Implemented secure authentication and product management.',
        technologies: 'Java, Spring Boot, React, MySQL'
      }
    ],
    skills: {
      languages: 'Java, JavaScript, TypeScript, SQL',
      frameworks: 'Spring Boot, React, Tailwind CSS',
      tools: 'Git, Docker, Jenkins'
    },
    certifications: 'AWS Certified Solutions Architect\nOracle Certified Professional Java Programmer',
    achievements: 'Won 1st place in National Hackathon 2022\nEmployee of the Year 2023',
    hackathons: '',
    extracurriculars: '',
    projectName: 'Untitled Resume',
    theme: {
      color: '#059669', // Emerald-600
      fontFamily: 'Inter',
      template: 'Modern',
      layout: 'Single Column',
      lineHeight: 'Normal',
      spacing: 'Medium',
      photoStyle: 'Hidden',
      skillsStyle: 'Tags'
    }
  },
  loadResume: async (id, isNew, templateName) => {
    console.log(`[Store] Loading resume ${id}, isNew: ${isNew}, template: ${templateName}`);
    if (isNew) {
      const templateData = (templateName && TEMPLATE_CONTENTS[templateName]) ? TEMPLATE_CONTENTS[templateName] : TEMPLATE_CONTENTS['Software Engineer 1'];
      set({
        resumeData: {
          ...templateData,
          theme: { color: '#2563eb', fontFamily: 'Inter', template: 'Software Engineer', layout: 'Single Column', lineHeight: 'Normal', spacing: 'Medium', photoStyle: 'Hidden', skillsStyle: 'Tags' }
        }
      });
      return;
    }

    try {
      const response = await fetch(`https://resume-analyzer-950f3-default-rtdb.firebaseio.com/resumes/${id}.json`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Firebase Realtime Database drops empty arrays and objects.
          // We must enforce defaults so components don't crash when mapping.
          const safeData = {
            ...data,
            experience: data.experience || [],
            education: data.education || [],
            projects: data.projects || [],
            skills: data.skills || { languages: '', frameworks: '', tools: '' },
            personalInfo: data.personalInfo || { name: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '', photo: '' },
            theme: data.theme || { color: '#059669', fontFamily: 'Inter', template: 'Modern', layout: 'Single Column', lineHeight: 'Normal', spacing: 'Medium', photoStyle: 'Hidden', skillsStyle: 'Tags' }
          };
          set({ resumeData: safeData });
        }
      }
    } catch (error) {
      console.error('Failed to load resume from Firebase:', error);
    }
  },
  autoSave: async () => {
    const state = useResumeStore.getState();
    // Assuming we have an ID in the URL, but Zustand store doesn't track it directly.
    // We should ideally track the current ID in the store to save it properly.
    // For now, let's just log it or save to a default path if needed.
    // Since we need an ID to save, we'll implement the actual save logic in saveResume.
    console.log('[Store] Auto-saving resume...');
    await state.saveResume();
  },
  saveResume: async (forceId?: string) => {
    const state = useResumeStore.getState();
    // Extract ID from window URL since we don't store it in Zustand currently
    let id = forceId;
    if (!id) {
      const pathParts = window.location.pathname.split('/');
      id = pathParts[pathParts.length - 1];
    }
    
    if (!id || id === 'editor' || id.startsWith('preview-')) return; // Don't save previews or empty IDs

    try {
      console.log(`[Store] Saving resume ${id} to Firebase...`);
      await fetch(`https://resume-analyzer-950f3-default-rtdb.firebaseio.com/resumes/${id}.json`, {
        method: 'PUT', // PUT replaces the entire object at this node
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state.resumeData)
      });
      console.log('[Store] Save complete!');
    } catch (error) {
      console.error('Failed to save resume to Firebase:', error);
    }
  },
  exportPdf: async () => {
    console.log('[Store] Exporting to PDF via native print...');
    
    // We use window.print() because it generates a VECTOR PDF with selectable text.
    // html2canvas generates an IMAGE inside a PDF, which Applicant Tracking Systems (ATS) CANNOT read!
    // The print styles are defined in index.css to only show the resume.
    window.print();
  },
  exportDocx: async () => {
    console.log('[Store] Exporting to DOCX via HTML Blob...');
    const element = document.getElementById('resume-preview-content');
    if (!element) {
      alert('Could not find resume preview to export.');
      return;
    }

    try {
      const data = useResumeStore.getState().resumeData;
      
      // Grab the exact HTML content currently rendered in the preview
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>${data.personalInfo.name || 'Resume'}</title>
        </head>
        <body>
          ${element.innerHTML}
        </body>
        </html>
      `;

      // Create a Blob with the MS Word MIME type
      // Adding \ufeff (Byte Order Mark) ensures Word reads the UTF-8 encoding correctly
      const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Note: We use .doc instead of .docx because we are relying on Word's HTML parsing engine
      link.download = `${data.personalInfo.name || 'Resume'}.doc`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate Word document:', err);
      alert('Failed to export DOC.');
    }
  },
  updatePersonalInfo: (data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      personalInfo: { ...state.resumeData.personalInfo, ...data }
    }
  })),
  updateSummary: (summary) => set((state) => ({
    resumeData: { ...state.resumeData, summary }
  })),
  addExperience: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: [
        ...state.resumeData.experience, 
        { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', description: '' }
      ]
    }
  })),
  updateExperience: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: state.resumeData.experience.map(exp => exp.id === id ? { ...exp, ...data } : exp)
    }
  })),
  removeExperience: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: state.resumeData.experience.filter(exp => exp.id !== id)
    }
  })),
  addEducation: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: [
        ...state.resumeData.education, 
        { id: Date.now().toString(), school: '', degree: '', startDate: '', endDate: '', cgpa: '' }
      ]
    }
  })),
  updateEducation: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: state.resumeData.education.map(edu => edu.id === id ? { ...edu, ...data } : edu)
    }
  })),
  removeEducation: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: state.resumeData.education.filter(edu => edu.id !== id)
    }
  })),
  addProject: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      projects: [
        ...state.resumeData.projects, 
        { id: Date.now().toString(), name: '', description: '', technologies: '' }
      ]
    }
  })),
  updateProject: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      projects: state.resumeData.projects.map(proj => proj.id === id ? { ...proj, ...data } : proj)
    }
  })),
  removeProject: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      projects: state.resumeData.projects.filter(proj => proj.id !== id)
    }
  })),
  updateSkills: (data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      skills: { ...state.resumeData.skills, ...data }
    }
  })),
  updateCertifications: (certifications) => set((state) => ({
    resumeData: { ...state.resumeData, certifications }
  })),
  updateAchievements: (achievements) => set((state) => ({
    resumeData: { ...state.resumeData, achievements }
  })),
  updateHackathons: (hackathons) => set((state) => ({
    resumeData: { ...state.resumeData, hackathons }
  })),
  updateExtracurriculars: (extracurriculars) => set((state) => ({
    resumeData: { ...state.resumeData, extracurriculars }
  })),
  updateProjectName: (projectName) => set((state) => ({
    resumeData: { ...state.resumeData, projectName }
  })),
  updateTheme: (theme) => set((state) => {
    let newTheme = { ...state.resumeData.theme, ...theme };
    
    // Apply template presets if the template is changing
    if (theme.template && theme.template !== state.resumeData.theme.template) {
      switch (theme.template) {
        case 'Left Sidebar':
        case 'Modern Professional':
          newTheme = { ...newTheme, layout: 'Two Column', color: '#4b5320', fontFamily: 'Inter', photoStyle: 'Square', skillsStyle: 'Progress Bars' };
          break;
        case 'Right Sidebar':
          newTheme = { ...newTheme, layout: 'Two Column', color: '#2b6cb0', fontFamily: 'Roboto', photoStyle: 'Square', skillsStyle: 'Progress Bars' };
          break;
        case 'Two Column Split':
          newTheme = { ...newTheme, layout: 'Two Column', color: '#047857', fontFamily: 'Inter', photoStyle: 'Rounded', skillsStyle: 'Progress Bars' };
          break;
        case 'Single Column Centered':
          newTheme = { ...newTheme, layout: 'Single Column', color: '#4338ca', fontFamily: 'Roboto', photoStyle: 'Circular', skillsStyle: 'Tags' };
          break;
        case 'Top Header Dark':
          newTheme = { ...newTheme, layout: 'Single Column', color: '#1f2937', fontFamily: 'Montserrat', photoStyle: 'Circular', skillsStyle: 'Tags' };
          break;
        case 'Modern Card':
          newTheme = { ...newTheme, layout: 'Single Column', color: '#6366f1', fontFamily: 'Inter', photoStyle: 'Rounded', skillsStyle: 'Tags', spacing: 'Relaxed' };
          break;
        case 'Creative Designer':
          newTheme = { ...newTheme, layout: 'Two Column', color: '#be123c', fontFamily: 'Montserrat', photoStyle: 'Circular', skillsStyle: 'Stars' };
          break;
        case 'Executive Professional':
          newTheme = { ...newTheme, layout: 'Single Column', color: '#1e3a8a', fontFamily: 'Merriweather', photoStyle: 'Hidden', skillsStyle: 'Compact Text', spacing: 'Relaxed' };
          break;
        case 'ATS Friendly':
          newTheme = { ...newTheme, layout: 'Single Column', color: '#000000', fontFamily: 'Arial, sans-serif', photoStyle: 'Hidden', skillsStyle: 'Compact Text', spacing: 'Compact', lineHeight: 'Compact' };
          break;
        case 'Minimalist':
          newTheme = { ...newTheme, layout: 'Single Column', color: '#374151', fontFamily: 'Lato', photoStyle: 'Hidden', skillsStyle: 'Tags', spacing: 'Relaxed' };
          break;
      }
    }

    return {
      resumeData: {
        ...state.resumeData,
        theme: newTheme
      }
    };
  }),
}));
