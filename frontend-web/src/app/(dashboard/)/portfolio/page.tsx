'use client';

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Wallet, 
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  History
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const pnlData = [
  { day: 'Mon', value: 4000 },
  { day: 'Tue', value: 3000 },
  { day: 'Wed', value: 5500 },
  { day: 'Thu', value: 4800 },
  { day: 'Fri', value: 7200 },
  { day: 'Sat', value: 8100 },
  { day: 'Sun', value: 12500 },
];

const holdings = [
  { symbol: 'RELIANCE', qty: 50, avgPrice: 2840.50, currentPrice: 2940.10, pnl: '+3.5%' },
  { symbol: 'TCS', qty: 20, avgPrice: 3910.00, currentPrice: 3840.20, pnl: '-1.8%' },
  { symbol: 'INFY', qty: 100, avgPrice: 1420.00, currentPrice: 1510.45, pnl: '+6.3%' },
  { symbol: 'HDFCBANK', qty: 30, avgPrice: 1410.20, currentPrice: 1425.00, pnl: '+1.0%' },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Portfolio Analytics</h1>
          <p className="text-slate-400">Track your performance and manage your assets in real-time.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-800 text-slate-300 rounded-xl h-12 px-6">
            <History className="w-4 h-4 mr-2" />
            Trade Log
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-6">
            Export Report
          </Button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-600 border-none text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <CardContent className="p-6">
            <div className="text-sm font-medium opacity-80 mb-1 uppercase tracking-wider">Total Value</div>
            <div className="text-3xl font-bold">₹8,42,150.00</div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold bg-white/20 w-fit px-2 py-1 rounded-full">
               <ArrowUpRight className="w-3 h-3" />
               +12.5% This Month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 text-white">
          <CardContent className="p-6">
            <div className="text-sm text-slate-500 mb-1 uppercase tracking-wider">Unrealized P&L</div>
            <div className="text-3xl font-bold text-emerald-500">+₹45,200.00</div>
            <div className="text-xs text-slate-500 mt-4">Calculated from LTP</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 text-white">
          <CardContent className="p-6">
            <div className="text-sm text-slate-500 mb-1 uppercase tracking-wider">Today's P&L</div>
            <div className="text-3xl font-bold text-red-500">-₹1,240.00</div>
            <div className="text-xs text-slate-500 mt-4">Market down -0.4%</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 text-white">
          <CardContent className="p-6">
            <div className="text-sm text-slate-500 mb-1 uppercase tracking-wider">Buying Power</div>
            <div className="text-3xl font-bold text-blue-400">₹1,50,000.00</div>
            <div className="text-xs text-slate-500 mt-4 flex items-center gap-1">
               Connected: Zerodha <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] h-3">LIVE</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* P&L Chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Growth Over Time
              </CardTitle>
              <div className="flex gap-2">
                {['1W', '1M', '3M', '1Y', 'ALL'].map(t => (
                  <Button key={t} variant="ghost" size="sm" className={cn(
                    "text-[10px] h-7 px-2",
                    t === '1W' ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"
                  )}>
                    {t}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pnlData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px'}}
                    itemStyle={{color: '#3B82F6'}}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Holdings Table */}
          <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Current Holdings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/80 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Instrument</th>
                    <th className="px-6 py-4 font-medium text-right">Qty</th>
                    <th className="px-6 py-4 font-medium text-right">Avg. Price</th>
                    <th className="px-6 py-4 font-medium text-right">LTP</th>
                    <th className="px-6 py-4 font-medium text-right">P&L</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {holdings.map((h) => (
                    <tr key={h.symbol} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4 font-bold text-white">{h.symbol}</td>
                      <td className="px-6 py-4 text-right text-slate-400 font-mono">{h.qty}</td>
                      <td className="px-6 py-4 text-right text-slate-400 font-mono">₹{h.avgPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right text-white font-mono font-bold">₹{h.currentPrice.toFixed(2)}</td>
                      <td className={cn(
                        "px-6 py-4 text-right font-bold",
                        h.pnl.startsWith('+') ? "text-emerald-500" : "text-red-500"
                      )}>
                        {h.pnl}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-6">
           <Card className="bg-slate-900/50 border-slate-800">
             <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-500" />
                  Asset Allocation
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                {[
                  { label: 'Equity', value: '75%', color: 'bg-blue-500' },
                  { label: 'Cash', value: '15%', color: 'bg-emerald-500' },
                  { label: 'Options', value: '10%', color: 'bg-amber-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-bold">{item.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", item.color)} style={{width: item.value}} />
                    </div>
                  </div>
                ))}
             </CardContent>
           </Card>

           <Card className="bg-slate-900/50 border-slate-800 border-dashed hover:border-blue-500 transition-all cursor-pointer group">
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                 <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-all">
                    <Wallet className="w-6 h-6 text-blue-500 group-hover:text-white" />
                 </div>
                 <h4 className="text-white font-bold mb-2">Connect Broker</h4>
                 <p className="text-xs text-slate-500">Import your trades from Upstox or Angel One</p>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
