import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Rating,Checkbox } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { serverURL } from "../../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";

export default function ProductComponent({data,title})
{  var navigate=useNavigate()
    const theme = useTheme();
  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var settings = {
                    
    infinite: true,
    speed: 500,
    slidesToShow: matches_sm?1:matches_md?2:4,
    slidesToScroll: 1,
    arrows:matches_md || matches_sm?false:true
   };
//   var data=[{id:0,picture:'p1.png',brandname:'LG',productname:"Solo Microwave",modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:2},
//   {id:0,picture:'p1.png',brandname:'LG',productname:"Hero Digital  Microwave",modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:3},
//   {id:0,picture:'p1.png',brandname:'LG',productname:"Solo Microwave",modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:5},
//   {id:0,picture:'p1.png',brandname:'LG',productname:"Solo Microwave",modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:2},
//   {id:0,picture:'p1.png',brandname:'LG',productname:"Solo Microwave",modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:1},
//   {id:0,picture:'p1.png',brandname:'LG',productname:"Solo Microwave",modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:5},
//   {id:0,picture:'p1.png',brandname:'LG',productname:"Solo Microwave",modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:5}, 
// ]


const handleClick=(item)=>{
  
  navigate('/productpurchasescreen',{state:{product:item}})

}

  const AddSlider=()=>{
    return data.map((item)=>{
      
    return(<div   style={{width:'100%'}}>
       <div onClick={()=>handleClick(item)} style={{cursor:'pointer', width:'90%',background:'#121212',padding:10,display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center',borderRadius:10}}>
       <div style={{color:'#fff',marginLeft:'auto',padding:10}}>
       <Checkbox  icon={<FavoriteBorder style={{color:"#fff"}} />} checkedIcon={<Favorite  style={{color:"#fff"}} />} />
        
        </div> 
         
        <img src={`${serverURL}/images/${item.productpicture}`}  style={{width:'80%'}}/>
        {
        <div style={{display:'flex',justifyContent:'left',flexDirection:'column',width:'80%',marginTop:'5%'}}>
        <div style={{color:'#fff',fontWeight:600,fontSize:matches_sm?'2.8vw':'1.3vw',height:matches_sm?30:100}}>{item.brandname} {item.productname} {item.modelno}</div>
        <div style={{display:'flex',flexDirection:'row',marginTop:'8%'}}>
        <div style={{color:'#fff',fontWeight:600,fontSize:matches_sm?'2.9vw':'1.3vw'}}><s>&#8377;{item.price}</s></div>
         <div style={{color:'#fff',fontWeight:400,fontSize:matches_sm?'2.4vw':'1vw'}}>&#8377;{item.offerprice}</div>
        </div>
        <Rating
       style={{marginTop:'5%'}} 
       name="simple-controlled"
        value={item.rating}
        
      />
        </div>
        }
       </div>
     
       </div>
    )
    })
  }
  return(<div style={{width:'80%'}}>
  <div style={{fontWeight:'bolder',fontSize:26,color:'#fff',margin:'10px 0px 10px 0px'}}>{title}</div>  
  <Slider {...settings}>
    {AddSlider()}    
  </Slider>
  </div>)
}