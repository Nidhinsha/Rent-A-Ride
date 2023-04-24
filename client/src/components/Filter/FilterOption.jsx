import { Box, Typography } from '@mui/material'
import React from 'react'
import FilterByBrand from './FilterByBrand'



function FilterOption() {
    
  return (
    <>
    <Box >
        <Typography variant='h6' sx={{textAlign:'center'}}><b> Filter</b></Typography>
    <Box>
    <Box>
    <FilterByBrand/>
    </Box>
    </Box>
    </Box>
    </>
  )
}

export default FilterOption
