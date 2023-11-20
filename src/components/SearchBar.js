import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../assets-and-css/SearchBar.css";
import axios from "axios";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const [meal, setmeal] = useState("");

  useEffect(() => {
    if (input.length > 0) {
      axios
        .get(`http://localhost:5001/meals/${input}`)
        .then(function (response) {
          // Handle a successful response here
          setResults(response.data); // Update the state with the fetched data
          console.log(response.data);
        })
        .catch(function (error) {
          // Handle any errors that occurred during the request
          console.error("Error:", error);
        });
    } else {
      axios
        .get(`http://localhost:5001/meals/getmeals`)
        .then(function (response) {
          // Handle a successful response here
          setResults(response.data); // Update the state with the fetched data
        })
        .catch(function (error) {
          // Handle any errors that occurred during the request
          console.error("Error:", error);
        });
    }
  }, [input]);

  const handleChange = (value) => {
    setInput(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
