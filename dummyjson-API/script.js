function fetchProducts() {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure it: GET-request for the URL
  xhr.open("GET", "https://dummyjson.com/products", true);

  // Set up a function that is called when the request is completed
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var response = JSON.parse(xhr.responseText);
      var products = response.products;

      var list = document.getElementById("productList");
      console.log(products);

      products.forEach(function (product) {
        var listItem = document.createElement("li");
        listItem.textContent = product.title + " - $" + product.price;
        list.appendChild(listItem);
      });
    } else {
      console.error("Request failed", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Network Error");
  };

  xhr.send();
}

fetchProducts();
