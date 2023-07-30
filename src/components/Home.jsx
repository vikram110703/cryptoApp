import { Box, Container, Image, Text, Center } from '@chakra-ui/react';
import React from 'react';
import cryptoImage from '../assets/cyptoImage.jpg';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Box bgColor="blackAlpha.900" css={{backgroundColor:"black"}} >
      <Container maxW="container.xl" px={4} py={8}>
        <Center h={{ base: '70vh', md: '90vh' }}>
          <motion.div
            style={{
              width: '100%',
              height: '90%',
            }}
            animate={{
              translateY: '10px',
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <Image
              w="100%"
              h="100%"
              objectFit="contain"
              src={cryptoImage}
              filter="grayscale(1)"
            />
          </motion.div>
        </Center>
        <Center h={{ base: '10vh', md: '20vh' }}>
          <Text
            fontSize={{ base: '2rem', md: '3.7rem' }}
            textAlign="center"
            fontWeight="bold"
            fontFamily="sans-serif"
            color="whiteAlpha.700"
          >
            CryptoApp
          </Text>
        </Center>
      </Container>
    </Box>
  );
};

export default Home;
