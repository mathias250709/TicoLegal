import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Search, ExternalLink, FileText, Info, Globe } from 'lucide-react';

interface Formulario {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  leyRelacionada?: string;
  formato: string;
  palabrasClave: string[];
  portalUrl: string;
  portalNombre: string;
  instrucciones: string;
  nota?: string;
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
      nombre: 'Declaración de Renta - Personas Físicas y Jurídicas',
      descripcion: 'Declaración jurada anual del impuesto sobre la renta. Obligatoria para personas físicas y jurídicas con actividades lucrativas.',
      categoria: 'Tributario',
      leyRelacionada: 'Ley 7092',
      formato: 'En línea (ATV)',
      palabrasClave: ['renta', 'impuesto', 'declaración', 'tributario', 'hacienda', 'D101'],
      portalUrl: 'https://atv.hacienda.go.cr',
      portalNombre: 'Portal ATV - Ministerio de Hacienda',
      instrucciones: '1. Ingresá al portal ATV con tu cédula y contraseña.\n2. Seleccioná "Declaraciones" en el menú superior.\n3. Elegí la declaración D-101 del período correspondiente.\n4. Completá los campos de ingresos, costos y deducciones.\n5. Presentá antes del 15 de marzo de cada año.',
      nota: 'Este trámite se realiza 100% en línea en el portal de Hacienda. Necesitás cédula y contraseña de ATV.',
    },
    {
      id: '2',
      codigo: 'CT-01',
      nombre: 'Contrato de Trabajo Indefinido',
      descripcion: 'Modelo de contrato laboral por tiempo indefinido según el Código de Trabajo costarricense.',
      categoria: 'Laboral',
      leyRelacionada: 'Código de Trabajo',
      formato: 'PDF descargable',
      palabrasClave: ['contrato', 'trabajo', 'empleo', 'laboral', 'MTSS'],
      portalUrl: 'https://www.mtss.go.cr/tramites-y-servicios/formularios.html',
      portalNombre: 'Ministerio de Trabajo y Seguridad Social (MTSS)',
      instrucciones: '1. Descargá el modelo de contrato desde el portal del MTSS.\n2. Completá los datos del empleador y trabajador.\n3. Especificá salario, jornada y funciones.\n4. Firmá en presencia de dos testigos.\n5. Registrá el contrato en el MTSS dentro de los 8 días siguientes.',
      nota: 'El MTSS ofrece modelos de contratos gratuitos en su portal oficial.',
    },
    {
      id: '3',
      codigo: 'SA-05',
      nombre: 'Solicitud de Simplificación Administrativa',
      descripcion: 'Formulario para solicitar la simplificación de trámites administrativos ante el Estado.',
      categoria: 'Administrativo',
      leyRelacionada: 'Ley 8220',
      formato: 'En línea',
      palabrasClave: ['trámite', 'simplificación', 'administrativo', 'gobierno'],
      portalUrl: 'https://www.meic.go.cr/meic/tramites',
      portalNombre: 'MEIC - Ministerio de Economía',
      instrucciones: '1. Ingresá al portal del MEIC.\n2. Describí el trámite que deseás simplificar.\n3. Explicá las razones y beneficios esperados.\n4. Presentá la solicitud en línea o en sus oficinas.\n5. Recibirás respuesta en un plazo de 30 días hábiles.',
    },
    {
      id: '4',
      codigo: 'DP-10',
      nombre: 'Solicitud de Acceso a Datos Personales',
      descripcion: 'Formulario para solicitar acceso, rectificación o eliminación de datos personales ante la PRODHAB.',
      categoria: 'Privacidad',
      leyRelacionada: 'Ley 8968',
      formato: 'En línea',
      palabrasClave: ['datos', 'privacidad', 'protección', 'habeas data', 'PRODHAB'],
      portalUrl: 'https://www.prodhab.go.cr/servicios',
      portalNombre: 'PRODHAB - Agencia de Protección de Datos',
      instrucciones: '1. Ingresá al portal de PRODHAB.\n2. Identificáte con cédula o pasaporte.\n3. Especificá qué datos deseás acceder o modificar.\n4. Indicá la entidad responsable de esos datos.\n5. Plazo de respuesta: 10 días hábiles.',
      nota: 'Podés presentar tu solicitud en línea o de forma presencial en las oficinas de PRODHAB.',
    },
    {
      id: '5',
      codigo: 'RN-20',
      nombre: 'Inscripción de Nacimiento',
      descripcion: 'Trámite para inscribir nacimientos en el Registro Civil del Tribunal Supremo de Elecciones.',
      categoria: 'Registro Civil',
      formato: 'Presencial / En línea',
      palabrasClave: ['nacimiento', 'registro', 'civil', 'inscripción', 'TSE', 'cédula'],
      portalUrl: 'https://www.tse.go.cr/registro_civil.htm',
      portalNombre: 'TSE - Tribunal Supremo de Elecciones',
      instrucciones: '1. Presentáte en cualquier oficina del Registro Civil con el certificado médico de nacimiento.\n2. Llevá las cédulas de ambos padres.\n3. Completá el formulario de inscripción en la oficina.\n4. Plazo: debe inscribirse dentro de los 8 días posteriores al nacimiento.\n5. En zonas remotas, el plazo se puede extender.',
      nota: 'Este trámite requiere presencia física en el Registro Civil. El TSE tiene oficinas en todo el país.',
    },
    {
      id: '6',
      codigo: 'PM-15',
      nombre: 'Permiso de Construcción',
      descripcion: 'Solicitud de permiso municipal para construcción o remodelación de edificaciones.',
      categoria: 'Construcción',
      formato: 'Plataforma APC',
      palabrasClave: ['construcción', 'permiso', 'municipal', 'obras', 'CFIA', 'APC'],
      portalUrl: 'https://apc.cfia.or.cr',
      portalNombre: 'APC - Administración de Proyectos de Construcción (CFIA)',
      instrucciones: '1. Ingresá a la plataforma APC del CFIA con tu cuenta.\n2. Registrá tu proyecto con los planos visados por un ingeniero o arquitecto.\n3. Adjuntá estudio de suelos y cálculos estructurales si aplica.\n4. La municipalidad revisará y aprobará el permiso.\n5. Pagá los timbres municipales correspondientes.',
      nota: 'Todos los permisos de construcción en Costa Rica se tramitan a través de la plataforma APC del CFIA.',
    },
    {
      id: '7',
      codigo: 'EIA-01',
      nombre: 'Evaluación de Impacto Ambiental (SETENA)',
      descripcion: 'Formulario para presentar la evaluación ambiental inicial de proyectos ante SETENA.',
      categoria: 'Ambiental',
      formato: 'En línea (SETENA)',
      palabrasClave: ['ambiental', 'SETENA', 'impacto', 'medio ambiente', 'viabilidad'],
      portalUrl: 'https://www.setena.go.cr/tramites',
      portalNombre: 'SETENA - Secretaría Técnica Ambiental',
      instrucciones: '1. Ingresá al portal de SETENA.\n2. Completá la evaluación ambiental inicial (D1 o D2 según el proyecto).\n3. Adjuntá descripción detallada del proyecto y mapas.\n4. Incluí medidas de mitigación ambiental propuestas.\n5. Pagá el timbre de SETENA correspondiente.',
      nota: 'El tipo de formulario (D1, D2, D3) depende del tamaño e impacto del proyecto.',
    },
    {
      id: '8',
      codigo: 'CCSS-AF',
      nombre: 'Afiliación a la CCSS',
      descripcion: 'Trámite de afiliación a la Caja Costarricense de Seguro Social como trabajador independiente o asegurado voluntario.',
      categoria: 'Seguridad Social',
      formato: 'En línea / Presencial',
      palabrasClave: ['CCSS', 'seguro', 'afiliación', 'salud', 'caja', 'pensión'],
      portalUrl: 'https://aissfa.ccss.sa.cr/afiliacion',
      portalNombre: 'Oficina Virtual CCSS',
      instrucciones: '1. Ingresá a la Oficina Virtual de la CCSS.\n2. Seleccioná el tipo de afiliación: asalariado, independiente o voluntario.\n3. Completá tus datos personales y adjuntá copia de cédula.\n4. Para trabajadores independientes, indicá tu actividad económica y salario reportado.\n5. También podés presentarte en cualquier sucursal de la CCSS.',
      nota: 'Los patronos deben inscribir a sus empleados dentro de los 8 días de inicio de labores.',
    },
  ];

  const categorias = ['Todos', ...Array.from(new Set(formularios.map(f => f.categoria)))];

  const filteredFormularios = formularios.filter((formulario) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      formulario.nombre.toLowerCase().includes(search) ||
      formulario.codigo.toLowerCase().includes(search) ||
      formulario.descripcion.toLowerCase().includes(search) ||
      formulario.palabrasClave.some(p => p.toLowerCase().includes(search)) ||
      (formulario.leyRelacionada && formulario.leyRelacionada.toLowerCase().includes(search));
    const matchesCategory = selectedCategory === 'Todos' || formulario.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (id) {
      const element = document.getElementById(`formulario-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-orange-400');
        setTimeout(() => element.classList.remove('ring-4', 'ring-orange-400'), 3000);
      }
    }
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Formularios y Trámites</h1>
        <p className="text-sm md:text-base text-slate-600">
          Información y acceso directo a los trámites oficiales del gobierno de Costa Rica
        </p>
      </div>

      {/* Aviso informativo */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Los trámites oficiales del gobierno costarricense se realizan en los portales de cada institución.
          Aquí encontrás la información y el enlace directo a cada portal para que no tengas que buscarlos.
        </p>
      </div>

      {/* Búsqueda y filtros */}
      <div className="mb-6 md:mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder="Buscar trámites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
          />
        </div>
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
            Se encontraron {filteredFormularios.length} trámite(s)
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
              {/* Badges */}
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

              {/* Portal oficial */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <Globe className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span className="text-xs md:text-sm text-slate-600 flex-1">
                  Portal: <span className="font-semibold text-blue-900">{formulario.portalNombre}</span>
                </span>
              </div>

              {/* Nota especial si existe */}
              {formulario.nota && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs md:text-sm text-amber-800">
                    <span className="font-semibold">📌 Nota: </span>{formulario.nota}
                  </p>
                </div>
              )}

              {/* Palabras clave */}
              <div className="flex flex-wrap gap-2 mb-4">
                {formulario.palabrasClave.map((palabra) => (
                  <span key={palabra} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                    {palabra}
                  </span>
                ))}
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <a
                  href={formulario.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ir al portal oficial</span>
                </a>
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
                    Pasos para completar el trámite
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
            <p className="text-slate-500 text-base md:text-lg">No se encontraron trámites que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
