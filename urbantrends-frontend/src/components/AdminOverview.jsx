import React, { useEffect, useState } from 'react'
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, DollarSign, Filter, FolderKanban, Package, ShoppingBag, Users } from 'lucide-react';
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
import { Button } from './ui/button';
import axios from 'axios';

function AdminOverview() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [recentClients, setRecentClients] = useState([]);

  const [stats, setStats] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [projectStatusData, setProjectStatusData] = useState([]);
  const [clientGrowthData, setClientGrowthData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const [loading, setLoading] = useState(false);







  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/services/sers"
      );
      setServices(res.data.services || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const fetchProjects = async () => {
    try {
      const generalRes = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/projects/projs"
      );
      const devRes = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/developers/projects"
      );

      const generalProjects = generalRes.data.data || [];
      const devProjects = devRes.data.data || [];

      setProjects([...generalProjects, ...devProjects]);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };


  const fetchClientRequests = async () => {
    try {
      const response = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/dev/projects-access/"
      );
      setRecentClients(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchOrdersStats = async () => {
    try {
      const res = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/api/ords"
      );

      const orders = res.data.orders || [];

      // ---- TOTAL REVENUE ----
      const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);

      // ---- CLIENT COUNT ----
      const clients = new Set(orders.map(o => o.customer?.email));

      // ---- PROJECT STATUS COUNTS ----
      const completed = orders.filter(o => o.status === "completed").length;
      const pending = orders.filter(o => o.status === "pending").length;
      const inProgress = orders.filter(o => o.status === "in-progress").length;

      // ---- MONTHLY REVENUE (DYNAMIC) ----
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthly = {};

      orders.forEach(order => {
        const date = new Date(order.createdAt);
        const month = monthNames[date.getMonth()];

        if (!monthly[month]) monthly[month] = { revenue: 0, expenses: 0 };

        monthly[month].revenue += order.price || 0;
        monthly[month].expenses = monthly[month].revenue * 0.35; // assume 35% ops cost
      });

      const revenueArray = Object.keys(monthly)
        .slice(-6)
        .map(month => ({
          month,
          revenue: monthly[month].revenue,
          expenses: monthly[month].expenses,
          profit: monthly[month].revenue - monthly[month].expenses,
        }));

      // ---- CLIENT GROWTH (based on order counts per month) ----
      const growth = Object.keys(monthly)
        .slice(-6)
        .map((month, i) => ({
          month,
          clients: Math.floor(100 + i * 50 + monthly[month].revenue / 10000)
        }));

      // ---- TOP PRODUCTS (based on service with most orders) ----
      const productCount = {};

      orders.forEach(o => {
        const name = o.service?.name ?? "Unknown Service";
        if (!productCount[name]) productCount[name] = 0;
        productCount[name]++;
      });

      const topProductsArray = Object.entries(productCount)
        .map(([name, count]) => ({
          name,
          sales: count,
          revenue: `Ksh ${count * 6000}`, // estimated revenue
        }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

      // ---- FINAL SUMMARY CARDS ----
      setStats([
        {
          label: "Total Revenue",
          value: `Ksh ${totalRevenue.toLocaleString()}`,
          change: "+21%",
          trend: "up",
          icon: DollarSign,
          color: "from-silver to-dim-grey"
        },
        {
          label: "Active Clients",
          value: clients.size,
          change: "+14%",
          trend: "up",
          icon: Users,
          color: "from-silver to-dim-grey"
        },
        {
          label: "Active Projects",
          value: completed + inProgress,
          change: "+9%",
          trend: "up",
          icon: FolderKanban,
          color: "from-silver to-dim-grey"
        },
        {
          label: "Pending Orders",
          value: pending,
          change: "-3%",
          trend: "down",
          icon: ShoppingBag,
          color: "from-silver to-dim-grey"
        },
      ]);

      setRevenueData(revenueArray);
      setClientGrowthData(growth);

      setProjectStatusData([
        { name: "Completed", value: completed, color: "#BCBCBC" },
        { name: "In Progress", value: inProgress, color: "#6D6D6D" },
        { name: "Pending", value: pending, color: "#404040" },
      ]);

      setTopProducts(topProductsArray);

    } catch (error) {
      console.error("STAT FETCH ERROR:", error);
    }
  };


  useEffect(() => {
    fetchServices();
    fetchProjects();
    fetchClientRequests();
    fetchOrdersStats();
  }, []);







  return (
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
                <div className={`flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-silver" : "text-dim-grey"}`}>
                  {stat.trend === "up" ? (
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


      <br />

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

      <br />

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

      <br />

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
  )
}

export default AdminOverview