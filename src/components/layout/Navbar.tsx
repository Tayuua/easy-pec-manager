
import { Link, useLocation } from 'react-router-dom';
import { Home, ListChecks, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import NotificationIcon from '@/components/notification/NotificationIcon';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { href: '/', icon: <Home size={20} />, label: 'Accueil' },
    { href: '/requests', icon: <ListChecks size={20} />, label: 'Demandes PEC' },
    { href: '/stats', icon: <BarChart3 size={20} />, label: 'Statistiques' },
    { href: '/settings', icon: <Settings size={20} />, label: 'Paramètres' }
  ];
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=40&h=40" 
                alt="Robot head" 
                className="h-8 w-8 mr-2 rounded-full"
              />
              <span className="text-easypec-blue font-bold text-xl">Easy PEC</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <nav className="flex space-x-4 items-center mr-4">
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
            
            <NotificationIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
