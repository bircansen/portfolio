import { Typography, Box, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setOpen(entry.isIntersecting);
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const items = [
    { text: "github.com/bircansen", href: "https://github.com/bircansen" },
    { text: "linkedin.com/in/bbircansen", href: "https://linkedin.com/in/bbircansen/" },
    { text: "bircansen18@outlook.com", href: "mailto:bircansen18@outlook.com" },
    { text: "+90 551 255 51 12", href: "tel:+905512555112" },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 650,
          p: 5,
          borderRadius: 5,
          textAlign: "center",
          background: "rgba(255,255,255,0.8)",
          boxShadow: open
            ? "0 30px 80px rgba(0,0,0,0.25)"
            : "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 700,
            mb: 4,
          }}
        >
          İletişim
        </Typography>

        <Stack spacing={2}>
          {items.map((item, i) => (
            <Box
              key={i}
              component="a"
              href={item.href}
              target="_blank"
              sx={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
                color: "#111",
                wordBreak: "break-word",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: "0.4s",
              }}
            >
              {item.text}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}