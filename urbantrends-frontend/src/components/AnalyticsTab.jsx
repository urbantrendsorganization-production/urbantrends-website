import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  PieChart, Pie, Cell,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import { TrendingUp, DollarSign, Users } from "lucide-react";

const AnalyticsTab = ({ email }) => {
  const [projects, setProjects] = useState([]);
  const [mySales, setMySales] = useState([]);
  const [allSales, setAllSales] = useState([]);

  useEffect(() => {
    // Fetch developer projects
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`https://urbantrends-backend-production-fde8.up.railway.app/developers/projects/${email}`);
        setProjects(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch developer sales
    const fetchMySales = async () => {
      try {
        const res = await axios.get(`https://urbantrends-backend-production-fde8.up.railway.app/sale/project-sales/by-email/${email}`);
        setMySales(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch all project sales
    const fetchAllSales = async () => {
      try {
        const res = await axios.get("https://urbantrends-backend-production-fde8.up.railway.app/sale/project-sales");
        setAllSales(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
    fetchMySales();
    fetchAllSales();
  }, [email]);

  // Analytics calculations
  const totalRevenue = mySales.reduce((acc, sale) => acc + sale.price, 0);
  const avgProjectPrice = mySales.length ? (totalRevenue / mySales.length).toFixed(2) : 0;
  const totalCustomers = mySales.length;

  // Project performance for BarChart
  const projectPerformanceData = projects.map(p => {
    const salesCount = mySales.filter(s => s.project === p._id).length;
    return {
      title: p.title,
      sales: salesCount,
      views: Math.floor(Math.random() * 100) // placeholder views if you don’t track
    };
  });

  // Category distribution for PieChart
  const categoryDistribution = projects.reduce((acc, p) => {
    const found = acc.find(c => c.name === p.category);
    if (found) found.value += 1;
    else acc.push({ name: p.category, value: 1, color: "#"+Math.floor(Math.random()*16777215).toString(16) });
    return acc;
  }, []);

  // Monthly sales trend for LineChart
  const salesData = mySales.reduce((acc, sale) => {
    const month = new Date(sale.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
    const existing = acc.find(d => d.month === month);
    if (existing) existing.sales += sale.price;
    else acc.push({ month, sales: sale.price });
    return acc;
  }, []).sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <div className="space-y-6">
      <h2 className="text-silver">Performance Analytics</h2>
      <br />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-dim-grey text-sm">Conversion Rate</div>
              <TrendingUp className="w-4 h-4 text-silver" />
            </div>
            <div className="text-3xl text-silver mb-2">{((mySales.length / (projects.length || 1)) * 100).toFixed(1)}%</div>
            <div className="text-xs text-dim-grey">Based on project sales</div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-dim-grey text-sm">Avg. Project Price</div>
              <DollarSign className="w-4 h-4 text-silver" />
            </div>
            <div className="text-3xl text-silver mb-2">${avgProjectPrice}</div>
            <div className="text-xs text-dim-grey">Based on your sales</div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-dim-grey text-sm">Total Sales</div>
              <Users className="w-4 h-4 text-silver" />
            </div>
            <div className="text-3xl text-silver mb-2">{totalCustomers}</div>
            <div className="text-xs text-dim-grey">Projects sold</div>
          </Card>
        </motion.div>
      </div>
      <br />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
            <h3 className="text-silver mb-6">Project Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={projectPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis dataKey="title" stroke="#6D6D6D" />
                <YAxis stroke="#6D6D6D" />
                <Tooltip contentStyle={{ backgroundColor: '#404040', border: '1px solid #6D6D6D', borderRadius: '8px', color: '#BCBCBC' }} />
                <Legend />
                <Bar dataKey="views" fill="#6D6D6D" radius={[8, 8, 0, 0]} />
                <Bar dataKey="sales" fill="#BCBCBC" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
          <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
            <h3 className="text-silver mb-6">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {categoryDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#404040', border: '1px solid #6D6D6D', borderRadius: '8px', color: '#BCBCBC' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
      <br />

      {/* Monthly Trends */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
        <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
          <h3 className="text-silver mb-6">Sales Trend (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="month" stroke="#6D6D6D" />
              <YAxis stroke="#6D6D6D" />
              <Tooltip contentStyle={{ backgroundColor: '#404040', border: '1px solid #6D6D6D', borderRadius: '8px', color: '#BCBCBC' }} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#BCBCBC" strokeWidth={2} dot={{ fill: '#BCBCBC', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;
