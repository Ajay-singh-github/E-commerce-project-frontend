import { Accordion, AccordionDetails, AccordionSummary, Divider} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { getData, postData } from "../../../Services/FetchNodeServices";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function SideFilterComponent({onDataSend})
{   
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [checked, setChecked] = useState();
    const [category,setCategory]=useState([])
    const [brand,setBrand]=useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    

    const fetchcategory=async()=>{
      var result = await getData("userinterface/display_all_category")
      setCategory(result.data)
    }

    const fetchbrands=async()=>{
      var result = await getData("userinterface/display_all_brands")
      setBrand(result.data)
    }
    
    useEffect(function(){
     fetchcategory()
     fetchbrands()
    },[])

    const handleCategoryChange = (categoryId) => {
      setSelectedCategories((prevSelected) => {
        if (prevSelected.includes(categoryId)) {
          return prevSelected.filter((id) => id !== categoryId);
        } else {
          return [...prevSelected, categoryId];
        }
      });
    };

    useEffect(() => {
      const fetchFilteredData = async () => {
        var result = await postData("userinterface/display_all_category_by_filter", { categories: selectedCategories});
        onDataSend(result?.data)
        setFilteredData(result?.data);
        
      };
  
      if (selectedCategories.length > 0) {
        fetchFilteredData();
      } else {
        setFilteredData([]);
      }
    }, [selectedCategories]);


    const showcategory=()=>{
      return category.map((item)=>{
        return(<div style={{marginTop:"8px"}}>
          <div style={{display:"inline-block"}}><input type="checkbox"  onChange={() => handleCategoryChange(item.categoryid)}
    
     style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> {item.categoryname}</div>
          </div>)
      }) 
    }

    const showbrands=()=>{
      return brand.map((item)=>{
        return ( <div style={{marginTop:"8px"}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
     style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> {item.brandname} </div>
          </div>)
      })
    }
    return(<div style={{maxWidth:"100%",background:'black',height:"100vh",color:"white",overflow:'auto',scrollbarWidth:"none",paddingLeft:matches?"20px":"50px",paddingRight:matches?"10px":"30px",display:'inline-block'}}>
        <div style={{fontWeight:"bold",marginTop:"20px",marginBottom:"10px",letterSpacing:"1px"}}>SORT BY</div>
        
        
        <div> <Accordion style={{borderRadius:"10px 10px 10px 10px",background:"black"}}>
            <div style={{border:"2px solid white",background:"black",color:"white"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:"white"}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
          style={{fontWeight:"bold"}}
        >
          Features
            </AccordionSummary>
            </div>
            <AccordionDetails style={{background:"black",color:'white',marginTop:"30px"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
            </Accordion> </div> 

            <div style={{textTransform:"uppercase",fontWeight:"bold",marginTop:"40px",letterSpacing:"1px"}}>
                Filter BY
                
            </div>
            <div style={{height:"1px",width:"100%",background:"#a8a4a3",borderRadius:"10px 10px 10px 10px",marginTop:"20px"}}></div>
            

            <div style={{marginLeft:'-15px',marginTop:"20px"}}>
            <Accordion defaultExpanded style={{background:'black',color:'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          CATEGORIES
        </AccordionSummary>
        <AccordionDetails>
          {showcategory()}



           {/* <div style={{marginTop:"10px"}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
    style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> Inverter ACs</div>
    </div>

    <div style={{marginTop:"10px"}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
    style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> 3 Star ACs</div>
    </div>


    <div style={{marginTop:"10px"}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
    style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> 5 Start ACs</div>
    </div> */}
         
        </AccordionDetails>
       
      </Accordion>
             </div>




             <div style={{marginLeft:'-15px',marginTop:"20px"}}>
            <Accordion defaultExpanded style={{background:'black',color:'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}
          aria-controls="panel3-content"
          id="panel3-header"
        >
        Price
        </AccordionSummary>
        <AccordionDetails>
          <div style={{marginBottom:matches?"40px":''}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
     style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> 30,001 - 40,000</div>
          </div>



           <div style={{marginTop:"10px",marginBottom:matches?"40px":''}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
    style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> 40,001 - 50,000</div>
    </div>

    <div style={{marginTop:"10px",marginBottom:matches?"40px":''}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
    style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> 50,001 - 60,000</div>
    </div>


    <div style={{marginTop:"10px"}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
    style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> 60,001 - 70,000</div>
    </div>
         
        </AccordionDetails>
       
      </Accordion>
             </div>






             <div style={{marginLeft:'-15px',marginTop:"20px",marginBottom:'70px'}}>
            <Accordion defaultExpanded style={{background:'black',color:'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          BRAND
        </AccordionSummary>
        <AccordionDetails>
         {showbrands()}



           {/* <div style={{marginTop:"10px"}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
    style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> O General</div>
    </div>

    <div style={{marginTop:"10px"}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
    style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> Daikin</div>
    </div>


    <div style={{marginTop:"10px"}}>
          <div style={{display:"inline-block"}}><input type="checkbox" 
    
    style={{cursor:"pointer" ,transform:"scale(1.5)"}}/></div><div style={{display:"inline-block",position:"absolute",marginLeft:"20px"}}> Haier</div>
    </div> */}
         
        </AccordionDetails>
       
      </Accordion>
             </div>
    </div>)
}