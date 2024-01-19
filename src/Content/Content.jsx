import React from "react";
import classes from "./style.module.scss";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";
import { callAPI } from "../Domain/api";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useParams } from "react-router-dom";

const Content = () => {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({
    provider: "",
    email: "",
    password: "",
    category: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await callAPI("/password", "GET");
      console.log(response);

      const getData = response?.map((item) => {
        return {
          id: item?.id,
          provider: item?.provider,
          email: item?.email,
          password: item?.password,
          category: item?.category,
        };
      });

      setData(getData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    if (name === "password") {
      const errorMessage = validatePassword(value);
      setPasswordError(errorMessage);
    }
  };

  const validatePassword = (password) => {
    let errorMessage = "";
    if (password.length < 6) {
      errorMessage = "Password min 6 Character";
    }
    return errorMessage;
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      category: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validatePassword(newUser.password);
    if (errorMessage) {
      setPasswordError(errorMessage);
      return;
    }
    try {
      await callAPI("/password", "POST", newUser);
      fetchData();
      setNewUser({
        provider: "",
        email: "",
        password: "",
        category: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await callAPI(`/password/${id}`, "DELETE");
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.addUser}>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField id="provider" name="provider" label="Provider" value={newUser.provider} onChange={handleInputChange} />
              <TextField id="email" name="email" label="Email" value={newUser.email} onChange={handleInputChange} />
            </div>
            <div>
              <TextField id="password" name="password" type="password" label="Password" value={newUser.password} onChange={handleInputChange} error={!!passwordError} helperText={passwordError} />
              <FormControl sx={{ m: 1, width: "25ch" }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={newUser.category} label="Age" onChange={handleSelectChange}>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.btn}>
              <Button variant="outlined" type="submit">
                Create User
              </Button>
            </div>
          </Box>
        </div>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Provider</th>
              <th>Email</th>
              <th>Password</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.provider}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>{data.category}</td>
                  <td className={classes.btn_col}>
                    <Button className={classes.btn_delete} variant="outlined" color="error" onClick={() => handleDelete(data.id)}>
                      <p>Delete</p>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Content;
