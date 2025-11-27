import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Lock, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { useCart } from '@/components/context/CartContext';

export default function CheckOut() {

    const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();



    const handleCheckout = (e) => {
        e.preventDefault();
        toast.success('Order placed successfully! Check your email for confirmation.');
    };

    if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className="w-16 h-16 text-dim-grey mx-auto mb-6" />
            <h2 className="text-silver mb-4">Your Cart is Empty</h2>
            <p className="text-dim-grey mb-8">
              Add some products or services to get started
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/products">
                <Button className="bg-silver text-black hover:bg-silver/90">
                  Browse Products
                </Button>
              </Link>
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
        <br />
        <br />
        <br />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-silver mb-4">Shopping Cart</h1>
          <p className="text-dim-grey">Review your items and complete your purchase</p>
        </motion.div>
        <br />

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
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-silver mb-1">{item.name}</h3>
                        <span className="text-xs text-dim-grey px-2 py-1 rounded bg-gunmetal">
                          {item.type === 'product' ? 'Product' : 'Service'}
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

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 border-dim-grey text-silver hover:border-silver"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-silver w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 border-dim-grey text-silver hover:border-silver"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-silver text-lg">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary & Checkout Form */}
          <div className="space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6"
            >
              <h3 className="text-silver mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-dim-grey">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-dim-grey">
                  <span>Tax (estimated)</span>
                  <span>${(getTotalPrice() * 0.1).toLocaleString()}</span>
                </div>
                <div className="border-t border-gunmetal pt-3 flex justify-between text-silver">
                  <span>Total</span>
                  <span className="text-xl">${(getTotalPrice() * 1.1).toLocaleString()}</span>
                </div>
              </div>
            </motion.div>

            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-silver" />
                <h3 className="text-silver">Secure Checkout</h3>
              </div>
              
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label htmlFor="cardName" className="block text-sm text-silver mb-2">
                    Cardholder Name
                  </label>
                  <Input
                    id="cardName"
                    type="text"
                    placeholder="John Doe"
                    className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm text-silver mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey pr-10"
                      required
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dim-grey" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm text-silver mb-2">
                      Expiry Date
                    </label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm text-silver mb-2">
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-silver mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-gunmetal border-dim-grey text-silver placeholder:text-dim-grey"
                    required
                  />
                </div>
                <br />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-silver text-black hover:bg-silver/90"
                >
                  Complete Purchase
                </Button>
                <br />

                <p className="text-xs text-dim-grey text-center">
                  Your payment information is secure and encrypted
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}