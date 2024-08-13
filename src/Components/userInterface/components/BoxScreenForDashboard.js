import * as React from 'react';
import { Box, Grid, ThemeProvider } from '@mui/material';


export default function BoxScreenForDashboard()
{
    const boxfirst=()=>{
        return( <ThemeProvider
            theme={{
              palette: {
                primary: {
                  main: '#a19999',
                  dark: '#0066CC',
                },
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 200,
                borderRadius: 1,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            />
          </ThemeProvider>)
    }


    const boxsecond=()=>{
        return( <ThemeProvider
            theme={{
              palette: {
                primary: {
                  main: '#a19999',
                  dark: '#0066CC',
                },
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 200,
                borderRadius: 1,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            />
          </ThemeProvider>)
    }




    const boxthird=()=>{
        return( <ThemeProvider
            theme={{
              palette: {
                primary: {
                  main: '#a19999',
                  dark: '#0066CC',
                },
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 200,
                borderRadius: 1,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            />
          </ThemeProvider>)
    }
    

    return(<div>
        {/* <Grid container spacing={2}>
            <Grid item xs={4}>
            {boxfirst()}
            </Grid>
            <Grid item xs={4}>
            {boxsecond()}
            </Grid>
            <Grid item xs={4} style={{background:''}}>
            {boxthird()}

            </Grid>
        </Grid> */}
        
        

    </div>)
}