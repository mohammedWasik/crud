import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

const TableStyle = styled(Table)`
  width: 80%;
  margin: auto;
  margin-top: 4em;
`;

const AllUser = () => {
  const base_url = "https://crud-lemon-kappa.vercel.app";
  const [getResult, setGetResult] = useState([]);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${base_url}/${id}`);
    } catch (error) {
      alert(Object.values(error.response.data));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${base_url}/all`);
        if (response.statusText === "OK") {
          const result = await response.data;
          setGetResult(result.data);
        }
      } catch (error) {
        alert(Object.values(error.response.data) + ".");
      }
    })();
  }, [getResult]);

  return (
    <TableStyle>
      <TableHead className="tableHead">
        <TableRow>
          {/* <TableCell>Id</TableCell> */}
          <TableCell>Name</TableCell>
          <TableCell>User Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {getResult.map((user) => (
          <TableRow key={user._id}>
            {/* <TableCell>{user._id}</TableCell> */}
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.userName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                style={{ margin: 5 }}
                component={Link}
                to={`/edit/${user._id}`}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deleteUser(user._id);
                }}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableStyle>
  );
};

export default AllUser;
