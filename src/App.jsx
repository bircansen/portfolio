import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Navbar />

      <Box id="about" sx={{ pt: 10 }}>
        <About />
      </Box>

      <Box id="projects" sx={{ pt: 10 }}>
        <Projects />
      </Box>

      <Box id="contact" sx={{ pt: 10 }}>
        <Contact />
      </Box>
    </Box>
  );
}

export default App;