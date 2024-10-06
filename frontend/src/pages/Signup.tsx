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
import { PiSparkleFill } from "react-icons/pi";
import Spline from "@splinetool/react-spline";
import useIsAuthenticated from "../hooks/useIsAuthenticated";

axios.defaults.withCredentials = true;

export default function Signup() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    navigate("/home");
  }

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

      if (!response.data.success) {
        console.log("Error: " + response);
        console.log(url)
        throw new Error("Response is null");
      }

      localStorage.setItem("user_id", response.data.data.id);
      localStorage.setItem("username", response.data.data.username);
      console.log("success!");
      navigate("/home");
    } catch (error: any) {
      console.log("Registration failed (axios error)");
      console.log(error);

      if (error.response.status == 401) {
        alert("A field contains invalid characters");
      } else {
        alert("An internal error occurred");
      }

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
              navigate("/login");
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
      <div className="bg -z-10 absolute inset-0 opacity-80"></div>
      <div className='absolute -z-10 right-96 -bottom-10 w-96 h-96 items-center justify-center'>
        <div className='w-[90rem]'>
          <Spline scene="https://prod.spline.design/UZiz8e8YDo38sP5Z/scene.splinecode" />
        </div>
      </div>
    </Flex>
  );
}