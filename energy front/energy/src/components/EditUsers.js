import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { editRol, findAll, register, removeUsers } from "../services/UserService";
import { UserMainDiv, UserTableDiv, TableDiv, ButtonDivAdm, ChangeRol, UpdateDiv } from "../styles/EditUsers.style";
import Navbar from "./Navbar";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'rol', headerName: 'Rol', width: 100 },
  ];

function EditUsers() {

    const [content, setContent] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const [rolSelected, setRolSelected] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const rol = JSON.parse(localStorage.getItem('rol'));
    let navigate = useNavigate();

    useEffect(() => {
      if(rol === "ADMIN"){
        findAll().then((res) => {
              setContent(res.data);
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

    const handleDelete = () => {
      if(selected.length > 0){
        removeUsers(selected);
        findAll().then((res) => {
          setContent(res.data);
        });
        setSelected([])
      }
    };

    const handleUpdate = () => {
      editRol(rolSelected, username)
      findAll().then((res) => {
        setContent(res.data);
      });
    }

    const handleCreate = () => {
      register(username, password)
      findAll().then((res) => {
        setContent(res.data);
      });
    }

  return (
    <UserMainDiv>
            <Navbar/>
        <UserTableDiv>
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
            <ButtonDivAdm>
              <Button variant="contained" onClick={handleDelete} >Remove selected isems</Button>
              <ChangeRol>
                <UpdateDiv>
                <TextField id="outlined-basic" label="User name" variant="outlined" 
                  onChange={(e) => setUsername(e.target.value)}
                />
                </UpdateDiv>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={rolSelected}
                  onChange={(e) => setRolSelected(e.target.value)}
                >
                  <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                  <FormControlLabel value="USER" control={<Radio />} label="User" />
                </RadioGroup>
                <UpdateDiv>
                <Button variant="contained" onClick={handleUpdate} >Update </Button>
                </UpdateDiv>
              </ChangeRol>
              <TextField id="outlined-basic" label="Password" variant="outlined" 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <UpdateDiv>
                <Button variant="contained" onClick={handleCreate} >Create user </Button>
                </UpdateDiv>
            </ButtonDivAdm>
            </TableDiv>
        </UserTableDiv>
        
    </UserMainDiv>
  )
}

export default EditUsers