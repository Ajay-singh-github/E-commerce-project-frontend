import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../Services/FetchNodeServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Grid } from "@mui/material";
export default function HighlightDoubleComponent({title})
{
    const theme = useTheme();
  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    var settings = {
                    
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows:matches_md ?false:true,
    
   };
  var data=[{id:1,icon:'hd1.webp'},
  {id:2,icon:'hd2.webp'},
  {id:3,icon:'hd3.webp'},
  {id:4,icon:'hd4.webp'},
  {id:5,icon:'hd5.webp'},
  
 

]
  const AddSlider=()=>{
    return data.map((item)=>{
    return(<div style={{width:'100%'}}>
       <div style={{ width:'100%',display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'80%',height:'80%',borderRadius:'40%'}}>
        <img src={`${serverURL}/images/${item.icon}`}  style={{width:'100%',borderRadius:10}}/>
       </div> 
      
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