
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import { findAllDevices } from '../services/UserService';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChartBtn, ChartDiv, ElementsDiv, UserDiv } from '../styles/User.style';
import { Button } from '@mui/material';
import { format } from 'date-fns'
import { findConsumption } from '../services/ConsumptionService';
import Modal from '@mui/material/Modal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import SupportEngine from './Chat/SupportEngine';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

  
  export default function Uuser() {

    const id = JSON.parse(localStorage.getItem('user'));
    const [content, setContent] = useState([]);
    const [value, setValue] = useState([]);
    const [date, setDate] = useState('');
    const [consum, setConsum] = useState([]);
    const [open, setOpen] = React.useState(false);
    const rol = JSON.parse(localStorage.getItem('rol'));
    let navigate = useNavigate();


    useEffect(() => {
      if(rol === "USER"){
        findAllDevices(id).then((res) => {
          setContent(res.data);
          
        });
      }else{
        navigate("/");
      }
      }, [id,rol,navigate]);

    const handleChangeDate = (id) => {
      findConsumption(date,id).then((res) => {
        setConsum(res.data);
      });
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    };


    return (
        <UserDiv>
          <Navbar/>
          <ElementsDiv>
        {content.map((device, index) => (
      <Card sx={{ minWidth: 275,
                margin: 5
                }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Device-ul: {index + 1}
          </Typography>
          <Typography variant="h5" component="div">
            Address:{device.address}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Max Consumtion:{device.maxHourlyConsumption}
          </Typography>
          <Typography variant="body2">
            Description: {device.description}
            <br />
          </Typography>
        </CardContent>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ChartDiv>
          <DatePicker
              label="Custom input"
              value={value}
              onChange={(newValue) => {
                setDate(format(new Date(newValue.$y, newValue.$M, newValue.$D), 'yyyy-MM-dd'))
                setValue(newValue)
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <input ref={inputRef} {...inputProps} />
                  {InputProps?.endAdornment}
              </Box>
              )}
          />
          <ChartBtn>
          <Button variant="contained" onClick={() => handleChangeDate(device.id)} >Chart</Button>
          </ChartBtn>
        </ChartDiv>
        </LocalizationProvider>

      </Card>
      ))}
      </ElementsDiv>
      
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 1000 }}>
          <LineChart
            width={1000}
            height={400}
            data={consum}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="energyConsumption" stroke="#ff7300"/>
          </LineChart>
        <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
      <SupportEngine/>
      </UserDiv>
    );
  }