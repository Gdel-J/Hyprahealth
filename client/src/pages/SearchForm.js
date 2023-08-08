import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import { searchRecipes } from "../utils/API";
import SearchResult from "../components/SearchResult";

const Container = styled.div`
    width: 100%;
    padding: 20px;
`;

const SearchContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const SearchButton = styled.button`
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const FilterSelect = styled.select`
    width: 48%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;



const SearchForm = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [searchIngredient, setSearchIngredient] = useState("");
  const [searchMealName, setSearchMealName] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedMealName, setSelectedMealName] = useState("");
  const inputReset = (fieldName) => {
    document.querySelector(`input[name=${fieldName}]`).value = '';
  };
  
  const selectReset = (fieldName) => {
    document.querySelector(`select[name=${fieldName}]`).value = '';
  };
  

  const handleSelectChange = (event) => {
    if (event.target.name === "area") {
      setSelectedArea(event.target.value);
      setSelectedCategory("");       
      inputReset("mealName");  
      inputReset("ingredient");  
      selectReset("category");
     
    } else if (event.target.name === "category") {
      setSelectedCategory(event.target.value);
      setSelectedArea("");
      inputReset("mealName");  
      inputReset("ingredient");  
      selectReset("area");      
     
    } else if (event.target.name === "ingredient") {
      setSearchIngredient(event.target.value);
      setSelectedCategory("");
      setSelectedArea("");
     
     
    } else if (event.target.name === "mealName") {
      setSearchMealName(event.target.value);
      setSelectedCategory("");
      setSelectedArea("");
         
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("Event: ", event.target.name);
    
    if (event.target.name === "ingredient") {
      setSelectedIngredient(searchIngredient);
      setSelectedMealName("");
      inputReset("mealName");  
      selectReset("category");
      selectReset("area");
     
    } else if (event.target.name === "mealName") {
      setSelectedMealName(searchMealName);
      setSelectedIngredient("");
      inputReset("ingredient");  
      selectReset("category");
      selectReset("area");  
      
    }

    
    setSelectedCategory("");
    setSelectedArea("");    
    
  };

  useEffect(() => {
    const getCategory = async (query) => {
      try {
        const response = await searchRecipes(query);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const { meals } = await response.json();
        

        if (query === "list.php?c=list") {
          setCategoryList(meals);
        } else {
          setAreaList(meals);
        }
      } catch (err) {
        console.error(JSON.parse(JSON.stringify(err)));
      }
    };

    getCategory("list.php?c=list");
    getCategory("list.php?a=list");
  }, []);

    return (
        <Container>
            <SearchContainer>
                <SearchInput
                    type="text"
                    name="mealName"
                    placeholder="Search Recipe"
                    onChange={handleSelectChange}
                    id="mealName"
                />
                <SearchButton
                    type="submit"
                    name="mealName"
                    onClick={handleFormSubmit}
                >
                    Search
                </SearchButton>
            </SearchContainer>
            <SearchContainer>
                <SearchInput
                    type="text"
                    name="ingredient"
                    placeholder="Search Ingredient"
                    onChange={handleSelectChange}            
                    id="ingredient"
                />
                <SearchButton
                    type="submit"
                    name="ingredient"
                    onClick={handleFormSubmit}
                >
                    Search
                </SearchButton>
            </SearchContainer>
            <SearchContainer>
                <FilterSelect
                    name="category"
                    onChange={handleSelectChange}
                    id="category"
                >
                    <option value="">Category</option>
                    {categoryList.map((category) => (              
                        <option key={category.strCategory} value={category.strCategory}>
                            {category.strCategory}
                        </option>
                    ))}
                </FilterSelect>
                <FilterSelect name="area" onChange={handleSelectChange} id="area">
                    <option value="">Cuisine</option>
                    {areaList.map((area) => (
                        <option key={area.strArea} value={area.strArea}>
                            {area.strArea}
                        </option>
                    ))}
                </FilterSelect>
            </SearchContainer>
            <SearchResult
                category={selectedCategory}
                area={selectedArea}
                ingredient={selectedIngredient}
                mealName={selectedMealName}
            />
        </Container>
    );
};

export default SearchForm;
