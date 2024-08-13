
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function Login(props) {
  // alert(props.status)
  var navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [mobilenumber,setMobileNumber]=React.useState('');
   const [handleerror,setHandleError]=React.useState({error:'',message:""})
  // alert(open)
  useEffect(function(){
    setOpen(props.status)
  },[props.status])

  const handleStatus=()=>{
    setOpen(false)
   
    
   }
const GenerateOpt=()=>{
  var otp = parseInt((Math.random()*999)+1000)
  return otp
}

 const validation=()=>{
  var submitRecord=true
      if(!mobilenumber || mobilenumber.length<10)
      {
        setHandleError({error:"true",message:"Plz Enter Valid Mobile Number"})
        submitRecord=false
      }
      return  submitRecord;
}
const handleLogSumit=()=>{
  var error =validation()
  // alert(mobilenumber.length)
  if(error)
    {

 var otp=GenerateOpt()
  alert(otp)
  navigate('/otp',{state:{otp:otp,mobileno:mobilenumber}})
  }
}


  const handleClose = () => {
    setOpen(false);
    props.setStatus(false)
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" >
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{background:'rgba(181, 155, 168, 0.43)'}}
      >
       
        <DialogContent style={{background:'black'}}>
          <DialogContentText id="alert-dialog-description">
        <div style={{color:'white',margin:'20px'}}>
           <div style={{display:'flex',justifyContent:'end',marginBottom:'30px',marginTop:"-10px"}}><div onClick={handleClose} style={{color:'#868a86',cursor:'pointer'}}><CloseIcon/></div></div>
           <div style={{border:"1px solid #5b5e5b",minWidth:'400px',height:'50px',display:'flex',justifyContent:'space-evenly',alignItems:'center',borderRadius:'4px 4px 4px 4px'}}>
              <div style={{fontWeight:'bold'}}>Login</div>
              <div style={{border:"1px solid #5b5e5b" ,minWidth:'25px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',borderRadius:'3px 3px 3px 3px'}}>or</div>
              <div style={{fontWeight:'bold'}}>Create Account</div>
           </div>

           <div style={{display:'flex',justifyContent:'center',alignContent:'center',marginTop:'40px'}}><div style={{fontFamily:'switzer',lineHeight:'16.8px'}}>Please enter your Email ID or Phone number</div></div>
          
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'40px'}}><div><input onFocus={()=>setHandleError({error:'false',message:''})} onChange={(e)=>setMobileNumber(e.target.value)}  type="text" placeholder='Enter Your Email Id or Phone Number' style={{width:'400px',height:'45px',borderRadius:'4px 4px 4px 4px',background:"black",color:'white' , fontWeight:'bold',border:"1px solid #fff",fontSize:"20px"}}/><div style={{color:'red'}}>{handleerror?.error?handleerror?.message:''}</div></div></div>

           <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}><div > <Checkbox {...label} defaultChecked style={{color:'white',marginRight:'3px'}}/> <span style={{marginTop:'10px'}}>Keep me signed in</span></div></div>
  
           <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'30px'}}><div style={{fontSize:'10px'}}>By continuing you agree to our <span style={{color:'rgb(19,212,136)'}}>Terms of Use</span> & <span style={{color:'rgb(19,212,136)'}}>Privacy Policy</span></div></div> 
      
           <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:"30px"}}><Button variant="contained" fullWidth style={{background:'rgb(0,181,148)' ,fontWeight:'bold',color:'black'}} onClick={handleLogSumit}>Continue</Button></div>
        </div>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}