/**
 * Retrieves saved meal IDs from local storage.
 * 
 * @returns {Array} - An array of saved meal IDs. If none exist, an empty array is returned.
 */
export const getSavedMealIds = () => {
    const savedMealIds = localStorage.getItem('saved_meals')
      ? JSON.parse(localStorage.getItem('saved_meals'))
      : [];
  
    return savedMealIds;
  };
  
  /**
   * Saves an array of meal IDs to local storage. If the array is empty, 
   * it will remove the 'saved_meals' key from local storage.
   * 
   * @param {Array} mealIdArr - An array of meal IDs to save.
   */
  export const saveMealIds = (mealIdArr) => {
    if (mealIdArr.length) {
      localStorage.setItem('saved_meals', JSON.stringify(mealIdArr));
    } else {
      localStorage.removeItem('saved_meals');
    }
  };
  
  /**
   * Removes a specific meal ID from the saved list in local storage.
   * 
   * @param {string} idMeal - The ID of the meal to remove.
   * @returns {boolean} - Returns false if there are no saved meals, true otherwise.
   */
  export const removeMealId = (idMeal) => {
    const savedMealIds = localStorage.getItem('saved_meals')
      ? JSON.parse(localStorage.getItem('saved_meals'))
      : null;
  
    if (!savedMealIds) {
      return false;
    }
  
    // No need for optional chaining here since we've already checked savedMealIds exists
    const updatedSavedmealIds = savedMealIds.filter((savedMealId) => savedMealId !== idMeal);
    localStorage.setItem('saved_meals', JSON.stringify(updatedSavedmealIds));
  
    return true;
  };
  