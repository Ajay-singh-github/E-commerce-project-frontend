import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import UserShopping from "./UserShoppingComponent";
import UserShoppingVerified from "./userShoppingVerifiedComponent";


export default function UserAccount(props)
{
    var location =useLocation()
    var number = location?.state?.mobilenum
    var status = location?.state?.status
    var user = location?.state?.user[0]


    const [data,setData]=useState([{picture:'logo512.png',namea:"boAt Airdopes Ultra Plus TWS Earbuds with Environmental Noise Cancellation (IPX5 Sweat Resistant, ASAP Charge, Active Black)"},{picture:'logo512.png',namea:"boAt Airdopes Ultra Plus TWS Earbuds with Environmental Noise Cancellation (IPX5 Sweat Resistant, ASAP Charge, Active Black)"},{picture:'logo512.png',namea:"boAt Airdopes Ultra Plus TWS Earbuds with Environmental Noise Cancellation (IPX5 Sweat Resistant, ASAP Charge, Active Black)"},{picture:'logo512.png',namea:"boAt Airdopes Ultra Plus TWS Earbuds with Environmental Noise Cancellation (IPX5 Sweat Resistant, ASAP Charge, Active Black)"}])

    
   const ShowallChoiceItems=()=>{
      return data.map((item)=>{
       return(  <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
        <div style={{borderRadius:'1px 1px 1px 1px',width:"60%",height:"auto",paddingBottom:"20px",padding:"0",background:'white',marginTop:'10px',alignItems:"center"}}>
           <Grid container>
              <Grid item xs={2}>
                  <img src={item.picture} width={"100%"} height={"100%"}/>
              </Grid>
              <Grid item xs={9} style={{marginLeft:"20px"}}>
                 <span style={{fontWeight:"bold",cursor:"pointer",paddingTop:"10px",display:'inline-block',textTransform:'uppercase',letterSpacing:"2"}}>{item.namea}</span>
                 <div style={{width:'95%',height:'1px',background:'black',marginTop:"20px"}}></div>
                 

                 <FormControl style={{marginTop:"30px",marginBottom:'20px'}}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Express Delivery by today | ₹49" />
        <FormControlLabel value="male" control={<Radio />} label="Standard Delivery by 16 July 2024 | Free" />
       
      </RadioGroup>
    </FormControl>
              </Grid>
              
           </Grid>
        </div>
   </div>)
    })
   }


 

    return(<div style={{background:"#dce0dd"}}>
        

       
        
        {status?<UserShoppingVerified user={user}  status={status}/>:
        <UserShopping number={number} firstfill={"firstfill"}/>}
        {/* {ShowallChoiceItems()} */}
        
        
    
   
    </div>)
}