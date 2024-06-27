// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import Header from './components/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState('');

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    const response = await axios.get('http://localhost:8000/tweets');
    setTweets(response.data);
  };

  const postTweet = async () => {
    if (tweet) {
      await axios.post('http://localhost:8000/tweets', { body: tweet });
      setTweet('');
      fetchTweets();
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
              label="今何してる？"
              variant="outlined"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" color="primary" onClick={postTweet}>
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
