import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button, Avatar, FormHelperText } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState, useEffect } from "react"
import Heading from "./projectComponent/Headinga";
import categoryicon from '../assets/category.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from "sweetalert2";
import { getData,postData,serverURL } from "../Services/FetchNodeServices";

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        height: 'auto',
        width: '40%',
        background: '#f2f2f2',
        padding: 15,
        marginTop: 10
    }
})
function Products() {
    const classes = useStyles()
    const [categoryId, setCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [brandId, setBrandId] = useState('');
    const [brandList, setbrandList] = useState([])
    const [productName, setProductName] = useState('')
    const [picture, setPicture] = useState({ bytes: '', filename: '' })
    const [errors, setErrors] = useState({})

    const fetchAllCategory = async () => {
        var response = await getData('category/fetch_display_data')
        setCategoryList(response.data)
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fillCategoryItem = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const fetchBrandByCategory = async (cid) => {
        var response = await postData('brands/fetch_brands_by_category', {categoryid: cid })
        setbrandList(response.data)
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value)
        fetchBrandByCategory(event.target.value)
    }

    const fillBrandItem = () => {
        return brandList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handlePicture = (event) => {
        setPicture({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }

    const handleSubmit = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('productname', productName)
            formData.append('picture', picture.bytes)
            formData.append('categoryid', categoryId)
            formData.append('brandid', brandId)

            var response = await postData('products/submit_products', formData)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product',
                    text: response.message,
                    toast: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'product',
                    text: response.message,
                    toast: true
                })
            }
        }
    }

    const validation = () => {
        var error = false
        if (categoryId.length === 0) {
            error = true
            handleError('*Please Select Category', 'categoryId')
        }
        if(brandId.length===0){
            error=true
            handleError('*Please Select Brand','brandId')
        }
        if(productName.length===0){
            error=true
            handleError('*Please Enter Product Name','productName')
        }
        if(picture.filename.length===0){
            error=true
            handleError('*Please Select Picture','picture')
        }
        return error
    }

    const handleError = (val, label) => {
        setErrors((prev)=>({ ...prev, [label]: val }))
    }

    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Heading caption="New Product" image={categoryicon} link="/dashboard/displayallproducts"></Heading>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth size="small" error={errors.categoryId}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={categoryId}
                            label="category"
                            onFocus={() => handleError('', 'categoryId')}
                            onChange={handleCategoryChange}
                        >
                            {fillCategoryItem()}
                        </Select>
                        <FormHelperText>{errors.categoryId}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth size="small" error={errors.brandId}>
                        <InputLabel>Brand</InputLabel>
                        <Select
                            value={brandId}
                            label="Brand"
                            onFocus={()=>handleError('','brandId')}
                            onChange={(event) => setBrandId(event.target.value)}
                        >
                            {fillBrandItem()}
                        </Select>
                        <FormHelperText>{errors.brandId}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        error={errors.productName}
                        helperText={errors.productName}
                        fullWidth
                        size="small"
                        label="proudct Name"
                        onFocus={()=>handleError('','productName')}
                        onChange={(event) => setProductName(event.target.value)}
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth size="small" error={errors.picture}>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            onFocus={()=>handleError('','picture')} 
                        >
                            upload picture
                            <input type="file" required hidden onChange={handlePicture} accept="images/*"></input>
                        </Button>
                        <FormHelperText>{errors.picture}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar src={picture.filename}></Avatar>
                </Grid>

                <Grid item xs={6}>
                    <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button fullWidth variant="contained">Reset</Button>
                </Grid>

            </Grid>
        </div>
    </div>)
}

export default Products