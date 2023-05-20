import {
  FormGroup,
  Typography,
  FormControl,
  InputLabel,
  Input,
  styled,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { addUserApi } from "../service/api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
  });
  const base_url = "https://crud-lemon-kappa.vercel.app";

  const handleFormValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const editUserDetail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${base_url}/${id}`, user);
      navigate("/all");
    } catch (error) {
      alert(Object.values(error.response.data) + ".");
    }
  };

  const getUserDetail = async () => {
    try {
      const response = await axios.get(`${base_url}/${id}`);
      if (response.statusText === "OK") {
        const result = await response.data;
        setUser(result.data);
      }
    } catch (error) {
      alert(Object.values(error.response.data) + ".");
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <FormGroupStyle>
      <Typography variant="h4" color="initial">
        Edit User
      </Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input
          name="name"
          value={user.name}
          onChange={(e) => handleFormValue(e)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>User Name</InputLabel>
        <Input
          name="userName"
          value={user.userName}
          onChange={(e) => handleFormValue(e)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          name="email"
          value={user.email}
          onChange={(e) => handleFormValue(e)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input
          name="phone"
          value={user.phone}
          onChange={(e) => handleFormValue(e)}
        />
      </FormControl>
      <FormControl className="btnSubmitDiv">
        <Button
          className="btnSubmit"
          variant="outlined"
          onClick={(e) => {
            editUserDetail(e);
          }}>
          Edit User
        </Button>
      </FormControl>
    </FormGroupStyle>
  );
};

export default EditUser;
