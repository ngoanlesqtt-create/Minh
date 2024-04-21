const bodyTag = document.getElementById("body");
const bestSellerBooksBigElement = document.getElementById("bestseller-books");
const rightArrows = document.getElementsByClassName("fa-solid fa-arrow-right");
const leftArrows = document.getElementsByClassName("fa-solid fa-arrow-left");
const mainShowedImageTag = document.getElementById("main-showed-picture");
const indexItemsTags = document.getElementsByClassName("index-item");
const mainContentTag = document.getElementById("main-content");
const hightlightBooks = document.getElementById("hightlight-books");
const boutBooksQuanlity = document.getElementById("bought-book-quanlity");
const cartMovementTag = document.getElementById("cart-movement");
const popUpTag = document.getElementById("pop-up");
const baseURL = "http://139.180.134.207/DoAnMobile/Client/assets/images/";
let countedImages = 1;
let relatedBooks = [];
let item;
let boughtBook = window.localStorage.getItem("boughtBooks");
let datasets = [];
let books;
let sum = 0;
const kindBook = [
  "Kinh Điển",
  "Tâm Lý - Kỹ Năng Sống",
  "Văn Học",
  "Lịch Sử",
  "Chính Trị",
];
let state = false;
let changedItemQuanlity = 0;
let totalBoughtBookQuanlity = 0;
let boughtBooksQuanlity;
if (window.localStorage.getItem("boughtBooksQuanlity") === null) {
  boughtBooksQuanlity = 0;
  if (JSON.parse(localStorage.getItem("addedBooks")) === 0) {
    boughtBooksQuanlity = 0;
    boutBooksQuanlity.textContent = boughtBooksQuanlity;
  } else {
    boutBooksQuanlity.textContent = 0;
    boughtBooksQuanlity = JSON.parse(localStorage.getItem("addedBooks"));
  }
} else boughtBooksQuanlity = window.localStorage.getItem("boughtBooksQuanlity");
let boughtBooks = window.localStorage.getItem("boughtBooks");
if (boughtBooks !== null) {
  boughtBooks = JSON.parse(boughtBooks);
  boughtBooksQuanlity = JSON.parse(
    window.localStorage.getItem("boughtBooksQuanlity")
  );
  if (boughtBooksQuanlity === null)
    boughtBooksQuanlity = JSON.parse(window.localStorage.getItem("addedBooks"));
  else
    boughtBooksQuanlity = JSON.parse(
      window.localStorage.getItem("boughtBooksQuanlity")
    );

  boutBooksQuanlity.textContent = boughtBooksQuanlity;
}

async function handleJSONBooks() {
  const response = await fetch("../Books.json");
  const results = await response.json();
  return results;
}

const JSONBooks = handleJSONBooks();
JSONBooks.then((book) => {
  for (let i = 0; i <= book.length - 1; i++) datasets.push(book[i]);
});

