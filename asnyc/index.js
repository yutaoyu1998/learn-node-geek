function interview(callback) {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      callback(null, "success");
    } else {
      // wrong
      // throw new Error("fail");

      // right
      callback(new Error("fail"));
    }
  });
}

// try {
//   interview(function () {
//     console.log("smile");
//   });
// } catch (error) {
//   console.log("error", error);
// }

interview(function (res) {
  if (res) {
    return console.log("cry");
  }

  console.log("smile");
});
