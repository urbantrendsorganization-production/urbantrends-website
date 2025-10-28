import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Services() {
    const { slug } = useParams();
    const [tiers, setTiers] = useState([]);
    const backendLink = import.meta.env.VITE_MAIN_LINK;

    const fetchTiers = async () => {
        try {
            const response = await axios.get(`${backendLink}/v2/tiers/tier/${slug}`);
            setTiers(response.data);
        } catch (error) {
            console.error("Error fetching tiers", error.message);
        }
    };

    useEffect(() => {
        fetchTiers();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-6">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">
                    Service Tiers
                </h1>
                <p className="text-gray-400 text-lg">
                    Explore our packages and pick the one that aligns with your project’s scale and ambitions.
                </p>
            </div>

            {tiers.length === 0 ? (
                <p className="text-center text-gray-500">Loading tiers...</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {tiers.map((tier) => {
                        let parsedFeatures = [];
                        try {
                            parsedFeatures = JSON.parse(tier.features);
                        } catch (e) {
                            console.warn("Invalid JSON in features:", tier.features);
                        }

                        return (
                            <div
                                key={tier.id}
                                className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="text-2xl font-semibold mb-2 text-cyan-400">
                                        {tier.tier_name}
                                    </h2>
                                    <p className="text-gray-400 mb-4">{tier.description}</p>

                                    <div className="my-4">
                                        <h3 className="text-3xl font-bold text-teal-400">${tier.price}</h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Delivery: {tier.delivery_time || '—'} Days
                                        </p>
                                    </div>

                                    <ul className="text-gray-300 text-sm space-y-2 mt-4">
                                        {parsedFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    className="mt-6 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white py-2 rounded-xl w-full font-medium transition-all"
                                >
                                    Select Tier
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Services;
