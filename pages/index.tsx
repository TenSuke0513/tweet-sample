import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Card, CardContent, Typography, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

const deleteTweet = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

const updateTweet = async (id, body) => {
  await axios.put(`${API_URL}/${id}`, { body });
};

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState('');
  const [editTweet, setEditTweet] = useState(null);

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

  const handleDeleteTweet = async (id) => {
    await deleteTweet(id);
    const data = await fetchTweets();
    setTweets(data);
  };

  const handleEditTweet = (tweet) => {
    setEditTweet(tweet);
  };

  const handleUpdateTweet = async () => {
    if (editTweet) {
      await updateTweet(editTweet.id, editTweet.body);
      setEditTweet(null);
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
              Tweet
            </Button>
          </Box>
          <Grid container spacing={2}>
            {tweets.map((tweet) => (
              <Grid item xs={12} key={tweet.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {tweet.body}
                      </Typography>
                      <IconButton onClick={() => handleEditTweet(tweet)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTweet(tweet.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Dialog open={Boolean(editTweet)} onClose={() => setEditTweet(null)}>
          <DialogTitle>Edit Tweet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please edit your tweet below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Tweet"
              type="text"
              fullWidth
              value={editTweet ? editTweet.body : ''}
              onChange={(e) => setEditTweet({ ...editTweet, body: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditTweet(null)} color="primary">
              削除
            </Button>
            <Button onClick={handleUpdateTweet} color="primary">
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
