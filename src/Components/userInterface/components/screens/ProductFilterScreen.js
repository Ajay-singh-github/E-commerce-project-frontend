import { useLocation } from "react-router-dom";
import Divider from "../DividerComponent";
import Header from "../Header";
import ShowProductComponent from "../ShowProductComponent";
import SideFilterComponent from "../SideFiltercomponent";
import { useEffect, useState } from "react";


export default function ProductFilterScreen()
{
    var location =useLocation()
   
    const [data,setData]=useState(location?.state?.data?.data)
    const [refresh,setRefresh]=useState(false)
    
    const [dataFromChild, setDataFromChild] = useState([]);
    // console.log("ajay now checking:",dataFromChild)
   const  datafromchildcomponent =(da)=>{
       setDataFromChild(da)
   }

   
   useEffect(function(){
    if(dataFromChild.length>0)
    {
        
        setData(dataFromChild)
    }
    else
    {
        setData(location?.state?.data?.data)
    }
   },[dataFromChild])
   
    return(<div style={{background:'black'}}>
        <Header style={{marginTop:"20px"}}/>
        <div style={{maxWidth:"30%",display:'inline-block'}}><SideFilterComponent onDataSend={datafromchildcomponent} /></div>
        

        <div style={{width:"1px",background:"black",display:"inline-block",marginTop:"5px"}}>
         <div><Divider/></div>
        </div>

        <div style={{width:"69.5%",background:"black",display:"inline-block"}}>
         <div><ShowProductComponent data={data}/></div>
        </div>
 
    </div>)
}