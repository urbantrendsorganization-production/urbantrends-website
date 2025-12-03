import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  ShoppingBag,
  FileText,
  Settings,
  Bell,
  Search,
  Download,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Calendar,
  DollarSign,
  Package,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      label: 'Active Projects',
      value: '3',
      change: '+1 this month',
      icon: FolderKanban,
      trend: 'up',
    },
    {
      label: 'Total Spent',
      value: '$24,500',
      change: '+12% from last month',
      icon: DollarSign,
      trend: 'up',
    },
    {
      label: 'Active Orders',
      value: '5',
      change: '2 pending delivery',
      icon: Package,
      trend: 'neutral',
    },
    {
      label: 'Support Tickets',
      value: '2',
      change: '1 open',
      icon: AlertCircle,
      trend: 'neutral',
    },
  ];

  const projects = [
    {
      id: '1',
      name: 'E-Commerce Platform',
      status: 'In Progress',
      progress: 65,
      dueDate: 'Dec 15, 2024',
      budget: '$15,000',
      image: 'https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2Mzk1OTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      name: 'Mobile App Development',
      status: 'In Progress',
      progress: 40,
      dueDate: 'Jan 20, 2025',
      budget: '$25,000',
      image: 'https://images.unsplash.com/photo-1722850646236-61c6f917df96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZHVjdCUyMGRldmljZXxlbnwxfHx8fDE3NjQwNjc0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'Dashboard Analytics',
      status: 'Completed',
      progress: 100,
      dueDate: 'Nov 30, 2024',
      budget: '$8,000',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzOTc3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      product: 'DataFlow Pro',
      date: 'Nov 28, 2024',
      amount: '$299',
      status: 'Delivered',
    },
    {
      id: 'ORD-002',
      product: 'SecureVault',
      date: 'Nov 25, 2024',
      amount: '$149',
      status: 'Delivered',
    },
    {
      id: 'ORD-003',
      product: 'DevOps Commander',
      date: 'Nov 20, 2024',
      amount: '$399',
      status: 'Processing',
    },
  ];

  const invoices = [
    {
      id: 'INV-2024-11-001',
      date: 'Nov 28, 2024',
      amount: '$299',
      status: 'Paid',
    },
    {
      id: 'INV-2024-11-002',
      date: 'Nov 25, 2024',
      amount: '$149',
      status: 'Paid',
    },
    {
      id: 'INV-2024-11-003',
      date: 'Nov 15, 2024',
      amount: '$5,000',
      status: 'Pending',
    },
  ];

  const spendingData = [
    { month: 'Jun', amount: 2400 },
    { month: 'Jul', amount: 3200 },
    { month: 'Aug', amount: 2800 },
    { month: 'Sep', amount: 4100 },
    { month: 'Oct', amount: 3600 },
    { month: 'Nov', amount: 4500 },
  ];

  const projectActivityData = [
    { week: 'Week 1', hours: 24 },
    { week: 'Week 2', hours: 32 },
    { week: 'Week 3', hours: 28 },
    { week: 'Week 4', hours: 36 },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
      case 'paid':
        return 'bg-silver/20 text-silver border-silver/30';
      case 'in progress':
      case 'processing':
        return 'bg-dim-grey/20 text-dim-grey border-dim-grey/30';
      case 'pending':
        return 'bg-gunmetal/20 text-dim-grey border-dim-grey/30';
      default:
        return 'bg-gunmetal/20 text-dim-grey border-dim-grey/30';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gunmetal bg-black/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-silver">Client Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim-grey" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-gunmetal/30 border-dim-grey/30 text-silver placeholder:text-dim-grey"
              />
            </div>
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
                <div className="text-sm text-silver">John Doe</div>
                <div className="text-xs text-dim-grey">Client</div>
              </div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gunmetal"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gunmetal px-6">
          <div className="flex gap-1 -mb-px">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'projects', label: 'Projects', icon: FolderKanban },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'invoices', label: 'Invoices', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-gunmetal/20 border-dim-grey/30 p-6 hover:border-silver/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-silver to-dim-grey flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-black" />
                      </div>
                      {stat.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 text-silver" />
                      )}
                    </div>
                    <div className="text-2xl text-silver mb-1">{stat.value}</div>
                    <div className="text-sm text-dim-grey mb-2">{stat.label}</div>
                    <div className="text-xs text-dim-grey">{stat.change}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <h3 className="text-silver mb-6">Spending Overview</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={spendingData}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#BCBCBC" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#BCBCBC" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                      <XAxis dataKey="month" stroke="#6D6D6D" />
                      <YAxis stroke="#6D6D6D" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#404040',
                          border: '1px solid #6D6D6D',
                          borderRadius: '8px',
                          color: '#BCBCBC',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#BCBCBC"
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <h3 className="text-silver mb-6">Project Activity (Hours)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={projectActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                      <XAxis dataKey="week" stroke="#6D6D6D" />
                      <YAxis stroke="#6D6D6D" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#404040',
                          border: '1px solid #6D6D6D',
                          borderRadius: '8px',
                          color: '#BCBCBC',
                        }}
                      />
                      <Bar dataKey="hours" fill="#BCBCBC" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-silver">Recent Orders</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-dim-grey hover:text-silver"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-gunmetal hover:border-dim-grey transition-colors"
                      >
                        <div className="flex-1">
                          <div className="text-silver text-sm mb-1">{order.product}</div>
                          <div className="text-xs text-dim-grey">{order.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-silver text-sm mb-1">{order.amount}</div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-silver">Recent Invoices</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-dim-grey hover:text-silver"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-gunmetal hover:border-dim-grey transition-colors"
                      >
                        <div className="flex-1">
                          <div className="text-silver text-sm mb-1">{invoice.id}</div>
                          <div className="text-xs text-dim-grey">{invoice.date}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-silver text-sm mb-1">{invoice.amount}</div>
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-dim-grey hover:text-silver"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-silver">My Projects</h2>
              <Button className="bg-silver text-black hover:bg-silver/90">
                Request New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-gunmetal/20 border-dim-grey/30 p-6 hover:border-silver/30 transition-colors">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-silver mb-2">{project.name}</h3>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-dim-grey hover:text-silver"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-dim-grey mb-1">Due Date</div>
                            <div className="text-sm text-silver flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {project.dueDate}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-dim-grey mb-1">Budget</div>
                            <div className="text-sm text-silver flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {project.budget}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs text-dim-grey mb-2">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="h-2 bg-gunmetal rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-silver to-dim-grey transition-all duration-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-silver">Order History</h2>
            <Card className="bg-gunmetal/20 border-dim-grey/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gunmetal">
                      <th className="text-left p-4 text-sm text-dim-grey">Order ID</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Product</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Date</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Amount</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Status</th>
                      <th className="text-right p-4 text-sm text-dim-grey">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-gunmetal/50 hover:bg-gunmetal/10 transition-colors"
                      >
                        <td className="p-4 text-sm text-silver">{order.id}</td>
                        <td className="p-4 text-sm text-silver">{order.product}</td>
                        <td className="p-4 text-sm text-dim-grey">{order.date}</td>
                        <td className="p-4 text-sm text-silver">{order.amount}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-dim-grey hover:text-silver"
                          >
                            View Details
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-silver">Invoices</h2>
              <Button variant="outline" className="border-silver text-silver hover:bg-silver hover:text-black">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
            <Card className="bg-gunmetal/20 border-dim-grey/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gunmetal">
                      <th className="text-left p-4 text-sm text-dim-grey">Invoice ID</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Date</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Amount</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Status</th>
                      <th className="text-right p-4 text-sm text-dim-grey">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <motion.tr
                        key={invoice.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-gunmetal/50 hover:bg-gunmetal/10 transition-colors"
                      >
                        <td className="p-4 text-sm text-silver">{invoice.id}</td>
                        <td className="p-4 text-sm text-dim-grey">{invoice.date}</td>
                        <td className="p-4 text-sm text-silver">{invoice.amount}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-dim-grey hover:text-silver"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-dim-grey hover:text-silver"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}