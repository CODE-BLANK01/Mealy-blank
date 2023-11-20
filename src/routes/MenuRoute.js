import { useState } from "react";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { SearchBar } from "../components/SearchBar";
import Status from "../components/Status";

function MenuRoute() {
  const customTheme = extendTheme({
    breakpoints: {
      sm: "30em", // custom small screen breakpoint
      md: "48em", // custom medium screen breakpoint
      lg: "62em", // custom large screen breakpoint
      xl: "80em", // custom extra-large screen breakpoint
    },
  });
  const [results, setResults] = useState([]);
  return (
    <div className="App">
      <ChakraProvider theme={customTheme} backgroundColor="#ffc529">
        <Status />
        <Box className="search-bar-container">
          <SearchBar setResults={setResults} />
        </Box>
        {results && results.length > 0 && <Menu results={results} />}
      </ChakraProvider>
      {/* {results && results.length > 0 && <SearchResultsList results={results} />} */}
    </div>
  );
}

export default MenuRoute;
