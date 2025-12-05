import { motion } from "framer-motion";
import { Code, Layout, Database, Search, Wrench, Rocket, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import axios from "axios";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useEffect, useState } from "react";
import { useCart } from "@/components/context/CartContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from "react-router-dom";

const ICONS = { Code, Layout, Database, Search, Wrench, Rocket };

export default function Services() {
  const [mainServices, setMainServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate(); 

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/services/sers"
      );
      setMainServices(response.data.services || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSelectTier = (service, tier, tierIndex) => {
  const serviceId = service.id || service._id; // fallback

  if (!serviceId) {
    console.error("Service ID is missing!", service);
    return;
  }

  addToCart({
    id: `${serviceId}-${tier.name}`,
    service: {
      id: serviceId,
      name: service.title,
      image: service.image || 'https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
    },
    tier: { ...tier, index: tierIndex },
    quantity: 1,
  });

  toast.success(`Selected ${tier.name} tier for ${service.title}`);
  navigate('/checkout');
};




  const priceRange = (service) => {
    if (!service?.tiers?.length) return "—";
    const prices = service.tiers.map((t) => Number(t.price ?? 0));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return `${service.priceLabel ?? "From"} ksh ${min} - ksh ${max}`;
  };

  return (
    <div className="min-h-screen bg-black text-silver">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-gunmetal/50 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-dim-grey text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Comprehensive tech services to transform your ideas into reality
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => {
              const IconComponent = ICONS[service.icon] || Code;

              return (
                <motion.div
                  key={service._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="group bg-gunmetal/20 border border-dim-grey/30 rounded-xl p-6 hover:border-silver/50 transition-all duration-300 h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-silver to-dim-grey flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon ? <IconComponent className="w-7 h-7 text-black" /> : null}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-dim-grey text-sm mb-4 line-clamp-3">{service.description}</p>

                    {/* Features preview */}
                    <ul className="space-y-2 mb-4 flex-1">
                      {(service.features || []).slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-dim-grey">
                          <ArrowRight className="w-4 h-4 text-silver mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price and CTA */}
                    <div className="border-t border-gunmetal pt-4 flex flex-col gap-2">
                      <div className="text-xs text-dim-grey mb-1">{service.priceLabel}</div>
                      <div className="text-2xl font-bold mb-2">{priceRange(service)}</div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedService(service)}
                          className="flex-1 bg-silver text-black hover:bg-silver/90"
                        >
                          View More
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal for selected service */}
<Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
  <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-black">
    {selectedService && (
      <>
        <DialogHeader>
          <DialogTitle>{selectedService.title}</DialogTitle>
          <DialogDescription>
            {selectedService.description}
          </DialogDescription>
        </DialogHeader>

        {/* Main Features */}
        <div className="grid gap-4 mt-4">
          <h4 className="font-medium text-dim-grey">Features:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-dim-grey">
            {(selectedService.features || []).map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* Tiers Section */}
        <div className="grid gap-4">
          <h4 className="font-medium text-dim-grey">Available Tiers:</h4>
          {(selectedService.tiers || []).map((tier, ti) => (
            <div key={ti} className="border p-4 rounded-lg grid gap-3 bg-black/10">
              {/* Tier Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="font-semibold">{tier.name}</div>
                <div>Price: ksh {tier.price}</div>
                <div>Delivery: {tier.deliveryTime} days</div>
                <div>Revisions: {tier.revisions}</div>
              </div>

              {/* Tier Features */}
              {tier.features?.length > 0 && (
                <div className="grid gap-1 mt-2">
                  <span className="font-medium text-dim-grey">Tier Features:</span>
                  <ul className="list-disc list-inside text-sm text-dim-grey">
                    {tier.features.map((f, fi) => (
                      <li key={fi}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Order Button */}
              <Button
                className="mt-2 w-full bg-silver text-black hover:bg-silver/90"
                onClick={() => handleSelectTier(selectedService, tier, ti)}
              >
                Order This Tier
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </>
    )}
  </DialogContent>
</Dialog>

    </div>
  );
}
