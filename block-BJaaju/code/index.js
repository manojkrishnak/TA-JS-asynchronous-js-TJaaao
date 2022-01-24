let search = document.querySelector(".search");
let clientId = "w0qIgKrbABH-jgcxg7nK6dMVwLj89K1jiTHcQmcd5gc";


function xhrRequest(url, cb){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function(){
        let imagesData = JSON.parse(xhr.response);
        cb(imagesData);
    }
    xhr.send();
}

function makeUI(images){
    let imagesDiv = document.querySelector(".images");
    imagesDiv.innerHTML = "";
    images.forEach(function(image, index){
        let img = document.createElement("img");
        img.src = image.urls.thumb;
        img.alt = "unsplash-img-"+ index;
        imagesDiv.append(img);
    });
}


search.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        let searchTerm = event.target.value;
        let url = `https://api.unsplash.com/photos/random/?client_id=${clientId}&count=20&query=${searchTerm}`;
        xhrRequest(url, makeUI);
        event.target.value = "";
    }
})


