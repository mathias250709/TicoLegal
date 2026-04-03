import { useState } from 'react';
import { Link } from 'react-router';
import { Search, FileText, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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
  urlSCIJ?: string;
}

const LEYES_POR_PAGINA = 10;

export default function Leyes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  const leyes: Ley[] = [
    // TRIBUTARIO
    { id: '1', numero: 'Ley 7092', nombre: 'Ley del Impuesto sobre la Renta', descripcion: 'Regula el impuesto sobre las utilidades, rentas y ganancias de capital de personas físicas y jurídicas con actividades lucrativas en Costa Rica.', palabrasClave: ['impuesto', 'renta', 'tributario', 'fiscal', 'declaración', 'D-101'], requiereFormulario: true, formularioId: 'D-101', fechaPublicacion: '21/04/1988', categoria: 'Tributario', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=11153' },
    { id: '2', numero: 'Ley 6826', nombre: 'Ley del Impuesto General sobre las Ventas (IVA)', descripcion: 'Establece el impuesto al valor agregado del 13% sobre la venta de bienes y prestación de servicios en Costa Rica.', palabrasClave: ['IVA', 'ventas', 'impuesto', 'consumo', 'hacienda'], requiereFormulario: false, fechaPublicacion: '08/11/1982', categoria: 'Tributario', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=9702' },
    { id: '3', numero: 'Ley 9635', nombre: 'Ley de Fortalecimiento de las Finanzas Públicas', descripcion: 'Reforma fiscal que convirtió el impuesto de ventas en IVA y estableció medidas de consolidación fiscal para reducir el déficit del Estado.', palabrasClave: ['finanzas', 'fiscal', 'IVA', 'déficit', 'reforma'], requiereFormulario: false, fechaPublicacion: '03/12/2018', categoria: 'Tributario', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=87849' },
    { id: '4', numero: 'Ley 7900', nombre: 'Ley de Justicia Tributaria', descripcion: 'Establece los principios de justicia y equidad en el sistema tributario costarricense, incluyendo procedimientos de impugnación y recursos.', palabrasClave: ['tributario', 'justicia', 'impuesto', 'fiscal', 'recurso'], requiereFormulario: false, fechaPublicacion: '01/09/1999', categoria: 'Tributario', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=46128' },
    // LABORAL
    { id: '5', numero: 'Ley 2', nombre: 'Código de Trabajo', descripcion: 'Regula las relaciones entre patronos y trabajadores, estableciendo derechos como salario mínimo, vacaciones, cesantía, jornada laboral y contratos.', palabrasClave: ['trabajo', 'laboral', 'empleado', 'patrono', 'contrato', 'salario'], requiereFormulario: true, formularioId: 'CT-01', fechaPublicacion: '27/08/1943', categoria: 'Laboral', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=8045' },
    { id: '6', numero: 'Ley 9343', nombre: 'Reforma Procesal Laboral', descripcion: 'Moderniza el proceso judicial laboral, introduce la oralidad en los juicios de trabajo y mejora el acceso a la justicia laboral.', palabrasClave: ['laboral', 'proceso', 'judicial', 'oralidad', 'juicio'], requiereFormulario: false, fechaPublicacion: '25/01/2016', categoria: 'Laboral', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=80278' },
    { id: '7', numero: 'Ley 6727', nombre: 'Ley sobre Riesgos del Trabajo', descripcion: 'Regula la protección de los trabajadores ante accidentes laborales y enfermedades profesionales, administrada por el INS.', palabrasClave: ['riesgo', 'accidente', 'laboral', 'INS', 'seguro', 'trabajo'], requiereFormulario: false, fechaPublicacion: '09/03/1982', categoria: 'Laboral', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=9297' },
    // CIVIL Y FAMILIA
    { id: '8', numero: 'Ley 63', nombre: 'Código Civil', descripcion: 'Regula las relaciones jurídicas civiles: contratos, propiedad, sucesiones, obligaciones y derechos reales entre personas.', palabrasClave: ['civil', 'contrato', 'propiedad', 'herencia', 'obligaciones'], requiereFormulario: false, fechaPublicacion: '28/09/1887', categoria: 'Civil', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=15437' },
    { id: '9', numero: 'Ley 5476', nombre: 'Código de Familia', descripcion: 'Regula el matrimonio, divorcio, filiación, adopción, patria potestad, pensiones alimentarias y relaciones familiares en Costa Rica.', palabrasClave: ['familia', 'matrimonio', 'divorcio', 'adopción', 'pensión alimentaria'], requiereFormulario: false, fechaPublicacion: '21/12/1973', categoria: 'Civil', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=970' },
    { id: '10', numero: 'Ley 7142', nombre: 'Ley de Promoción de la Igualdad Social de la Mujer', descripcion: 'Garantiza igualdad de derechos entre hombres y mujeres en el ámbito laboral, educativo, político y social.', palabrasClave: ['mujer', 'igualdad', 'género', 'derechos', 'discriminación'], requiereFormulario: false, fechaPublicacion: '26/03/1990', categoria: 'Derechos Humanos', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=15862' },
    // PENAL
    { id: '11', numero: 'Ley 4573', nombre: 'Código Penal', descripcion: 'Define los delitos y las penas aplicables en Costa Rica: homicidio, robo, fraude, delitos informáticos, tráfico de drogas y más.', palabrasClave: ['penal', 'delito', 'crimen', 'pena', 'prisión', 'robo'], requiereFormulario: false, fechaPublicacion: '15/11/1970', categoria: 'Penal', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=5027' },
    { id: '12', numero: 'Ley 7594', nombre: 'Código Procesal Penal', descripcion: 'Establece el proceso penal acusatorio: investigación, juicio oral, derechos del imputado, víctimas y recursos.', palabrasClave: ['proceso', 'penal', 'juicio', 'imputado', 'defensa', 'oral'], requiereFormulario: false, fechaPublicacion: '10/04/1996', categoria: 'Penal', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=22nValor2=22nValor2=22' },
    { id: '13', numero: 'Ley 8204', nombre: 'Ley sobre Estupefacientes y Drogas de Uso no Autorizado', descripcion: 'Penaliza el tráfico, fabricación y posesión de drogas ilícitas. Regula también el tratamiento y rehabilitación de adicciones.', palabrasClave: ['drogas', 'narcotráfico', 'estupefacientes', 'penal', 'tráfico'], requiereFormulario: false, fechaPublicacion: '27/12/2001', categoria: 'Penal', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=49247' },
    { id: '14', numero: 'Ley 8589', nombre: 'Ley de Penalización de la Violencia contra las Mujeres', descripcion: 'Tipifica delitos de violencia doméstica, física, psicológica, sexual y patrimonial contra mujeres en relaciones de pareja.', palabrasClave: ['violencia', 'mujer', 'doméstica', 'femicidio', 'género', 'penal'], requiereFormulario: false, fechaPublicacion: '30/05/2007', categoria: 'Penal', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=60183' },
    // ADMINISTRATIVO
    { id: '15', numero: 'Ley 6227', nombre: 'Ley General de la Administración Pública', descripcion: 'Regula la organización y funcionamiento del Estado costarricense, los procedimientos administrativos y los derechos de los administrados.', palabrasClave: ['administración', 'Estado', 'procedimiento', 'recurso', 'público'], requiereFormulario: false, fechaPublicacion: '02/05/1978', categoria: 'Administrativo', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=6771' },
    { id: '16', numero: 'Ley 8220', nombre: 'Ley de Protección al Ciudadano del Exceso de Requisitos y Trámites Administrativos', descripcion: 'Simplifica trámites del Estado, prohíbe requisitos innecesarios y protege al ciudadano de la burocracia excesiva.', palabrasClave: ['trámites', 'burocracia', 'simplificación', 'requisitos', 'Estado'], requiereFormulario: true, formularioId: 'SA-05', fechaPublicacion: '04/03/2002', categoria: 'Administrativo', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=49351' },
    { id: '17', numero: 'Ley 4000', nombre: 'Código Municipal', descripcion: 'Regula la organización y funcionamiento de las municipalidades, sus competencias, presupuestos y relación con los vecinos.', palabrasClave: ['municipalidad', 'cantón', 'alcalde', 'concejo', 'impuesto municipal'], requiereFormulario: false, fechaPublicacion: '19/12/1970', categoria: 'Administrativo', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=6497' },
    { id: '18', numero: 'Ley 8292', nombre: 'Ley General de Control Interno', descripcion: 'Establece los principios y normas de control interno en el sector público costarricense para prevenir la corrupción.', palabrasClave: ['control', 'interno', 'público', 'auditoría', 'transparencia'], requiereFormulario: false, fechaPublicacion: '31/07/2002', categoria: 'Administrativo', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=50676' },
    // SEGURIDAD SOCIAL
    { id: '19', numero: 'Ley 17', nombre: 'Ley Constitutiva de la CCSS', descripcion: 'Crea la Caja Costarricense de Seguro Social y establece el seguro de salud y pensiones obligatorio para todos los trabajadores.', palabrasClave: ['CCSS', 'seguro', 'salud', 'pensión', 'afiliación', 'caja'], requiereFormulario: true, formularioId: 'CCSS-AF', fechaPublicacion: '22/10/1943', categoria: 'Seguridad Social', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=8235' },
    { id: '20', numero: 'Ley 7935', nombre: 'Ley Integral para la Persona Adulta Mayor', descripcion: 'Garantiza derechos y beneficios para personas mayores de 65 años: salud, pensión, educación y no discriminación.', palabrasClave: ['adulto mayor', 'pensión', 'vejez', 'tercera edad', 'derechos'], requiereFormulario: false, fechaPublicacion: '25/10/1999', categoria: 'Seguridad Social', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=46437' },
    { id: '21', numero: 'Ley 7983', nombre: 'Ley de Protección al Trabajador', descripcion: 'Crea el sistema de pensiones complementarias, fondos de capitalización laboral y regula el ahorro para el retiro de los trabajadores.', palabrasClave: ['pensión', 'ahorro', 'retiro', 'capitalización', 'trabajador', 'OPC'], requiereFormulario: false, fechaPublicacion: '18/02/2000', categoria: 'Seguridad Social', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=46703' },
    // DERECHOS HUMANOS
    { id: '22', numero: 'Ley 7600', nombre: 'Ley de Igualdad de Oportunidades para las Personas con Discapacidad', descripcion: 'Garantiza accesibilidad, inclusión laboral, educativa y social para personas con discapacidad en todos los ámbitos de la vida.', palabrasClave: ['discapacidad', 'accesibilidad', 'inclusión', 'igualdad', 'derechos'], requiereFormulario: false, fechaPublicacion: '02/05/1996', categoria: 'Derechos Humanos', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=22614' },
    { id: '23', numero: 'Ley 7739', nombre: 'Código de la Niñez y la Adolescencia', descripcion: 'Protege los derechos de niños y adolescentes: educación, salud, no violencia, trabajo infantil y participación.', palabrasClave: ['niñez', 'adolescente', 'menor', 'PANI', 'protección', 'derechos'], requiereFormulario: false, fechaPublicacion: '06/02/1998', categoria: 'Derechos Humanos', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=45237' },
    { id: '24', numero: 'Ley 8968', nombre: 'Ley de Protección de Datos Personales', descripcion: 'Regula el tratamiento de datos personales, crea la PRODHAB y garantiza el derecho de acceso, rectificación y cancelación de datos.', palabrasClave: ['datos personales', 'privacidad', 'PRODHAB', 'habeas data', 'información'], requiereFormulario: true, formularioId: 'DP-10', fechaPublicacion: '05/09/2011', categoria: 'Derechos Humanos', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=70975' },
    { id: '25', numero: 'Ley 7476', nombre: 'Ley contra el Hostigamiento Sexual en el Empleo y la Docencia', descripcion: 'Prohíbe y sanciona el acoso sexual en el trabajo y en centros educativos, establece procedimientos de denuncia.', palabrasClave: ['acoso', 'sexual', 'hostigamiento', 'laboral', 'docencia', 'denuncia'], requiereFormulario: false, fechaPublicacion: '03/03/1995', categoria: 'Derechos Humanos', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=21738' },
    { id: '26', numero: 'Ley 9234', nombre: 'Ley de Reforma Migratoria', descripcion: 'Regula el ingreso, permanencia y salida de personas extranjeras, y los derechos de los migrantes en Costa Rica.', palabrasClave: ['migración', 'extranjero', 'residencia', 'DIMEX', 'visa', 'DGME'], requiereFormulario: false, fechaPublicacion: '14/11/2013', categoria: 'Derechos Humanos', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=75996' },
    // AMBIENTAL
    { id: '27', numero: 'Ley 7575', nombre: 'Ley Forestal', descripcion: 'Regula el uso y conservación de los bosques, el pago de servicios ambientales y las actividades forestales en Costa Rica.', palabrasClave: ['bosque', 'forestal', 'FONAFIFO', 'tala', 'reforestación', 'ambiental'], requiereFormulario: false, fechaPublicacion: '13/03/1996', categoria: 'Ambiental', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=22581' },
    { id: '28', numero: 'Ley 7317', nombre: 'Ley de Conservación de la Vida Silvestre', descripcion: 'Protege la fauna y flora silvestre del país, regula la caza, extracción y comercio de especies silvestres.', palabrasClave: ['vida silvestre', 'fauna', 'flora', 'caza', 'biodiversidad', 'SINAC'], requiereFormulario: false, fechaPublicacion: '30/10/1992', categoria: 'Ambiental', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=16287' },
    { id: '29', numero: 'Ley 7554', nombre: 'Ley Orgánica del Ambiente', descripcion: 'Establece los principios de la política ambiental de Costa Rica: desarrollo sostenible, SETENA y protección de recursos naturales.', palabrasClave: ['ambiente', 'SETENA', 'sostenible', 'contaminación', 'recursos naturales'], requiereFormulario: false, fechaPublicacion: '04/10/1995', categoria: 'Ambiental', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=20999' },
    { id: '30', numero: 'Ley 7788', nombre: 'Ley de Biodiversidad', descripcion: 'Protege la biodiversidad del país, regula el acceso a los recursos genéticos y los derechos de las comunidades indígenas sobre ellos.', palabrasClave: ['biodiversidad', 'genético', 'indígena', 'especie', 'CONAGEBIO'], requiereFormulario: false, fechaPublicacion: '30/04/1998', categoria: 'Ambiental', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=35162' },
    { id: '31', numero: 'Ley 8839', nombre: 'Ley para la Gestión Integral de Residuos', descripcion: 'Establece el marco legal para el manejo de residuos sólidos, reciclaje, reducción y responsabilidad extendida del productor.', palabrasClave: ['residuos', 'basura', 'reciclaje', 'contaminación', 'desechos'], requiereFormulario: false, fechaPublicacion: '13/07/2010', categoria: 'Ambiental', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=68300' },
    // COMERCIO Y ECONOMÍA
    { id: '32', numero: 'Ley 3284', nombre: 'Código de Comercio', descripcion: 'Regula las actividades mercantiles: sociedades anónimas, contratos comerciales, cheques, letras de cambio y quiebras.', palabrasClave: ['comercio', 'empresa', 'sociedad anónima', 'mercantil', 'contrato'], requiereFormulario: false, fechaPublicacion: '30/04/1964', categoria: 'Comercial', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=9249' },
    { id: '33', numero: 'Ley 7472', nombre: 'Ley de Promoción de la Competencia y Defensa del Consumidor', descripcion: 'Prohíbe prácticas monopolísticas, protege al consumidor y regula los precios. Crea la COPROCOM y la Comisión de Consumidor.', palabrasClave: ['consumidor', 'monopolio', 'competencia', 'COPROCOM', 'precio', 'garantía'], requiereFormulario: false, fechaPublicacion: '20/12/1994', categoria: 'Comercial', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=21557' },
    { id: '34', numero: 'Ley 7762', nombre: 'Ley General de Concesión de Obras Públicas con Servicios Públicos', descripcion: 'Regula las concesiones del Estado para construcción y operación de obras de infraestructura como carreteras y puertos.', palabrasClave: ['concesión', 'infraestructura', 'carretera', 'obra', 'CONAVI', 'peaje'], requiereFormulario: false, fechaPublicacion: '14/04/1998', categoria: 'Comercial', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=42872' },
    { id: '35', numero: 'Ley 8660', nombre: 'Ley de Fortalecimiento y Modernización de las Entidades Públicas del Sector Telecomunicaciones', descripcion: 'Abre el mercado de telecomunicaciones en Costa Rica, regula la competencia y crea la SUTEL.', palabrasClave: ['telecomunicaciones', 'internet', 'ICE', 'SUTEL', 'telefonía', 'espectro'], requiereFormulario: false, fechaPublicacion: '08/08/2008', categoria: 'Comercial', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=63431' },
    // JUDICIAL
    { id: '36', numero: 'Ley 7333', nombre: 'Ley Orgánica del Poder Judicial', descripcion: 'Organiza el Poder Judicial: Corte Suprema, tribunales, juzgados, OIJ y el Ministerio Público. Establece la carrera judicial.', palabrasClave: ['judicial', 'tribunal', 'corte', 'OIJ', 'juez', 'magistrado'], requiereFormulario: false, fechaPublicacion: '05/05/1993', categoria: 'Judicial', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=17417' },
    { id: '37', numero: 'Ley 9342', nombre: 'Código Procesal Civil', descripcion: 'Regula los procesos civiles: demandas, pruebas, recursos, ejecución de sentencias y procesos de cobro judicial.', palabrasClave: ['civil', 'proceso', 'demanda', 'sentencia', 'recurso', 'ejecución'], requiereFormulario: false, fechaPublicacion: '26/01/2016', categoria: 'Judicial', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=80277' },
    // EDUCACIÓN
    { id: '38', numero: 'Ley 2160', nombre: 'Ley Fundamental de Educación', descripcion: 'Establece los principios del sistema educativo costarricense: gratuidad, obligatoriedad y laicismo de la educación pública.', palabrasClave: ['educación', 'escuela', 'MEP', 'enseñanza', 'gratuita', 'pública'], requiereFormulario: false, fechaPublicacion: '25/09/1957', categoria: 'Educación', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=8657' },
    { id: '39', numero: 'Ley 5338', nombre: 'Ley Orgánica del Ministerio de Educación Pública', descripcion: 'Organiza el MEP, establece sus competencias, la carrera docente y la estructura del sistema educativo nacional.', palabrasClave: ['MEP', 'docente', 'maestro', 'educación', 'ministerio', 'carrera docente'], requiereFormulario: false, fechaPublicacion: '28/08/1973', categoria: 'Educación', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=762' },
    // SALUD
    { id: '40', numero: 'Ley 5395', nombre: 'Ley General de Salud', descripcion: 'Establece el derecho a la salud, organiza el sistema sanitario, regula alimentos, medicamentos y condiciones de salubridad.', palabrasClave: ['salud', 'Ministerio de Salud', 'hospital', 'enfermedad', 'medicamento'], requiereFormulario: false, fechaPublicacion: '30/10/1973', categoria: 'Salud', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=2659' },
    { id: '41', numero: 'Ley 9028', nombre: 'Ley General de Control del Tabaco y sus Efectos Nocivos en la Salud', descripcion: 'Prohíbe fumar en espacios públicos y cerrados, regula la publicidad del tabaco y establece ambientes libres de humo.', palabrasClave: ['tabaco', 'cigarrillo', 'fumar', 'salud', 'prohibición', 'ambientes'], requiereFormulario: false, fechaPublicacion: '08/03/2012', categoria: 'Salud', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=71610' },
    // CONSTRUCCIÓN
    { id: '42', numero: 'Ley 833', nombre: 'Ley de Construcciones', descripcion: 'Regula los permisos de construcción, normas de edificación, responsabilidad de profesionales y sanciones por construcciones ilegales.', palabrasClave: ['construcción', 'permiso', 'edificio', 'CFIA', 'planos', 'obra'], requiereFormulario: true, formularioId: 'PM-15', fechaPublicacion: '02/11/1949', categoria: 'Construcción', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=34918' },
    // REGISTRO CIVIL
    { id: '43', numero: 'Ley 3504', nombre: 'Ley Orgánica del TSE y del Registro Civil', descripcion: 'Crea y organiza el Tribunal Supremo de Elecciones y el Registro Civil: inscripción de nacimientos, matrimonios y defunciones.', palabrasClave: ['TSE', 'registro civil', 'nacimiento', 'cédula', 'matrimonio', 'defunción'], requiereFormulario: true, formularioId: 'RN-20', fechaPublicacion: '10/05/1965', categoria: 'Registro Civil', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=12165' },
    // TECNOLOGÍA
    { id: '44', numero: 'Ley 9977', nombre: 'Ley para Regular el Uso de las Tecnologías Digitales', descripcion: 'Marco regulatorio para el uso de tecnologías digitales por el Estado: firma digital, expediente electrónico y servicios en línea.', palabrasClave: ['digital', 'tecnología', 'firma digital', 'electrónico', 'internet', 'datos'], requiereFormulario: false, fechaPublicacion: '12/01/2021', categoria: 'Tecnología', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=90776' },
    { id: '45', numero: 'Ley 8454', nombre: 'Ley de Certificados, Firmas Digitales y Documentos Electrónicos', descripcion: 'Da validez legal a la firma digital y documentos electrónicos en Costa Rica, regulando su uso en trámites públicos y privados.', palabrasClave: ['firma digital', 'electrónico', 'documento', 'certificado', 'MICITT'], requiereFormulario: false, fechaPublicacion: '30/08/2005', categoria: 'Tecnología', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=56176' },
    // ANTICORRUPCIÓN
    { id: '46', numero: 'Ley 8422', nombre: 'Ley contra la Corrupción y el Enriquecimiento Ilícito en la Función Pública', descripcion: 'Prohíbe el enriquecimiento ilícito de funcionarios públicos, regula declaraciones de bienes y sanciona la corrupción.', palabrasClave: ['corrupción', 'funcionario', 'bienes', 'ética', 'CGHR', 'transparencia'], requiereFormulario: false, fechaPublicacion: '29/10/2004', categoria: 'Administrativo', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=54789' },
    { id: '47', numero: 'Ley 8131', nombre: 'Ley de la Administración Financiera de la República y Presupuestos Públicos', descripcion: 'Regula el manejo del presupuesto del Estado, la ejecución del gasto público y el control financiero de las instituciones.', palabrasClave: ['presupuesto', 'hacienda', 'gasto público', 'finanzas', 'SIGAF'], requiereFormulario: false, fechaPublicacion: '18/09/2001', categoria: 'Administrativo', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=48960' },
    // SEGURIDAD
    { id: '48', numero: 'Ley 7410', nombre: 'Ley General de Policía', descripcion: 'Organiza los cuerpos policiales de Costa Rica: Fuerza Pública, OIJ, Guardia Rural y sus competencias de seguridad.', palabrasClave: ['policía', 'seguridad', 'Fuerza Pública', 'OIJ', 'orden público'], requiereFormulario: false, fechaPublicacion: '26/05/1994', categoria: 'Seguridad', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=20993' },
    // PROPIEDAD INTELECTUAL
    { id: '49', numero: 'Ley 6867', nombre: 'Ley de Patentes de Invención, Dibujos y Modelos Industriales', descripcion: 'Regula el registro y protección de patentes, modelos industriales y derechos de propiedad intelectual en Costa Rica.', palabrasClave: ['patente', 'invención', 'propiedad intelectual', 'registro', 'RNPI'], requiereFormulario: false, fechaPublicacion: '25/04/1983', categoria: 'Comercial', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=9698' },
    // VIVIENDA
    { id: '50', numero: 'Ley 7052', nombre: 'Ley del Sistema Financiero Nacional para la Vivienda', descripcion: 'Crea el BANHVI y el FOSUVI para financiar soluciones habitacionales a familias de bajos recursos en Costa Rica.', palabrasClave: ['vivienda', 'BANHVI', 'FOSUVI', 'bono', 'habitación', 'préstamo'], requiereFormulario: false, fechaPublicacion: '13/08/1986', categoria: 'Seguridad Social', urlSCIJ: 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=12157' },
  ];

  const filteredLeyes = leyes.filter((ley) => {
    const search = searchTerm.toLowerCase();
    return (
      ley.nombre.toLowerCase().includes(search) ||
      ley.numero.toLowerCase().includes(search) ||
      ley.descripcion.toLowerCase().includes(search) ||
      ley.palabrasClave.some(p => p.toLowerCase().includes(search)) ||
      ley.categoria.toLowerCase().includes(search)
    );
  });

  // Paginación
  const totalPaginas = Math.ceil(filteredLeyes.length / LEYES_POR_PAGINA);
  const inicio = (paginaActual - 1) * LEYES_POR_PAGINA;
  const leyesPagina = filteredLeyes.slice(inicio, inicio + LEYES_POR_PAGINA);

  const cambiarPagina = (nueva: number) => {
    setPaginaActual(nueva);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset página al buscar
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPaginaActual(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Leyes de Costa Rica</h1>
        <p className="text-slate-600">Consulta el marco legal actualizado de Costa Rica — {leyes.length} leyes disponibles</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6 md:mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, número de ley, palabras clave o categoría..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
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
        {leyesPagina.map((ley) => (
          <div
            key={ley.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {ley.numero}
                    </span>
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                      {ley.categoria}
                    </span>
                    {ley.requiereFormulario && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Tiene formulario
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-2">{ley.nombre}</h3>
                  <p className="text-slate-600 mb-3 text-sm md:text-base">{ley.descripcion}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {ley.palabrasClave.map((palabra) => (
                      <span key={palabra} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                        {palabra}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">Fecha de publicación: {ley.fechaPublicacion}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3 mt-3">
                {ley.urlSCIJ && (
                  <a
                    href={ley.urlSCIJ}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver ley completa (SCIJ)
                  </a>
                )}
                {ley.requiereFormulario && ley.formularioId && (
                  <Link to={`/formularios/${ley.formularioId}`}>
                    <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
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

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => cambiarPagina(num)}
              className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                paginaActual === num
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Info de paginación */}
      {filteredLeyes.length > 0 && (
        <p className="text-center text-sm text-slate-500 mt-4">
          Mostrando {inicio + 1}–{Math.min(inicio + LEYES_POR_PAGINA, filteredLeyes.length)} de {filteredLeyes.length} leyes
        </p>
      )}
    </div>
  );
}
