import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

function Order() {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // could be service or product
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const servicesRes = await axios.get(
        "https://api.urbantrends.dev/v2/api/services"
      );
      const productsRes = await axios.get(
        "https://api.urbantrends.dev/v2/products/products"
      );
      setServices(servicesRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setSuccess(false);
    setFormData({ name: "", email: "", notes: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 mt-10">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Services & Products
      </h1>

      {/* SERVICES GRID */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Services
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleSelect(service)}
              className={`cursor-pointer bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden ${
                selectedItem?.id === service.id ? "ring-2 ring-indigo-500" : ""
              }`}
            >
              <img
                src={service.service_image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Products
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleSelect(product)}
              className={`cursor-pointer bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden ${
                selectedItem?.id === product.id ? "ring-2 ring-indigo-500" : ""
              }`}
            >
              <img
                src={product.product_image}
                alt={product.product_name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {product.product_name}
                </h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER FORM */}
      {selectedItem && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Order:{" "}
            {"title" in selectedItem
              ? selectedItem.title
              : selectedItem.product_name}
          </h2>

          {success ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Order Submitted!
              </h3>
              <p className="text-gray-600">
                Thank you {formData.name}, your order has been received. We
                will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Project Details / Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any extra information..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Order"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Order;
