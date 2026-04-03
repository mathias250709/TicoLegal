import { useState } from 'react';
import { Calculator, Briefcase, Plane, Gift, DollarSign, Clock, TrendingUp, FileText } from 'lucide-react';

type CalculatorType = 'liquidacion' | 'vacaciones' | 'aguinaldo' | 'preaviso' | 'cesantia' | 'horas-extra' | 'salario-neto' | null;

export default function Calculos() {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType>(null);

  const calculators = [
    {
      id: 'liquidacion' as CalculatorType,
      nombre: 'Liquidación Laboral',
      descripcion: 'Calcula el monto total de liquidación al terminar la relación laboral',
      icon: Briefcase,
      color: 'bg-blue-600',
    },
    {
      id: 'vacaciones' as CalculatorType,
      nombre: 'Vacaciones',
      descripcion: 'Calcula los días y monto de vacaciones proporcionales',
      icon: Plane,
      color: 'bg-teal-600',
    },
    {
      id: 'aguinaldo' as CalculatorType,
      nombre: 'Aguinaldo',
      descripcion: 'Calcula el aguinaldo proporcional según meses trabajados',
      icon: Gift,
      color: 'bg-green-600',
    },
    {
      id: 'preaviso' as CalculatorType,
      nombre: 'Preaviso',
      descripcion: 'Calcula el preaviso según tiempo laborado',
      icon: Clock,
      color: 'bg-orange-600',
    },
    {
      id: 'cesantia' as CalculatorType,
      nombre: 'Cesantía',
      descripcion: 'Calcula el auxilio de cesantía según años trabajados',
      icon: TrendingUp,
      color: 'bg-purple-600',
    },
    {
      id: 'horas-extra' as CalculatorType,
      nombre: 'Horas Extra',
      descripcion: 'Calcula el pago de horas extra diurnas y nocturnas',
      icon: Clock,
      color: 'bg-cyan-600',
    },
    {
      id: 'salario-neto' as CalculatorType,
      nombre: 'Salario Neto',
      descripcion: 'Calcula el salario neto después de deducciones CCSS e impuestos',
      icon: DollarSign,
      color: 'bg-indigo-600',
    },
  ];

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case 'liquidacion':
        return <LiquidacionCalculator />;
      case 'vacaciones':
        return <VacacionesCalculator />;
      case 'aguinaldo':
        return <AguinaldoCalculator />;
      case 'preaviso':
        return <PreavisoCalculator />;
      case 'cesantia':
        return <CesantiaCalculator />;
      case 'horas-extra':
        return <HorasExtraCalculator />;
      case 'salario-neto':
        return <SalarioNetoCalculator />;
      default:
        return null;
    }
  };

  if (selectedCalculator) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <button
          onClick={() => setSelectedCalculator(null)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Volver a calculadoras
        </button>
        {renderCalculator()}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Calculadoras Laborales</h1>
        <p className="text-slate-600">Herramientas para calcular prestaciones laborales según el Código de Trabajo de Costa Rica</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => (
          <button
            key={calc.id}
            onClick={() => setSelectedCalculator(calc.id)}
            className="text-left"
          >
            <div className={`${calc.color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105`}>
              <div className="flex flex-col items-start text-white">
                <calc.icon className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{calc.nombre}</h3>
                <p className="text-blue-50 text-sm">{calc.descripcion}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Nota Legal</h3>
            <p className="text-sm text-blue-800">
              Estos cálculos son referenciales y se basan en el Código de Trabajo de Costa Rica (Ley 2). 
              Para situaciones específicas, consulte con un profesional en derecho laboral o el Ministerio de Trabajo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Calculadora de Liquidación
function LiquidacionCalculator() {
  const [salario, setSalario] = useState('');
  const [mesesTrabajados, setMesesTrabajados] = useState('');
  const [motivoDespido, setMotivoDespido] = useState('sin-responsabilidad');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const sal = parseFloat(salario);
    const meses = parseFloat(mesesTrabajados);
    const años = meses / 12;

    if (!sal || !meses) return;

    // Preaviso
    let preaviso = 0;
    if (meses >= 3 && meses < 6) preaviso = sal * 0.5; // 1 semana
    else if (meses >= 6 && meses < 12) preaviso = sal * 0.5; // 2 semanas
    else if (meses >= 12) preaviso = sal; // 1 mes

    // Cesantía (solo si despido sin responsabilidad del trabajador)
    let cesantia = 0;
    if (motivoDespido === 'sin-responsabilidad') {
      if (años >= 0.25 && años < 1) cesantia = sal * años * 0.5;
      else if (años >= 1) cesantia = sal * Math.min(años, 8);
    }

    // Vacaciones proporcionales
    const vacaciones = (sal / 12) * meses;

    // Aguinaldo proporcional
    const aguinaldo = (sal / 12) * (new Date().getMonth() + 1);

    const total = preaviso + cesantia + vacaciones + aguinaldo;

    setResultado({
      preaviso,
      cesantia,
      vacaciones,
      aguinaldo,
      total,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-blue-900">Calculadora de Liquidación</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Salario mensual bruto (₡)</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="500000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Meses trabajados</label>
          <input
            type="number"
            value={mesesTrabajados}
            onChange={(e) => setMesesTrabajados(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Motivo de terminación</label>
          <select
            value={motivoDespido}
            onChange={(e) => setMotivoDespido(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sin-responsabilidad">Despido sin responsabilidad del trabajador</option>
            <option value="con-responsabilidad">Despido con responsabilidad del trabajador</option>
            <option value="renuncia">Renuncia voluntaria</option>
          </select>
        </div>

        <button
          onClick={calcular}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Calcular Liquidación
        </button>
      </div>

      {resultado && (
        <div className="space-y-3 pt-6 border-t border-slate-200">
          <h3 className="font-semibold text-lg text-blue-900 mb-4">Desglose de Liquidación</h3>
          
          <div className="flex justify-between p-3 bg-slate-50 rounded">
            <span className="text-slate-700">Preaviso:</span>
            <span className="font-semibold text-slate-900">₡{resultado.preaviso.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between p-3 bg-slate-50 rounded">
            <span className="text-slate-700">Cesantía:</span>
            <span className="font-semibold text-slate-900">₡{resultado.cesantia.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between p-3 bg-slate-50 rounded">
            <span className="text-slate-700">Vacaciones proporcionales:</span>
            <span className="font-semibold text-slate-900">₡{resultado.vacaciones.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between p-3 bg-slate-50 rounded">
            <span className="text-slate-700">Aguinaldo proporcional:</span>
            <span className="font-semibold text-slate-900">₡{resultado.aguinaldo.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg mt-4">
            <span className="text-white font-semibold text-lg">TOTAL LIQUIDACIÓN:</span>
            <span className="text-white font-bold text-xl">₡{resultado.total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculadora de Vacaciones
function VacacionesCalculator() {
  const [salario, setSalario] = useState('');
  const [mesesTrabajados, setMesesTrabajados] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const sal = parseFloat(salario);
    const meses = parseFloat(mesesTrabajados);

    if (!sal || !meses) return;

    // En Costa Rica: 2 semanas (14 días) por año trabajado
    const diasVacaciones = (meses / 12) * 14;
    const montoVacaciones = (sal / 30) * diasVacaciones;

    setResultado({
      dias: diasVacaciones,
      monto: montoVacaciones,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <Plane className="w-8 h-8 text-teal-600" />
        <h2 className="text-2xl font-bold text-blue-900">Calculadora de Vacaciones</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Salario mensual bruto (₡)</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="500000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Meses trabajados</label>
          <input
            type="number"
            value={mesesTrabajados}
            onChange={(e) => setMesesTrabajados(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="12"
          />
        </div>

        <button
          onClick={calcular}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
        >
          Calcular Vacaciones
        </button>
      </div>

      {resultado && (
        <div className="space-y-3 pt-6 border-t border-slate-200">
          <h3 className="font-semibold text-lg text-blue-900 mb-4">Resultado</h3>
          
          <div className="flex justify-between p-3 bg-slate-50 rounded">
            <span className="text-slate-700">Días de vacaciones:</span>
            <span className="font-semibold text-slate-900">{resultado.dias.toFixed(2)} días</span>
          </div>

          <div className="flex justify-between p-4 bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg mt-4">
            <span className="text-white font-semibold text-lg">MONTO A PAGAR:</span>
            <span className="text-white font-bold text-xl">₡{resultado.monto.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="mt-4 p-4 bg-teal-50 rounded-lg">
            <p className="text-sm text-teal-800">
              En Costa Rica, todo trabajador tiene derecho a 2 semanas (14 días) de vacaciones por cada 50 semanas laboradas (aproximadamente 1 año).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculadora de Aguinaldo
function AguinaldoCalculator() {
  const [salarioDiciembre, setSalarioDiciembre] = useState('');
  const [mesesTrabajados, setMesesTrabajados] = useState('12');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const sal = parseFloat(salarioDiciembre);
    const meses = parseFloat(mesesTrabajados);

    if (!sal || !meses) return;

    // Aguinaldo = 1 mes de salario / 12 * meses trabajados
    const aguinaldo = (sal / 12) * meses;

    setResultado({ aguinaldo });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <Gift className="w-8 h-8 text-green-600" />
        <h2 className="text-2xl font-bold text-blue-900">Calculadora de Aguinaldo</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Salario de diciembre (₡)</label>
          <input
            type="number"
            value={salarioDiciembre}
            onChange={(e) => setSalarioDiciembre(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="500000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Meses trabajados en el año</label>
          <input
            type="number"
            value={mesesTrabajados}
            onChange={(e) => setMesesTrabajados(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="12"
            min="1"
            max="12"
          />
        </div>

        <button
          onClick={calcular}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Calcular Aguinaldo
        </button>
      </div>

      {resultado && (
        <div className="pt-6 border-t border-slate-200">
          <div className="flex justify-between p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg">
            <span className="text-white font-semibold text-lg">AGUINALDO A RECIBIR:</span>
            <span className="text-white font-bold text-xl">₡{resultado.aguinaldo.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              El aguinaldo en Costa Rica equivale a un doceavo del salario de diciembre por cada mes trabajado 
              (del 1 de diciembre del año anterior al 30 de noviembre del año actual). Se paga en la primera quincena de diciembre.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculadora de Preaviso
function PreavisoCalculator() {
  const [salario, setSalario] = useState('');
  const [mesesTrabajados, setMesesTrabajados] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const sal = parseFloat(salario);
    const meses = parseFloat(mesesTrabajados);

    if (!sal || !meses) return;

    let preaviso = 0;
    let periodo = '';

    if (meses < 3) {
      preaviso = 0;
      periodo = 'No aplica (menos de 3 meses)';
    } else if (meses >= 3 && meses < 6) {
      preaviso = sal * 0.5; // 1 semana
      periodo = '1 semana';
    } else if (meses >= 6 && meses < 12) {
      preaviso = sal * 0.5; // 2 semanas
      periodo = '2 semanas';
    } else {
      preaviso = sal; // 1 mes
      periodo = '1 mes';
    }

    setResultado({ preaviso, periodo });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-8 h-8 text-orange-600" />
        <h2 className="text-2xl font-bold text-blue-900">Calculadora de Preaviso</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Salario mensual bruto (₡)</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="500000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Meses trabajados</label>
          <input
            type="number"
            value={mesesTrabajados}
            onChange={(e) => setMesesTrabajados(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="12"
          />
        </div>

        <button
          onClick={calcular}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
        >
          Calcular Preaviso
        </button>
      </div>

      {resultado && (
        <div className="space-y-3 pt-6 border-t border-slate-200">
          <div className="flex justify-between p-3 bg-slate-50 rounded">
            <span className="text-slate-700">Periodo de preaviso:</span>
            <span className="font-semibold text-slate-900">{resultado.periodo}</span>
          </div>

          <div className="flex justify-between p-4 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg">
            <span className="text-white font-semibold text-lg">MONTO DE PREAVISO:</span>
            <span className="text-white font-bold text-xl">₡{resultado.preaviso.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              El preaviso es el aviso que debe dar el patrono o el trabajador antes de dar por terminado el contrato. 
              Si no se da el preaviso, se debe pagar el equivalente al periodo correspondiente.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculadora de Cesantía
function CesantiaCalculator() {
  const [salario, setSalario] = useState('');
  const [añosTrabajados, setAñosTrabajados] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const sal = parseFloat(salario);
    const años = parseFloat(añosTrabajados);

    if (!sal || !años) return;

    let cesantia = 0;

    if (años < 0.25) {
      cesantia = 0;
    } else if (años >= 0.25 && años < 1) {
      cesantia = sal * años * 0.5;
    } else {
      cesantia = sal * Math.min(años, 8);
    }

    setResultado({ cesantia });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-blue-900">Calculadora de Cesantía</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Salario mensual bruto (₡)</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="500000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Años trabajados</label>
          <input
            type="number"
            step="0.1"
            value={añosTrabajados}
            onChange={(e) => setAñosTrabajados(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="2.5"
          />
        </div>

        <button
          onClick={calcular}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Calcular Cesantía
        </button>
      </div>

      {resultado && (
        <div className="pt-6 border-t border-slate-200">
          <div className="flex justify-between p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
            <span className="text-white font-semibold text-lg">AUXILIO DE CESANTÍA:</span>
            <span className="text-white font-bold text-xl">₡{resultado.cesantia.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800 mb-2">
              <strong>Cálculo de cesantía:</strong>
            </p>
            <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
              <li>Menos de 3 meses: No aplica</li>
              <li>3 meses a 1 año: Medio mes por año trabajado</li>
              <li>1 año en adelante: 1 mes por año trabajado</li>
              <li>Tope máximo: 8 meses de salario</li>
            </ul>
            <p className="text-sm text-purple-800 mt-2">
              La cesantía solo aplica en despidos sin responsabilidad del trabajador.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculadora de Horas Extra
function HorasExtraCalculator() {
  const [salarioMensual, setSalarioMensual] = useState('');
  const [horasDiurnas, setHorasDiurnas] = useState('');
  const [horasNocturnas, setHorasNocturnas] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const sal = parseFloat(salarioMensual);
    const hDiurnas = parseFloat(horasDiurnas) || 0;
    const hNocturnas = parseFloat(horasNocturnas) || 0;

    if (!sal) return;

    // Salario por hora: salario mensual / 240 (horas ordinarias al mes)
    const salarioPorHora = sal / 240;

    // Horas extra diurnas: 1.5x
    const montoDiurnas = salarioPorHora * hDiurnas * 1.5;

    // Horas extra nocturnas: 1.5x adicional
    const montoNocturnas = salarioPorHora * hNocturnas * 1.5;

    const total = montoDiurnas + montoNocturnas;

    setResultado({
      salarioPorHora,
      montoDiurnas,
      montoNocturnas,
      total,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-8 h-8 text-cyan-600" />
        <h2 className="text-2xl font-bold text-blue-900">Calculadora de Horas Extra</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Salario mensual bruto (₡)</label>
          <input
            type="number"
            value={salarioMensual}
            onChange={(e) => setSalarioMensual(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="500000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Horas extra diurnas (5:00 am - 7:00 pm)</label>
          <input
            type="number"
            value={horasDiurnas}
            onChange={(e) => setHorasDiurnas(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Horas extra nocturnas (7:00 pm - 5:00 am)</label>
          <input
            type="number"
            value={horasNocturnas}
            onChange={(e) => setHorasNocturnas(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="5"
          />
        </div>

        <button
          onClick={calcular}
          className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
        >
          Calcular Horas Extra
        </button>
      </div>

      {resultado && (
        <div className="space-y-3 pt-6 border-t border-slate-200">
          <h3 className="font-semibold text-lg text-blue-900 mb-4">Desglose de Pago</h3>
          
          <div className="flex justify-between p-3 bg-slate-50 rounded">
            <span className="text-slate-700">Salario por hora:</span>
            <span className="font-semibold text-slate-900">₡{resultado.salarioPorHora.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between p-3 bg-slate-50 rounded">
            <span className="text-slate-700">Horas extra diurnas (1.5x):</span>
            <span className="font-semibold text-slate-900">₡{resultado.montoDiurnas.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between p-3 bg-slate-50 rounded">
            <span className="text-slate-700">Horas extra nocturnas (1.5x):</span>
            <span className="font-semibold text-slate-900">₡{resultado.montoNocturnas.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between p-4 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg mt-4">
            <span className="text-white font-semibold text-lg">TOTAL HORAS EXTRA:</span>
            <span className="text-white font-bold text-xl">₡{resultado.total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculadora de Salario Neto
function SalarioNetoCalculator() {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const bruto = parseFloat(salarioBruto);
    if (!bruto) return;

    // Deducciones CCSS (aproximado 10.67% del trabajador)
    const ccss = bruto * 0.1067;

    // Cálculo de impuesto sobre la renta (tablas 2024)
    let impuestoRenta = 0;
    const añoSalario = bruto * 12;
    
    if (añoSalario > 5247000 && añoSalario <= 7842000) {
      impuestoRenta = ((añoSalario - 5247000) * 0.10) / 12;
    } else if (añoSalario > 7842000 && añoSalario <= 13070000) {
      impuestoRenta = (259500 + (añoSalario - 7842000) * 0.15) / 12;
    } else if (añoSalario > 13070000 && añoSalario <= 20912000) {
      impuestoRenta = (1043700 + (añoSalario - 13070000) * 0.20) / 12;
    } else if (añoSalario > 20912000) {
      impuestoRenta = (2612100 + (añoSalario - 20912000) * 0.25) / 12;
    }

    const totalDeducciones = ccss + impuestoRenta;
    const salarioNeto = bruto - totalDeducciones;

    setResultado({
      bruto,
      ccss,
      impuestoRenta,
      totalDeducciones,
      salarioNeto,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-blue-900">Calculadora de Salario Neto</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Salario mensual bruto (₡)</label>
          <input
            type="number"
            value={salarioBruto}
            onChange={(e) => setSalarioBruto(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="500000"
          />
        </div>

        <button
          onClick={calcular}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          Calcular Salario Neto
        </button>
      </div>

      {resultado && (
        <div className="space-y-3 pt-6 border-t border-slate-200">
          <h3 className="font-semibold text-lg text-blue-900 mb-4">Desglose de Salario</h3>
          
          <div className="flex justify-between p-3 bg-green-50 rounded">
            <span className="text-green-700 font-medium">Salario bruto:</span>
            <span className="font-semibold text-green-900">₡{resultado.bruto.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="space-y-2 my-4">
            <p className="text-sm font-semibold text-slate-700">Deducciones:</p>
            
            <div className="flex justify-between p-3 bg-red-50 rounded">
              <span className="text-red-700">CCSS (10.67%):</span>
              <span className="font-semibold text-red-900">-₡{resultado.ccss.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between p-3 bg-red-50 rounded">
              <span className="text-red-700">Impuesto sobre la renta:</span>
              <span className="font-semibold text-red-900">-₡{resultado.impuestoRenta.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between p-3 bg-red-100 rounded">
              <span className="text-red-800 font-medium">Total deducciones:</span>
              <span className="font-semibold text-red-900">-₡{resultado.totalDeducciones.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="flex justify-between p-4 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg mt-4">
            <span className="text-white font-semibold text-lg">SALARIO NETO:</span>
            <span className="text-white font-bold text-xl">₡{resultado.salarioNeto.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-800">
              Este cálculo es aproximado. Las deducciones reales pueden variar según circunstancias particulares 
              como cargas familiares, préstamos de cooperativas, entre otros.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
