import { makeStyles } from "@mui/styles"
import MaterialTable from "@material-table/core"
import { useEffect, useState } from "react"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button, Avatar, FormHelperText } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from "sweetalert2"
import { getData,postData,serverURL } from "../Services/FetchNodeServices"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles({
    productroot: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    productbox: {
        height: 'auto',
        width: '70%',
        background: '#f2f2f2',
        marginTop: 10
    },
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        height: 'auto',
        padding: 15,
        marginTop: 10
    }
})


function DisplayAllProducts() {
    const navigate = useNavigate()
    const classes = useStyles()
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [productId, setProductId] = useState('')

    const fetchAllProducts = async () => {
        var response = await getData('products/display_all_products')
        setProducts(response.data)
    }

    useEffect(function () {
        fetchAllProducts()
    }, [])



    ////////////////Product Edit Actions/////////////

    const [categoryId, setCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [brandId, setBrandId] = useState('')
    const [brandList, setbrandList] = useState([])
    const [productName, setProductName] = useState('')
    const [picture, setPicture] = useState({ bytes: '', filename: '' })
    const [errors, setErrors] = useState({})
    const [brandName, setBrandName] = useState('')
    const [brandinitial, setbrandinitial] = useState(true)
    const [statusButton, setStatusButton] = useState(false)
    const [tempPicture, setTempPicture] = useState('')

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
        var response = await postData('brands/fetch_brands_by_category', { categoryid: cid })
        setbrandList(response.data)
    }

    const handleCategoryChange = (event) => {
        setbrandinitial(false)
        setBrandId('')
        setBrandName('')
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
        setStatusButton(true)
    }

    const handleSubmit = async () => {
        var error = validation()
        if (error === false) {
            var body = { productname: productName, categoryid: categoryId, brandid: brandId, productid: productId }
            var response = await postData('products/edit_product', body)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product',
                    text: response.message,
                    toast: true
                })
                setOpen(false)
                fetchAllProducts()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'product',
                    text: response.message,
                    toast: true
                })
                setOpen(false)
                fetchAllProducts()
            }
        }
    }

    const validation = () => {
        var error = false
        if (categoryId.length === 0) {
            error = true
            handleError('*Please Select Category', 'categoryId')
        }
        if (brandId.length === 0) {
            error = true
            handleError('*Please Select Brand', 'brandId')
        }
        if (productName.length === 0) {
            error = true
            handleError('*Please Enter Product Name', 'productName')
        }
        if (picture.filename.length === 0) {
            error = true
            handleError('*Please Select Picture', 'picture')
        }
        return error
    }

    const handleError = (val, label) => {
        setErrors((prev) => ({ ...prev, [label]: val }))
    }

    const handleOpen = (rowData) => {
        fetchBrandByCategory(rowData.categoryid)
        
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setBrandId(rowData.brandid)
        setProductName(rowData.productname)
        setPicture({ bytes: '', filename: `${serverURL}/images/${rowData.picture}` })
       
        setTempPicture(`${serverURL}/images/${rowData.picture}`)
        setProductId(rowData.productid)
    }

    const handleCloseDialogue = () => {
        setOpen(false)
    }

    const fillinitialBrand = () => {
        return <MenuItem value={brandId}>{brandName}</MenuItem>
    }

    const handleEditPicture = async () => {
        setStatusButton(false)
        var formData = new FormData()
        formData.append('picture', picture.bytes)
        formData.append('productid', productId)
        var response = await postData('products/edit_product_picture', formData)
        if (response.status === true) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                toast: true
            })
            setOpen(false)
            fetchAllProducts()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: response.message,
                toast: true
            })
            setOpen(false)
            fetchAllProducts()
        }
    }

    const saveCancelButton = () => {
        return (<div>
            <Button onClick={handleEditPicture}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </div>)
    }

    const handleCancel = () => {
        setPicture({ filename: tempPicture, bytes: '' })
        setStatusButton(false)
    }

    const handleDelete=(rowData)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                var response = await postData('products/delete_product', { productid: rowData.productid })
                if (response.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your Record has been deleted.',
                        'success'
                    )
                    fetchAllProducts()
                }
                else
                {
                    Swal.fire(
                        'Failed!',
                        'Your Record has not been deleted.',
                        'error'
                    )
                }
            }
        })
    }
    /////////////////////////////////////////////////

    const productForm = () => {
        return (<div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={2}>

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
                                onFocus={() => handleError('', 'brandId')}
                                onChange={(event) => setBrandId(event.target.value)}
                            >
                                {brandinitial ? fillinitialBrand() : <></>}
                                {fillBrandItem()}
                            </Select>
                            <FormHelperText>{errors.brandId}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            value={productName}
                            error={errors.productName}
                            helperText={errors.productName}
                            fullWidth
                            size="small"
                            label="proudct Name"
                            onFocus={() => handleError('', 'productName')}
                            onChange={(event) => setProductName(event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {statusButton ?
                            saveCancelButton() : <FormControl fullWidth size="small" error={errors.picture}>
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    onFocus={() => handleError('', 'picture')}
                                >
                                    upload picture
                                    <input type="file" required hidden onChange={handlePicture} accept="images/*"></input>
                                </Button>
                                <FormHelperText>{errors.picture}</FormHelperText>
                            </FormControl>
                        }
                    </Grid>

                    <Grid item xs={5} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar src={picture.filename} style={{ width: 80, height: 80 }}></Avatar>
                    </Grid>

                </Grid>
            </div>
        </div>)
    }

    const showProductDialogue = () => {
        return (<div>
            <Dialog open={open}>
                <DialogTitle>
                    Edit Product
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {productForm()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={handleCloseDialogue}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>)
    }

    function Displayproduct() {
        return (<MaterialTable
            title="Simple Action Preview"
            columns={[
                { title: 'CategoryId/Category Name', render: (rowData) => <div>{rowData.categoryid}/{rowData.categoryname}</div> },
                { title: 'BranId/brand Name', render: (rowData) => <div>{rowData.brandid}/{rowData.brandname}</div> },
                { title: 'Product Name', field: 'productname' },
                { title: 'Picture', render: (rowData) => <Avatar src={`${serverURL}/images/${rowData.picture}`} ></Avatar> }
            ]}
            data={products}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit product',
                    onClick: (event, rowData) => handleOpen(rowData)
                },
                {
                    icon: 'delete',
                    tooltip: 'delete product',
                    onClick: (event, rowData) => handleDelete(rowData)
                },
                {
                    icon: 'add',
                    tooltip: 'Add product',
                    isFreeAction: true,
                    onClick: (event) => navigate("/dashboard/products")
                }
            ]}
        />
        )
    }

    return (<div className={classes.productroot}>
        <div className={classes.productbox}>
            {Displayproduct()}
            {showProductDialogue()}
        </div>
    </div>)
}

export default DisplayAllProducts