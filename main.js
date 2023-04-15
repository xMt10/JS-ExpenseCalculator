const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const formBtn = document.querySelector(".ekle-btn");
const list = document.querySelector(".list");
const toplamBilgi = document.querySelector(".toplam-bilgi");

//izleme işlemleri
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);

//sum state
let sum = 0;

function updateToplam(fiyat) {
  sum += Number(fiyat);
  toplamBilgi.innerText = sum;
}

//harcama oluşturma
function addExpense(e) {
  e.preventDefault();

  if (!harcamaInput.value || !fiyatInput.value) {
    alert("please, fill the blanks!");
    return;
  }

  //div oluşturma
  const harcamaDiv = document.createElement("div");

  //class ekleme
  harcamaDiv.classList.add("harcama");

  //içerik ayarı
  harcamaDiv.innerHTML = `
  <h2>${harcamaInput.value}</h2>
  <h2>${fiyatInput.value}</h2>
  <div class="buttons">
    <img id="payment" src="payment.png">
    <img id="remove" src="remove.png">
  </div>
  `;

  //oluşan harcamayı htmle (listeye) ekleme
  list.appendChild(harcamaDiv);

  // toplamı güncelle
  updateToplam(fiyatInput.value);

  // formu temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

//listeye tıklanma olayını yönetme
function handleClick(e) {
  const eleman = e.target;
  if (eleman.id === "remove") {
    alert("silme işlemi başlatıldı");
  }
}
