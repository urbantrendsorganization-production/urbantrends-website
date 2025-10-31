import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Testimonials() {
  const [clientMessages, setClientMessages] = useState([]);
  const mainLink = import.meta.env.VITE_MAIN_LINK;

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${mainLink}/v2/testimony/clients`);
      setClientMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch clients", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="w-full relative bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea]">
      {/* glowing element */}
      <div className="absolute inset-0 flex justify-center -z-10">
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 blur-3xl opacity-40 animate-pulse"></div>
      </div>

      <h1 className="text-5xl text-center font-light font-karma">Our Clients</h1>

      {/* clients cards */}
      <div className="w-full flex flex-wrap justify-evenly mt-6 p-4 gap-4">
        {clientMessages.length > 0 ? (
          clientMessages.map((client, index) => (
            <div
              key={index}
              className="md:w-1/4 w-full sm:w-2/5 space-y-4 p-4 border-2 border-black rounded bg-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300"
            >
              <div className="w-28 h-28 rounded-full mx-auto overflow-hidden">
                {client.client_image ? (
                  <img
                    src={client.client_image}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              <h3 className="text-sm text-center italic text-gray-800">
                {client.client_message || "No message available."}
              </h3>

              <div className="w-4/5 h-8 mx-auto flex items-center justify-center bg-black">
                <p className="text-center font-medium text-white">
                  {client.client_name || "Anonymous"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-8">No testimonials available yet.</p>
        )}
      </div>
    </div>
  );
}

export default Testimonials;
