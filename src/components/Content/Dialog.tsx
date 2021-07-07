import {  FunctionComponent, } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Card, CardContent, Typography, Grid, DialogContent, Button, DialogActions } from '@material-ui/core';
import { Slot } from "."

const useStyles = makeStyles({
    container: {
        display: "flex"
    },
    panel: {
        margin: "auto"
    },
    card: {
        textAlign: "center"
    },
    text: {
        fontSize: "25px",
        textAlign: "center"
    },
    button:{
        textAlign: "center"
    }
});

type Props = {
    open: boolean;
    slots: Slot;
    onClose: () => void;
    onClickRoll: () => void;
    gameOver: boolean;
    debug: () => void;
}

const SlotMachineDialog: FunctionComponent<Props> = ({ onClose, onClickRoll, open, slots, gameOver, debug }) => {
    const classes = useStyles();
    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={4} md={4}>
                        <Card>
                            <CardContent className={classes.card}>
                                <Typography className={classes.text}>
                                    {slots && slots.slotOne}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Card>
                            <CardContent className={classes.card}>
                                <Typography className={classes.text}>
                                    {slots && slots.slotTwo}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Card>
                            <CardContent className={classes.card}>
                                <Typography className={classes.text}>
                                    {slots && slots.slotThree}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Buttons Panel*/}
                    <DialogActions className={classes.panel}>
                        <Grid container spacing={2}>
                            {!gameOver ?
                                <>
                                    <Grid item xs={4} md={4}>
                                        <Button variant="outlined" color="primary" onClick={onClickRoll}>
                                            Roll
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Button variant="outlined" color="primary" onClick={debug}>
                                            Debug
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Button variant="outlined" color="primary" onClick={onClose}>
                                            Close
                                        </Button>
                                    </Grid>
                                </> : <>
                                    <Grid item xs={12} md={12}>
                                        <Typography className={classes.text}>
                                            Game Over
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={12} className={classes.button}>
                                        <Button variant="outlined" color="primary" onClick={onClose} >
                                            Close
                                        </Button>
                                    </Grid>
                                </>}
                        </Grid>
                    </DialogActions>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default SlotMachineDialog;
