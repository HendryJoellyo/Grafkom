const canvas = document.getElementById("arrayCanvas");
const ctx = canvas.getContext("2d");



items = [];
value = {};
function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const boxWidth = 50;
    const boxHeight = 30;
    let x = 13;

    items.forEach((value, index) => {

        // kotak
        ctx.fillStyle = "blue";
        ctx.fillRect(x, 50, boxWidth, boxHeight);
        ctx.fillStyle = "white";

        // nilai
        ctx.font = "17px Arial";
        ctx.fillText(value, x + 12, 70);
        

        // index
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(index, x + 20, 100);


        x += boxWidth + 10;
    });
} 

function createArray() {
  boxvalue = document.getElementById("arrayInput").value;
  for (let i = 0; i < boxvalue; i++) {
    items[i] = Math.floor(Math.random()*201) - 100;
  }
  drawArray();
}

function insertValue() {
  value = document.getElementById("insertIndex").value;
  if(value > items.length){
    alert("Index melebihi panjang array");
    return;
  }
  else {
      let value = document.getElementById("insertValue").value;
      let index = document.getElementById("insertIndex").value;
      items.splice(index, 0, value);
      drawArray();
  }
}

function deleteValue() {
   value = document.getElementById("deleteIndex").value;
  if(value >= items.length){
    alert("Index melebihi panjang array");
    return;
  }
    let index = document.getElementById("deleteIndex").value;
    items.splice(index, 1);
    drawArray();
}

function searchValue() {
  if (items.length === 0) {
    alert("Array kosong");
    return;
  }
  else{
    index = 0;
    let value = document.getElementById("SearchIndex").value;
    for (let i = 0; i < items.length; i++) {
      if (items[i] == value) {
        alert("Nilai " + value + " ditemukan pada index ke-" + i);
        index++;
      }
    }
  }
}

function minValue() {
  if (items.length === 0) {
    alert("Array kosong");
    return;
  }
  else{
    min = items[0];
    for (let i = 1; i < items.length; i++) {
      if (items[i] < min) {
        min= items[i];
      }
    }
    alert("Nilai minimum adalah: " + min);
  }}
  
function maxValue() {
  if (items.length === 0) {
    alert("Array kosong");
    return;
  }
  else{
    max = items[0];
    for (let i = 1; i < items.length; i++) {
      if (items[i] > max) {
        max= items[i];
      }
    }
    alert("Nilai minimum adalah: " + max);
  }}

