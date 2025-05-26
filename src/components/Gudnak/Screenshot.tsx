import { Box, Flex, Text } from "@chakra-ui/react"
import { StaticImageData } from "next/image"
import Image from "next/image"

export const Screenshot = ({image, text}: {image: StaticImageData, text: string}) => {
return (
    <Flex direction="column" alignItems="center">
        <Box borderRadius="lg" border="10px solid" overflow="hidden">
            <Image src={image} alt={text} height="500" />
        </Box>
        <Text fontStyle="italic" fontSize="md" textAlign="center">{text}</Text>
    </Flex>
    )
}