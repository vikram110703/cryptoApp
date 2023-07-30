import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { params, useParams } from 'react-router-dom';
import { server } from '../index';
import axios from 'axios';
import Error_show from './Error_show';
import Chart from './Chart'

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [error, setError] = useState(false);
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol = currency === 'inr' ? "₹" : currency === 'eur' ? "€" : "$";
  const btns = ["24h", "7d", "14d", "30d", "60d", "365d", "max"];
  const switchChartStats = (val) => {
    switch (val) {
      case "24h": setDays("24h");
        setLoading(true);
        break;
      case "7d": setDays("7d");
        setLoading(true);
        break;
      case "14d": setDays("14d");
        setLoading(true);
        break;
      case "30d": setDays("30d");
        setLoading(true);
        break;
      case "60d": setDays("60d");
        setLoading(true);
        break;
      case "365d": setDays("365d");
        setLoading(true);
        break;
      case "max": setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
        break;
    }

  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoin(data);
        // console.log(data);
        setChartArray(chartData.prices);
        console.log(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();

  }, [params.id, currency, days]);

  if (error) return <Error_show message={"Error while fetching Coin data "} />;
  return (
    <>

      <Container maxW={"container.xl"}  >
        {
          loading ? <Loader /> : (
            <>
              <Box width={"full"} borderwith={1} px={"20"} display={"flex"} justifyContent={"center"} >
                <Chart currency={currencySymbol} days={days} arr={chartArray} />
              </Box>

              <HStack p={"4"} wrap={"wrap"} alignItems={"center"} justifyContent={"center"} >
                {
                  btns.map((i) => (
                    <Button disabled={days === i} size={"lg"} fontSize={["1rem", "1.5rem"]} key={i} onClick={() => switchChartStats(i)} >{i}</Button>
                  ))

                }
              </HStack>


              <RadioGroup p={'4'} marginBottom={"4"} value={currency} onChange={setCurrency} >
                <HStack spacing={"2"} justifyContent={"center"} >
                  <Radio value='inr' size={"lg"} >INR</Radio>
                  <Radio value='eur' size={"lg"}  >EUR</Radio>
                  <Radio value='usd' size={"lg"}  >USD</Radio>
                </HStack>
              </RadioGroup>

              <VStack spacing={"4"} justifyContent={"center"} alignItems={"flex-start"} mx={"10"} >

                <Text alignSelf={"center"} fontSize={["1rem", "1.5rem"]} >
                  Last Updated on {"  "} {Date(coin.market_data.last_updated).split('G')[0]}
                </Text>

                <Image src={coin.image.large} w={["5rem", "8rem"]} h={["5rem", "8rem"]} objectFit={'contain'} />

                <Stat>
                  <StatLabel fontSize={["0.9rem", "1.2rem"]} >{coin.name}</StatLabel>
                  <StatNumber ontSize={["0.9rem", "1.2rem"]}>
                    {currencySymbol}{coin.market_data.current_price[currency]}
                  </StatNumber>
                  <StatHelpText fontSize={["0.8rem", "1rem"]}>
                    <StatArrow
                      type={coin.market_data.price_change_percentage_24h >= 0 ? "increase" : "decrease"} w={"1.2rem"} h={"1.2rem"} />
                    {coin.market_data.price_change_percentage_24h}%
                  </StatHelpText>
                </Stat>

                <Badge bgColor={"blackAlpha.700"} color={"whiteAlpha.900"} fontSize={"2xl"} >
                  #{coin.market_cap_rank}
                </Badge>

                < CustomBar low={`${coin.market_data.low_24h[currency]}`}
                  high={`${coin.market_data.high_24h[currency]}`}
                  curr={`${coin.market_data.current_price[currency]}`}
                  currencySymbol={`${currencySymbol}`}
                />

                <Box w="full" p='4' >

                  <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                  <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                  <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                  <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                  <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />


                </Box>

              </VStack>
            </>
          )
        }

      </Container>
    </>
  )
}

export default CoinDetails;

const CustomBar = ({ curr, low, high, currencySymbol }) => (
  <VStack w="full">

    <Progress value={`${(high - low) - (high - curr)}`} colorScheme={"teal"} w="full" h={["1.3rem", "2rem"]} />
    <HStack justifyContent={"space-between"} w="full" >
      <Badge fontSize={["0.8rem", "1rem"]} children={`${currencySymbol}${low}`} colorScheme='red' />
      <Text fontSize={["0.9rem", "1.2rem"]} >24hr Range `</Text>
      <Badge fontSize={["0.8rem", "1rem"]} children={`${currencySymbol}${high}`} colorScheme='green' />
    </HStack>

  </VStack>
);
 
const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w="full" my={"0.5rem"} p={["0.5rem", "1rem"]}
    css={{
      "&:hover": {
        border: "1px solid black"
      },
    }
    }
  >
    <Text fontSize={["0.8rem", "1.3rem"]} fontFamily={'sans-serif'} letterSpacing={"wide"} fontWeight={"bold"} mx={"0"} >{title}</Text>
    <Text fontSize={["0.8rem", "1.3rem"]} fontWeight={"medium"} mx={"5"} >{value}</Text>
  </HStack>

);