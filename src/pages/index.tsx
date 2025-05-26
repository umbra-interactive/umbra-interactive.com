import {
  Container,
  Box,
  Text
} from "@chakra-ui/react";
import { useEffect } from "react";
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


  return(
  <>
    <UmbraLogo />
    <TopBar />
    <Container minW="container.lg" pt={10} id="projects">
      <Gudnak />
    </Container>
    <Container minW="container.lg" id="about">
      <AboutUs />
    </Container>
    <Container minW="container.lg" id="contact">
      <Contact />
      <Text textAlign="center" fontSize="sm">© Umbra Interactive, LLC</Text>
      <Box height="50vh"/>
    </Container>
  </> 
);}

export default Index;
