'use client';

import React from 'react';
import { ScreenerBuilder } from '@/components/screener/ScreenerBuilder';
import { 
  ChevronRight, 
  Search, 
  Plus, 
  Sparkles,
  Play
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CreateScreenerPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumbs & Title */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <span>Screener</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-300">Create New Scan</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Build Your Strategy</h1>
          <p className="text-slate-400">Combine technical indicators and fundamental filters to find your next winner.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-800 text-slate-400 hover:bg-slate-800 h-12 rounded-xl px-6">
            Import Chartink Formula
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl px-6">
            <Plus className="w-5 h-5 mr-2" />
            Save Strategy
          </Button>
        </div>
      </div>

      {/* Builder Component */}
      <ScreenerBuilder />

      {/* Results Section (Placeholder) */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Play className="w-5 h-5 text-emerald-500 fill-current" />
            </div>
            <h3 className="text-xl font-bold text-white">Scan Results</h3>
            <Badge className="bg-slate-800 text-slate-400 border-none">Not Run Yet</Badge>
          </div>
        </div>

        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
             <Search className="w-10 h-10 text-slate-600" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">No Results to Display</h4>
          <p className="text-slate-500 max-w-sm">
            Click on "Run Scan" to see the list of stocks matching your criteria in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
