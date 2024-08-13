
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postData } from '../../../Services/FetchNodeServices';
import { useDispatch } from 'react-redux';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function Otp(props) {
  var location =useLocation()
  var otp = location?.state?.otp
  var mobileno = location?.state?.mobileno
  console.log("i am checking mobile no in otp component:",mobileno)
  var navigate = useNavigate()
  var dispatch =useDispatch()
  var otpArray=new Array(4)
  otpArray.fill('')

  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();

  const [f1,setF1] = useState('')
  const [f2,setF2] = useState('')
  const [f3,setF3] = useState('')
  const [f4,setF4] = useState('')

 
  
  const [open, setOpen] = React.useState(true);
 


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen=()=>{
    setOpen(true)
  }

  const handleCheckOtp=async()=>{
   otpArray[0]=f1
   otpArray[1]=f2
   otpArray[2]=f3
   otpArray[3]=f4
   var oldotp=otpArray.join('')
   
   console.log("i am providing otp:",otp)

   if(oldotp==otp)
   {
    var result = await postData('useraccount/check_account',{mobileno:mobileno})
    if(result.status)
    { dispatch({type:'ADD_USER',payload:[result.data[0].mobileno,result.data[0]]})
      localStorage.setItem('user',JSON.stringify(result.data[0]))
      navigate('/useraccount',{state:{mobilenum:mobileno,user:result.data,status:result.status}})
     
    }
    else
    {
      
     navigate('/useraccount',{state:{mobilenum:mobileno,user:[],status:result.status}})
    }
   }
   else{
    alert("you otp is wrong!")
   }
  }
  

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleOpen} >
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
        <div style={{color:'white',margin:'20px',minWidth:'400px'}}>
           <div style={{display:'flex',justifyContent:'end',marginBottom:'5px',marginTop:"-10px"}}><div onClick={handleClose} style={{color:'#868a86',cursor:'pointer'}}><CloseIcon/></div></div>
           <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
             <div style={{fontWeight:'bold',textTransform:"uppercase",fontSize:'20px'}}>Verify with Otp</div>
           </div>

           <div style={{display:'flex',justifyContent:'center',alignContent:'center',marginTop:'40px'}}><div style={{fontFamily:'switzer',lineHeight:'16.8px'}}>Send to {mobileno}</div></div>
                                                                                     {/* if(txt.length>=1){ et2.current.focus()} }} value={f1} */}
          <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',marginTop:'40px'}}>
               <div><input ref={et1} type="text"  onChange={(e) => {
                    const txt = e.target.value;
                    setF1(txt);
                    if (txt.length >= 1) {
                        et2.current.focus();
                    }
                }}  maxLength={1} value={f1} keyboardType="Number" style={{width:'50px',height:'50px',borderRadius:'4px 4px 4px 4px',background:"black",color:'white' , fontWeight:'bold',border:"1px solid #fff",fontSize:"30px",textAlign:'center'}}/></div>


               <div><input ref={et2} type="text" onChange={(e) => {
                    const txt = e.target.value;
                    setF2(txt);
                    if (txt.length >= 1) {
                        et3.current.focus();
                    } else if (txt.length < 1) {
                        et1.current.focus();
                    }
                }} maxLength={1} value={f2} keyboardType="numeric" style={{width:'50px',height:'50px',borderRadius:'4px 4px 4px 4px',background:"black",color:'white' , fontWeight:'bold',border:"1px solid #fff",fontSize:"30px",textAlign:'center'}}/></div>


               <div><input ref={et3} type="text"   onChange={(e) => {
                    const txt = e.target.value;
                    setF3(txt);
                    if (txt.length >= 1) {
                        et4.current.focus();
                    } else if (txt.length < 1) {
                        et2.current.focus();
                    }
                }} maxLength={1} value={f3} keyboardType="numeric" style={{width:'50px',height:'50px',borderRadius:'4px 4px 4px 4px',background:"black",color:'white' , fontWeight:'bold',border:"1px solid #fff",fontSize:"30px",textAlign:'center'}}/></div>


               <div><input ref={et4} type="text"  onChange={(e) => {
                    const txt = e.target.value;
                    setF4(txt);
                    if (txt.length >= 1) {
                        et4.current.focus();
                    } else if (txt.length < 1) {
                        et3.current.focus();
                    }
                }} maxLength={1} value={f4} keyboardType="numeric" style={{width:'50px',height:'50px',borderRadius:'4px 4px 4px 4px',background:"black",color:'white' , fontWeight:'bold',border:"1px solid #fff",fontSize:"30px",textAlign:'center'}}/></div>

          </div>

          
           <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:"70px"}}><Button variant="contained" fullWidth style={{background:'rgb(0,181,148)' ,fontWeight:'bold',color:'black'}} onClick={handleCheckOtp}>Continue</Button></div>
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




