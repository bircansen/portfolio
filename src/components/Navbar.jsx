import { AppBar, Box, Button, Typography } from "@mui/material";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";

import cv from "../assets/cv.pdf"; // 🔥 DOĞRU PDF IMPORT

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { id: "projects", label: "PROJELER" },
    { id: "contact", label: "İLETİŞİM" },
  ];

  // 🔥 PDF AÇMA (DOĞRU YÖNTEM)
  const openCV = () => {
    window.open(cv, "_blank");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Box
        sx={{
          position: "fixed",
          top: scrolled ? 8 : 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            width: scrolled ? "min(760px, 94vw)" : "min(900px, 92vw)",

            px: scrolled ? 2 : 3,
            py: scrolled ? 0.6 : 1,

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
          {/* SOL → ABOUT */}
          <Link to="about" smooth duration={600} offset={-90}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1rem", md: "1.2rem" },
                cursor: "pointer",
                color: "#111",
              }}
            >
              Bircan Şen
            </Typography>
          </Link>

          {/* SAĞ MENU */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: scrolled ? 0.2 : 0.5,
            }}
          >
            {menu.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth
                duration={600}
                offset={-90}
              >
                <Button sx={{ color: "#222", textTransform: "none" }}>
                  {item.label}
                </Button>
              </Link>
            ))}

            {/* ÖZGEÇMİŞ (PDF) */}
            <Button
              onClick={openCV}
              sx={{ color: "#222", textTransform: "none" }}
            >
              ÖZGEÇMİŞ
            </Button>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}