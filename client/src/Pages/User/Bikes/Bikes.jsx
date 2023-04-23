import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import NavBar from '../../../components/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { userGetBikeAction } from '../../../Redux/Actions/userActions';
import Loading from '../../../components/Loading/Loading';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Box } from '@mantine/core';
import { userBikeSearchAction } from '../../../Redux/Actions/userActions';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import AllBikes from '../../../components/UserBikeList/AllBikes';
import PriceAscSortBikes from '../../../components/UserBikeList/PriceAscSortBikes';
import PriceDescSortBikes from '../../../components/UserBikeList/PriceDescSortBikes';
import Footer from '../../../components/Home/Footer/Footer';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// yup validation

const schema = yup.object().shape({
    search: yup
        .string("search term should be string")
        .required("searcg term is required")
})



function Bikes() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const bikes = useSelector((state) => state.userGetBikeReducer)
    const { bikesDataLoading, bikesData, bikesDataError } = bikes

    const handlePrev = () => {
        dispatch(userGetBikeAction(bikesData.pagination.currentPage - 1))
        setPage(bikesData.pagination.currentPage - 1)
    }

    const handleNext = () => {
        dispatch(userGetBikeAction(bikesData.pagination.currentPage + 1))
        setPage(bikesData.pagination.currentPage + 1)
    }

    useEffect(() => {
        dispatch(userGetBikeAction(page))
    },[dispatch, page])

    useEffect(() => {
        if(bikesData) {
          setPageCount(bikesData.pagination.pageCount)
        }
      },[bikesData])

    

    // const [searchTerm, setSearchTerm] = useState('')

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver:yupResolver(schema)
    })

    const submitHandler = async(data)=>{
        const search = data.search

        try {
            dispatch(userBikeSearchAction(search,page))
        } catch (error) {
            console.log('some error ocured in search');
        }
    }


    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 50 }}>
                <h1>Rent-A-Ride Bikes For You</h1>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Box component='form' onSubmit={handleSubmit(submitHandler)}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%' }}

                >
                    <TextField
                        label="Search"
                        name='search'
                        fullWidth

                        error={!!errors.search}
                        helperText={errors.search ? errors.search.message : ""}
                        {...register("search")}

                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <Button type='submit'>
                                <InputAdornment position="start" style={{ cursor: 'pointer' }} >
                                    <ImageSearchIcon  />
                                </InputAdornment>
                                </Button>
                            ),
                        }}
                    />
                </Box>
            </Box>


            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs aria-label="basic tabs example" value={value} onChange={handleChange} centered>
                        <Tab label="All Bikes" />
                        <Tab label="Low to High" />
                        <Tab label="High to Low" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <AllBikes allBikes={bikesData} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PriceAscSortBikes priceAsc={bikesData} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PriceDescSortBikes priceDesc={bikesData} />
                </TabPanel>
            </Box>
            {/* pagination */}
            <MDBPagination className='mb-0 '>
                {
                    page > 1 ? 
                    <MDBPaginationItem>
                        <MDBPaginationLink aria-label='Previous'>
                            <span aria-hidden='true' onClick={handlePrev}>« Prev</span>
                        </MDBPaginationLink>
                    </MDBPaginationItem> : ""
                }
                {
                    page === pageCount ? "" : 
                    <MDBPaginationItem>
                        <MDBPaginationLink aria-label='Next'>
                            <span aria-hidden='true' onClick={handleNext}>Next »</span>
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                }

            </MDBPagination>
            <Footer />
        </>
    )
}

export default Bikes