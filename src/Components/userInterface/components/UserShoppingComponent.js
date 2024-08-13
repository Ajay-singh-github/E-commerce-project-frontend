import { useState } from "react"
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { postData } from "../../../Services/FetchNodeServices";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import SmallScreenCartComponent from "./SmallScreenCartComponent";





export default function UserShopping(props)
{   
   var dispatch =useDispatch()
   var cart=useSelector(state=>state.mycart)    
   var firstfill = props?.firstfill
   var number= props?.number
    var productCart=Object.values(cart)
    const [username,setUsername]=useState("")
    const [middlename,setMiddleName]=useState("")
    const [lastname,setLastName]=useState("")
    const [emailid,setEmailid]=useState('')
    const [mobileno,setMobileno]=useState(props?.number)
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [pincode,setPincode]=useState('')
    const [title,setTitle]=useState('')
    const [addressone,setAddressOne]=useState('')
    const [addresstwo,setAddressTwo]=useState('')
    const [resError,setResError]=useState({})

    const handleError = (error, input,message)=>{
      setResError(prevState=>({...prevState,[input]:{'error':error,'message':message}}))
    }
    //  alert(data.length)


    const validation=()=>
      {
         var submitRecord=true
         if(!title)
         {
           handleError(true,'title',"Pls Select Title")
           submitRecord=false
         }
         if(!username)
         {
           handleError(true,'username',"Pls Input user Name")
           submitRecord=false
         }
         if(!lastname)
         {
           handleError(true,'lastname',"Pls Input Last Name")
           submitRecord=false
         }
         if(!emailid)
         {
           handleError(true,'emailId',"Pls Input Email Id Name")
           submitRecord=false
         }
         if(!mobileno)
         {
           handleError(true,'mobileno',"Pls Input Mobile Number")
           submitRecord=false
         }
         if(!addressone)
          {
            handleError(true,'addressone',"Pls Input Address 1")
            submitRecord=false
          }
          if(!addresstwo)
            {
              handleError(true,'addresstwo',"Pls Input Address 2")
              submitRecord=false
            }
          if(!pincode)
           {
                handleError(true,'pincode',"Pls Pincode")
                submitRecord=false
           }
           if(!state)
            {
              handleError(true,'state',"Pls Input State")
              submitRecord=false
            }
            if(!city)
              {
                handleError(true,'city',"Pls Input City")
                submitRecord=false
              }
      
         return submitRecord
          
      }
   
    const handleSummit=async()=>
    {
      var  error =validation()
      if(error)
      {

      
      // alert(`${title} ${username} ${middlename} ${lastname} ${emailid} ${mobileno}  ${addressone} ${addresstwo} ${state} ${city} ${pincode}`)
      var body={"username":`${title} ${username} ${middlename} ${lastname}`,"emailid":emailid,"mobileno":mobileno,"address":`${addressone} ${addresstwo} ${city} ${state}`,"pincode":pincode}
      var result=await postData('useraccount/user_submit',body)
        if(result.status)
        {
            Swal.fire({
       
        
                icon: 'success',
                title: 'Data',
                text: result.message,
                position:'top-end',
                timer: 5000,
                showConfirmButton:false,
                toast:true
              })
              dispatch({type:"ADD_USER",payload:[props.number,body]})
              localStorage.setItem('user',JSON.stringify(body))

            }
      }
    }

    const handleChange =(e)=>
    {
      setTitle(e.target.value)
      // alert(e.target.value)
    }



    return(<div style={{display:'flex'}}>
         <div>
        <div style={{display:'flex',justifyContent:"center"}}> 
                <div style={{borderRadius:'2px 2px 2px 2px ',width:"60%",height:"50px",background:'white',display:'flex',justifyContent:'center',marginTop:'10px',alignItems:"center"}}>
              <div>Continue Creating Account…</div>
          </div>
          </div>
  
           <div style={{display:'flex',justifyContent:'center'}}>
               <div style={{borderRadius:'2px 2px 2px 2px',width:"60%",height:"auto",paddingBottom:"20px",padding:"20px",background:'white',display:'flex',justifyContent:'center',marginTop:'10px',alignItems:"center"}}>
          <Grid container spacing={2}>
              <Grid item xs={12} style={{height:'50px'}}>
                  <h4 style={{fontWeight:'bold',paddingTop:'0px',paddingLeft:'10px'}}>Contact Information</h4>
              </Grid>
            <Grid item xs={6}>
              <div>Title</div>
            <FormControl fullWidth>
               
            <Select 
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={title}
             onFocus={()=>handleError(false,'title','')}
          //   label="Age"
             onChange={handleChange}
           >
      <MenuItem value={"Mr"}>Mr</MenuItem>
      <MenuItem value={"Mrs"}>Mrs</MenuItem>
      <MenuItem value={"Miss"}>Miss</MenuItem>
      <MenuItem value={"Ms"}>Ms</MenuItem>
      <MenuItem value={"Dr"}>Dr</MenuItem>
      <MenuItem value={"Prof"}>Prof</MenuItem>
  
    </Select>
    <FormHelperText ><div style={{color:'red'}}>{resError?.title?.message}</div></FormHelperText>
  
  </FormControl>
           </Grid>
          <Grid item xs={6} fullWidth>
           <div>First Name</div><TextField 
                      onFocus={()=>handleError(false,'username','')}
                      error={resError?.username?.error}
                      helperText={resError?.username?.message}  
                      placeholder="Enter First Name" id="outlined-basic" 
                      onChange={(e)=>setUsername(e.target.value)} 
                      fullWidth />
           </Grid>
          <Grid item xs={6}>
          <div>Middle Name</div><TextField 
          onFocus={()=>handleError(false,'middlename','')}
          error={resError?.middlename?.error}
          helperText={resError?.middlename?.message} 
          placeholder="Enter Middle Name" id="outlined-basic" onChange={(e)=>setMiddleName(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
          <div>Last Name</div><TextField 
          onFocus={()=>handleError(false,'lastname','')}
          error={resError?.lastname?.error}
          helperText={resError?.lastname?.message} 
          placeholder="Enter Last Name" id="outlined-basic" onChange={(e)=>setLastName(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
          <div>Email Id</div><TextField 
          onFocus={()=>handleError(false,'emailId','')}
          error={resError?.emailId?.error}
          helperText={resError?.emailId?.message} 
          placeholder="Enter Email Id" id="outlined-basic" onChange={(e)=>setEmailid(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
          <div>Mobile Number</div><TextField 
          onFocus={()=>handleError(false,'mobileno','')}
          error={resError?.mobileno?.error}
          helperText={resError?.mobileno?.message} 
          placeholder="Enter Mobile Number" id="outlined-basic" value={mobileno} onChange={(e)=>setMobileno(e.target.value)} fullWidth />
          </Grid>
          </Grid>
          </div>
          </div>
  
  
  
          <div style={{display:'flex',justifyContent:'center'}}>
               <div style={{borderRadius:'2px 2px 2px 2px',width:"60%",height:"auto",paddingBottom:"20px",padding:"20px",background:'white',display:'flex',justifyContent:'center',marginTop:'10px',alignItems:"center"}}>
          <Grid container spacing={2}>
              <Grid item xs={12} style={{height:'50px'}}>
                  <h4 style={{fontWeight:'bold',paddingTop:'0px',paddingLeft:'10px'}}>Address Inforamtion</h4>
              </Grid>
            
            
          <Grid item xs={6} fullWidth>
           <div>Address 1</div><TextField  
             onFocus={()=>handleError(false,'addressone','')}
             error={resError?.addressone?.error}
             helperText={resError?.addressone?.message} 
           id="outlined-basic" onChange={(e)=>setAddressOne(e.target.value)} fullWidth />
           </Grid>
          <Grid item xs={6}>
          <div>Address 2</div><TextField 
            onFocus={()=>handleError(false,'addresstwo','')}
            error={resError?.addresstwo?.error}
            helperText={resError?.addresstwo?.message} 
          id="outlined-basic" onChange={(e)=>setAddressTwo(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
          <div>State</div><TextField  
            onFocus={()=>handleError(false,'state','')}
            error={resError?.state?.error}
            helperText={resError?.state?.message} 
          id="outlined-basic" onChange={(e)=>setState(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
          <div>City</div><TextField 
            onFocus={()=>handleError(false,'city','')}
            error={resError?.city?.error}
            helperText={resError?.city?.message} 
          id="outlined-basic" onChange={(e)=>setCity(e.target.value)} fullWidth />
          </Grid>
  
          <Grid item xs={12}>
          <div>Pin Code</div><TextField 
            onFocus={()=>handleError(false,'pincode','')}
            error={resError?.pincode?.error}
            helperText={resError?.pincode?.message} 
          id="outlined-basic" onChange={(e)=>setPincode(e.target.value)} fullWidth />
          </Grid>
  
          </Grid>
          </div>
          </div>
          
          <div style={{display:'flex',justifyContent:'center',marginTop:"20px",marginBottom:"20px"
          }}>
            <div style={{width:"60%"}}>  <Button variant="contained" fullWidth onClick={handleSummit}>Proceed to Payment</Button></div>
          </div>
          
          <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
               <div style={{borderRadius:'2px 2px 2px 2px',width:"60%",height:"auto",paddingBottom:"20px",padding:"0",background:'white',display:'flex',marginTop:'10px',alignItems:"center"}}>
                <h6 style={{fontWeight:'bold'}}>Delivery Options</h6>
          </div>
          </div>
         </div>
         <div >
            <SmallScreenCartComponent productCart={productCart} statuspayment={"Go For Payment"} firstfill={firstfill} number={number}/>
         </div>
          
      </div>)
}