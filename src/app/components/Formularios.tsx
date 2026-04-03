import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Search, Download, FileText, ExternalLink, Info } from 'lucide-react';

interface Formulario {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  leyRelacionada?: string;
  formato: string;
  palabrasClave: string[];
  url: string;
  instrucciones: string;
}

export default function Formularios() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showInstrucciones, setShowInstrucciones] = useState<string | null>(null);

  const formularios: Formulario[] = [
    {
      id: '1',
      codigo: 'D-101',
      nombre: 'Declaración de Renta - Personas Físicas',
      descripcion: 'Formulario para la declaración anual del impuesto sobre la renta para personas físicas.',
      categoria: 'Tributario',
      leyRelacionada: 'Ley 7092',
      formato: 'PDF',
      palabrasClave: ['renta', 'impuesto', 'declaración', 'tributario', 'hacienda'],
      url: 'https://www.hacienda.go.cr/docs/formularios/D101.pdf',
      instrucciones: '1. Complete todos los campos obligatorios del formulario.\n2. Adjunte los comprobantes de ingresos y deducciones.\n3. Presente el formulario en las oficinas de Tributación o en línea.\n4. Plazo de presentación: antes del 15 de marzo de cada año.',
    },
    {
      id: '2',
      codigo: 'CT-01',
      nombre: 'Contrato de Trabajo Indefinido',
      descripcion: 'Modelo de contrato laboral por tiempo indefinido según el Código de Trabajo.',
      categoria: 'Laboral',
      leyRelacionada: 'Ley 2',
      formato: 'Word',
      palabrasClave: ['contrato', 'trabajo', 'empleo', 'laboral'],
      url: 'https://www.mtss.go.cr/formularios/contrato-trabajo.docx',
      instrucciones: '1. Complete los datos del empleador y trabajador.\n2. Especifique salario, jornada y funciones.\n3. Firme en presencia de dos testigos.\n4. Inscriba el contrato en el Ministerio de Trabajo dentro de los 8 días siguientes.',
    },
    {
      id: '3',
      codigo: 'SA-05',
      nombre: 'Solicitud de Simplificación Administrativa',
      descripcion: 'Formulario para solicitar la simplificación de trámites administrativos.',
      categoria: 'Administrativo',
      leyRelacionada: 'Ley 8220',
      formato: 'PDF',
      palabrasClave: ['trámite', 'simplificación', 'administrativo'],
      url: 'https://www.mejoregulatoria.go.cr/formularios/SA-05.pdf',
      instrucciones: '1. Describa el trámite que desea simplificar.\n2. Explique las razones y beneficios esperados.\n3. Presente ante la Dirección de Mejora Regulatoria.\n4. Recibirá respuesta en un plazo de 30 días hábiles.',
    },
    {
      id: '4',
      codigo: 'DP-10',
      nombre: 'Solicitud de Acceso a Datos Personales',
      descripcion: 'Formulario para solicitar acceso, rectificación o eliminación de datos personales.',
      categoria: 'Privacidad',
      leyRelacionada: 'Ley 8968',
      formato: 'PDF',
      palabrasClave: ['datos', 'privacidad', 'protección', 'habeas data'],
      url: 'https://www.prodhab.go.cr/formularios/DP-10.pdf',
      instrucciones: '1. Identifíquese con cédula o pasaporte.\n2. Especifique qué datos desea acceder o modificar.\n3. Presente ante PRODHAB o la entidad responsable.\n4. Plazo de respuesta: 10 días hábiles.',
    },
    {
      id: '5',
      codigo: 'RN-20',
      nombre: 'Inscripción de Nacimiento',
      descripcion: 'Formulario para inscribir nacimientos en el Registro Civil.',
      categoria: 'Registro Civil',
      formato: 'PDF',
      palabrasClave: ['nacimiento', 'registro', 'civil', 'inscripción'],
      url: 'https://www.tse.go.cr/registro-civil/formularios/RN-20.pdf',
      instrucciones: '1. Complete con datos del recién nacido y padres.\n2. Adjunte certificado médico de nacimiento.\n3. Presente cédulas de los padres.\n4. Plazo: debe inscribirse dentro de los 8 días posteriores al nacimiento.',
    },
    {
      id: '6',
      codigo: 'PM-15',
      nombre: 'Permiso de Construcción',
      descripcion: 'Solicitud de permiso municipal para construcción o remodelación.',
      categoria: 'Construcción',
      formato: 'PDF',
      palabrasClave: ['construcción', 'permiso', 'municipal', 'obras'],
      url: 'https://www.ifam.go.cr/construccion/PM-15.pdf',
      instrucciones: '1. Adjunte planos visados por el CFIA.\n2. Presente estudio de suelos y cálculos estructurales.\n3. Pague los timbres municipales correspondientes.\n4. El permiso se tramita en la municipalidad del cantón donde se construirá.',
    },
    {
      id: '7',
      codigo: 'AM-08',
      nombre: 'Estudio de Impacto Ambiental',
      descripcion: 'Formulario para presentar estudios de impacto ambiental (SETENA).',
      categoria: 'Ambiental',
      formato: 'Excel',
      palabrasClave: ['ambiental', 'setena', 'impacto', 'medio ambiente'],
      url: 'https://www.setena.go.cr/formularios/AM-08.xlsx',
      instrucciones: '1. Complete la evaluación ambiental inicial.\n2. Adjunte descripción detallada del proyecto.\n3. Incluya medidas de mitigación ambiental.\n4. Presente ante SETENA con los documentos del proyecto.',
    },
    {
      id: '8',
      codigo: 'SS-12',
      nombre: 'Afiliación a la CCSS',
      descripcion: 'Formulario de afiliación a la Caja Costarricense de Seguro Social.',
      categoria: 'Seguridad Social',
      formato: 'PDF',
      palabrasClave: ['ccss', 'seguro', 'afiliación', 'salud'],
      url: 'https://www.ccss.sa.cr/formularios/SS-12.pdf',
      instrucciones: '1. Complete datos personales del asegurado.\n2. Indique condición: asalariado, independiente o voluntario.\n3. Adjunte copia de cédula y comprobante de domicilio.\n4. Presente en cualquier sucursal de la CCSS.',
    },
  ];

  const categorias = ['Todos', ...Array.from(new Set(formularios.map(f => f.categoria)))];

  const filteredFormularios = formularios.filter((formulario) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = 
      formulario.nombre.toLowerCase().includes(search) ||
      formulario.codigo.toLowerCase().includes(search) ||
      formulario.descripcion.toLowerCase().includes(search) ||
      formulario.palabrasClave.some(palabra => palabra.toLowerCase().includes(search)) ||
      (formulario.leyRelacionada && formulario.leyRelacionada.toLowerCase().includes(search));
    
    const matchesCategory = selectedCategory === 'Todos' || formulario.categoria === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Highlight formulario si se viene de una ley
  useEffect(() => {
    if (id) {
      const element = document.getElementById(`formulario-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-orange-400');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-orange-400');
        }, 3000);
      }
    }
  }, [id]);

  const handleDownload = (formulario: Formulario) => {
    // Crear un enlace temporal para descargar
    const link = document.createElement('a');
    link.href = formulario.url;
    link.download = `${formulario.codigo}-${formulario.nombre}.${formulario.formato.toLowerCase()}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Formularios</h1>
        <p className="text-sm md:text-base text-slate-600">Descarga formularios oficiales para cumplir con las leyes de Costa Rica</p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6 md:mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder="Buscar formularios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
          />
        </div>

        {/* Filtro por categoría */}
        <div className="flex gap-2 flex-wrap">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setSelectedCategory(categoria)}
              className={`px-3 py-2 text-sm md:text-base rounded-lg transition-colors ${
                selectedCategory === categoria
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {(searchTerm || selectedCategory !== 'Todos') && (
          <p className="text-xs md:text-sm text-slate-600">
            Se encontraron {filteredFormularios.length} formulario(s)
          </p>
        )}
      </div>

      {/* Lista de formularios */}
      <div className="grid gap-4 md:gap-6">
        {filteredFormularios.map((formulario) => (
          <div
            key={formulario.id}
            id={`formulario-${formulario.codigo}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200 overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-semibold">
                    {formulario.codigo}
                  </span>
                  <span className="px-2 md:px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs md:text-sm">
                    {formulario.categoria}
                  </span>
                  <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs md:text-sm">
                    {formulario.formato}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-2">{formulario.nombre}</h3>
                <p className="text-sm md:text-base text-slate-600 mb-3">{formulario.descripcion}</p>
                
                {formulario.leyRelacionada && (
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-3 h-3 md:w-4 md:h-4 text-slate-500 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-slate-600">
                      Relacionado con: <span className="font-semibold">{formulario.leyRelacionada}</span>
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {formulario.palabrasClave.map((palabra) => (
                    <span
                      key={palabra}
                      className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
                    >
                      {palabra}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones responsive */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <button 
                  onClick={() => handleDownload(formulario)}
                  className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar</span>
                </button>
                <button 
                  onClick={() => setShowInstrucciones(showInstrucciones === formulario.id ? null : formulario.id)}
                  className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  <Info className="w-4 h-4" />
                  <span>{showInstrucciones === formulario.id ? 'Ocultar instrucciones' : 'Ver instrucciones'}</span>
                </button>
              </div>

              {/* Instrucciones desplegables */}
              {showInstrucciones === formulario.id && (
                <div className="mt-4 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2 text-sm md:text-base flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Instrucciones de llenado
                  </h4>
                  <div className="text-xs md:text-sm text-blue-800 whitespace-pre-line">
                    {formulario.instrucciones}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredFormularios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-base md:text-lg">No se encontraron formularios que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}