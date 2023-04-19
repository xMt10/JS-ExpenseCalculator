const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const list = document.querySelector(".list");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");
const nameInput = document.querySelector("#name-input");

//Kullanıcının girdiği isim değerini tarayıcının deposunda saklama

const username = localStorage.getItem("name") || "";
nameInput.value = username;
console.log(username);

nameInput.addEventListener("change", (e) => {
  localStorage.setItem("name", e.target.value);
});

//izleme işlemleri
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

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
  if (statusCheck.checked) {
    harcamaDiv.classList.add("paid");
  }

  //içerik ayarı
  harcamaDiv.innerHTML = `
   <h2>${harcamaInput.value}</h2>
   <h2 id="value">${fiyatInput.value}</h2>
   <div class="buttons">
   <img id="payment" src="payment.png" />
   <img id="remove" src="remove.png" />
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
  //tıklanılan elamanı elma
  const element = e.target;

  if (element.id === "remove") {
    //tıklanılan sil butonunun kapsayıcısını alma
    const wrapperElement = element.parentElement.parentElement;

    //silinen elemanın fiyatını alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;

    //silinen elemanın fiyatını toplamdan çıkarma
    updateToplam(-Number(deletedPrice));

    //kapsayıcıyı htmlden kaldırma
    wrapperElement.remove();
  }
}

//listeye tıklanma olayını yönetme
function handleClick(e) {
  //tıklanılan elamanı elma
  const element = e.target;

  if (element.id === "remove") {
    //tıklanılan sil butonunun kapsayıcısını alma
    const wrapperElement = element.parentElement.parentElement;

    //silinen elemanın fiyatını alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;

    //silinen elemanın fiyatını toplamdan çıkarma
    updateToplam(-Number(deletedPrice));

    //kapsayıcıyı htmlden kaldırma
    wrapperElement.remove();
  }
}

// filtrleme işlemi
function handleFilter(e) {
  const items = list.childNodes;

  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "paid":
        if (!item.classList.contains("paid")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-paid":
        if (item.classList.contains("paid")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
