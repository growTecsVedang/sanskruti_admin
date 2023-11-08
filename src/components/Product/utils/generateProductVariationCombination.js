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
    for (const option of variations[index].childern) {
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
    const childern = parent.childern?.filter((child) => child.state === true);
    return { ...parent, childern };
  });
  const filteredVariation = filterChildrem.filter(
    (parent) => !!parent.childern?.length
  );
  if (!filteredVariation.length) return [];
  recursiveCombinationGenerator(filteredVariation, productVariations);
  return productVariations;
};
