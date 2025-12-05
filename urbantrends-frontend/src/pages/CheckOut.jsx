import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, ListOrdered } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { useCart } from '@/components/context/CartContext';
import axios from 'axios';

export default function CheckOut() {
  const { items, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e) => {
  e.preventDefault();

  if (items.length === 0) {
    toast.error("Cart is empty!");
    return;
  }

  const customerData = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
  };

  setLoading(true)

  try {
    for (const item of items) {
      const orderPayload = {
        serviceId: item.service.id, // only the service ID
        tierIndex: item.tier.index, // the index of selected tier in service.tiers
        customer: customerData,
        notes: item.notes || "",
      };

      console.log("Payload before sending:", orderPayload);

      // Place order
      const response = await axios.post(
        "https://urbantrends-backend-production-fde8.up.railway.app/api/create",
        orderPayload
      );

      if (response.status !== 201) {
        toast.error(`Failed to place order for ${item.service.name}`);
        console.error(response.data);
        continue;
      }

      // Send email after successful order
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        try {
          await axios.post("https://email-service-production-f8ad.up.railway.app/api/email/send", {
            email: userEmail,
            userName: customerData.name,
            subject: "Service successfully ordered",
            message: `Your project "${item.service.name}" has been successfully sold. Check your dashboard for details.`,
            ctaText: "View Dashboard",
            ctaLink: "https://urbantrends.dev/dashboard",
          });
          console.log(`Email sent for ${item.service.name}`);
        } catch (emailError) {
          console.error("Failed to send email:", emailError.response?.data || emailError.message);
        } finally {
          setLoading(false)
        }
      }
    }

    toast.success("All orders placed successfully!");
    clearCart();
  } catch (error) {
    console.error("Order submission error:", error.response?.data || error.message);
    toast.error("Failed to place order. Please try again.");
  }
};



  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <ShoppingBag className="w-16 h-16 text-dim-grey mx-auto mb-6" />
            <h2 className="text-silver mb-4">Your Cart is Empty</h2>
            <p className="text-dim-grey mb-8">Add some services to get started</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/services">
                <Button variant="outline" className="border-silver text-silver hover:bg-silver hover:text-black">
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h1 className="text-silver mb-4">Checkout</h1>
          <p className="text-dim-grey">Review your service selections and complete your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6 hover:border-silver/30 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback src={item.service.image} alt={item.service.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-silver mb-1">{item.service.name}</h3>
                        <span className="text-xs text-dim-grey px-2 py-1 rounded bg-gunmetal">
                          Tier: {item.tier.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-dim-grey hover:text-silver hover:bg-gunmetal flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Tier Info */}
                    <div className="mt-2 text-dim-grey text-sm">
                      <p>Price: ${item.tier.price.toLocaleString()}</p>
                      <p>Delivery: {item.tier.deliveryTime} days</p>
                      <p>Revisions: {item.tier.revisions}</p>
                      <ul className="list-disc ml-4 mt-1">
                        {item.tier.features.map((feature, fi) => (
                          <li key={fi}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary & Checkout Form */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6">
              <h3 className="text-silver mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-dim-grey">
                    <span>{item.service.name} ({item.tier.name})</span>
                    <span>${item.tier.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-gunmetal pt-3 flex justify-between text-silver">
                  <span>Total</span>
                  <span className="text-xl">${items.reduce((acc, i) => acc + i.tier.price * i.quantity, 0).toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
            </div>
            <br />
            

            {/* Checkout Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <ListOrdered className="w-5 h-5 text-silver" />
                <h3 className="text-silver">Fill in the following to place Order</h3>
              
              </div>
              <br />

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <Input name="name" placeholder="Full Name" className="bg-gunmetal border-dim-grey text-silver" required />
                </div>
                <br />
                <div>
                  <Input name="email" type="email" placeholder="Email Address" className="bg-gunmetal border-dim-grey text-silver" required />
                </div>
                <br />
                <div>
                  <Input name="phone" placeholder="Phone Number" className="bg-gunmetal border-dim-grey text-silver" required />
                </div>
                <br />
                <Button
              type="submit"
              size="lg"
              className="w-full bg-silver text-black hover:bg-silver/90"
              disabled={loading} // disable button while loading
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>
              </form>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
