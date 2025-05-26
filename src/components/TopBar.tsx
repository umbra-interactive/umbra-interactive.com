import { Button, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"

export const TopBar = () => {
    return (
        <Flex zIndex={500} position="sticky" top="0" bg="#33323c" gap={10} direction="row" width="100%" height="75px" justifyContent="center" alignItems="center">
        <Button bg="#656479"><Link href="#projects"><Text fontSize="2xl">Projects</Text></Link></Button>
        <Button bg="#656479"><Link href="#about"><Text fontSize="2xl">About</Text></Link></Button>
        <Button bg="#656479"><Link href="#contact"><Text fontSize="2xl">Contact</Text></Link></Button>
    </Flex>
    )
}