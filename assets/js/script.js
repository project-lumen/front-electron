var currentTokenList

$(document).ready(function() {

verif();
redirectLogin();
redirectRegister();
autoCompleteRemember();
infoCurrentUser()
showUserList();



    /********************
    *   SECTION LOGIN   *
    *********************/

    // event listenner sur le bouton envoyer
    $('body').on('click', '[data-login="submit"]', function() {
      // Récupere la valeur saisie et la sauvegarde dans des variables
      var user = $('[data-login="pseudo"]').val();
      var pass = $('[data-login="password"]').val();

      /* On verifie que le checkbox remember est coché
       * check : sauvegarde des saisies utilisateur
       * uncheck : Aucune sauvegarde et supprime les anciennes saisies */
      if ($('#isRememberCheck').is(':checked')){

        localStorage.setItem('id', user);
        localStorage.setItem('pwd', pass);
      }else {
        localStorage.removeItem('id');
        localStorage.removeItem('pwd');
      }


      var url_login = 'http://192.168.33.10/users/login'
      $.ajax({
            // on lui donne l'url concaténé
            url: url_login,
            type: 'POST',
            data:'pseudo='+user+'&password='+pass,
            dataType : 'html'
            }).done(function(data) {


            var verification = JSON.parse(data)
            // si aucune correspondance de nom d'utilisateur dans la BDD
            ;
            if (!verification.success) {
              var render_error = '<span id="msgError">'+verification.message+'</span>';
              $(".gestionErreur").removeClass('hidden');
              $('.gestionErreur').html(render_error);
              window.setTimeout(function() {
                  $("#msgError").fadeTo(500, 0).slideUp(500, function(){
                      $(this).remove();
                      $(".gestionErreur").addClass('hidden');
                  });
              }, 4000);

            }else{
            var token_user = JSON.parse(data);
            localStorage.setItem('api_token', token_user.api_token);

            verif();
            infoCurrentUser()
            showUserList();

            }});
        });



        /********************
        * SECTION REGISTER  *
        *********************/


        // event listenner sur le bouton envoyer
        $('body').on('click', '[data-register="submit"]', function() {
          // Récupere la valeur saisie et la sauvegarde dans des variables
          var user = $('[data-register="pseudo"]').val();
          var pass = $('[data-register="password"]').val();
          var mail = $('[data-register="email"]').val();

          var url_register = 'http://192.168.33.10/users/register'
          $.ajax({
                // on lui donne l'url concaténé
                url: url_register,
                type: 'POST',
                data:'pseudo='+user+'&password='+pass+'&email='+mail,
                dataType : 'html'
              }).done(function(data) {
                var register = JSON.parse(data);

                if (register.success) {
                  $("[data-win='register']").toggleClass('hidden fc');
                  $("[data-win='login']").toggleClass('fc hidden');
                }else{
                  var render_error = '<span id="msgError">'+register.message+'</span>';
                  $(".gestionErreur").removeClass('hidden');
                  $('.gestionErreur').html(render_error);
                  window.setTimeout(function() {
                      $("#msgError").fadeTo(500, 0).slideUp(500, function(){
                          $(this).remove();
                          $(".gestionErreur").addClass('hidden');
                      });
                  }, 4000);
                }
              })
            })


            /********************
            *     ADD LIST      *
            *********************/

            // event listenner sur le bouton envoyer
            $('body').on('click', '[data-newlist="submit"]', function() {
              // Récupere la valeur saisie et la sauvegarde dans des variables
              var newlist = $('[data-newlist="name"]').val();
              var current_tokken = localStorage.getItem('api_token');
              var url_addList = 'http://192.168.33.10/myList/addList'
              $.ajax({
                    // on lui donne l'url concaténé
                    url: url_addList,
                    type: 'POST',
                    data:'nameList='+newlist+'&api_token='+current_tokken,
                    dataType : 'html'
                  }).done(function(data) {

                    var traitement = JSON.parse(data)

                    if (traitement.success) {
                      ;
                      showUserList();

                    }else{
                      ;
                      console.log('erreur')
                    }


                  })
                  })


          /********************
          *     LOG OUT       *
          *********************/

    // event listenner sur le bouton logout
    $('body').on('click', '.btn_logOut', function() {

      var current_tokken = localStorage.getItem('api_token');
      var url_logout = 'http://192.168.33.10/users/logout'
      $.ajax({
            // on lui donne l'url concaténé
            url: url_logout,
            type: 'POST',
            data:'api_token='+current_tokken,
            dataType : 'html'
          }).done(function(data) {

            var traitement = JSON.parse(data)

            if (traitement.success) {
              localStorage.removeItem('id');

              var data = "deco"
              verif(data);
            }else{
              console.log('erreur')
            }


          })
          })



          /********************
          * RETURN DATA LIST  *
          *********************/

          $('body').on('click', '.contentList ul li', function() {
            var current_tokken = localStorage.getItem('api_token');
            var tokenList = $(this).data('tokenlist');
            currentTokenList = $(this).data('tokenlist');


            var url_returnlist = 'http://192.168.33.10/myList/printList'
            $.ajax({
                  // on lui donne l'url concaténé
                  url: url_returnlist,
                  type: 'POST',
                  data:'api_token='+current_tokken+'&tokenList='+tokenList,
                  dataType : 'html'
                }).done(function(data) {

                  var traitement = JSON.parse(data)
                  var name = traitement.nameList
                  var task = "<ul>"
                  for (var i = 0; i < traitement.task.length; i++) {
                    if (!traitement.task[i].check) {
                      task += '<li>'+ traitement.task[i].titleTask+'<span><input data-idtask="'+traitement.task[i].idTask+'" type="checkbox" name="check"></span></li>'
                    }
                  }
                  task += "</ul>"

                  updateTaskArchive()
                  // PUSH
                  $('.headerList > h6').html(name);
                  $('.content_List > .task').html(task);

                  $("[data-win='main']").toggleClass('fc hidden');
                  $("[data-win='selectList']").toggleClass('fc hidden');
                  $(".sideM").toggleClass('open closed');
                  $("[data-win='sideRight']").toggleClass('fc hidden');
                })
                })

          /********************
          *     ADD TASK      *
          *********************/


          $('body').on('click', '[data-newtask="submit"]', function() {
            var current_tokken = localStorage.getItem('api_token');
            var nameTask = $('[data-newTask="name"]').val();
            var important = $('[data-newTask="important"]').prop('checked');
            var startD = $('[data-newTask="startdate"]').val();
            var endD = $('[data-newTask="endDate"]').val();



            var url_addtask = 'http://192.168.33.10/myList/addTask'
            $.ajax({// on lui donne l'url concaténé
            url: url_addtask,
            type: 'POST',
            data:'api_token='+current_tokken+'&tokenList='+currentTokenList+'&titleTask='+nameTask
            +'&flag='+important+'&dateStart='+startD+'&dateEnd='+endD,
            dataType : 'html'
            }).done(function(data) {

              var traitement = JSON.parse(data)

              if (traitement.success) {

                updateTask()
              }
            })
          })


            /********************
            * Check task on List
            * Sur la fenetre de la liste selectionné
            * Supprime une tache terminer
            *****************************************/

            $('body').on('click', '.content_List .task ul li span input[type="checkbox"], .contentArchive input[type="checkbox"]', function() {

              var current_tokken = localStorage.getItem('api_token');
              var id = this.dataset.idtask;
              var check = $(this).prop('checked');
              ;
              var url_checkTask = 'http://192.168.33.10/myList/checkTask'
              $.ajax({
                url: url_checkTask,
                type: 'POST',
                data:'api_token='+current_tokken+'&idTask='+id+'&check='+check+'&tokenList='+currentTokenList,
                dataType : 'html'
              }).done(function(data) {
                var traitement = JSON.parse(data)
                ;

              if (traitement.success) {
                ;

                updateTask()
                updateTaskArchive()
              }
            })
          })









          /********************
          * ADD COLABORATEUR
          * Sur le sidebar Right
          * Ajoute un utilisateur via son codeUser
          *****************************************/
          $('body').on('click', '[data-add="submit"]', function() {
            var current_tokken = localStorage.getItem('api_token');
            var codeUser = $('[data-add="code"]').val();
            var tokenList = currentTokenList


            var url_addUser = 'http://192.168.33.10/myList/addUser'
            $.ajax({
              url: url_addUser,
              type: 'POST',
              data:'api_token='+current_tokken+'&codeUser='+codeUser+'&tokenList='+tokenList,
              dataType : 'html'
            }).done(function(data) {
              var traitement = JSON.parse(data)

              if (traitement.success) {
                var renderER = '<p>' + traitement.message + '</p>'
                $('.msg_errors').html(renderER);

                window.setTimeout(function() {
                    $(".msg_errors").fadeTo(500, 0).slideUp(500, function(){
                        $(this).remove();

                    });
                }, 4000);

              }else{
                var renderER = '<p>' + traitement.message + '</p>'
                $('.msg_errors').html(renderER);

                window.setTimeout(function() {
                    $(".msg_errors p").fadeTo(500, 0).slideUp(500, function(){
                        $(this).remove();

                    });
                }, 4000);
              }

            })
        })










//END
})


