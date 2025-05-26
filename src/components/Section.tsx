import { Heading, Text } from "@chakra-ui/react"

export const StickySectionHeader = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="sticky" style={{ marginBottom: "10px", borderBottom: "2px solid #f2f2f4", padding:"6px", top: "75px", zIndex: 300, width: "100%", backgroundColor: "#1a1a1a"}}>
            {children}
        </div>
    )
}

export const SectionTopText = ({children}: {children: React.ReactNode}) => {
    return (
        <Text fontSize="3xl" textAlign="center" p={3} borderRadius="lg" width="fit-content" color="white">
            {children}
        </Text>
    )
}

export const SectionHeader = ({children}: {children: React.ReactNode}) => {
    return (
        <Heading my={5} textDecoration="underline" size={"xl"}>
        {children}
        </Heading>
    )
}