import MaterialTable from "@material-table/core"
import { getData, postData, serverURL } from "../Services/FetchNodeServices"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import categoryimg from '../assets/category.png';
import { Avatar, Button, Grid, TextField } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from "sweetalert2";

var useStyles=makeStyles({
  reportroot:{
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'center'
  },
  reportbox:{
    width:900,
    height:'auto',
    background:'#f1f2f6',
    padding:10,
    margin:10,
    borderRadius:10
 },
 center:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
 },
 right:{
  display:'flex',
  justifyContent:'right',
  alignItems:'center'
},
 box:{
  width:500,
  height:'auto',
  
  padding:0,
  margin:0,
  borderRadius:10
},


})


export default function DisplayAllCategory()
{
  var classes=useStyles()
  var navigate = useNavigate()
    const [alldata,setAllData]=useState([])
    const [filecategory,setFileCategory]=useState({url:'',bytes:''})
    const [open,setOpen]=useState(false)
    const [tempPicture,setTempPicture]=useState('')
    const [categoryName,setCategoryName]=useState('')
    const [statusBtn,setStatusBtn]=useState(false)
    const [categoryid,setCategoryId]=useState()
    const [btn,setBtn]=useState()

    const categorydata=async()=>{
       const result=await getData('category/fetch_display_data')
       setAllData(result.data)
    }

  useEffect(function(){
    categorydata()
  },[])

  const handleOpen=(rowData)=>{
    setCategoryId(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setFileCategory({url:`${serverURL}/images/${rowData.image}`,bytes:''})
    setTempPicture(`${serverURL}/images/${rowData.image}`)

    setOpen(true)
 }

 const handleDeleteCategory=async(rowData)=>
 {
  
 
  Swal.fire({
    title: 'Do you want to delete the record?',
    showDenyButton: true,
    confirmButtonText: 'Delete',
    denyButtonText: `Don't Delete`,
    
  }).then(async(result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      var body={categoryid:rowData.categoryid}
      var result=await postData("category/delete_category",body)
       if(result.status)      
       {      
        Swal.fire('Deleted!', '', result.message)
        {categorydata()}
       }
       else
       Swal.fire('Fail!', '', result.message)

    } else if (result.isDenied) {
      Swal.fire('Category not Delete', '', 'info')
    }
  })
 }


 const handleSubmit=async()=>
 {
    var body={categoryname:categoryName,categoryid:categoryid}
    var result=await postData('category/update_category',body)
    if(result.status)
   {  
   Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: result.message,
    showConfirmButton: false,
    timer: 1500
  })

  }
 }

 const handleCancelSolve=()=>
 {
  setFileCategory({url:tempPicture})
  setBtn(false)
 }
 
 const handledaipicture=async()=>
 {
   var formData=new FormData()
   formData.append('filecategory',filecategory.bytes)
   formData.append('categoryid',categoryid)
   var result=await postData('category/update_picture',formData)
   if(result.status)
   {  setBtn(false)
   Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: result.message,
    showConfirmButton: false,
    timer: 1500
  })

  }

 }

 const optionButton=()=>
 {
  return(<div style={{display:"flex",justifyContent:"space-between"}}>
  
   <Button style={{marginRight:15}}  onClick={handleCancelSolve}>Cancel</Button><Button onClick={handledaipicture}>Update</Button></div>)
 }


 const handleEditPicture=(event)=>
 {
    setFileCategory({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtn('True')
 }

const handleClose=()=>
{
    setOpen("")
}

 const categoryForm=()=>{
  return(
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.right} >
          
               

          </Grid>

          <Grid item xs={12}>
             <TextField placeholder="Category Name" value={categoryName} label="Category Name" fullWidth onChange={(event)=>setCategoryName(event.target.value)}/>
          </Grid>

          <Grid item xs={12}>
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} >
                  <input type="file" hidden accept="image/*"  multiple  onChange={handleEditPicture} />
                   Category Image
                  </Button>
                  
                 </Grid>
                 <Grid item xs={5} >
                   <div style={{display:"flex"}}> <Avatar  variant="rounded" alt="Remy Sharp" src={filecategory.url} sx={{width:50,height:40,marginLeft:5}}/>
                   <div style={{marginLeft:5}}>{btn?optionButton():<></>}</div></div>
                 </Grid>
                
        </Grid>
      </div>
    )}


 const showCategoryDialog=()=>{
     return(
        <Dialog open={open}>
        <DialogTitle>
        Update Category
        </DialogTitle>
        <DialogContent>
        {categoryForm()}
        </DialogContent>
        <DialogActions>
    
        <Button onClick={handleSubmit}>Edit Data</Button>  
        <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        </Dialog>

     )

   }

  function Displacategory()
  { 
    return(<div style={{marginRight:"50px",marginLeft:"0px"}}><MaterialTable
      title={<div style={{display:'flex',flexDirection:'row'}}>
      <div>
          <img src={categoryimg} width="25"/>
      </div>
      <div style={{fontFamily:'dosis',fontSize:18,fontWeight:'bold',paddingLeft:5}}>
          Category List
  
      </div>
      </div>}
      columns={[ 
        {title: 'Category Id',field:'categoryid'},
        { title: 'Category Name', field: 'categoryname' },
        { },
        { title: 'Picture',render:rowData=><><div><img src={`${serverURL}/images/${rowData.image}`} style={{height:40,width:40}}/></div></>},
        
      ]}
      data={alldata}        
      actions={[
        {
          icon: 'edit',
          tooltip: 'Save User',
          onClick: (event, rowData) => handleOpen(rowData)
        },
        {
          icon: 'delete',
          tooltip: 'Delete Category',
          onClick: (event, rowData) =>handleDeleteCategory(rowData)        },
        {
          icon: 'add',
          tooltip: 'Add Category',
          isFreeAction:true,
          onClick: (event, rowData) => navigate('/dashboard/Category')
        },
        { },{ },
      ]}
    /></div>)
  }
    
    return(<div style={{height:'100vh',width:'100vw',display:'flex',background:'#fff',alignItems:"center"}}>
        <div style={{height:"auto",width:'90%',background:'#fff',borderRadius:15,paddingLeft:50,paddingRight:150}}>
         {Displacategory()}
         {showCategoryDialog()}
        </div>
    </div>)
}