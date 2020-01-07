/*
    items from data.imgclick.price will never be deleted
    for deletion --> data.imgclick.id   

*/
// MAIN CONTROLLER
var mainController = (function(){
    var stringcontainer = {
        month : '.month',
        day : '.day',
        year : '.year',
        enterbud : '.enterbud',
        go :'.go',
        budgetline : '.budgetline',
        donebtna : '.donebtna',
        donebtnb : '.donebtnb',
        container :'.container',
        lists : '.lists',
        forjs : '.forjs',
        monthlybudg : '.monthlybudg',  
        yearlybudg : '.yearlybudg',
        monthlyexp :  '.monthlyexp',
        yearlyexp : '.yearlyexp',
        loanval : '.loanval',
        loanbudg : '.loanbudg',
        budgexp : '.budgexp',
        top : '.top',
        pic1 : '.pic1',
        pic2 : '.pic2',
        pic3 : '.pic3',
        pic4 : '.pic4',
        pic5 : '.pic5',
        pic6 : '.pic6',
        pic7 : '.pic7',
        pic8 : '.pic8',
        pic9 : '.pic9',
        pic10 : '.pic10',
        red : 'red',
        blue : 'blue',
        green : 'green'
    };
    var data = {
        budget : 0,
        imgclick : {
            price : [],
            id : []
        }
    };
    
    
    return {
        stringspass : function(){
            return stringcontainer;
        },
        datapass : function(){
            return data;
        }
    };
})();





