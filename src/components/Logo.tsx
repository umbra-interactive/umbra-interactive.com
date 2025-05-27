import Image from "next/image";
import UmbraLogo from '../assets/UmbraButton_14x.png'
import { useEffect, useState } from "react";
import { UHighScore, UScore } from "../effects/Score";
import { UFireworks } from "../effects/Fireworks";
import { UConfetti } from "../effects/Confetti";
import { useDisclosure, Box, Text } from "@chakra-ui/react";
import { useSwipeable } from 'react-swipeable';

const COUNTER_NUMBER = 10;
const CONFETTI_NUMBER = 25;
const FIREWORKS_NUMBER = 50;

export const ULogo = ({windowSize}: {windowSize: {width: number, height: number}}) => {
    const { isOpen: isScoreOpen, onOpen: onScoreOpen, onClose: onScoreClose } = useDisclosure();
    const { isOpen: isHighScoreOpen, onOpen: onHighScoreOpen, onClose: onHighScoreClose } = useDisclosure();
    const [highScore, setHighScore] = useState(0);
    const [fireworks, setFireworks] = useState(false);
    const [isMoved, setIsMoved] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const [achievedNewHighScore, setAchievedNewHighScore] = useState(false);

    const isMobile = windowSize.width < 768;

    const resetHighScore = () => {
      setHighScore(0);
      localStorage.removeItem('hs');
    }
    
    useEffect(() => {
        // Load high score from localStorage on component mount
        const savedHighScore = localStorage.getItem('hs');
        if (savedHighScore) {
          setHighScore(parseInt(savedHighScore));
        }
      }, []);
    
      useEffect(() => {
        if (moveCount > highScore) {
          setHighScore(moveCount);
          localStorage.setItem('hs', moveCount.toString());
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
    
    
    const handleLogoHover = () => {
        setIsMoved(!isMoved);
        setMoveCount(moveCount + 1);
        if(isHighScoreOpen && moveCount > 2) onHighScoreClose();
      };

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
              if(fireworks) {
                setFireworks(false);
              }
            }
          });
        });
    
        if(moveCount >= FIREWORKS_NUMBER && !fireworks) {
          setFireworks(true);
        }
    
      }, [isMoved, moveCount]);

      useEffect(() => {
        if (moveCount === COUNTER_NUMBER) {
          onScoreOpen();
        } else if (moveCount === 0) {
          onScoreClose();
        }
      }, [moveCount, onScoreOpen, onScoreClose]);
    
      // handle swipe events
      const handleSwipe = (eventData: any) => {
        if(eventData.dir === "Left") {
          if(isMoved) {
            handleLogoHover();
          }
        } else if(eventData.dir === "Right") {
          if(!isMoved) {
            handleLogoHover();
          }
        }
      }
  
      const swipeHandlers = useSwipeable({
        onSwiped: (eventData) => handleSwipe(eventData),
        preventScrollOnSwipe: true
      });

    return (
    <>
        <div style={{zIndex: 100000, position:"sticky", top:"0", left:"0"}}>
            <div style={{zIndex: 10000, position: "absolute", left: "10px", top: "10px"}}>
                <Image 
                    {...(isMobile ? swipeHandlers : {})} 
                    className="spin" 
                    src={UmbraLogo} 
                    alt="Umbra" 
                    height={isMobile ? 65 : 150} 
                    onMouseEnter={() => !isMobile && handleLogoHover()}
                    style={{
                        transform: isMoved 
                        ? 'translateX(calc(100vw - (100% + 20px))) rotate(1080deg)' 
                        : 'translateX(0) rotate(0deg)',
                        transition: `transform ${isMobile ? 1 : 1.5}s cubic-bezier(0.1, 0.1, 0.8, 1), translateX ${isMobile ? 1 : 1.5}s cubic-bezier(0.36, 0, 0.66, 2)`,
                        transformOrigin: 'center'
                    }}
                    />
            </div>
        </div>
        <Box onClick={() => resetHighScore()} cursor="pointer" userSelect="none" position="absolute" right="0" zIndex={10000} color="white">
            <Text fontSize="xx-small">{highScore > 10 ? highScore : ""}</Text>
        </Box>
        <UFireworks playing={fireworks} />
        <UConfetti windowSize={windowSize} numberOfPieces={moveCount >= CONFETTI_NUMBER ? moveCount * 100 : 0}/>
        <UScore isScoreOpen={isScoreOpen} onScoreClose={onScoreClose} score={moveCount}/>
        <UHighScore isHighScoreOpen={isHighScoreOpen} onHighScoreClose={onHighScoreClose} highScore={highScore}/>
    </>
    )
}