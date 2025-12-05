import { useEffect, useState } from 'react';
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
  Loader2,
  ArrowRight,
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
import axios from 'axios';
import AddProjectModal from '@/components/AddProjectModal';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { CSVLink } from 'react-csv';
import AnalyticsTab from '@/components/AnalyticsTab';

export function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProject, setShowAddProject] = useState(false);
  const email = localStorage.getItem('userEmail');
  const picture = localStorage.getItem('userPicture')
  const [openMenuId, setOpenMenuId] = useState(null); 
  const [saleModalOpen, setSaleModalOpen] = useState(false);
const [selectedProject, setSelectedProject] = useState(null);
const [salePrice, setSalePrice] = useState('');
const [isCreatingSale, setIsCreatingSale] = useState(false);
const [recentSales, setRecentSales] = useState([])



  const [myProjects, setMyProjects] = useState([]);

  const fetchDeveloperProjects = async () => {
    try {
      const response = await axios.get(
        `https://urbantrends-backend-production-fde8.up.railway.app/developers/projects/${email}`
      );
      setMyProjects(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchDeveloperProjects();
  }, []);

  // create sale handler
  const handleCreateSaleFromModal = async () => {
  if (!salePrice || Number(salePrice) <= 0) {
    toast.error("Price must be greater than 0");
    return;
  }

  try {
    setIsCreatingSale(true); // start loading

    const payload = {
      projectId: selectedProject._id,
      price: Number(salePrice),
      developerEmail: selectedProject.developerEmail || email,
    };

    const res = await axios.post(
      "https://urbantrends-backend-production-fde8.up.railway.app/sale/project-sales",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    toast.success("Sale created successfully!");
    setSaleModalOpen(false);
    setSalePrice("");
    setSelectedProject(null);
    fetchSalesByEmail()

  } catch (err) {
    toast.error(err.response?.data?.error || err.message);
  } finally {
    setIsCreatingSale(false); // stop loading
  }
};

const fetchSalesByEmail = async () => {
  try {
    const response = await axios.get(
      `https://urbantrends-backend-production-fde8.up.railway.app/sale/project-sales/by-email/${email}`
    );

    // Transform the data for the table
    const transformed = response.data.data.map((item) => ({
      id: item._id,
      projectId: item.project,
      title: item.projectTitle,
      description: item.projectDescription,
      developerEmail: item.developerEmail,
      amount: item.price,
      status: item.status,
      date: new Date(item.createdAt).toLocaleString(),
    }));

    setRecentSales(transformed);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchSalesByEmail();
}, []);





  
  const stats = [
  {
    label: "Total Projects",
    value: myProjects.length,
    change: myProjects.length ? `+${myProjects.length} this month` : "0",
    trend: myProjects.length ? "up" : "neutral",
    icon: FolderKanban,
    color: "from-silver to-dim-grey",
  },
  {
    label: "Total Sales",
    value: recentSales.length,
    change: recentSales.length ? `+${recentSales.length} this month` : "0",
    trend: recentSales.length ? "up" : "neutral",
    icon: ShoppingBag,
    color: "from-silver to-dim-grey",
  },
  {
    label: "Total Revenue",
    value: `$${recentSales.reduce((sum, sale) => sum + sale.amount, 0).toLocaleString()}`,
    change: "+0% this month", // you can compute percentage change if needed
    trend: recentSales.length ? "up" : "neutral",
    icon: DollarSign,
    color: "from-silver to-dim-grey",
  },
  {
    label: "Avg. Rating",
    value: myProjects.length
      ? (myProjects.reduce((sum, p) => sum.rating || 0 + sum, 0) / myProjects.length).toFixed(1)
      : "0",
    change: "+0 this month", // optional dynamic
    trend: "up",
    icon: Star,
    color: "from-silver to-dim-grey",
  },
];



 

  const salesData = recentSales.reduce((acc, sale) => {
  const month = new Date(sale.date).toLocaleString("default", { month: "short" });
  const existing = acc.find(d => d.month === month);

  if (existing) {
    existing.sales += 1;
    existing.revenue += sale.amount;
  } else {
    acc.push({ month, sales: 1, revenue: sale.amount });
  }

  return acc;
}, []);
;

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
                <div className="text-sm text-silver">{email}</div>
                <div className="text-xs text-dim-grey">Developer</div>
              </div>
              <ImageWithFallback
                src={picture}
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
          {/* Icon */}
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
            <stat.icon className="w-6 h-6 text-black" />
          </div>

          {/* Trend */}
          <div className={`flex items-center gap-1 text-xs ${
            stat.trend === 'up' ? 'text-silver' :
            stat.trend === 'down' ? 'text-red-500' :
            'text-dim-grey'
          }`}>
            {stat.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
            {stat.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
            {stat.trend === 'neutral' && <ArrowRight className="w-4 h-4" />}
            {stat.change}
          </div>
        </div>

        {/* Stat Values */}
        <div className="text-2xl text-silver mb-1">{stat.value}</div>
        <div className="text-sm text-dim-grey">{stat.label}</div>
      </Card>
    </motion.div>
  ))}
</div>
<br />


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

            <br />

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
                        <div className="text-sm text-silver">
                          ${Number(project.revenue || 0).toLocaleString()}
                        </div>

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

      {/* Replace the original button with the AddProjectModal trigger */}
      <AddProjectModal /> 
      {/* This will render your modal button and handle form submission */}
    </div>

    <br />

    <div className="grid grid-cols-1 gap-6">
      {myProjects.length > 0 ? (
        myProjects.map((project, index) => (
          <motion.div
            key={project._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="bg-gunmetal/20 border-dim-grey/30 p-6 hover:border-silver/30 transition-colors">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Project Image */}
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={project.imageUrl || project.image}
                    alt={project.title || project.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <Dialog open={saleModalOpen} onOpenChange={setSaleModalOpen}>
  <DialogContent className="sm:max-w-md bg-black text-white">
    <DialogHeader>
      <DialogTitle>Create Project Sale</DialogTitle>
      <DialogDescription>
        Set the price for this project sale
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4">
      <div>
        <Label>Project</Label>
        <div>
          <Input value={selectedProject?.title} disabled />
        </div>
      </div>
      <br />

      <div>
        <Label>Developer Email</Label>
        <Input value={selectedProject?.developerEmail || email} disabled />
      </div>
      <br />

      <div>
        <Label>Price *</Label>
        <Input
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          placeholder="Enter sale price"
          required
        />
      </div>
    </div>

    <DialogFooter className="flex justify-end gap-2 mt-4">
      <Button variant="outline" className={`bg-white text-black`} onClick={() => setSaleModalOpen(false)}>Cancel</Button>
      <DialogFooter className="flex justify-end gap-2 mt-4">

  <Button
    className="bg-silver text-black hover:bg-silver/90 flex items-center"
    disabled={isCreatingSale}
    onClick={handleCreateSaleFromModal}
  >
    {isCreatingSale && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
    {isCreatingSale ? "Creating sale..." : "Create Sale"}
  </Button>
</DialogFooter>

    </DialogFooter>
  </DialogContent>
</Dialog>


                {/* Project Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-silver mb-2">{project.title || project.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-gunmetal/50 text-dim-grey border-dim-grey/30">
                          {project.category}
                        </Badge>
                        {project.status && (
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Three dots dropdown */}
                    <div className="relative">
                      <Button
  variant="ghost"
  className={`bg-white`}
  size="icon"
  onClick={() => {
    setSelectedProject(project);
    setSaleModalOpen(true);
  }}
>
  <MoreVertical className="w-4 h-4 text-black" />
</Button>


                      {openMenuId === project._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-gunmetal border border-dim-grey rounded shadow-lg z-10">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2 w-full justify-start px-4 py-2 hover:bg-dim-grey"
                            onClick={() => handleCreateSale(project)}
                          >
                            <DollarSign className="w-4 h-4" />
                            Create Sale
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-dim-grey mb-1">Price</div>
                      <div className="text-sm text-silver">${project.price || 0}</div>
                    </div>
                    <div>
                      <div className="text-xs text-dim-grey mb-1">Total Sales</div>
                      <div className="text-sm text-silver">{project.totalSales || 0}</div>
                    </div>
                    <div>
                      <div className="text-xs text-dim-grey mb-1">Revenue</div>
                      <div className="text-sm text-silver">
                        ${project.revenue ? project.revenue.toLocaleString() : 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-dim-grey mb-1">Rating</div>
                      <div className="text-sm text-silver flex items-center gap-1">
                        <Star className="w-3 h-3 fill-silver text-silver" />
                        {project.rating || 0} ({project.reviews || 0})
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
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
                      Last sale: {project.lastSale || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))
      ) : (
        <div className="text-dim-grey text-center py-6">No projects found.</div>
      )}
    </div>
  </div>
)}


{/* sales */}

        {activeTab === 'sales' && (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-silver">Sales History</h2>
      <CSVLink
        data={recentSales}
        filename={`sales-${new Date().toISOString()}.csv`}
        className="flex items-center bg-silver border-dim-grey text-black px-3 py-1 gap-2 rounded hover:bg-gunmetal hover:text-silver"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Report
      </CSVLink>
    </div>

    <Card className="bg-gunmetal/20 border-dim-grey/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gunmetal">
              <th className="text-left p-4 text-sm text-dim-grey">Sale ID</th>
              <th className="text-left p-4 text-sm text-dim-grey">Project ID</th>
              <th className="text-left p-4 text-sm text-dim-grey">Title</th>
              <th className="text-left p-4 text-sm text-dim-grey">Description</th>
              <th className="text-left p-4 text-sm text-dim-grey">Developer Email</th>
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
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gunmetal/50 hover:bg-gunmetal/10 transition-colors"
              >
                <td className="p-4 text-sm text-silver">{sale.id}</td>
                <td className="p-4 text-sm text-silver">{sale.projectId}</td>
                <td className="p-4 text-sm text-silver">{sale.title}</td>
                <td className="p-4 text-sm text-silver">{sale.description}</td>
                <td className="p-4 text-sm text-silver">{sale.developerEmail}</td>
                <td className="p-4 text-sm text-silver">${sale.amount}</td>
                <td className="p-4 text-sm text-silver">{sale.date}</td>
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


        {activeTab === 'analytics' && <AnalyticsTab email={email}/>}
      </main>
    </div>
  );
}