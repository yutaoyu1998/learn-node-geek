const EventEmitter = require("events").EventEmitter;

class Geektime extends EventEmitter {
  constructor() {
    super();
    setInterval(() => {
      this.emit("newlesson", { price: Math.random() * 100 });
    }, 3000);
  }
}

const geek = new Geektime();

geek.addListener("newlesson", (res) => {
  console.log("price", res);
});
