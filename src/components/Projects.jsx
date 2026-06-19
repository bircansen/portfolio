import { Box, Typography, Chip, Stack, Modal } from "@mui/material";
import { useState } from "react";

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

  const projects = [
    {
      title: "Chatterly",
      desc:
        "Kullanıcıların gerçek zamanlı ve uçtan uca şifreli olarak mesajlaşabildiği sohbet uygulaması.",
      tech: {
        core: ["React", "Node.js", "Express", "WebSocket", "MongoDB", "RSA", "AES"],
      },
      slides: [chatterly1, chatterly2, chatterly3, chatterly4, chatterly5],
    },
    {
      title: "Görev Takip Uygulaması",
      desc:
        "Görev ekleme, görev atama ve bu işlemleri güncelleme özelliği bulunan görev takip uygulaması.",
      tech: {
        core: ["React", "ASP.NET Core Web API", "EF Core", "MySQL"],
      },
      slides: [gt1, gt2, gt3],
    },
    {
      title: "Shopora",
      desc:
        "Ürün arama ve filtreleme, favori ve sepet yönetimi ile kullanıcı profil işlemlerini içeren bir e-ticaret web uygulaması.",
      tech: {
        core: ["React", "Redux", "Express", "MongoDB", "Formik", "Yup"],
      },
      slides: [ec1, ec2, ec3, ec4, ec5, ec6],
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
          px: 5,
          py: 6,
          borderRadius: 5,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 6, textAlign: "center" }}>
          Projeler
        </Typography>

        {projects.map((project, i) => {
          const idx = indexMap[i] || 0;
          const current = project.slides[idx];

          return (
            <Box key={i} sx={{ mb: 14 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {project.title}
              </Typography>

              <Typography sx={{ color: "#555", mt: 1, mb: 2, maxWidth: 650 }}>
                {project.desc}
              </Typography>

              {/* TECH */}
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 3 }}>
                {project.tech.core.map((t, i2) => (
                  <Chip
                    key={i2}
                    label={t}
                    size="small"
                    sx={{
                      background: "#111",
                      color: "#fff",
                      transition: "0.25s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
                      },
                    }}
                  />
                ))}
              </Stack>

              {/* IMAGE */}
              <Box
                sx={{ display: "flex", justifyContent: "center" }}
                onMouseDown={handleDragStart}
                onMouseUp={(e) => handleDragEnd(e, i)}
                onTouchStart={handleDragStart}
                onTouchEnd={(e) => handleDragEnd(e, i)}
              >
                <Box
                  sx={{
                    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.01)" },
                  }}
                >
                  <img
                    src={current}
                    onClick={() => setOpenImg(current)}
                    draggable={false}
                    style={{
                      maxWidth: "75vw",
                      maxHeight: "70vh",
                      display: "block",
                      cursor: "zoom-in",
                    }}
                  />
                </Box>
              </Box>

              {/* DOTS */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                  gap: 1,
                }}
              >
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
                      "&:hover": { transform: "scale(1.3)" },
                    }}
                  />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* MODAL */}
      <Modal open={!!openImg} onClose={() => setOpenImg(null)}>
        <Box
          onClick={() => setOpenImg(null)}
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
              borderRadius: "10px",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}