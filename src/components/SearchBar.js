import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../assets-and-css/SearchBar.css";
import axios from "axios";
import { Box, Flex } from "@chakra-ui/react";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [chef, setChef] = useState("");
  const [meal, setMeal] = useState("");
  const [searchOption, setSearchOption] = useState("chef"); // Default search option is "Search by Chef"

  useEffect(() => {
    if (searchOption === "chef" && chef.length > 0) {
      axios
        .get(`http://localhost:5000/meals/getmeals`)
        .then(function (response) {
          const filteredMeals = response.data.filter(
            (meal) => meal.chefName.username === chef
          );
          setResults(filteredMeals);
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    } else if (searchOption === "meal" && meal.length > 0) {
      axios
        .get(`http://localhost:5000/meals/${meal}`)
        .then(function (response) {
          if (response.data.length === 0) {
            axios
              .get(`http://localhost:5000/meals/getmeals`)
              .then(function (response) {
                setResults(response.data);
              })
              .catch(function (error) {
                console.error("Error:", error);
              });
          } else {
            setResults(response.data);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    } else {
      axios
        .get(`http://localhost:5000/meals/getmeals`)
        .then(function (response) {
          setResults(response.data);
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    }
  }, [chef, meal, searchOption]);

  const handleClick = () => {
    if (searchOption === "chef") {
      setChef(input);
      setMeal(""); // Clear the meal state when searching by chef
    } else {
      setMeal(input);
      setChef(""); // Clear the chef state when searching by meal
    }
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleDropdownChange = (value) => {
    setSearchOption(value);
    setInput("");
    setResults([]);
  };

  return (
    <Flex className="input-wrapper" alignContent="center">
      <FaSearch id="search-icon" size={22} />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <select onChange={(e) => handleDropdownChange(e.target.value)}>
        <option value="chef">Search by Chef</option>
        <option value="meal">Search by Meal</option>
      </select>
      <Box as="button" fontSize={18} onClick={handleClick}>
        Search
      </Box>
    </Flex>
  );
};

export default SearchBar;
