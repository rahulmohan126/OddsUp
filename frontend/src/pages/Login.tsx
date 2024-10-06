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

import supabase  from "../supabase/supabaseClient";
import { useIsAuthenticatedNoReRoute } from "../supabase/useIsAuthenticated";

axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();
  // const { isAuthenticated } = useAuthentication();
  const isAuthenticated  = useIsAuthenticatedNoReRoute();

  // TODO: set appropriate state variables for username and password
  const [email, setEmail] = useInputState("");
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      console.error('Login error:', error.message);
      setError(error.message);
      return;
    }
  
    // Successful login, navigate to home
    console.log('Successfully logged in as:', data.user.email);
    navigate('/home');

    // const url = `${rootURL}/user/login`;

    // const body = {
    //   email: email,
    //   password: password,
    // };

    // console.log("Attempting login...");

    // try {
    //   const response = await axios.post(url, body);

    //   if (!response.data.success) {
    //     console.log("Error with status: " + response.status);
    //     console.log(response)
    //     throw new Error("Response is null");
    //   }

    //   const { accessToken } = response.data
    //   if (accessToken) {
    //     await supabase.auth.setSession({ access_token: accessToken, refresh_token: '' });
    //     console.log("Set session token!")
    //   }

    //   console.log("Successfully logged in as: " + email);
    //   console.log(response.data);
    //   navigate(`/home`);
    // } catch (error: any) {
    //   console.log(error)
    //   console.log("Login failed failed (axios error)");
    // }
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
              label="Email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={setEmail}
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
