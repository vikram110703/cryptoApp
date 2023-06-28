import { Box, Spinner, VStack } from '@chakra-ui/react';
import React from 'react'

const Loader = () => {
  return (
    <VStack  h='80vh' alignItems={"center"} justifyContent={"center"}>
      <Box transform={'scale(3)'}>
      <Spinner
        thickness='1px'
        speed='0.5s'
        emptyColor='gray.200'
        color='blue.700'
        size='xl'
      />
      </Box>
    </VStack>
  )
}

export default Loader;