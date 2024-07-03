// Notes: Use the test Runner at the bottom to run the code

//@ts-check
/**
 * Homework 4 // Making a single GET Request
 * Fetches products from the dummyjson API and displays them in a table.
 * The function sends an HTTP GET request to retrieve product data, then
 * parses this data and dynamically creates and appends table rows to the
 * designated <tbody> element with ID 'productTable'. Each row displays
 * product ID, title, category, and price.
 *
 * If the request fails, an error is logged to the console.
 *
 * @returns {void} Does not return anything.
 */
function fetchProducts() {
  axios
    .get("https://dummyjson.com/products")
    .then(function (response) {
      // Extract the array of products from the response data
      const products = response.data.products;

      // Get a reference to the <tbody> element where products will be displayed
      const tbody = document.getElementById("productTable");

      // Clear the table body to remove any existing rows before adding new ones
      tbody.innerHTML = "";

      // Iterate over each product in the products array
      products.forEach((product) => {
        // Create a new row (<tr>) element for each product
        const row = document.createElement("tr");

        // Set the inner HTML of the row, filling in the product details
        row.innerHTML = `
          <td>${product.id}</td>          <!-- Product ID -->
          <td>${product.title}</td>       <!-- Product Title -->
          <td>${product.category}</td>    <!-- Product Category -->
          <td>$${product.price}</td>      <!-- Product Price -->
        `;

        // Append the newly created row to the table body
        tbody.appendChild(row);
      });
    })
    .catch(function (error) {
      // Log an error message to the console if the API request fails
      console.error("Error fetching products:", error);
    });
}

// -----------------------------------------------------------------------------------

/**
 * Homework 5 // Making multiple requests(Display the data until all requests proceed)
 *
 * Makes delayed HTTP GET requests to fetch product details from an API. It fetches multiple
 * products based on their IDs with staggered delays and then displays them in an HTML table.
 * The function ensures that no data is displayed until all requests have been processed.
 *
 * This approach is useful for ensuring that the user interface is updated only once all data
 * is available, enhancing the coherence of the displayed information.
 *
 * @returns {void} Does not return anything as its primary purpose is to update the DOM.
 */
async function ShowAllProducts() {
  // Array of product IDs to be fetched
  const productIds = [1, 2, 3, 4, 5];

  // Create a list of promises for delayed requests
  const requests = productIds.map(
    (id, index) =>
      delayRequest1(`https://dummyjson.com/products/${id}`, 1000 * (5 - index)) // Staggered delays
  );

  try {
    // Wait for all the requests to complete
    const responses = await Promise.all(requests);

    // Extract the product data from each response
    const products = responses.map((response) => response.data);

    // Get a reference to the table body in the DOM
    const tbody = document.getElementById("productTable");
    tbody.innerHTML = ""; // Clear the table body to prepare for new data

    // Iterate over the fetched products and append them to the table
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
            `;
      tbody.appendChild(row); // Add the new row to the table body
    });
  } catch (error) {
    // Handle any errors that might occur during the fetch operation
    console.error("Error fetching products:", error);
    // Display an error message directly in the table
    document.getElementById("productTable").innerHTML =
      '<tr><td colspan="4">Failed to load products.</td></tr>';
  }
}

/**
 * Delays an HTTP GET request by wrapping it in a setTimeout to defer execution.
 *
 * @param {string} url The URL of the product to fetch.
 * @param {number} delayMs The delay in milliseconds before the request is initiated.
 * @returns {Promise} A Promise that resolves after the specified delay and the completion of the HTTP GET request.
 */
function delayRequest1(url, delayMs) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(axios.get(url)), delayMs)
  );
}

// -----------------------------------------------------------------------------------

/**
 * Homework 6 // Making multiple requests(Display the data for each requests)
 *
 * Fetches multiple products one by one with a delay between each request and displays
 * each product in the DOM as it is retrieved. This function demonstrates how to handle
 * asynchronous requests sequentially with delays, updating the user interface progressively
 * as each data piece becomes available.
 *
 * @returns {void} Does not return anything. The function's primary purpose is to update
 * the DOM with the fetched data.
 */
async function ProductByEach() {
  // Array of product IDs to be fetched
  const productIds = [1, 2, 3, 4, 5];

  // Get a reference to the table body where product rows will be displayed
  const tbody = document.getElementById("productTable");
  tbody.innerHTML = ""; // Clear the table body to prepare for new rows

  try {
    // Loop through each product ID and fetch data with a delay
    for (const id of productIds) {
      // Delay each request by 3000 ms
      const response = await delayRequest2(
        `https://dummyjson.com/products/${id}`,
        3000 // 3000 ms delay for each request
      );
      const product = response.data; // Extract the product data from the response

      // Create a new table row and populate it with product data
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
            `;
      tbody.appendChild(row); // Append the new row to the table body
    }
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching products:", error);
    // Display an error message directly in the table
    tbody.innerHTML = '<tr><td colspan="4">Failed to load products.</td></tr>';
  }
}

/**
 * Delays an HTTP GET request by wrapping it in a setTimeout to defer execution.
 * This helper function returns a Promise that resolves with the Axios response
 * or rejects with an error if the request fails.
 *
 * @param {string} url The URL of the product to fetch.
 * @param {number} delayMs The delay in milliseconds before the request is initiated.
 * @returns {Promise} A Promise that resolves after the specified delay and the completion of the HTTP GET request.
 */
function delayRequest2(url, delayMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get(url).then(resolve).catch(reject);
    }, delayMs);
  });
}

// -----------------------------------------------------------------------------------

// Test runner

// Call the function to initiate the product fetching process
//fetchProducts();

// Initiate the fetching of products with staggered delays and display them once all are retrieved
//ShowAllProducts();

// Initiate the function to fetch and display products with individual delays
ProductByEach();
