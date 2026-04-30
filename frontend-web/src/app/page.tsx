'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  Bell,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0F172A] text-white pt-20">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-6 px-4 py-1.5 bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 transition-all rounded-full">
            ✨ Next-Gen Trading Intelligence
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Scan the Market <br /> with <span className="text-blue-500">AI Precision</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate terminal for modern traders. Advanced scanners, real-time alerts, 
            AI-driven insights, and one-click execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all group">
              Get Started Free <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 rounded-full transition-all">
              View Live Demo
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
              <div className="h-12 border-b border-slate-800 flex items-center px-4 justify-between bg-slate-900/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-md text-xs text-slate-500 font-mono">
                  scanpro.ai/dashboard
                </div>
                <div className="w-10" />
              </div>
              <div className="p-8 h-[400px] flex items-center justify-center text-slate-700">
                <div className="grid grid-cols-3 gap-6 w-full">
                  <div className="col-span-2 space-y-4">
                    <div className="h-8 w-1/3 bg-slate-900 rounded" />
                    <div className="h-40 bg-slate-900 rounded" />
                    <div className="h-32 bg-slate-900 rounded" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 w-1/2 bg-slate-900 rounded" />
                    <div className="h-72 bg-slate-900 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Element 1: Alert */}
          <div className="absolute -top-10 -right-10 hidden md:block">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-slate-900 border border-emerald-500/30 p-4 rounded-xl shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Bell className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Alert Triggered</div>
                  <div className="text-sm font-bold text-white">RELIANCE Breakout!</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating Element 2: Stats */}
          <div className="absolute -bottom-10 -left-10 hidden md:block">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Portfolio ROI</div>
                  <div className="text-sm font-bold text-white">+24.8% <span className="text-emerald-500 text-[10px]">Today</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all group overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
      <CardContent className="p-8">
        <div className="mb-4 p-3 bg-blue-500/10 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-all">
          <Icon className="w-6 h-6 text-blue-400 group-hover:text-white" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function LandingPage() {
  return (
    <main className="bg-[#0F172A] min-h-screen">
      <HeroSection />

      {/* Features Grid */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Built for Serious Traders</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to find, validate, and execute trades in one lightning-fast platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Search} 
            title="AI Screener" 
            description="Type what you're looking for in plain English. Our AI handles the complex formulas for you."
            delay={0.1}
          />
          <FeatureCard 
            icon={Zap} 
            title="Real-Time Engine" 
            description="Live price scanning with zero latency. Catch breakouts before they happen on the charts."
            delay={0.2}
          />
          <FeatureCard 
            icon={BarChart3} 
            title="Advanced Charts" 
            description="Fully integrated TradingView charts with automated pattern detection and overlays."
            delay={0.3}
          />
          <FeatureCard 
            icon={Bell} 
            title="Omnichannel Alerts" 
            description="Get notified instantly via Telegram, WhatsApp, Mobile Push, or Email."
            delay={0.4}
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Broker Integration" 
            description="Connect your Zerodha, Upstox, or Angel One account for seamless execution."
            delay={0.5}
          />
          <FeatureCard 
            icon={TrendingUp} 
            title="Strategy Backtesting" 
            description="Validate your scan ideas against 10 years of historical data in seconds."
            delay={0.6}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-white/10 skew-x-[-20deg] translate-x-[20%]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to upgrade your trading game?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 rounded-full h-14 px-10 text-lg font-bold">
              Create Free Account
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full h-14 px-10 text-lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ScanPro AI</span>
          </div>
          <div className="flex gap-8 text-slate-500 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 ScanPro AI. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
