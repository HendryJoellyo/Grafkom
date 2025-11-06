const canvas = document.getElementById("arrayCanvas");
const ctx = canvas.getContext("2d");

let animating = false; // ini buat mencegah animasi lain berjalan ketika animasi sedang berjalan
let items = []; // array untuk menyimpan nilai-nilai

function translasi(titik_lama, T) {
  return { x: titik_lama.x + T.x, y: titik_lama.y + T.y }; // fungsi pergeseran
}

function drawBox(value, index, x, y, alpha = 1) { // fungsi untuk menggambar kotak yang isinya ada value dan index dibawahnya
  const boxWidth = 50;
  const boxHeight = 30;

  ctx.globalAlpha = alpha;

  // kotak
  ctx.fillStyle = "#1a82e4ff";
  ctx.fillRect(x, y, boxWidth, boxHeight);

  // nilai
  ctx.fillStyle = "white";
  ctx.font = "17px Arial";
  ctx.fillText(value, x + 12, y + 20);

  // index
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.fillText(index, x + 20, y + 45);

  ctx.globalAlpha = 1;
}

function drawBox2(value, index, x, y, alpha = 1) { // fungsi untuk menggambar kotak yang isinya ada value dan index dibawahnya
  const boxWidth = 50;
  const boxHeight = 30;

  ctx.globalAlpha = alpha;

  // kotak
  ctx.fillStyle = "#cc1212ff";
  ctx.fillRect(x, y, boxWidth, boxHeight);

  // nilai
  ctx.fillStyle = "white";
  ctx.font = "17px Arial";
  ctx.fillText(value, x + 12, y + 20);

  // index
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.fillText(index, x + 20, y + 45);

  ctx.globalAlpha = 1;
}

function drawArray() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  const boxWidth = 50;
  const boxHeight = 30;
  let x = 13; // titik horizontal

  items.forEach((value, index) => { // untuk setiap value dan index digambar kotak biru
    drawBox(value, index, x, 50);
    x += boxWidth + 2; // gap kedua kotak
  });
}

function createArray() {
  if (animating) { // ini memeriksa jika ada animasi yang berjalan atau tidak, jika true maka fungsinya langsung berhenti
    return
  };

  let n = document.getElementById("arrayInput").value; // ambil value dari inputan

  items = []; // menghapus array yang sebelumnya ada

  for (let i = 0; i < n; i++) { 
    items[i] = Math.floor(Math.random() * 201) -100; // ini untuk ngerandom value di dalam array
  }
  items.sort((a, b) => a - b);

  animating = true; // signal untuk memberi tau bahwa animasi sedang berjalan
  animateArrayCreation();
  return items;
}

function insertValue() {
  if (animating) return; // cegah animasi bertumpuk

  const val = document.getElementById("insertValue").value;
  const idx = parseInt(document.getElementById("insertIndex").value);

  if (idx > items.length) {
    alert("Index melebihi panjang array");
    return;
  }
  // sisipkan nilai ke array
  items.splice(idx, 0, parseInt(val));

  animating = true;
  animateInsert(idx, parseInt(val));
}



function deleteValue() {
  if (animating) return;

  const index = parseInt(document.getElementById("deleteIndex").value);

  if (index < 0 || index >= items.length) {
    alert("Index melebihi panjang array");
    return;
  }

  animating = true;
  animateDelete(index);
}

function searchValue() {
  if (animating) return;

  if (items.length === 0) {
    alert("Array kosong");
    return;
  }

  const value = parseInt(document.getElementById("SearchIndex").value);

  animating = true;
  animateSearch(value);
}

function minValue() {
  let index = 0;
  let pos = { x: 13, y: 50 };

  if (items.length === 0) {
    alert("Array kosong");
    return;
  }
  else{
    let x = Math.min(...items);
    drawBox2(x, index, pos.x, pos.y);

    setTimeout(() => {
      drawBox(x, index, pos.x, pos.y);
    }, 2000);
  }
}
  
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
  }
}
