import { Grid,FormControl,InputLabel,Select,MenuItem, Divider,object} from "@mui/material";
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Slider from "react-slick";
import Rating from '@mui/material/Rating';
import "slick-carousel/slick/slick.css";
import { makeStyles } from "@mui/styles";
import Favorite from '@mui/icons-material/Favorite';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "slick-carousel/slick/slick-theme.css";
import PlaceIcon from '@mui/icons-material/Place';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import AllOutIcon from '@mui/icons-material/AllOut';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PlusMinusComponent from '../components/PlusMinusComponent'
import { useDispatch, useSelector } from 'react-redux';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { serverURL } from "../../../Services/FetchNodeServices";
export default function CartComponent(props)
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    var dispatch=useDispatch()

    var data=props.productCart
    const handleQtyChange=(product,value)=>{
      if(value<=0) 
       {
        dispatch({type:'REMOVE_PRODUCT',payload:[product.productdetailsid,product]})

       }
       else
       {

       product['qty']=value
       dispatch({type:'ADD_PRODUCT',payload:[product.productdetailsid,product]})
       }
      props.setCartRefresh(!props.cartRefresh)
  }

  const ShowCard=()=>{
    return data.map((item)=>{
      var picture=item.picture.split(",")[0]
      return(<div>           
             <div style={{width:matches?'96%':'80%',marginLeft:matches?'4%':'16%'}}>
            <div style={{marginTop:'4%',border:'1px solid #fff',width:'100%',borderRadius:10,background:'#fff'}}>
            <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{width:matches?"25%":"14%",padding:4}}> <img src={`${serverURL}/images/${picture}`} style={{width:'90%'}}></img></div>
            <div style={{width:matches?'50%':'60%',marginLeft:'2%',padding:5}}>
                <div style={{fontSize:matches?"2vw":"1vw"}}>
                <b>{item.brandname} {item.productname}</b>
                <b>{item.modelno}</b>
                </div>
                <br></br>
          <div style={{marginTop:'-2%'}}>      
      <Rating
      style={{fontSize:17}}
      color="yellow"
        name="simple-controlled"
        value={5}
      />
      </div>
                <br></br>              
                <div style={{fontSize:12}}>
                <b>Standard Delivery by tomorrow</b>
                </div>
                <br></br>
                <div style={{display:'flex',flexDirection:'row'}}>
                <div  style={{alignItems:'center',border:'1px solid #000',width:matches?'50%':'32%',borderRadius:8,marginTop:'-2%',display:'flex',justifyContent:'center',background:'#fff',fontSize:matches?10:15}}>
                 <div style={{padding:2}}> Move to Wishlist </div>
                </div>
                <div  style={{marginLeft:'4%',borderRadius:8,marginTop:'-2%',display:'flex',justifyContent:'center',background:'#fff',fontSize:matches?10:15}}>
                <PlusMinusComponent value={item?.qty} onChange={(value)=>handleQtyChange(item,value)} screen='cart'/>
                </div>
                </div>
                <br></br>
                <div style={{fontSize:matches?10:15,marginTop:'-1%'}}>
                Service Plan will be delivered to your registered email address
                </div>
                </div>
                <div style={{width:matches?'25%':'26%',padding:5}}>
               <div style={{fontSize:matches?14:"1.3vw",marginLeft:matches?'15%':'29%'}}>
              <b>₹{item.offerprice * item.qty}</b>
               </div>
               <div style={{fontSize:matches?10:15,color:'grey',marginLeft:matches?'15%':'29%'}}>
              (incl. all taxes)
               </div> 
               <div style={{marginTop:'4%'}}>
           <Divider style={{backgroundColor:'#b2bec3',marginLeft:matches?'12%':'26%',width:matches?'80%':'60%'}}/>
           </div>   
           <div style={{fontSize:matches?10:12,marginTop:"3%",marginLeft:matches?'15%':'29%'}}>
              <s>MRP {item.price * item.qty}</s>
               </div>
               <div style={{fontSize:10,color:'grey',marginLeft:matches?'15%':'29%'}}>
              (Save {(item.price-item.offerprice)*item.qty})
               </div> 
               <div style={{marginTop:'4%'}}>
           <Divider style={{backgroundColor:'#b2bec3',marginLeft:matches?'11%':'26%',width:matches?'80%':'60%'}}/>
           </div>   
           <div style={{marginTop:'4%'}}>
           <div style={{fontSize:matches?14:18,marginLeft:matches?'15%':'29%'}}><b>₹217/mo*</b></div> </div>  
           <div>
           <div style={{color:'#12DAA8',fontSize:13,marginLeft:matches?'15%':"28%",width:matches?'68%':'33%',borderBottom:'.5px solid #12DAA8'}}>EMI Option</div>
              </div>
              </div>                                       
            </div>
            
            </div>        
            </div>
      </div>)
    })
  }



    return(<div style={{width:matches?'98%':'100%'}}>
         <div style={{width:'100%',marginLeft:matches?'4%':'16%',marginTop:'3%',fontSize:18}}>
        <b>YOUR CARD</b>
         </div>
          <div style={{width:'100%'}}>
            {matches?<></>:<div style={{display:'flex',width:'100%',marginLeft:'16%',flexDirection:'row',marginTop:'3%'}}>           
             <div style={{border:'1px solid #12DAA8',width:'8%',borderRadius:5,display:'flex',justifyContent:'center',background:'#12DAA8',fontSize:12}}>
             <b style={{padding:5}}>Singn In</b>
            </div>
            <div style={{border:'1px solid #f1f2f6',width:'18%',borderRadius:5,display:'flex',justifyContent:'center',background:'#f1f2f6',fontSize:15}}>
            <b style={{padding:2}}> to check out faster </b>
           </div>
            </div> }
            <div style={{marginTop:'3%',padding:matches?6:10,border:'1px solid #fff',width:matches?'94%':'78%',marginLeft:matches?'4%':'16%',borderRadius:10,display:'flex',justifyContent:"start",background:'#fff',fontSize:matches?20:22}}>
          <div style={{display:'flex',flexDirection:'row',width:'100%'}}><div style={{padding:15,width:'4%'}}> <AllOutIcon fontSize="large"/></div><div style={{width:'60%',padding:14}}><b style={{padding:matches?10:1,marginTop:matches?"1%":"5%"}}>Apply Coupon</b></div><div style={{padding:15,marginLeft:'20%'}}><ChevronRightIcon fontSize="large"/></div></div>
            </div>
            </div>
              {ShowCard()}



          {matches?<div style={{width:matches?'92%':'60%',marginLeft:matches?'4%':'20%'}}>
             <div style={{marginTop:'7%',padding:5,border:'1px solid #fff',width:'100%',borderRadius:8,background:'#fff'}}>
             <span style={{padding:4,fontSize:17}}><b>Delivery option for </b><span style={{color:'green'}}><b>400049</b></span> <span style={{color:'green',width:'10%',marginLeft:'20%',borderBottom:"1px solid 'green'"}}><b>Change</b></span></span>
             <div style={{marginTop:'1%'}}>
             <FormControl>
      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
       <span> <FormControlLabel value="express" control={<Radio />}/><span><LocalShippingIcon style={{marginBottom:'-2%',marginLeft:'-4%'}}/></span><span style={{fontSize:15}}><b> Express Delivery by today </b></span><span style={{fontSize:12,color:'grey'}}>within</span><span style={{fontSize:14,color:'green'}}>8hr 40min</span></span>
       <span>  <FormControlLabel value="standard" control={<Radio />}/><span><AssignmentTurnedInIcon style={{marginBottom:'-2%',marginLeft:'-4%'}}/></span><span style={{fontSize:15}}><b>Standard Delivery by tomorrow</b></span></span>
      </RadioGroup>
    </FormControl>
             </div>
             </div>
             <div  style={{border:'1px solid #F8E6E7',width:'100%',borderRadius:6,padding:2,marginTop:'5%',display:'flex',justifyContent:'center',background:'#F8E6E7',fontSize:14}}>
                 <div style={{padding:6,color:'#C72D3A'}}><b> One or more products in your cart are not available for the delivery mode selected. </b></div>
                </div>

                <div style={{marginTop:'5%',padding:5,border:'1px solid #fff',width:'100%',borderRadius:8,background:'#fff'}}>
             <span style={{padding:4,fontSize:17}}><b>Order Summary ( 4 items ) </b></span>
             <div style={{marginTop:'4%'}}>
             <span style={{fontSize:16}}>Original Price<span style={{fontSize:16,marginLeft:matches?'48%':'42%'}}>₹12,792.00</span></span>
             </div>
             <div style={{marginTop:'4%'}}>
             <span style={{fontSize:16}}>Delivery<span style={{fontSize:16,marginLeft:matches?'59%':'57%'}}><s>₹60</s> Free</span></span>
             </div>
             <div style={{marginTop:'4%'}}>
             <span style={{fontSize:16}}>Total<span style={{fontSize:16,marginLeft:'62%'}}>₹12,792.00</span></span>
             </div>
             <div  style={{border:'1px solid #12DAA8',width:'100%',borderRadius:6,padding:2,marginTop:'5%',display:'flex',justifyContent:'center',background:'#12DAA8',fontSize:14}}>
                 <div style={{padding:6}}><b> Checkout </b></div>
                </div>
             </div>
             </div>:<></>}
 
    </div>)
}