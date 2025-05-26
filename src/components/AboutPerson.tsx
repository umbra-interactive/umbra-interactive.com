import { Box, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { StaticImageData } from "next/image"

export const AboutPerson = ({image, name, text}: {image: StaticImageData, name: string, text: string}) => {
    return (
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={10}>
        <Stack width="fit-content" direction="column" alignItems="center">
          <Image src={image} alt={name} height={100} />
          <Text fontSize="2xl" width="fit-content">{name}</Text>
        </Stack>
        <Text width="75%">
          {text}
        </Text>
      </Box>
    )
}