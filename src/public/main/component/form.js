Cakes.create('form', '#form', {
    handlers:{
        submit(e){
            // console.log(e);
            let data = new FormData(e.target);
            let o = {};
            for (let [key, value] of data.entries()){
                o[key] = value;
            };
            console.log(o);
            return o;
        }
    },
    subscribe:{

    }
})