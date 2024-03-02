import React from 'react';
import List from '@mui/material/List';
import ErrorIcon from '@mui/icons-material/Error';
import { Paper } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Title from '../Title';

export default function AlertList({ alerts }) {
  return (
    <React.Fragment>
      <Title>Grid Alerts: {alerts.length}</Title>
      {alerts ? (
        <Paper
          sx={{
            height: 200,
            overflow: 'auto',
          }}
        >
          <List>
            {alerts
              ?.map(alert => (
                <ListItemButton key={alert}>
                  <ListItemIcon>
                    <ErrorIcon />
                  </ListItemIcon>
                  <ListItemText primary={alert} />
                </ListItemButton>
              ))}
          </List>
        </Paper>
      ) : (
        <p>No Alerts!</p>
      )}
    </React.Fragment>
  );
}
