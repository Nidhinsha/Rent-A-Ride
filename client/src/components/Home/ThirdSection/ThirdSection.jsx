import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import React from 'react'

function ThirdSection() {
    return (
        <Container sx={{ mt: 4 }}>
            <Box >
                <Typography variant="h5" textAlign='center'>Why Choose Us</Typography>
            </Box>
            <Container maxWidth="lg" sx={{ display: 'flex' }}>
                <Box>
                    <img src="https://img.freepik.com/free-vector/motocross-abstract-concept-vector-illustration-adventure-sport-motorsport-championship-motorbike-race-extreme-track-motorcross-rally-enduro-dirt-bike-bicycle-rider-moto-abstract-metaphor_335657-4273.jpg?w=740&t=st=1681223635~exp=1681224235~hmac=31ec6ba9f551508ccca8f6ac10cf59170591130ff36ca87aeedec210b7b26393" alt="" />
                </Box>
                <Box>
                    <Box>
                        <Card sx={{ width: '100%' ,mt:4}}>
                            <CardContent>
                                <Typography>24*7 customer services you can chat with us anytime</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card sx={{ width: '100%',mt:4 }}>
                            <CardContent>
                                <Typography>Any time scooter can find here and you can easily rent it</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card sx={{ width: '100%',mt:4 }}>
                            <CardContent>
                                <Typography>Easy access and easy booking</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card sx={{ width: '100%',mt:4 }}>
                            <CardContent>
                                <Typography>Different type of scooter and bike</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Container>
    )
}

export default ThirdSection
