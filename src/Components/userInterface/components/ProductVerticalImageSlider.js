// import ReactImageMagnify from 'react-image-magnify';
// import Slider from "react-slick";
// import { serverURL } from '../../../Services/FetchNodeServices';
// import { useState } from 'react';


// export default function ProductVerticalImageSlider()
// {   
// /*     return(<div id='imageMagnifyer' style={{width:'30%',height:'20%'}}>
//         <ReactImageMagnify {...{
//     smallImage: {
//         alt: 'Wristwatch by Ted Baker London',
//         isFluidWidth: true,
//         src: 'https://i.pinimg.com/236x/d5/a7/8e/d5a78e0a8fc08e71587531eeb62fd84c.jpg'
//     },
//     largeImage: {
//         src: 'https://i.pinimg.com/236x/d5/a7/8e/d5a78e0a8fc08e71587531eeb62fd84c.jpg',
//         width: 1200,
//         height: 1800
//     }
//    }} />
//   </div>)*/

// const [picture,setPicture]= useState({id:1,icon:'h1.webp'})
// var data=[{id:1,icon:'h1.webp'},
//   {id:2,icon:'h2.webp'},
//   {id:3,icon:'h3.webp'},
//   {id:4,icon:'h4.webp'},
//   {id:5,icon:'h5.webp'},
//   {id:6,icon:'h6.webp'},
//  ]

//  console.log(data[0][0])
//  const show=()=>
//  {  
//     return data.map((item)=>{
//         return(<div >
//             <img src={`${serverURL}/images/${item.icon}`}  style={{width:'100%',height:'50%',borderRadius:10,marginTop:10,borderColor:'green',}} onClick={()=>setPicture({id:item.id,icon:item.icon})}/>
//             </div>)
         
//     })
//   } 

//   const second=()=>{
    
//     return(<div id='imageMagnifyer'>
//     <ReactImageMagnify {...{
//     smallImage: {
//         alt: 'Wristwatch by Ted Baker London',
//         isFluidWidth: true,
//         src: `${serverURL}/images/${picture.icon}`
//     },
//     largeImage: {
//         src: `${serverURL}/images/${picture.icon}`,
//         width: 1200,
//         height: 1800
//     }
//    }} />
//     </div>)
//   }
   
// return(<div  style={{display:'flex',background:'black'}}>
//     <div style={{width:'5%',height:'5%',display:'flex',flexDirection:"column"}}>
//      {show()}
//    </div>
//    <div style={{marginLeft:25,marginTop:40,width:300,paddingTop:50}}>
//    {second()}
//    </div>
// </div>)
// }


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../Services/FetchNodeServices";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Checkbox, useMediaQuery } from "@mui/material";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
    carouselDots: {
        '& .slick-dots li.slick-active button:before': {
            color: '#fff',
            opacity: 1
        },
        '& .slick-dots li button::before': {
            fontSize: '7px',
            color: '#fff',
            opacity: 0.4
        },
        '& .slick-dots li': {
            margin: '2% -2px'
        }
    }
});

function ProductVerticalImageSlider(props) {
    const matches = useMediaQuery('(max-width:800px)')
    const matches_sm = useMediaQuery('(max-width:400px)')
    const classes = useStyles()
   const [pictureWhenClick,setPictureWhenClick]=useState('0')
    var settings = {
        dots: matches ? true : false,
        infinite: true,
        speed: 500,
        slidesToShow: matches ? 1 : 4,
        slidesToScroll: 1,
        focusOnSelect: false,
        arrows: matches ? false : true,
    }
    
    var data = props?.product?.picture.split(",")   //["ps1.webp", "ps2.webp", "ps3.webp", "ps4.webp", "ps5.webp"]
    const showSlider = () => {
        return data.map((item,index) => {
            return (<div onClick={()=>setPictureWhenClick(index)} style={{ width: '100%' }}>
                <img src={`${serverURL}/images/${item}`} style={{ borderRadius: '5px', border: matches ? '' : '0.5px solid #9A9A9A', transform: matches ? '' : 'rotate(-90deg)' }} width="90%" height="90%"></img>
            </div>)
        })
    }


    return (
        <div style={{ width: matches ? '95%' : '100%', display: 'flex', flexDirection: matches ? 'column' : 'row', position: matches ? 'none' : 'sticky', top: 65 }}>

            <div style={{ width: matches ? '100%' : '60%', transform: matches ? 'rotate(0deg)' : 'rotate(90deg)', marginLeft: matches ? '' : 'auto', marginRight: matches ? '' : '5%', marginTop: matches ? '' : '5%' }}>

                {matches ? <div style={{ width: '100%', display: 'flex', marginTop: '3%', backgroundColor: '' }}>
                    <div style={{ marginLeft: 'auto' }}><Checkbox style={{ color: '#fff' }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></div>
                    <div><ShareOutlinedIcon style={{ color: '#fff', marginLeft: '10px', marginTop: '10px' }} /></div>
                </div> : <></>
                }
                {/* { alert(data[2])} */}
                {matches ?
                    <></>
                    
                    : <div style={{ transform: matches ? 'none' : 'rotate(-90deg)', width: '100%', display: 'flex', justifyContent: 'right' }}>
                        <img src={`${serverURL}/images/${data[pictureWhenClick]}`} width="80%" height="80%" />
                    </div>
                }

                <div style={{ width: '100%', display: matches ? 'flex' : '', justifyContent: matches ? 'center' : '' }}>
                    <Slider {...settings} className={classes.carouselDots} style={{ width: matches ? '50%' : '' }}>
                        {showSlider()}
                    </Slider>
                </div>
            </div>

            {matches ? <></> : <div style={{ width: '15%', display: 'flex', marginTop: '3%' }}>
                <div><Checkbox style={{ color: '#fff'}} icon={<FavoriteBorder style={{fontSize:'2vw'}}/>} checkedIcon={<Favorite />} /></div>
                <div><ShareOutlinedIcon style={{ color: '#fff', marginLeft: '10px', marginTop: '10px',fontSize:'2vw' }} /></div>
            </div>
            }
        </div>
    )
}

export default ProductVerticalImageSlider