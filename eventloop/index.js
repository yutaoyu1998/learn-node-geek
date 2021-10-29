const eventloop = {
    queue: [],

    loop(){
        while(this.queue.length){
            var callback = this.queue.shift();
            callback();
        }

        setTimeout(this.loop.bind(this), 50)
    },

    add(callback){
        this.queue.push(callback)
    }
}

eventloop.loop();

setTimeout(()=>{
    console.log(1)
}, 30)

setTimeout(()=>{
    console.log(2)
}, 50)

setTimeout(()=>{
    console.log(3)
}, 70)

setTimeout(()=>{
    console.log(4)
}, 90)