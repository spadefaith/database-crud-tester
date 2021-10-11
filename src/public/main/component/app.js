Cakes.create('app','#app', {
    data(self){
        this.tableSettings = {
            persistence:{
                sort:true,
                filter:true,
                columns:true,
            },
            columnMaxWidth:380,
            headerFilterLiveFilterDelay:100, //wait 600ms from last keystroke before triggering filter
            index:'_id', //set the index of the data;
            addRowPos:'top',
            reactiveData:true,
            // clipboard:true,
            // clipboardPasteAction:"replace",
            printAsHtml:true,
            // printStyled: true,
            printRowRange:"selected",
            persistenceID:"cedrick",
            pagination:"local",
            paginationSize:10,
            paginationSizeSelector:[5, 10, 25, 50],
                    //load row data from array
            layout:"fitDataFill",      //fit columns to width of table
            responsiveLayout:"collapse",
            tooltips:true,            //show tool tips on cells
            addRowPos:"top",          //when adding a new row, add it to the top of the table
            movableColumns:true,      //allow column order to be changed
            resizableRows:true,       //allow row order to be changed
            initialSort:[             //set the initial sort order of the data
                {column:"_id", dir:"des"},
            ],
        };
    },
    handlers:{
        isConnected(){ 
            console.log('app is connected');
            this.$scope.uiConfig = {
                tableFields:[ 
                    {field: 'field1', width:180,title: 'Field1', tag: 'input', type: 'text', ui: 'form/table/preview',  },
                    {field: 'field2', width:180, title: 'Field2', tag: 'input', type: 'text', ui: 'form/table/preview',  },
                    {field: 'field3', width:180, title: 'Field3', tag: 'input', type: 'text', ui: 'form/table/preview', },
                    {field: 'field4', width:100, title: 'Field4', tag: 'input', type: 'text', ui: 'form/table/preview',  },
                ],
                menu:'Test',
            }
        },
    },
    subscribe:{
        table:{
            getTableSettings(e){
 
                return this.data.tableSettings;
            }
        }
    },
});