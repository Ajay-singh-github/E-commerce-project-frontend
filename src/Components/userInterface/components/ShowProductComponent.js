import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { serverURL } from "../../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function ShowProductComponent(props)
{   var deta=Object.values( props?.data)
    console.log("ajay again checking data  what is in deta:",deta)

    var navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
   
    const showData=()=>{
        const handleClick=(item)=>{
            navigate('/productpurchasescreen',{state:{product:item}})

        }    

       
     return deta.map((item)=>{
        return(<div key={item.id}>
            <Grid container spacing={1} >
               <Grid item xs={4} style={{cursor:"pointer"}}>
                  <img src={`${serverURL}/images/${item.picture?.split(',')[0]}`} width={'80%'} onClick={()=>handleClick(item)} style={{cursor:'pointer'}} />
               </Grid>

               <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={11}>
                  <div style={{fontWeight:"bold",fontSize:matches?"10px":"18px" ,cursor:"pointer",cursor:'pointer'}} onClick={()=>handleClick(item)}>{item.categoryname} {item.brandname} {item.color} {item.productname}</div>
                  <div style={{fontWeight:'bold',fontSize:'26px'}}>₹{item.offerprice}</div>
                  <div>(Incl. all Taxes)</div>
                  <div style={{marginTop:"40px",display:"inline-block"}} onClick={()=>handleClick(item)}><s>MRP.₹{item.price}</s></div><span style={{marginLeft:"20px",fontSize:"10px"}}>(Save ₹{item.price-item.offerprice})</span>
                  <div style={{display:'flex inline',borderRadius:"10%",marginLeft:"20px",width:"70px",height:"30px",border:"2px solid white",justifyContent:"center",alignItems:'center'}}><div style={{fontWeight:"bold"}}>48% Off</div></div>
                  </Grid>
                  <Grid item xs={1} style={{marginLeft:'-50px'}}>
                  <div style={{}}>  <Checkbox  style={{color:'white'}} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                  </div>
                  </Grid>
               </Grid>
               </Grid>
            </Grid>
            <div style={{width:"100%",display:"flex",justifyContent:'center',alignItems:'center',height:"100px"}}>
            <div style={{width:"90%",height:"0.5px",background:"#403f3b"}}></div>
            </div>
        </div>)
      })
    }

    return(<div style={{maxWidth:"100%",background:'black',height:"100vh",color:"white",overflow:'auto',scrollbarWidth:"none",paddingLeft:"10px",paddingRight:"30px",display:'inline-block'}}>
        <div style={{fontWeight:"bold",marginTop:"20px",marginBottom:"10px",letterSpacing:"1px",fontSize:"24px"}}>Best Deals On ACs</div>
        
        <div>
          {showData()}

        </div>
                 
    </div>)
}