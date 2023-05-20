import React, { useState } from "react";
import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Routes, Route, NavLink } from "react-router-dom";
import { AddUser, AllUser, EditUser } from "./index";

const AppBarStyle = styled(AppBar)`
  background: #001242;
  padding: 0.5em;
  margin-bottom: 2em;
`;

const Tab = styled("button")`
  margin: 0.5em;
  background-color: transparent;
  color: white;
  font-weight: semi-bold;
  font-size: 1.3em;
  border: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #ffff45;
    transform: scale(1.2);
  }
  &:focus {
    color: #ffff45;
    transform: scale(1.2);
  }
`;

const NavBar = () => {
  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const active = "activePage";

  return (
    <>
      <AppBarStyle position="static">
        <Toolbar>
          {/* <NavLink
            to="/all"
            className={({ isActive }) => (isActive ? active : "")}>
            <Tab>Crud</Tab>
          </NavLink> */}

          <NavLink
            to="/all"
            className={({ isActive }) => (isActive ? active : "")}>
            <Tab>All User</Tab>
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? active : "")}
            to="/add"
            onClick={() => {
              setOpenModalAddUser(true);
            }}>
            <Tab>Add User</Tab>
          </NavLink>
        </Toolbar>
      </AppBarStyle>
      <Routes>
        <Route path="/" element={<AllUser />} />
        <Route path="/all" element={<AllUser />} />
        <Route
          path="/add"
          element={
            <AddUser
              open={openModalAddUser}
              onClose={() => {
                setOpenModalAddUser(false);
              }}
            />
          }
        />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </>
  );
};

export default NavBar;
