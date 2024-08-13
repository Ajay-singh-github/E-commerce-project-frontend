import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DisplayAllBrands from './DisplayAllBrands';
import { useNavigate } from 'react-router-dom';


import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import BrandingWatermarkTwoToneIcon from '@mui/icons-material/BrandingWatermarkTwoTone';
import { Avatar, Grid } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import DisplayAllCategory from './DisplayAllCategory';
import { serverURL } from '../Services/FetchNodeServices';
import Category from './Category';
import Brands from './Brands';
import DisplayAllProducts from './DisplayAllProducts';
import Products from './Products';
import DisplayAllProductDetails from './DisplayAllProductDetails';
import ProductDetails from './ProductDetails';
import Banner from './Banner';
import CategoryBanner from './CategoryBanner';
import BoxScreenForDashboard from './userInterface/components/BoxScreenForDashboard';

const drawerWidth = 290;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  var navigate=useNavigate()
   var admin=JSON.parse(localStorage.getItem("ADMIN"))
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
            
          
         <Grid container spacing={1}>
            <Grid item xs={10} >
                <div style={{display:'flex',flexDirection:'column'}}>
                    <div style={{paddingLeft:70}}>
            <img src={`${serverURL}/images/${admin.picture}`} variant="rounded"  style={{width:80,height:80,borderRadius:20,paddingTop:10}} />
            </div>
            <div style={{paddingLeft:40,paddingTop:10,color:'#000'}}>
                {admin.emailid}
            </div>
            <div style={{paddingLeft:50,paddingTop:10,color:'#000'}}>
                +91 {admin.mobileno}
            </div>
            </div>
            </Grid>
            
            
            <Grid item xs={2}>
                <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> :  <ChevronRightIcon />}
                </IconButton>
            </Grid>
         </Grid>
          
          
          
        </DrawerHeader>
        <Divider />
        <List>
          
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/box')}>
                <ListItemIcon>
                    <DashboardIcon /> <div style={{fontWeight:'bold',paddingLeft:7,fontSize:18}}>Dashboard</div>
                </ListItemIcon>
                <ListItemText  />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/displayallbrands')}>
                <ListItemIcon>
                    <BrandingWatermarkTwoToneIcon /> <div style={{fontWeight:'bold',paddingLeft:7,fontSize:18}}>Display Brands</div>
                </ListItemIcon>
                <ListItemText  />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
                <ListItemIcon>
                    <CategoryIcon /> <div style={{fontWeight:'bold',paddingLeft:7,fontSize:18}}>Display Category</div>
                </ListItemIcon>
                <ListItemText  />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton  onClick={()=>navigate('/dashboard/displayallproducts')}>
                <ListItemIcon>
                    <ProductionQuantityLimitsIcon /> <div style={{fontWeight:'bold',paddingLeft:7,fontSize:18}}>Display All Product</div>
                </ListItemIcon>
                <ListItemText  />
              </ListItemButton>
            </ListItem>
        
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/displayallproductdetails')}>
                <ListItemIcon>
                    <ProductionQuantityLimitsIcon /> <div style={{fontWeight:'bold',paddingLeft:7,fontSize:18}}>Display All Product Details</div>
                </ListItemIcon>
                <ListItemText  />
              </ListItemButton>
            </ListItem>

            
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/banner')}>
                <ListItemIcon>
                    <ViewCarouselIcon /> <div style={{fontWeight:'bold',paddingLeft:7,fontSize:18}}>Banner</div>
                </ListItemIcon>
                <ListItemText  />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/categorybanner')}>
                <ListItemIcon>
                    <ViewCarouselIcon /> <div style={{fontWeight:'bold',paddingLeft:7,fontSize:18}}>Category Banner</div>
                </ListItemIcon>
                <ListItemText  />
              </ListItemButton>
            </ListItem>

        </List>
        <Divider />
        <List>
          
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon /><div style={{fontWeight:'bold',paddingLeft:7,fontSize:18}}>Logout</div>
                </ListItemIcon>
                <ListItemText  />
              </ListItemButton>
            </ListItem>
          
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          
         <div>
             <Routes>
                <Route path='/' element={<Navigate to={"/dashboard/summary"} replace={true} />} />
                <Route element={<DisplayAllBrands/>} path='/displayallbrands'/>
                <Route element={<DisplayAllCategory/>} path='/displayallcategory' />
                <Route element={<Category/>} path='/category' />
                <Route element={<Brands/>} path='/brands' />
                <Route element={<DisplayAllProducts/>} path='/displayallproducts' />
                <Route element={<Products/>} path='/products' />
                <Route element={<DisplayAllProductDetails/>} path='/displayallproductdetails' />
                <Route element={<ProductDetails/>} path='/productdetails' />
                <Route element={<Banner/>} path='/banner' />
                <Route element={<CategoryBanner/>} path='/categorybanner' />
                <Route element={< BoxScreenForDashboard/>} path='/box' />

             
             </Routes>
         </div>
        </Typography>
       
      </Main>
    </Box>
  );
}