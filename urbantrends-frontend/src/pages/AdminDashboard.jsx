import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ShoppingBag,
  Search,
  Bell,
  Settings,
  Download,
  Activity,
  MonitorCloud,
} from 'lucide-react';
import { Button } from '../components/ui/button';;
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Input } from "@/components/ui/input";
import AdminServices from '@/components/AdminServices';
import AdminAnalytics from '@/components/AdminAnalytics';
import AdminOrders from '@/components/AdminOrders';
import AdminProjects from '@/components/AdminProjects';
import AdminClients from '@/components/AdminClients';
import AdminOverview from '@/components/AdminOverview';
import AdminProducts from '@/components/AdminProducts';


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const email = localStorage.getItem('userEmail')
  const picture = localStorage.getItem('userPicture')

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gunmetal bg-black/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-silver">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim-grey" />
              <Input
                placeholder="Search clients, projects..."
                className="pl-10 w-80 bg-gunmetal/30 border-dim-grey/30 text-silver placeholder:text-dim-grey"
              />
            </div>
            <Button className="bg-silver text-black hover:bg-silver/90 hidden sm:flex">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-dim-grey hover:text-silver"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-silver rounded-full" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-dim-grey hover:text-silver"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-gunmetal">
              <div className="text-right hidden sm:block">
                <div className="text-sm text-silver">{email}</div>
                <div className="text-xs text-dim-grey">Admin</div>
              </div>
              <ImageWithFallback
                src={picture}
                alt="Admin"
                className="w-10 h-10 rounded-full object-cover border-2 border-gunmetal"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gunmetal px-6">
          <div className="flex gap-1 -mb-px overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'projects', label: 'Projects', icon: FolderKanban },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'services', label: 'Services', icon: Activity },
              {id: 'products', label: 'Products', icon: MonitorCloud}
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                  ? 'border-silver text-silver'
                  : 'border-transparent text-dim-grey hover:text-silver'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 w-full mx-auto">

        {activeTab === 'overview' && <AdminOverview />}

        {activeTab === 'clients' && <AdminClients />}

        {activeTab === 'projects' && <AdminProjects />}

        {activeTab === 'orders' && <AdminOrders />}

        {activeTab === 'analytics' && <AdminAnalytics />}

        {activeTab === 'services' && <AdminServices />}

        {activeTab === 'products' && <AdminProducts />}
        
      </main>
    </div>
  );
}
