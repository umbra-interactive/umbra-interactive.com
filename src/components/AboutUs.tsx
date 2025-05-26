import { Container, Flex, Heading } from "@chakra-ui/react"
import { AboutPerson } from "./AboutPerson"
import { StickySectionHeader } from "./Section"
import GudnakCard from "../assets/gudnak-card.png"

export const AboutUs = () => {
    return (
        <Container minW="container.md" py={10} mb={10}>
            <Flex maxW="container.md" pt={10} direction="column" gap={6}>
            <StickySectionHeader>
                <Heading p={3} size="3xl" textAlign="center" mb={3}>
                About Us
                </Heading>  
            </StickySectionHeader>
            <AboutPerson image={GudnakCard} name="Luke" text="Luke is a software engineer and game developer with a passion for creating unique and engaging experiences." />
            <AboutPerson image={GudnakCard} name="Sam" text="Sam is a software engineer and game developer with a passion for creating unique and engaging experiences." />
            <AboutPerson image={GudnakCard} name="Pete" text="Pete is a software engineer and game developer with a passion for creating unique and engaging experiences." />
            <AboutPerson image={GudnakCard} name="Michael" text="Michael is a software engineer and game developer with a passion for creating unique and engaging experiences." />
            </Flex>
        </Container>
    )
}