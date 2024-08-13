import { Grid,FormControl,InputLabel,Select,MenuItem, Divider,object} from "@mui/material";
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Login from "./LoginComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
import useRazorpay from "react-razorpay";
import { postData, serverURL } from "../../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function SmallScreenCartComponent(props)
{   var data=props.productCart
  var number= props?.number
  var firstfill = props?.firstfill
  var statusa =props?.statusa
  var navigate = useNavigate()
  const [Razorpay] = useRazorpay();
  var statuspayment = props?.statuspayment
  
  
  // const [statusforpayment,setStatusForPayment] = useState(props?.status)
  var statusforpayment = props?.status;
 
  const [status,setStatus]=useState(false)
    var user=useSelector(state=>state.user)
    var userData=Object.values(user)[0]
    // alert(status)





   var originalAmount=data.reduce((p1,p2)=>{
    return p1+(p2.price*p2.qty)

   },0)

   var actualAmount=data.reduce((p1,p2)=>{
    return p1+(p2.offerprice*p2.qty)

   },0)
   var yousave=originalAmount-actualAmount

   const handleStatus=()=>{
    var userData = (JSON.parse(localStorage.getItem('user')))
    if(statuspayment=="Checkout" || statuspayment=="Go For Payment")
    {
    if(userData)
    {
      navigate('/useraccount',{state:{mobilenum:userData?.mobileno,user:[userData],status:true}})
      // handlePayment()
    }
    else
    {
      if(number?.length>0 && firstfill=="firstfill")
      {
        
          alert("firsly Fill this fom")
          
        
      }
      else{
      setStatus(true)
      }
    }
   }else if(statuspayment=="proceed to payment")
   {
     handlePayment()
   }
   }



   const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH", // Enter the Key ID generated from the Dashboard
    amount: actualAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Electronics Bazzar",
    description: "Test Transaction",
    image: `${serverURL}/images/croma.png`,
    handler:async function (response) {
      // alert(response.razorpay_payment_id);
     
      // alert(response.razorpay_signature);
      var body ={cart:data,user:userData,paymentstatus:response.razorpay_payment_id}
      var result=await postData("userinterface/order_submit",body)
      if(result.status)
      {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your Order has been Ordered",
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            // Timer complete
            navigate("/home");
          }
        });
      }
      else
      {
        Swal.fire({
          position: "top",
          icon: "fail",
          title: "Your Order has not been Ordered as error is coming.",
          showConfirmButton: false,
          timer: 3000
        })
      }
    },
    prefill: {
      name: userData?.username,
      email: userData?.emailid,
      contact: userData?.mobileno,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };


   const handlePayment =() => {
    
    const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.payment_id);
  });

  rzp1.open();
}
   


    return(<div>
             <div style={{width:'82%',marginTop:'10%'}}>
             <div style={{padding:5,border:'1px solid #fff',width:'100%',borderRadius:8,background:'#fff'}}>
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
             <div style={{marginTop:'4%',display:'flex',flexDirection:'row',width:'100%'}}>
             <span style={{fontSize:"1vw"}}>Original Price</span>
             <span style={{fontSize:"1vw",marginLeft:'auto'}}>₹{originalAmount}</span>
             </div>
             <div style={{marginTop:'4%',display:'flex',flexDirection:'row',width:'100%'}}>
            <span style={{fontSize:"1vw"}}>Amount Saved</span><span style={{fontSize:"1vw",marginLeft:'auto'}}>₹{yousave}</span>
             </div>
          
             <div style={{marginTop:'4%',display:'flex',flexDirection:'row',width:'100%'}}>
            <span style={{fontSize:"1vw"}}>Delivery</span><span style={{fontSize:"1vw",marginLeft:'auto'}}><s>₹60.00</s></span>
             </div>
             <div style={{marginTop:'4%',display:'flex',flexDirection:'row',width:'100%'}}>
             <span style={{fontSize:"1vw"}}>Total</span><span style={{fontSize:"1vw",marginLeft:'auto'}}>₹{actualAmount}</span>

             </div>
             <div onClick={handleStatus}  style={{border:'1px solid #12DAA8',cursor:"pointer",width:'100%',borderRadius:6,padding:2,marginTop:'5%',display:'flex',justifyContent:'center',background:'#12DAA8',fontSize:14}}>
                 <div style={{padding:6}} ><b> {statuspayment} </b></div>
                </div>
             </div>
             </div>
             {/* {alert(status)} */}
             <Login status={status} setStatus={setStatus}/> 
             </div>)
}