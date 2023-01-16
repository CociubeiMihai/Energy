import { Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { createDevice, findAllDevices, removeDevices, updateDevice } from "../services/DeviceService";
import { AuxDivDevice, EditDeviceDiv, EditDeviceTable, UpdateDeviceDiv } from "../styles/EditDevices.style";
import { TableDiv } from "../styles/EditUsers.style";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { simulate } from "../services/SimulateConsumptionService";

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

function EditDevices() {

    const [content, setContent] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const [address, setAddress] = useState("Address");
    const [description, setDescription] = useState("Description");
    const [consum, setConsum] = useState("Consumption");
    const [idDevice, setIdDevice] = useState('');
    const [assigned, setAssigned] = useState('');
    const rol = JSON.parse(localStorage.getItem('rol'));
    let navigate = useNavigate();

    useEffect(() => {
      if(rol === "ADMIN"){
        findAllDevices().then((res) => {
              setContent(res.data);
            });
          }
      else{
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
          setAddress(event.row.address)
          setDescription(event.row.description)
          setConsum(event.row.maxHourlyConsumption)
          setAssigned(event.row.assigned)
          setIdDevice(event.row.id)
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
      
    const handleRemove = () => {
      if(selected.length > 0){
        removeDevices(selected)
      }
      findAllDevices().then((res) => {
        setContent(res.data);
      });
      setSelected([])
    }

    const handleUpdate = () => {
        console.log(idDevice)
        updateDevice(idDevice, description,address, consum, assigned)
        findAllDevices().then((res) => {
          setContent(res.data);
        });
    }

    const handleCreate = () => {
      createDevice(description, address, consum)
      findAllDevices().then((res) => {
        setContent(res.data);
      });
    }

    const handleSimulate = () => {
      simulate(selected)
    }

  return (
    <EditDeviceDiv>
        <Navbar/>
        <EditDeviceTable>
          <TableDiv>
          <div style={{ height: 400, width: '80%' }}>
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
        </EditDeviceTable>
        <AuxDivDevice>
          <div>
          <Button variant="contained" onClick={handleRemove} >Remove</Button>
          </div>
          <UpdateDeviceDiv>
          <TextField id="outlined-basic" label={address} onChange={(e) => setAddress(e.target.value)} variant="outlined"/>
          <TextField id="outlined-basic" label={consum} onChange={(e) => setConsum(e.target.value)} variant="outlined"/>
          <TextField id="outlined-basic" label={description} onChange={(e) => setDescription(e.target.value)} variant="outlined"/>
          <Button variant="contained" onClick={handleUpdate} >Save</Button>
          <Button variant="contained" onClick={handleCreate} >Create</Button>
          <Button variant="contained" onClick={handleSimulate} >Simulate</Button>
          </UpdateDeviceDiv>
        </AuxDivDevice>

    </EditDeviceDiv>
  )
}

export default EditDevices