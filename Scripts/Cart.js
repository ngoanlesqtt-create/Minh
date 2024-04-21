const mainTag = document.getElementById("main");
const boughtBooksQuanlity = document.getElementById("bought-book-quanlity");
const tableTag = document.getElementById("table");
const infomingElement = document.createElement("h2");
const paymentTag = document.getElementById("payment");
const payingDivTag = document.getElementById("paying-div");
const finalPaymentImformationTag = document.getElementById(
  "final-payment-imformation"
);
infomingElement.textContent = "Giỏ hàng của bạn chưa có sản phẩm nào";
let boughtBooks = JSON.parse(window.localStorage.getItem("boughtBooks"));
let addedBooks = window.localStorage.getItem("boughtBooksQuanlity");
if (addedBooks === null)
  addedBooks = JSON.parse(window.localStorage.getItem("addedBooks"));
let totalQuanlity = 0;
let totalCost = 0;
const kindBook = [
  "Kinh Điển",
  "Tâm Lý - Kỹ Năng Sống",
  "Văn Học",
  "Lịch Sử",
  "Chính Trị",
];
const thArr = ["", "Tên sản phẩm", "Giá", "Số lượng", "Thành tiền", ""];
const baseURL = "http://139.180.134.207/DoAnMobile/Client/assets/images/";
if (totalQuanlity === 0)
  boughtBooksQuanlity.textContent = localStorage.getItem("boughtBooksQuanlity");
console.log(addedBooks);
mainTag.appendChild(infomingElement);
if (
  addedBooks === null ||
  addedBooks === 0 ||
  addedBooks === "0" ||
  addedBooks === "null"
) {
  console.log("test dong 26 cart");
  boughtBooksQuanlity.textContent = 0;
  tableTag.style.display = "none";
  infomingElement.style.display = "block";
  paymentTag.style.display = "none";
} else {
  infomingElement.style.display = "none";
  boughtBooksQuanlity.textContent = addedBooks;
  tableTag.style.display = "block";
}

