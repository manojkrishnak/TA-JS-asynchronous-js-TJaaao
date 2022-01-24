const input = document.querySelector(".username-input");
const randomBtn = document.querySelector(".random-btn");
let followersUl = document.querySelector(".followers-ul");
let followingUl = document.querySelector(".following-ul");


function displayFollowersAndFollowing(url, call, ul){
    followersUl.innerHTML = "";
    followingUl.innerHTML = "";
    xhrRequest(url, call, function(data){
        let users = data.length > 5 ? data.slice(0,5) : data;
        users.forEach(function(user){
            let li = document.createElement("li");
            let img = document.createElement("img");
            img.classList.add(`${call}-img`);
            img.src = user.avatar_url;
            img.alt = user.login + "-img";
            li.append(img);
            ul.append(li);
        })
    })
}

function displayUI(userData){
    const profilePic = document.querySelector(".profile-pic");
    const name = document.querySelector(".name");
    const username = document.querySelector(".username");

    profilePic.src = userData.avatar_url;
    profilePic.alt = userData.login + "-img";

    name.innerText = userData.name === null ? userData.login : userData.name;

    username.innerText = "@"+ userData.login;
    displayFollowersAndFollowing(userData.followers_url,"followers", followersUl);
    displayFollowersAndFollowing(userData.url + "/following","following", followingUl);
}

function xhrRequest(url, call, cb){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function(){
        let userData = JSON.parse(xhr.response);
        if(userData.message && call === "search"){
            alert(`Sorry, there is no Github user with this username`);
            return;
        }
        cb(userData);
    };
    xhr.send();
};

input.addEventListener("keyup", function(event){
    if(event.keyCode === 13 && event.target.value !== ""){
        let username = event.target.value;
        let url = `https://api.github.com/users/${username}`;
        console.log(url)
        event.target.value = "";
        xhrRequest(url, "search", displayUI);
    }
});

randomBtn.addEventListener("click", function(){
    let url = "https://dog.ceo/api/breeds/image/random";
    xhrRequest(url, "random", function(data){
        let randomDogImg = document.querySelector(".pic");
        randomDogImg.src = data.message;
        randomDogImg.alt = "img";
    })
})





