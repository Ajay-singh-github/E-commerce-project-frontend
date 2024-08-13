import { makeStyles } from "@mui/styles"
import { Grid,Button} from "@mui/material"
import { DropzoneArea } from "material-ui-dropzone"
import { useState } from "react"
import Heading from "./projectComponent/Headinga"
import categoryicon from "../assets/category.png"
import { getData,postData,serverURL } from "../Services/FetchNodeServices"
import Swal from "sweetalert2"


const useStyles = makeStyles({
    bannerRoot: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    bannerBox: {
        height: 'auto',
        width: '50%',
        background: '#f2f2f2',
        marginTop:10,
        padding:10,
        borderRadius:10
    }
})

function Banner() {
    const classes = useStyles()
    const [files, setFiles] = useState([])

    const handleSubmit=async ()=>{
        var formData=new FormData()
        files.map((file,index)=>{
            formData.append("file"+index,file)
        })
        var response=await postData('banner/submit_banner',formData)
        if(response.status===true){
            Swal.fire({
                icon:'success',
                title:response.message,
                toast:true
            })
        }
        else{
            Swal.fire({
                icon:'error',
                title:response.message,
                toast:true
            })
        }
    }

    return (
        <div className={classes.bannerRoot}>
            <div className={classes.bannerBox}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Heading caption={"Add Banner"} image={categoryicon} link="/displayallbanner"/>
                </Grid>
                <Grid item xs={12}>
                    <DropzoneArea
                        filesLimit={7}
                        onChange={(files) => setFiles(files)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
                </Grid>
            </Grid>
            </div>
        </div>)
}

export default Banner