const trTag = document.createElement("tr");
tableTag.appendChild(trTag);
for (let i = 0; i < thArr.length; i++) {
  const tdTags = document.createElement("th");
  trTag.appendChild(tdTags);
  tdTags.textContent = thArr[i];
}
if (boughtBooks !== null) {
  caculateTotalQuanlityAndCost(boughtBooks);
  for (let i = 0; i < boughtBooks.length; i++) {
    caculateTotalQuanlityAndCost(boughtBooks, i);

    const trTags = document.createElement("tr");
    tableTag.appendChild(trTags);
    trTags.classList.add(i);

    const tdImageElements = document.createElement("td");
    trTags.appendChild(tdImageElements);
    trTags.classList.add(i);

    const imgTags = document.createElement("img");

    imgTags.classList.add("imgTags");
    imgTags.classList.add(i);
    imgTags.src = baseURL + boughtBooks[i].image;
    tdImageElements.appendChild(imgTags);
    imgTags.addEventListener("click", () => {
      boughtBooks = JSON.parse(localStorage.getItem("boughtBooks"));
      let totalBoughtBookQuanlity = 0;
      console.log("dong 66 cart i:", i);
      for (let j = 0; j < boughtBooks.length; j++)
        totalBoughtBookQuanlity += boughtBooks[j].quanlity;

      for (let y = 0; y <= boughtBooks.length - 1; y++)
        if (imgTags.getAttribute("src") === baseURL + boughtBooks[y].image) {
          localStorage.setItem("kindBook", boughtBooks[y].genres);
          localStorage.setItem("book", JSON.stringify(boughtBooks[y]));
        }
      localStorage.setItem("addedBooks", totalBoughtBookQuanlity);
      localStorage.setItem("boughtBooksQuanlity", totalBoughtBookQuanlity);
      localStorage.setItem("mainBoughtBooks", JSON.stringify(boughtBooks));
      localStorage.setItem("boughtBooks", JSON.stringify(boughtBooks));
      window.location = "../Pages/Item.html";
    });

    const tdNameElements = document.createElement("td");
    trTags.appendChild(tdNameElements);
    tdNameElements.classList.add("tdNameTags");
    tdNameElements.classList.add(i);
    tdNameElements.textContent = boughtBooks[i].name;

    const tdCostElements = document.createElement("td");
    trTags.appendChild(tdCostElements);
    tdCostElements.classList.add("tdCostTags");
    tdCostElements.classList.add(i);
    tdCostElements.textContent = boughtBooks[i].cost;

    const tdQuantityElements = document.createElement("td");
    tdQuantityElements.classList.add("tdQuantityTags");
    tdQuantityElements.classList.add(i);
    trTags.appendChild(tdQuantityElements);

    const tdtotalCostElements = document.createElement("td");
    tdtotalCostElements.classList.add("tdTotalCostTags");
    tdtotalCostElements.classList.add(i);

    tdtotalCostElements.textContent =
      boughtBooks[i].totalCost.toLocaleString("en-US") + " VNĐ";
    trTags.appendChild(tdtotalCostElements);

    const tdEraserElements = document.createElement("td");
    const tdBtnElements = document.createElement("button");
    tdEraserElements.appendChild(tdBtnElements);
    tdBtnElements.textContent = "x";
    tdEraserElements.classList.add("erasering-btn");
    tdEraserElements.classList.add(i);

    tdEraserElements.addEventListener("click", () => {
      const tdNameTags = document.getElementsByClassName(`${i}`)[2];
      removeItem(tdNameTags, i);
    });

    trTags.appendChild(tdEraserElements);
  }
}
function updateBooks(trialBoughtBooks, tdNameTags) {
  for (let j = 0; j <= trialBoughtBooks.length - 1; j++) {
    if (boughtBooks[j].name.includes(tdNameTags.textContent))
      trialBoughtBooks.splice(j, 1);
  }
}
function eraserElements(i) {
  const erasedElements = document.getElementsByClassName(`${i}`);
  for (let j = 0; j <= erasedElements.length - 1; j++)
    erasedElements[j].remove();
}
const quanlityTags = document.getElementsByClassName("tdQuantityTags");
for (let i = 0; i <= quanlityTags.length - 1; i++) {
  quanlityTags[i].style.display = "flex";
  const decreasedQuanlityElements = document.createElement("p");
  quanlityTags[i].appendChild(decreasedQuanlityElements);
  decreasedQuanlityElements.textContent = "-";
  decreasedQuanlityElements.addEventListener("click", function () {
    const quanlityValues = document.getElementsByClassName("quanlityValues");
    const costValues = document.getElementsByClassName("tdCostTags");
    const totalCost = document.getElementsByClassName("tdTotalCostTags");
    boughtBooks[i].quanlity--;
    boughtBooks[i].totalCost = boughtBooks[i].quanlity * boughtBooks[i].cost;
    localStorage.setItem("boughtBooks", JSON.stringify(boughtBooks));
    quanlityValues[i].value = boughtBooks[i].quanlity;
    let temporaryBoughtBooksQuanlity = JSON.parse(
      localStorage.getItem("boughtBooksQuanlity")
    );
    temporaryBoughtBooksQuanlity--;
    caculateTotalQuanlityAndCost(boughtBooks);
    updateTotalCost(i, costValues, totalCost, temporaryBoughtBooksQuanlity);
    if (boughtBooks[i].quanlity === 0) {
      const tdNameTags = document.getElementsByClassName(`${i}`)[2];
      removeItem(tdNameTags, i);
    }
  });

  const quanlityInputElements = document.createElement("input");
  quanlityInputElements.setAttribute("class", "quanlityValues");
  quanlityInputElements.setAttribute("type", "text");
  quanlityInputElements.setAttribute("value", `${boughtBooks[i].quanlity}`);
  quanlityInputElements.setAttribute("oninput", `checkValue(${i})`);

  quanlityTags[i].appendChild(quanlityInputElements);
  const increasedQuanlityElements = document.createElement("p");
  quanlityTags[i].appendChild(increasedQuanlityElements);
  increasedQuanlityElements.textContent = "+";

  increasedQuanlityElements.addEventListener("click", () => {
    const quanlityValues = document.getElementsByClassName("quanlityValues");
    const costValues = document.getElementsByClassName("tdCostTags");
    const totalCost = document.getElementsByClassName("tdTotalCostTags");
    boughtBooks[i].quanlity++;
    boughtBooks[i].totalCost = boughtBooks[i].quanlity * boughtBooks[i].cost;

    localStorage.setItem("boughtBooks", JSON.stringify(boughtBooks));

    caculateTotalQuanlityAndCost(boughtBooks);
    quanlityValues[i].value = boughtBooks[i].quanlity;
    let temporaryBoughtBooksQuanlity = JSON.parse(
      localStorage.getItem("boughtBooksQuanlity")
    );
    temporaryBoughtBooksQuanlity++;
    updateTotalCost(i, costValues, totalCost, temporaryBoughtBooksQuanlity);
  });
}

