import { useState } from 'react';
import { Link } from 'react-router';
import { Search, FileText, ExternalLink } from 'lucide-react';

interface Ley {
  id: string;
  numero: string;
  nombre: string;
  descripcion: string;
  palabrasClave: string[];
  requiereFormulario: boolean;
  formularioId?: string;
  fechaPublicacion: string;
  categoria: string;
}

export default function Leyes() {
  const [searchTerm, setSearchTerm] = useState('');

  // Datos mock de leyes de Costa Rica
  const leyes: Ley[] = [
    {
      id: '1',
      numero: 'Ley 7092',
      nombre: 'Ley del Impuesto sobre la Renta',
      descripcion: 'Regula el impuesto sobre las utilidades, rentas y ganancias de capital.',
      palabrasClave: ['impuesto', 'renta', 'tributario', 'fiscal', 'declaración'],
      requiereFormulario: true,
      formularioId: 'D-101',
      fechaPublicacion: '21/04/1988',
      categoria: 'Tributario',
    },
    {
      id: '2',
      numero: 'Ley 2',
      nombre: 'Código de Trabajo',
      descripcion: 'Regula las relaciones entre patronos y trabajadores.',
      palabrasClave: ['trabajo', 'laboral', 'empleado', 'patrono', 'contrato'],
      requiereFormulario: true,
      formularioId: 'CT-01',
      fechaPublicacion: '27/08/1943',
      categoria: 'Laboral',
    },
    {
      id: '3',
      numero: 'Ley 7600',
      nombre: 'Ley de Igualdad de Oportunidades para las Personas con Discapacidad',
      descripcion: 'Establece derechos y obligaciones relacionados con la accesibilidad.',
      palabrasClave: ['discapacidad', 'accesibilidad', 'derechos', 'igualdad'],
      requiereFormulario: false,
      fechaPublicacion: '02/05/1996',
      categoria: 'Derechos Humanos',
    },
    {
      id: '4',
      numero: 'Ley 8220',
      nombre: 'Ley de Protección al Ciudadano del Exceso de Requisitos y Trámites Administrativos',
      descripcion: 'Simplifica trámites administrativos y protege al ciudadano.',
      palabrasClave: ['trámites', 'administrativo', 'requisitos', 'simplificación'],
      requiereFormulario: true,
      formularioId: 'SA-05',
      fechaPublicacion: '04/03/2002',
      categoria: 'Administrativo',
    },
    {
      id: '5',
      numero: 'Ley 7935',
      nombre: 'Ley Integral para la Persona Adulta Mayor',
      descripcion: 'Garantiza derechos y beneficios para personas adultas mayores.',
      palabrasClave: ['adulto mayor', 'pensión', 'derechos', 'tercera edad'],
      requiereFormulario: false,
      fechaPublicacion: '25/10/1999',
      categoria: 'Seguridad Social',
    },
    {
      id: '6',
      numero: 'Ley 8968',
      nombre: 'Ley de Protección de la Persona Frente al Tratamiento de sus Datos Personales',
      descripcion: 'Regula la protección de datos personales y privacidad.',
      palabrasClave: ['datos personales', 'privacidad', 'protección', 'información'],
      requiereFormulario: true,
      formularioId: 'DP-10',
      fechaPublicacion: '05/07/2011',
      categoria: 'Privacidad',
    },
    {
      id: '7',
      numero: 'Ley 1',
      nombre: 'Código Civil',
      descripcion: 'Regula las relaciones civiles, incluyendo personas, familia, bienes, sucesiones, obligaciones y contratos.',
      palabrasClave: ['civil', 'contratos', 'familia', 'bienes', 'sucesiones'],
      requiereFormulario: false,
      fechaPublicacion: '26/04/1888',
      categoria: 'Civil',
    },
    {
      id: '8',
      numero: 'Ley 3',
      nombre: 'Código Penal',
      descripcion: 'Establece los delitos, penas y medidas de seguridad.',
      palabrasClave: ['penal', 'delitos', 'penas', 'criminal'],
      requiereFormulario: false,
      fechaPublicacion: '04/03/1971',
      categoria: 'Penal',
    },
    {
      id: '9',
      numero: 'Ley 4',
      nombre: 'Código de Comercio',
      descripcion: 'Regula las actividades comerciales, sociedades mercantiles y operaciones comerciales.',
      palabrasClave: ['comercio', 'sociedades', 'mercantil', 'empresas'],
      requiereFormulario: false,
      fechaPublicacion: '03/04/1964',
      categoria: 'Comercial',
    },
    {
      id: '10',
      numero: 'Ley 5',
      nombre: 'Código de Familia',
      descripcion: 'Regula las relaciones familiares, matrimonio, divorcio, patria potestad y tutela.',
      palabrasClave: ['familia', 'matrimonio', 'divorcio', 'hijos', 'patria potestad'],
      requiereFormulario: true,
      formularioId: 'FAM-01',
      fechaPublicacion: '21/12/1973',
      categoria: 'Familia',
    },
    {
      id: '11',
      numero: 'Ley 6',
      nombre: 'Ley Orgánica del Poder Judicial',
      descripcion: 'Organiza el sistema judicial costarricense.',
      palabrasClave: ['judicial', 'tribunales', 'justicia', 'poder judicial'],
      requiereFormulario: false,
      fechaPublicacion: '09/11/1973',
      categoria: 'Judicial',
    },
    {
      id: '12',
      numero: 'Ley 7',
      nombre: 'Código Procesal Penal',
      descripcion: 'Regula los procedimientos en materia penal.',
      palabrasClave: ['procesal penal', 'proceso', 'juzgamiento', 'procedimiento'],
      requiereFormulario: false,
      fechaPublicacion: '10/04/1996',
      categoria: 'Procesal',
    },
    {
      id: '13',
      numero: 'Ley 8',
      nombre: 'Código Procesal Civil',
      descripcion: 'Establece los procedimientos judiciales en materia civil.',
      palabrasClave: ['procesal civil', 'demanda', 'juicio', 'procedimiento civil'],
      requiereFormulario: false,
      fechaPublicacion: '01/01/1989',
      categoria: 'Procesal',
    },
    {
      id: '14',
      numero: 'Ley 17',
      nombre: 'Código Electoral',
      descripcion: 'Regula el proceso electoral y el Tribunal Supremo de Elecciones.',
      palabrasClave: ['electoral', 'elecciones', 'votación', 'TSE'],
      requiereFormulario: false,
      fechaPublicacion: '02/08/2009',
      categoria: 'Electoral',
    },
    {
      id: '15',
      numero: 'Ley 276',
      nombre: 'Ley de Aguas',
      descripcion: 'Regula el uso y aprovechamiento de aguas.',
      palabrasClave: ['aguas', 'recursos hídricos', 'concesión'],
      requiereFormulario: true,
      formularioId: 'AG-01',
      fechaPublicacion: '27/08/1942',
      categoria: 'Ambiental',
    },
    {
      id: '16',
      numero: 'Ley 7476',
      nombre: 'Ley de Justicia Tributaria',
      descripcion: 'Complementa y reforma las disposiciones tributarias.',
      palabrasClave: ['tributario', 'impuestos', 'justicia tributaria'],
      requiereFormulario: true,
      formularioId: 'D-102',
      fechaPublicacion: '20/12/1994',
      categoria: 'Tributario',
    },
    {
      id: '17',
      numero: 'Ley 7554',
      nombre: 'Ley Orgánica del Ambiente',
      descripcion: 'Regula la protección del ambiente y recursos naturales.',
      palabrasClave: ['ambiente', 'ecología', 'recursos naturales', 'medio ambiente'],
      requiereFormulario: false,
      fechaPublicacion: '04/10/1995',
      categoria: 'Ambiental',
    },
    {
      id: '18',
      numero: 'Ley 7978',
      nombre: 'Ley de Pensiones y Jubilaciones',
      descripcion: 'Regula el régimen de pensiones del magisterio nacional.',
      palabrasClave: ['pensiones', 'jubilación', 'magisterio', 'retiro'],
      requiereFormulario: true,
      formularioId: 'PEN-01',
      fechaPublicacion: '16/01/2000',
      categoria: 'Seguridad Social',
    },
    {
      id: '19',
      numero: 'Ley 8764',
      nombre: 'Ley General de la Administración Pública',
      descripcion: 'Regula la organización y funcionamiento de la administración pública.',
      palabrasClave: ['administración pública', 'funcionarios', 'gobierno'],
      requiereFormulario: false,
      fechaPublicacion: '02/05/1978',
      categoria: 'Administrativo',
    },
    {
      id: '20',
      numero: 'Ley 7794',
      nombre: 'Código Municipal',
      descripcion: 'Regula la organización y funcionamiento de las municipalidades.',
      palabrasClave: ['municipal', 'municipalidad', 'gobierno local'],
      requiereFormulario: false,
      fechaPublicacion: '30/04/1998',
      categoria: 'Municipal',
    },
    {
      id: '21',
      numero: 'Ley 6227',
      nombre: 'Ley General de Aduanas',
      descripcion: 'Regula el régimen aduanero y control de importaciones y exportaciones.',
      palabrasClave: ['aduanas', 'importación', 'exportación', 'comercio exterior'],
      requiereFormulario: true,
      formularioId: 'ADU-01',
      fechaPublicacion: '02/05/1978',
      categoria: 'Aduanero',
    },
    {
      id: '22',
      numero: 'Ley 7786',
      nombre: 'Ley sobre Estupefacientes, Sustancias Psicotrópicas, Drogas de Uso no Autorizado',
      descripcion: 'Regula la prevención y sanción del tráfico de drogas.',
      palabrasClave: ['drogas', 'estupefacientes', 'narcotráfico'],
      requiereFormulario: false,
      fechaPublicacion: '30/04/1998',
      categoria: 'Penal',
    },
    {
      id: '23',
      numero: 'Ley 7788',
      nombre: 'Ley de Biodiversidad',
      descripcion: 'Conserva la biodiversidad y el uso sostenible de los recursos.',
      palabrasClave: ['biodiversidad', 'conservación', 'especies', 'flora', 'fauna'],
      requiereFormulario: false,
      fechaPublicacion: '30/04/1998',
      categoria: 'Ambiental',
    },
    {
      id: '24',
      numero: 'Ley 7972',
      nombre: 'Ley de Impuesto sobre el Valor Agregado',
      descripcion: 'Establece el IVA sobre la venta de mercancías y servicios.',
      palabrasClave: ['IVA', 'impuesto', 'valor agregado', 'ventas'],
      requiereFormulario: true,
      formularioId: 'D-104',
      fechaPublicacion: '22/12/2000',
      categoria: 'Tributario',
    },
    {
      id: '25',
      numero: 'Ley 8292',
      nombre: 'Ley General de Control Interno',
      descripcion: 'Establece el marco normativo del control interno en las instituciones públicas.',
      palabrasClave: ['control interno', 'auditoría', 'fiscalización'],
      requiereFormulario: false,
      fechaPublicacion: '31/07/2002',
      categoria: 'Administrativo',
    },
    {
      id: '26',
      numero: 'Ley 8689',
      nombre: 'Ley de Fortalecimiento de la Gestión Tributaria',
      descripcion: 'Fortalece los mecanismos de control y recaudación tributaria.',
      palabrasClave: ['tributario', 'recaudación', 'evasión fiscal'],
      requiereFormulario: false,
      fechaPublicacion: '11/12/2008',
      categoria: 'Tributario',
    },
    {
      id: '27',
      numero: 'Ley 7476',
      nombre: 'Ley contra la Corrupción y el Enriquecimiento Ilícito',
      descripcion: 'Previene y sanciona la corrupción en el sector público.',
      palabrasClave: ['corrupción', 'enriquecimiento ilícito', 'ética pública'],
      requiereFormulario: false,
      fechaPublicacion: '03/11/2004',
      categoria: 'Penal',
    },
    {
      id: '28',
      numero: 'Ley 7739',
      nombre: 'Código de la Niñez y la Adolescencia',
      descripcion: 'Protege los derechos de niños, niñas y adolescentes.',
      palabrasClave: ['niñez', 'adolescencia', 'menores', 'PANI', 'derechos infantiles'],
      requiereFormulario: false,
      fechaPublicacion: '06/01/1998',
      categoria: 'Familia',
    },
    {
      id: '29',
      numero: 'Ley 7142',
      nombre: 'Ley de Promoción de la Competencia y Defensa Efectiva del Consumidor',
      descripcion: 'Protege los derechos del consumidor y promueve la competencia.',
      palabrasClave: ['consumidor', 'competencia', 'defensa del consumidor'],
      requiereFormulario: true,
      formularioId: 'CONS-01',
      fechaPublicacion: '08/03/1990',
      categoria: 'Comercial',
    },
    {
      id: '30',
      numero: 'Ley 7735',
      nombre: 'Ley General de Protección a la Madre Adolescente',
      descripcion: 'Protege los derechos de las madres adolescentes.',
      palabrasClave: ['madre adolescente', 'embarazo', 'protección'],
      requiereFormulario: false,
      fechaPublicacion: '19/12/1997',
      categoria: 'Familia',
    },
    {
      id: '31',
      numero: 'Ley 8687',
      nombre: 'Ley de Control de Partidos Políticos',
      descripcion: 'Regula la organización y financiamiento de partidos políticos.',
      palabrasClave: ['partidos políticos', 'financiamiento', 'transparencia'],
      requiereFormulario: false,
      fechaPublicacion: '04/12/2008',
      categoria: 'Electoral',
    },
    {
      id: '32',
      numero: 'Ley 9406',
      nombre: 'Ley de Fortalecimiento de las Finanzas Públicas',
      descripcion: 'Moderniza el sistema tributario y fortalece las finanzas públicas.',
      palabrasClave: ['finanzas públicas', 'reforma fiscal', 'impuestos'],
      requiereFormulario: true,
      formularioId: 'D-150',
      fechaPublicacion: '04/12/2018',
      categoria: 'Tributario',
    },
    {
      id: '33',
      numero: 'Ley 8899',
      nombre: 'Ley de Procedimientos de Observancia de los Derechos de Propiedad Intelectual',
      descripcion: 'Protege los derechos de propiedad intelectual.',
      palabrasClave: ['propiedad intelectual', 'patentes', 'marcas', 'derechos de autor'],
      requiereFormulario: false,
      fechaPublicacion: '18/11/2010',
      categoria: 'Comercial',
    },
    {
      id: '34',
      numero: 'Ley 7476',
      nombre: 'Ley de Información no Suministrada',
      descripcion: 'Regula las sanciones por no suministrar información requerida.',
      palabrasClave: ['información', 'sanciones', 'transparencia'],
      requiereFormulario: false,
      fechaPublicacion: '20/12/1994',
      categoria: 'Administrativo',
    },
    {
      id: '35',
      numero: 'Ley 8591',
      nombre: 'Ley de Desarrollo Social y Asignaciones Familiares',
      descripcion: 'Combate la pobreza mediante programas sociales.',
      palabrasClave: ['desarrollo social', 'FODESAF', 'asignaciones familiares', 'pobreza'],
      requiereFormulario: true,
      formularioId: 'SOC-01',
      fechaPublicacion: '29/04/2007',
      categoria: 'Seguridad Social',
    },
    {
      id: '36',
      numero: 'Ley 8562',
      nombre: 'Ley de Penalización de la Violencia contra las Mujeres',
      descripcion: 'Tipifica y sanciona las formas de violencia contra las mujeres.',
      palabrasClave: ['violencia', 'mujeres', 'género', 'femicidio'],
      requiereFormulario: false,
      fechaPublicacion: '25/04/2007',
      categoria: 'Penal',
    },
    {
      id: '37',
      numero: 'Ley 9028',
      nombre: 'Ley General de Telecomunicaciones',
      descripcion: 'Regula el mercado de telecomunicaciones.',
      palabrasClave: ['telecomunicaciones', 'telefonía', 'internet', 'SUTEL'],
      requiereFormulario: false,
      fechaPublicacion: '19/06/2012',
      categoria: 'Telecomunicaciones',
    },
    {
      id: '38',
      numero: 'Ley 8839',
      nombre: 'Ley para la Gestión Integral de Residuos',
      descripcion: 'Regula la gestión de residuos sólidos.',
      palabrasClave: ['residuos', 'basura', 'reciclaje', 'gestión ambiental'],
      requiereFormulario: false,
      fechaPublicacion: '13/07/2010',
      categoria: 'Ambiental',
    },
    {
      id: '39',
      numero: 'Ley 9234',
      nombre: 'Ley Reguladora del Mercado de Seguros',
      descripcion: 'Regula el mercado de seguros y la actividad aseguradora.',
      palabrasClave: ['seguros', 'aseguradoras', 'SUGESE', 'pólizas'],
      requiereFormulario: false,
      fechaPublicacion: '16/04/2014',
      categoria: 'Comercial',
    },
    {
      id: '40',
      numero: 'Ley 6043',
      nombre: 'Ley sobre Zona Marítimo Terrestre',
      descripcion: 'Regula el uso y administración de la zona marítimo terrestre.',
      palabrasClave: ['playa', 'zona marítima', 'concesión', 'costa'],
      requiereFormulario: true,
      formularioId: 'ZMT-01',
      fechaPublicacion: '02/03/1977',
      categoria: 'Administrativo',
    },
  ];

  const filteredLeyes = leyes.filter((ley) => {
    const search = searchTerm.toLowerCase();
    return (
      ley.nombre.toLowerCase().includes(search) ||
      ley.numero.toLowerCase().includes(search) ||
      ley.descripcion.toLowerCase().includes(search) ||
      ley.palabrasClave.some(palabra => palabra.toLowerCase().includes(search)) ||
      ley.categoria.toLowerCase().includes(search)
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Leyes de Costa Rica</h1>
        <p className="text-slate-600">Consulta el marco legal actualizado de Costa Rica</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, número de ley, palabras clave o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-slate-600">
            Se encontraron {filteredLeyes.length} resultado(s)
          </p>
        )}
      </div>

      {/* Lista de leyes */}
      <div className="space-y-4">
        {filteredLeyes.map((ley) => (
          <div
            key={ley.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {ley.numero}
                    </span>
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                      {ley.categoria}
                    </span>
                    {ley.requiereFormulario && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Requiere formulario
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{ley.nombre}</h3>
                  <p className="text-slate-600 mb-3">{ley.descripcion}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {ley.palabrasClave.map((palabra) => (
                      <span
                        key={palabra}
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
                      >
                        {palabra}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">
                    Fecha de publicación: {ley.fechaPublicacion}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Ver ley completa
                </button>
                {ley.requiereFormulario && (
                  <Link to={`/formularios/${ley.formularioId}`}>
                    <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                      <FileText className="w-4 h-4" />
                      Ir al formulario ({ley.formularioId})
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredLeyes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No se encontraron leyes que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}