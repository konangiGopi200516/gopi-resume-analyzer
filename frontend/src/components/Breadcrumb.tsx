import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = parts.map((part, index) => {
    const to = '/' + parts.slice(0, index + 1).join('/');
    // Convert kebab-case or hyphenated to Title Case
    const name = part.replace(/-/g, ' ');
    const title = name
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return (
      <li key={to} className="flex items-center">
        {index > 0 && <span className="mx-2 text-gray-400">/</span>}
        <Link to={to} className="text-gray-600 hover:text-emerald-600 text-sm">
          {title}
        </Link>
      </li>
    );
  });

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center">
        <li className="flex items-center">
          <Link to="/" className="text-gray-600 hover:text-emerald-600 text-sm">
            Home
          </Link>
        </li>
        {breadcrumbItems}
      </ol>
    </nav>
  );
};
