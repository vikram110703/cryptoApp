import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader'
import Error_show from './Error_show';
import { Link } from 'react-router-dom';



const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  // const [currencySymbol,setCurrencySymbol]=useState("₹");

  const currencySymbol = currency === 'inr' ? "₹" : currency === 'eur' ? "€" : "$";
  const btns = new Array(132).fill(1)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();

  }, [ currency,page]);

  if (error) return <Error_show message={"Error while fetching Coins data "} />;

  return <Container maxW={"container.lg"} >

    {loading ? <Loader /> :
      <>
       <RadioGroup p={'4'} value={currency} onChange={setCurrency} >
        <HStack spacing={"2"} >
        <Radio value='inr' >INR</Radio>
        <Radio value='eur' >EUR</Radio>
        <Radio value='usd' >USD</Radio>
        </HStack>
       </RadioGroup>

        <HStack dir='row' wrap={"wrap"} >
          {
            coins.map((i) => (
              <CoinsCard
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                id={i.id}
                currencySymbol={currencySymbol}

              />
            ))
          }
        </HStack>
        <HStack overflowX={'scroll'} w={"full"} p={'8'}>
          {
            btns.map((item, index) => (

              <Button bgColor={'blackAlpha.800'} color='white'
                onClick={() => { setPage(index + 1); setLoading(true) }}  >

                {index + 1}

              </Button>
            ))
          }
        </HStack>

      </>
    }

  </Container>
}

export default Coins;

const CoinsCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => {
  return (
    <Link to={`/coin/${id}`} >
      <VStack w={"52"} p={"7"}  shadow={"lg"} borderRadius={"lg"} 
      transition={"all 0.3s"} m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)"
          },
        }
        }

      >
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"} />
        <Heading size={"md"} noOfLines={1} >
          {symbol}
        </Heading>
        <Text noOfLines={1} >{name}</Text>
        <Text fontSize={"md"} > {price ? `${currencySymbol}${price}` : "NA"}</Text>

      </VStack>
    </Link>

  )
};