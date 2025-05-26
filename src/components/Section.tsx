import { Heading, Text } from "@chakra-ui/react"

export const StickySectionHeader = ({children, top="75px"}: {children: React.ReactNode, top?: string}) => {
    return (
        <div className="sticky" style={{ marginBottom: "10px", borderBottom: "2px solid #f2f2f4", padding:"6px", top: top, zIndex: 300, width: "100%", backgroundColor: "#1a1a1a"}}>
            {children}
        </div>
    )
}

export const SectionTopText = ({children}: {children: React.ReactNode}) => {
    return (
        <Text fontSize={{base: "2xl", md: "3xl"}} textAlign="center" p={3} borderRadius="lg" width="fit-content" color="white">
            {children}
        </Text>
    )
}

export const SectionHeader = ({children}: {children: React.ReactNode}) => {
    return (
        <Heading my={5} textDecoration="underline" size={{base: "md", md: "xl"}}>
        {children}
        </Heading>
    )
}