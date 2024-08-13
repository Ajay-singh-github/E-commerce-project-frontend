import { Button, Grid, TextField,Avatar, FormHelperText, Divider } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import { postData,serverURL } from "../Services/FetchNodeServices";
import Heading from "./projectComponent/Headinga";
import categoryicon from "../assets/category.png";
import Swal from "sweetalert2";

export default function Category()
{ 
     
    const [filecategory,setFileCategory]=useState({url:'',bytes:''})
    const [categoryname,setCategoryName]=useState()
    const [error,setError]=useState({error:'',message:''})
    const [fileerror,setFileError]=useState({error:'',message:''})

     const validation=()=>{
        var result=true
        if(!categoryname)
        {   setError({error:'True',message:'Enter Category Name'})
            
        }
        if(!filecategory.url)
        {
            setFileError({error:'True',message:'Upload Category Image'})
            
            return result=false
        }

        return result

     }

     const handleCorrectionError=()=>
     {
        setError({error:'',message:''})
     }

    const handleSubmit=async()=>
    {
        if(validation())
        {
        var formData=new FormData()  
        formData.append('categoryname',categoryname)
        formData.append('categoryfile',filecategory.bytes) 

        var result=await postData('category/submit_category',formData)
        if (result.status === true) {
         Swal.fire({
             icon: 'success',
             title: result.message,
             showConfirmButton: true
         })
     }
     else {
         Swal.fire({
             icon: 'error',
             title: 'Category not added!',
             showConfirmButton: true
         })
     }
        }
  
    }

    const handlefile=(event)=>{
        setFileError({error:'false',message:''})
      setFileCategory({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    return(<div style={{display:"flex",height:'100vh',width:'100vw',background:'#fff',justifyContent:'center',alignItems:"center"}}>
        <div style={{height:"auto",width:400,background:'#fff',borderRadius:10}}>
            <Grid container spacing={3} style={{padding:10}}>
            <Grid item xs={12}>
               <Heading image={categoryicon} caption="New Category" link='/dashboard/displayallcategory' />
            </Grid>
            
                 <Grid item xs={11.8}>
                    <TextField  placeholder="Category Name" fullWidth onChange={(event)=>setCategoryName(event.target.value)}     error={error?.error} helperText={error?.message} onFocus={handleCorrectionError} />
                 </Grid>
                 <Grid item xs={7}>
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth>
                  <input type="file" hidden accept="image/*"  multiple  onChange={handlefile}/>
                   Category Image
                  </Button>
                  <FormHelperText><div style={{color:"#eb4d4b",paddingLeft:15}}>{error?fileerror.message:<></>}</div></FormHelperText>
                 </Grid>

                 <Grid item xs={5} style={{paddingLeft:50}}>
                    <Avatar  variant="rounded" alt="Remy Sharp" src={filecategory.url} sx={{width:50,height:40}}/>

                 </Grid>
                 <Grid item xs={6}>
                    <Button component="label" variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
                 </Grid>

                 <Grid item xs={6}>
                    <Button component="label" variant="contained" fullWidth>Reset</Button>
                 </Grid>
            </Grid>
        </div>
        
    </div>)
}