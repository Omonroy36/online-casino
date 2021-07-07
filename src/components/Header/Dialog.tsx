import React, { useState, FunctionComponent } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Grid, DialogContent, Button, DialogActions, TextField } from '@material-ui/core';

type Props = {
    open: boolean;
    onClose: () => void;
    balance: number;
    handleName: (value: string) => void
}

type User = {
    email: string;
    password: string;
    name: string;
}

const initUser: User = {
    email: "",
    password:"",
    name:""
}

const useStyles = makeStyles({
    container: {
        display: "flex"
    },
    panel: {
        margin: "auto"
    },
    card: {
        textAlign: "center"
    }
});

const DialogLogin: FunctionComponent<Props> = ({ onClose, open, balance, handleName }) => {
    const classes = useStyles();
    const [user, setUser] = useState<User>(initUser)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value} as any);
    };

    const handleClick = () =>{
        localStorage.setItem("name", JSON.stringify(user.name));
        localStorage.setItem("balance", JSON.stringify(balance));
        handleName(user.name);
        onClose();
    }
    
    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                            <TextField
                                name="email"
                                type="text"
                                size="medium"
                                label="Email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                name="password"
                                type="password"
                                size="medium"
                                label="Password"
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                name="name"
                                type="text"
                                size="medium"
                                label="Name"
                                onChange={handleChange}
                                />
                        </Grid>
                        {/* Buttons Panel*/}
                        <DialogActions className={classes.panel}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6}>
                                    <Button variant="outlined" color="primary" onClick={handleClick}>
                                        Login 
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Button variant="outlined" color="primary" onClick={onClose}>
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default DialogLogin;
