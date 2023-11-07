export const getVerientsFormated = (varients) => {
  const formatedVarient = varients.map((parentVarient) => {
    const children = parentVarient.value.map((value) => ({
      value,
      state: false,
    }));
    return {
      name: parentVarient.varientName,
      state: false,
      children,
    };
  });
  return formatedVarient;
};