// ************************ FUNCTION *****************************//

// Nous redirige vers la page register
function redirectRegister(){
  $('body').on('click', '#btnRegister', function() {
    $("[data-win='register']").toggleClass('fc hidden');
    $("[data-win='login']").toggleClass('hidden fc');
})}
// Nous redirige vers la page login
/* a tester : saisie du form save entre chaque redirection*/
function redirectLogin(){
  $('body').on('click', '#btnLogin', function() {
    $("[data-win='register']").toggleClass('hidden fc');
    $("[data-win='login']").toggleClass('fc hidden');
})}

/* verification de l'api token du localStorage avec celle de la bdd
si correspondance on affiche la fenetre main */
function verif(x){
  if (localStorage.getItem('api_token')) {
    var current_tokken = localStorage.getItem('api_token');
    var url_verif = 'http://192.168.33.10/user/'+ current_tokken;
    $.ajax({
          // on lui donne l'url concaténé
          url: url_verif,
          type: 'GET',
          data:'api_token='+current_tokken,
          dataType : 'html'
        }).done(function(data) {
          var resultRqt = JSON.parse(data)

          if (resultRqt.success) {
            $("[data-win='login']").toggleClass('fc hidden');
            $("[data-win='main']").toggleClass('hidden fc');
            $("[data-win='menuSide']").toggleClass('hidden fc');
          }else if (x === "deco") {
            // *** REMPLACER PAR LOCATION.RELOAD ***
            // == SI TOUT MARCHE BIEN A SUPPR
            // $("[data-win='login']").toggleClass('fc hidden');
            // $("[data-win='main']").toggleClass('hidden fc');
            // // clearLogOut()
            location.reload();
          }else{
            console.log("erreur");
          }


        })
    };
}
/* Fonction qui permet de verifier si les elements id et pwd sont
 * enregisté dans le local storage.
 * - si condition validé -> autocompletion du formulaire avec les données du
 * localStorage.
 * - On rajoute l'attribut checked a la checkbox
 */
