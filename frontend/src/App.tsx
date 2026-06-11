import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import ResumeAIAnalyzer from './pages/ResumeAIAnalyzer';
import MyResumesPage from './pages/MyResumesPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import { ResumeEditorPage } from './pages/ResumeEditorPage';
import { ResumeTemplatesPage } from './pages/ResumeTemplatesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/resume-analyzer" element={<ResumeAIAnalyzer />} />
        <Route path="/my-resumes" element={<MyResumesPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/templates" element={<ResumeTemplatesPage />} />
        <Route path="/editor" element={<ResumeEditorPage />} />
        <Route path="/editor/:id" element={<ResumeEditorPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;



