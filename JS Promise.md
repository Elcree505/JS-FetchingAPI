---
title: JS Promise
---

# JS Promise

## Understanding JS Promise / Async await

### Preface

- For developers, mastering Promises and Async/Await is crucial for writing modern, robust, and maintainable code. This guide aims to explain these concepts in a way that's accessible to beginners while providing practical examples to help you apply them in your projects.

- **What is Promise**
  - Its an async value that can be handled in the future. The operation has completed and the promise now has a resolved value. It can be either success or failed. Promises simplify the process of writing asynchronous code by allowing you to handle success and failure in a clean, manageable way.

```JS
function timeout(duration = 2000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Operation completed');
        }, duration);
    });
}

timeout(2000)
    .then(message => console.log(message))  // 'Operation completed' after 2 seconds
    .catch(error => console.error(error));

```

In the example above, the timeout function returns a Promise that resolves after 2 seconds with the message "Operation completed". The .then() method handles the resolved value, while .catch() deals with any potential errors.

- **Asynchronous Operations**
  - Async function in JS allows you to perform tasks, like fetching data from the internet or reading files, without stopping (or blocking) the rest of your code from running. Imagine you're ordering a coffee at a cafe. Instead of standing at the counter waiting for your coffee (which blocks the line), you take a buzzer and sit down. While waiting, you can chat with friends or read a book. When the coffee is ready, the buzzer notifies you to pick it up. Similarly, JavaScript lets your code continue to run while it waits for these tasks to finish, using mechanisms like callbacks, promises, and async/await. This way, your program can do other things while waiting for these operations to complete, making it more efficient and responsive.

**Using finally with Promises:**

- The finally method is another useful tool provided by Promises. It allows you to execute code once a Promise has been settled, regardless of whether it was resolved or rejected. This is particularly useful for cleanup operations or tasks that need to be performed after an asynchronous operation is completed, no matter the outcome.

**Promises and Async/Await:** - While Promises provide a cleaner way to manage asynchronous operations compared to callbacks, they can still be cumbersome when chaining multiple asynchronous calls. Async/Await simplifies this further by allowing you to write asynchronous code that looks synchronous.

Here's an example of using finally:

```JS
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5; // Randomly resolve or reject
      if (success) {
        resolve("Data fetched successfully!");
      } else {
        reject("Failed to fetch data.");
      }
    }, 2000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log("Fetch operation complete."));

```

- Using Async/Await

  - When using an async function in JavaScript, you can use the await keyword to pause the execution of the function until a Promise is resolved. This makes the code more readable and easier to understand.

- Why uses Async/Await over then/finally

  - readable and maintainable:
    - async/await syntax makes asynchronous code look and behave more like synchronous code, which is easier to read and understand.
    - Reduces the need for chaining multiple .then() calls, which can become difficult to follow and maintain

- Here is an example of using async await:

```JS
function walkDog() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dogwalked = true;

      if (dogwalked) {
        resolve("You walked the dog!");
      } else {
        reject("You did not walked the dog");
      }
    }, 2000);
  });
}

function doLaundry() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const done = true;

      if (done) {
        resolve("You did the laundry!");
      } else {
        reject("You did not do the laundry");
      }
    }, 2000);
  });
}

async function doChores() {
  const walktheDog = await walkDog();
  console.log(walktheDog);

  const laundry = await doLaundry();
  console.log(laundry);
}
```

- In the doChores function, the await keyword is used to wait for each Promise to resolve before moving on to the next line of code. This ensures that the dog is walked before the laundry is done, making the code sequential and easy to follow.

- Conclusion
  - By understanding and effectively using Promises and Async/Await in JS, you can improve your skills in handling asynchronous operations. Making your code more readable and maintainable, you can build more responsive and robust applications. Practice using these techniques gains you confidence and proficiency in managing asynchronous tasks in your JS projects.

## Usage of XMLHttpRequest

- ### Basic test:
  - XMLHttpRequest is a core technology behind the Ajax (Asynchronous JavaScript and XML) approach, allowing web applications to send and receive data asynchronously. Despite the rise of more modern alternatives like the Fetch API, XMLHttpRequest remains widely used for historical and compatibility reasons.

```JS
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readystate == 4) {
    if (xhr.status == 200) {
      document.getElementById("bottle").textContent = xhr.responseText;
    }

    if (xhr.status == 404) {
      console.log("File or resource not found");
    }
  }
};

xhr.open("get", "dom.txt", true);
xhr.send();

```

- The code above uses the XMLHttpRequest to make an HTTP request. Once the request is complete and the readyState is confirmed as 4, indicating that the operation is finished, it checks the response status. If the status is 200, indicating a successful request, it updates the webpage by posting the response text to an HTML element with the ID 'bottle' using the DOM. If the status is 404, it logs an error message indicating that the requested resource was not found.
