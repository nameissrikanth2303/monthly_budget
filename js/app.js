var budgetControler =(function(){
  var Expenceses = function (id,description,value) {
    this.id = id,
    this.description=description,
    this.value=value,
    this.percentage = -1;
    };

   Expenceses.prototype.calcPercentage =function(totalIncome){
     if(totalIncome > 0){
      this.percentage = Math.round ((this.value /totalIncome)*100);
     }else{
       this.percentage = -1
     }
  
     
   };
Expenceses.prototype.getpercentage = function (){

  return this.percentage;
};



    
    var Income = function (id,description,value) {
      this.id = id,
      this.description=description,
      this.value=value
      
    };



    var caluculateTotal =function(type){
      var sum ,
                sum =0
      
                data.allItems[type].forEach(function(cur){
      
                   sum +=cur.value
                });
                data.total[type] = sum;
            
        }

       




    var data = {
            
      allItems :{
            
          exp:[],
          inc:[],
         },

        total :{
           
         exp :0,
         inc: 0,

        },
        budget: 0,
        percentage: -1

};


return{
 
  additem : function (type,des,val) {
    var newItem,ID;
      
    if(data.allItems[type].length > 0 ){
//  creating new Id 
    ID=data.allItems[type][data.allItems[type].length-1].id + 1;

    }else{
      ID=0;
    }


    if (type==='exp') {
      newItem = new Expenceses(ID,des,val);
    }else if (type==='inc') {
      newItem = new Income(ID,des,val);
      
    }
    
    // adding item to data
     data.allItems[type].push(newItem)
   
// /returning item
     return newItem ;
    },

    caluculateBudegt:function(){
           
      // sum all inc/exp

      caluculateTotal('exp');
      caluculateTotal('inc');
       
    // Budget cal

    data.budget = data.total.inc -  data.total.exp;

    // percentage 
      
    if(data.total.inc > 0){
      data.percentage = Math.round((data.total.exp / data.total.inc)* 100);
    }else {
      data.percentage= -1
    }
    
    },


    calculatePercentages:function(){

     
      data.allItems.exp.forEach(function(cur){
        
        cur.calcPercentage(data.total.inc);
      }); 
    },

    getpercentages:function(){
      var allperc =data.allItems.exp.map(function(cur){

          return cur.getpercentage();
      });
      return allperc; 

    },

    getBudget:function(){
  
      return{
           
        budget:data.budget,
        totalInc:data.total.inc,
        totalexp:data.total.exp,
        percentage:data.percentage

      };


    },

    deleteItem:function(type,id){
      var ids,index;


      ids = data.allItems[type].map(function(current) {
          
        return current.id;
        
      });

      index = ids.indexOf(id);

    
       if(index !== -1){

        data.allItems[type].splice(index, 1);

       }
      },

     
    testing:function(){
    console.log(data)

    }




};



})();
    
 
     
    

    

         


 
               
 
// UI controler

 var UIctrl =(function(){

  var DomStrings = {
                 invalue:'.inputtype',
                 des :'.add__des',
                 val:'.add__value',
                 button:'.addnew',
                 incomeContainer:'.income__list',
                 expensecontainer:'.expenses__list',
                 disincom :'.disincome',
                 disexp:   '.disexp',
                 distotal:'.distotal',
                 disper:'.disper',
                 list:'.list',
                 expensesPercLabel :'.item__percentage',
                 dismonth :'.month',
                 uxsel:'.add',
                 uxdes :'.add_des',
                 uxval:'.add_value'

          }

           
          var nodeListForEach = function (list,callback) {
            for(var i = 0; i < list.length; i++){
              callback(list[i],i);
            }
          }

          var formateNumber = function(num,type){
             var num,int , dec;

          num = Math.abs(num);
          num = num.toFixed(2);
          numSplit = num.split('.');

          int = numSplit[0];
          if(int.length > 3){

            int =int.substr(0,int.length-3)+','+ int.substr(int.length-3,3);
          };

          dec = numSplit[1];
         
          return (type === 'exp'? '-': '+')  + ' ' + int + '.' + dec;


          }

      return{

      
        getInput:function (){
          return{
            type:document.querySelector(DomStrings.invalue).value,
            description:document.querySelector(DomStrings.des).value,
            value:parseFloat(document.querySelector(DomStrings.val).value),
            
  
          };
        },


        addlistitem :function(obj,type){
          var html,newHtml,element
         //create html string
         if (type==='inc') {
           element = DomStrings.incomeContainer;
           html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           
         } else  if (type==='exp'){
           element=DomStrings.expensecontainer;
           html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div><div class="item__percentage">30%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           
         }
         
       //   // replace html
         
          newHtml =html.replace('%id%',obj.id),
         
          newHtml = newHtml.replace('%description%',obj.description),
          newHtml = newHtml.replace('%value%', formateNumber(obj.value, type) ),
          document.querySelector(element).insertAdjacentHTML("beforeend",newHtml)
         }, 


         deletlistItem:function(selectorID){
                   var el =document.getElementById(selectorID);
                     el.parentNode.removeChild(el);
                     },

         

            
                  getDomStrings:function(){
                    return DomStrings;
                  },


  //  clear fields 
  
  clearFields : function(){
    var fields,fieldarr
    fields =document.querySelectorAll(DomStrings.des + "," + DomStrings.val);

  fieldarr =  Array.prototype.slice.call(fields);

  fieldarr.forEach(function(current,i,arry) {
    current.value="";
    
  });
  fieldarr[0].focus();
      },


      displayBudget:function(obj){
          var type;
          obj.budget > 0 ? type = 'inc'  : type = 'exp';

        document.querySelector(DomStrings.distotal).textContent =formateNumber(obj.budget,type) ;
        document.querySelector(DomStrings.disincom).textContent = formateNumber(obj.totalInc,'inc');    
        document.querySelector(DomStrings.disexp).textContent =     formateNumber(obj.totalexp , 'exp') ;
        if(obj.percentage > 0){
          document.querySelector(DomStrings.disper).textContent =  obj.percentage + '%'
        }else{

      document.querySelector(DomStrings.disper).textContent = '---'
        }
        
     },

     displayPercentages: function(percentages){
            
      var fields =document.querySelectorAll(DomStrings.expensesPercLabel);

      
         nodeListForEach(fields,function(current,index){
            
          if(percentages[index]> 0){
 
            current.textContent = percentages[index] + "%";

          }else{
            current.textContent= '---';
          }
          

         });

      },


      // Date


      date : function (){
        var day ,month;
      
         day = new Date();
         months = ['January' ,'Febaruary','March','April','May',"June","July","August","september","November","December"]
         month = day.getMonth();
         year = day.getFullYear();

document.querySelector(DomStrings.dismonth).textContent= months[month] + " " +year;

     },


     changetype:function(){

      
      
       var fields = document.querySelectorAll(
 
           DomStrings.uxsel+','+
           DomStrings. uxdes+','+
           DomStrings.uxval);

           nodeListForEach(fields,function(cur){

            cur.classList.toggle('colorfocus');  

           });
           document.querySelector(DomStrings.button).classList.toggle('colorfocus')
     },

        getDomstrings:function(){
          return DomStrings;

          
        }
      }
      
       

    



})();

