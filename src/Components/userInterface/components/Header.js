import { AppBar, Box, Button, Hidden, Menu, MenuItem, Toolbar } from "@mui/material";
import Logo from "../../../assets/croma.gif";
import SearchComponent from "./SearchComponent";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { getData,serverURL } from "../../../Services/FetchNodeServices";
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  var userData = JSON.parse(localStorage.getItem('user'))
  
  
  var cart=useSelector(state=>state.mycart)    
  var navigate=useNavigate()
  var productCart=Object.values(cart)

  const [categories,setCategories]=useState([])

  const [state, setState] = React.useState({
    top: false,
   });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, ['left']: open });
  };

  const list = (anchor) => (
    <Box
      
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categories.map((text, index) => (
          <ListItem key={text.categoryid} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <img src={`${serverURL}/images/${text.image}`} style={{width:30}}/>
              </ListItemIcon>
              <ListItemText primary={text.categoryname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      
    </Box>
  );
  
  

  const fetchCategories=async()=>{
    var result=await getData('userinterface/display_all_category')
    setCategories(result.data) 
   }
  
   useEffect(function(){
    fetchCategories()
  },[])

 /* const AddSlider=()=>{
    return categories.map((item)=>{
    return(<div>
        <MenuItem onClick={handleClose}>{item.categoryname}</MenuItem>
       </div>)
    })
  }*/

    const handleCart=()=>{
      navigate('/cart')
    }

    

    const handleHome=()=>{
      navigate('/home')
    }

    const handleClickForNavigate=()=>
    {
      if(userData?.username?.length>0)
      {
        navigate('/useraccount',{state:{mobilenum:userData?.mobileno,user:[userData],status:true}})
      }
    }

  return (
    <div style={{display:matches?'unset':'flex',position:'sticky',top:"0",zIndex:'50'}}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            backgroundImage:
              "url(https://media.croma.com/image/upload/v1697816449/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Desktop_-_Navratri_opt.3_glsdyl.jpg)",
          }}
        >
          <Toolbar>
            <div
              style={{ width: 300, display: "flex", justifyContent: "right" }}
            >
              <img src={Logo} width="150"  onClick={handleHome}  style={{cursor:"pointer"}}/>
            </div>
            {matches ? (
              <></>
            ) : (
              <div style={{ marginLeft: "12%", width: "48%" }}>
                <SearchComponent />
              </div>
            )}
            <div
              style={{
                marginLeft: matches ? 100 : -50,
                display: "flex",
                width: 200,
                justifyContent: "space-between",
              }}
            >
              {/* ,position:'absolute',left:"76%",top:"15%" */}
              <div  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}><div><AccountCircle style={{ fontSize: 30 ,cursor:"pointer"}} onClick={handleClickForNavigate} /> </div> <div style={{color:"white"}}>{userData?.username}</div></div>
              <div style={{position:"absolute",top:5,left:'89%',top:"15%"}}>
              <Badge badgeContent={productCart?.length}  color="primary" >
              <ShoppingCart onClick={handleCart} style={{ fontSize: 30,cursor:"pointer"}} />
              </Badge>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          display: "flex",
          marginTop: 15,
          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        {matches ? <div style={{
              color:'white',
              width: "100%",
              margin: "5px 10px 5px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"}}>
                 
             <MenuIcon 
            
             style={{fontSize:40}}
             onClick={toggleDrawer('left', true)}
             /> 
              <React.Fragment key={'left'}>
          
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}

            sx={{'.css-4t3x6l-MuiPaper-root-MuiDrawer-paper':{
                backgroundColor: '#000',
                color: '#fff'}}}
          >
            {list('anchor')}
          </Drawer>
        </React.Fragment>

              
                
                <SearchComponent /> 
                </div>: <></>}
      </div>
    </div>
  );
}


