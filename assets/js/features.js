/**********************************************************
* Auth : [Jeremie Sophikitis, Adrien Fevre, Victor Anton] *
* Project : The big bang Task                             *
* Description : Fonctions gadget                          *
**********************************************************/
$(document).ready(function() {


  // copy codeuser sur un doubleclick
  $(".codeUser").dblclick(function(){

     $(".textimg").toggleClass('nospeak speak');
     window.setTimeout(function() {


             $(".textimg").toggleClass('nospeak speak');
      
     }, 4000);
  });








// END
})
