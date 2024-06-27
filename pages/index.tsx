import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import Header from './components/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';

const API_URL = 'http://localhost:3001/tweets';

const fetchTweets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const postTweet = async (tweet) => {
  await axios.post(API_URL, { body: tweet });
};

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTweets();
      setTweets(data);
    };
    fetchData();
  }, []);

  const handlePostTweet = async () => {
    if (tweet) {
      await postTweet(tweet);
      setTweet('');
      const data = await fetchTweets();
      setTweets(data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Box my={4}>
          <Box display="flex" mb={2}>
            <TextField
              fullWidth
              label="What's happening?"
              variant="outlined"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handlePostTweet}>
              呟く
            </Button>
          </Box>
          <Grid container spacing={2}>
            {tweets.map((tweet) => (
              <Grid item xs={12} key={tweet.id}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">{tweet.body}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
