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
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import UmbraLogo from '../assets/UmbraButton_14x.png'
import Discord from '../assets/discord.png'
import GudnakLogo from '../assets/gudnak-logo.png'
import Kickstarter from '../assets/ks.svg'
import Chaotic from '../assets/chaotic-great.png'
import GudnakCard from '../assets/gudnak-card.png'
import GoblinExplode from '../assets/video1.gif'
import CravenPrinceInspect from '../assets/video2.gif'
import DragonVictory from '../assets/video3.gif'
import DelguonVictory from '../assets/video4.gif'
import ShardswornVictory from '../assets/video5.gif'
import UltimateSacrifice from '../assets/video6.gif'
import PaxEast from '../assets/pax-east.png'
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Confetti from 'react-confetti';
import { motion } from "framer-motion";

import { useRef } from 'react'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'

const COUNTER_NUMBER = 10;
const CONFETTI_NUMBER = 25;
const FIREWORKS_NUMBER = 50;

const MotionModalContent = motion(ModalContent);

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isHighScoreOpen, onOpen: onHighScoreOpen, onClose: onHighScoreClose } = useDisclosure();
  const ref = useRef<FireworksHandlers>(null)
  const [previousHighScore, setPreviousHighScore] = useState(0);
  const [achievedNewHighScore, setAchievedNewHighScore] = useState(false);

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
  const [highScore, setHighScore] = useState(0);

  const resetHighScore = () => {
    setHighScore(0);
    localStorage.removeItem('moveCountHighScore');
  }

  useEffect(() => {
    // Load high score from localStorage on component mount
    const savedHighScore = localStorage.getItem('moveCountHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (moveCount > highScore) {
      setPreviousHighScore(highScore);
      setHighScore(moveCount);
      localStorage.setItem('moveCountHighScore', moveCount.toString());
      if (moveCount > 10) {
        setAchievedNewHighScore(true);
      }
    }
  }, [moveCount, highScore]);

  useEffect(() => {
    if (moveCount === 0 && highScore > 10 && achievedNewHighScore) {
      onHighScoreOpen();
      setAchievedNewHighScore(false);
    }
  }, [moveCount, highScore, achievedNewHighScore, onHighScoreOpen]);

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

    if(moveCount >= FIREWORKS_NUMBER && !ref.current.isRunning) {
      ref.current.start();
    }

  }, [isMoved, moveCount]);
  

  const handleLogoHover = () => {
    setIsMoved(!isMoved);
    setMoveCount(moveCount + 1);
    if(isHighScoreOpen && moveCount > 2) onHighScoreClose();
  };

  useEffect(() => {
    if (moveCount === COUNTER_NUMBER) {
      onOpen();
    } else if (moveCount === 0) {
      onClose();
    }
  }, [moveCount, onOpen, onClose]);

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
        {/* Score Counter */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <MotionModalContent 
          width="fit-content" 
          bg="rgba(255, 255, 255)" 
          borderRadius="lg" 
          border="10px solid #f2f2f4"
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <ModalBody width="fit-content">
            <Text fontSize="4xl" textAlign="center" color="black">
              {moveCount}
            </Text>
          </ModalBody>
        </MotionModalContent>
      </Modal>

      {/* High Score Modal */}
      <Modal size="2xl" isOpen={isHighScoreOpen} onClose={onHighScoreClose}>
        <MotionModalContent
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          bg="rgba(0,0,0, 0.8)"
          boxShadow="none"
          outline="none"
          borderRadius="50"
        >
          <ModalBody onClick={onHighScoreClose} cursor="pointer" justifyContent="center" display="flex" flexDirection="column" height="100vh">
            <Stack align="center">
              <Text pointerEvents="none" userSelect="none" fontFamily="monospace" width="fit-content" fontSize="9xl" textAlign="center" bgGradient="linear(to-r, rgb(0, 229, 255), rgb(204, 0, 226))" bgClip="text" fontWeight="bold">
                {highScore}
              </Text>
              <Text mt={-50} pointerEvents="none" userSelect="none" fontFamily="monospace" width="fit-content" fontSize="6xl" textAlign="center" bgGradient="linear(to-r, rgb(0, 229, 255), rgb(204, 0, 226))" bgClip="text" fontWeight="bold">
                NEW HIGH SCORE! 
              </Text>
            </Stack>
          </ModalBody>
        </MotionModalContent>
      </Modal>

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
          zIndex: 5000,
        }}
        recycle={true}
        numberOfPieces={moveCount >= CONFETTI_NUMBER ? moveCount * 100 : 0}
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
            <div className="sticky" style={{ marginBottom: "10px", borderBottom: "2px solid #f2f2f4", padding:"6px", top: "75px", zIndex: 300, width: "100%", backgroundColor: "#1a1a1a"}}>
              <Image style={{margin: "auto"}} src={GudnakLogo} alt="Gudnak" height={100} />
            </div>
            <Text fontSize="3xl" textAlign="center" p={3} borderRadius="lg" width="fit-content">
              Gudnak Digital is an upcoming fully-featured adaptation of Gudnak by Chaotic Great Games.
            </Text>
              <br />
              <br />
            <Image style={{borderRadius: "10px", border: "3px solid #f2f2f4"}} src={PaxEast} alt="Gudnak Digital at Pax East 2025" height={600}/>
            <Text mb={10} fontSize="md" textAlign="center" fontStyle="italic">Gudnak Digital Playtest Demo at Pax East 2025</Text>
            <Heading my={5} textDecoration="underline" size={"xl"}>The Plan</Heading>
            <Grid gridTemplateColumns="1fr 1fr" mb={10} border="1px solid #f2f2f4" p={5} borderRadius="lg">
              <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon color="#6e8247" fontSize={24}/> <Text fontSize="2xl">Mobile Multiplayer </Text></Flex>
              <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon color="#6e8247" fontSize={24}/> <Text fontSize="2xl">Online Matchmaking and Leaderboards</Text></Flex>
              <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon color="#6e8247" fontSize={24}/> <Text fontSize="2xl">Offline Single Player Modes</Text></Flex>
              <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon color="#6e8247" fontSize={24}/> <Text fontSize="2xl">Exclusive Digital Content</Text></Flex>
              <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon color="#6e8247" fontSize={24}/> <Text fontSize="2xl">Original Soundtrack and Voiceovers</Text></Flex>
              <Flex direction="row" alignItems="center" gap={3}><CheckCircleIcon color="#6e8247" fontSize={24}/> <Text fontSize="2xl">Lots more to come!</Text></Flex>
            </Grid>
              
            <Heading my={5} textDecoration="underline" size={"xl"}>Sneak Peeks</Heading>
            <Flex direction="row" justifyContent="center" gap={10} mb={10} width="100%">
              <Flex direction="column" alignItems="center">
                <Box borderRadius="lg" border="10px solid" overflow="hidden">
                  <Image src={GoblinExplode} alt="Goblin Demolitionists" height="500" />
                </Box>
                <Text fontStyle="italic" fontSize="md" textAlign="center">Demolition "Experts"</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Box borderRadius="lg" border="10px solid" overflow="hidden">
                  <Image src={CravenPrinceInspect} alt="Gudnak Digital Gameplay" height="500" />
                </Box>
                <Text fontStyle="italic" fontSize="md" textAlign="center">Craven Prince</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Box borderRadius="lg" border="10px solid" overflow="hidden">
                  <Image src={UltimateSacrifice} alt="Gudnak Digital Gameplay" height="500" />
                </Box>
                <Text fontStyle="italic" fontSize="md" textAlign="center">Ultimate Sacrifice</Text>
              </Flex>
            </Flex>
            <Flex direction="row" justifyContent="center" gap={10} mb={10} width="100%">
              <Flex direction="column" alignItems="center">

              <Box borderRadius="lg" border="10px solid" overflow="hidden">
                <Image src={DelguonVictory} alt="Gudnak Digital Gameplay" height="500" />
                </Box>
                <Text fontStyle="italic" fontSize="md" textAlign="center">Victory Screen (Deeprock Delver)</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Box borderRadius="lg" border="10px solid" overflow="hidden">
                  <Image src={DragonVictory} alt="Gudnak Digital Gameplay" height="500" />
                </Box>
                <Text fontStyle="italic" fontSize="md" textAlign="center">Victory Screen (The Shard Dragon)</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Box borderRadius="lg" border="10px solid" overflow="hidden">
                  <Image src={ShardswornVictory} alt="Gudnak Digital Gameplay" height="500" />
                </Box>
                <Text fontStyle="italic" fontSize="md" textAlign="center">Victory Screen (Elven 
                  Valkyrie)
                </Text>
              </Flex>
            </Flex>
            <Heading my={5} textDecoration="underline" size={"xl"}>Click These Links!</Heading>

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
        <Flex maxW="container.md" my={100} direction="column" id="about" py={20} gap={6}>
          <div className="sticky" style={{marginBottom: "30px", borderBottom: "2px solid #f2f2f4", padding:"6px", top: "75px", zIndex: 300, width: "100%", backgroundColor: "#1a1a1a"}}>
            <Heading p={3} size="3xl" textAlign="center" mb={3}>
              About Us
            </Heading>
          </div>
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={10}>
                <Stack width="fit-content" direction="column" alignItems="center">
                  <Image src={GudnakCard} alt="Luke" height={100} />
                  <Text fontSize="2xl" width="fit-content">Luke</Text>
                </Stack>
                <Text width="75%">
                  Luke is a software engineer and game developer with a passion for creating unique and engaging experiences.
                </Text>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={10}>
                <Stack width="fit-content" direction="column" alignItems="center">
                  <Image src={GudnakCard} alt="Sam" height={100} />
                  <Text fontSize="2xl" width="fit-content">Sam</Text>
                </Stack>
                <Text width="75%">
                  Sam is a software engineer and game developer with a passion for creating unique and engaging experiences.
                </Text>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={10}>
                <Stack width="fit-content" direction="column" alignItems="center">
                  <Image src={GudnakCard} alt="Pete" height={100} />
                  <Text fontSize="2xl" width="fit-content">Pete</Text>
                </Stack>
                <Text width="75%">
                  Pete is a software engineer and game developer with a passion for creating unique and engaging experiences.
                </Text>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={10}>
                <Stack width="fit-content" direction="column" alignItems="center">
                  <Image src={GudnakCard} alt="Michael" height={100} />
                  <Text fontSize="2xl" width="fit-content">Michael</Text>
                </Stack>
                <Text width="75%">
                  Michael is a software engineer and game developer with a passion for creating unique and engaging experiences.
                </Text>
              </Box>
        </Flex>
        {/* Contact */}
        <Flex maxW="container.md" gap={10} height="100vh" direction="column" id="contact">
          <div className="sticky" style={{ borderBottom: "2px solid #f2f2f4", padding:"6px", top: "75px", zIndex: 300, width: "100%", backgroundColor: "#1a1a1a"}}>
            <Heading p={3} size="3xl" textAlign="center" mb={3}>
              Contact
            </Heading>
          </div>
          <Text marginX="auto" fontSize="3xl">
          If you are a talented 2D / 3D artist, musician, or voice actor, and are interested in contributing to our projects, please contact Luke at the email below. We look forward to hearing from you!
            <br />
            <br />
          </Text>
          <Button p={8} fontSize="3xl" marginX="auto">
            <Link textDecoration="underline" href="mailto:luke@umbra-interactive.com">luke@umbra-interactive.com</Link>
          </Button>
        </Flex>
        <Text>© Umbra Interactive, LLC</Text>
        <Box cursor="pointer" userSelect="none" onClick={resetHighScore}>

        <Text size="xs">{highScore ? highScore : ""}</Text>
        </Box>
        </Stack>
    </Container>
  </>
);}

export default Index;
