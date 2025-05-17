import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import UmbraLogo from '../assets/UmbraButton_14x.png'
import Discord from '../assets/discord.png'
import GudnakLogo from '../assets/gudnak-logo.png'
import Kickstarter from '../assets/ks.svg'
import Chaotic from '../assets/chaotic-great.png'
import GudnakCard from '../assets/gudnak-card.png'
import Gameplay_1 from '../assets/video1.gif'
import Gameplay_2 from '../assets/video2.gif'
import Gameplay_3 from '../assets/video3.gif'
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Confetti from 'react-confetti';


import { useRef } from 'react'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'

const Index = () => {

  const ref = useRef<FireworksHandlers>(null)

  const toggle = () => {
    if (!ref.current) return
    if (ref.current.isRunning) {
      ref.current.stop()
    } else {
      ref.current.start()
    }
  }

  useEffect(() => {
    if (ref.current && ref.current.isRunning) {
    toggle();
    }
  }, []);


  const [isMoved, setIsMoved] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  // Update window size on resize and initial load
  useEffect(() => {
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

  // hack to get the color mode to work in the first render
  useEffect(() => {
    if (!localStorage.getItem("chakra-ui-color-mode-default")) {
      localStorage.setItem("chakra-ui-color-mode", "dark")
      localStorage.setItem("chakra-ui-color-mode-default", "set")
    }

  },[]);

  useEffect(() => {
    // Add animation end listener for spin elements
    const spinElements = document.querySelectorAll('.spin');
    spinElements.forEach(element => {
      element.addEventListener('animationend', () => {
        element.classList.toggle('moved');
      });
    });

    // Add transition end listener for spin elements
    spinElements.forEach(element => {
      element.addEventListener('transitionend', () => {
        if (isMoved) {
          setMoveCount(0);
          if(ref.current.isRunning) {
            ref.current.waitStop();
          }
        }
      });
    });

    if(moveCount >= 20 && !ref.current.isRunning) {
      ref.current.start();
    }

  }, [isMoved, moveCount]);
  

  const handleLogoHover = () => {
    setIsMoved(!isMoved);
    setMoveCount(moveCount + 1);
  };

  return(
  <>
  {/* Stupid rolling logo */}
  <div style={{zIndex: 10000, position:"sticky", top:"0", left:"0"}}>
    <div style={{zIndex: 10000, position: "absolute", left: "10px", top: "10px"}}>
      <Image 
        className="spin" 
        src={UmbraLogo} 
        alt="Umbra" 
        height={150} 
        onMouseEnter={handleLogoHover}
        style={{
          transform: isMoved 
            ? 'translateX(calc(100vw - (100% + 20px))) rotate(1080deg)' 
            : 'translateX(0) rotate(0deg)',
            transition: 'transform 1.5s cubic-bezier(0.1, 0.1, 0.8, 1), translateX 1.5s cubic-bezier(0.36, 0, 0.66, 2)',
            transformOrigin: 'center'
        }}
      />
    </div>
  </div>

      <Fireworks
        ref={ref}
        options={{ opacity: 1,
          acceleration: 1.05,
          friction: 0.97,
          gravity: 1.5,
          particles: 500,
          traceLength: 3,
          traceSpeed: 10,
          explosion: 5,
          intensity: 30,
          flickering: 50,
          lineStyle: "square",
         }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 5000,
        }}
      />
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 5000,
        }}
        recycle={true}
        numberOfPieces={moveCount >= 10 ? moveCount * 100 : 0}
        gravity={1}
      />
  

  {/* Sticky Header */}
  <Flex zIndex={500} position="sticky" top="0" bg="#33323c" gap={10} direction="row" width="100%" height="75px" justifyContent="center" alignItems="center">
      <Button bg="#656479"><Link href="#projects"><Text fontSize="2xl">Projects</Text></Link></Button>
      <Button bg="#656479"><Link href="#about"><Text fontSize="2xl">About</Text></Link></Button>
      <Button bg="#656479"><Link href="#contact"><Text fontSize="2xl">Contact</Text></Link></Button>
  </Flex>

    <Container minW="container.xl" py={10} mb={10} id="projects">
      <Stack direction="column" alignItems="center">
        <Container 
          height="fit-content" 
          p={5} 
          bgPosition="center" 
          bgRepeat="no-repeat"
          bgSize="cover"
          minW="container.lg"
          >
          <Stack direction="column" alignItems="center">

            {/* Gudnak */}
            <div className="sticky" style={{ marginBottom: "30px", borderBottom: "2px solid #f2f2f4", padding:"6px", top: "75px", zIndex: 300, width: "100%", backgroundColor: "#1a1a1a"}}>
              <Image style={{margin: "auto"}} src={GudnakLogo} alt="Gudnak" height={100} />
            </div>
            <Text fontSize="3xl" textAlign="center" p={3} borderRadius="lg" width="fit-content">
              Gudnak Digital is an upcoming fully-featured adaptation of Gudnak by Chaotic Great Games.
            </Text>
              <br />
              <br />
              <Heading mb={5} textDecoration="underline" size={"lg"}>Features</Heading>
                <Grid gridTemplateColumns="1fr 1fr">
                  <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon /> <Text fontSize="2xl">Mobile Multiplayer </Text></Flex>
                  <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon /> <Text fontSize="2xl">Online Matchmaking and Leaderboards</Text></Flex>
                  <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon /> <Text fontSize="2xl">Offline Single Player Modes</Text></Flex>
                  <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon /> <Text fontSize="2xl">Exclusive Digital Content</Text></Flex>
                  <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon /> <Text fontSize="2xl">Original Soundtrack and Voiceovers</Text></Flex>
                  <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon /> <Text fontSize="2xl">Lots more to come!</Text></Flex>
               </Grid>
              
              <Heading my={10} textDecoration="underline" size={"lg"}>Screens</Heading>
            <Flex direction="row" justifyContent="center" gap={10} mb={10} width="100%">
              <Box borderRadius="lg" border="10px solid" overflow="hidden">
                <Image src={Gameplay_1} alt="Gudnak Digital Gameplay" height="500" />
              </Box>
              <Box borderRadius="lg" border="10px solid" overflow="hidden">
                <Image src={Gameplay_2} alt="Gudnak Digital Gameplay" height="500" />
              </Box>
              <Box borderRadius="lg" border="10px solid" overflow="hidden">
                <Image src={Gameplay_3} alt="Gudnak Digital Gameplay" height="500" />
              </Box>
            </Flex>
            <Heading my={10} textDecoration="underline" size={"lg"}>Links</Heading>

            <Grid gridTemplateColumns="1fr 1fr 1fr" gap={2}>
              <Link href="https://gudnak.com/" _hover={{textDecoration: "none"}} target="_blank">
                <Button width="100%" height="100%" p={5} display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>  
                  <Image src={GudnakCard} alt="Gudnak" height={75} />
                  <Text fontSize="2xl" textAlign="center" p={3} whiteSpace="normal" wordBreak="break-word">Gudnak</Text>
                </Button>
              </Link>
              <Link href="https://chaoticgreat.games" _hover={{textDecoration: "none"}} target="_blank">
                <Button width="100%" height="100%" p={5} display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>  
                  <Image src={Chaotic} alt="Chaotic Great Games" height={75} />
                  <Text fontSize="2xl" textAlign="center" p={3} whiteSpace="normal" wordBreak="break-word">Chaotic Great Games</Text>
                </Button>
              </Link>
              <Link href="https://discord.com/invite/3XUehd5UkY" _hover={{textDecoration: "none"}} target="_blank">
                <Button width="100%" height="100%" p={5} display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>  
                  <Image src={Discord} alt="Gudnak Discord" width={75} />
                  <Text fontSize="2xl" textAlign="center" p={3} whiteSpace="normal" wordBreak="break-word">Gudnak Discord</Text>
                </Button>
              </Link>
            </Grid>
            <Grid gridTemplateColumns="1fr 1fr" gap={2}>
              <Link href="https://www.kickstarter.com/projects/chaoticgreat/gudnak" _hover={{textDecoration: "none"}} target="_blank">
                <Button width="100%" height="100%" p={5} display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>  
                  <Image src={Kickstarter} alt="Gudnak Kickstarter 1" width={75} />
                  <Flex direction="column" alignItems="center" justifyContent="center">
                    <Text fontSize="2xl" textAlign="center" p={3} whiteSpace="normal" wordBreak="break-word">Gudnak Kickstarter</Text>
                    <Text fontSize="md" textAlign="center" mt={-2} whiteSpace="normal" wordBreak="break-word">881% Funded!</Text>
                  </Flex>                </Button>
              </Link>
              <Link href="https://www.kickstarter.com/projects/chaoticgreat/gudnak-second-printing-and-expansions" _hover={{textDecoration: "none"}} target="_blank">
                <Button width="100%" height="100%" p={5} display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>  
                  <Image src={Kickstarter} alt="Gudnak Kickstarter 2" width={75} />
                  <Flex direction="column" alignItems="center" justifyContent="center">
                    <Text fontSize="2xl" textAlign="center" p={3} whiteSpace="normal" wordBreak="break-word">Gudnak Expansion Kickstarter</Text>
                    <Text fontSize="md" textAlign="center" mt={-2} whiteSpace="normal" wordBreak="break-word">1015% Funded!</Text>
                  </Flex>
                </Button>
              </Link>
            </Grid>
          </Stack>
        </Container>

        {/* About */}
        <Flex maxW="container.md" my={10} direction="column" id="about" py={20}>
          <div className="sticky" style={{marginBottom: "30px", borderBottom: "2px solid #f2f2f4", padding:"6px", top: "75px", zIndex: 300, width: "100%", backgroundColor: "#1a1a1a"}}>
            <Heading p={3} size="3xl" textAlign="center" mb={3}>
              About
            </Heading>
          </div>
          <Text margin="auto" fontSize="3xl">
            We are an independent games development studio based in Portland, Oregon. 
            <br />
            Our team consists of Luke, Sam, Pete, and Michael.
            <br />
            <br />
          </Text>
        </Flex>

        {/* Contact */}
        <Flex maxW="container.md" my={10} direction="column" id="contact" py={20}>
          <div className="sticky" style={{marginBottom: "30px", borderBottom: "2px solid #f2f2f4", padding:"6px", top: "75px", zIndex: 300, width: "100%", backgroundColor: "#1a1a1a"}}>
            <Heading p={3} size="3xl" textAlign="center" mb={3}>
              Contact
            </Heading>
          </div>
          <Text margin="auto" fontSize="3xl">
          If you are a talented 2D / 3D artist, musician, or voice actor, and are interested in contributing to our projects, please contact Luke at the email below. We look forward to hearing from you!
            <br />
            <br />
          </Text>
          <Button p={8} fontSize="3xl" margin="auto">
            <Link textDecoration="underline" href="mailto:luke@umbra-interactive.com">luke@umbra-interactive.com</Link>
          </Button>
        </Flex>
        
        <Text mt={10}>© Umbra Interactive, LLC</Text>
        </Stack>
    </Container>
  </>
);}

export default Index;
