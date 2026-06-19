import { Typography, Box, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let timer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setOpen(true), 200);
        } else {
          setOpen(false);
          clearTimeout(timer);
        }
      },
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      clearTimeout(timer);
    };
  }, []);

  const items = [
    {
      icon: <GitHubIcon />,
      text: "github.com/bircansen",
      href: "https://github.com/bircansen",
    },
    {
      icon: <LinkedInIcon />,
      text: "linkedin.com/in/bbircansen",
      href: "https://www.linkedin.com/in/bbircansen/",
    },
    {
      icon: <EmailIcon />,
      text: "bircansen18@outlook.com",
      href: "mailto:bircansen18@outlook.com",
    },
    {
      icon: <PhoneIcon />,
      text: "+90 551 255 51 12",
      href: "tel:+905512555112",
    },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
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
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          boxShadow: open
            ? "0 30px 80px rgba(0,0,0,0.25)"
            : "0 10px 30px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: open ? "translateY(0)" : "translateY(20px)",
          opacity: open ? 1 : 0,
          transition: "0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 5,
            textAlign: "center",
            transform: open ? "translateY(0)" : "translateY(15px)",
            opacity: open ? 1 : 0,
            transition: "0.6s",
          }}
        >
          İletişim
        </Typography>

        <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
          {items.map((item, i) => (
            <ContactItem key={i} item={item} open={open} delay={i} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

function ContactItem({ item, open, delay }) {
  return (
    <Box
      component="a"
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        width: "fit-content",
        textDecoration: "none",
        color: "#111",
        px: 2,
        py: 1.5,
        borderRadius: 2,

        transform: open
          ? "translateY(0)"
          : "translateY(20px)",

        opacity: open ? 1 : 0,

        transition: `0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay * 0.1}s`,

        "&:hover": {
          background: "rgba(0,0,0,0.05)",
          transform: "translateY(-3px)",
        },
      }}
    >
      {item.icon}
      <Typography sx={{ textAlign: "center" }}>
        {item.text}
      </Typography>
    </Box>
  );
}