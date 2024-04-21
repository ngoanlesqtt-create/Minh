const itemTag = document.getElementById("render-item");
const taskbarTag = document.getElementById("taskbar");
const mainPageNavigationTag = document.getElementById("main-page-navigation");
const bookDetailsTag = document.getElementById("book-details");
const mainContentTag = document.getElementById("main-content");
const boughtBooksQuanlity = document.getElementById("bought-book-quanlity");
const cartTag = document.getElementById("cart-navigation");

let relatedBooks = [];
let clickedBook;
let changedItemQuanlity = 0;
let totalBoughtBookQuanlity = 0;
const item = JSON.parse(window.localStorage.getItem("book"));
let boughtBooksQuanlityJSON = JSON.parse(
  localStorage.getItem("boughtBooksQuanlity")
);

let boughtBooks = [];
const numberKindBook = JSON.parse(window.localStorage.getItem("kindBook"));
let copiedData = [];
const baseURL = "http://139.180.134.207/DoAnMobile/Client/assets/images/";
let datasets = [];
const kindBook = [
  "Kinh Điển",
  "Tâm Lý - Kỹ Năng Sống",
  "Văn Học",
  "Lịch Sử",
  "Chính Trị",
];
taskbarTag.innerHTML = `
<ul>
<li id="main-page">Trang chủ/</li>
<li id="main-book-name">${item.name}</li>
</ul>
`;
itemTag.innerHTML = `
<img src="${baseURL + item.image}" alt="" id="big-image">
<div>

<h1 id="book-name">${item.name}</h1>
<h2 id="book-cost">${item.cost.toLocaleString("en-US")} VNĐ</h2>
<div>
<div class="changed-item">
<button id="decreased-item">-</button>
<p id="item-quanlity">${changedItemQuanlity}</p>
<button id="increased-item">+</button>
</div>
<div class="bought-item">
<button id="added-item-btn">Thêm vào giỏ hàng</button>
<button>Mua ngay</button>
</div>
</div>

</div>
<table >
<tr>
  <th style="color:white">Chỉ có ở UITBOOK</th>
</tr>
<tr>
  <td><i class="fa-solid fa-book"></i> Sản phẩm 100% chính hãng</td>
</tr>
<tr>
  <td><i class="fa-solid fa-headphones"></i> Tư vấn mua sách trong giờ hành chính</td>
</tr>
<tr>
  <td><i class="fa-solid fa-truck"></i> Miễn phí vận chuyển cho Đơn hàng từ 250.000đ</td>
</tr>
<tr>
  <td><i class="fa-solid fa-phone-volume"></i> Hotline: 0938.999706</td>
</tr>
</table>
`;
console.log(
  "test dong 74 item typeOf JSON.parse(localStorage.getItem('mainBoughtBooks'))",
  typeof JSON.parse(localStorage.getItem("mainBoughtBooks"))
);

const mainPagetag = document.getElementById("main-page");
const decreasedItemTag = document.getElementById("decreased-item");
const increasedItemTag = document.getElementById("increased-item");
const itemQuanlityTag = document.getElementById("item-quanlity");
const bigImageTag = document.getElementById("big-image");
const bookNameTag = document.getElementById("book-name");
const bookCostTag = document.getElementById("book-cost");
const mainBookName = document.getElementById("main-book-name");
const addedBookBtn = document.getElementById("added-item-btn");
mainPagetag.addEventListener("click", function () {
  if (
    JSON.parse(localStorage.getItem("boughtBooks")) === null &&
    JSON.parse(localStorage.getItem("mainBoughtBooks")) === null
  ) {
    localStorage.removeItem("boughtBooks");
    localStorage.removeItem("mainBoughtBooks");
  } else if (JSON.parse(localStorage.getItem("boughtBooks")) !== null) {
    localStorage.setItem(
      "mainBoughtBooks",
      localStorage.getItem("boughtBooks")
    );
    let a = localStorage.getItem("mainBoughtBooks");
    console.log("test dong 98 a=", a);
  }

  window.location = "../index.html";
});
decreasedItemTag.addEventListener("click", function () {
  changedItemQuanlity--;
  if (changedItemQuanlity >= 0)
    itemQuanlityTag.textContent = changedItemQuanlity;
  else {
    itemQuanlityTag.textContent = 0;
    changedItemQuanlity = 0;
  }
});
increasedItemTag.addEventListener("click", function () {
  changedItemQuanlity++;
  itemQuanlityTag.textContent = changedItemQuanlity;
});
mainPageNavigationTag.addEventListener("click", function () {
  window.location = "../index.html";
});
bookDetailsTag.innerHTML = `
<h2>Giới thiệu sách</h2>
      <ul>
        <li class="book-details">Tác giả:${item.author}</li>
        <li class="book-details">Số trang:${item.numPages}</li>
        <li class="book-details">Trọng lượng:${item.weight} gram</li>
        <li class="book-details">Kích thước:${item.size}</li>
        <li class="book-details">Năm phát hành:${item.publishYear} </li>
        <li class="book-details">${item.longDescription}</li>
      </ul>
`;

