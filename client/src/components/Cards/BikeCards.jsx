import { Box, Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React from 'react'

function BikeCards() {
    return (
        <>
            <Box>
                <Card sx={{ maxWidth: 350 }}>
                    <CardHeader
                        title="Shrimp and Chorizo Paella"
                        subheader="model brand is duke"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://yorindia.com/backend/web/imageupload/PEUVgxVeyz0ZRLv-4BRBlhxrVj6cn8Rs.jpg"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body1" color="text">
                            fule type : petrol
                        </Typography>
                        <Typography variant="body1" color="text">
                            description : This impressive paella .
                        </Typography>
                        <Typography variant="body1" color="text">
                            Rent from : <b> <span style={{ color: 'black' }}>28/hr</span> </b>
                        </Typography>

                        <Button sx={{ mt: 2 }} fullWidth variant="contained">Book Now</Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default BikeCards
