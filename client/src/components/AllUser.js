import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../App.css";
import {
  Button,
  Input,
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
  const [query, setQuery] = useState("");
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${base_url}/${id}`);

      window.location.reload();
    } catch (error) {
      alert(Object.values(error.response.data));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${base_url}/all`);
        // console.log(response);
        if (response.statusText === "OK" || response.status === 200) {
          const result = await response.data;
          // console.log(result);
          setGetResult(result.data);
          // setFilteredItem(result.data);
        }
      } catch (error) {
        alert(Object.values(error.response.data) + ".");
      }
    })();
  }, []);

  const filteredItems = useMemo(() => {
    return getResult.filter((item) => {
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.userName.toLowerCase().includes(query.toLowerCase()) ||
        item.phone.toString().includes(query.toLowerCase())
      );
    });
  }, [getResult, query]);
  console.log("filteredItems is", filteredItems);
  return (
    <>
      <div className="searchBarDiv">
        <input
          value={query}
          className="searchBar"
          placeholder="Search Name"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
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
          {filteredItems.map((user) => (
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
    </>
  );
};

export default AllUser;