function addBooks(data, datasets, kindBook, j) {
  let classicalBooks = data.filter((book) => {
    for (let i = 0; i <= book.genres.length - 1; i++)
      if (book.genres[i].includes(kindBook[j])) return book;
  });
  for (let i = 0; i <= classicalBooks.length - 1; i++) {
    datasets[j].books.push(classicalBooks[i]);
  }
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
async function handleBookIndexJSON() {
  const response = await fetch("http://139.180.134.207:3000/book/all");
  const results = await response.json();
  return results;
}
const bookIndexResults = handleBookIndexJSON();
bookIndexResults.then((data) => {
  for (let j = 0; j <= datasets.length - 1; j++)
    addBooks(data, datasets, kindBook, j);
  copiedData = copyData(data);
  for (let i = 0; i <= datasets.length - 1; i++)
    if (i === numberKindBook) {
      for (let j = 0; j <= datasets[i].books.length - 1; j++)
        relatedBooks.push(datasets[i].books[j]);
    }
  for (let i = 0; i <= 0; i++) {
    const bookTopicElements = document.createElement("div");
    bookTopicElements.classList.add("book-topics");
    mainContentTag.appendChild(bookTopicElements);
    const indexHeaders = document.createElement("h1");
    indexHeaders.textContent = "Sách có liên quan";
    bookTopicElements.appendChild(indexHeaders);
    const bookTopicImages = document.createElement("div");
    bookTopicImages.classList.add("book-topic-images");
    bookTopicElements.appendChild(bookTopicImages);
    const leftITag = document.createElement("i");
    leftITag.classList.add("fa-solid");
    leftITag.classList.add("fa-arrow-left");
    bookTopicImages.appendChild(leftITag);

    for (let j = 0; j <= 2; j++) {
      const subDivElements = document.createElement("div");
      subDivElements.classList.add("subDivTags");
      bookTopicImages.appendChild(subDivElements);
      const imgTopicElements = document.createElement("img");
      imgTopicElements.src = baseURL + relatedBooks[j].image;
      imgTopicElements.classList.add("book-images");
      imgTopicElements.addEventListener("click", function () {
        clickedBook = findItemByClick(relatedBooks, j);
        changBook(clickedBook);
      });
      subDivElements.appendChild(imgTopicElements);
      const bookNameElements = document.createElement("p");
      bookNameElements.textContent = relatedBooks[j].name;
      bookNameElements.classList.add("book-names");
      bookNameElements.addEventListener("click", function () {
        clickedBook = findItemByClick(relatedBooks, j);
        changBook(clickedBook);
      });

      subDivElements.appendChild(bookNameElements);
      const bookPriceElements = document.createElement("p");
      bookPriceElements.classList.add("book-prices");
      bookPriceElements.textContent =
        relatedBooks[j].cost.toLocaleString("en-US") + " VNĐ";
      subDivElements.appendChild(bookPriceElements);
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
      nextItem(relatedBooks, imgTopicTags, bookNameTags, bookPriceTags);
    });
    leftITag.addEventListener("click", function () {
      returnItem(relatedBooks, imgTopicTags, bookNameTags, bookPriceTags);
    });
  }
});
function findItemByClick(data = [], j) {
  for (let y = 0; y < data.length; y++)
    if (data[y].name === data[j].name) return data[y];
}

function copyData(data = []) {
  const copiedData = [];
  for (let i = 0; i <= data.length - 1; i++) {
    copiedData.push(data[i]);
  }
  return copiedData;
}
function nextItem(copiedData = [], imgTopicTags, bookNameTags, bookPriceTags) {
  let x = 0;
  let erasedData = copiedData.splice(0, 1);
  copiedData.push(erasedData[0]);
  renderBooks(copiedData, imgTopicTags, bookNameTags, bookPriceTags, x);
}
function returnItem(
  copiedData = [],
  imgTopicTags,
  bookNameTags,
  bookPriceTags
) {
  let x = 0;
  console.log(copiedData);
  copiedData.unshift(copiedData[copiedData.length - 1]);
  copiedData.splice(copiedData.length - 1, 1);
  renderBooks(copiedData, imgTopicTags, bookNameTags, bookPriceTags, x);
}

function renderBooks(copiedData, imgTopicTags, bookNameTags, bookPriceTags, x) {
  for (x; x <= 2; x++) {
    imgTopicTags[x].src = baseURL + copiedData[x].image;
    bookNameTags[x].textContent = copiedData[x].name;
    bookPriceTags[x].textContent = copiedData[x].cost.toLocaleString("en-US");
  }
}
cartTag.addEventListener("click", function () {
  window.location = "../Pages/Cart.html";
});

