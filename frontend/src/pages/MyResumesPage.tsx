import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, File as FileIcon, Copy, Trash2, Download, ExternalLink, Loader2, Edit2 } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';

interface ProjectMeta {
  id: string;
  name: string;
  role: string;
  template: string;
  lastModified: number;
}

export default function MyResumesPage() {
  const [projects, setProjects] = useState<ProjectMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://resume-analyzer-950f3-default-rtdb.firebaseio.com/resumes.json');
      const data = await response.json();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          name: data[key].projectName || data[key].personalInfo?.name || 'Untitled Resume',
          role: data[key].personalInfo?.title || 'No Role',
          template: data[key].theme?.template || 'Modern Professional',
          // Randomize a recent timestamp for demo since we didn't store actual timestamps yet
          lastModified: Date.now() - Math.floor(Math.random() * 1000000000)
        }));
        
        // Sort by last modified descending
        list.sort((a, b) => b.lastModified - a.lastModified);
        setProjects(list);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createNew = async () => {
    const projectName = prompt('Enter a name for your new resume project:');
    if (projectName) {
      const newId = Date.now().toString();
      useResumeStore.getState().loadResume(newId, true);
      useResumeStore.getState().updateProjectName(projectName);
      await useResumeStore.getState().saveResume(newId);
      navigate(`/editor/${newId}`);
    }
  };

  const deleteProject = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      try {
        await fetch(`https://resume-analyzer-950f3-default-rtdb.firebaseio.com/resumes/${id}.json`, {
          method: 'DELETE'
        });
        setSelectedIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (confirm(`Are you sure you want to permanently delete ${selectedIds.size} selected projects?`)) {
      try {
        setLoading(true);
        await Promise.all(
          Array.from(selectedIds).map(id => 
            fetch(`https://resume-analyzer-950f3-default-rtdb.firebaseio.com/resumes/${id}.json`, { method: 'DELETE' })
          )
        );
        setSelectedIds(new Set());
        fetchProjects();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredProjects.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProjects.map(p => p.id)));
    }
  };

  const duplicateProject = async (id: string) => {
    try {
      const response = await fetch(`https://resume-analyzer-950f3-default-rtdb.firebaseio.com/resumes/${id}.json`);
      const data = await response.json();
      
      const newId = Date.now().toString();
      data.projectName = `${data.projectName || data.personalInfo?.name || 'Untitled'} (Copy)`;
      
      await fetch(`https://resume-analyzer-950f3-default-rtdb.firebaseio.com/resumes/${newId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const renameProject = async (id: string, oldName: string) => {
    const newName = prompt('Enter new project name:', oldName);
    if (newName && newName !== oldName) {
      try {
        await fetch(`https://resume-analyzer-950f3-default-rtdb.firebaseio.com/resumes/${id}.json`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectName: newName })
        });
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today by You';
    if (days === 1) return 'Yesterday by You';
    if (days < 30) return `${days} days ago by You`;
    return 'a month ago by You';
  };

  return (
    <div className="min-h-screen bg-[#242d3c] text-white font-sans selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Your projects</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              You're on the <span className="font-bold text-white">free plan</span>
              <button className="ml-1.5 w-4 h-4 inline-flex items-center justify-center rounded-full border border-gray-400 text-gray-400 text-[10px]">i</button>
            </span>
            {selectedIds.size > 0 && (
              <button 
                onClick={bulkDelete}
                className="bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/50 px-4 py-2 rounded-full font-bold text-sm transition-colors"
              >
                Delete {selectedIds.size} Selected
              </button>
            )}
            <button 
              onClick={createNew}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-full font-bold text-sm transition-colors shadow-lg shadow-emerald-900/20"
            >
              New project
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-600 rounded-md leading-5 bg-[#1e2532] text-slate-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
            placeholder="Search in your projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Projects Table */}
        <div className="bg-[#1e2532] rounded-lg shadow-xl border border-slate-700/50 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-[#181e29]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-white w-12">
                  <input 
                    type="checkbox" 
                    checked={filteredProjects.length > 0 && selectedIds.size === filteredProjects.length}
                    onChange={toggleAll}
                    className="rounded border-slate-500 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800" 
                  />
                </th>
                <th scope="col" className="px-2 py-4 text-left text-sm font-bold text-white">
                  Title
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-white w-48">
                  Selected Template
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-white w-56">
                  Last modified ↓
                </th>
                <th scope="col" className="px-6 py-4 text-right text-sm font-bold text-white w-48">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 bg-[#1e2532]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-500" />
                    Loading projects...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No projects found. Create one to get started!
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.has(project.id)}
                        onChange={() => toggleSelection(project.id)}
                        className="rounded border-slate-500 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800" 
                      />
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-9 bg-white rounded flex items-center justify-center mr-4 shadow-sm border border-gray-200 overflow-hidden relative">
                          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                          <FileIcon className="h-4 w-4 text-emerald-600/50" />
                        </div>
                        <div>
                          <button onClick={() => navigate(`/editor/${project.id}`)} className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">
                            {project.name}
                          </button>
                          <div className="text-xs text-gray-400 mt-0.5">{project.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className="px-2 py-1 bg-slate-800 rounded-md text-emerald-400 text-xs border border-slate-700">
                        {project.template}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatTimeAgo(project.lastModified)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-4">
                        <button onClick={() => renameProject(project.id, project.name)} className="text-gray-400 hover:text-white transition-colors" title="Rename">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => duplicateProject(project.id)} className="text-gray-400 hover:text-white transition-colors" title="Copy">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button onClick={() => navigate(`/editor/${project.id}`)} className="text-gray-400 hover:text-white transition-colors" title="Download PDF">
                          <Download className="w-4 h-4" />
                        </button>
                        <button onClick={() => navigate(`/editor/${project.id}`)} className="text-gray-400 hover:text-white transition-colors" title="Open Editor">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteProject(project.id, project.name)} className="text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {!loading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Showing {filteredProjects.length} out of {projects.length} projects
          </div>
        )}
        
      </div>
    </div>
  );
}
