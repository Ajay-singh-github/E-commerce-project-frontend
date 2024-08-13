/*import Header from "../Header";
import { useStyles } from "./ProjectCss";
import MainSlider from "./MailSlider";
import AddComponent from "../AddComponent";
export default function Home()
{   const classess=useStyles()
    return(<div className={classess.home_root}>
        <Header/>
        <div style={{display:'flex',justifyContent:'center'}}>
        <MainSlider />
        </div>
        <div style={{display:'flex',justifyContent:'center'}}> 
            <AddComponent/>
        </div>
    </div>)
}*/

import Header from "../Header";
import MainSlider from "./MainSlider";
import { useStyles } from "./ProjectCss";
import AddComponent from "../AddComponent";
import CircleComponent from "../CircleComponent";
import FestaComponent from "../FestadealComponent";
import ProductComponent from "../ProductComponent";
import { useEffect, useState } from "react";
import HighlightComponent from "../HighlighComponent";
import HighlightDoubleComponent from "../HighlighDoubleComponent";
import { getData,postData } from "../../../../Services/FetchNodeServices";
import MenuComponent from "../MenuComponent";
 
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TopBrand from "../TopBrand";
import Footer from "../Footer";

export default function Home()
{   const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [productsDeals,setProductsDeals]=useState([])
    const [banners,setBanners]=useState([])
    const [categories,setCategories]=useState([])
    const [brands,setBrands]=useState([])
    const fetchDeals=async()=>{
        var result=await postData('userinterface/display_all_products_by_status',{status:'Deal of the day'})
        setProductsDeals(result.data) 
       }

  
    const fetchBanners=async()=>{
        var result=await getData('userinterface/fetch_all_banner')
        setBanners((result.data[0].files).split(",")) 
        
       }

    const fetchCategories=async()=>{
        var result=await getData('userinterface/display_all_category')
        setCategories(result.data) 
       }

       const fetchBrands=async()=>{
        var result=await getData('userinterface/display_all_brands')
        setBrands(result.data) 
       }

      useEffect(function(){
        fetchBanners()
        fetchCategories()
        fetchBrands()
        fetchDeals()
      },[])

    return(<div className={classes.home_root}>
         <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <Header />
                {matches?<></>: <MenuComponent />}
            
        </div>
       
        <div style={{display:'flex',justifyContent:'center',marginTop:matches?<></>:15}} >
            <MainSlider banners={banners}/>
           
        </div>

       
 
        <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:5}}>
            <AddComponent/>
        </div>
        <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:20}}>
          <CircleComponent data={categories}/>
        </div>

        <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:20}}>
            <FestaComponent/>
           
        </div>

        <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:20}}>
            <ProductComponent data={productsDeals} title={"Deals Of The Day"}/>
           
        </div>

        <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:20}}>
            <HighlightComponent title={"Highlight Deals"}/>
           
        </div>

        
        <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:12}}>
            <HighlightDoubleComponent title={""}/>
           
        </div>

        <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:20}}>
          <TopBrand data={brands} title={'Top Brands'}/>
        </div>
      
         <div style={{marginTop:20}}>
            <Footer/>
         </div>
    </div>)
}