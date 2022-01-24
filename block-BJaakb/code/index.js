const url = "https://api.github.com/users/getify";

// function xhrRequest(url, cb) {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.onload = function () {
//     console.log(xhr.response);
//     cb(xhr.response);
//   };
//   xhr.onerror = function () {
//     console.log(xhr.response);
//     cb(xhr.response);
//   };
//   xhr.send();
// }

function fetch(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject("something went wrong");
    xhr.send();
  })
    
}

let data = fetch(url)
    .then((data) => console.log(">>>>>>>>>>>>>>>>>", data))
    .catch((err) => alert("err"));
