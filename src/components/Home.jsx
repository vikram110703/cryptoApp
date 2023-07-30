import { Box, Container, Image, Text } from '@chakra-ui/react';
import React from 'react';
import cryptoImage from '../assets/cyptoImage.jpg';
import { motion } from 'framer-motion';


const Home = () => {
  return (
    <Container maxW={"100vw"}
      bgColor={"blackAlpha.900"}
      h={["max(75vh,50rem)", "max(50vh,90rem)"]}

    >
      <Box bgColor={"blackAlpha.900"} w={"100%"} h={"fit-content"} >
        <motion.div
          style={{
            // maxH: "min(98%,fit-content)",
            maxH: "70%",
            width: "100%",
            // zIndex:"-1"
          }}
          animate={{
            translateY: "10px",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >

          <Image
            w={"100%"}
            maxHeight={"50%"}
            objectFit={"contain"}
            src={cryptoImage}
            filter={"grayscale(1)"}
          />;
         
        </motion.div>
        <div
            style={{
              display: "flex", alignItem: "center", justifyContent: "center"
            }}
          >
            <Text
              position={"absolute"}
              fontSize={["2rem", "3.7rem"]}
              textAlign={"center"}
              fontWeight={"bold"}
              fontFamily={"sans-serif"}
              color={"whiteAlpha.700"}
              zIndex={"10"}
              // left={["40vw", "42vw"]}

            // mt={["-20","0"]}
            >
              CryptoApp
            </Text>
          </div>


      </Box>
    </Container>
  );
};

export default Home;
