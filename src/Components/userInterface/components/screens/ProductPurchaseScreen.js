import ProductVerticalImageSlider from "../ProductVerticalImageSlider"
import { useStyles } from "./ProjectCss"
import Header from "../Header"
import ProductDescription from "../ProductDescription"
import BuyNow from "../BuyNow"
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material"
import { useState, useEffect } from "react"
import Specification from "../Specification"
import { useLocation } from "react-router-dom"  //eska use tab karte hai jab component se dusre componet ya screen par ja rahe hai navigate ke help se tab ek tarf se data dusri taraf
                                                // nhi mil rha hai props ke help se tab eska use kiya jaata hai paise to data props mai aa jaata hai.
  function ProductPurchaseScreen(props) {
    var location=useLocation() //jab aap ne kisi screen se dusri screen par navigation ke help se aa rahe hai to eski help se fetch kar sakte hai.
    // var product=location.state.product
    // console.log("in Purchase Screen product data by database:",product)
    const classes = useStyles()
    const matches = useMediaQuery('(max-width:800px)')
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'))
    const [down, setDown] = useState(false)
    const [product,setProduct]=useState(location.state.product)
       const [refresh,setRefresh]=useState(false)

    const listenToScroll = () => {
        const height = 20;
        const divElement = document.getElementById('scrolldiv');
        const scrollPosition = divElement.scrollTop;
        if (scrollPosition > 20) {
            setDown(true)
        }
        else {
            setDown(false)
        }
    }

    useEffect(() => {
        const scrollableDiv = document.getElementById('scrolldiv');
        scrollableDiv.addEventListener('scroll', listenToScroll);
        return () => {
            scrollableDiv.removeEventListener('scroll', listenToScroll);
        };
    }, [])
    return (
        <div className={classes.ProductPurchaseScreen_Root} id="scrolldiv">
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <Header />
            </div>

            <div className={classes.ProductScreen_Main_Box} style={{ flexDirection: matches ? 'column' : 'row' }}>
                <div className={classes.ProductPurchaseScreen_Left_Box} style={{ width: matches ? '100%' : '50%' }}>
                    <div style={{ width: '100%', display: matches ? 'flex' : '', justifyContent: matches ? 'center' : '' }}>
                        <ProductVerticalImageSlider  product={product}/>
                    </div>
                </div>

                <div className={classes.ProductPurchaseScreen_Right_Box} style={{ width: matches ? '100%' : '50%', display: matches ? 'flex' : '', justifyContent: matches ? 'center' : '' }}>
                    <ProductDescription setRefresh={setRefresh} refresh={refresh} setProduct={setProduct} product={product} />
                </div>
            </div>

            <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'3%'}}>
                <Specification />
            </div>
            {matches_sm?<></>:
            <div style={{marginTop:20}}>
            {/* <Footer/> */}
           </div>
             }
            {down ? <div style={{ width: '100%', position: 'sticky', bottom: 0,display:'flex' }}>
                <BuyNow />
            </div> : <></>
            }

           
        </div>
    )
}

export default ProductPurchaseScreen