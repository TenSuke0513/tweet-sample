// components/Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        ついったー
      </Typography>
      <Avatar alt="User" src="/static/images/avatar/1.jpg" />
    </Toolbar>
  </AppBar>
);

export default Header;
