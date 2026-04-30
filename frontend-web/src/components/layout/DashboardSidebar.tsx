'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Search, 
  BarChart3, 
  Bell, 
  History, 
  Briefcase, 
  Users, 
  Settings,
  Zap,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Search, label: 'Scanner', href: '/screeners/create' },
  { icon: BarChart3, label: 'Charts', href: '/charts' },
  { icon: Bell, label: 'Alerts', href: '/alerts' },
  { icon: History, label: 'Backtests', href: '/backtests' },
  { icon: Briefcase, label: 'Portfolio', href: '/portfolio' },
  { icon: Users, label: 'Community', href: '/community' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-slate-800 h-screen flex flex-col sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ScanPro AI</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href 
                  ? "bg-blue-600/10 text-blue-500" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800">
        <div className="bg-slate-900 rounded-xl p-4 mb-4">
          <div className="text-xs text-slate-500 mb-1">Current Plan</div>
          <div className="text-sm font-bold text-white flex items-center justify-between">
            Pro Plan
            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">NEW</span>
          </div>
          <Button variant="link" className="p-0 h-auto text-[10px] text-blue-500 mt-2">Upgrade to Elite</Button>
        </div>

        <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
