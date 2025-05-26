import {
  Container,
  Box,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ULogo as UmbraLogo } from "../components/Logo";
import { AboutUs } from "../components/AboutUs";
import { Gudnak } from "../components/Gudnak/Gudnak";
import { Contact } from "../components/Contact";
import { TopBar } from "../components/TopBar";

const Index = () => {

  useEffect(() => {
    // hack to get the color mode to work in the first render
    if (!localStorage.getItem("chakra-ui-color-mode-default")) {
      localStorage.setItem("chakra-ui-color-mode", "dark")
      localStorage.setItem("chakra-ui-color-mode-default", "set")
    }
  }, []);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
      
    // Update window size on resize and initial load
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return(
  <>
    <UmbraLogo windowSize={windowSize} />
    <TopBar />
    <Container maxW={{base: "container.sm", md: "container.lg"}} pt={{base: 4, md: 10}} id="projects">
      <Gudnak windowSize={windowSize} />
    </Container>
    <Container maxW={{base: "container.sm", md: "container.lg"}} id="about">
      <AboutUs />
    </Container>
    <Container maxW={{base: "container.sm", md: "container.lg"}} id="contact">
      <Contact />
      <Text textAlign="center" fontSize="sm">© Umbra Interactive, LLC</Text>
      <Box height="50vh"/>
    </Container>
  </> 
);}

export default Index;
