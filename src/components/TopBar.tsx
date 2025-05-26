import { Box, Button, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"

export const TopBar = ({windowSize}: {windowSize: {width: number, height: number}}) => {
    const isMobile = windowSize.width < 768;
    return (
            <Flex zIndex={500} top="0" position="sticky" bg="#33323c" gap={{ base: 2, md: 10 }} direction="row" width="100%" height={{ base: "85px", md: "75px" }} justifyContent="center" alignItems="center">
                {isMobile && <Box width="10%" />}
                <Button height={{ base: "30px", md: "40px" }} bg="#656479"><Link href="#projects"><Text fontSize={{ base: "sm", md: "2xl" }}>Projects</Text></Link></Button>
                <Button height={{ base: "30px", md: "40px" }} bg="#656479"><Link href="#about"><Text fontSize={{ base: "sm", md: "2xl" }}>About</Text></Link></Button>
                <Button height={{ base: "30px", md: "40px" }} bg="#656479"><Link href="#contact"><Text fontSize={{ base: "sm", md: "2xl" }}>Contact</Text></Link></Button>
            </Flex>
    )
}