import React, { useRef, useEffect } from "react";
import { Box, Skeleton, Typography, Button } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsMain({ name, image, description, slug }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });
    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <Box
      ref={cardRef}
      sx={{
        width: "100%",
        maxWidth: 320,
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: "rgba(255,255,255,0.6)",
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
        p: 2,
        mx: "auto",
      }}
    >
      {/* Product Image */}
      {image ? (
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: "100%",
            height: { xs: 140, sm: 160 },
            borderRadius: "15px",
            objectFit: "cover",
            mb: 2,
          }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: { xs: 140, sm: 160 },
            borderRadius: "15px",
            mb: 2,
            bgcolor: "rgba(200,200,200,0.4)",
          }}
        />
      )}

      {/* Product Info */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {name || <Skeleton width="80%" height={22} />}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description || (
            <>
              <Skeleton width="100%" height={15} />
              <Skeleton width="90%" height={15} sx={{ mt: 0.5 }} />
              <Skeleton width="95%" height={15} sx={{ mt: 0.5 }} />
            </>
          )}
        </Typography>
      </Box>

      {/* CTA Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          borderRadius: "12px",
          py: 1.5,
          fontWeight: "bold",
        }}
        href={slug ? `/products/${slug}` : "#"}
      >
        {slug ? "View Product" : <Skeleton width="60%" height={30} />}
      </Button>
    </Box>
  );
}
