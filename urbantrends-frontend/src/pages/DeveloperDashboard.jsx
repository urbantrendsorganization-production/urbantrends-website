import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  TrendingUp,
  DollarSign,
  Package,
  ShoppingBag,
  Plus,
  Search,
  Bell,
  Settings,
  Download,
  Eye,
  Edit,
  MoreVertical,
  Star,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  CheckCircle2,
  Clock,
  BarChart3,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProject, setShowAddProject] = useState(false);

  const stats = [
    {
      label: 'Total Projects',
      value: '12',
      change: '+2 this month',
      trend: 'up',
      icon: FolderKanban,
      color: 'from-silver to-dim-grey',
    },
    {
      label: 'Total Sales',
      value: '148',
      change: '+23 this month',
      trend: 'up',
      icon: ShoppingBag,
      color: 'from-silver to-dim-grey',
    },
    {
      label: 'Total Revenue',
      value: '$42,890',
      change: '+18.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-silver to-dim-grey',
    },
    {
      label: 'Avg. Rating',
      value: '4.8',
      change: '+0.2 this month',
      trend: 'up',
      icon: Star,
      color: 'from-silver to-dim-grey',
    },
  ];

  const myProjects = [
    {
      id: '1',
      name: 'E-Commerce Dashboard Pro',
      category: 'Dashboard',
      price: 299,
      totalSales: 45,
      revenue: 13455,
      rating: 4.9,
      reviews: 32,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzOTc3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastSale: '2 hours ago',
    },
    {
      id: '2',
      name: 'Mobile Banking UI Kit',
      category: 'UI Kit',
      price: 149,
      totalSales: 38,
      revenue: 5662,
      rating: 4.7,
      reviews: 28,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1722850646236-61c6f917df96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZHVjdCUyMGRldmljZXxlbnwxfHx8fDE3NjQwNjc0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      lastSale: '5 hours ago',
    },
    {
      id: '3',
      name: 'React Admin Template',
      category: 'Template',
      price: 199,
      totalSales: 32,
      revenue: 6368,
      rating: 4.8,
      reviews: 24,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2Mzk1OTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      lastSale: '1 day ago',
    },
    {
      id: '4',
      name: 'SaaS Landing Page Kit',
      category: 'Landing Page',
      price: 99,
      totalSales: 18,
      revenue: 1782,
      rating: 4.6,
      reviews: 15,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1713463374257-16790466d9af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2Mzk1OTMzMnww&ixlib=rb-4.1.0&q=80&w=1080',
      lastSale: '2 days ago',
    },
    {
      id: '5',
      name: 'Analytics Dashboard',
      category: 'Dashboard',
      price: 249,
      totalSales: 15,
      revenue: 3735,
      rating: 4.9,
      reviews: 12,
      status: 'Under Review',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzOTc3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastSale: '3 days ago',
    },
  ];

  const recentSales = [
    {
      id: 'SALE-001',
      project: 'E-Commerce Dashboard Pro',
      buyer: 'John Smith',
      amount: 299,
      date: 'Dec 2, 2024',
      time: '2:34 PM',
      status: 'Completed',
    },
    {
      id: 'SALE-002',
      project: 'Mobile Banking UI Kit',
      buyer: 'Sarah Johnson',
      amount: 149,
      date: 'Dec 2, 2024',
      time: '9:12 AM',
      status: 'Completed',
    },
    {
      id: 'SALE-003',
      project: 'E-Commerce Dashboard Pro',
      buyer: 'Mike Wilson',
      amount: 299,
      date: 'Dec 1, 2024',
      time: '5:45 PM',
      status: 'Completed',
    },
    {
      id: 'SALE-004',
      project: 'React Admin Template',
      buyer: 'Emily Brown',
      amount: 199,
      date: 'Dec 1, 2024',
      time: '2:18 PM',
      status: 'Completed',
    },
    {
      id: 'SALE-005',
      project: 'SaaS Landing Page Kit',
      buyer: 'David Lee',
      amount: 99,
      date: 'Nov 30, 2024',
      time: '11:30 AM',
      status: 'Pending',
    },
  ];

  const salesData = [
    { month: 'Jul', sales: 12, revenue: 2400 },
    { month: 'Aug', sales: 18, revenue: 3600 },
    { month: 'Sep', sales: 15, revenue: 3200 },
    { month: 'Oct', sales: 22, revenue: 4800 },
    { month: 'Nov', sales: 28, revenue: 6200 },
    { month: 'Dec', sales: 23, revenue: 5100 },
  ];

  const projectPerformanceData = [
    { week: 'Week 1', views: 245, sales: 8 },
    { week: 'Week 2', views: 312, sales: 12 },
    { week: 'Week 3', views: 289, sales: 9 },
    { week: 'Week 4', views: 356, sales: 15 },
  ];

  const categoryDistribution = [
    { name: 'Dashboards', value: 35, color: '#BCBCBC' },
    { name: 'UI Kits', value: 28, color: '#6D6D6D' },
    { name: 'Templates', value: 22, color: '#404040' },
    { name: 'Landing Pages', value: 15, color: '#2D2D2D' },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
        return 'bg-silver/20 text-silver border-silver/30';
      case 'pending':
      case 'under review':
        return 'bg-dim-grey/20 text-dim-grey border-dim-grey/30';
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
            <h1 className="text-silver">Developer Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim-grey" />
              <Input
                placeholder="Search projects..."
                className="pl-10 w-64 bg-gunmetal/30 border-dim-grey/30 text-silver placeholder:text-dim-grey"
              />
            </div>
            <Button className="bg-silver text-black hover:bg-silver/90 hidden sm:flex">
              <Plus className="w-4 h-4 mr-2" />
              New Project
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
                <div className="text-sm text-silver">Alex Developer</div>
                <div className="text-xs text-dim-grey">Developer</div>
              </div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Developer"
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
              { id: 'projects', label: 'My Projects', icon: FolderKanban },
              { id: 'sales', label: 'Sales', icon: ShoppingBag },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
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
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-black" />
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${
                        stat.trend === 'up' ? 'text-silver' : 'text-dim-grey'
                      }`}>
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-2xl text-silver mb-1">{stat.value}</div>
                    <div className="text-sm text-dim-grey">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Sales Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-silver">Sales & Revenue Overview</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-dim-grey hover:text-silver"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
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
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#BCBCBC"
                      fillOpacity={1}
                      fill="url(#colorSales)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Top Performing Projects & Recent Sales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-silver">Top Performing Projects</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-dim-grey hover:text-silver"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {myProjects.slice(0, 3).map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center gap-4 p-4 rounded-lg bg-black/30 border border-gunmetal hover:border-dim-grey transition-colors"
                      >
                        <ImageWithFallback
                          src={project.image}
                          alt={project.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-silver text-sm mb-1 truncate">{project.name}</div>
                          <div className="flex items-center gap-2 text-xs text-dim-grey">
                            <span>{project.totalSales} sales</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-silver text-silver" />
                              {project.rating}
                            </span>
                          </div>
                        </div>
                        <div className="text-silver text-sm">${project.revenue.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-silver">Recent Sales</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-dim-grey hover:text-silver"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentSales.slice(0, 3).map((sale) => (
                      <div
                        key={sale.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-gunmetal hover:border-dim-grey transition-colors"
                      >
                        <div className="flex-1">
                          <div className="text-silver text-sm mb-1">{sale.project}</div>
                          <div className="text-xs text-dim-grey">
                            {sale.buyer} • {sale.time}
                          </div>
                        </div>
                        <div className="text-silver text-sm">${sale.amount}</div>
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
                <Plus className="w-4 h-4 mr-2" />
                Upload New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {myProjects.map((project, index) => (
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
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-gunmetal/50 text-dim-grey border-dim-grey/30">
                                {project.category}
                              </Badge>
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-dim-grey hover:text-silver"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-xs text-dim-grey mb-1">Price</div>
                            <div className="text-sm text-silver">${project.price}</div>
                          </div>
                          <div>
                            <div className="text-xs text-dim-grey mb-1">Total Sales</div>
                            <div className="text-sm text-silver">{project.totalSales}</div>
                          </div>
                          <div>
                            <div className="text-xs text-dim-grey mb-1">Revenue</div>
                            <div className="text-sm text-silver">${project.revenue.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-xs text-dim-grey mb-1">Rating</div>
                            <div className="text-sm text-silver flex items-center gap-1">
                              <Star className="w-3 h-3 fill-silver text-silver" />
                              {project.rating} ({project.reviews})
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-dim-grey text-dim-grey hover:bg-silver hover:text-black hover:border-silver"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-dim-grey text-dim-grey hover:bg-silver hover:text-black hover:border-silver"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <div className="ml-auto text-xs text-dim-grey">
                            Last sale: {project.lastSale}
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

        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-silver">Sales History</h2>
              <Button
                variant="outline"
                className="border-dim-grey text-dim-grey hover:bg-gunmetal hover:text-silver"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <Card className="bg-gunmetal/20 border-dim-grey/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gunmetal">
                      <th className="text-left p-4 text-sm text-dim-grey">Sale ID</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Project</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Buyer</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Amount</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Date</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSales.map((sale, index) => (
                      <motion.tr
                        key={sale.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-gunmetal/50 hover:bg-gunmetal/10 transition-colors"
                      >
                        <td className="p-4 text-sm text-silver">{sale.id}</td>
                        <td className="p-4 text-sm text-silver">{sale.project}</td>
                        <td className="p-4 text-sm text-dim-grey">{sale.buyer}</td>
                        <td className="p-4 text-sm text-silver">${sale.amount}</td>
                        <td className="p-4 text-sm text-dim-grey">{sale.date}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(sale.status)}>
                            {sale.status}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-silver">Performance Analytics</h2>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-dim-grey text-sm">Conversion Rate</div>
                    <TrendingUp className="w-4 h-4 text-silver" />
                  </div>
                  <div className="text-3xl text-silver mb-2">18.4%</div>
                  <div className="text-xs text-dim-grey">+2.3% from last month</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-dim-grey text-sm">Avg. Project Price</div>
                    <DollarSign className="w-4 h-4 text-silver" />
                  </div>
                  <div className="text-3xl text-silver mb-2">$189</div>
                  <div className="text-xs text-dim-grey">+5.2% from last month</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-dim-grey text-sm">Total Customers</div>
                    <Users className="w-4 h-4 text-silver" />
                  </div>
                  <div className="text-3xl text-silver mb-2">124</div>
                  <div className="text-xs text-dim-grey">+15 new this month</div>
                </Card>
              </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <h3 className="text-silver mb-6">Project Performance</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={projectPerformanceData}>
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
                      <Legend />
                      <Bar dataKey="views" fill="#6D6D6D" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="sales" fill="#BCBCBC" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <h3 className="text-silver mb-6">Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#404040',
                          border: '1px solid #6D6D6D',
                          borderRadius: '8px',
                          color: '#BCBCBC',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </div>

            {/* Monthly Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                <h3 className="text-silver mb-6">Sales Trend (Last 6 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
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
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#BCBCBC"
                      strokeWidth={2}
                      dot={{ fill: '#BCBCBC', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}