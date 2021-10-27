console.log("hello world");

exports.a = "a";
exports.add = function (a, b) {
  return a + b;
};
exports.geek = {
  c: "1",
  d: 2,
};

// 覆盖上面的exports
module.exports = function minus(a, b) {
  return a - b;
};

setTimeout(()=>{
    console.log(exports)
}, 2000)
