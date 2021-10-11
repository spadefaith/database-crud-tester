/*
    {
        tblA:{
            
        },
        tblB:{},
    }
*/

let CONFIG = {
    sale:{
        temp:'Temp Purchase',
        display:'Sales',
        fields:['trans_date', 'ref', 'member_id:member_name','item_id:item_desc', 'qty', 'unit_retail', 'amount', 'created_at', 'edited_at'],
        join:{
            item_id:{ref:'item', map:'_id',fields:['item_desc']},
            category_id:{ref:'category', map:'_id',fields:['category_desc']},
            member_id:{ref:'member', map:'_id',fields:['member_name']},
        },
    },
    purchase:{
        temp:'Temp Purchase',
        display:'Purchase',
        fields:['trans_date', 'ref', 'vendor_id:vendor_desc', 'item_id:item_desc', 'qty', 'unit_cost', 'amount', 'created_at', 'edited_at'],
        join:{
            item_id:{ref:'item', map:'_id',fields:['item_desc']},
            category_id:{ref:'category', map:'_id',fields:['category_desc']},
            vendor_id:{ref:'vendor', map:'_id', fields:['vendor_desc']},
        },
    },
    disposal:{
        temp:'Temp Purchase',
        display:'Disposal',
        fields:['trans_date', 'ref', 'item_id:item_desc', 'qty', 'unit_cost', 'amount', 'remarks', 'created_at', 'edited_at'],
        join:{
            item_id:{ref:'item', map:'_id', fields:['item_desc']},
            category_id:{ref:'category', map:'_id', fields:['category_desc']},
        },
    },
    member:{
        display:'Members',
        fields:['trans_date', 'first_name', 'last_name'],
        rel:{
            sales:{ref:'sale', map:'member_id', inner:'_id'},
            loans:{ref:'loan', map:'member_id', inner:'_id'},
            collections:{ref:'collection', map:'member_id', inner:'_id'},
            withdraws:{ref:'withdraw', map:'member_id', inner:'_id'},
        }
    },
    loan_product:{
        display:'Loan Products',
        fields:['trans_date', 'loan_desc','interest_rate','term', 'created_at', 'edited_at'],
    },
    item:{
        display:'Items',
        fields:['trans_date', 'category_id:category_desc', 'item_desc', 'uom', 'size', 'created_at', 'edited_at'],
        rel:{
            disposals:{ref:'disposal', map:'item_id', inner:'_id'},
            sales:{ref:'sale', map:'item_id', innerKey:'_id'},
            purchases:{ref:'purchase', map:'item_id', inner:'_id'},
        }
    },
    vendor:{
        display:'Vendors',
        fields:['trans_date', 'vendor_desc', 'address', 'contact', 'created_at', 'edited_at'],
        rel:{
            purchases:{ref:'purchase', map:'item_id', inner:'_id'},
        }
    },
    category:{
        display:'Categories',
        fields:['trans_date', 'category_desc', 'remarks', 'created_at', 'edited_at'],
        rel:{
            sales:{ref:'sale', map:'item_id', inner:'_id'},
            purchases:{ref:'purchase', map:'item_id', inner:'_id'},
            disposals:{ref:'disposal', map:'item_id', inner:'_id'},
        }
    },
    auth:{
        display:'Auth',
        fields:['trans_date', 'first_name', 'last_name', 'username', 'password', 'role'],
    },

    loan:{
        display:'Loans',
        fields:['trans_date', 'loan_id:loan_desc', 'member_id:member_name','amount', 'created_at', 'edited_at'],
        join:{
            member_id:{ref:'member', map:'_id', fields:['member_name']},
            loan_id:{ref:'loan_product', map:'_id', fields:['loan_desc']},
        },
        rel:{
            collections:{ref:'collection', map:'loan_id', inner:'_id'},
        }
    },
    withdraw:{
        display:'Withdraw',
        fields:['trans_date','member_id:member_name', 'amount','withdraw_by', 'created_at', 'edited_at'],
        join:{
            member_id:{ref:'member', map:'_id', fields:['member_name']},
        },
    },
    collection:{
        display:'Collections',
        fields:['trans_date', 'loan_id:loan_desc', 'member_id:member_name','lrf','saving','cbu','interest','principal','total', 'created_at', 'edited_at'],
        join:{
            member_id:{ref:'member', map:'_id', fields:['member_name']},
            loan_id:{ref:'loan_product', map:'_id', fields:['loan_desc']},
        },
    },
}
try{
    module.exports = CONFIG;    
} catch(err){
    
}