import * as React from 'react';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { getData,postData,serverURL } from '../Services/FetchNodeServices';
import Swal from 'sweetalert2'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {DropzoneArea} from 'material-ui-dropzone'
import Heading from './projectComponent/Headinga';
import categoryicon from '../../src/assets/category.png'
import '../App.css';

var useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    displaybox: {
        width: '1200px',
        height: 'auto',
        padding: '1.5%',
        borderRadius: '10px'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
    },
    right: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
    },
    box: {
        width: '700px',
        height: 'auto',
        padding: '1.5%',
        borderRadius: '10px'
    }
})

export default function DisplayAllProductDetails() {
    const useStyle = useStyles()
    var navigate = useNavigate()

    const [productName, setProductName] = useState('')
    const [open, setOpen] = useState(false);
    const [openPicture, setOpenPicture] = useState(false);
    const [productId, setProductId] = useState('')
    const [productDetailsId, setProductDetailsId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [brandName, setBrandName] = useState('')
    const [picture, setPicture] = useState({ bytes: '', filename: '' })
    const [getErrors, setErrors] = useState({})
    
    const [getOldPicture, setOldPicture] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [brandsList, setBrandsList] = useState([])
    const [modelno, setModelno] = useState('')
    const [color, setColor] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [stock, setStock] = useState('')
    const [status, setStatus] = useState('')
    const [hsnCode, setHsnCode] = useState('')
    const [productsList, setProductsList] = useState([])
    const [productDetailsList, setProductDetailsList] = useState([])
    const [files,setFiles]=useState([])

    const handleQuill = (newValue) => {
        setDescription(newValue)
        if (description.trim() !== '') {
            handleError('', 'description');
        }
    }

    const [value, setValue] = useState('');

    const fetchAllProductDetails = async () => {
        var result = await getData('productdetails/fetch_product_details')
        setProductDetailsList(result.data)
    }

    const fetchAllProducts = async () => {
        var result = await getData('products/display_all_products')
        setProductsList(result.data)
    }

    const fetchAllCategory = async () => {
        var response = await getData('category/fetch_display_data')
        setCategoryList(response.data)
    }

    const fillAllCategory = () => {
        return (
            categoryList.map((item, i) => {
                return (
                    <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
                )
            })
        )
    }

    const fetchBrandByCategory = async (cid) => {
        var body = { 'categoryid': cid }
        var result = await postData('brands/fetch_brands_by_category', body)
        setBrandsList(result.data)
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value)
        fetchBrandByCategory(event.target.value)
    }

    const fillBrands = () => {
        return brandsList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })

    }

    const fetchProductsByBrands = async (cid,bid) => {
        var body = { 'brandid': bid,categoryid:cid }
        var result = await postData('products/fetch_products_by_brands', body)
        setProductsList(result.data)
    }

    const handleBrandChange = (event) => {
        setBrandId(event.target.value)
        fetchProductsByBrands(event.target.value)
    }

    const fillProducts = () => {
        return productsList.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    useEffect(function () {
        fetchAllCategory()
        fetchAllProducts()
        fetchAllProductDetails()
    }, [])


    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = true
        if (!brandId) {
            error = false
            handleError('Please choose brand', 'brandId')
        }
        if (!productId) {
            error = false
            handleError('Please choose product', 'productId')
        }
        if (!categoryId) {
            error = false
            handleError('Please choose category', 'categoryId')
        }
        if (!modelno) {
            error = false
            handleError('Please enter Model no', 'modelno')
        }
        if (!stock) {
            error = false
            handleError('Please enter stock', 'stock')
        }
        if (!color) {
            error = false
            handleError('Please enter color', 'color')
        }
        if (!status) {
            error = false
            handleError('Please choose status', 'status')
        }
        if (!price) {
            error = false
            handleError('Please enter price', 'price')
        }
        if (!hsnCode) {
            error = false
            handleError('Please enter hsn code', 'hsnCode')
        }
        if (!offerPrice) {
            error = false
            handleError('Please enter offer price', 'offerPrice')
        }
        if (!description) {
            error = false
            handleError('Please enter description', 'description')
        }
        if (!picture.filename.url) {
            error = false
            handleError('Please select picture', 'picture')
        }
        return error
    }

    const handlePicture = (event) => {
        setPicture({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
       
    }


    const handleDataUpdate = async () => {
        
        var error = validation()
       
        if (error === false) {
            var body = { 'productdetailsid': productDetailsId, 'brandid': brandId, 'categoryid': categoryId, 'productid': productId, 'description': description, 'modelno': modelno, 'color': color, 'stock': stock, 'price': price, 'offerprice': offerPrice, 'status': status, 'hsncode': hsnCode }
            var response = await postData('productdetails/update_productdetails_data', body)
            if (response.status === true) {
                fetchAllProductDetails()
                Swal.fire({
                    icon: 'success',
                    title: 'Product Details updated sucessfully!',
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Product Details not updated!',
                    showConfirmButton: true
                })
            }
        }
    }

    const handlePictureUpdate = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('productdetailsid', productDetailsId)
            formData.append('picture', picture.bytes)
            var response = await postData('productdetails/update_product_details_picture', formData)
            if (response.status === true) {
               
                fetchAllProductDetails()
                Swal.fire({
                    icon: 'success',
                    title: 'Picture updated sucessfully!',
                    showConfirmButton: true
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Picture not updated!',
                    showConfirmButton: true
                })
            }
        }
    }

    const handlePictureCancel = () => {
        setPicture({ filename: getOldPicture, bytes: '' })
         
    }
    const handleOpenPicture=(rowData)=>{
        setProductDetailsId(rowData.productdetailsid)
        var pictures=rowData.picture.split(",").map((item)=>{

            return `${serverURL}/images/${item}`
        })
        setFiles(pictures)
        setOpenPicture(true)
    }
    const handlePictureClose=()=>{
      setOpenPicture(false)

    }
    const handleOpen = (rowData) => {
        fetchBrandByCategory(rowData.categoryid)
        fetchProductsByBrands(rowData.categoryid,rowData.brandid)
        setModelno(rowData.modelno)
        setColor(rowData.color)
        setDescription(rowData.description)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setStock(rowData.stock)
        setStatus(rowData.status)
        setHsnCode(rowData.hsncode)
        setProductDetailsId(rowData.productdetailsid)
        setProductId(rowData.productid)
        setBrandId(rowData.brandid)
        setCategoryId(rowData.categoryid)
        setProductName(rowData.productname)
       
     
        setOpen(true)
    
    }

    const editProduct = () => {

        return (
            <div className={useStyle.root}>
                <div className={useStyle.box}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Heading image={categoryicon} caption="Edit Product Details" link='' /> 
                        </Grid>
                          
                          <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categoryId}
                                    onFocus={() => handleError('', 'categoryId')}
                                    error={getErrors.categoryId}
                                    label="Category"
                                    onChange={handleCategoryChange}
                                >
                                    {fillAllCategory()}
                                </Select>
                            </FormControl>
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.categoryId}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Brands</InputLabel>
                                <Select
                                    value={brandId}
                                    onFocus={() => handleError('', 'brandId')}
                                    error={getErrors.brandId}
                                    label="Category"
                                    onChange={handleBrandChange}
                                >
                                    {fillBrands()}
                                </Select>
                            </FormControl>
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.brandId}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Product</InputLabel>
                                <Select
                                    value={productId}
                                    onFocus={() => handleError('', 'productId')}
                                    error={getErrors.productId}
                                    label="Product"
                                    onChange={(event) => setProductId(event.target.value)}
                                >
                                    {fillProducts()}
                                </Select>
                            </FormControl>
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.brandId}</p>
                        </Grid>


                        <Grid item xs={4}>
                            <TextField
                                value={modelno}
                                error={getErrors.modelno}
                                helperText={getErrors.modelno}
                                onChange={(event) => setModelno(event.target.value)}
                                onFocus={() => handleError('', 'modelno')}
                                label="Model No."
                                fullWidth />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                value={color}
                                error={getErrors.color}
                                helperText={getErrors.color}
                                onChange={(event) => setColor(event.target.value)}
                                onFocus={() => handleError('', 'color')}
                                label="Color"
                                fullWidth />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                value={stock}
                                error={getErrors.stock}
                                helperText={getErrors.stock}
                                onChange={(event) => setStock(event.target.value)}
                                onFocus={() => handleError('', 'stock')}
                                label="Stock"
                                fullWidth />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={price}
                                error={getErrors.price}
                                helperText={getErrors.price}
                                onChange={(event) => setPrice(event.target.value)}
                                onFocus={() => handleError('', 'price')}
                                label="Price"
                                fullWidth />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={offerPrice}
                                error={getErrors.offerPrice}
                                helperText={getErrors.offerPrice}
                                onChange={(event) => setOfferPrice(event.target.value)}
                                onFocus={() => handleError('', 'offerPrice')}
                                label="Offer Price"
                                fullWidth />
                        </Grid>

                        <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                
                                
                                label="Status"
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <MenuItem value={'Offer'}>Offer</MenuItem>
                                <MenuItem value={'Festival Deals'}>Festival Deals</MenuItem>
                                <MenuItem value={'Deal of the day'}>Deal of the day</MenuItem>
                                <MenuItem value={'Festive Deals'}>Festive Deals</MenuItem>
                                <MenuItem value={'Sale'}>Sale</MenuItem>
                                <MenuItem value={'Trending'}>Trending</MenuItem>
                                <MenuItem value={'New Arrival'}>New Arrival</MenuItem>
                                <MenuItem value={'Discontinue'}>Discontinue</MenuItem>

                            </Select>
                        </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={hsnCode}
                                error={getErrors.hsnCode}
                                helperText={getErrors.hsnCode}
                                onChange={(event) => setHsnCode(event.target.value)}
                                onFocus={() => handleError('', 'hsnCode')}
                                label="HSN Code"
                                fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <ReactQuill theme="snow" value={description} onChange={handleQuill} />
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.description}</p>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    const handleDelete = (rowData) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#004cef',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { 'productdetailsid': rowData.productdetailsid }
                var response = await postData('productdetails/delete_product_details', body)
                fetchAllProductDetails()
                Swal.fire(
                    'Deleted!',
                    'Product Details has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };


    const editPictureDialog = () => {
        return (
            <div>
                <Dialog open={openPicture}
                    maxWidth={'lg'}
                    onClose={handleClose}>
                    <DialogContent>
                    <DropzoneArea
acceptedFiles={['image/*']}
dropzoneText={"Drag and drop an image here or click"}
onChange={(files) => setFiles(files)}
filesLimit={7}
initialFiles={files}
fullWidth


/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDataUpdate}>Update</Button>
                        <Button onClick={handlePictureClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }





    const editProductDialog = () => {
        return (
            <div>
                <Dialog open={open}
                    maxWidth={'lg'}
                    onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            {editProduct()}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDataUpdate}>Update</Button>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    const displayProducts = () => {
        return (
            <MaterialTable style={{
                marginTop: '3%'
            }}
                title="Products Details List"
                columns={[
                    { title: 'Product Id', field: 'productid' },
                    { title: 'Product Name', field: 'productname' },
                    { title: 'Category', render: (rowData) => <div>{rowData.categoryid}/{rowData.categoryname}</div> },
                    { title: 'Brand', render: (rowData) => <div>{rowData.brandid}/{rowData.brandname}</div> },
                    { title: 'Product Details', render: (rowData) => <div>{rowData.productdetailsid}/{rowData.modelno}</div> },
                    { title: 'Price', render: (rowData) => <div>{rowData.price}</div> },
                    { title: 'Offer Price', render: (rowData) => <div>{rowData.offerprice}</div> },
                    { title: 'Color', render: (rowData) => <div>{rowData.color}</div> },
                    { title: 'Stock', render: (rowData) => <div>{rowData.stock}</div> },
                    { title: 'Status', render: (rowData) => <div>{rowData.status}</div> },




                   
                ]}
                data={productDetailsList}

                actions={[
                    {
                        icon: 'photooutlined',
                        tooltip: 'Edit Picture',
                        onClick: (event, rowData) => handleOpenPicture(rowData)
                    },
                  
                    {
                        icon: 'edit',
                        tooltip: 'Edit Product',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Product',
                        onClick: (event, rowData) => handleDelete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Product',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/productdetails')
                    }

                ]}
            />
        )
    }


    return (
        <div className={useStyle.root}>
            <div className={useStyle.displaybox}>
                <Grid container spacing={3}>
                    <Grid item xs={12}
                        style={{
                            borderRadius: '20px',
                            width: '100%'
                        }}
                    >
                        {displayProducts()}
                        {editProductDialog()}
                        {editPictureDialog()}
                    </Grid>
                </Grid>
                <div>
                </div>
            </div>
        </div>
    )
}