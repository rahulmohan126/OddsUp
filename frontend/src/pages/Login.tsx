import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack,
  Flex,
} from "@mantine/core";

import { useInputState } from "@mantine/hooks";
//   import useAuthentication from "../hooks/useAuthentication";

import axios from "axios"; // Import Axios
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();
  // const { isAuthenticated } = useAuthentication();
  const isAuthenticated = false;

  // TODO: set appropriate state variables for username and password
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");

  const [error, setError] = useState("");

  const rootURL = config.serverRootURL;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (event: any) => {
    // TODO: check username and password using /login route
    event.preventDefault();

    const url = `${rootURL}/login`;

    const body = {
      username: username,
      password: password,
    };

    console.log("Attempting login...");

    try {
      const response = await axios.post(url, body);

      if (!response || response.status != 200) {
        console.log("Error with status: " + response.status);
        throw new Error("Response is null");
      }

      console.log("Successfully logged in as: " + username);
      navigate(`/home`);
    } catch (error: any) {
      if (error.response.status == 400) {
        setError("Invalid formatting!");
        setUsername("");
        setPassword("");
      } else if (error.response.status == 401) {
        setError("Invalid credentials!");
        setPassword("");
      } else {
        alert("An internal error occurred");
      }

      console.log("Login failed failed (axios error)");
    }
  };

  return (
    <Flex align={"center"} justify={"center"} h={"100vh"}>
      <Container size={420} my={40}>
        <Title ta="center">Welcome to {config.appName}</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack gap={"16px"}>
            <TextInput
              label="Username"
              placeholder="johndoe1"
              value={username}
              onChange={setUsername}
              required
              error={error}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={setPassword}
              required
              error={error}
            />
          </Stack>

          <Button fullWidth mt="xl" onClick={handleLogin}>
            Sign In
          </Button>
        </Paper>
      </Container>
    </Flex>
  );
}
