---
title: Axios Notes

---

# Axios Notes
In order to enhance the process of handling Http requests in a JS applications. It's also a better way to use Promise in JS.

## What is Axios
It's a JS library that makes HTTP requests from node.js or XMLHttpRequests from the web browser. 

Before using Axios, remember to import Axios library: 


- In CDN(Access to this [link](https://cdnjs.com/libraries/axios) if prefer other version)
```html
<script
      src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.2/axios.min.js"
      integrity="sha512-JSCFHhKDilTRRXe9ak/FJ28dcpOJxzQaCd3Xg8MyF6XFjODhy/YMCM8HW0TFDckNHWUewW+kfvhin43hKtJxAw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
```

## HTTP Request Methods

- Axios provides methods for all common HTTP requests:
    - **axios.get(url[, config]):** Sends an HTTP GET request.
    - **axios.delete(url[, config]):** Sends an HTTP DELETE request.
    - **axios.head(url[, config]):** Sends an HTTP HEAD request.
    - **axios.options(url[, config]):** Sends an HTTP OPTIONS request.
    - **axios.post(url[, data[, config]]):** Sends an HTTP POST request. Optionally, you can send data as the body of the request.
    - **axios.put(url[, data[, config]]):** Sends an HTTP PUT request. Similar to POST, it can include a request body.
    - **axios.patch(url[, data[, config]]):** Sends an HTTP PATCH request. It is used to apply partial modifications to a resource.

## Making a GET Request
In order to fetch data, knowing to make request is the basics in the usage of Axios. Here is an example below where it makes a GET Request to get the data from 
DummyJson:

```javascript!=
function fetchProducts() {
  // Making a GET Request
  axios.get("https://dummyjson.com/products")
    .then(function (response) {
      // Extract the array of products from the response data
      const products = response.data.products;

      // Log the products to the console instead of displaying them in the DOM
      console.log(products);
    })
    .catch(function (error) {
      // Log any errors that occur during the fetching process
      console.error("Error fetching products:", error);
    });
}

// Call the function to initiate fetching products and logging them
fetchProducts();


```

## Applying Promise, Async/Await
It's necessary to know to handle request efficiently using promise and async/await. Below are two common way of handling requests with promise:

- Making multiple requests(Display the data until all requests proceed)
    - In the code below, it will run for 5 seconds then all the requests will output assuming each requests takes 1 seconds to process.

```javascript!=
//Helper function to delay the requests process
function delayRequest(url, delayMs) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(axios.get(url)), delayMs)
  );
}

async function ShowAllProducts() {
  // List of product IDs to fetch
  const productIds = [1, 2, 3, 4, 5];
  
  // Create an array of promises for each delayed product request
  const requests = productIds.map(
    (id, index) =>
      delayRequest(`https://dummyjson.com/products/${id}`, 1000 * (5 - index)) // Staggered delays
  );

  try {
    // Wait for all delayed requests to complete
    const responses = await Promise.all(requests);

    // Map each response to extract the product data
    const products = responses.map((response) => response.data);

    // Log the array of products
    console.log(products);
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching products:", error);
  }
}

// Initiate the function to fetch multiple products
ShowAllProducts();

```


- Making multiple requests(Display the data for each requests)
    - In the code below, each products will be printed after 3 seconds assuming each requests takes 3 seconds to process.

```javascript!=
//Helper function to delay the requests process
function delayRequest(url, delayMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get(url).then(resolve).catch(reject);
    }, delayMs);
  });
}

async function ProductByEach() {
  // Array of product IDs to be fetched
  const productIds = [1, 2, 3, 4, 5];

  try {
    // Sequentially fetch each product with a delay
    for (const id of productIds) {
      const response = await delayRequest(
        `https://dummyjson.com/products/${id}`,
        3000 // Introduce a 3000 ms delay for each request
      );
      const product = response.data; // Extract the product data from the response

      // Log each product to the console as it is retrieved
      console.log(product);
    }
  } catch (error) {
    // Handle any errors that occur during the fetching process
    console.error("Error fetching products:", error);
  }
}

// Initiate the function to fetch and display products with individual delays
ProductByEach();


```