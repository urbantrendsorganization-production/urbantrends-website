import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { CheckCircle2, DollarSign, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import dayjs from "dayjs";

function AdminAnalytics() {
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalServices: 0,
    totalProjects: 0,
    conversionRate: 0,
    avgProjectValue: 0,
    clientRetention: 0,
    revenueData: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, servicesRes, projectsRes, devProjectsRes] = await Promise.all([
          axios.get("https://urbantrends-backend-production-fde8.up.railway.app/api/ords"),
          axios.get("https://urbantrends-backend-production-fde8.up.railway.app/services/sers"),
          axios.get("https://urbantrends-backend-production-fde8.up.railway.app/projects/projs"),
          axios.get("https://urbantrends-backend-production-fde8.up.railway.app/developers/projects")
        ]);

        const orders = ordersRes.data?.data || ordersRes.data || [];
        const services = servicesRes.data?.data || servicesRes.data || [];
        const generalProjects = projectsRes.data?.data || projectsRes.data || [];
        const devProjects = devProjectsRes.data?.data || devProjectsRes.data || [];
        const allProjects = [...generalProjects, ...devProjects];

        const totalOrders = orders.length;
        const totalServices = services.length;
        const totalProjects = allProjects.length;

        const conversionRate = totalServices ? ((totalOrders / totalServices) * 100).toFixed(1) : 0;
        const avgProjectValue = allProjects.length ? Math.round(allProjects.reduce((acc, p) => acc + (p.value || 1000), 0) / allProjects.length) : 0;
        const clientRetention = totalProjects ? ((totalProjects / (totalProjects + 10)) * 100).toFixed(1) : 0;

        // Aggregate revenue by month
        const monthlyMap = {};
        allProjects.forEach((p) => {
          const month = dayjs(p.createdAt).format("MMM YYYY");
          if (!monthlyMap[month]) monthlyMap[month] = { revenue: 0, profit: 0 };
          const value = p.value || 1000; // replace with actual project value if available
          monthlyMap[month].revenue += value;
          monthlyMap[month].profit += value * 0.4; // assume 40% profit
        });

        const revenueData = Object.keys(monthlyMap).map((month) => ({
          month,
          revenue: monthlyMap[month].revenue,
          profit: monthlyMap[month].profit
        }));

        setMetrics({ totalOrders, totalServices, totalProjects, conversionRate, avgProjectValue, clientRetention, revenueData });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-silver">Advanced Analytics</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-dim-grey text-sm">Conversion Rate</div>
              <TrendingUp className="w-4 h-4 text-silver" />
            </div>
            <div className="text-3xl text-silver mb-2">{metrics.conversionRate}%</div>
            <div className="text-xs text-dim-grey">Based on orders/services</div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-dim-grey text-sm">Avg. Project Value</div>
              <DollarSign className="w-4 h-4 text-silver" />
            </div>
            <div className="text-3xl text-silver mb-2">${metrics.avgProjectValue}</div>
            <div className="text-xs text-dim-grey">Average across all projects</div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-dim-grey text-sm">Client Retention</div>
              <CheckCircle2 className="w-4 h-4 text-silver" />
            </div>
            <div className="text-3xl text-silver mb-2">{metrics.clientRetention}%</div>
            <div className="text-xs text-dim-grey">Estimated</div>
          </Card>
        </motion.div>
      </div>
      <br />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <Card className="bg-gunmetal/20 border-dim-grey/30 p-6">
            <h3 className="text-silver mb-6">Revenue vs Profit Trend</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={metrics.revenueData}>
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
  );
}

export default AdminAnalytics;
