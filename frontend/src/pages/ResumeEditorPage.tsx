// src/pages/ResumeEditorPage.tsx
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TopNav } from '../components/editor/TopNav';
import { CustomizationPanel } from '../components/editor/CustomizationPanel';
import { PreviewPanel } from '../components/editor/PreviewPanel';
import { AiAssistantPanel } from '../components/editor/AiAssistantPanel';
import { useResumeStore } from '../store/resumeStore';

export const ResumeEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const { loadResume, autoSave } = useResumeStore();

  // Load resume on mount (create new if no id)
  useEffect(() => {
    if (id) {
      loadResume(id);
    } else {
      // create a new empty resume and redirect to its editor URL
      const newId = Date.now().toString();
      loadResume(newId, true); // true => new blank resume
      navigate(`/editor/${newId}`, { replace: true });
    }
  }, [id, loadResume, navigate]);

  // Auto‑save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 5000);
    return () => clearInterval(interval);
  }, [autoSave]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar – customization controls */}
        <CustomizationPanel />
        {/* Center – live preview */}
        <PreviewPanel />
        {/* Right optional AI tools */}
        {hash === '#ai-tools' && <AiAssistantPanel />}
      </div>
    </div>
  );
};
