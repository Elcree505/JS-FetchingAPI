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

// function doChores() {
//   const walktheDog = walkDog();
//   console.log(walktheDog);

//   const laundry = doLaundry();
//   console.log(laundry);
// }

doChores();
