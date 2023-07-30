import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
const AvtarSrc="https://lh3.googleusercontent.com/ogw/AOLn63HlGduyhv3gvCN5EajNB80hGsfoyXNZYJZ7UOgkHw=s64-c-mo";



const Footer = () => {
    return (
        <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"}
            minH={"48"} px={"16"}
            py={["16", "8"]}
            style={{position:"sticky" ,zIndex:"5"}}
        >
            <Stack direction={["coloumn", "row"]} h={"full"} alignItems={"center"} >
                <VStack w="full" alignItems={["center","flex-start"]} >
                <Text fontSize={["2rem","3rem"]} fontWeight={"bold"} >
                    About Us
                </Text>
                <Text fontSize={["1.5rem","1rem"]} letterSpacing={"widest"}
                 textAlign={["center","left"]} >
                    We are the best crypto trading app in India, We provide our 
                    guidance at very cheap price 
                </Text>

                </VStack>

                <VStack>
                    <Avatar src={AvtarSrc} boxSize={"28"} mt={["4", "0"]} />
                    <Text fontFamily={"sans-serif"} fontSize={"1.2rem"} >Our Founder</Text>
                </VStack>

            </Stack>

        </Box>
    )
}

export default Footer