
  // actual workfrom here 


  var budgetControler = (function(){
 
    var Expenceses = function (id,description,value) {
      this.id = id,
      this.description=description,
      this.value=value,
      this.percentages  = -1
    }
  
   Expenceses.prototype.calculatPercentage= function(totalIncome) {
  
   if(totalIncome > 0){
     this.percentages= Math.round((this.value/totalIncome)*100)
    }else {
      this.percentages= -1
    }
   };
   
   Expenceses.prototype.getpercentage = function(){
     return this.percentages;
   }
     
    var Income = function (id,description,value) {
      this.id = id,
      this.description=description,
      this.value=value
      
    }
  
      
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
  
  
          return {
               
            additem : function (type,des,val) {
            var newItem,id
              
            if (data.allItems[type].length > 0) {
               
            data.allItems[type][data.allItems[type].length-1].id +1;
  
            }else{
              id = 0
            }
  
  
            if (type==='exp') {
              newItem = new Expenceses(id,des,val);
            }else if (type==='inc') {
              newItem = new Income(id,des,val);
              
            }
            
             data.allItems[type].push(newItem)
  
             return newItem 
            },
  
        }
             
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
  
            calculatPercentages:function(){
  
              
              data.allItems.exp.forEach(function(cur){
   
                cur.calculatPercentage(data.total.inc);
              });
  
  
  
            },
          
  
  getpercentages:function(){
    var allPercentages = data.allItems.exp.map(function(cur){
       
       return cur.getpercentage();
    });
    return allPercentages;
  },
        
            getBudget:function(){
  
              return{
                   
                budget:data.budget,
                totalInc:data.total.inc,
                totalexp:data.total.exp,
                percentage:data.percentage
  
              };
  
  
            },
  
  
                   testing:function(){
  
                      console.log(data);  
                    }
  
          }
  
    
  
  
        
     })();
  
  
    //  UiControler
  
    var   UiControler =(function(){
  
//       var DomStrings = {
//              invalue:'.inputtype',
//              des :   '.add__des',
//              val:'.add__value',
//              button:'.addnew',
//              incomeContainer:'.income__list',
//              expensecontainer:'.expenses__list',
//              disincom :'.disincome',
//              disexp:   '.disexp',
//              distotal:'.distotal',
//              disper:'.disper',
//              list:'.list',
//              displaylabel :'.item__percentage'
//       }
  
      return {
           
        getInput:function (){
  
  
          return{
            type:document.querySelector(DomStrings.invalue).value,
            descp:document.querySelector(DomStrings.des).value,
            valnum:parseFloat(document.querySelector(DomStrings.val).value),
            
  
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
   newHtml = newHtml.replace('%value%',obj.value),
   document.querySelector(element).insertAdjacentHTML("beforeend",newHtml)
  }, 
  
  
//            deletlistItem:function(selectorID){
//          var el =document.getElementById(selectorID);
//            el.parentNode.removeChild(el);
  
  
  
//            },
  
//         getDomStrings:function(){
//           return DomStrings;
//         },
  
//         //  clear fields 
  
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
  
            document.querySelector(DomStrings.distotal).textContent = obj.budget
            document.querySelector(DomStrings.disincom).textContent = obj.totalInc
            document.querySelector(DomStrings.disexp).textContent = obj.totalexp
            if(obj.percentage > 0){
              document.querySelector(DomStrings.disper).textContent =  obj.percentage + '%'
            }else{
  
          document.querySelector(DomStrings.disper).textContent = '---'
            }
            
         },
  
   
         displayPercentage : function(percentages1){
            
          var fields = document.querySelectorAll(DomStrings.displaylabel);
  
          var nodeListForEach = function (list,callback) {
                for (var i= 0; i < list.length; i++){
  
                  callback(list[i],i);
                }
             }; 
  
             nodeListForEach(fields,function(current,index){
  
              if(percentages1[index] > 0){
                current.textContent = percentages1[index] + '%';
              }else {
                current.textContent ='---'
              };
                 
  
             });
  
          },
  
  
        
        }
    
  
  
  
  
    
  
     
  
            
  
    })();
  
    // App controler
  
  
    var App =(function(budgetControler,UiControler){
  
   var eventlisteners = function(){
   var Dom = UiControler.getDomStrings(); 
  
  document.querySelector(Dom.button).addEventListener('click',buttonPress)
  
  
  document.addEventListener('keypress', function(event){
  if(event.keyCode===13 || event.which===13){
  buttonPress();
  };
  
   document.querySelector(Dom.list).addEventListener('click',ctlrDelItem);
  
  
  });
       };
  
//   //  Update budget 
//           var updatebudget =function(){
  
//                           // add all inocmes and exp
//                  budgetControler.caluculateBudegt();
  
//                       //  return
//                       var budget = budgetControler.getBudget();
//                       // updatE Ui
//                       // console.log(budget)
//                       UiControler.displayBudget(budget)
  
                    
                      
//           };
  
//          var updatePercentage =function(){
   
  
//             // calculating percentages
  
//             budgetControler.calculatPercentages();
  
//             // get percentages
            
//             var percentages1 = budgetControler.getpercentages();
  
//             // Update UI
  
//             // UiControler.displayPercentage(percentages1);
//           //  console.log(percentages1);
           
  
//           }
  
  
  
  
  
   var buttonPress =function(){
     var newItem,input
      //get input values
   input = UiControler.getInput();
    
  
   //Add item to budget controller
  
   if(input.descp!=="" && !isNaN(input.valnum) && input.valnum  > 0){
  
    newItem= budgetControler.additem(input.type,input.descp,input.valnum)
    //  add list to UI
    UiControler.addlistitem(newItem,input.type);
    // clear input fileds
    
    UiControler.clearFields() 
  
          // updateing budegt
          updatebudget(); 
   }; 
  
      
  
//                     // Updateingpercentages
//                     updatePercentage();
   };
  
   ctlrDelItem=function(event){
     var itemID,splitID,type,ID;
    
     itemID=event.target.parentNode.parentNode.parentNode.parentNode.id);
     if(itemID){
      splitID = itemID.split('-');
       type = splitID[0];
        ID =  parseInt(splitID[1]);
        budgetControler.deleteItem(type,ID)
        UiControler.deletlistItem(itemID);
  };
   
  
       
  
        //  Update budeget again
  
    updatebudget();
    // Updateingpercentages
    updatePercentage();
  
  
  
   }
   
  return {
    init : function(){
      console.log('welocme')
      UiControler.displayBudget({budget:0,
        totalInc:0,
        totalexp:0,
        percentage:0})
        eventlisteners();
     }
  
  
  };
   
  
    
    
  })(budgetControler,UiControler)
  
  
    App.init();
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //select  
  