function autoCompleteRemember(){
  if (localStorage.getItem('id') && localStorage.getItem('pwd') ) {
    $('[data-login="pseudo"]').val(localStorage.getItem('id'));
    $('[data-login="password"]').val(localStorage.getItem('pwd'));
    $('#isRememberCheck').attr('checked', true)

  }
}



/* Fonction qui permet de recuperer les listes de l'utilisateur
*
*/
function showUserList(){
if (localStorage.getItem('api_token')) {
  var current_tokken = localStorage.getItem('api_token');
  var url_ownList = 'http://192.168.33.10/ownList';
  
  $.ajax({
        // on lui donne l'url concaténé
        url: url_ownList,
        type: 'GET',
        data:'api_token='+current_tokken,
        dataType : 'html'
      }).done(function(data) {

        var traitement = JSON.parse(data)
        if(traitement.success === "valide"){

          var renderOwnList = "<ul>"
          $.each(traitement, function(i,item){

            if(item.valueOf(this) === "valide"){
              console.log(); // FAIRE PROPRE
            }else {
              renderOwnList += '<li data-tokenList="'+item.tokenList+'">'+ item.name + '</li>'
            }

          });

          renderOwnList += "</ul>"
          $('.contentList').html(renderOwnList);
        }else{
          console.log('hello') // FAIRE PROPRE
        }
      })
    }
  }



