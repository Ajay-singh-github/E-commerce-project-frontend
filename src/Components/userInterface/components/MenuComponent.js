import { AppBar, Box, Toolbar,Menu,MenuItem,Button } from "@mui/material";
import {useState,useEffect} from 'react' 
import { getData,postData } from "../../../Services/FetchNodeServices";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
export default function MenuComponent(props) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories,setCategories]=useState([])
  const [products,setProducts]=useState([])
  const open = Boolean(anchorEl);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const handleClick = (categoryid,event) => {
    setAnchorEl(event.currentTarget);
    fetchAllProducts(categoryid)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const fetchAllProducts=async(categoryid)=>{
    var result=await postData('userinterface/display_all_products_for_menu',{categoryid:categoryid})
    setProducts(result.data) 
   }
  
  
  const fetchCategories=async()=>{
    var result=await getData('userinterface/display_all_category')
    setCategories(result.data) 
   }
  
  useEffect(function(){
   fetchCategories()

  },[])

  const showMenu=()=>{
  return categories.map((item)=>{
   return <Button
   style={{color:'#fff'}}

 onClick={(event)=>handleClick(item.categoryid,event)}
>
 {item.categoryname}
</Button>

  })

  }
const showMenuItems=()=>{
    return products.map((item)=>{
     return<MenuItem onClick={handleClose}>{item.productname}</MenuItem>

    })
}

  return (
    <div >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
           background:'#2f3640',
           height:40,  
           display:'flex',alignItems:'center',justifyContent:'center' ,
           }}
          >
          <Toolbar>
         {showMenu()}
          
      <Menu
       
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {showMenuItems()}
        </Menu>
       </Toolbar>
      </AppBar>
    </Box>
      
    </div>
  );
}
