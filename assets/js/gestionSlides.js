/**********************************************************
* Auth : [Jeremie Sophikitis, Adrien Fevre, Victor Anton] *
* Project : The big bang Task                             *
* Description : Gestion des slides et des boutons         *
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

// Nous retourne sur l'accueil quand on clic sur le logo home
  $('body').on('click','.btnHome', function() {
    if ($("[data-win='main']").hasClass('hidden')) {

      $("[data-win='main']").toggleClass('fc hidden');
      $("[data-win='selectList']").toggleClass('fc hidden');
      $(".sideM").toggleClass('open closed');

    }
  })




  // Slide sur le bouton Add list
  $('body').on('click', '.Addnew > .header', function() {
      $(".Addnew").toggleClass('formOpen formClosed');
  })


// SIDEBAR RIGHT

// Ouvre le menu de la liste quand on clic sur les trois petits points
$('body').on('click','.iconDots', function() {
  $(".contentSideRight").toggleClass('open_SBR closed_SBR');
})

// Ferme menu de la liste si on clic en dehors de sa div
$('body').on('click','.content_List', function() {
  if ($(".contentSideRight").hasClass('open_SBR')) {
    $(".contentSideRight").toggleClass('open_SBR closed_SBR'); // Switch entre les deux class
  }
})

// Ouvre la div des options utilisateur dans le menu lateral gauche
  $('body').on('click', '.setup', function() {
      $(".userConfig").toggleClass('configClose configOpen'); // Switch entre les deux class
  })

// referme la div des options utilisateurquand on clic sur le bouton iconback
  $('body').on('click', '.iconBack', function() {
      $(".userConfig").toggleClass('configClose configOpen'); // Switch entre les deux class
  })

// Nous ouvre et ferme la div qui permet d'ajouter une une tache

  $('body').on('click', '.header_addTaske', function() {
      $(".footerList").toggleClass('openAddTask closeAddTask'); // Switch entre les deux class
  })

  // OUVRE Menu UPDATE TASK
  $('body').on('click', '.content_List .task li > p', function() {


    if ($('[data-win="sideRightTask"]').hasClass('hidden')) {
      $('[data-win="sideRightTask"]').toggleClass('fc hidden'); // Switch entre les deux class
    }
      $(".contentSideRightTask").toggleClass('closed_SBRT open_SBRT'); // Switch entre les deux class

      var idtask = $(this).find('span > input').attr('data-idtask');
      var nameTask = $(this).find('li').prevObject[0].textContent;


      var renderUpTask = '<h6 data-idTask="'+ idtask+'">'+nameTask+'</h6>'


    $('.UpdateTask .title ').html(renderUpTask);

  })
    // Ferme menu de modification de tache si on clic en dehors de sa div
    $('body').on('click','.UpdateTask .title', function() {

      if ($(".contentSideRightTask").hasClass('open_SBRT')) {
        $(".contentSideRightTask").toggleClass('open_SBRT closed_SBRT'); // Switch entre les deux class
      }
    })










// END
})
