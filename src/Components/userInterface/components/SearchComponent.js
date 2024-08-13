import { TextField,InputAdornment } from "@mui/material";
import Search from '@mui/icons-material/Search'
import { useState } from "react";
import { postData } from "../../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
export default function SearchComponent(props)
{   
    var navigate = useNavigate()
    const [text,setText]=useState('')
    const fetchRecord=async()=>{
    //   var body={"text":text}
    // var result = await postData('userinterface/product_filter',body)
    // alert(result.status)
    // navigate('/filterscreen')



    try {
      const body = { text: text.trim() };
      const result = await postData('userinterface/product_filter', body); // Assuming postData is a function that handles POST requests
      
      console.log("i am checking data in filter component:",result)
      if (result.status) {
        
        navigate('/filterscreen',{state:{data:result}}); // Assuming navigate is a function to navigate to another screen
      } else {
        alert("Error fetching data");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Error fetching data");
    }
    }


    const handleKeyDown = (e) => {
      
      if(text.length>0){
      if (e.key === 'Enter') {
        // alert(e.key)
        fetchRecord();
      
      }
    }
    };

   return(<div style={{display:'flex',background:'#fff',width:'70%',height:40,paddingLeft:10,paddingRight:10,borderRadius:3,alignItems:'center'}}>
        <TextField
  hiddenLabel
  placeholder="What you are looking for?" 
 
  variant="standard"
  size="small"
  fullWidth
 
  InputProps={{
    disableUnderline: true,
    endAdornment: (
      <InputAdornment position="end">
        <Search onClick={fetchRecord}/>
      </InputAdornment>
    ),
  }}
  onChange={(e)=>setText(e.target.value)}
  onKeyDown={handleKeyDown}
/>
    </div>)


}