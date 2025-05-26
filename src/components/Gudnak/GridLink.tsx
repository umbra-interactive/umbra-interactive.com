import { Link, Button, Text } from "@chakra-ui/react"
import Image from "next/image"
import { StaticImageData } from "next/image"

export const GridLink = ({link, image, text}: {link: string, image: StaticImageData, text: string}) => {
 return (
     <Link href={link} _hover={{textDecoration: "none"}} target="_blank">
        <Button width="100%" height="100%" p={5} display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>  
            <Image src={image} alt={text} height={75} />
            <Text fontSize="2xl" textAlign="center" p={3} whiteSpace="normal" wordBreak="break-word">{text}</Text>
        </Button>
    </Link>
    )   
}