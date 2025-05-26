import { Flex, Text } from "@chakra-ui/react"

export const IconText = ({icon, text}: {icon: React.ReactNode, text: string}) => {
    return (
        <Flex direction="row" alignItems="center" gap={3}>{icon} <Text fontSize="2xl">{text}</Text></Flex>
    )
}