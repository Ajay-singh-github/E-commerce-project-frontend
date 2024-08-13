import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button, Avatar } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { getData,postData,serverURL } from "../Services/FetchNodeServices";
import Swal from 'sweetalert2'
import Heading from "./projectComponent/Headinga";

import categoryicon from '../../src/assets/category.png'

var useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: '500px',
        height: 'auto',
        padding: '1.5%',
        borderRadius: '10px'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default function Brands() {
    const useStyle = useStyles()
    const [brandName, setBrandName] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [logo, setLogo] = useState({ bytes: '', filename: '' })
    const [getErrors, setErrors] = useState({})
    const [categoryList, setCategoryList] = useState([])

    const fetchAllCategory = async () => {
        var result = await getData('category/fetch_display_data')
        setCategoryList(result.data)
    }
    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fillAllCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })

    }

    const handleReset = () => {
        setBrandName('')
        setCategoryId('')
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
        if (categoryId.length === 0) {
            error = true
            handleError('Please choose category', 'categoryId')
        }
        if (logo.filename.length === 0) {
            error = true
            handleError('Please select logo', 'logo')
        }
        return error
    }

    function handleLogo(event) {
        setLogo({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }


    const handleSumit = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('brandname', brandName)
            formData.append('logo', logo.bytes)
            formData.append('category', categoryId)
            var response = await postData('brands/submit_brand', formData)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Brand added sucessfully!',
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Brand not added!',
                    showConfirmButton: true
                })
            }
        }
    }


    return (
        <div className={useStyle.root}>
            <div className={useStyle.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Heading  image={categoryicon} caption="New Brand" link='/dashboard/displayallbrands' />
                    </Grid>
                    <Grid item xs={12} className={useStyle.center}>
                        <Button
                            style={{ display: 'flex', flexDirection: 'column' }}
                            onFocus={() => handleError('', 'logo')}
                            error={getErrors.logo}
                            onChange={handleLogo} component="label" fullWidth>
                            <input hidden type="file" accept="images/*" />
                            <Avatar src={logo.filename} style={{ width: 80, height: 80 }}>
                                <FolderIcon style={{ width: 40, height: 40 }} />
                            </Avatar>
                            Choose Brand Logo

                        </Button>

                    </Grid>
                    <Grid item xs={12}>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.logo}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={categoryId}
                                onFocus={() => handleError('', 'categoryId')}
                                error={getErrors.categoryId}
                                label="Category"
                                onChange={(event) => setCategoryId(event.target.value)}
                            >
                                {fillAllCategory()}
                            </Select>
                        </FormControl>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.categoryId}</p>

                    </Grid>


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


                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleSumit} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Add</Button>
                    </Grid>
                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleReset} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}