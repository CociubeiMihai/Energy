import React, { useEffect, useState } from "react";
import { AssignDiv, DivAdmin, MainDivAdmin, Tabele, TableDiv } from '../styles/Admin.style'
import { DataGrid } from '@mui/x-data-grid';
import { unUnsignedDevices } from '../services/DeviceService';
import { assignUserToDevice, findAllUsers } from "../services/UserService";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


const columns = [
  { field: 'address', headerName: 'Address', width: 130 },
  {
    field: 'maxHourlyConsumption',
    headerName: 'Consumption',
    type: 'number',
    width: 110,
  },
  { field: 'description', headerName: 'Description', width: 500 },
];

const columns1 = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'rol', headerName: 'Rol', width: 100 },
];


function Admin() {

  const [content, setContent] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const rol = JSON.parse(localStorage.getItem('rol'));
  let navigate = useNavigate();

  useEffect(() => {
    
    if(rol === "ADMIN"){
      unUnsignedDevices().then((res) => {
        setContent(res.data);
      });

      findAllUsers().then((res) => {
        setUsers(res.data);
      });
    }else{
      navigate("/");
    }

  }, [rol,navigate]);

  const handleSelectAllClick = (event) => {
    alert("Nu functioneaza asa ;)")

  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) { //daca nu il gasim
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) { //daca e la inceput
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) { //daca e la final
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) { //caz general
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleAssign = () => {
    if(selected.length > 0){
      assignUserToDevice(username, selected)
      unUnsignedDevices().then((res) => {
        setContent(res.data);
      });
    }
    setSelected([])
  }


  return (
    <DivAdmin>
      <Navbar/>
      <Tabele>
      <MainDivAdmin>
        <TableDiv>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={content}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onCellClick={(event) => handleClick(event, event.id)}
              onColumnHeaderClick={handleSelectAllClick}
            />
          </div>
      </TableDiv>
      </MainDivAdmin>

      <MainDivAdmin>
        <TableDiv>
          <div style={{ height: 400, width: '60%' }}>
            <DataGrid
              rows={users}
              columns={columns1}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
      </TableDiv>
      </MainDivAdmin>
      </Tabele>

      <AssignDiv>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    />
      <Stack direction="row" spacing={10}>
        <TextField id="outlined-basic" label="User name" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
        <Button variant="contained" onClick={handleAssign} >Assign</Button>
      </Stack>
      </AssignDiv>
      
    </DivAdmin>
  )
}



export default Admin