function changBook(clickedBook) {
  window.localStorage.setItem("boughtBooks", JSON.stringify(boughtBooks));
  changedItemQuanlity = 0;
  itemQuanlityTag.textContent = changedItemQuanlity;
  bigImageTag.src = baseURL + clickedBook.image;
  bookNameTag.textContent = clickedBook.name;
  bookCostTag.textContent = clickedBook.cost + " VNĐ";
  mainBookName.textContent = clickedBook.name;
  const bookDetailsTag = document.getElementsByClassName("book-details");
  bookDetailsTag[0].textContent = "Tác giả:" + clickedBook.author;
  bookDetailsTag[1].textContent = "Số trang:" + clickedBook.numberPages;
  bookDetailsTag[2].textContent = "Trọng lượng:" + clickedBook.weight;
  bookDetailsTag[3].textContent = "Kích thước:" + clickedBook.size;
  bookDetailsTag[4].textContent = "Năm phát hành:" + clickedBook.publishYear;
  bookDetailsTag[5].innerHTML = clickedBook.longDescription;
}
let addedBooksQuanlity = JSON.parse(window.localStorage.getItem("addedBooks"));
if (addedBooksQuanlity === null) {
  boughtBooksQuanlity.textContent = totalBoughtBookQuanlity;
} else {
  if (boughtBooksQuanlityJSON === null) {
    boughtBooksQuanlity.textContent = addedBooksQuanlity;
    addedBooksQuanlity = Number(addedBooksQuanlity);
    totalBoughtBookQuanlity += addedBooksQuanlity;
  } else boughtBooksQuanlity.textContent = boughtBooksQuanlityJSON;
}
boughtBooks = JSON.parse(window.localStorage.getItem("mainBoughtBooks"));
if (typeof boughtBooks === "string") {
  boughtBooks = JSON.parse(
    JSON.parse(window.localStorage.getItem("mainBoughtBooks"))
  );
  console.log(boughtBooks);
}
addedBookBtn.addEventListener("click", function () {
  if (changedItemQuanlity >= 1) {
    if (JSON.parse(window.localStorage.getItem("mainBoughtBooks")) !== null)
      boughtBooks = JSON.parse(window.localStorage.getItem("mainBoughtBooks"));
    else boughtBooks = [];
    console.log(boughtBooks);
    if (typeof boughtBooks === "string") {
      boughtBooks = JSON.parse(
        JSON.parse(window.localStorage.getItem("mainBoughtBooks"))
      );
    }
    totalBoughtBookQuanlity += changedItemQuanlity;
    itemQuanlityTag.textContent = changedItemQuanlity;
    let books;

    if (clickedBook === undefined) {
      books = {
        image: item.image,
        name: item.name,
        cost: item.cost,
        quanlity: changedItemQuanlity,
        totalCost: item.cost * changedItemQuanlity,
        genres: JSON.parse(localStorage.getItem("kindBook")),
        numPages: item.numPages,
        size: item.size,
        weight: item.weight,
        longDescription: item.longDescription,
        author: item.author,
        publishYear: item.publishYear,
      };
    } else {
      books = {
        image: clickedBook.image,
        name: clickedBook.name,
        cost: clickedBook.cost,
        quanlity: changedItemQuanlity,
        totalCost: clickedBook.cost * changedItemQuanlity,
        genres: JSON.parse(localStorage.getItem("kindBook")),
        numPages: clickedBook.numPages,
        size: clickedBook.size,
        weight: clickedBook.weight,
        longDescription: clickedBook.longDescription,
        author: clickedBook.author,
        publishYear: clickedBook.publishYear,
      };
    }
    boughtBooks.push(books);
    window.localStorage.setItem("mainBoughtBooks", JSON.stringify(boughtBooks));
    if (boughtBooks.length >= 2)
      for (let i = 0; i < boughtBooks.length - 1; i++)
        for (let j = i + 1; j <= boughtBooks.length - 1; j++)
          if (boughtBooks[i].name === boughtBooks[j].name) {
            boughtBooks[j].quanlity += boughtBooks[i].quanlity;
            boughtBooks[j].totalCost =
              boughtBooks[j].quanlity * boughtBooks[j].cost;
            boughtBooks.splice(i, 1);
          }
    if (boughtBooksQuanlityJSON === 0)
      window.localStorage.setItem(
        "boughtBooksQuanlity",
        JSON.stringify(totalBoughtBookQuanlity)
      );
    else
      window.localStorage.setItem(
        "boughtBooksQuanlity",
        JSON.stringify(totalBoughtBookQuanlity + boughtBooksQuanlityJSON)
      );
    boughtBooksQuanlity.style.display = "block";
    if (boughtBooksQuanlityJSON === 0)
      boughtBooksQuanlity.textContent = totalBoughtBookQuanlity;
    else
      boughtBooksQuanlity.textContent =
        totalBoughtBookQuanlity + boughtBooksQuanlityJSON;
    window.localStorage.setItem("mainBoughtBooks", JSON.stringify(boughtBooks));
    window.localStorage.setItem("boughtBooks", JSON.stringify(boughtBooks));
  } else alert("Bạn cần chọn số lượng muốn mua");
});
localStorage.setItem("boughtBooks", JSON.stringify(boughtBooks));

const usernameTag = document.getElementById("loginhead");
const registerTag = document.getElementById("regishead");
localStorage.getItem("token");
const token = localStorage.getItem("token");
console.log(token);
if (token) {
  usernameTag.textContent = localStorage.getItem("username");
  registerTag.style.display = "none";
}