//  BUDGET CONTROLLER
var budgetController = (function(mainCtrl){
    
    var string, datastore,id;
    string = mainCtrl.stringspass();
    datastore = mainCtrl.datapass();
    var donecode = '<div class="donebtna"><button class="donebtnb">Done</button></div><br>';
    
    
    var makeid = function(){
        id = datastore.imgclick.price.length - 1;
        datastore.imgclick.id[datastore.imgclick.id.length] = id;
    };
    
    var deleteimgid = function(elementid){
        var idindex;
        idindex = datastore.imgclick.id.indexOf(elementid);
        datastore.imgclick.id.splice(idindex,1);
    };
    
    // ID delteion on clicking cross icon
    var deleteid = function(e){
        var ididn,splitididn,idn;
        
        ididn = e.target.parentNode.parentNode.id;
        
        if(ididn){
            splitididn = ididn.split('-');
            idn = parseInt(splitididn[1]);
            
            //deleting from imgclick.id array
            deleteimgid(idn);
            console.log(idn);            
            console.log(datastore.imgclick.id);
            
            //clearing expense from ui
            var el = document.getElementById(ididn);
            el.parentNode.removeChild(el);
        }
    };
    
    //adding price in main array
    var addinarr = function(x){
        if(datastore.imgclick.price.length === 0){
            datastore.imgclick.price[0] = x;
        }else{
            datastore.imgclick.price[datastore.imgclick.price.length] = x;
        }
        makeid();
    };
    
    var clickimg = function(){
        //  PIC 1 personal care $200
        document.querySelector(string.pic1).addEventListener('click', function(){
            addinarr(200);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Personal Care</div><div class="amt1">$200&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        //  PIC 2 home & decor $400
        document.querySelector(string.pic2).addEventListener('click', function(){
            addinarr(400);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Home & Decor</div><div class="amt1">$400&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        //  PIC 3 bags $100
        document.querySelector(string.pic3).addEventListener('click', function(){
            addinarr(100);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Bags</div><div class="amt1">$100&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        //  PIC 4 kitchen $600
        document.querySelector(string.pic4).addEventListener('click', function(){
            addinarr(600);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Kitchen</div><div class="amt1">$600&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        //  PIC 5 food & beverages $1100
        document.querySelector(string.pic5).addEventListener('click', function(){
            addinarr(1100);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Food & Beverages</div><div class="amt1">$1100&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        //  PIC 6 lifestyle $900
        document.querySelector(string.pic6).addEventListener('click', function(){
            addinarr(900);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Lifestyle</div><div class="amt1">$900&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        //  PIC 7 stationery $50
        document.querySelector(string.pic7).addEventListener('click', function(){
            addinarr(50);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Stationery</div><div class="amt1">$50&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        //  PIC 8 baby care & kids $300
        document.querySelector(string.pic8).addEventListener('click', function(){
            addinarr(300);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Baby Care & Kids</div><div class="amt1">$300&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        //  PIC 9 accessories $250
        document.querySelector(string.pic9).addEventListener('click', function(){
            addinarr(250);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Accessories</div><div class="amt1">$250&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        //  PIC 10 gifts $450
        document.querySelector(string.pic10).addEventListener('click', function(){
            addinarr(450);
            var htmlCode = '<span class="expense clearfix" id="id-%idn%"><div class="exp1">Gifts</div><div class="amt1">$450&nbsp;&nbsp;<img src="files/ios-close.svg" class="crossicon"></div></span>';
            htmlCode = htmlCode.replace('%idn%',id);
            document.querySelector(string.forjs).insertAdjacentHTML('beforebegin', htmlCode);
        });
        
        
        //delete item
        document.querySelector(string.lists).addEventListener('click', deleteid);
        
    };
    
    var dispresult = function(){
        var resultcode = '<div class="result"><br><div class="resulthead">Calculations</div><br><hr size=8% width=57% class="resultline"><span class="rowa"><div class="cola">Monthly Budget</div> <div class="monthlybudg">0000</div></span><span class="rowa"><div class="cola">Yearly Budget</div> <div class="yearlybudg">00</div></span><span class="rowa"><div class="cola">Monthly Expense</div> <div class="monthlyexp">0000</div></span><span class="rowa"><div class="cola">Yearly Expense</div> <div class="yearlyexp">0000</div></span><span class="rowa"><div class="cola">Loan Needed(Monthly)</div> <div class="loanval">0000</div></span><span class="rowa"><div class="cola">Budget-to-Expense Ratio</div> <div class="budgexp">0.6</div></span><span class="rowa"><div class="cola">Loan-to-Budget Ratio(in %)</div> <div class="loanbudg">12%</div></span></div>'; 
        document.querySelector(string.top).insertAdjacentHTML('afterend', resultcode);
        
        var lenprice,lenid,loanneed,varx,loanbudget,budgexpense;
        var monthlyexpense=0;
        lenprice = datastore.imgclick.price.length;
        lenid =datastore.imgclick.id.length;
        
        for(varx=0;varx<lenid;varx++){
            var vary = datastore.imgclick.id[varx] ;
            monthlyexpense += datastore.imgclick.price[vary];
        }
        
        loanneed = (datastore.budget)-monthlyexpense;
        if(loanneed<0){
            loanneed = Math.abs(loanneed);
            document.querySelector(string.monthlybudg).classList.add(string.red);
            document.querySelector(string.yearlybudg).classList.add(string.red);
            document.querySelector(string.loanval).classList.add(string.red);
        }else{
            loanneed = '000';
            document.querySelector(string.monthlybudg).classList.add(string.blue);
            document.querySelector(string.yearlybudg).classList.add(string.blue);
            document.querySelector(string.loanval).classList.add(string.green);
        }
        
        loanbudget = ((Math.abs(parseInt(loanneed)))/(datastore.budget))*100;
        if(loanbudget !== 0){
            document.querySelector(string.loanbudg).classList.add(string.red);
        }else{
            document.querySelector(string.loanbudg).classList.add(string.blue);
        }
        budgexpense = (datastore.budget)/monthlyexpense;
        if(budgexpense<1){
            document.querySelector(string.budgexp).classList.add(string.green);
        }else{
            document.querySelector(string.budgexp).classList.add(string.red);
        }
        
        if(monthlyexpense>(datastore.budget)){
            document.querySelector(string.monthlyexp).classList.add(string.red);
            document.querySelector(string.yearlyexp).classList.add(string.red);
        }else{
            document.querySelector(string.monthlyexp).classList.add(string.green);
            document.querySelector(string.yearlyexp).classList.add(string.green);
        }
        
        document.querySelector(string.monthlybudg).textContent = '$' + datastore.budget;
        document.querySelector(string.yearlybudg).textContent = '$' + 12*(datastore.budget);
        document.querySelector(string.monthlyexp).textContent = '$' + monthlyexpense;
        document.querySelector(string.yearlyexp).textContent = '$' + 12*(monthlyexpense);
        document.querySelector(string.loanval).textContent = '$' + loanneed;
        document.querySelector(string.loanbudg).textContent = loanbudget.toFixed(2) + '%';
        document.querySelector(string.budgexp).textContent = budgexpense.toFixed(4);
    };
    
    var clickbtndone = function(){
        
        //remove instructions+(10pics)+'calculator'+selecteditems+donebutton
        var pathcont = document.querySelector(string.container);
        pathcont.parentNode.removeChild(pathcont);
        
        //display results
        dispresult();
        
    };        
    
    
    return {    
        budgetevent : function(){
            var budgetvalue = parseInt(document.querySelector(string.enterbud).value);
            if(budgetvalue > 0 && !isNaN(budgetvalue)){
                document.querySelector(string.lists).insertAdjacentHTML('beforeend', donecode);
                datastore.budget = budgetvalue;
                document.querySelector(string.budgetline).innerHTML = "";
                clickimg();
                document.querySelector(string.donebtnb).addEventListener('click', clickbtndone);    
            }
        }
    };
    
})(mainController);





//   UI CONTROLLER
var uicontrol = (function(mainCtrl,budgetCtrl){
    
    var string, datastore;
    string = mainCtrl.stringspass();
    datastore = mainCtrl.datapass();
    
    
    // BUDGET INPUT
    var starter = function(){
        document.querySelector(string.go).addEventListener('click', budgetCtrl.budgetevent );
        document.querySelector(string.enterbud).addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                budgetCtrl.budgetevent();
            }
        });
    };

    
    return {
        init : function(){
            starter();
        }
    };
})(mainController,budgetController);





//        Date Settings
var datesetting = (function(mainCtrl){
    today = new Date();
    var montharray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month,day,year;
    var string = mainCtrl.stringspass();
    month = today.getMonth();
    day = today.getDate();
    year = today.getFullYear();
    
    
    return {
        dateset : function(){
            document.querySelector(string.month).textContent = montharray[month];
            document.querySelector(string.day).textContent = day + ',';
            document.querySelector(string.year).textContent = year;
        }
    };
})(mainController);





//      INITIAL
datesetting.dateset();
uicontrol.init();







