import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Flex,
  Stack,
} from "@mantine/core";

import { useInputState } from "@mantine/hooks";

import { PasswordStrength } from "../components/PasswordStrength";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//   import useAuthentication from "../hooks/useAuthentication";

import axios from "axios";
import config from "../../config.json";
import supabase  from "../supabase/supabaseClient";

import { useIsAuthenticatedNoReRoute } from "../supabase/useIsAuthenticated";

axios.defaults.withCredentials = true;

export default function Signup() {
  const navigate = useNavigate();
  // const { isAuthenticated } = useAuthentication();

  const isAuthenticated = useIsAuthenticated();

  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [email, setEmail] = useInputState("");
  const [confirmPassword, setConfirmPassword] = useInputState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const rootURL = config.serverRootURL;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  const isValidEmail = (email: string) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError("Invalid email address.");
      return;
    } else {
      setEmailError("");
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      setConfirmPassword("");
      return;
    }

    const url = `${rootURL}/user/signup`;
    const body = {
      username: username,
      password: password,
      email: email,
    };

    try {
      const response = await axios.post(url, body);
      const result = response.data;

      console.log(response)

      if (!response.data.success) {
        console.log("Error with status: " + response.status);
        throw new Error("Response is null");
      }

      const { accessToken } = result
      if (accessToken) {
        await supabase.auth.setSession({ access_token: accessToken, refresh_token: '' });
      }

      console.log("success!");
      navigate("/home");
    } catch (error: any) {
      console.log("Registration failed (axios error)");
      console.log(error);

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
    }

    return;
  };

  return (
    <Flex align={"center"} justify={"center"} h={"100vh"}>
      <Container size={420} my={40}>
        <Title ta="center">Welcome to {config.appName}</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Sign in
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
            />
            <TextInput
              label="Email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={setEmail}
              required
              error={emailError}
            />
            <PasswordStrength
              value={password}
              setValue={setPassword}
              setStrength={setPasswordStrength}
            />
            {passwordStrength >= 100 && (
              <PasswordInput
                label="Confirm Password"
                placeholder="Your password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                required
                error={passwordError}
              />
            )}
          </Stack>

          <Button
            fullWidth
            mt="xl"
            disabled={passwordStrength < 100 || password !== confirmPassword}
            onClick={handleSubmit}
          >
            Create Account
          </Button>
        </Paper>
      </Container>
    </Flex>
  );
}
