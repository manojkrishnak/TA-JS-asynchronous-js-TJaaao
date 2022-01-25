const url = "https://api.spaceflightnewsapi.net/v3/articles?_limit=30";
let newsSiteOptions = document.querySelector(".news-site");
let newsResult;

function createElm(name) {
  return document.createElement(name);
}

function dynamicNewsSiteNames(news) {
  news
    .reduce((pv, cv) => {
      if (pv.indexOf(cv.newsSite) === -1) pv.push(cv.newsSite);
      return pv;
    }, [])
    .forEach(function (newsSite) {
      let option = document.createElement("option");
      option = new Option(newsSite, newsSite.toLowerCase());
      newsSiteOptions.append(option);
    });
  newsSiteOptions.insertAdjacentHTML(
    "afterbegin",
    "<option disabled selected>Select a news source</option>"
  );
}

/*
ul>
    li > 
        div.col-1-2 > figure > img
        div.col-2-2 > span > h2 > a
*/

function createUI(data) {
  let newsElm = document.querySelector(".news");
  newsElm.innerHTML = "";
  data.forEach(function (data) {
    let li = createElm("li");
    li.classList.add("news-item", "flex", "justify-bt");

    let article = createElm("article");
    article.classList.add("col-2-2");

    let figure = createElm("figure");
    figure.classList.add("col-1-2");

    let img = createElm("img");
    img.src = data.imageUrl;
    img.alt = "article-img";

    let span = createElm("span");
    span.classList.add("site-name");
    span.innerText = data.newsSite;

    let h2 = createElm("h2");
    h2.classList.add("article-title");
    h2.innerText = data.title;

    let a = createElm("a");
    a.classList.add("read-more-btn");
    a.innerText = "Read More";
    a.href = data.url;
    a.setAttribute("target", "_blank");

    figure.append(img);

    article.append(span, h2, a);

    li.append(figure, article);
    newsElm.append(li);
  });
}

function filterNews(news, selection) {
  let filteredNews = news.filter(el => {
    if (el.newsSite === selection) {
      return el;
    }
  });
  return filteredNews;
}

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    newsResult = data;
    dynamicNewsSiteNames(data);
    return data;
  })
  .then((data) => createUI(data));

newsSiteOptions.addEventListener("change", function (event) {
  const selectedSite = event.target.options[event.target.selectedIndex].text;
  createUI(filterNews(newsResult, selectedSite));
});
