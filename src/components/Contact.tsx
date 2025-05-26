import { Button, Flex, Heading, Text, Link, Container } from "@chakra-ui/react"
import { StickySectionHeader } from "./Section"

export const Contact = () => {
    return (
        <Container minW="container.md" py={10} mb={10}>
            <Flex maxW="container.md" gap={10} direction="column">
            <StickySectionHeader>
                <Heading p={3} size="3xl" textAlign="center" mb={3}>
                Contact
                </Heading>  
            </StickySectionHeader>
            <Text marginX="auto" fontSize="3xl">
            If you are a talented 2D / 3D artist, musician, or voice actor, and are interested in contributing to our projects, please contact Luke at the email below. We look forward to hearing from you!
                <br />
                <br />
            </Text>
            <Button p={8} fontSize="3xl" marginX="auto">
                <Link textDecoration="underline" href="mailto:luke@umbra-interactive.com">luke@umbra-interactive.com</Link>
            </Button>
            </Flex>
        </Container>
    )
}