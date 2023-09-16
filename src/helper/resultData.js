function generateData(categories, product) {
  let arr = [];
  for (const item of categories) {
    arr.push(item.Title);
  }
  let newArray = createObjectFromKeys(arr);
  for (const i of product) {
    for (const j of newArray) {
      if (i.MainCategory === j.name) {
        j.quantity++;
      }
    }
  }
  return newArray;
}

function createObjectFromKeys(keys) {
  const arr = [];
  for (const key of keys) {
    const obj = {
      name: "xyz",
      quantity: 0,
    };
    obj.name = key; // You can set a default value here if needed
    arr.push(obj);
  }
  return arr;
}

export default generateData;
