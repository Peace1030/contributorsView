"use client";
import { useState, useEffect } from 'react';
import { getContributors } from '../utils/githubApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, IconButton, Image, Text } from '@chakra-ui/react';

interface Contributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
}

const Home: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  const [page, setPage] = useState<number>(1);

  const fetchMoreContributors = async () => {
    const newContributors = await getContributors(page);
    console.log(newContributors);
    setContributors([...contributors, ...newContributors]);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchMoreContributors();
  }, []);

  return (
    <InfiniteScroll
      dataLength={contributors.length}
      next={fetchMoreContributors}
      hasMore={true}
      loader={<h4>Loading...</h4>} 
      children={
        <Grid 
          h='200px'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(5, 1fr)'
          gap={4}
        >
        {contributors.map((contributor, i) => (
            <Card maxW='md' variant={'outline'}>
            <CardHeader>
              <Flex letterSpacing={4}>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Avatar name='Segun Adebayo' src={contributor.url} />
                  <Box>
                    <Heading size='sm'>{contributor.login}</Heading>
                    <Text>{contributor.type}</Text>
                  </Box>
                </Flex>
                <IconButton
                  variant='ghost'
                  colorScheme='gray'
                  aria-label='See menu'
                  icon={<Text>aaa</Text>}
                />
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>
                With Chakra UI, I wanted to sync the speed of development with the speed
                of design. I wanted the developer to be just as excited as the designer to
                create a screen.
              </Text>
            </CardBody>
            <Image
              objectFit='cover'
              src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Chakra UI'
            />
          
            <CardFooter
              justify='space-between'
              flexWrap='wrap'
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              <Button flex='1' variant='ghost' leftIcon={<Text>aaa</Text>}>
                Like
              </Button>
              <Button flex='1' variant='ghost' leftIcon={<Text>bbb</Text>}>
                Comment
              </Button>
              <Button flex='1' variant='ghost' leftIcon={<Text>ccc</Text>}>
                Share
              </Button>
            </CardFooter>
          </Card>
          ))
        }
      </Grid>
    }    
      />
  );
};

export default Home;