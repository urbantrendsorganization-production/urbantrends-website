import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Carrousel() {
  const [items, setItems] = useState([]);
  const backendLink = import.meta.env.VITE_MAIN_LINK;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Fetch both in parallel
      const [servicesRes, productsRes] = await Promise.all([
        axios.get(`${backendLink}/v2/api/services`),
        axios.get(`${backendLink}/v2/products/products`),
      ]);

      // Normalize structure
      const servicesData = servicesRes.data.map((item) => ({
        id: `service-${item.id}`,
        title: item.title,
        description: item.description,
        image: item.service_image,
        slug: item.slug,
        type: "service",
      }));

      const productsData = productsRes.data.map((item) => ({
        id: `product-${item.id}`,
        title: item.product_name,
        description: item.description,
        image: item.product_image,
        slug: item.slug_name,
        type: "product",
      }));

      // Combine and shuffle
      const combinedData = [...servicesData, ...productsData].sort(
        () => Math.random() - 0.5
      );

      setItems(combinedData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRedirect = (item) => {
    if (item.type === "service") {
      navigate(`/services/${item.slug}`);
    } else if (item.type === "product") {
      navigate(`/product/${item.slug}`);
    }
  };

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={"auto"}
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={4000}
      className="w-full py-6"
    >
      {items.map((item) => (
        <SwiperSlide
          key={item.id}
          onClick={() => handleRedirect(item)}
          className="
            cursor-pointer
            !w-[220px] !h-[280px]
            sm:!w-[260px] sm:!h-[320px]
            md:!w-[300px] md:!h-[360px]
            lg:!w-[360px] lg:!h-[400px]
          "
        >
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col border border-gray-100">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 sm:h-40 md:h-48 object-cover"
              />
              {/* <span
                className={`absolute top-2 left-2 text-xs px-3 py-1 rounded-full font-medium ${
                  item.type === "service"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-800 text-white"
                }`}
              >
                {item.type.toUpperCase()}
              </span> */}
            </div>

            <div className="p-3 sm:p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 flex-grow line-clamp-3">
                {item.description}
              </p>

              <button
                className="mt-2 sm:mt-3 w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow hover:opacity-90 transition"
              >
                View More
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carrousel;
