function animateArrayCreation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const boxWidth = 50;
  const boxHeight = 30;
  let x = 13;

  let i = 0; // index awal yang mau dianimasikan

  function drawNextBox() {
    if (i >= items.length) { //fungsi ketika i nya sudah melebihi inputan, maka animasinya akan distop
      animating = false;
      return;
    }

    let pos = { x: x, y: -40 }; // ini posisi awal kotak (di atas canvas) agar seolah-olah kotanya akan jatuh
    const target = { x: x, y: 50 }; // ini adalah posisi target / posisi akhir kotak yang ingin dicapai
    const step = { x: 0, y: 2 }; // ini adalah pergerakan kotak, yaitu 2 pixel per frame

    function animateDrop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let j = 0; j < i; j++) { // ini untuk menggambar ulang box yang sudah ada tapi langsung di posisi akhirnya agar tetap ada ketika box lain jatuh
        drawBox(items[j], j, 13 + j * (boxWidth + 2), 50);
      }

      if (pos.y < target.y) { // memeriksa apakah box tersebut sudah mencapai y = 50 atau beblum
        pos = translasi(pos, step); // pergerakkan kebawah sebanyak y = 5 per frame, pos adalah posisi awal yaitu x = 13 dan y = -40
        drawBox2(items[i], i, pos.x, pos.y); // ngerender box yang bergerak tadi ke posisi barunya
        requestAnimationFrame(animateDrop); // agar animasi smooth (memanggil animateDrop() lagi di frame selanjutnya)
      } else { // ketika pos.y >= target.y // ini adalah gerakan di frame terakhir animasi
        drawBox(items[i], i, target.x, target.y); // menggambar box di posisi akhirnya (target)
        i++; // pindah ke index selanjutnya
        x += boxWidth + 2; // gap kotak
        setTimeout(drawNextBox, 25); // ini untuk mendelay animasi selama 25ms
      }
    }

    animateDrop();
  }

  drawNextBox();
}

function animateSort() {
  const boxWidth = 50;
  const startX = 13;
  const targetY = 50;
  let i = 0;
  let j = 0;

  function drawAll(highlightI = -1, highlightJ = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let k = 0; k < items.length; k++) {
      if (k === highlightI || k === highlightJ) {
        drawBox2(items[k], k, startX + k * (boxWidth + 2), targetY); // merah untuk dibandingkan
      } else {
        drawBox(items[k], k, startX + k * (boxWidth + 2), targetY); // biru biasa
      }
    }
  }

  function bubbleSortStep() {
    if (i < items.length - 1) { 
      if (j < items.length - i - 1) {
        drawAll(j, j + 1); // highlight dua elemen yang dibandingkan

        if (items[j] > items[j + 1]) { // jika lebih besar maka :
          // Tukar elemen
          [items[j], items[j + 1]] = [items[j + 1], items[j]];
        }

        j++;
        setTimeout(bubbleSortStep, 1000); // delay tiap langkah
      } else {
        j = 0;
        i++;
        setTimeout(bubbleSortStep, 1000);
      }
    } else {
      // Selesai sorting
      drawArray();
      animating = false;
    }
  }

  bubbleSortStep();
}

function animateInsert(value, index) {
  const boxWidth = 50;
  const boxHeight = 30;
  const startX = 13;
  const targetY = 50;
  let pos = { x: startX + index * (boxWidth + 2), y: -40 }; // mulai dari atas
  const target = { x: pos.x, y: targetY };
  const step = { x: 0, y: 2 };

  function drawAllExceptMoving() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < items.length; i++) {
      if (i === index) continue; // skip kotak yang sedang dianimasikan
      drawBox(items[i], i, startX + i * (boxWidth + 2), targetY);
    }
  }

  function animateDrop() {
    drawAllExceptMoving();

    if (pos.y <= target.y) {
      pos = translasi(pos, step);
      drawBox2(value, index, pos.x, pos.y);
      requestAnimationFrame(animateDrop);
    } else {
      drawBox(value, index, target.x, target.y);
      animating = false; // animasi selesai
    }
  }

  animateDrop();
}

