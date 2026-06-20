import { Box, Typography, Chip, Stack, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

import chatterly1 from "../photos/chatterly1.png";
import chatterly2 from "../photos/chatterly2.png";
import chatterly3 from "../photos/chatterly3.png";
import chatterly4 from "../photos/chatterly4.png";
import chatterly5 from "../photos/chatterly5.png";

import gt1 from "../photos/gt1.png";
import gt2 from "../photos/gt2.png";
import gt3 from "../photos/gt3.png";

import ec1 from "../photos/ec1.png";
import ec2 from "../photos/ec2.png";
import ec3 from "../photos/ec3.png";
import ec4 from "../photos/ec4.png";
import ec5 from "../photos/ec5.png";
import ec6 from "../photos/ec6.png";

export default function Projects() {
  const [indexMap, setIndexMap] = useState({});
  const [dragStartX, setDragStartX] = useState(null);
  const [openImg, setOpenImg] = useState(null);
  const [visibleCards, setVisibleCards] = useState({});
  const cardRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = entry.target.getAttribute("data-index");
        if (entry.isIntersecting) {
          setVisibleCards((prev) => ({ ...prev, [index]: true }));
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "-80px 0px -50px 0px",
    });

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Chatterly",
      desc: "Gerçek zamanlı ve uçtan uca şifreli mesajlaşma uygulaması.",
      tech: {
        core: ["React", "Node.js", "Express", "WebSocket", "MongoDB", "RSA", "AES"],
      },
      slides: [chatterly1, chatterly2, chatterly3, chatterly4, chatterly5],
       captions: [
    "Chatterly Giriş Ekranı",
    "Chatterly Kayıt Ekranı",
    "Kullanıcı Profil Güncelleme",
    "Sohbet & Mesajlaşma",
    "Grup Sohbeti"
  ],
      github: "https://github.com/bircansen/chat-app.git",
      live: "https://chatterly-lrhs.onrender.com/chats",
    },
    {
      title: "Görev Takip Uygulaması",
      desc: "Görev ekleme, görev atama ve bu işlemleri güncelleme özelliği bulunan görev takip uygulaması.",
      tech: {
        core: ["React", "ASP.NET Core Web API", "EF Core", "MySQL"],
      },
      slides: [gt1, gt2, gt3],
      captions: [
    "Görev Listesi",
    "Görev Ekleme Modalı",
    "Kullanıcı Bazlı Görev Tablosu"
  ],
      github: "https://github.com/bircansen/task-mini-app.git",
    },
    {
      title: "Shopora",
      desc:
        "Ürün arama ve filtreleme, favori ve sepet yönetimi ile kullanıcı profil işlemlerini içeren bir e-ticaret web uygulaması.",
      tech: {
        core: ["React", "Redux", "Express", "MongoDB", "Formik", "Yup"],
      },
      slides: [ec1, ec2, ec3, ec4, ec5, ec6],
      captions: [
    "Shopora Anasayfa",
    "Favoriler Sayfası",
    "Sepet Görünümü",
    "Ödeme Ekranı",
    "Arama Filtreleme",
     "Kullanıcı Profil Güncelleme"
  ],
      github: "https://github.com/bircansen/shopora.git",
    },
  ];

  const setSlide = (i, idx) => {
    setIndexMap((prev) => ({ ...prev, [i]: idx }));
  };

  const next = (i) => {
    setIndexMap((prev) => {
      const current = prev[i] || 0;
      const len = projects[i].slides.length;
      return { ...prev, [i]: (current + 1) % len };
    });
  };

  const prev = (i) => {
    setIndexMap((prev) => {
      const current = prev[i] || 0;
      const len = projects[i].slides.length;
      return {
        ...prev,
        [i]: current === 0 ? len - 1 : current - 1,
      };
    });
  };

  const handleDragStart = (e) => {
    setDragStartX(e.clientX || e.touches?.[0]?.clientX);
  };

  const handleDragEnd = (e, i) => {
    const endX = e.clientX || e.changedTouches?.[0]?.clientX;
    if (dragStartX === null || endX === undefined) return;

    const diff = dragStartX - endX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? next(i) : prev(i);
    }

    setDragStartX(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          px: { xs: 1.5, sm: 3, md: 5 },
          py: 6,
          borderRadius: 5,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            mb: 6,
            textAlign: "center",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Projeler
        </Typography>

        {projects.map((project, i) => {
          const idx = indexMap[i] || 0;
          const current = project.slides[idx];
          const isVisible = visibleCards[i];

          return (
            <Box
              key={i}
              data-index={i}
              ref={(el) => (cardRefs.current[i] = el)}
              sx={{
                mb: { xs: 8, md: 14 },
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: "0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* TITLE + LINKS */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", md: "2.1rem" },
                  }}
                >
                  {project.title}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Box
                    component="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                      textDecoration: "none",
                      color: "#111",
                      fontWeight: 600,
                      px: { xs: 1, md: 2 },
                      py: { xs: 0.5, md: 1 },
                      fontSize: { xs: "0.75rem", md: "0.9rem" },
                      borderRadius: "10px",
                      background: "#f2f2f2",
                      transition: "0.2s",
                      "&:hover": {
                        background: "#e6e6e6",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <GitHubIcon fontSize="small" />
                    GitHub
                  </Box>

                  {project.live && (
                    <Box
                      component="a"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                        textDecoration: "none",
                        color: "#111",
                        fontWeight: 600,
                        px: { xs: 1, md: 2 },
                        py: { xs: 0.5, md: 1 },
                        fontSize: { xs: "0.75rem", md: "0.9rem" },
                        borderRadius: "10px",
                        background: "#e8f4ff",
                        transition: "0.2s",
                        "&:hover": {
                          background: "#d6ecff",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <LanguageIcon fontSize="small" />
                      Live
                    </Box>
                  )}
                </Box>
              </Box>

              <Typography sx={{ color: "#555", mt: 1, mb: 2 }}>
                {project.desc}
              </Typography>

              <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.8, mb: 3 }}>
                {project.tech.core.map((t, i2) => (
                  <Chip
                    key={i2}
                    label={t}
                    size="small"
                    sx={{
                      background: "#111",
                      color: "#fff",
                      fontSize: "0.75rem",
                    }}
                  />
                ))}
              </Stack>

              {/* SLIDER (GERİ EKLENDİ) */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  onMouseDown={handleDragStart}
                  onMouseUp={(e) => handleDragEnd(e, i)}
                  onTouchStart={handleDragStart}
                  onTouchEnd={(e) => handleDragEnd(e, i)}
                  sx={{
                    width: "100%",
                    maxWidth: 900,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                    position: "relative",
                  }}
                >
                  {/* CLICK AREAS */}
                  <Box
                    onClick={() => prev(i)}
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "50%",
                      height: "100%",
                      zIndex: 2,
                    }}
                  />
                  <Box
                    onClick={() => next(i)}
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      width: "50%",
                      height: "100%",
                      zIndex: 2,
                    }}
                  />

                  <img
                    src={current}
                    onClick={() => setOpenImg(current)}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      cursor: "zoom-in",
                    }}
                  />
                  <Typography
  sx={{
    textAlign: "center",
    mt: 1,
    fontSize: { xs: "0.75rem", md: "0.85rem" },
    color: "#666",
    px: 1,

    opacity: 1,
    transition: "0.3s ease",
  }}
>
  {project.captions?.[idx] || ""}
</Typography>
                </Box>
              </Box>

              {/* DOTS */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, py: 1.5 }}>
                {project.slides.map((_, idx2) => (
                  <Box
                    key={idx2}
                    onClick={() => setSlide(i, idx2)}
                    sx={{
                      width: idx2 === idx ? 10 : 7,
                      height: idx2 === idx ? 10 : 7,
                      borderRadius: "50%",
                      background: idx2 === idx ? "#111" : "#bbb",
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                  />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Modal open={!!openImg} onClose={() => setOpenImg(null)}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.9)",
          }}
        >
          <img
            src={openImg}
            style={{
              maxWidth: "95vw",
              maxHeight: "95vh",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}