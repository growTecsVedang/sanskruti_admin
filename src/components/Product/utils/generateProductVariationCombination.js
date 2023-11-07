const recursiveCombinationGenerator = (
  variations,
  productVariations,
  index = 0,
  currentCombination = []
) => {
  if (index === variations.length) {
    const inputObject = {
      combinationString: currentCombination,
      quantity: 0,
      discount: 0,
      price: 0,
    };
    variations.forEach((varient, index) => {
      inputObject[varient.name] = currentCombination[index];
    });
    productVariations.push([currentCombination.join(" - "), inputObject]);
  } else {
    for (const option of variations[index].children) {
      recursiveCombinationGenerator(variations, productVariations, index + 1, [
        ...currentCombination,
        option.value,
      ]);
    }
  }
};

export const generateProductVariationCombination = (variations) => {
  const productVariations = [];
  const filterChildrem = variations.map((parent) => {
    const children = parent.children.filter((child) => child.state === true);
    return { ...parent, children };
  });
  const filteredVariation = filterChildrem.filter(
    (parent) => !!parent.children.length
  );
  if (!filteredVariation.length) return [];
  recursiveCombinationGenerator(filteredVariation, productVariations);
  return productVariations;
};