async function handleVerticalJSON() {
  const reponse = await fetch("http://139.180.134.207:3000/book/all");
  const results = await reponse.json();
  return results;
}
const results = handleVerticalJSON();
results.then((data) => {
  try {
    if (data) popUpTag.style.display = "none";

    for (let j = 0; j <= datasets.length - 1; j++)
      addBooks(data, datasets, kindBook, j);
    for (let i = 0; i < datasets[datasets.length - 1].books.length; i++) {
      const bestsellerBooksDivElements = document.createElement("div");
      bestsellerBooksDivElements.classList.add("imformation-bestseller-books");
      bestSellerBooksBigElement.appendChild(bestsellerBooksDivElements);

      const imgElements = document.createElement("img");
      imgElements.src = baseURL + datasets[datasets.length - 1].books[i].image;
      imgElements.alt = datasets[datasets.length - 1].books[i].name;
      imgElements.classList.add("bestseller-pictures");
      imgElements.addEventListener("click", function () {
        showItem(datasets[datasets.length - 1].books[i], datasets.length - 1);
      });
      bestsellerBooksDivElements.appendChild(imgElements);

      const contentElements = document.createElement("div");
      contentElements.classList.add("bestSellerContent");
      contentElements.addEventListener("click", function () {
        showItem(datasets[datasets.length - 1].books[i], datasets.length - 1);
      });
      bestsellerBooksDivElements.appendChild(contentElements);

      const contentTags = document.createElement("p");
      contentTags.textContent = datasets[datasets.length - 1].books[i].name;

      const priceElements = document.createElement("p");
      priceElements.textContent =
        datasets[datasets.length - 1].books[i].cost.toLocaleString("en-US") +
        " VNĐ";
      contentElements.appendChild(contentTags);
      contentElements.appendChild(priceElements);

      const imformationDivElements = document.createElement("div");
      bestsellerBooksDivElements.appendChild(imformationDivElements);

      const detailDivElements = document.createElement("button");
      imformationDivElements.appendChild(detailDivElements);
      detailDivElements.textContent = "Chi tiết sản phẩm";
      detailDivElements.addEventListener("click", function () {
        showItem(datasets[datasets.length - 1].books[i], datasets.length - 1);
      });

      const addingDivElements = document.createElement("button");
      imformationDivElements.appendChild(addingDivElements);
      addingDivElements.textContent = "Thêm vào giỏ hàng";
      addingDivElements.addEventListener("click", () => {
        handleCart(datasets, datasets.length - 1, i);
      });
    }
  } catch (e) {
    console.log(e);
  }
});

function handleIndex(id) {
  for (let i = 0; i < indexItemsTags.length; i++)
    if (i + 1 === id) {
      indexItemsTags[i].classList.add("active");
    } else indexItemsTags[i].classList.remove("active");
}

function next() {
  if (countedImages <= 4) {
    mainShowedImageTag.src = `../Assets/MainPictures/p${countedImages}.webp`;
    handleIndex(countedImages);
  } else if (countedImages > 4) countedImages = 0;
  countedImages++;
}
setInterval(next, 6000);
for (let i = 0; i < rightArrows.length; i++) {
  rightArrows[i].addEventListener("click", () => {
    countedImages++;
    if (countedImages <= 4) {
      mainShowedImageTag.image = `../Assets/MainPictures/p${countedImages}.webp`;
      handleIndex(countedImages);
    } else if (countedImages > 4) countedImages = 4;
  });
}

for (let i = 0; i < leftArrows.length; i++) {
  leftArrows[i].addEventListener("click", () => {
    countedImages--;
    if (countedImages >= 1) {
      mainShowedImageTag.image = `../Assets/MainPictures/p${countedImages}.webp`;
      handleIndex(countedImages);
    } else countedImages = 1;
  });
}

