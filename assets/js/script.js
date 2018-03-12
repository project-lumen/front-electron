$(document).ready(function() {

verif();
redirectLogin();
redirectRegister();
autoCompleteRemember();
showUserList();
infoCurrentUser()



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
        debugger
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
            if (verification.error) {
              var render_error = '<span id="msgError">'+verification.error+'</span>';
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
            *   OWN USER LIST   *
            *********************/








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
function verif(){
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
          debugger;
          if (resultRqt.success) {
            debugger;
            $("[data-win='login']").toggleClass('fc hidden');
            $("[data-win='main']").toggleClass('hidden fc');
          }else{
            debugger
            return resultRqt.success
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
    debugger
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
        var renderOwnList = "<ul>"


        $.each(traitement, function(i,item){
          renderOwnList += "<li>" + item.name + "</li>"
        });

        renderOwnList += "</ul>"

        $('.userList').html(renderOwnList);


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
