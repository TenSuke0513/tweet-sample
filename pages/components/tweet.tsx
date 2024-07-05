// tweet.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Tweet = ({ tweet, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {tweet.body}
          </Typography>
          <IconButton onClick={() => onEdit(tweet)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(tweet.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Tweet;
