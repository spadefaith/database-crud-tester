Cakes.create('model-remote', null, {
    type:'model',
    handlers:{},
    subscribe:{
        table:{
            getData(e){
                return [
                    {field1:1, field2:2, field3:3, field4:4}
                ]
            },  
        }
    },
});