function animateDelete(index) {
  const boxWidth = 50;
  const startX = 13;
  const targetY = 50;
  let alpha = 1; // opacity box yang akan didelete

  function fadeOut() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < items.length; i++) { // fungsi ini menggambar ulang array selain yang mau didelete
      if (i === index) {
        drawBox2(items[i], i, startX + i * (boxWidth + 2), targetY, alpha);
      } else {
        drawBox(items[i], i, startX + i * (boxWidth + 2), targetY);
      }
    }

    alpha -= 0.1; // mengurangi opacitynya

    if (alpha > 0) {
      setTimeout(() =>{
        requestAnimationFrame(fadeOut);
      }, 50);
      
    } else {
      items.splice(index, 1); // jika animasi fade out sudah selesai, hapus boxnya dan shift box sisanya ke kiri
      animateShiftLeft(index);
    }
  }

  function animateShiftLeft(startIndex) {
    const gap = 2; // gap antar box
    const step = { x: -5, y: 0 }; // pergerakan box per frame, yaitu ke kiri sebanyak 5 pixel/frame
    const targetY = 50; 
    const boxWidth = 50; 
    const startX = 13;

    const shifting = []; // variabel ini menyimpan object dari setiap box yang ingin dishift ke kiri

    for (let i = startIndex; i < items.length; i++) {
      const from = { x: startX + (i + 1) * (boxWidth + gap), y: targetY }; // posisi awal
      const to = { x: startX + i * (boxWidth + gap), y: targetY }; // posisi target
      shifting.push({ value: items[i], pos: from, target: to }); // menggunakan translasi (pos) yang diupdate per frame
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < startIndex; i++) { // menggambar box statik dengan index < startIndex sudah ada di posisi akhir
        drawBox(items[i], i, startX + i * (boxWidth + gap), targetY);
      }

      let allReached = true; // variabel boolean untuk menyatakan box sudah selesai bergerak

      for (let i = 0; i < shifting.length; i++) { // animasi shifting
        const box = shifting[i];

        // menggunakan translasi sebagai pergerakan box
        if (box.pos.x > box.target.x) { // ketika box belum mencapai target
          box.pos = translasi(box.pos, step); // pos.x += step.x hingga mencapai target
          allReached = false; // menggerakan box
        }

        drawBox(box.value, startIndex + i, box.pos.x, box.pos.y); // menggambar box pada titik pos.x
      }
      if (!allReached) { // memastikan box mencapai tujuan terakhir dengan cara menggerakan sedikit
        requestAnimationFrame(animate);
      } else { // jika sudah tercapai, maka panggil drawArray() untuk menggambar array di titik yang sudah final
        drawArray();
        animating = false;
      }
    }

    animate();
  }

  fadeOut();
}

function animateSearch(value) {
  const boxWidth = 50;
  const startX = 13;
  const targetY = 50;
  let i = 0;

  function highlightNext() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let j = 0; j < items.length; j++) { // highlight box yang dicek dengan warna merah 
      if (j === i) {
        drawBox2(items[j], j, startX + j * (boxWidth + 2), targetY);
      } else {
        drawBox(items[j], j, startX + j * (boxWidth + 2), targetY);
      }
    }

    if (items[i] === value) { // jika value ditemukan, maka stop animasi
      animating = false;

      setTimeout(() => {
        alert("Nilai " + value + " ditemukan pada index ke-" + i);
        drawArray(); // Kembalikan semua box jadi biru setelah alert ditutup
      }, 100);

      return;
    }

    // jika belum maka lanjutkan
    i++;

    if (i < items.length) {
      setTimeout(highlightNext, 700); // delay antar kotak
    } else {
      animating = false;

      setTimeout(() => {
        alert("Nilai " + value + " tidak ditemukan dalam array.");
        drawArray(); // Kembalikan warna biru semua box setelah alert
      }, 100);
    }
  }

  highlightNext();
}

function animateUpdate(index, newValue) {
  const boxWidth = 50;
  const startX = 13;
  const targetY = 50;
  const posX = startX + index * (boxWidth + 2);

  // Highlight kotak lama dengan merah
  drawBox2(items[index], index, posX, targetY);

  setTimeout(() => {
    // Update nilainya di array
    items[index] = newValue;

    // Gambar ulang kotak jadi biru dengan nilai baru
    drawBox(items[index], index, posX, targetY);

    animating = false;
  }, 700); // delay 700ms agar highlight terlihat
}
