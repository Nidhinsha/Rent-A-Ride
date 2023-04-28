import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function NotFoundPage() {
  return (
    <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="h1">
                            404
                        </Typography>
                        <Typography variant="h6">
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Button onClick={() => window.history.go(-1)}>Return to previous page..!</Button>
                    </Grid>
                    <Grid xs={6}>
                        <img
                            src={require('../../assests/images/404Error.jpg')}
                            alt="404 page"
                            width='100%'
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
  )
}

export default NotFoundPage
