import "./App.css";
import { useState } from "react";
import { ChakraProvider, CSSReset, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authenticate from "./routes/Authenticate";
import Signuproute from "./routes/Signuproute";
import customTheme from "./theme"; // Import your custom theme
import Home from "./routes/Home";
import NavBar from "./components/NavBar";
import MenuRoute from "./routes/MenuRoute";
import PaymentRoute from "./routes/PaymentRoute";
import { CartProvider } from "./components/Cart/CartContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <ChakraProvider theme={customTheme}>
      <CartProvider>
        <ColorModeScript />
        <CSSReset />
        <BrowserRouter>
          <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuRoute />} />
            <Route
              path="/signin"
              element={
                <Authenticate
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Signuproute
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route path="/payment" element={<PaymentRoute />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
