import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Icon } from '@mui/material';

const images = [
    {
        image: 'google2.png',
    },
    {
        image: 'youtube2.png',
    },
    {
        image: 'hub2.png',
    },
    {
        image: 'facebook.png',
    },
    {
        image: 'sprout3.png',
    },
];

const useStyles = makeStyles((theme) => {
    return{
        page: {
            // background: '#f9f9f9',
            // background: '#e4f2f7',
            width: '100%',
            padding: theme.spacing(3),
        },
        root: {
            // display: 'flex',
            minHeight: "100vh",
            // background: '#e4f2f7',
            // background: '#f9f9f9',
            // backgroundImage: 'url(/background.jpg)'
        },

    }
})

const Landing = () => {

    const classes = useStyles();

    return(
        <div className={classes.root}>

        <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Icon sx={{p:1}}>
                <img src={"icon2.png"} alt="logo" height={25} width={25}/>
            </Icon>
            <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Blucactus
            </Typography>
            <nav>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                style={{ textDecoration: 'none' }}
                >
                About
                </Link>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                style={{ textDecoration: 'none' }}
                >
                Product
                </Link>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                style={{ textDecoration: 'none' }}
                >
                Services
                </Link>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                style={{ textDecoration: 'none' }}
                >
                Blog
                </Link>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                style={{ textDecoration: 'none' }}
                >
                Contact
                </Link>
            </nav>
            <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Login
            </Button>
            <Button href="/register" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                Sign Up
            </Button>
        </Toolbar>


        <Container>
            <Grid container>
                <Grid xs={6} sm={6} md={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            // width: 600,
                            // minHeight: 550
                        }}
                        style={{ border: "none", boxShadow: "none" }}
                    >
                        <Typography variant="h3" sx={{mt:11, p:2, fontWeight: "bold"}}>
                         The Evolution Of The Web
                        </Typography>
                        <Card sx={{ maxWidth: 650 , p:2}} variant="outlined"  style={{ border: "none", boxShadow: "none" }}>
                            Imagination is more important than knowledge.  For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, 
                            giving birth to evolution. If you think you are worth what you know, you are very wrong.  Your knowledge today does not have much value 
                            beyond a couple of years.  Your value is what you can learn and how easily you can adapt to the changes this profession brings so often.
                        </Card>
                        <Button variant="outlined" sx={{mt:2, width:200, ml:2, p:2, fontWeight: 'bold'}} endIcon={<PlayArrowRoundedIcon/>}>Get Started</Button>
                    </Paper>
                    
                </Grid>
                <Grid item xs={6} sm={6} md={6}>

                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 650,
                            minHeight: 550
                            
                        }}
                        style={{ border: "none", boxShadow: "none" }}
                    >
                        <Card sx={{ maxWidth: 650 }} variant="outlined"  style={{ border: "none", boxShadow: "none" }}>
                        <CardMedia
                            component="img"
                            height="400"
                            width="650"
                            image="data.svg"
                            alt="background"
                            sx={{p:4, mt:7}}
                        />
                    </Card>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

        {/* Footer */}
        <Container
            maxWidth="xl"
            component="footer"
            sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6],
            }}
        >
            <Grid container spacing={4} justifyContent="space-evenly">
                {images.map((image) => (
                    <Grid item xs={2} sm={2} key={image.image}>
                        <Card sx={{ maxWidth: 345 }} variant="outlined"  style={{ border: "none", boxShadow: "none" }}>
                            <CardMedia
                                component="img"
                                height="100"
                                image={image.image}
                                alt={image.image}
                            />
                        </Card>
                    </Grid>
                    
                ))}
            </Grid>
        </Container>
        {/* End footer */}
        
        </div>
    )
}

export default Landing;