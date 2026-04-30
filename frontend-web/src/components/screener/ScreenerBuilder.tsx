'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Search, 
  Sparkles, 
  Play, 
  Save, 
  Clock, 
  Settings2,
  ChevronDown,
  Loader2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface Condition {
  id: string;
  timeframe: string;
  indicator: string;
  operator: string;
  value: string;
}

interface ScanResult {
  symbol: string;
  price: number;
  change: number;
  indicators: Record<string, number>;
}

export function ScreenerBuilder() {
  const [conditions, setConditions] = useState<Condition[]>([
    { id: '1', timeframe: 'Daily', indicator: 'RSI', operator: '>', value: '60' }
  ]);
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);

  const handleAiBuild = async () => {
    if (!aiQuery) return;
    setIsAiLoading(true);
    try {
      // Calling the AI Engine (Port 8001)
      const res = await axios.post('http://localhost:8001/translate', { query: aiQuery });
      if (res.data.rules) {
        setConditions(res.data.rules);
      }
    } catch (err) {
      console.error("AI Translation failed", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleRunScan = async () => {
    setIsScanning(true);
    try {
      // Calling the Scanner Engine (Port 8002)
      const res = await axios.post('http://localhost:8002/scan', { rules: conditions });
      setResults(res.data.results);
    } catch (err) {
      console.error("Scan execution failed", err);
    } finally {
      setIsScanning(false);
    }
  };

  const addCondition = () => {
    const newId = (conditions.length + 1).toString();
    setConditions([...conditions, { id: newId, timeframe: 'Daily', indicator: 'Close', operator: '>', value: '0' }]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* AI Assistant Bar */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
        <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Screener Assistant</h3>
              <p className="text-xs text-slate-500">Ask in plain English, and I'll build the scan for you.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <Input 
                placeholder="e.g. Find stocks with RSI > 70 and price above 50 EMA on daily chart"
                className="bg-slate-900/50 border-slate-800 h-14 pl-12 focus:ring-blue-500/50 rounded-xl text-white"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiBuild()}
              />
            </div>
            <Button 
              size="lg" 
              onClick={handleAiBuild}
              disabled={isAiLoading}
              className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg min-w-[140px]"
            >
              {isAiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Build Scan"}
            </Button>
          </div>
        </div>
      </div>

      {/* Visual Logic Builder */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg">
              <Settings2 className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Scan Logic</h3>
          </div>
        </div>

        <div className="space-y-3">
          {conditions.map((condition, index) => (
            <motion.div
              key={condition.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl group"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-slate-500 text-xs font-bold font-mono">
                {index + 1}
              </div>
              
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-300 font-medium">{condition.timeframe}</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                <span className="text-sm text-blue-400 font-bold">{condition.indicator}</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                <span className="text-sm text-emerald-400 font-bold">{condition.operator}</span>
              </div>

              <Input 
                value={condition.value}
                onChange={(e) => {
                  const newConditions = [...conditions];
                  newConditions[index].value = e.target.value;
                  setConditions(newConditions);
                }}
                className="w-24 bg-slate-950 border-slate-800 text-slate-300 h-9"
              />

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removeCondition(condition.id)}
                className="ml-auto opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800/50 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={addCondition}
            className="border-dashed border-slate-800 text-slate-500 hover:border-blue-500 bg-transparent h-12 px-6 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Filter Condition
          </Button>

          <Button 
            size="lg" 
            onClick={handleRunScan}
            disabled={isScanning}
            className="h-12 px-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg min-w-[160px]"
          >
            {isScanning ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Play className="w-5 h-5 mr-2 fill-current" />}
            Run Scan
          </Button>
        </div>
      </div>

      {/* Results Table */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Scan Results ({results.length})
              </h3>
              <div className="text-xs text-slate-500">Updated just now</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Symbol</th>
                    <th className="px-6 py-4 font-medium text-right">LTP</th>
                    <th className="px-6 py-4 font-medium text-right">Change</th>
                    <th className="px-6 py-4 font-medium text-right">RSI</th>
                    <th className="px-6 py-4 font-medium text-right">EMA 50</th>
                    <th className="px-6 py-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {results.map((stock) => (
                    <tr key={stock.symbol} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{stock.symbol}</div>
                        <div className="text-[10px] text-slate-500">NSE INDIA</div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-white">₹{stock.price}</td>
                      <td className={cn(
                        "px-6 py-4 text-right font-bold",
                        stock.change >= 0 ? "text-emerald-500" : "text-red-500"
                      )}>
                        {stock.change > 0 ? "+" : ""}{stock.change}%
                      </td>
                      <td className="px-6 py-4 text-right text-slate-300 font-mono">{stock.indicators.RSI}</td>
                      <td className="px-6 py-4 text-right text-slate-300 font-mono">₹{stock.indicators.EMA_50}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10 h-8 px-3 rounded-lg">
                          Analyze
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
