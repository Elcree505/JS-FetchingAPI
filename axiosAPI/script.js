// Making a single GET Request
// function fetchProducts() {
//   axios
//     .get("https://dummyjson.com/products")
//     .then(function (response) {
//       const products = response.data.products;
//       const tbody = document.getElementById("productTable");
//       tbody.innerHTML = ""; // Clear the table body before adding new rows

//       products.forEach((product) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//                       <td>${product.id}</td>
//                       <td>${product.title}</td>
//                       <td>${product.category}     </td>
//                       <td>$${product.price}</td>
//                   `;
//         tbody.appendChild(row);
//       });
//     })
//     .catch(function (error) {
//       console.error("Error fetching products:", error);
//     });
// }

// // Call the function to fetch products
// fetchProducts();

// Making multiple requests(Display the data until all requests proceed)

// Helper function to delay a request
// function delayRequest(url, delayMs) {
//   return new Promise((resolve) =>
//     setTimeout(() => resolve(axios.get(url)), delayMs)
//   );
// }

// async function fetchMultipleProducts() {
//   const productIds = [1, 2, 3, 4, 5];
//   const requests = productIds.map(
//     (id, index) =>
//       delayRequest(`https://dummyjson.com/products/${id}`, 1000 * (5 - index)) // Staggered delays
//   );

//   try {
//     const responses = await Promise.all(requests);
//     const products = responses.map((response) => response.data);

//     const tbody = document.getElementById("productTable");
//     tbody.innerHTML = ""; // Clear the table body before adding new rows

//     products.forEach((product) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//                 <td>${product.id}</td>
//                 <td>${product.title}</td>
//                 <td>${product.category}</td>
//                 <td>$${product.price}</td>
//             `;
//       tbody.appendChild(row);
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     document.getElementById("productTable").innerHTML =
//       '<tr><td colspan="4">Failed to load products.</td></tr>';
//   }
// }

// fetchMultipleProducts();

// Making multiple requests(Display the data for each requests)

// Helper function to delay a request
function delayRequest(url, delayMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get(url).then(resolve).catch(reject);
    }, delayMs);
  });
}

async function fetchMultipleProducts() {
  const productIds = [1, 2, 3, 4, 5];
  const tbody = document.getElementById("productTable");
  tbody.innerHTML = ""; // Clear the table body before adding new rows

  try {
    for (const id of productIds) {
      const response = await delayRequest(
        `https://dummyjson.com/products/${id}`,
        3000
      ); // 3000 ms delay
      const product = response.data;

      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
            `;
      tbody.appendChild(row);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    tbody.innerHTML = '<tr><td colspan="4">Failed to load products.</td></tr>';
  }
}

// Call the function to fetch and display products
fetchMultipleProducts();
