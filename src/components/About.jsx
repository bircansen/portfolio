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
      if (i >= text.length) clearInterval(interval);
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

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        timer = setTimeout(() => setOpen(true), 250);
      } else {
        setOpen(false);
      }
    });

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
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
          borderRadius: 5,
          boxShadow: open
            ? "0 30px 80px rgba(0,0,0,0.25)"
            : "0 10px 30px rgba(0,0,0,0.1)",
          transition: "0.6s",
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
          }}
        >
          <Avatar
            src={me}
            sx={{
              width: 180,
              height: 180,
              transform: open ? "scale(1)" : "scale(0.9)",
            }}
          />
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            flex: 1.5,
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.4rem", md: "2rem" },
              fontWeight: 800,
              color: "#111",
            }}
          >
            {typedIntro}
          </Typography>

          <Typography sx={{ fontSize: "1.1rem", fontWeight: 500, color: "#666" }}>
            Yazılım Geliştirici
          </Typography>

          <Typography sx={{ fontSize: "1rem", color: "#444", mt: 2 }}>
            Full-stack web geliştirme alanında kendini geliştiren, modern ve kullanıcı odaklı yazılım çözümleri üreten junior bir geliştiriciyim.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}