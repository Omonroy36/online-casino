import { FunctionComponent, useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DialogLogin from "./Dialog";
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        profile: {
            display: "flex"
        },
        balance: {
            margin: "auto"
        }
    }),
);

type Props = {
    balance: number;
}

const Header: FunctionComponent<Props> = ({ balance }) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleName = (value: string) => {
        setName(value)
    }

    const logOut = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("balance");
        setName("");
    }

    useEffect(() => {
        const userName = localStorage.getItem("name");
        if (userName) setName(JSON.parse(userName));
    }, [])

    return (
        <div className={classes.root}>
            <DialogLogin onClose={handleClose} open={open} balance={balance} handleName={handleName} />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Paktolus Casino
                    </Typography>
                    <div className={classes.profile}>
                        <Typography variant="subtitle2" className={classes.balance}>
                            {name && name ? `${name} your balance is $${balance}` : `Balance $${balance}`}
                        </Typography>
                        {name && name ? <>
                            <Tooltip title="Avatar">
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleClickOpen}
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Logout">
                                <IconButton
                                    aria-label="log in"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={logOut}
                                >
                                    <ExitToAppIcon />
                                </IconButton>
                            </Tooltip>

                        </> : <Tooltip title="Login">
                            <IconButton
                                aria-label="log out"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleClickOpen}
                            >
                                <MeetingRoomRoundedIcon />
                            </IconButton>
                        </Tooltip>}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;