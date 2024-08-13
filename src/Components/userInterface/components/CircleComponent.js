import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../Services/FetchNodeServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function CircleComponent({data})
{
    const theme = useTheme();
  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var settings = {
                    
    infinite: true,
    speed: 500,
    slidesToShow: matches_md?5:matches_sm?4:8,
    slidesToScroll: 1,
    arrows:matches_md || matches_sm?false:true,
    
   };
  /*var data=[{id:0,icon:'c0.png',categoryname:"What's New"},{id:1,icon:'c1.png',categoryname:"Mobiles"},
  {id:2,icon:'c2.png',categoryname:"Televisions"},
  {id:3,icon:'c3.png',categoryname:"Laptops"},
  {id:4,icon:'c4.png',categoryname:"Headphones"},
  {id:5,icon:'c5.png',categoryname:"Referigerators"},
  {id:6,icon:'c6.png',categoryname:"Home Theaters"},
  {id:7,icon:'c7.png',categoryname:"Air Conditioners"},
  {id:8,icon:'c8.png',categoryname:"Speakers"},
  {id:9,icon:'c9.png',categoryname:"Washing Machines"}

]*/
  const AddSlider=()=>{
    return data.map((item)=>{
    return(<div style={{width:'100%'}}>
       <div style={{ width:'100%',display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'80%',height:'80%',borderRadius:'40%'}}>
        <img src={`${serverURL}/images/${item.image}`}  style={{width:'100%'}}/>
       </div> 
       {matches_md || matches_sm?<></>:
       <div style={{color:'#fff'}}>{item.categoryname}</div>
       }
       </div>
    </div>)
    })
  }

  return(<div style={{width:'80%'}}>
  <Slider {...settings}>
    {AddSlider()}    
  </Slider>
  </div>)
}