function checkValue(i) {
  const quanlityValues = document.getElementsByClassName("quanlityValues");
  const costValues = document.getElementsByClassName("tdCostTags");
  const totalCost = document.getElementsByClassName("tdTotalCostTags");
  for (let j = 0; j <= quanlityValues.length - 1; j++) {
    if (i === j) {
      if (isNaN(quanlityValues[j].value) || quanlityValues[j].value < 0) {
        quanlityValues[j].style.borderColor = "red";
        boughtBooksQuanlity.textContent = 0;
      } else {
        quanlityValues[j].style.borderColor = "green";
        totalCost[j].textContent =
          Number(quanlityValues[j].value) * Number(costValues[j].textContent) +
          " VNĐ";
        handle(j, quanlityValues);
      }
      if (Number(quanlityValues[j].value) === 0) {
        const tdNameTags = document.getElementsByClassName(`${j}`)[2];
        removeItem(tdNameTags, i);
      }
    } else {
      handle(j, quanlityValues);
    }
  }
}
function removeItem(tdNameTags, i) {
  boughtBooks = JSON.parse(window.localStorage.getItem("boughtBooks"));
  for (let j = 0; j <= boughtBooks.length - 1; j++) {
    if (boughtBooks[j].name.includes(tdNameTags.textContent)) {
      let boughtBooksQuanlityJSON = JSON.parse(
        window.localStorage.getItem("boughtBooksQuanlity")
      );
      if (boughtBooksQuanlityJSON === 0 || boughtBooksQuanlityJSON === null)
        boughtBooksQuanlityJSON = JSON.parse(
          window.localStorage.getItem("addedBooks")
        );
      boughtBooksQuanlity.textContent =
        boughtBooksQuanlityJSON - Number(boughtBooks[j].quanlity);
      localStorage.removeItem("boughtBooksQuanlity");
      localStorage.setItem(
        "boughtBooksQuanlity",
        JSON.stringify(
          boughtBooksQuanlityJSON - Number(boughtBooks[j].quanlity)
        )
      );
      updateBooks(boughtBooks, tdNameTags);
      eraserElements(i);
      localStorage.setItem("boughtBooks", JSON.stringify(boughtBooks));
      if (boughtBooks.length === 0) {
        removeLocalStorage();
        tableTag.style.display = "none";
        infomingElement.style.display = "block";
        paymentTag.style.display = "none";
      }
    }
  }
  caculateTotalQuanlityAndCost(boughtBooks);
}
function handle(j, quanlityValues) {
  boughtBooks = JSON.parse(window.localStorage.getItem("boughtBooks"));
  for (let y = 0; y < boughtBooks.length; y++) {
    if (boughtBooks[y].name.includes(`${boughtBooks[j].name}`)) {
      boughtBooks[j].quanlity = quanlityValues[j].value;
      let comtemporaryValue = 0;
      for (let x = 0; x < boughtBooks.length; x++) {
        if (x !== y) comtemporaryValue += boughtBooks[x].quanlity;
      }

      let changedQuanlity = comtemporaryValue + Number(quanlityValues[j].value);
      for (let x = 0; x < boughtBooks.length; x++) {
        if (x === j) {
          boughtBooks[x].quanlity = Number(quanlityValues[j].value);
          localStorage.setItem("boughtBooks", JSON.stringify(boughtBooks));
        }
      }
      boughtBooksQuanlity.textContent = changedQuanlity;
      localStorage.removeItem("boughtBooksQuanlity");
      localStorage.setItem(
        "boughtBooksQuanlity",
        JSON.stringify(comtemporaryValue + Number(quanlityValues[j].value))
      );
    }
  }
}
function removeLocalStorage() {
  localStorage.removeItem("boughtBooks");
  localStorage.removeItem("mainBoughtBooks");
  localStorage.removeItem("kindBook");
  localStorage.removeItem("book");
  localStorage.removeItem("boughtBooksQuanlity");
  localStorage.removeItem("addedBooks");
}
function updateTotalCost(
  i,
  costValues,
  totalCost,
  temporaryBoughtBooksQuanlity
) {
  localStorage.setItem(
    "boughtBooksQuanlity",
    JSON.stringify(temporaryBoughtBooksQuanlity)
  );
  boughtBooksQuanlity.textContent = temporaryBoughtBooksQuanlity;
  totalCost[i].textContent =
    costValues[i].textContent * boughtBooks[i].quanlity + " VNĐ";
}
if (boughtBooks === null) paymentTag.style.display = "none";
else paymentTag.style.display = "flex";
const paymentContent = ` 
<div id="payment-note">
<h3>Ghi chú đơn hàng:</h3>
<input type="text" placeholder="Ghi chú" />
</div>
<div id="imformation-payment">
<h3>Thông tin đơn hàng:</h3>
<h4 id="totalCost">Tổng tiền: ${totalCost.toLocaleString("en-US")} VNĐ</h4>
<h4 id="totalQuanlity">Số lượng: ${totalQuanlity} quyển</h4>
<p>Phí vận chuyển của bạn sẽ được tình ở trang thanh toán</p>
<button type="button" id="paying-btn">THANH TOÁN</button>
<br>
<br>
<a href="../index.html">Tiếp tục mua hàng</a>
</div>`;
paymentTag.innerHTML = paymentContent;

