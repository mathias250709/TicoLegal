import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, DollarSign, Scale, Calculator, FileText } from 'lucide-react';
import { useIsMobile } from './ui/use-mobile';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigationOptions = [
    { title: 'Cambio de divisas', path: '/divisas', description: 'Convierte monedas al instante', icon: DollarSign },
    { title: 'Leyes', path: '/leyes', description: 'Consulta el marco legal', icon: Scale },
    { title: 'Cálculos', path: '/calculos', description: 'Calculadoras laborales', icon: Calculator },
    { title: 'Formularios', path: '/formularios', description: 'Descarga y completa documentos', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl md:text-2xl font-semibold text-white hover:text-blue-100 transition-colors">
              TicoLegal
            </Link>
            <nav className="flex gap-2 md:gap-6 items-center">
              <Link to="/" className="hidden md:block text-blue-100 hover:text-white transition-colors">
                Inicio
              </Link>
              <Link to="/divisas" className="hidden md:block text-blue-100 hover:text-white transition-colors">
                Divisas
              </Link>
              <Link to="/leyes" className="hidden md:block text-blue-100 hover:text-white transition-colors">
                Leyes
              </Link>
              <Link to="/calculos" className="hidden md:block text-blue-100 hover:text-white transition-colors">
                Cálculos
              </Link>
              <Link to="/formularios" className="hidden md:block text-blue-100 hover:text-white transition-colors">
                Formularios
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors text-white"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Content Area */}
        <motion.div
          className="flex-1 overflow-auto"
          animate={{
            marginRight: !isMobile && sidebarOpen ? '320px' : '0px',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Outlet />
        </motion.div>

        {/* Right Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="absolute right-0 top-0 h-full w-full md:w-80 bg-white shadow-2xl border-l border-slate-200 overflow-auto z-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-blue-900">Navegación</h2>
                  <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-blue-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {navigationOptions.map((option, index) => (
                    <Link key={option.path} to={option.path} onClick={() => setSidebarOpen(false)}>
                      <motion.div
                        className={`p-4 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 hover:from-teal-50 hover:to-cyan-50 transition-all cursor-pointer border ${
                          location.pathname === option.path 
                            ? 'border-teal-400 bg-teal-50' 
                            : 'border-slate-200 hover:border-teal-300'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <option.icon className="w-5 h-5 text-blue-700" />
                          <h3 className="font-semibold text-blue-900">{option.title}</h3>
                        </div>
                        <p className="text-sm text-slate-600 ml-8">{option.description}</p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-slate-600">
          <span className="text-slate-800 font-medium">C.T.P Santa Rosa</span>
          <div className="text-left sm:text-right">
            <div>Mathias Hidalgo Marin</div>
            <div>Gabriel Madrigal Carvajal</div>
          </div>
        </div>
      </footer>
    </div>
  );
}