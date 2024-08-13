import { Button, Divider, Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL } from "../../../Services/FetchNodeServices";
import PlusMinusComponent from "./PlusMinusComponent";


export default function DeliveryAddressComponent(props)
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    
    var dispatch =useDispatch()
    
    var cart=useSelector(state=>state.mycart)    
   
    var productCart=Object.values(cart)
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
        return productCart.map((item)=>{
          var picture=item.picture.split(",")[0]
          return(<div style={{marginTop:'10px'}}>           
                 <div style={{width:matches?'96%':'100%',marginLeft:matches?'4%':'0%'}}>
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
    return(<div style={{width:"80%",margin:"50px" }}>
       
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{fontWeight:'bold',fontSize:"30px",WebkitTextStroke:'2px black',letterSpacing:'2px'}}>Login</div>
            <Button variant="outlined" style={{borderRadius:"8px 8px 8px 8px",width:"7%", height:'20%',fontSize:"10px",fontWeight:'bold'}}>Change</Button>
        </div>
        <div style={{fontSize:"20px",marginTop:'10px'}}>+91 <span style={{fontSize:"20px"}}>{props?.user?.mobileno}</span></div>
        <div style={{background:'#00B594',width:'100%',height:"45px",marginTop:"20px"}}><div style={{paddingLeft:"20px",fontWeight:"bold",fontSize:"20px",paddingTop:"5px"}}>Delivery Address</div></div>
        <div style={{fontWeight:'bold',marginTop:"20px",marginRight:"20px",marginBottom:"8px",display:'inline-block',fontSize:"18px"}}>{props?.user?.username}</div><span style={{fontWeight:'bold',fontSize:"18px"}}>+91 {props?.user?.mobileno}</span>
        <div >{props?.user?.emailid}</div>
        <div style={{marginTop:"5px"}}>{props?.user?.address}</div>
        <div style={{marginTop:"5px"}}>{props?.user?.pincode}</div>
        <div style={{background:'#00B594',width:'100%',height:"45px",marginTop:"20px"}}><div style={{paddingLeft:"20px",fontWeight:"bold",fontSize:"20px",paddingTop:"5px"}}>Delivery Items</div></div>
        <div style={{marginBottom:"150px"}}>{ShowCard()}</div>
    </div>)

}