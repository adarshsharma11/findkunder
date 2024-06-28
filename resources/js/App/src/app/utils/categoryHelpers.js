/**
 * Formats categories with their subcategories.
 * @param {Array} categories - The categories array from the API.
 * @returns {Array} - An array of formatted categories with their subcategories.
 */
export function formatCategories(categories) {
  const categoriesMap = new Map();

  // Group subcategories under their parent category
  categories.forEach(category => {
    if (!category.parent_id) {
      // It's a parent category
      categoriesMap.set(category.id, { ...category, subcategories: [] });
    } else {
      // It's a subcategory
      if (categoriesMap.has(category.parent_id)) {
        categoriesMap.get(category.parent_id).subcategories.push(category);
      } else {
        categoriesMap.set(category.parent_id, { subcategories: [category] });
      }
    }
  });

  return Array.from(categoriesMap.values());
}
