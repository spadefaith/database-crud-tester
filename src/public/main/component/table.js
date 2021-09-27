Cakes.create('table', '#table', {
    handlers:{
        click(e){
            console.log(e);
        }
    },
    subscribe:{
        form:{
            submit(e){
                
            }
        }
    },
});