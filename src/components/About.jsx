import { Typography, Avatar, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import me from "../photos/me.png";

export default function About() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let timer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            setOpen(true);
          }, 250);
        } else {
          setOpen(false);
          clearTimeout(timer);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
      }}
    >
      {/* PANEL (KART HİSSİ AMA FULL MODERN) */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          overflow: "hidden",
          borderRadius: 5,

          // soft glass shadow
          boxShadow: open
            ? "0 30px 80px rgba(0,0,0,0.25)"
            : "0 10px 30px rgba(0,0,0,0.1)",

          transition: "0.6s cubic-bezier(0.22, 1, 0.36, 1)",

          flexDirection: { xs: "column", md: "row" },
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* LEFT SIDE - AVATAR */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            background: "linear-gradient(135deg, #f5f5f5, #ffffff)",
            transition: "0.6s",
          }}
        >
          <Avatar
            src={me}
            sx={{
              width: 160,
              height: 160,
              transition: "0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: open
                ? "scale(1)"
                : "scale(0.9)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            }}
          />
        </Box>

        {/* RIGHT SIDE - TEXT */}
        <Box
          sx={{
            flex: 1.5,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            opacity: open ? 1 : 0,
            transform: open
              ? "translateX(0)"
              : "translateX(30px)",

            transition: "0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Hakkımda
          </Typography>

          <Typography sx={{ color: "#555", lineHeight: 1.7 }}>
            Mobil ve web teknolojilerine ağırlık vererek yazılım geliştirme alanında çalışan, modern ve ölçeklenebilir yazılım çözümleri geliştiren, kullanıcı deneyimini ön planda tutan ve öğrenmeye açık bir geliştiriciyim.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}