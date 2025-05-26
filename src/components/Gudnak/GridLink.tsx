import { Link, Button, Text, Flex } from "@chakra-ui/react"
import Image from "next/image"
import { StaticImageData } from "next/image"

export const GridLink = ({link, image, text, subtext, isMobile}: {link: string, image: StaticImageData, text: string, subtext?: string, isMobile: boolean}) => {
 return (
     <Link width="100%" href={link} _hover={{textDecoration: "none"}} target="_blank">
        <Button width="100%" height="100%" p={5} display="flex" flexDirection="row" alignItems="center" justifyContent={{base: "center", md: "center"}} gap={1}>  
            <Image src={image} alt={text} height={isMobile ? 50 : 75} />
            <Flex direction="column" alignItems="center" justifyContent="center" width="100%">
                <Text width="100%" fontSize="2xl" textAlign="center" p={3} whiteSpace="normal" wordBreak="break-word">{text}</Text>
                {subtext && <Text width="100%" fontSize="md" textAlign="center" mt={-2} whiteSpace="normal" wordBreak="break-word">{subtext}</Text>}
            </Flex>
        </Button>
    </Link>
    )   
}