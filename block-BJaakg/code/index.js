const url = `https://www.anapioficeandfire.com/api/books`;
const booksElm = document.querySelector(".books");
const modal = document.querySelector(".modal");

function createElm(name) {
  return document.createElement(name);
}

function makeUI(books) {
  booksElm.innerHTML = "";
  books.forEach(function (book) {
    let li = createElm("li");
    li.classList.add(
      "book",
      "flex",
      "flex-33",
      "justify-ct",
      "align-ct",
      "flex-dir-col"
    );

    let h2 = createElm("h2");
    h2.innerText = book.name;
    h2.classList.add("book-title");

    let h4 = createElm("h4");
    h4.innerText = book.authors[0];
    h4.classList.add("author");

    let a = createElm("a");
    a.innerText = `Show Characters (${book.characters.length})`;
    a.href = book.url;
    a.classList.add("characters-btn");

    li.append(h2, h4, a);
    booksElm.append(li);
  });
}

function makeModalUI(data) {
  /* 
        div.modal-content
            >span.close
            >p.modal-heading
            >ul.characters-list
                >li.character-item
    */
  modal.innerHTML = "";
  let div = createElm("div");
  div.classList.add("modal-content");

  let divHeader = createElm("div");
  divHeader.classList.add("modal-header", "flex", "justify-sb", "align-ct");

  let span = createElm("span");
  span.innerHTML = "&times;";
  span.classList.add("close");

  let h2 = createElm("h2");
  h2.innerText = "Characters List";
  h2.classList.add("modal-heading");

  let ul = createElm("ul");
  ul.classList.add("characters-list");

  data.forEach(function (data, index) {
    let li = createElm("li");
    li.classList.add("character-items");
    li.innerText = `${index}) ${data.name}  (${data.aliases.join(", ")})`;

    ul.append(li);
    div.append(ul);
  });

  divHeader.append(h2, span);
  div.prepend(divHeader);
  modal.append(div);
}

function handleSpinner(elm, status = false) {
  if (status) {
    elm.innerHTML = `<div class="lds-roller">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                             </div>`;
  }
}

function init() {
  handleSpinner(booksElm, true);
  fetch(url)
    .then((res) => {
      if (res.ok && res.status === 200) {
        return res.json();
      } else {
        throw new Error("something went wrong");
      }
    })
    .then((data) => {
      handleSpinner();
      makeUI(data);
    })
    .catch((err) => {
      alert(err);
      booksElm.innerHTML =
        "<p style='text-align:center;'>There is some error happening. Please try later.</p>";
      booksElm.classList.add("justify-ct", "align-ct");
    });
}

init();

// need to use event delegation when there are elements created dynamically and we need to put event listener on it
//for "a" tag

booksElm.addEventListener("click", function (e) {
  e.preventDefault();
  const url = e.target.href;
  modal.style.display = "block";
  handleSpinner(modal, true);
  fetch(url)
    .then((res) => {
      if (res.ok && res.status === 200) {
        return res.json();
      } else {
        throw new Error("something went wrong");
      }
    })
    .then((data) =>
      Promise.all(
        data.characters.map((chars) => fetch(chars).then((res) => res.json()))
      ).then((data) => {
        makeModalUI(data);
      })
    )
    .catch((err) => {
      alert(err);
      booksElm.innerHTML =
        "<p style='text-align:center;'>We are facing some error. Please try later. <br>Redirecting ...</p>";
      modal.style.display = "none";
      booksElm.classList.add("justify-ct", "align-ct");
      setTimeout(() => {
          booksElm.classList.remove("justify-ct", "align-ct");
          init()}, 2000);
    });
});

modal.addEventListener("click", function (e) {
  modal.style.display = "none";
  init();
});
