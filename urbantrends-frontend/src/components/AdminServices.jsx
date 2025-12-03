// AdminServices.jsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MoreVertical, Trash2, UserPlus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import { Button } from "@/components/ui/button";
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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card } from "./ui/card";

import { useForm, useFieldArray } from "react-hook-form";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/services/sers"
      );
      setServices(res.data.services || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Form setup
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      priceLabel: "Starting at",
      features: [""],
      tiers: [
        {
          name: "Basic",
          price: 50,
          deliveryTime: 3,
          revisions: 1,
          features: [""],
        },
      ],
    },
  });

  const { register, control, handleSubmit, watch, reset } = form;
  const featuresArray = useFieldArray({ control, name: "features" });
  const tiersArray = useFieldArray({ control, name: "tiers" });

  const watchedTiers = watch("tiers");

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axios.post(
        "https://urbantrends-backend-production-fde8.up.railway.app/services/create",
        data
      );
      toast.success("Service created");
      reset();
      fetchServices();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create service");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    setDeletingId(id);
    try {
      await axios.delete(
        `https://urbantrends-backend-production-fde8.up.railway.app/services/${id}`
      );
      toast.success("Deleted");
      fetchServices();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const priceRange = (service) => {
    if (!service?.tiers?.length) return "—";
    const prices = service.tiers.map((t) => Number(t.price ?? 0));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return `${service.priceLabel ?? "From"} $${min} - $${max}`;
  };

  return (
    <div className="py-6 w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-silver">Services</h1>
          <p className="text-sm text-dim-grey">Manage offerings — add, view, delete.</p>
        </div>

        {/* Modal Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-silver text-black hover:bg-silver/90">
              <UserPlus className="w-4 h-4" />
              Add Service
            </Button>
          </DialogTrigger>

          {/* Modal Content */}
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Fill in the service details. You can add features and pricing tiers.
                </DialogDescription>
              </DialogHeader>

              {/* Title + Price Label */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="font-medium">Title</label>
                  <Input placeholder="Website Development" {...register("title")} />
                </div>
                <div className="grid gap-2">
                  <label className="font-medium">Price Label</label>
                  <Input placeholder="Starting at" {...register("priceLabel")} />
                </div>
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <label className="font-medium">Description</label>
                <Textarea
                  rows={4}
                  placeholder="Professional website development services..."
                  {...register("description")}
                />
              </div>

              {/* Main Features */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Features</label>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => featuresArray.append("")}
                  >
                    + Add Feature
                  </Button>
                </div>
                {featuresArray.fields.map((f, i) => (
                  <div key={f.id} className="flex gap-2">
                    <Input placeholder={`Feature ${i + 1}`} {...register(`features.${i}`)} />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => featuresArray.remove(i)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Tiers */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Tiers</label>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      tiersArray.append({
                        name: "",
                        price: 0,
                        deliveryTime: 1,
                        revisions: 0,
                        features: [""],
                      })
                    }
                  >
                    + Add Tier
                  </Button>
                </div>

                {tiersArray.fields.map((tier, ti) => (
                  <div key={tier.id} className="border p-4 rounded-lg grid gap-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Input placeholder="Tier Name" {...register(`tiers.${ti}.name`)} />
                      <Input type="number" placeholder="Price" {...register(`tiers.${ti}.price`)} />
                      <Input type="number" placeholder="Delivery (days)" {...register(`tiers.${ti}.deliveryTime`)} />
                      <Input type="number" placeholder="Revisions" {...register(`tiers.${ti}.revisions`)} />
                    </div>

                    {/* Tier Features */}
                    <div className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Tier Features</span>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            const updated = [...watchedTiers];
                            updated[ti].features.push("");
                            form.setValue("tiers", updated);
                          }}
                        >
                          + Add Feature
                        </Button>
                      </div>
                      {watchedTiers[ti].features.map((_, fi) => (
                        <div key={fi} className="flex gap-2">
                          <Input
                            placeholder={`Feature ${fi + 1}`}
                            {...register(`tiers.${ti}.features.${fi}`)}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              const updated = [...watchedTiers];
                              updated[ti].features.splice(fi, 1);
                              form.setValue("tiers", updated);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => tiersArray.remove(ti)}
                    >
                      Remove Tier
                    </Button>
                  </div>
                ))}
              </div>

              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Service"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services list */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-20 text-dim-grey">Loading services…</div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 text-dim-grey">No services yet — add one.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <motion.div
                key={s._id ?? idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <ImageWithFallback
                          src={s.icon || "/placeholder.png"}
                          alt={s.title}
                          className="w-14 h-14 rounded-lg object-cover border"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-silver">{s.title}</h3>
                          <p className="text-sm text-dim-grey line-clamp-2">{s.description}</p>
                          <div className="flex gap-2 mt-2 text-xs">
                            <span className="px-2 py-1 bg-black/10 rounded">{s.features?.length ?? 0} features</span>
                            <span className="px-2 py-1 bg-black/10 rounded">{s.tiers?.length ?? 0} tiers</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-dim-grey">{new Date(s.createdAt).toLocaleDateString()}</div>
                        <div className="text-sm font-medium text-silver">{priceRange(s)}</div>
                        <div className="flex gap-2 mt-2">
                          <Button size="icon" variant="ghost" onClick={() => toast("More actions coming soon")}>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(s._id)}
                            disabled={deletingId === s._id}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
