import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/signup" element={<Signup />} />
            {/* Example of dynamic route */}
            {/* <Route path="/profile/:username/" element={<Profile />} /> */}
            {/* Example of default route */}
            {/* <Route path="*" element={<Login />} /> */}
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
