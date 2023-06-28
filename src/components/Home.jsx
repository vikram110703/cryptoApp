import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import cryptoImage from '../assets/cyptoImage.jpg';
import { motion } from 'framer-motion';


const Home = () => {
  return (
    <Box bgColor="blackAlpha.900" w="full" h="full">

{/* for animatin we use framer-motion */}
      <motion.div
      // style={{
      //   height:"98vh",
      // }}
      animate={{
        translateY:"18px",
      }}
      transition={{
        duration:2,//2s 
        repeat:Infinity,
        repeatType:"reverse"
      }}
      
      >
        <Image
          w="full"
          objectFit="contain"
          filter="grayscale(1)"
          src={cryptoImage}
        />
      </motion.div>

      <Text
        fontSize={["xl", "6xl"]}
        textAlign="center"
        fontWeight="bold"
        color="whiteAlpha.600"
        position={"absolute"}
        top={["37%", "74%"]}
        left={["37%", "39%"]}
        fontFamily={"sans-sarif"}
      >
        Crypto App
      </Text>
    </Box>
  );
};

export default Home;
