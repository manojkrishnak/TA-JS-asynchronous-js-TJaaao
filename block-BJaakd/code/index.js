//f1
let f1 = function f1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise Resolved"), 1000);
  });
};

f1().then((data) => console.log(data));

// f2
let f2 = function f2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Rejected Promise!"), 5000);
  });
};

f2()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//f3
let f3 = function f3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Rejected Promise!"), 5000);
  });
};

f3()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// 4. output: "A", "D", "C", "B"

//5.

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise Resolveddd"), time);
  });
}

let waitF = wait;
waitF(5000).then((data) => console.log(data));

// 6.

function add(num) {
  return new Promise((resolve, reject) => {
    resolve(num);
  });
}

let addF = add;
addF(40)
  .then((num) => num + 10)
  .then((num) => num + 100)
  .then((num) => {
    if (num > 100) {
      throw new Error(`${num} is greater than 100`);
    }
  })
  .catch((err) => console.error(err));

//7.
function makeObject(str) {
  return new Promise((resolve, reject) => {
    resolve(["A"]);
  });
}

makeObject()
  .then((singleArray) => {
    singleArray.push("B");
    return singleArray;
  })
  .then((doubleArray) => {
    let arrToObj = {};
    doubleArray.forEach((item, index) => {
      arrToObj[index] = item;
    });
    console.log(arrToObj);
  });

// 8.

let first = new Promise((resolve, reject) => {
  resolve(1);
});

first
  .then((value) => {
    console.log(value);
    return 2;
  })
  .then((value) => {
    console.log(value);
    return 3;
  })
  .then((value) => {
    console.log(value);
    return 4;
  });

console.log(first);

// 9.

let firstF = new Promise((resolve, reject) => {
  resolve(1);
});

firstF.then((value) => {
  console.log(value);
  return 2;
});
firstF.then((value) => {
  console.log(value);
  return 3;
});
firstF.then((value) => {
  console.log(value);
  return 4;
});

console.log(firstF);
// 10.

// 11.

let got = new Promise((resolve, reject) => {
  resolve("John");
}).then(() => {
  return new Promise((resolve, reject) => {
    resolve("Arya");
  }).then((value) => {
      console.log(value)
    return new Promise((resolve, reject) => {
      setTimeout( () => resolve("Arya"), 2000);
    }).then(value => console.log(value))
  });
});

console.log(got);