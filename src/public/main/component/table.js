Cakes.create('table', '#table', {
    root:'.table-container',
    animate:{
        'table':{
            render:{keyframes:['appear']}
        }   
    },
    data(){

        this['pouch-plugin'] = window.TabulatorPouch;
        this.src = {
            officers:'local',
            products:'local',
            centers:'local',
            members:{
                query:'remote',
                data:'local',
            },
        }
        return {};
    },
    handlers:{
        
        destroy(){
            // this.html.remove();
            this.data.table.clearData();
            this.reset();
        },
        clearFilter(){
            this.fire.reset();
            this.$scope.table_searching = false;
        },
        isConnected(){
            //instantiate tabulator;
            this.fire.renderTable();
        },
        reset(){
            this.data.table.setData();
            this.fire('notifyReplicatecSuccess');
        },
        recalc(){
            this.data.table.setData();
            this.data.table.recalc();
        },
        renderTable(){
            // console.log('render Table')
            this.fire('getTableSettings').then(obj=>{
 
                let settings = obj;
                let {tableFields:columns, menu} = this.$scope.uiConfig;
                // console.log(columns);

                // console.log(tableFields, menu);
                let _this = this;
                let config = Object.assign(settings,{
                    columns,
                    rowFormatter:function(row){
                        row.getElement().setAttribute('data-_id', row.getData()._id);
                        row.getElement().setAttribute('data-_rev', row.getData()._rev);
                        row.getElement().setAttribute('data-isEditable', row.getData()._isEditable || true);
                    },
                    rowClick(e){
                        let target = e.target;
                        target = target.classList.contains('tabulator-cell')?target.parentElement:target;
                        if ((target.tagName == 'BUTTON' && target.dataset.role=='radio') || target.tagName == 'SPAN' || target.tagName == 'I'){

                            let row = target.closest('.tabulator-row');
                            let btn = target.closest('.button');
                            _this.fire('radioClicked',{
                                _id:row.dataset._id,
                                _rev:row.dataset._rev,
                                action:btn.getAttribute('name'),
                            })
                        } else {
                            _this.fire('tableRowClick',{
                                root:target,
                            });
                        }
                    },
                    //data,
                    dataChanged(d){
                        // self.dispatch('dataChanged',d);
                    },
                    cellEdited(e){
                        // self.dispatch('cellEdited', {e});
                    },
                    // columns,
                }, {
                    // ajaxURL:`http://localhost:7799/getAll`,
                    ajaxConfig:{
                        mode:"cors", //set request mode to cors
                        credentials: "same-origin", //send cookies with the request from the matching origin
                        method:"GET", //set request type to Position
                        headers: {
                            "Content-type": 'application/json; charset=utf-8', //set specific content type
                            "tbl":menu,
                        },
                        loaderMsg:`<div id=dots-container>
                            <div class="dots-2"></div>
                        </div>`,
                    },
                    ajaxResponse:(url, params, response)=>{
                        //url - the URL of the request
                        //params - the parameters passed with the request
                        //response - the JSON object returned in the body of the response.
                        console.log(response.length);
                        return response; //return the tableData property of a response json object
                    },
                    
                    ajaxRequestFunc:()=>{
                        // console.log('here std');
                        return this.fire('getData',menu).then(data=>{
                            console.log(data.length);
                            return (data && data.length)?data:[];
                        });
                    },
                    // ajaxURLGenerator:(url, config, params)=>{
                    //   console.log(url + "?params=" + encodeURI(JSON.stringify(params)));  
                    // },
                });

                this.data.table = new Tabulator("#dtable", config);
                this.data.table.options.ajaxRequestFunc = ()=>{
                    // console.log('here upd');
                    return this.fire('getData',menu).then(data=>{

                        // console.log(data);
                        return (data && data.length)?data:[];
                    });
                };
                this.data.table.setData()
                .then(()=>{
                    this.fire('loaded');

                });
            });
        },
        sync(){
            // console.log(this.data.table.options.ajaxRequestFunc.toString())
            // this.data.table.options.ajaxRequestFunc = ()=>{
            //     return this.fire(function syncToLocal(){});
            // };
            let fire = this.fire.bind(this);
            console.log(this.data.table.updateTableOptions);
            this.data.table.updateTableOptions({
                ajaxRequestFunc :()=>{
                    // console.log('here') 
                    return fire(function syncToLocal(){ return  }).then((data)=>{
                        console.log(data);
                        this.fire('notifySuccess','synching successfully!');
                        return data;
                    });
                },
            });
            this.data.table.setData();
            // console.log(this.data.table.options.ajaxRequestFunc.toString())
            // return this.data.table.setData();
        },
        setData({tbl, data}){
            this.data.table.replaceData(data);
            // console.log(tbl, data);
        }
    },
    subscribe:{
        app:{
            isConnected(e){
 
                this.render();
            }
        },
        sidebar:{
            rendertable(menu){
                this.renderAsync();
            },
            destroytable(){
                this.fire.destroy();
            },
        },
        sync:{
            synchedRemove(tbls){
                // console.log(tbls);
                let tbl = this.$scope.uiConfig.menu;
                if (tbls[tbl] != undefined){
                    this.fire.reset();
                };
            },
            synchedAppend(tbls){
                // console.log(tbls);
                let tbl = this.$scope.uiConfig.menu;
                if (tbls[tbl] != undefined){
                    this.fire.reset();
                };
            }
        },
        'model-local':{
            syncSuccess(){
                this.fire.recalc();
                this.fire('notifySyncSuccess');
            },
            deleteFromSocket(obj){
                console.log(obj);
                return this.data.table.deleteRow([obj._id]).then(()=>{
                    this.fire('spinnerDestroy');
                    this.fire('notifyDeleteSuccess');
                    this.fire.clearFilter();
                })
            },
            updateFromSocket(obj){
                let {data, tbl} = obj;

                console.log(obj)

                if (this.$scope.uiConfig.menu == tbl){
                    // console.log(data);
                    return this.data.table.updateRow(data._id, data).then(()=>{
                        this.fire('spinnerDestroy');
                        this.fire('notifyUpdateSuccess');
                        this.fire.clearFilter();
                    });
                };
            },
            insertFromSocket(obj){
                let {data, tbl} = obj;
                if (this.$scope.uiConfig.menu == tbl){
                    return this.data.table.addRow([data], true).then(()=>{
                        this.fire('spinnerDestroy');
                        this.fire('notifyCreateSuccess');
                        this.fire.clearFilter();
                    });
                };
            },
            clearFilter(){
                this.fire.clearFilter();
            }
        },
        toolbar:{
            sync(){
                return this.fire.sync();
            },
            print(e){
                // console.log(e);
                this.data.table.print(false, true);
            },
        },
        socket:{
            tempSearchData(obj){
                this.$scope.table_searching = true;
                this.fire.setData(obj);
            },
        },
        form:{
            submit(e){
                console.log(e);
                this.data.table.addRow([e], true).then(()=>{
                    console.log('inserted successfully');
                })
            }
        }
    },
});