import React from 'react';
import { User, Calendar, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-blue-600 font-bold text-2xl">MedConnect</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Find Doctors
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Specialties
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Health Articles
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                About Us
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <Calendar className="h-5 w-5 mr-1" />
                <span>Appointments</span>
              </button>
              <button className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200">
                <User className="h-5 w-5 mr-1" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              Find Doctors
            </a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              Specialties
            </a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              Health Articles
            </a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              About Us
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <button className="flex-shrink-0 w-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">
                <User className="h-5 w-5 mr-1" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;