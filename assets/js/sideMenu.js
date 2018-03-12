/**********************************************************
* Auth : [Jeremie Sophikitis, Adrien Fevre, Victor Anton] *
* Project : The big bang Task                             *
* Description : Permet de faire apparaitre ou disparaitre *
* un menu lateral.                                        *
**********************************************************/
$(document).ready(function() {

/* Event listenner sur le bouton btnSide */
  $('body').on('click', '.btnSide', function() {

      $(".sideM").toggleClass('closed open'); // Switch entre les deux class
      $(".btnSide").css({"opacity":"1"});


  })

/* si on on clic en dehors du menu lateral on ferme celui ci */
  $('body').on('click','.content_main', function() {

    $(".sideM").removeClass('open'); // force remove class
    $(".sideM").addClass('closed'); // force addClass
    $(".btnSide").css({"opacity":""});
  })








// END
})
