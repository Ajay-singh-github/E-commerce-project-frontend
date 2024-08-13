import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../Services/FetchNodeServices";
import { useMediaQuery } from "@mui/material";

function TopBrand({data,title}) {
    const matches = useMediaQuery('(max-width:800px)')
    const matches_sm = useMediaQuery('(max-width:400px)')

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: matches ? 4.5 : 8,
        slidesToScroll: 6,
        focusOnSelect: true,
        arrows: matches ? false : true,
        rows: matches ? 2 : 1
    }

    
    function showSlider() {
        return data.map((item) => {
            return (
                <div style={{ width: '100%' }}>
                    <img src={`${serverURL}/images/${item.logo}`} width='80%' height='80%' alt="category"></img>
                </div>
            )
        })
    }
    return (
        <div style={{ width: matches ? '95%' : '80%' }}>
              <div  style={{fontWeight:'bolder',fontSize:26,color:'#fff',margin:'10px 0px 10px 0px'}}>
                {title}
            </div>
            <Slider {...settings}>
                {showSlider()}
            </Slider>
        </div>
    )
}

export default TopBrand