/**********************************************************
* Auth : [Jeremie Sophikitis, Adrien Fevre, Victor Anton] *
* Project : The big bang Task                             *
* Description : Permet de faire apparaitre ou disparaitre *
* un menu lateral.                                        *
**********************************************************/
$(document).ready(function() {

/* Event listenner sur le bouton btnSide */
  $('body').on('click', '.setup', function() {

      $(".userConfig").toggleClass('configClose configOpen'); // Switch entre les deux class

  })

  $('body').on('click', '.iconBack', function() {

      $(".userConfig").toggleClass('configClose configOpen'); // Switch entre les deux class

  })



  // ADD TASK //

  $('body').on('click', '.header_addTaske', function() {

      $(".footerList").toggleClass('openAddTask closeAddTask'); // Switch entre les deux class

  })










// END
})