function addBooks(data, datasets, kindBook, j) {
  let classicalBooks = data.filter((book) => {
    for (let i = 0; i <= book.genres.length - 1; i++)
      if (book.genres[i].includes(kindBook[j])) return book;
  });
  for (let i = 0; i <= classicalBooks.length - 1; i++)
    datasets[j].books.push(classicalBooks[i]);
}
async function handleBookIndexJSON() {
  const response = await fetch("http://139.180.134.207:3000/book/all");
  const results = await response.json();
  return results;
}
const bookIndexResults = handleBookIndexJSON();
bookIndexResults.then((data) => {
  try {
    for (let j = 0; j <= datasets.length - 1; j++)
      addBooks(data, datasets, kindBook, j);
    const copiedData = copyData(datasets);
    for (let i = 0; i <= datasets.length - 2; i++) {
      const bookTopicElements = document.createElement("div");
      bookTopicElements.classList.add("book-topics");
      mainContentTag.appendChild(bookTopicElements);
      const indexHeaders = document.createElement("h1");
      indexHeaders.textContent = datasets[i].header;
      bookTopicElements.appendChild(indexHeaders);
      const bookTopicImages = document.createElement("div");
      bookTopicImages.classList.add("book-topic-images");
      bookTopicElements.appendChild(bookTopicImages);
      const leftITag = document.createElement("i");
      leftITag.classList.add("fa-solid");
      leftITag.classList.add("fa-arrow-left");
      bookTopicImages.appendChild(leftITag);

      for (let j = 0; j <= 3; j++) {
        const subDivElements = document.createElement("div");
        subDivElements.classList.add("subDivTags");
        bookTopicImages.appendChild(subDivElements);
        const imgTopicElements = document.createElement("img");
        imgTopicElements.src = baseURL + datasets[i].books[j].image;
        imgTopicElements.classList.add("book-images");
        imgTopicElements.onmouseover = function () {
          imformationDivElements.style.display = "flex";
        };
        imgTopicElements.addEventListener("mouseout", function () {
          imformationDivElements.style.display = "none";
        });
        imgTopicElements.addEventListener("click", function () {
          item = findItemByClick(datasets, i, j);
          showItem(item, i);
        });
        subDivElements.appendChild(imgTopicElements);
        const bookNameElements = document.createElement("p");
        bookNameElements.textContent = datasets[i].books[j].name;
        bookNameElements.classList.add("book-names");
        bookNameElements.addEventListener("click", function () {
          item = findItemByClick(datasets, i, j);
          showItem(item, i);
        });

        subDivElements.appendChild(bookNameElements);
        const bookPriceElements = document.createElement("p");
        bookPriceElements.classList.add("book-prices");
        bookPriceElements.textContent =
          datasets[i].books[j].cost.toLocaleString("en-US") + " VNĐ";
        subDivElements.appendChild(bookPriceElements);

        const imformationDivElements = document.createElement("div");
        imformationDivElements.classList.add("bookFunction");
        subDivElements.appendChild(imformationDivElements);
        imformationDivElements.style.display = "none";
        imformationDivElements.onmouseover = function () {
          imformationDivElements.style.display = "flex";
        };
        imformationDivElements.addEventListener("mouseout", function () {
          imformationDivElements.style.display = "none";
        });

        const addingBtnElements = document.createElement("button");
        imformationDivElements.appendChild(addingBtnElements);
        addingBtnElements.textContent = "Thêm vào giỏ hàng";
        addingBtnElements.addEventListener("click", function () {
          //dang lam o day
          handleCart(datasets, i, j);
        });

        const detailsBtnElements = document.createElement("button");
        imformationDivElements.appendChild(detailsBtnElements);
        detailsBtnElements.textContent = "Chi tiết sản phẩm";
        detailsBtnElements.addEventListener("click", function () {
          item = findItemByClick(datasets, i, j);
          showItem(item, i);
        });
      }

      const rightIElements = document.createElement("i");
      rightIElements.classList.add("fa-solid");
      rightIElements.classList.add("fa-arrow-right");
      rightIElements.classList.add("right");
      bookTopicImages.appendChild(rightIElements);
      const imgTopicTags = document.getElementsByClassName("book-images");
      const bookNameTags = document.getElementsByClassName("book-names");
      const bookPriceTags = document.getElementsByClassName("book-prices");
      rightIElements.addEventListener("click", function () {
        nextItem(copiedData, imgTopicTags, bookNameTags, bookPriceTags, i);
      });
      leftITag.addEventListener("click", function () {
        returnItem(copiedData, imgTopicTags, bookNameTags, bookPriceTags, i);
      });
    }
  } catch (e) {
    console.log(e);
  }
});

function findItemByClick(data = [], i, j) {
  for (let x = 0; x < data.length; x++)
    for (let y = 0; y < data[x].books.length - 1; y++)
      if (data[i].books[j].name.includes(data[x].books[y].name))
        return data[x].books[y];
}

