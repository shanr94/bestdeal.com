let productDiv = document.querySelector(".product");
let categoryListDiv = document.querySelector(".categoryList");
let allCat = [];

const displayProduct = async (allCheckedCat = []) => {
  productDiv.innerHTML = "";
  let product = await fetch("https://fakestoreapi.com/products");
  let finalProduct = await product.json();

  finalProduct.forEach((elm) => {
    if (!allCat.includes(elm.category)) {
      categoryListDiv.innerHTML += `
                    <label>
                        <input type="checkbox" onclick='categoryFilter()' value="${elm.category}"> ${elm.category}
                    </label>
                    `;
      allCat.push(elm.category);
    }

    if (allCheckedCat.length == 0) {
      allCheckedCat = allCat;
    }
    if (allCheckedCat.includes(elm.category)) {
      productDiv.innerHTML += `
        <div class="item">
            <img src="${elm.image}" alt="product image">
            <h4>${elm.category}</h4>
            <p>Price Rs. ${elm.price} | ${elm.rating.rate}</p>
            <h3>${elm.title}</h3>
        </div>
        `;
    }
  });
};

displayProduct();

const categoryFilter = () => {
  let checkInput = document.querySelectorAll("input[type=checkbox]");
  let checkedData = [];
  checkInput.forEach((e) => {
    if (e.checked) {
      checkedData.push(e.value);
    }
  });
  displayProduct(checkedData);
};
