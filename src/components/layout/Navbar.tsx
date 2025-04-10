
import { Link, useLocation } from 'react-router-dom';
import { Home, ListChecks, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { href: '/', icon: <Home size={20} />, label: 'Accueil' },
    { href: '/requests', icon: <ListChecks size={20} />, label: 'Demandes PEC' },
    { href: '/settings', icon: <Settings size={20} />, label: 'Paramètres' }
  ];
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-easypec-blue font-bold text-xl">Easy PEC</span>
            </Link>
          </div>
          
          <nav className="flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                  location.pathname === item.href
                    ? "text-easypec-blue bg-easypec-lightblue"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
