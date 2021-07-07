import {useState, FunctionComponent, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { Container, Button } from '@material-ui/core';
import SlotMachineDialog from "./Dialog";

const useStyles = makeStyles({
    table: {
        marginTop: "0.50rem",
        marginBottom: "0.25rem"
    },
    button: {
        textAlign:"center"
    }
});

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
        align: "center"
    },
    {
        field: 'slotOne',
        headerName: 'Slot One',
        width: 150,
        align: "center"
    },
    {
        field: 'slotTwo',
        headerName: 'Slot Two',
        width: 150,
        align: "center"
    },
    {
        field: 'slotThree',
        headerName: 'Slot Three',
        width: 150,
        align: "center"
    },
    {
        field: 'time',
        headerName: 'Time',
        width: 210,
        align: "center"
    }
];

const rollOptions = ["♠","♥","♦","♣"];

export type Slot = {
    slotOne: string;
    slotTwo:string;
    slotThree: string;
    time: Date;
    id:number;
}

const initSlot: Slot = {
    slotOne: "",
    slotTwo:"",
    slotThree:"",
    time: new Date(Date.now()),
    id:0
}

type Props = {
    handleBalance: (value: number) => void;
    balance: number;
}

const Content : FunctionComponent<Props> = ({ handleBalance, balance }) =>{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [slots, setSlots] = useState<Slot>(initSlot);
    const [rows, setRows] = useState<object[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
        if(balance && balance < 1)  setGameOver(true)
        else setGameOver(false)
    }, [balance])
 
    const randomRoll = () => {
        return rollOptions[Math.floor(Math.random() * rollOptions.length)];
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setBalance = (slot: Slot) => {
        const {slotOne, slotTwo, slotThree} = slot;
        handleBalance(balance - 2);
        if(slotOne === slotTwo && slotOne === slotThree && slotTwo === slotThree) handleBalance(balance + 2);
        else if(slotOne === "♠" && slotThree === "♠" && slotTwo === "♠") handleBalance(balance + 5);
        else if  (slotOne === slotTwo || slotOne === slotThree || slotTwo === slotThree) handleBalance(balance + 0.5);
        //Updating balance
        localStorage.setItem("balance", JSON.stringify(balance));
    }

    const debug = () => {
        const newSlots = {
            slotOne: "♠",
            slotTwo: "♠",
            slotThree: "♠",
            time: new Date(Date.now()),
            id: rows.length + 1
        }
        setSlots(newSlots);
        setRows(current => [...current, newSlots]);
        setBalance(newSlots);
    }

    const handleClickRoll = () => {
        const newSlots = {
            slotOne: randomRoll(),
            slotTwo: randomRoll(),
            slotThree: randomRoll(),
            time: new Date(Date.now()),
            id: rows.length + 1
        }
        setSlots(newSlots);
        setRows(current => [...current, newSlots]);
        setBalance(newSlots);
    }

    useEffect(() => {
        if(balance && balance < 2) setGameOver(true)
        else setGameOver(false) 
    }, [balance])

    return (
        <Container>
            <SlotMachineDialog open={open} onClose={handleClose} onClickRoll={handleClickRoll} slots={slots} gameOver={gameOver} debug={debug}/>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 30, 40]}
                className={classes.table}
                autoHeight={true}
            />
            <div className={classes.button}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen} >
                    Start Game
                </Button>
            </div>
        </Container>
    );
};

export default Content;