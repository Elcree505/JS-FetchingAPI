function fetchProducts() {
  axios
    .get("https://dummyjson.com/products")
    .then(function (response) {
      const products = response.data.products;
      const tbody = document.getElementById("productTable");
      tbody.innerHTML = ""; // Clear the table body before adding new rows

      products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${product.category}     </td>
                    <td>$${product.price}</td>
                `;
        tbody.appendChild(row);
      });
    })
    .catch(function (error) {
      console.error("Error fetching products:", error);
    });
}

// Call the function to fetch products
fetchProducts();
