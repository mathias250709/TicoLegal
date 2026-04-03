import { Link } from 'react-router';
import { motion } from 'motion/react';
import { DollarSign, Scale, Calculator, FileText } from 'lucide-react';

export default function Home() {
  const mainOptions = [
    { id: 1, title: 'Cambio de divisas', icon: DollarSign, color: 'bg-sky-500', path: '/divisas' },
    { id: 2, title: 'Leyes', icon: Scale, color: 'bg-teal-600', path: '/leyes' },
    { id: 3, title: 'Cálculos', icon: Calculator, color: 'bg-cyan-500', path: '/calculos' },
    { id: 4, title: 'Formularios', icon: FileText, color: 'bg-blue-600', path: '/formularios' },
  ];

  return (
    <div className="flex items-center justify-center min-h-full p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Bienvenido a TicoLegal</h1>
          <p className="text-base md:text-lg text-slate-600">
            Tu plataforma integral para información legal y herramientas financieras de Costa Rica
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {mainOptions.map((option) => (
            <Link key={option.id} to={option.path}>
              <motion.div
                className={`${option.color} rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center text-white">
                  <option.icon className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-center">{option.title}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}