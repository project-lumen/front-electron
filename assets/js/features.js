/**********************************************************
* Auth : [Jeremie Sophikitis, Adrien Fevre, Victor Anton] *
* Project : The big bang Task                             *
* Description : Fonctions gadget                          *
**********************************************************/
$(document).ready(function() {


  // copy codeuser sur un doubleclick
  $(".codeUser").dblclick(function(){
    var code = $('.codeUser span').val();
     document.execCommand('copy');
     $(".textimg").toggleClass('nospeak speak');
     window.setTimeout(function() {
         $(".textimg").fadeTo(500, 0).slideUp(500, function(){

             $(".textimg").toggleClass('nospeak speak');
         });
     }, 4000);
  });








// END
})
