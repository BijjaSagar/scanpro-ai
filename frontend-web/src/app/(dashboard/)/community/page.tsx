'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  Copy, 
  Share2, 
  Search, 
  TrendingUp, 
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const mockPosts = [
  {
    id: '1',
    user: 'TradingWizard',
    title: 'Bullish Golden Cross Finder',
    description: 'Perfect for swing trading. Finds stocks where 50 EMA crosses 200 EMA with high volume.',
    likes: 1240,
    clones: 450,
    tags: ['Bullish', 'EMA', 'Swing'],
    rules: 3
  },
  {
    id: '2',
    user: 'ValueInvestor99',
    title: 'Undervalued Dividend Kings',
    description: 'PE < 12 and Dividend Yield > 4% for Nifty 100 stocks.',
    likes: 890,
    clones: 210,
    tags: ['Value', 'Dividends', 'Fundamental'],
    rules: 2
  },
  {
    id: '3',
    user: 'AlgoPro_India',
    title: 'RSI Oversold Bounce',
    description: 'Catching the bottom on 15m charts. RSI < 25 with a Bullish Engulfing pattern.',
    likes: 2100,
    clones: 1200,
    tags: ['Intraday', 'RSI', 'Bottom Fishing'],
    rules: 4
  }
];

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Community Hub</h1>
          <p className="text-slate-400">Discover, copy, and collaborate on world-class trading strategies.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-8 shadow-lg shadow-blue-600/20">
          <Share2 className="w-5 h-5 mr-2" />
          Share My Scan
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Active Strategies', value: '12,450', icon: Zap, color: 'text-amber-500' },
          { label: 'Community Clones', value: '89.2k', icon: Copy, color: 'text-blue-500' },
          { label: 'Expert Traders', value: '2.5k', icon: ShieldCheck, color: 'text-emerald-500' },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-slate-950 rounded-xl">
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input 
            placeholder="Search strategies (e.g. Breakout, RSI, Penny Stocks)" 
            className="bg-slate-900/50 border-slate-800 h-12 pl-12 rounded-xl text-white focus:ring-blue-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 border-slate-800 bg-slate-900/50 text-slate-300 rounded-xl px-6">
          Filters
        </Button>
      </div>

      {/* Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-[#0F172A] border-slate-800 hover:border-blue-500/50 transition-all group overflow-hidden h-full flex flex-col">
              <CardHeader className="p-6 pb-2">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-blue-400">
                      {post.user.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-400">@{post.user}</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-600/10 text-blue-400 border-blue-500/20">
                    {post.rules} Rules
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 pt-2 flex-1 flex flex-col">
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map(tag => (
                    <Badge key={tag} className="bg-slate-800 hover:bg-slate-700 text-slate-400 cursor-pointer">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-800/50 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm cursor-pointer hover:text-emerald-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm cursor-pointer hover:text-blue-500 transition-colors">
                      <Copy className="w-4 h-4" />
                      {post.clones}
                    </div>
                  </div>
                  <Button size="sm" className="bg-slate-800 hover:bg-blue-600 text-white rounded-lg px-4 transition-all">
                    Clone Scan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
