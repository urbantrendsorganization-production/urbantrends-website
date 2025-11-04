import React, { useRef, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import gsap from "gsap";

export default function ProductsMain() {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <Box
      ref={cardRef}
      sx={{
        width: "100%",
        maxWidth: 320,
        height: { xs: 240, sm: 260 },
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: 1.5, sm: 2 },
        mx: "auto",
      }}
    >
      {/* image skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={{ xs: 120, sm: 140 }}
        sx={{
          borderRadius: "15px",
          bgcolor: "rgba(200,200,200,0.4)",
        }}
      />

      {/* title skeleton */}
      <Box sx={{ mt: 2 }}>
        <Skeleton width="80%" height={22} sx={{ borderRadius: "6px" }} />
        <Skeleton width="60%" height={22} sx={{ borderRadius: "6px", mt: 1 }} />
      </Box>

      {/* button skeleton */}
      <Skeleton
        variant="rectangular"
        width={{ xs: "60%", sm: "50%" }}
        height={36}
        sx={{
          borderRadius: "10px",
          mt: 2,
          mx: "auto",
        }}
      />
    </Box>
  );
}
