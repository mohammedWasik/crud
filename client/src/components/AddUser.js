import {
  FormGroup,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  Input,
  styled,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { addUserApi } from "../service/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormGroupStyle = styled(FormGroup)`
  padding: 1em;
  width: 60%;
  margin: auto;
  margin-top: 5%;
  color: black;
  & > div {
    margin-top: 5%;
  }
`;

const AddUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
  });
  const base_url = "https://crud-lemon-kappa.vercel.app/";

  const handleFormValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const saveUserDetail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/add`, user);

      navigate("/all");
    } catch (error) {
      alert(Object.values(error.response.data) + ".");
    }
  };
  return (
    <FormGroupStyle>
      <Typography variant="h4" color="initial">
        Add User
      </Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input name="name" onChange={(e) => handleFormValue(e)} />
      </FormControl>
      <FormControl>
        <InputLabel>User Name</InputLabel>
        <Input name="userName" onChange={(e) => handleFormValue(e)} />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          type={"email"}
          name="email"
          onChange={(e) => handleFormValue(e)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input
          name="phone"
          type="number"
          onChange={(e) => handleFormValue(e)}
        />
      </FormControl>
      <FormControl className="btnSubmitDiv">
        <Button
          className="btnSubmit"
          variant="outlined"
          onClick={(e) => {
            saveUserDetail(e);
          }}>
          Add User
        </Button>
      </FormControl>
    </FormGroupStyle>
  );
};

export default AddUser;