function copyData(data = []) {
  const copiedData = [];
  for (let i = 0; i <= data.length - 1; i++) {
    copiedData.push(data[i]);
  }
  return copiedData;
}
function nextItem(
  copiedData = [],
  imgTopicTags,
  bookNameTags,
  bookPriceTags,
  i
) {
  let x = 0;

  let erasedData = copiedData[i].books.splice(0, 1);
  copiedData[i].books.push(erasedData[0]);
  renderBooks(copiedData, imgTopicTags, bookNameTags, bookPriceTags, i, x);
}

function returnItem(
  copiedData = [],
  imgTopicTags,
  bookNameTags,
  bookPriceTags,
  i
) {
  let x = 0;
  copiedData[i].books.unshift(
    copiedData[i].books[copiedData[i].books.length - 1]
  );
  copiedData[i].books.splice(copiedData[i].books.length - 1, 1);
  renderBooks(copiedData, imgTopicTags, bookNameTags, bookPriceTags, i, x);
}

function renderBooks(
  copiedData,
  imgTopicTags,
  bookNameTags,
  bookPriceTags,
  i,
  x
) {
  if (i === 0) {
    for (x; x <= 3; x++) {
      copiedData[i].books[x].cost =
        copiedData[i].books[x].cost.toLocaleString("en-US");
      console.log(copiedData[i].books[x].cost);
      imgTopicTags[x].src = baseURL + copiedData[i].books[x].image;
      bookNameTags[x].textContent = copiedData[i].books[x].name;
      bookPriceTags[x].textContent = copiedData[i].books[x].cost + " VNĐ";
    }
  } else if (i === 1) {
    for (let x = 4; x <= 7; x++) {
      copiedData[i].books[x - 4].cost =
        copiedData[i].books[x - 4].cost.toLocaleString("en-US");
      imgTopicTags[x].src = baseURL + copiedData[i].books[x - 4].image;
      bookNameTags[x].textContent = copiedData[i].books[x - 4].name;
      bookPriceTags[x].textContent = copiedData[i].books[x - 4].cost + " VNĐ";
    }
  } else if (i === 2) {
    for (let x = 8; x <= 11; x++) {
      copiedData[i].books[x - 8].cost =
        copiedData[i].books[x - 8].cost.toLocaleString("en-US");
      imgTopicTags[x].src = baseURL + copiedData[i].books[x - 8].image;
      bookNameTags[x].textContent = copiedData[i].books[x - 8].name;
      bookPriceTags[x].textContent = copiedData[i].books[x - 8].cost + " VNĐ";
    }
  } else if (i === 3) {
    for (let x = 12; x <= 15; x++) {
      copiedData[i].books[x - 12].cost =
        copiedData[i].books[x - 12].cost.toLocaleString("en-US");
      imgTopicTags[x].src = baseURL + copiedData[i].books[x - 12].image;
      bookNameTags[x].textContent = copiedData[i].books[x - 12].name;
      bookPriceTags[x].textContent = copiedData[i].books[x - 12].cost + " VNĐ";
    }
  }
}

