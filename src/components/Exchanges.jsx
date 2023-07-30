import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader'
import Error_show from './Error_show';


const Exchanges = () => {

    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchExchanges();

    }, []);

    if (error) return <Error_show message={"Error while fetching Exchanges data "} />;

    return <Container maxW={"container.xl"} 
    
    >

        {loading ? <Loader /> :
            <>
                <HStack dir='row' wrap={"wrap"}
                     justifyContent={["space-evenly","center"]}
                     alignItems={"center"}
                >
                    {
                        exchanges.map((i) => (
                            <ExchangeCard
                                key={i.id}
                                name={i.name}
                                img={i.image}
                                rank={i.trust_score_rank}
                                url={i.url}
                            />

                            // <div>{i.name}</div>
                        ))
                    }
                </HStack>

            </>
        }

    </Container>
}

export default Exchanges;

const ExchangeCard = ({ name, img, rank, url }) => {
    return (
        <a href={url} target={"blank"}>
            <VStack w={["10rem","21rem"]} p={["2rem","3rem"]} shadow={"lg"} borderRadius={"lg"} transition={"all 0.3s"}
             m={"1rem"} 
                css={{
                    "&:hover": {
                        transform: "scale(1.1)"
                    },
                }
                }
            >
                <Image src={img} w={["3rem","5rem"]} h={["3rem","5rem"]} objectFit={"contain"} alt={"Exchange"} />
                <Heading size={["sm","md"]}  noOfLines={1} >
                    {rank}
                </Heading>
                <Text  fontSize={["lg","xl"]} fontWeight={"medium"}  noOfLines={1} >{name}</Text>

            </VStack>
        </a>
    )
};