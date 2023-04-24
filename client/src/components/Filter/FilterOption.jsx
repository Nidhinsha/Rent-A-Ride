import { Box, Typography } from '@mui/material'
import React from 'react'
import FilterByBrand from './FilterByBrand'



function FilterOption({page}) {
    
  return (
    <>
    <Box>
        <Typography variant='h6' sx={{textAlign:'center'}}>Filter</Typography>
    <Box>
    <Box>
    <FilterByBrand page={page}/>
    </Box>
    </Box>
    </Box>
    </>
  )
}

export default FilterOption
