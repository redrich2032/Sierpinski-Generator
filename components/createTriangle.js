const equilateralHeight = 1.73205080757 / 2; // sqrt(3) / 2 * length of side = height
let originalArray = [];
let newArray = [[0, 0]];

let createTriangle = (n, count) => {
  if (count == 1) {
    originalArray = [
      [0, 0],
      [0.5, 1],
      [1.5, 1],
      [2, 0],
    ]; //prev triangle
  }

  let x = 0;
  let y = 0;

  if (n == 1) {
    originalArray = [
      [0, 0],
      [0.5, 1],
      [1.5, 1],
      [2, 0],
    ]; //prev triangle
    return originalArray;
  } else if (count < n) {
    newArray.length = 0;
    newArray.push([0, 0]); // add default coordinate
    //create left side of triangle
    for (let i = 0; i < originalArray.length - 1; i++) {
      let slope =
        (originalArray[i + 1][1] - originalArray[i][1]) /
        (originalArray[i + 1][0] - originalArray[i][0]);
      if (slope > 0) {
        if (originalArray[i][0] - originalArray[i + 1][0] > 0) {
          //slope is positive left side of the previous triangle
          x -= 1;
        } else {
          //slope is positive right side of the previous triangle
          x += 1;
        }
      } else if (slope < 0) {
        if (originalArray[i][1] - originalArray[i + 1][1] < 0) {
          //negative slope on left side of previous triangle
          x += 0.5;
          y -= equilateralHeight;
        } else {
          //negative slope on the right side of previous triangle
          x -= 0.5;
          y += equilateralHeight;
        }
      } else {
        if (originalArray[i][0] - originalArray[i + 1][0] > 0) {
          //horizontal slope on the left side of previous triangle
          x -= 0.5;
          y -= equilateralHeight;
        } else {
          //horizontal slope on right side of previous triangle
          x += 0.5;
          y += equilateralHeight;
        }
      }
      newArray.push([x.toFixed(16), y.toFixed(16)]); //add to new array
    }
    //create top of triangle
    for (let i = 0; i < originalArray.length - 1; i++) {
      let slope =
        (originalArray[i + 1][1] - originalArray[i][1]) /
        (originalArray[i + 1][0] - originalArray[i][0]);
      if (slope > 0) {
        if (originalArray[i][0] - originalArray[i + 1][0] > 0) {
          x -= 0.5;
          y -= equilateralHeight;
        } else {
          x += 0.5;
          y += equilateralHeight;
        }
      } else if (slope < 0) {
        if (originalArray[i][1] - originalArray[i + 1][1] > 0) {
          x += 0.5;
          y -= equilateralHeight;
        } else {
          x -= 0.5;
          y += equilateralHeight;
        }
      } else {
        if (originalArray[i][0] - originalArray[i + 1][0] > 0) {
          x -= 1;
        } else {
          x += 1;
        }
      }
      newArray.push([x.toFixed(16), y.toFixed(16)]);
    }

    //create right of triangle
    for (let i = 0; i < originalArray.length - 1; i++) {
      let slope =
        (originalArray[i + 1][1] - originalArray[i][1]) /
        (originalArray[i + 1][0] - originalArray[i][0]);
      if (slope > 0) {
        if (originalArray[i][0] - originalArray[i + 1][0] > 0) {
          x += 0.5;
          y += equilateralHeight;
        } else {
          x -= 0.5;
          y -= equilateralHeight;
        }
      } else if (slope < 0) {
        if (originalArray[i][1] - originalArray[i + 1][1] < 0) {
          x -= 1;
        } else {
          x += 1;
        }
      } else {
        if (originalArray[i][0] - originalArray[i + 1][0] > 0) {
          x -= 0.5;
          y += equilateralHeight;
        } else {
          x += 0.5;
          y -= equilateralHeight;
        }
      }
      newArray.push([x.toFixed(16), y.toFixed(16)]);
    }

    originalArray.length = 0;
    for (let i = 0; i < newArray.length; i++) {
      originalArray.push(newArray[i]);
    }

    return createTriangle(n, count + 1); // generate the rest of the triangle through recurssion
  }
  return newArray;
};

export default createTriangle;