/* Fonction qui permet de recuperer le nom et le code user de l'utilisateur
* actif.
* On affiche ensuite dans le menu side bar le nom et le code
*/


function infoCurrentUser(){
  if (localStorage.getItem('api_token')) {
    var current_tokken = localStorage.getItem('api_token');
    var url_infoUser= 'http://192.168.33.10/user/info';
    $.ajax({
          // on lui donne l'url concaténé
          url: url_infoUser,
          type: 'POST',
          data:'api_token='+current_tokken,
          dataType : 'html'
        }).done(function(data) {

          var traitement = JSON.parse(data);

          var renderName = '<h6>'+ traitement.name + '</h6>'
          var renderCode = '<span>' + traitement.code + '</span>'

          $('.pictureUsers').html(renderName);
          $('.codeUser').html(renderCode);


        })
    }
}

function updateTask(){
  var current_tokken = localStorage.getItem('api_token');
  var tokenList = currentTokenList


  var url_returnlist = 'http://192.168.33.10/myList/printList'
  $.ajax({
        // on lui donne l'url concaténé
        url: url_returnlist,
        type: 'POST',
        data:'api_token='+current_tokken+'&tokenList='+tokenList,
        dataType : 'html'
      }).done(function(data) {


        var traitement = JSON.parse(data)

        ;
        var name = "<h6>" + traitement.nameList + "</h6>"
        var task = "<ul>"
        for (var i = 0; i < traitement.task.length; i++) {
          if (!traitement.task[i].check) {
            task += '<li>'+ traitement.task[i].titleTask+'<span><input data-idtask="'+traitement.task[i].idTask+'" type="checkbox" name="check"></span></li>'
          }
        }
        task += "</ul>"

        // PUSH
        $('.headerList > h6').html(name);
        $('.content_List > .task').html(task);
      })

}

function updateTaskArchive(){
  var current_tokken = localStorage.getItem('api_token');
  var tokenList = currentTokenList


  var url_returnlist = 'http://192.168.33.10/myList/printList'
  $.ajax({
        // on lui donne l'url concaténé
        url: url_returnlist,
        type: 'POST',
        data:'api_token='+current_tokken+'&tokenList='+tokenList,
        dataType : 'html'
      }).done(function(data) {


        var traitement = JSON.parse(data)

        ;

        var task = "<ul>"
        for (var i = 0; i < traitement.task.length; i++) {
          if (traitement.task[i].check) {

            task += '<li>'+ traitement.task[i].titleTask+'<span><input data-idtask="'+traitement.task[i].idTask+'" type="checkbox" name="check" checked></span></li>'
          }
        }
        task += "</ul>"

        // PUSH
        $('.contentArchive').html(task);
      })

}


  // REMPLACER PAR LOCATION.RELOAD
  // a supprimer si on s'en sert plus
  // ==============================
  // Referme toutes les slides et permet a la reconnection de se retrouver
  // sur la page d'accueil
  // function clearLogOut(){
  //   if ($(".userConfig").hasClass('configOpen')) {
  //     $(".userConfig").toggleClass('configClose configOpen');
  //   }
  //   if ($("[data-win='menuSide']").hasClass('fc')) {
  //     $("[data-win='menuSide']").toggleClass('hidden fc');
  //   }
  //   if ($(".sideM").hasClass('open')) {
  //     $(".sideM").toggleClass('open closed');
  //   }
  // }
