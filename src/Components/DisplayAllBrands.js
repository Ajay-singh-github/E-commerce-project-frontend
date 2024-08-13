import * as React from 'react';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { getData,postData,serverURL } from '../Services/FetchNodeServices';
import Swal from 'sweetalert2'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../App.css';

var useStyles = makeStyles({
    root: {
        marginLeft:'auto',
        marginTop:'auto',
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    displaybox: {
        width: '1200px',
        height: 'auto',
        padding: '0%',
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
        width: '500px',
        height: 'auto',
        padding: '0',
        borderRadius: '10px'
    }
})

export default function DisplayAllBrands() {
    const useStyle = useStyles()
    var navigate = useNavigate()
    const [getBrandsList, setBrandsList] = useState([])
    const [open, setOpen] = useState(false);
    const [brandName, setBrandName] = useState('')
    const [brandID, setBrandID] = useState('')
    const [logo, setLogo] = useState({ bytes: '', filename: '' })
    const [getErrors, setErrors] = useState({})
    const [getBtnStatus, setBtnStatus] = useState(false)
    const [getOldLogo, setOldLogo] = useState('')
    const [getCategoryList, setCategoryList] = useState([])
    const [categoryID, setCategoryID] = useState('')


    const fetchAllBrands = async () => {
        var response = await getData('brands/fetch_brands')
        setBrandsList(response.brandsData)
    }

    const fetchAllCategory = async () => {
        var response = await getData('category/fetch_display_data')
        setCategoryList(response.data)
    }

    const fillAllCategory = () => {
        return (
            getCategoryList.map((item, i) => {
                return (
                    <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
                )
            })
        )
    }
    useEffect(function () {
        fetchAllCategory()
        fetchAllBrands()
    }, [])


    const handleReset = () => {
        setBrandName('')
        setCategoryID('')
        setLogo({ bytes: '', filename: '' })
    }


    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (brandName.length === 0) {
            error = true
            handleError('Please enter brand name', 'brandName')
        }
        if (categoryID.length === 0) {
            error = true
            handleError('Please choose category', 'categoryName')
        }
        if (logo.filename.length === 0) {
            error = true
            handleError('Please select logo', 'logo')
        }
        return error
    }

    const handleLogo = (event) => {
        setLogo({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
        setBtnStatus(true)
    }


    const handleDataUpdate = async () => {
        var error = validation()
        if (error === false) {
            var body = { brandname: brandName, brandid: brandID, categoryid: categoryID }
            var response = await postData('brands/update_brand_data', body)
            if (response.status === true) {
                fetchAllBrands()
                Swal.fire({
                    icon: 'success',
                    title: 'Brand updated sucessfully!',
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Brand not updated!',
                    showConfirmButton: true
                })
            }
        }
    }

    const handleLogoUpdate = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('brandid', brandID)
            formData.append('logo', logo.bytes)
            var response = await postData('brands/update_brand_logo', formData)
            if (response.status === true) {
                setBtnStatus(false)
                fetchAllBrands()
                Swal.fire({
                    icon: 'success',
                    title: 'Logo updated sucessfully!',
                    showConfirmButton: true
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Logo not updated!',
                    showConfirmButton: true
                })
            }
        }
    }

    const handleLogoCancel = () => {
        setLogo({ filename: getOldLogo, bytes: '' })
        setBtnStatus(false)
    }

    const editBrand = () => {

        return (
            <div className={useStyle.root}>
                <div className={useStyle.box}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <h2 style={{ color: "black", margin: 0 }}>Brand: <font style={{ color: '#004cef' }}>{brandName}</font></h2>
                        </Grid>

                        <Grid item xs={12} className={useStyle.center}>
                            <Button
                                component="label"
                                onFocus={() => handleError('', 'logo')}
                                error={getErrors.logo}
                                onChange={handleLogo}
                                style={{ position: 'relative' }}
                            >
                                <div className={useStyle.center}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        background: 'white',
                                        position: 'absolute',
                                        zIndex: '2',
                                        right: '0',
                                        bottom: '0'
                                    }}>
                                    <CameraAltIcon style={{ color: 'black' }} />
                                </div>
                                <input hidden type="file" accept="images/*" />
                                <Avatar src={logo.filename} style={{ width: 100, height: 100 }} />
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.logo}</p>
                        </Grid>

                        {getBtnStatus ? <Grid container spacing={3} style={{ marginTop: '0' }}>
                            <Grid item xs={6} className={useStyle.right}>
                                <Button startIcon={<SaveIcon />} onClick={handleLogoUpdate} variant='outlined'>Update</Button>
                            </Grid>
                            <Grid item xs={6} className={useStyle.left}>
                                <Button startIcon={<SaveIcon />} onClick={handleLogoCancel} variant='outlined'>Cancel</Button>
                            </Grid>
                        </Grid>
                            : <></>}

                        <Grid item xs={12}>
                            <TextField
                                value={brandName}
                                error={getErrors.brandName}
                                helperText={getErrors.brandName}
                                onChange={(event) => setBrandName(event.target.value)}
                                onFocus={() => handleError('', 'brandName')}
                                label="Brand Name"
                                fullWidth />
                        </Grid>


                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    value={categoryID}
                                    label="Category"
                                    error={getErrors.categoryID}
                                    onChange={(event) => setCategoryID(event.target.value)}>
                                    {fillAllCategory()}
                                </Select>
                                <p style={{ color: '#d32f2f', fontSize: '12.3px', marginLeft: '15px', marginTop: '1%' }}>{getErrors.categoryID}</p>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} className={useStyle.center}>
                            <Button startIcon={<SaveIcon />} onClick={handleDataUpdate} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Update</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }


    const handleOpen = (rowData) => {
        setBrandID(rowData.brandid)
        setBrandName(rowData.brandname)
        setCategoryID(rowData.categoryid)
        setLogo({ filename: `${serverURL}/images/${rowData.logo}`, bytes: '' })
        setOpen(true)
        setOldLogo(`${serverURL}/images/${rowData.logo}`)
    }

    const handleDelete = (rowData) => {
        setBrandID(rowData.brandid)
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
                var body = { brandid: rowData.brandid }
                var response = await postData('brands/delete_brand', body)
                fetchAllBrands()
                Swal.fire(
                    'Deleted!',
                    'Brand has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const EditBrandDialog = () => {
        return (
            <div>
                <Dialog open={open}
                    onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            {editBrand()}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    function DisplayBrands() {
        return (
            <MaterialTable style={{
                marginTop: '0%'
            }}
                title="Brands List"
                columns={[
                    { title: 'Brand ID', field: 'brandid' },
                    { title: 'Brand Name', field: 'brandname' },
                    { title: 'Category', render: (rowData) => <div>{rowData.categoryid}/{rowData.categoryname}</div>},
                    { title: 'Logo', field: 'logo', render: (rowData) => <img src={`${serverURL}/images/${rowData.logo}`} style={{ width: '80px', height: '80px', borderRadius: '50%' }} /> }
                ]}
                data={getBrandsList}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Brand',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Brand',
                        onClick: (event, rowData) => handleDelete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add category',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/brands')
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
                        {DisplayBrands()}
                        {EditBrandDialog()}
                    </Grid>
                </Grid>
                <div>
                </div>
            </div>
        </div>
    )
}