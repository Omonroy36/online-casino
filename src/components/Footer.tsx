import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Toolbar, AppBar } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        position:"absolute",
        bottom:0
    },
    copyright: {
        margin:"auto"
    }
});

const Footer = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" color="primary" className={classes.root}>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body1" color="inherit" className={classes.copyright}>
              © Copyrights 2021 Omonroy36 
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Footer;