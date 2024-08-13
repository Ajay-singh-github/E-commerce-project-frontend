import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../Services/FetchNodeServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function AddComponent()
{
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
    var settings = {
                    
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows:matches?false:true
   };
  var data=["banner1.png","banner2.png","banner1.png","banner2.png","banner1.png","banner2.png","banner1.png","banner2.png",]
  const AddSlider=()=>{
    return data.map((item)=>{
      return(<div style={{width:'100%'}}>
        <img src={`${serverURL}/images/${item}`}  style={{width:'98%',margin:'5px'}}/>
    </div>)
    })
  }

  return(<div style={{width:'80%'}}>
  <Slider {...settings}>
    {AddSlider()}    
  </Slider>
  </div>)
}