import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Bell,
  Settings,
  Filter,
  Download,
  MoreVertical,
  UserPlus,
  FileText,
  Package,
  AlertCircle,
  CheckCircle2,
  Clock,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Button } from '../components/ui/button';
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from '@radix-ui/react-separator';


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isOpen, setIsOpen] = useState(false);

  const [service, setService] = useState({
    title: "",
    description: "",
    features: [""],
    priceLabel: "Starting at",
    tiers: [{ name: "", price: "", deliveryTime: "", revisions: "", features: [""] }],
  });

  // === Handlers (same as previous modal example) ===
  const handleChange = (e) => setService({ ...service, [e.target.name]: e.target.value });
  const handleFeatureChange = (i, value) => {
    const updated = [...service.features];
    updated[i] = value;
    setService({ ...service, features: updated });
  };
  const addFeature = () => setService({ ...service, features: [...service.features, ""] });

  const handleTierChange = (tIndex, field, value) => {
    const updatedTiers = [...service.tiers];
    updatedTiers[tIndex][field] = value;
    setService({ ...service, tiers: updatedTiers });
  };
  const handleTierFeatureChange = (tIndex, fIndex, value) => {
    const updatedTiers = [...service.tiers];
    updatedTiers[tIndex].features[fIndex] = value;
    setService({ ...service, tiers: updatedTiers });
  };
  const addTier = () =>
    setService({
      ...service,
      tiers: [...service.tiers, { name: "", price: "", deliveryTime: "", revisions: "", features: [""] }],
    });
  const addTierFeature = (tIndex) => {
    const updatedTiers = [...service.tiers];
    updatedTiers[tIndex].features.push("");
    setService({ ...service, tiers: updatedTiers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service Data:", service);
    setIsOpen(false); // Close modal after submit
  };

  const stats = [
    {
      label: 'Total Revenue',
      value: '$124,500',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-silver to-dim-grey',
    },
    {
      label: 'Active Clients',
      value: '1,245',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-silver to-dim-grey',
    },
    {
      label: 'Active Projects',
      value: '87',
      change: '+8.3%',
      trend: 'up',
      icon: FolderKanban,
      color: 'from-silver to-dim-grey',
    },
    {
      label: 'Pending Orders',
      value: '24',
      change: '-3.1%',
      trend: 'down',
      icon: ShoppingBag,
      color: 'from-silver to-dim-grey',
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 28000, profit: 17000 },
    { month: 'Feb', revenue: 52000, expenses: 30000, profit: 22000 },
    { month: 'Mar', revenue: 48000, expenses: 29000, profit: 19000 },
    { month: 'Apr', revenue: 61000, expenses: 32000, profit: 29000 },
    { month: 'May', revenue: 58000, expenses: 31000, profit: 27000 },
    { month: 'Jun', revenue: 67000, expenses: 33000, profit: 34000 },
  ];

  const projectStatusData = [
    { name: 'Completed', value: 42, color: '#BCBCBC' },
    { name: 'In Progress', value: 35, color: '#6D6D6D' },
    { name: 'Pending', value: 10, color: '#404040' },
  ];

  const clientGrowthData = [
    { month: 'Jan', clients: 890 },
    { month: 'Feb', clients: 920 },
    { month: 'Mar', clients: 985 },
    { month: 'Apr', clients: 1050 },
    { month: 'May', clients: 1180 },
    { month: 'Jun', clients: 1245 },
  ];

  const topProducts = [
    { name: 'DataFlow Pro', sales: 156, revenue: '$46,644' },
    { name: 'DevOps Commander', sales: 98, revenue: '$39,102' },
    { name: 'SecureVault', sales: 142, revenue: '$21,158' },
    { name: 'CloudSync Plus', sales: 87, revenue: '$17,313' },
    { name: 'API Gateway', sales: 76, revenue: '$15,124' },
  ];

  const recentClients = [
    {
      id: '1',
      name: 'Acme Corp',
      email: 'contact@acme.com',
      projects: 3,
      spent: '$45,000',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      name: 'TechStart Inc',
      email: 'hello@techstart.io',
      projects: 5,
      spent: '$78,500',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'Digital Wave',
      email: 'info@digitalwave.com',
      projects: 2,
      spent: '$32,000',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      name: 'Innovation Labs',
      email: 'team@innovationlabs.ai',
      projects: 1,
      spent: '$18,000',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const recentProjects = [
    {
      id: 'PRJ-001',
      name: 'E-Commerce Platform Redesign',
      client: 'Acme Corp',
      status: 'In Progress',
      progress: 65,
      dueDate: 'Dec 15, 2024',
      team: 5,
    },
    {
      id: 'PRJ-002',
      name: 'Mobile Banking App',
      client: 'TechStart Inc',
      status: 'In Progress',
      progress: 40,
      dueDate: 'Jan 20, 2025',
      team: 8,
    },
    {
      id: 'PRJ-003',
      name: 'Analytics Dashboard',
      client: 'Digital Wave',
      status: 'Completed',
      progress: 100,
      dueDate: 'Nov 30, 2024',
      team: 4,
    },
    {
      id: 'PRJ-004',
      name: 'AI Integration System',
      client: 'Innovation Labs',
      status: 'Pending',
      progress: 15,
      dueDate: 'Feb 10, 2025',
      team: 6,
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-1234',
      client: 'Acme Corp',
      product: 'DataFlow Pro',
      amount: '$299',
      date: 'Dec 1, 2024',
      status: 'Completed',
    },
    {
      id: 'ORD-1235',
      client: 'TechStart Inc',
      product: 'DevOps Commander',
      amount: '$399',
      date: 'Dec 1, 2024',
      status: 'Processing',
    },
    {
      id: 'ORD-1236',
      client: 'Digital Wave',
      product: 'SecureVault',
      amount: '$149',
      date: 'Nov 30, 2024',
      status: 'Completed',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'active':
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
                <div className="text-sm text-silver">Admin User</div>
                <div className="text-xs text-dim-grey">Administrator</div>
              </div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080"
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
              { id: 'services', label: 'Services', icon: Activity }
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
                      <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-silver' : 'text-dim-grey'
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

            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-silver">Revenue Overview</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-dim-grey hover:text-silver"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#BCBCBC" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#BCBCBC" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6D6D6D" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6D6D6D" stopOpacity={0} />
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
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#6D6D6D"
                      fillOpacity={1}
                      fill="url(#colorExpenses)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <h3 className="text-silver mb-6">Project Status Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {projectStatusData.map((entry, index) => (
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <h3 className="text-silver mb-6">Client Growth</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={clientGrowthData}>
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
                      <Line
                        type="monotone"
                        dataKey="clients"
                        stroke="#BCBCBC"
                        strokeWidth={2}
                        dot={{ fill: '#BCBCBC', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </div>

            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-silver">Top Selling Products</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-dim-grey hover:text-silver"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-gunmetal hover:border-dim-grey transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-silver to-dim-grey flex items-center justify-center">
                          <Package className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <div className="text-silver text-sm mb-1">{product.name}</div>
                          <div className="text-xs text-dim-grey">{product.sales} sales</div>
                        </div>
                      </div>
                      <div className="text-silver">{product.revenue}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-silver">Client Management</h2>
              <Button className="bg-silver text-black hover:bg-silver/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Client
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {recentClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-gunmetal/20 border-dim-grey/30 p-6 hover:border-silver/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={client.image}
                          alt={client.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gunmetal"
                        />
                        <div>
                          <div className="text-silver mb-1">{client.name}</div>
                          <div className="text-sm text-dim-grey">{client.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center hidden sm:block">
                          <div className="text-sm text-dim-grey mb-1">Projects</div>
                          <div className="text-silver">{client.projects}</div>
                        </div>
                        <div className="text-center hidden md:block">
                          <div className="text-sm text-dim-grey mb-1">Total Spent</div>
                          <div className="text-silver">{client.spent}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-dim-grey hover:text-silver"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-silver">Project Management</h2>
              <Button className="bg-silver text-black hover:bg-silver/90">
                Create New Project
              </Button>
            </div>

            <Card className="bg-gunmetal/20 border-dim-grey/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gunmetal">
                      <th className="text-left p-4 text-sm text-dim-grey">Project ID</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Name</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Client</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Status</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Progress</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Due Date</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Team</th>
                      <th className="text-right p-4 text-sm text-dim-grey">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map((project, index) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-gunmetal/50 hover:bg-gunmetal/10 transition-colors"
                      >
                        <td className="p-4 text-sm text-silver">{project.id}</td>
                        <td className="p-4 text-sm text-silver">{project.name}</td>
                        <td className="p-4 text-sm text-dim-grey">{project.client}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gunmetal rounded-full overflow-hidden max-w-[100px]">
                              <div
                                className="h-full bg-gradient-to-r from-silver to-dim-grey"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-dim-grey">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-dim-grey">{project.dueDate}</td>
                        <td className="p-4 text-sm text-silver">{project.team} members</td>
                        <td className="p-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-dim-grey hover:text-silver"
                          >
                            View
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

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-silver">Order Management</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="border-dim-grey text-dim-grey hover:bg-gunmetal hover:text-silver"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-silver text-black hover:bg-silver/90">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="bg-gunmetal/20 border-dim-grey/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gunmetal">
                      <th className="text-left p-4 text-sm text-dim-grey">Order ID</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Client</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Product</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Amount</th>
                      <th className="text-left p-4 text-sm text-dim-grey">Date</th>
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
                        <td className="p-4 text-sm text-silver">{order.client}</td>
                        <td className="p-4 text-sm text-dim-grey">{order.product}</td>
                        <td className="p-4 text-sm text-silver">{order.amount}</td>
                        <td className="p-4 text-sm text-dim-grey">{order.date}</td>
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
                            Manage
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

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-silver">Advanced Analytics</h2>

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
                  <div className="text-3xl text-silver mb-2">24.8%</div>
                  <div className="text-xs text-dim-grey">+3.2% from last month</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-dim-grey text-sm">Avg. Project Value</div>
                    <DollarSign className="w-4 h-4 text-silver" />
                  </div>
                  <div className="text-3xl text-silver mb-2">$18,450</div>
                  <div className="text-xs text-dim-grey">+8.1% from last month</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-dim-grey text-sm">Client Retention</div>
                    <CheckCircle2 className="w-4 h-4 text-silver" />
                  </div>
                  <div className="text-3xl text-silver mb-2">94.5%</div>
                  <div className="text-xs text-dim-grey">+1.3% from last month</div>
                </Card>
              </motion.div>
            </div>

            {/* Detailed Charts */}
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
                  <h3 className="text-silver mb-6">Revenue vs Profit Trend</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={revenueData}>
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
                      <Bar dataKey="revenue" fill="#BCBCBC" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="profit" fill="#6D6D6D" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-silver">Services Management</h2>

              <Button onClick={() => setIsOpen(true)} className="bg-silver text-black ml-4 hover:bg-silver/90 flex items-center gap-2 rounded">
                <UserPlus className="w-4 h-4" />
                Add Service
              </Button>
            </div>

            {/* === Modal === */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <form onSubmit={handleSubmit} className="py-6">
                <DialogContent className="sm:max-w-[600px] overflow-auto max-h-[80vh] bg-black text-silver p-6 space-y-6">
                  <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-semibold">Add Service</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Fill out your service details below.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Title */}
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={service.title}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </div>

                  {/* Description */}
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={service.description}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </div>

                  {/* Features */}
                  <div className="py-4 border-t border-gray-700">
                    <Label className="mb-2">Features</Label>
                    <div className="space-y-2">
                      {service.features.map((f, i) => (
                        <Input
                          key={i}
                          value={f}
                          onChange={(e) => handleFeatureChange(i, e.target.value)}
                          placeholder={`Feature ${i + 1}`}
                        />
                      ))}
                    </div>
                    <br />
                    <div>
                      <Button type="button" onClick={addFeature} variant="outline" className="mt-3 text-gray-900">
                        + Add Feature
                      </Button>
                    </div>
                  </div>

                  {/* Price Label */}
                  <div className="grid gap-2 py-4 border-t border-gray-700">
                    <Label>Price Label</Label>
                    <Input
                      name="priceLabel"
                      value={service.priceLabel}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </div>

                  {/* Tiers */}
                  <div className="py-4 border-t border-gray-700">
                    <Label>Tiers</Label>
                    {service.tiers.map((tier, tIndex) => (
                      <div key={tIndex} className="border border-gray-700 p-4 rounded space-y-4">
                        <div className="space-y-2">
                          <Input
                            placeholder="Tier Name"
                            value={tier.name}
                            onChange={(e) => handleTierChange(tIndex, "name", e.target.value)}
                          />
                          <Separator />
                        </div>

                        <div className="space-y-2">
                          <Input
                            type="number"
                            placeholder="Price"
                            value={tier.price}
                            onChange={(e) => handleTierChange(tIndex, "price", e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Delivery Time (days)"
                            value={tier.deliveryTime}
                            onChange={(e) => handleTierChange(tIndex, "deliveryTime", e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Revisions"
                            value={tier.revisions}
                            onChange={(e) => handleTierChange(tIndex, "revisions", e.target.value)}
                          />
                        </div>

                        {/* Tier Features */}
                        <div className="space-y-3">
                          <Label className="block">Tier Features</Label>
                          <div className="space-y-2">
                            {tier.features.map((f, fIndex) => (
                              <Input
                                key={fIndex}
                                value={f}
                                placeholder={`Feature ${fIndex + 1}`}
                                onChange={(e) => handleTierFeatureChange(tIndex, fIndex, e.target.value)}
                              />
                            ))}
                          </div>
                          <Button
                            type="button"
                            onClick={() => addTierFeature(tIndex)}
                            variant="outline"
                            size="sm"
                            className="text-gray-900 mt-2"
                          >
                            + Add Tier Feature
                          </Button>
                        </div>
                      </div>

                    ))}
                    <Button type="button" onClick={addTier} variant="outline" className={`text-gray-800`}>
                      + Add Tier
                    </Button>
                  </div>

                  <DialogFooter className="pt-4">
                    <DialogClose asChild>
                      <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">Save Service</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>



            <div className="grid grid-cols-1 gap-4">
              {recentClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-gunmetal/20 border-dim-grey/30 p-6 hover:border-silver/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={client.image}
                          alt={client.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gunmetal"
                        />
                        <div>
                          <div className="text-silver mb-1">{client.name}</div>
                          <div className="text-sm text-dim-grey">{client.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center hidden sm:block">
                          <div className="text-sm text-dim-grey mb-1">Projects</div>
                          <div className="text-silver">{client.projects}</div>
                        </div>
                        <div className="text-center hidden md:block">
                          <div className="text-sm text-dim-grey mb-1">Total Spent</div>
                          <div className="text-silver">{client.spent}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-dim-grey hover:text-silver"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
