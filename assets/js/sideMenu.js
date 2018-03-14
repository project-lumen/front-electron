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

      if ($(".userConfig").hasClass('configOpen')) {

        $(".userConfig").toggleClass('configClose configOpen'); // Switch entre les deux class
      }
  })

/* si on on clic en dehors du menu lateral on ferme celui ci */
  $('body').on('click','.content_main', function() {

    $(".sideM").removeClass('open'); // force remove class
    $(".sideM").addClass('closed'); // force addClass
    $(".btnSide").css({"opacity":""});

  })



  // ADD LIST

  $('body').on('click', '.Addnew > .header', function() {

      $(".Addnew").toggleClass('formOpen formClosed'); // Switch entre les deux class

  })


// SIDEBAR RIGHT


$('body').on('click','.iconDots', function() {

  $(".contentSideRight").toggleClass('open_SBR closed_SBR'); // Switch entre les deux class


})


$('body').on('click','.content_List', function() {


  if ($(".contentSideRight").hasClass('open_SBR')) {

    $(".contentSideRight").toggleClass('open_SBR closed_SBR'); // Switch entre les deux class
  }


})


$('body').on('click','.btnHome', function() {

  if ($("[data-win='main']").hasClass('hidden')) {

    $("[data-win='main']").toggleClass('fc hidden');
    $("[data-win='selectList']").toggleClass('fc hidden');
    $(".sideM").toggleClass('open closed');

  }


})












// END
})
