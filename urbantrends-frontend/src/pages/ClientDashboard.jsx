import { useEffect, useState } from 'react';
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
  Axis3D,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import axios from 'axios';
import { toast } from 'sonner';
import ClientProjects from '@/components/ClientProjects';

export function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const email = localStorage.getItem('userEmail');
  const picture = localStorage.getItem('userPicture');
  const [recentOrders, setRecentOrders] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedProjectId, setSelectedProjectId] = useState("");
const [requestEmail, setRequestEmail] = useState(email || "");

  const handleRequestClick = (projectId) => {
  setSelectedProjectId(projectId);
};

  // Fetch orders from two endpoints
useEffect(() => {
  if (!email) return;

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const [userOrdersRes, productOrdersRes] = await Promise.all([
        axios.get(`https://urbantrends-backend-production-fde8.up.railway.app/api/email/${email}`),
        axios.get(`https://urbantrends-backend-production-fde8.up.railway.app/products/prods-order/${email}`)
      ]);

      const userOrders = userOrdersRes.data.orders || [];
      const productOrders = productOrdersRes.data.data || [];

      const combinedOrders = [...userOrders, ...productOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setRecentOrders(combinedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [email]);

// Fetch projects the user has access to
useEffect(() => {
  if (!email) return;

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`https://urbantrends-backend-production-fde8.up.railway.app/dev/projects-access/${email}`);
      setProjects(response.data.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  fetchProjects();
}, [email]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedProjectId || !requestEmail) return;

  try {
    setLoading(true);
    const response = await axios.post(
      "https://urbantrends-backend-production-fde8.up.railway.app/dev/project-access",
      { projectId: selectedProjectId, email: requestEmail },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Access requested:", response.data);
    toast.success("Access requested successfully!");
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error requesting access:", error.response?.data || error.message);
    toast.error(`Failed to request access: ${error.response?.data?.error || "Unknown error"}`);
  } finally {
    setLoading(false);
  }
};



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
                <div className="text-sm text-silver">{email}</div>
                <div className="text-xs text-dim-grey">Client</div>
              </div>
              <ImageWithFallback
                src={picture}
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
  {recentOrders.map((order, index) => {
    const orderId = order._id || order.id || index;

    // if product is an object, get its name
    const productName =
      typeof order.product === 'object' && order.product !== null
        ? order.product.name
        : order.product || 'N/A';

    const orderDate = order.date
      ? new Date(order.date).toLocaleDateString()
      : 'N/A';
    
    const amount = order.amount ? `$${order.amount}` : 'N/A';

    const status = order.status || 'Pending';

    return (
      <div
        key={orderId}
        className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-gunmetal hover:border-dim-grey transition-colors"
      >
        <div className="flex-1">
          <div className="text-silver text-sm mb-1">{productName}</div>
          <div className="text-xs text-dim-grey">{orderDate}</div>
        </div>
        <div className="text-right">
          <div className="text-silver text-sm mb-1">{amount}</div>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>
      </div>
    );
  })}
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

        {activeTab === 'projects' && <ClientProjects />}


        {/* orders tab */}
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
                <th className="text-left p-4 text-sm text-dim-grey">Customer</th>
                <th className="text-left p-4 text-sm text-dim-grey">Date</th>
                <th className="text-left p-4 text-sm text-dim-grey">Amount</th>
                <th className="text-left p-4 text-sm text-dim-grey">Status</th>
                <th className="text-right p-4 text-sm text-dim-grey">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => {
                const orderId = order._id || order.id || index;
                const productName = order.product?.name || order.name || "N/A";
                const customerName = order.customer?.name || "N/A";
                const orderDate = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A";
                const amount = order.product?.price
                  ? `$${order.product.price}`
                  : order.price
                  ? `$${order.price}`
                  : "N/A";
                const status = order.status || "Pending";

                return (
                  <motion.tr
                    key={orderId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gunmetal/50 hover:bg-gunmetal/10 transition-colors"
                  >
                    <td className="p-4 text-sm text-silver">{orderId}</td>
                    <td className="p-4 text-sm text-silver">{productName}</td>
                    <td className="p-4 text-sm text-silver">{customerName}</td>
                    <td className="p-4 text-sm text-dim-grey">{orderDate}</td>
                    <td className="p-4 text-sm text-silver">{amount}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(status)}>{status}</Badge>
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
                );
              })}
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