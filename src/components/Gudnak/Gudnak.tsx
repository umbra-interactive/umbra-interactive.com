import { Container, Flex, Stack, Grid, Text } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { StickySectionHeader, SectionTopText, SectionHeader } from "../Section"
import { IconText } from "./IconText"
import { GridLink } from "./GridLink"
import { Screenshot } from "./Screenshot"
import Image from "next/image"
import GudnakLogo from "../../assets/gudnak-logo.png"
import PaxEast from "../../assets/pax-east.png"
import GoblinExplode from "../../assets/video1.gif"
import CravenPrinceInspect from "../../assets/video2.gif"
import UltimateSacrifice from "../../assets/video6.gif"
import DelguonVictory from "../../assets/video4.gif"
import DragonVictory from "../../assets/video3.gif"
import ShardswornVictory from "../../assets/video5.gif"
import GudnakCard from "../../assets/gudnak-card.png"
import Chaotic from "../../assets/chaotic-great.png"
import Discord from "../../assets/discord.png"
import Kickstarter from "../../assets/ks.svg"

export const Gudnak = ({windowSize}: {windowSize: {width: number, height: number}}) => {
    const isMobile = windowSize.width < 768;
    return (
        <Container 
            height="fit-content" 
            pt={10} 
            maxW={{base: "container.sm", md: "container.lg"}}
            >
            <Stack direction="column" alignItems="center">

            {/* Gudnak */}
            <StickySectionHeader top={isMobile ? "85px" : "75px"}>
                <Image style={{margin: "auto"}} src={GudnakLogo} alt="Gudnak" height={isMobile ? 75 : 100} />
            </StickySectionHeader>
            <SectionTopText>
                Gudnak Digital is an upcoming fully-featured adaptation of Gudnak by Chaotic Great Games.
            </SectionTopText>
                <br />
                <br />
            <Image style={{borderRadius: "10px", border: "3px solid #f2f2f4"}} src={PaxEast} alt="Gudnak Digital at Pax East 2025" height={600}/>
            <Text mb={10} fontSize="md" textAlign="center" fontStyle="italic">Gudnak Digital Playtest Demo at Pax East 2025</Text>
            
            {/* The Plan */}
            <SectionHeader>The Plan</SectionHeader>
            <Grid gridTemplateColumns={{base: "1fr", md: "1fr 1fr"}} mb={10} border="1px solid #f2f2f4" p={5} borderRadius="lg">
                <IconText icon={<CheckCircleIcon color="#6e8247" fontSize={{base: 16, md: 24}}/>} text="Mobile Multiplayer " />
                <IconText icon={<CheckCircleIcon color="#6e8247" fontSize={{base: 16, md: 24}}/>} text="Online Matchmaking and Leaderboards" />
                <IconText icon={<CheckCircleIcon color="#6e8247" fontSize={{base: 16, md: 24}}/>} text="Offline Single Player Modes" />
                <IconText icon={<CheckCircleIcon color="#6e8247" fontSize={{base: 16, md: 24}}/>} text="Exclusive Digital Content" />
                <IconText icon={<CheckCircleIcon color="#6e8247" fontSize={{base: 16, md: 24}}/>} text="Original Soundtrack and Voiceovers" />
                <IconText icon={<CheckCircleIcon color="#6e8247" fontSize={{base: 16, md: 24}}/>} text="Lots more to come!" />
            </Grid>

            {/* Sneak Peeks */}
            <SectionHeader>Sneak Peeks</SectionHeader>
            <Flex direction={{base: "column", md: "row"}} justifyContent="center" gap={10} mb={10} width="100%">
                <Screenshot image={GoblinExplode} text="Demolition 'Experts'" />
                <Screenshot image={CravenPrinceInspect} text="Craven Prince" />
                <Screenshot image={UltimateSacrifice} text="Ultimate Sacrifice" />
            </Flex>
            <Flex direction={{base: "column", md: "row"}} justifyContent="center" gap={10} mb={10} width="100%">
                <Screenshot image={DelguonVictory} text="Victory Screen (Deeprock Delver)" />
                <Screenshot image={DragonVictory} text="Victory Screen (The Shard Dragon)" />
                <Screenshot image={ShardswornVictory} text="Victory Screen (Elven Valkyrie)" />
            </Flex>

            {/* Links */}
            <SectionHeader>Click These Links!</SectionHeader>
            <Grid gridTemplateColumns={{base: "1fr", md: "1fr 1fr 1fr"}} width="100%" gap={2}>
                <GridLink isMobile={isMobile} link="https://gudnak.com/" image={GudnakCard} text="Gudnak" />
                <GridLink isMobile={isMobile} link="https://chaoticgreat.games" image={Chaotic} text="Chaotic Great Games" />
                <GridLink isMobile={isMobile} link="https://discord.com/invite/3XUehd5UkY" image={Discord} text="Gudnak Discord" />
            </Grid>
            <Grid gridTemplateColumns={{base: "1fr", md: "1fr 1fr"}} width="100%" gap={2}>
                <GridLink isMobile={isMobile} link="https://www.kickstarter.com/projects/chaoticgreat/gudnak" image={Kickstarter} text="Gudnak Kickstarter" subtext="881% Funded!" />
                <GridLink isMobile={isMobile} link="https://www.kickstarter.com/projects/chaoticgreat/gudnak-second-printing-and-expansions" image={Kickstarter} text="Gudnak Expansion Kickstarter" subtext="1015% Funded!" />
            </Grid>
            </Stack>
        </Container>
    )
}

//  <Text fontSize="md" textAlign="center" mt={-2} whiteSpace="normal" wordBreak="break-word">881% Funded!</Text>
