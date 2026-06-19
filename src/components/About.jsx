import { Typography, Avatar, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import me from "../photos/me.png";

function useTypingEffect(text, speed = 60, start = false) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) return;

    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, start]);

  return displayed;
}

export default function About() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const introText = "Merhaba, ben Bircan.";
  const typedIntro = useTypingEffect(introText, 60, open);

  useEffect(() => {
    let timer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setOpen(true), 250);
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
        minHeight: "65vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          overflow: "hidden",
          borderRadius: 5,
          boxShadow: open
            ? "0 30px 80px rgba(0,0,0,0.25)"
            : "0 10px 30px rgba(0,0,0,0.1)",
          transition: "0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          flexDirection: { xs: "column", md: "row" },
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* LEFT */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            background: "linear-gradient(135deg, #f5f5f5, #ffffff)",
          }}
        >
          <Avatar
            src={me}
            sx={{
              width: 180,
              height: 180,
              transition: "0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: open ? "scale(1)" : "scale(0.9)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            }}
          />
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            flex: 1.5,
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: open ? 1 : 0,
            transform: open ? "translateX(0)" : "translateX(30px)",
            transition: "0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* TEK SATIR TYPEWRITER */}
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 800,
              mb: 0.5,
              color: "#111",
              whiteSpace: "nowrap",   // 🔥 TEK SATIR
              overflow: "hidden",
            }}
          >
            {typedIntro}
          </Typography>

          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "#666",
              mb: 2,
            }}
          >
            Yazılım Geliştirici
          </Typography>

          <Typography
            sx={{
              fontSize: "1.05rem",
              color: "#444",
              lineHeight: 1.8,
            }}
          >
            Full-stack web geliştirme alanında kendini geliştiren, modern ve kullanıcı odaklı yazılım çözümleri üreten junior bir yazılım geliştiricisiyim.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}