// contraoller

 var Appctlr =(function(){
   

  var updatePercentage =function(){
   
  
                // calculating percentages
             budgetControler.calculatePercentages();
                
              // get percentages
                
              var percentages = budgetControler.getpercentages();
      
                // Update UI
      
                          // console.log(percentages);
                UIctrl.displayPercentages(percentages);
              
               
      
              }






  // Update budget 
            var updatebudget =function(){
    
                            // add all inocmes and exp
                   budgetControler.caluculateBudegt();
    
                        //  return
                        var budget = budgetControler.getBudget();
                        // updatE Ui
                        // console.log(budget)
                        UIctrl.displayBudget(budget)
    
                      
                        
            };
    





  var eventlisteners = function(){

    var Dom =UIctrl.getDomstrings();
    document.querySelector(Dom.button).addEventListener('click',buttonPress);
    document.addEventListener('keypress', function(event){

      if(event.keyCode===13 || event.which===13){

      buttonPress();
      };
      });
      document.querySelector(Dom.list).addEventListener('click',ctlrDelItem);
      document.querySelector(Dom.invalue).addEventListener('change', UIctrl.changetype)
  
   }
      
  

 var buttonPress = function (){
  var input,newItem

  //  get the inputfileds
   input = UIctrl.getInput()
   
   if(input.description  !=='' && !isNaN(input.value)  && input.value > 0){


    // add item to the budget controller
  newItem = budgetControler.additem(input.type,input.description,input.value);

  // add Item to ui
UIctrl.addlistitem(newItem,input.type);

// clear input fields 

UIctrl.clearFields();
  // caluculate budget
updatebudget();
// Display the budget 
// 
// 
// Updateingpercentages
updatePercentage();

   }

   




 };
 ctlrDelItem=function(event){
  var itemID,splitID,type,ID;
 
  itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;
  if(itemID){
   splitID = itemID.split('-');
    type = splitID[0];
     ID =  parseInt(splitID[1]);
    //  deleteing item form data
     budgetControler.deleteItem(type,ID)
      //  deleteing item form UI
     UIctrl.deletlistItem(itemID);
      // Update budeget again
          updatebudget();

   //  update percentage
      
     
};


}
   
   
   
 return{

   init:function(){
  
    console.log("WElcome'");

    UIctrl.displayBudget({budget:0,
      totalInc:0,
      totalexp:0,
      percentage:0})
    eventlisteners();
    UIctrl.date()
   

   }


 };
  

   
 


   
        







})(budgetControler,UIctrl);
Appctlr.init();