const canvas = document.getElementById("arrayCanvas");
const ctx = canvas.getContext("2d");

items = [];

function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const boxWidth = 80;
    const boxHeight = 50;
    let x = 10;

    items.forEach((value, index) => {

        // kotak
        ctx.fillStyle = "blue";
        ctx.fillRect(x, 50, boxWidth, boxHeight);
        ctx.fillStyle = "white";

        // nilai
        ctx.font = "20px Arial";
        ctx.fillText(value, x + 30, 80);
        

        // index
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(index, x + 35, 110);


        x += boxWidth + 10;
    });
}

function createArray() {
  boxvalue = document.getElementById("arrayInput").value;
  items = boxvalue.split(",")
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