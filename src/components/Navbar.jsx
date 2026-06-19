// components/Navbar.jsx
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-scroll";

export default function Navbar() {
  const menu = [
    { id: "about", label: "Hakkımda" },
    { id: "projects", label: "Projeler" },
    { id: "contact", label: "İletişim" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "transparent",
        boxShadow: "none",
        mt: 2,
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            background: "#fff",
            borderRadius: "50px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            px: 2,
            py: 1,
            display: "flex",
            gap: 2,
          }}
        >
          {menu.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
            >
              <Button
                sx={{
                  color: "#444",
                  fontWeight: 600,
                  borderRadius: "20px",
                  "&:hover": {
                    background: "#f2f2f2",
                  },
                  "&.active": {
                    background: "#1976d2",
                    color: "#fff",
                  },
                }}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </Box>
      </Box>
    </AppBar>
  );
}