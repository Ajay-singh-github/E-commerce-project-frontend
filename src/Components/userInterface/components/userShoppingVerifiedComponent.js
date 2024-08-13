import { useSelector } from "react-redux";
import SmallScreenCartComponent from "./SmallScreenCartComponent";
import DeliveryAddressComponent from "./DeliveryAddressComponent";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from "sweetalert2";


export default function UserShoppingVerified(props){
    var cart=useSelector(state=>state.mycart)    
   var status = props?.status
    var productCart=Object.values(cart)
    var navigate =useNavigate()
    var user= props?.user;
    const [cartRefresh,setCartRefresh]=useState(false)
    //  var yesforpayment = JSON.parse(localStorage.getItem('user'))
    //  alert(yesforpayment)

    const handleClick = ()=>{
        navigate('/home')
    }

    const handleClear=()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "you want to logout",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Logout!",
                text: "You has been logout",
                icon: "success"
              });
              localStorage.clear()
              navigate('/home')

            }
          });
         
    }
    return(
     <div>
        <div style={{paddingLeft:"3%",paddingRight:"6%",paddingTop:"50px",display:'flex',justifyContent:"space-between"}}>
        <LogoutIcon fontSize='large' onClick={handleClear}/><ArrowBackIcon style={{cursor:'pointer'}} onClick={handleClick} fontSize='large'/>
        </div>
    <div style={{display:'flex'}}>
        {/* <div style={{width:'60%'}}>
        {props.user.username}

        </div> */}
        <DeliveryAddressComponent user={user} cartRefresh={cartRefresh} setCartRefresh={setCartRefresh}/>
        <div >
            <SmallScreenCartComponent statusa={status} statuspayment={"proceed to payment"}  productCart={productCart}/>
        </div>
     
      </div>
    </div>)
}