import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Group from "./pages/Group";
import Challenge from "./pages/Challenge";


function App() {

  return (
    <>
      <MantineProvider defaultColorScheme="dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/group" element={<Group />} />
            <Route path="/challenge/:id_" element={<Challenge />} />
            {/* Example of dynamic route */}
            <Route path="/group/:id_/" element={<Group />} />
            {/* Example of default route */}
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
