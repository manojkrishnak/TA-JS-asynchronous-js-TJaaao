let promiseAll = [1, 2, 3, 4].map(
  (time) =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(time), time * 1000);
    })
);

console.log(promiseAll);

Promise.all([...promiseAll])
  .then((value) => console.log(value))
  .catch((err) => console.log(err));
// ==========================

let usernames = [
  "getify",
  "gaearon",
  "AArnott",
  "subtleGradient",
  "piranha",
  "sindresorhus",
  "manojkrishnak",
];


Promise.all(
  usernames.map((username) =>
    fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json()))
).then(results => 
    results.forEach((result) => 
    console.log(`${result.login} has ${result.followers} followers`)))



// ----------------------
let urls = [
    "https://random.dog/woof.json",
    "https://aws.random.cat/meow"
]

Promise.race(urls.map((url) => fetch(url).then(res => res.json())))
        .then(data => console.log("race",data))