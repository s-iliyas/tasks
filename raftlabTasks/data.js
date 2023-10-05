const arr = [1, 8, 6, 2, 5, 4, 8, 3, 7];

const func = (arr) => {
  const area = arr.reduce((total, wall, index) => {}, 0);
  let totalAreaPair = [];
  let metersBtw = 0;
  arr.forEach((item, index) => {
    let cal = [];  
    let count = 1;
    for (let i = index + 1; i < arr.length; i++) {
      const diff = arr[i] ? arr[i] < item : item;
      cal.push([[item, arr[i]], diff * count]);
      count += 1;
    }
    console.log(cal);
  });
};

func(arr);
