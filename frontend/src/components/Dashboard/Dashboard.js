import React, { useState } from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import GridMap from '../GridMap';
import ParamSelector from '../ParamSelector';
import axios from 'axios';

//#region Backend Queries
const QUERY_URL = "http://localhost:5000/api/compute"

const computeGridMap = async (resources, preserves) => {
  var resourceArr = []
  var preservesArr = []

  for (var property in resources)
  {
    if (resources[property]) resourceArr.push(property)
  }

  for (var property in preserves)
  {
    if (preserves[property]) preservesArr.push(property)
  }

  await axios
    .post(QUERY_URL, 
      {
        data: {
          resources: resourceArr,
          preserves: preservesArr
        }
      }, 
      {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//#endregion

//#region UI Setup
function Footer(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      Rig Path Analysis
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
//#endregion

export default function Dashboard({ title, theme }) {
  const [displayMap, setDisplayMap] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Resource and Preservative Selection */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <ParamSelector onComputeMap={computeGridMap} />
                </Paper>
              </Grid>
              {/* GridMap */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <GridMap displayMap={displayMap} setDisplayMap={setDisplayMap} />
                </Paper>
              </Grid>
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
