import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Link as ChakraLink,
  useToast,
  Select, // Import Select component
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Auth({ setIsLoggedIn }) {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
    role: "user", // Default to "user" role
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log(data);

      if (data.user) {
        localStorage.setItem("token", data.user);
        setIsLoggedIn(true);
        toast({
          title: "Login successful",
          status: "success",
          position: "top",
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/");
        }, 600);
      } else {
        toast({
          title: "Wrong username or password",
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (user.exp <= Date.now() / 1000) {
        localStorage.removeItem("token");
      } else {
        setIsLoggedIn(true);
        navigate("/");
      }
    }
  }, [navigate, setIsLoggedIn]);

  return (
    <Box p={20} display="flex" alignItems="center">
      <Box p={4} maxW="md" mx="auto" bg="yellow.50">
        <Heading textAlign="center" mb={6}>
          Sign in to Mealy
        </Heading>
        <Box borderWidth="1px" borderRadius="md" p={4}>
          <form onSubmit={handleSubmit}>
            <Input
              required
              type="text"
              placeholder="Enter Username"
              name="userName"
              value={credentials.userName}
              onChange={handleChange}
              mb={3}
            />
            <Input
              required
              type="password"
              placeholder="Enter Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              mb={3}
            />
            {/* Add a Select input for role */}
            <Select
              name="role"
              value={credentials.role}
              onChange={handleChange}
              mb={3}
            >
              <option value="user">User</option>
              <option value="chef">Chef</option>
            </Select>
            <Button colorScheme="teal" type="submit" isFullWidth mt={4}>
              Sign in
            </Button>
          </form>
        </Box>
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <ChakraLink color="blue.400" as={Link} to="/signup">
            Sign up
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
}

export default Auth;
