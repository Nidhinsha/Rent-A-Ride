import React, { useEffect } from 'react'
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography } from '@mui/material'
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
        .required("searcg term is required")
})

function FilterByBrand({page}) {

    const dispatch = useDispatch()
    const brandsData = useSelector((state) => state.getBrandsReducer.brands)

    const [brand, setbrand] = React.useState('')

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const submitHandler = async (data) => {
        const brandValue = data.brand

        try {
            dispatch(getBikeWithBrandAction(brandValue,page))
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
            <Box component="form" onSubmit={handleSubmit(submitHandler)}>

                <FormControl fullWidth sx={{ m: 1, width: 300 }}>
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

                <Button variant='outlined' type='submit'>filter</Button>
            </Box>
        </>
    )
}

export default FilterByBrand