function showItem(item, i) {
  if (boughtBooks === null && boughtBook != null) {
    boughtBooks = [];
    for (let i = 0; i <= boughtBook.length - 1; i++)
      boughtBooks.push(boughtBook[i]);
  } else if (boughtBooks !== null) {
    boughtBooks = JSON.parse(window.localStorage.getItem("boughtBooks"));
    window.localStorage.setItem("mainBoughtBooks", boughtBooks);
  }

  window.localStorage.clear();
  window.localStorage.setItem("book", JSON.stringify(item));
  window.localStorage.setItem("mainBoughtBooks", JSON.stringify(boughtBooks));
  window.localStorage.setItem("kindBook", i);
  window.localStorage.setItem(
    "addedBooks",
    JSON.stringify(boughtBooksQuanlity)
  );

  location.href = "../Pages/Item.html";
}
function handleCart(datasets, i, j) {
  if (localStorage.getItem("boughtBooksQuanlity") !== null);
  {
    changedItemQuanlity = JSON.parse(
      localStorage.getItem("boughtBooksQuanlity")
    );
    if (changedItemQuanlity === null) {
      changedItemQuanlity = JSON.parse(localStorage.getItem("addedBooks"));
      console.log(
        "test dong 397 main changedItemQuanlity=",
        changedItemQuanlity
      );
    }
  }

  if (localStorage.getItem("boughtBooks") !== null) {
    boughtBook = JSON.parse(localStorage.getItem("boughtBooks"));
    console.log("test dong 399 boughtBook=", boughtBook);
  } else boughtBook = [];
  item = findItemByClick(datasets, i, j);
  changedItemQuanlity++;
  boutBooksQuanlity.textContent = changedItemQuanlity;
  books = {
    image: item.image,
    name: item.name,
    cost: item.cost,
    quanlity: changedItemQuanlity,
    totalCost: item.cost * changedItemQuanlity,
    genres: i,
    numPages: item.numPages,
    size: item.size,
    weight: item.weight,
    longDescription: item.longDescription,
    author: item.author,
    publishYear: item.publishYear,
  };
  sum = 0;
  boughtBook.push(books);
  if (boughtBook.length >= 2) {
    for (let x = 0; x < boughtBook.length - 1; x++)
      for (let y = x + 1; y < boughtBook.length; y++)
        if (boughtBook[x].name == boughtBook[y].name) boughtBook.splice(x, 1);

    for (let x = 0; x <= boughtBook.length - 1; x++)
      if (boughtBook[x].name !== item.name) sum += boughtBook[x].quanlity;

    for (let x = 0; x <= boughtBook.length - 1; x++)
      if (boughtBook[x].name == item.name)
        boughtBook[x].quanlity = changedItemQuanlity - sum;
  }
  boughtBooksQuanlity = changedItemQuanlity;
  localStorage.setItem("boughtBooks", JSON.stringify(boughtBook));
  localStorage.setItem("boughtBooksQuanlity", boughtBooksQuanlity);
}
cartMovementTag.addEventListener("click", function () {
  window.localStorage.setItem("addedBooks", boughtBooksQuanlity);
  location.href = "./Pages/Cart.html";
});
const searchingTag = document.getElementById("search");
searchingTag.onchange = function () {
  let searchingWords = searchingTag.value;
  localStorage.setItem("searchingWords", searchingWords);
};
const searchingBtnTag = document.getElementById("search-btn");
searchingBtnTag.addEventListener("click", function () {
  let searchingWords = localStorage.getItem("searchingWords");
  if (searchingWords === null) {
    alert("Bạn vui lòng nhập từ khóa cần tìm");
    return;
  }
  window.location = "../Pages/SearChingPage.html";
});
const movingPictureTag = document.getElementById("moving-picture");
const count = 50;
for (let i = 0; i <= 50 - 1; i++) {
  let leftSnow = Math.floor(Math.random() * movingPictureTag.clientWidth);
  let topSnow = Math.floor(Math.random() * movingPictureTag.clientHeight);
  let widthSnow = Math.floor(Math.random() * 50);
  let timeSnow = Math.floor(Math.random() * 5) + 5;
  let blurSnow = Math.floor(Math.random() * 20);

  const leafElements = document.createElement("div");
  leafElements.classList.add("leaf");
  leafElements.style.left = leftSnow + "px";
  leafElements.style.top = topSnow + "px";
  leafElements.style.width = widthSnow + "px";
  leafElements.style.height = widthSnow + "px";
  leafElements.style.animationDuration = timeSnow + "s";
  leafElements.style.filter = "blur(" + blurSnow + "px)";
  movingPictureTag.appendChild(leafElements);
}

const usernameTag = document.getElementById("loginhead");
const registerTag = document.getElementById("regishead");
localStorage.getItem("token");
const token = localStorage.getItem("token");
console.log(token);
if (token) {
  usernameTag.textContent = localStorage.getItem("username");
  registerTag.style.display = "none";
}
