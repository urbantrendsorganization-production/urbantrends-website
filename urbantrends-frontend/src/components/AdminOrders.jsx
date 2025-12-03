import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Download, Filter, Loader2 } from "lucide-react";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(false);

    // pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    // filters
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    // CSV export
    // CSV export
const exportCSV = () => {
    const csvRows = [];
    const headers = ["Order ID", "Client", "Product/Service", "Tier/Price", "Status", "Date"];
    csvRows.push(headers.join(","));

    orders.forEach((order) => {
        const name = order.product?.name || order.service?.name || "N/A";
        const tierOrPrice = order.tier?.name || order.product?.price || order.service?.price || "N/A";

        csvRows.push([
            order._id,
            order.customer?.name || "N/A",
            name,
            tierOrPrice,
            order.status,
            new Date(order.createdAt).toLocaleDateString(),
        ].join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    window.URL.revokeObjectURL(url);
};


    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-silver/20 text-silver border-silver/30";
            case "in-progress":
                return "bg-dim-grey/20 text-dim-grey border-dim-grey/30";
            case "under-revision":
                return "bg-gunmetal/20 text-silver border-silver/20";
            case "pending":
                return "bg-gunmetal/20 text-dim-grey border-dim-grey/30";
            case "cancelled":
                return "bg-red-500/20 text-red-400 border-red-400/20";
            default:
                return "bg-gunmetal/20 text-dim-grey border-dim-grey/30";
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                `https://urbantrends-backend-production-fde8.up.railway.app/api/ords`
            );

            let data = res.data.orders || [];

            // filter: search
            if (search.trim() !== "") {
                data = data.filter((o) =>
                    o.customer?.name?.toLowerCase().includes(search.toLowerCase())
                );
            }

            // filter: status
            if (status !== "all") {
                data = data.filter((o) => o.status === status);
            }

            // pagination calc
            const start = (page - 1) * limit;
            const paginated = data.slice(start, start + limit);
            setOrders(paginated);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [search, status, page]);

    // fetch single order
    const fetchOrderDetails = async (id) => {
        setLoadingOrder(true);
        try {
            const res = await axios.get(
                `https://urbantrends-backend-production-fde8.up.railway.app/api/orders/${id}`
            );
            setSelectedOrder(res.data.order);
        } catch (err) {
            console.log("Order details error:", err);
        }
        setLoadingOrder(false);
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}
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

                    <Button className="bg-silver text-black hover:bg-silver/90" onClick={exportCSV}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            <br />

            {/* FILTER BAR */}
            <div className="flex gap-4 items-center">
                <Input
                    placeholder="Search by client name..."
                    className="bg-gunmetal/20 border-dim-grey/30 text-silver"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Select onValueChange={setStatus} defaultValue="all">
                    <SelectTrigger className="w-[150px] bg-gunmetal/20 border-dim-grey/30 text-silver">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-black">
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="under-revision">Under Revision</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <br />

            {/* ORDERS TABLE */}
            <Card className="bg-gunmetal/20 border-dim-grey/30 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gunmetal">
                                <th className="p-4 text-sm text-dim-grey text-left">Order ID</th>
                                <th className="p-4 text-sm text-dim-grey text-left">Client</th>
                                <th className="p-4 text-sm text-dim-grey text-left">Service</th>
                                <th className="p-4 text-sm text-dim-grey text-left">Tier</th>
                                <th className="p-4 text-sm text-dim-grey text-left">Status</th>
                                <th className="p-4 text-sm text-dim-grey text-left">Date</th>
                                <th className="p-4 text-sm text-dim-grey text-right">Actions</th>
                            </tr>
                        </thead>

                        {/* ORDERS TABLE */}
<tbody>
    {orders.map((order, index) => {
        const name = order.product?.name || order.service?.name || "N/A";
        const tierOrPrice = order.tier?.name || order.product?.price || order.service?.price || "N/A";

        return (
            <motion.tr
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border-b border-gunmetal/50 hover:bg-gunmetal/10 transition-colors"
            >
                <td className="p-4 text-silver text-sm">{order._id}</td>
                <td className="p-4 text-silver text-sm">{order.customer?.name}</td>
                <td className="p-4 text-sm text-dim-grey">{name}</td>
                <td className="p-4 text-silver text-sm">{tierOrPrice}</td>
                <td className="p-4">
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </td>
                <td className="p-4 text-sm text-dim-grey">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-dim-grey hover:text-silver"
                        onClick={() => fetchOrderDetails(order._id)}
                    >
                        Manage
                    </Button>
                </td>
            </motion.tr>
        );
    })}
</tbody>

                    </table>
                </div>
            </Card>

            <br />

            {/* PAGINATION */}
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="border-dim-grey text-silver"
                >
                    Prev
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setPage(page + 1)}
                    className="border-dim-grey text-silver"
                >
                    Next
                </Button>
            </div>

            {/* ORDER DETAILS MODAL */}
            <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                <DialogContent className="bg-black border border-dim-grey/40 text-silver">
                    {loadingOrder ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="animate-spin w-6 h-6 text-silver" />
                        </div>
                    ) : selectedOrder ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Order Details</DialogTitle>
                                <DialogDescription className="text-dim-grey">
                                    Full breakdown of this order.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-3 mt-4">
                                <p><strong>Client:</strong> {selectedOrder.customer?.name}</p>
                                <p><strong>Email:</strong> {selectedOrder.customer?.email}</p>
                                <p><strong>Phone:</strong> {selectedOrder.customer?.phone}</p>
                                <p><strong>Service:</strong> {selectedOrder.service?.name}</p>
                                <p><strong>Tier:</strong> {selectedOrder.tier?.name}</p>
                                <p><strong>Status:</strong> {selectedOrder.status}</p>
                                <p><strong>Notes:</strong> {selectedOrder.notes || "None"}</p>
                            </div>
                        </>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AdminOrders;
