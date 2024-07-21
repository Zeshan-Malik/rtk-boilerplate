import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function SideBarList(props) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(props.secondary);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <List dense={dense}>
        {props.children}
      </List>
    </Box>
  );
}