function caculateTotalQuanlityAndCost(boughtBooks) {
  const totalCostTag = document.getElementById("totalCost");
  const totalQuanlityTag = document.getElementById("totalQuanlity");
  totalQuanlity = 0;
  totalCost = 0;
  for (let i = 0; i <= boughtBooks.length - 1; i++) {
    totalQuanlity += boughtBooks[i].quanlity;
    totalCost += boughtBooks[i].totalCost;
  }
  totalCost = totalCost.toLocaleString("en-US");
  if (totalCostTag !== null || totalQuanlityTag !== null) {
    totalCostTag.textContent = `Tổng tiền: ${totalCost} VNĐ`;
    totalQuanlityTag.textContent = `Số lượng: ${totalQuanlity} quyển`;
  }
}
const payingBtnTag = document.getElementById("paying-btn");
payingBtnTag.addEventListener("click", function () {
  payingDivTag.style.display = "flex";
  payingDivTag.style.flexDirection = "column";
  const finalBoughtBooks = JSON.parse(localStorage.getItem("boughtBooks"));
  for (let i = 0; i <= finalBoughtBooks.length - 1; i++) {
    const finalDivTags = document.createElement("tr");
    finalPaymentImformationTag.appendChild(finalDivTags);

    const imgOfTdElements = document.createElement("th");
    const imgOfFinalBoughtBookElements = document.createElement("img");
    imgOfFinalBoughtBookElements.src = baseURL + finalBoughtBooks[i].image;
    finalDivTags.appendChild(imgOfTdElements);
    imgOfTdElements.appendChild(imgOfFinalBoughtBookElements);

    const finalBookNameElements = document.createElement("th");
    finalBookNameElements.textContent = finalBoughtBooks[i].name;
    finalDivTags.appendChild(finalBookNameElements);

    const finalQuanlityElements = document.createElement("th");
    finalQuanlityElements.textContent = finalBoughtBooks[i].quanlity + " quyển";
    finalDivTags.appendChild(finalQuanlityElements);

    const finalBookPriceElements = document.createElement("th");
    finalBookPriceElements.textContent = finalBoughtBooks[i].totalCost + " VNĐ";
    finalDivTags.appendChild(finalBookPriceElements);
  }
  const fianlDivElements = document.createElement("tr");
  finalPaymentImformationTag.appendChild(fianlDivElements);

  const emtyElements1 = document.createElement("th");
  const emtyElements2 = document.createElement("th");
  emtyElements1.textContent = "Tổng cộng:";
  emtyElements2.textContent = "";
  fianlDivElements.appendChild(emtyElements1);
  fianlDivElements.appendChild(emtyElements2);

  const totalFinalQuanlityElements = document.createElement("th");
  totalFinalQuanlityElements.textContent = totalQuanlity + " quyển";
  fianlDivElements.appendChild(totalFinalQuanlityElements);

  const totalFinalPriceElements = document.createElement("th");
  totalFinalPriceElements.textContent =
    totalCost.toLocaleString("en-US") + " VNĐ";
  fianlDivElements.appendChild(totalFinalPriceElements);
});

const usernameTag = document.getElementById("loginhead");
const registerTag = document.getElementById("regishead");
localStorage.getItem("token");
const token = localStorage.getItem("token");
console.log(token);
if (token) {
  usernameTag.textContent = localStorage.getItem("username");
  registerTag.style.display = "none";
}
