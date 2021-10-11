let FIELDS = {
    trans_date:{display:'Transaction Date',tag:'input', type:'date',ui:'table/form/schema',},
    category:{display:'Category',tag:'select', type:'text',ui:'table/form/schema',options:[
        "", 'Steel', 'Nail', 'Paint', 'Plumbing', 'Rope', 'Wire',
    ]},
    category_id:{display:'Category ID', tag:'select', options:[], type:'text', ui:'form/schema'},
    category_desc:{display:'Category', tag:'input', ui:'table/form/schema', type:'text'},
    item_desc:{display:'Description', tag:'input',  ui:'table/form/schema', type:'text'},
    item_id:{display:'Item ID', tag:'select', options:[],  ui:'form/schema', type:'text'},
    uom:{display:'UOM', tag:'select',  ui:'table/form/schame', options:[
        '','kg','mg','L','ml','Gal','pc','bag','pail','container','inch','mm','cm',
    ]},
    interest_rate:{display:'Interest', tag:'input', ui:'table/form/schema', type:'text'},
    loan_desc:{display:'Description', tag:'input', ui:'table/form/schema', type:'text'},
    loan_id:{display:'Loan ID', tag:'select', options:[], ui:'table/form/schema', type:'text'},
    term:{display:'Term', tag:'input', ui:'table/form/schema', type:'text'},
    size:{display:'Size', tag:'input', ui:'table/form/schema', type:'text'},
    ref:{display:'Ref', tag:'input', ui:'table/form/schema', type:'text'},
    qty:{display:'Qty', tag:'input', ui:'table/form/schema', type:'text'},
    unit_retail:{display:'Unit Retail', tag:'input', ui:'table/form/schema', type:'text'},
    unit_cost:{display:'Unit Cost', tag:'input', ui:'table/form/schema', type:'text'},
    amount:{display:'Amount', tag:'input', ui:'table/form/schema', type:'text'},
    vendor_desc:{display:'Vendor', tag:'input', ui:'table/form/schema', type:'text'},
    vendor_id:{display:'Vendor ID', tag:'select', options:[], ui:'form/schema', type:'text'},
    first_name:{display:'First Name', tag:'input', ui:'table/form/schema', type:'text'},
    name:{display:'Name', tag:'input', ui:'table/form/schema', type:'text'},
    last_name:{display:'Last Name', tag:'input', ui:'table/form/schema', type:'text'},
    member_id:{display:'Member ID',tag:'select', options:[], ui:'form/schema', type:'text'},
    member_name:{display:'Member Name', tag:'input', ui:'table/form/schema', type:'text'},
    address:{display:'Address', tag:'input', ui:'table/form/schema', type:'text'},
    contact:{display:'Contact', tag:'input', ui:'table/form/schema', type:'text'},
    remarks:{display:'Remarks', tag:'textarea', ui:'table/form/schema', type:'text'},
    username:{display:'User Name', tag:'input', ui:'table/form/schema', type:'text'},
    role:{display:'Role', tag:'input', ui:'table/schema', type:'text'},
    lrf:{display:'Loan Refund', tag:'input', ui:'form/table/schema', type:'text'},
    saving:{display:'Savings', tag:'input', ui:'form/table/schema', type:'text'},
    cbu:{display:'CBU', tag:'input', ui:'form/table/schema', type:'text'},
    total:{display:'Total', tag:'input', ui:'form/table/schema', type:'text'},
    withdraw_by:{display:'Withdraw By', tag:'input', ui:'form/table/schema', type:'text'},
    principal:{display:'Principal', tag:'input', ui:'form/table/schema', type:'text'},
    interest:{display:'Interest', tag:'input', ui:'form/table/schema', type:'text'},
    password:{display:'Password', tag:'input', ui:'schema', type:'text'},
    created_at:{display:'Created At', tag:'input', ui:'schema', type:'date'},
    edited_at:{display:'Edited At', tag:'input', ui:'schema', type:'date'},
    _id:{display:'ID', tag:'input', ui:'schema', type:'text'},
};

try{
    module.exports = FIELDS;
} catch(err){
    
}

