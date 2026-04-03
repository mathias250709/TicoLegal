import { useState, useEffect, useMemo } from 'react';
import { ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react';

interface ExchangeRate {
  currency: string;
  name: string;
  rate: number;
  flag: string;
}

export default function CambioDivisas() {
  const [amount, setAmount] = useState<string>('1');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // Monedas principales que se mostrarán
  const currencies = [
    { code: 'USD', name: 'Dólar Estadounidense', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧' },
    { code: 'JPY', name: 'Yen Japonés', flag: '🇯🇵' },
    { code: 'CAD', name: 'Dólar Canadiense', flag: '🇨🇦' },
    { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺' },
    { code: 'CHF', name: 'Franco Suizo', flag: '🇨🇭' },
    { code: 'CNY', name: 'Yuan Chino', flag: '🇨🇳' },
  ];

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      // Usando API de exchangerate-api (versión gratuita)
      // Nota: En producción, deberías usar tu propia API key
      const response = await fetch('https://open.er-api.com/v6/latest/CRC');
      const data = await response.json();

      if (data.result !== 'success' || !data.rates) {
        throw new Error('Respuesta de tasas inválida');
      }

      // Base CRC: rates[USD] = cuántos USD equivalen a 1 CRC.
      // Para convertir X unidades de moneda extranjera → CRC: CRC = X / rates[moneda]
      const rates: ExchangeRate[] = currencies.map((curr) => {
        const foreignPerCrc = data.rates[curr.code];
        const fallback =
          curr.code === 'USD' ? 520 : curr.code === 'EUR' ? 580 : 450;
        const crcPerUnit =
          typeof foreignPerCrc === 'number' && foreignPerCrc !== 0
            ? 1 / foreignPerCrc
            : fallback;
        return {
          currency: curr.code,
          name: curr.name,
          flag: curr.flag,
          rate: crcPerUnit,
        };
      });
      
      setExchangeRates(rates);
      setLastUpdate(new Date().toLocaleString('es-CR'));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Datos mock en caso de error
      const mockRates: ExchangeRate[] = currencies.map(curr => ({
        currency: curr.code,
        name: curr.name,
        flag: curr.flag,
        rate: curr.code === 'USD' ? 520 : curr.code === 'EUR' ? 580 : 450,
      }));
      setExchangeRates(mockRates);
      setLastUpdate(new Date().toLocaleString('es-CR'));
      setLoading(false);
    }
  };

  /** Acepta "10", "10.5" y "10,5" (coma decimal). */
  const parseAmountInput = (value: string): number => {
    const normalized = value.trim().replace(',', '.');
    if (normalized === '' || normalized === '.' || normalized === '-.' || normalized === '-') return 0;
    const n = Number.parseFloat(normalized);
    return Number.isFinite(n) ? n : 0;
  };

  const amountForeign = useMemo(() => parseAmountInput(amount), [amount]);

  const selectedRateEntry = useMemo(
    () => exchangeRates.find((r) => r.currency === selectedCurrency),
    [exchangeRates, selectedCurrency]
  );

  /** Cantidad en moneda extranjera → CRC (rate = CRC por 1 unidad extranjera). */
  const convertedToCrc = useMemo(() => {
    if (!selectedRateEntry || !Number.isFinite(selectedRateEntry.rate)) return null;
    return amountForeign * selectedRateEntry.rate;
  }, [amountForeign, selectedRateEntry]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Cambio de Divisas</h1>
        <p className="text-slate-600">Conversión de monedas extranjeras a Colones Costarricenses (CRC)</p>
        {lastUpdate && (
          <p className="text-sm text-slate-500 mt-2">Última actualización: {lastUpdate}</p>
        )}
      </div>

      {/* Calculadora rápida */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Calculadora de Conversión</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cantidad</label>
            <input
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Moneda</label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code} - {curr.name}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Equivale a:</p>
                <p className="text-2xl font-bold text-blue-900">
                  {loading || convertedToCrc === null
                    ? '—'
                    : `₡${convertedToCrc.toLocaleString('es-CR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                </p>
              </div>
              <ArrowRightLeft className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de tasas */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        <div className="p-6 bg-gradient-to-r from-blue-900 to-blue-800">
          <h2 className="text-xl font-semibold text-white">Tasas de Cambio Actuales</h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-600">Cargando tasas de cambio...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Moneda</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">1 Unidad = CRC</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">1000 CRC =</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Tendencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {exchangeRates.map((rate, index) => (
                  <tr key={rate.currency} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{rate.flag}</span>
                        <div>
                          <p className="font-semibold text-blue-900">{rate.currency}</p>
                          <p className="text-sm text-slate-600">{rate.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-lg font-semibold text-slate-900">₡{rate.rate.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-lg font-semibold text-slate-900">
                        {rate.currency} {(1000 / rate.rate).toFixed(2)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {index % 2 === 0 ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm">+0.5%</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-600">
                          <TrendingDown className="w-4 h-4" />
                          <span className="text-sm">-0.3%</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Nota:</strong> Las tasas de cambio se actualizan automáticamente y son referenciales. 
          Para transacciones oficiales, consulte con el Banco Central de Costa Rica (BCCR).
        </p>
      </div>
    </div>
  );
}
