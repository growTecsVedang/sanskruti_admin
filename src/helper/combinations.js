export const takeObj = (...objects) => {
  const dynamicArray = [];
  objects.forEach((item) => {
    let count = Object.keys(item).length;

    let i = 0;
    while (i < count) {
      let tempArray = [];
      if (i > 0) {
        let arr = item[`${i}`].childern;
        arr = arr.filter((item) => item.state !== false);
        arr.forEach((i) => {
          tempArray.push(i.value);
        });
      }
      if (i > 0 && tempArray.length > 0) {
        dynamicArray.push(tempArray);
      }
      i = i + 1;
    }
  });
  return dynamicArray;
};

// const atributes = [];
// let arr = [];

export const generateCombinations = (...arrays) => {
  const combinations = [[]];
  const result = [];
  for (let i = 0; i < arrays.length; i++) {
    const currentArray = arrays[i];
    const temp = [];

    for (let j = 0; j < combinations.length; j++) {
      for (let m = 0; m < currentArray.length; m++) {
        temp.push([...combinations[j], currentArray[m]]);
      }
    }
    combinations.length = 0;
    combinations.push(...temp);
  }
  combinations.forEach((ele) => {
    var a = [];
    ele.forEach((i) => {
      a.push(i);
    });
    if (a.length > 0) {
      result.push(a);
    }
    a = [];
  });
  return result;
};

export const generateResponse = (arr, obj) => {
  const result = [];
  const myObj = {};
  const combinationString = [];
  arr.forEach((item, key) => {
    var count = 0;
    const object = obj.reduce((acc, key) => {
      var default_value;
      if (item[count] === undefined) {
        default_value = 0;
      } else {
        default_value = item[count];
      }
      acc[key] = default_value;
      count = count + 1;
      return acc;
    }, {});
    object["combinationString"] = arr[key];
    result.push(object);
  });
  return result;
};
