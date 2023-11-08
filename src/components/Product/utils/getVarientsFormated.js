export const getVerientsFormated = (varients) => {
  const formatedVarient = varients.map((parentVarient) => {
    const childern = parentVarient.value.map((value) => ({
      value,
      state: false,
    }));
    return {
      name: parentVarient.varientName,
      state: false,
      childern,
    };
  });
  return formatedVarient;
};
