import React, { useEffect } from 'react'
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { getBikeWithBrandAction, getBrandsAction } from '../../Redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const schema = yup.object().shape({
    brand: yup
        .string("brand term should be string")
        .required("search term is required"),
    color:yup
        .string("colorshould be string")
})

function FilterByBrand({page}) {

    const dispatch = useDispatch()
    const brandsData = useSelector((state) => state.getBrandsReducer.brands)

    const [brand, setbrand] = React.useState('')
    const [color,setColor] = React.useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const submitHandler = async (data) => {
        const brandValue = data.brand
        let colorValue = data.color
        if (colorValue === '') {
            colorValue = null
        }

        try {
            dispatch(getBikeWithBrandAction(brandValue,colorValue,page))
        } catch (error) {
            console.log('some error ocured in bike brand bike listing');
        }
    }

    useEffect(() => {
        dispatch(getBrandsAction())
    }, [])


    return (
        <>

            <Typography variant='h6' sx={{ textAlign: 'center' }}>Filter by Brands</Typography>
            <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{mt:3}}> 
            <TextField 
                fullWidth
                id="standard-basic"
                label="Enter Color"
                variant="outlined"
                name='color'
                onChange={(e)=>setColor(e.target.value)}
                error={!!errors.color}
                helperText={errors.color ? errors.color.message : ""}
                {...register("color")}
                sx={{mb:2}}
            />
            <Box>

                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Brands</InputLabel>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brand}
                        label="Brand"
                        name='brand'
                        onChange={(event) => setbrand(event.target.value)}
                        MenuProps={MenuProps}
                        error={!!errors.brand}
                        helperText={errors.brand ? errors.brand.message : ""}
                        {...register("brand")}
                    >
                        {brandsData ? brandsData.map((b, index) => (
                            <MenuItem key={index} value={b} onClick={() => setbrand(b)}>
                                {b}
                            </MenuItem>
                        )
                        ) : "No Data"
                        }
                    </Select>

                </FormControl>
                <Button 
                variant='contained' 
                type='submit'
                sx={{mt:2}}
                >filter</Button>
            </Box>
            </Box>
        </>
    )
}

export default FilterByBrand
