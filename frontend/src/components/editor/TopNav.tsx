import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Save, FileDown, FileUp, PlusCircle, Folder, ChevronDown, Loader2 } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';

export const TopNav = () => {
  const navigate = useNavigate();
  const { saveResume, exportPdf, exportDocx } = useResumeStore();
  
  const handleSave = async () => {
    await saveResume();
    alert('Resume saved to Cloud!');
  };

  return (
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 shadow-sm relative z-50">
      {/* Left side – navigation tabs */}
      <div className="flex space-x-4">
        <Link to="#overview" className="text-gray-600 hover:text-emerald-600 font-medium">
          Overview
        </Link>
        <Link to="#content" className="text-gray-600 hover:text-emerald-600 font-medium">
          Content
        </Link>
        <Link to="#customize" className="text-gray-600 hover:text-emerald-600 font-medium">
          Customize
        </Link>
        <Link to="#ai-tools" className="text-emerald-600 font-bold bg-emerald-50 px-2 rounded">
          ✨ AI Tools
        </Link>
      </div>

      {/* Right side – actions */}
      <div className="flex items-center space-x-3">
        
        {/* Projects Dashboard Link */}
        <button
          onClick={() => navigate('/my-resumes')}
          className="flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-md transition"
        >
          <Folder className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium">My Projects</span>
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-md transition shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span className="text-sm font-medium">Save</span>
        </button>
        <button
          onClick={exportPdf}
          className="flex items-center gap-1 bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md transition"
        >
          <FileDown className="w-4 h-4" />
          <span className="text-sm font-medium">PDF</span>
        </button>
        <button
          onClick={exportDocx}
          className="flex items-center gap-1 bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md transition"
        >
          <FileUp className="w-4 h-4" />
          <span className="text-sm font-medium">DOCX</span>
        </button>
      </div>
    </nav>
  );
};
