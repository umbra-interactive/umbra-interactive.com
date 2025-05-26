import { Modal, ModalContent, ModalBody, Stack, Text } from "@chakra-ui/react"
import { motion } from "framer-motion";

const MotionModalContent = motion(ModalContent);

export const UScore = ({isScoreOpen, onScoreClose, score}: {isScoreOpen: boolean, onScoreClose: () => void, score: number}) => {
    return (
    <Modal isOpen={isScoreOpen} onClose={onScoreClose} isCentered>
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
              {score}
            </Text>
          </ModalBody>
        </MotionModalContent>
      </Modal>
    )
}

export const UHighScore = ({isHighScoreOpen, onHighScoreClose, highScore}: {isHighScoreOpen: boolean, onHighScoreClose: () => void, highScore: number}) => {
    return (
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
    )
}