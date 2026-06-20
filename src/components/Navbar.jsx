import { AppBar, Box, Button, Typography } from "@mui/material";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import cv from "../assets/cv.pdf";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { id: "projects", label: "PROJELER" },
    { id: "cv", label: "ÖZGEÇMİŞ", action: "cv" },
    { id: "contact", label: "İLETİŞİM" },
  ];

  const openCV = () => window.open(cv, "_blank");

  return (
    <AppBar position="fixed" elevation={0} sx={{ background: "transparent" }}>
      <Box
        sx={{
          position: "fixed",
          top: scrolled ? 8 : 12,
          left: "50%",
          transform: scrolled
            ? "translateX(-50%) scale(0.96)"
            : "translateX(-50%) scale(1)",
          zIndex: 1300,
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: {
              xs: scrolled ? "85vw" : "95vw",
              md: scrolled ? "760px" : "900px",
            },
            maxWidth: "95vw",
            px: {
              xs: scrolled ? 1.8 : 1.2,
              md: scrolled ? 2 : 3,
            },
            py: {
              xs: scrolled ? 0.6 : 0.4,
              md: scrolled ? 0.6 : 1,
            },
            borderRadius: "999px",
            background: scrolled
              ? "rgba(255,255,255,0.94)"
              : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: scrolled
              ? "0 14px 40px rgba(0,0,0,0.22)"
              : "0 6px 20px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
          }}
        >
          {/* LEFT */}
          <Link to="about" smooth duration={600} offset={-90}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "0.8rem", md: "1.2rem" },
                cursor: "pointer",
                color: "#111",
              }}
            >
              Bircan Şen
            </Typography>
          </Link>

          {/* RIGHT MENU */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {menu.map((item) => {
              if (item.action === "cv") {
                return (
                  <Button
                    key={item.id}
                    onClick={openCV}
                    sx={{
                      color: "#222",
                      textTransform: "none",
                      minWidth: "auto",
                      px: { xs: 0.5, md: 1.5 },
                      fontSize: { xs: "0.7rem", md: "0.95rem" },
                    }}
                  >
                    ÖZGEÇMİŞ
                  </Button>
                );
              }

              return (
                <Link
                  key={item.id}
                  to={item.id}
                  smooth
                  duration={600}
                  offset={-90}
                >
                  <Button
                    sx={{
                      color: "#222",
                      textTransform: "none",
                      minWidth: "auto",
                      px: { xs: 0.5, md: 1.5 },
                      fontSize: { xs: "0.7rem", md: "0.95rem" },
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}