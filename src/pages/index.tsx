import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";
import Image from "next/image";
import UmbraLogo from '../assets/Umbra_Logo_Circle.png'
import GudnakLogo from '../assets/gudnak-logo.png'
import GudnakPlay from '../assets/gudnak-play.jpg'
import Gameplay_1 from '../assets/video1.gif'
import Gameplay_2 from '../assets/video2.gif'
import { useEffect } from "react";

const Index = () => {
  // hack to get the color mode to work in the first render
  useEffect(() => {
    if (!localStorage.getItem("chakra-ui-color-mode-default")) {
      localStorage.setItem("chakra-ui-color-mode", "dark")
      localStorage.setItem("chakra-ui-color-mode-default", "set")
    }
  }, []);

  return(
 <Container maxW="container.xl" py={10}>
   <Stack direction="column" alignItems="center">
    <Image src={UmbraLogo} alt="Umbra" height={300} />
      <Text fontSize="1xl" textAlign="center" mb={10}>
        An independent games studio based in Portland, Oregon.
      </Text>

    <Box bg="white" color="white" p={3} borderRadius="lg" minW="container.md">
          <Container 
            height="1000px" 
            p={5} 
            bgImage={`linear-gradient(to bottom,rgb(255, 255, 255),rgba(255, 255, 255) 10%, rgba(255, 255, 255, 0.5)), url(${GudnakPlay.src})`} 
            bgPosition="center" 
            bgRepeat="no-repeat"
            bgSize="cover"
            minW="container.md"
            >
            <Stack direction="column" alignItems="center">
            <Image src={GudnakLogo} alt="Gudnak" height={100} />
              <Text fontSize="2xl" textAlign="center" bg="blackAlpha.800" p={3} borderRadius="lg" width="fit-content">
                Gudnak Digital is an upcoming fully-featured mobile multiplayer adaptation of Gudnak by Chaotic Great Games.
            </Text>
            <Flex direction="row" justifyContent="center" gap={10} mt={10} width="100%">
              <Box borderRadius="lg" border="10px solid black" overflow="hidden" height="420px">
              <Image src={Gameplay_1} alt="Gudnak Digital Gameplay" height="420" />
              </Box>
              <Box borderRadius="lg" border="10px solid black" overflow="hidden" height="420px">
              <Image src={Gameplay_2} alt="Gudnak Digital Gameplay" height="420" />
              </Box>
            </Flex>
            </Stack>
          </Container>
        </Box>
        <Text mt={10}>© Umbra Interactive, LLC</Text>
    </Stack>
 </Container>
);}

export default Index;
