var midName = document.querySelector(".nameOF");
var sirNumber = document.querySelector(".codNumber");
var quantity = document.querySelector(".stock");
var available = document.querySelector(".maxAvailble");
var search = document.querySelector(".search");

var addMid = document.querySelector("#submition");
var aryy;
var tmp;

var moodData = "newAdd";

// IF STORAGE
if (localStorage.getItem("product") != null) {
  aryy = JSON.parse(localStorage.getItem("product"));
  dataShow(aryy);
} else {
  aryy = [];
}

// click
addMid.addEventListener("click", function () {
  if (
    midName.value != "" ||
    sirNumber.value != "" ||
    quantity.value != "" ||
    available.value != ""
  ) {
    var totleMedicine = {
      namem: midName.value,
      SerialNumber: sirNumber.value,
      minStock: quantity.value,
      found: available.value,
    };
    if (moodData == "newAdd") {
      aryy.push(totleMedicine);
      localStorage.setItem("product", JSON.stringify(aryy));
      clearData();
      dataShow(aryy);
    } else {
      aryy[tmp] = totleMedicine;
      localStorage.setItem("product", JSON.stringify(aryy));
      dataShow(aryy);
      console.log();
      moodData = "newAdd";
      addMid.innerHTML = "submit";
      addMid.classList = "btn btn-outline-primary";
    }
  }
});

// clearData
function clearData() {
  midName.value = "";
  sirNumber.value = "";
  quantity.value = "";
  available.value = "";
}

// showData
function dataShow(box) {
    var table = "";
    for (var i = 0; i < box.length; i++) {
      table += `<tr>
          <td>${i + 1}</td>
          <td>${box[i].namem}</td>
          <td>${box[i].SerialNumber}</td>
          <td>${box[i].minStock}</td>
          <td>${box[i].found}</td>
          <td><button onclick="deleteData(${i})" class="btn btn-danger btndelete">Delete</button> </td>
          <td><input onclick="updateData(${i})" class="btn btn-primary" type="submit" value="Update"></td>
      </tr>`;
    }
    document.getElementById("table").innerHTML = table;
  }
  

// button
function deleteData(i) {
  aryy.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(aryy));
  console.log(i);
  dataShow(aryy);
}

// update
function updateData(boxing) {
  midName.value = aryy[boxing].namem;
  sirNumber.value = aryy[boxing].SerialNumber;
  quantity.value = aryy[boxing].minStock;
  available.value = aryy[boxing].found;
  addMid.innerHTML = "UPDATE PRODUCT";
  addMid.classList = "btn btn-warning";
  moodData = "upDate";
  tmp = boxing;
}

// search
var fundedItems = [];
function searching(term) {
  fundedItems = [];
  for (var i = 0; i < aryy.length; i++) {
    if (aryy[i].namem.toLowerCase().includes(term.toLowerCase())) {
      console.log("FOUNDED", i);
      fundedItems.push(aryy[i]);
    }
  }
  dataShow(fundedItems);
}
