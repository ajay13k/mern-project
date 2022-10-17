import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const handleLogout = () => {
    const tokeDelete = localStorage.removeItem("token");
    if (!tokeDelete) {
      window.location = "/";
      alert("Logout Successfully");
    }
  };
  return (
    <Box height="45px" w="100%" bg="#ccccff">
      <HStack pt={3} gap="40px" pl={20}>
        <NavLink to="/product">Product</NavLink>
        <NavLink>Profile</NavLink>
        <NavLink onClick={handleLogout}>Logout</NavLink>
      </HStack>
    </Box>
  );
};

export default Navbar;
