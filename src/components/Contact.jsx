import { Typography, Box, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Contact() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          boxShadow: "0 30px 80px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 5,
            textAlign: "center",
          }}
        >
          İletişim
        </Typography>

        <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
          <ContactItem
            icon={<GitHubIcon />}
            text="github.com/bircansen"
            href="https://github.com/bircansen"
          />
          <ContactItem
            icon={<LinkedInIcon />}
            text="linkedin.com/in/bbircansen"
            href="https://www.linkedin.com/in/bbircansen/"
          />
          <ContactItem
            icon={<EmailIcon />}
            text="bircansen18@outlook.com"
            href="mailto:bircansen18@outlook.com"
          />
          <ContactItem
            icon={<PhoneIcon />}
            text="+90 551 255 51 12"
            href="tel:+905512555112"
          />
        </Stack>
      </Box>
    </Box>
  );
}

function ContactItem({ icon, text, href }) {
  return (
    <Box
      component="a"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
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
        transition: "0.25s",

        "&:hover": {
          background: "rgba(0,0,0,0.05)",
          transform: "translateY(-3px)",
        },
      }}
    >
      {icon}
      <Typography sx={{ textAlign: "center" }}>{text}</Typography>
    </Box>
  );
}