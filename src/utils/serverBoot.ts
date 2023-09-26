function boot() {
  console.log("Connecting to the satellites...");
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Connected to satellites...");
      resolve();
    }, 1000);
  });
}

// boot()
// .then(() => {
// })
// .catch((err) => {
//   console.log(err);
// });

export default boot;
