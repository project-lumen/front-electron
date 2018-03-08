$(document).ready(function() {


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





    $("#iden").addClass('hidden');
    $("#admin").removeClass('hidden');
  }


    /********************
    *   SECTION LOGIN   *
    *********************/

    // event listenner sur le bouton envoyer
    $('body').on('click', '[data-login="submit"]', function() {
      // Récupere la valeur saisie et la sauvegarde dans des variables
      var user = $('[data-login="pseudo"]').val();
      var pass = $('[data-login="password"]').val();

      var url_login = 'http://192.168.33.10/users/login'
      $.ajax({
            // on lui donne l'url concaténé
            url: url_login,
            type: 'POST',

            // A MODIFIER USERNAME > PSEUDO
            data:'username='+user+'&password='+pass,
            dataType : 'html'
            }).done(function(data) {

            debugger;
            var verification = JSON.parse(data)
            // si aucune correspondance de nom d'utilisateur dans la BDD
            if (verification.error) {
              var render_error = '<span id="msgError">'+verification.error+'</span>';
              $(".gestionErreur").removeClass('hidden');
              $('.gestionErreur').html(render_error);
              debugger;
              window.setTimeout(function() {
                  $("#msgError").fadeTo(500, 0).slideUp(500, function(){
                      $(this).remove();
                      $(".gestionErreur").addClass('hidden');
                  });
              }, 4000);

            }else{

            $("#iden").addClass('hidden');
            $("#admin").removeClass('hidden');
            $("#error").addClass('hidden');

            var token_user = JSON.parse(data)
            ;
            localStorage.setItem('api_token', token_user.api_token);
            }});
        });

        // Nous redirige vers la page register
        $('body').on('click', '#btnRegister', function() {
          $("[data-win='register']").toggleClass('fc hidden');
          $("[data-win='login']").toggleClass('hidden fc');
        })
        // Nous redirige vers la page login
        /* a tester : saisie du form save entre chaque redirection*/
        $('body').on('click', '#btnLogin', function() {
          $("[data-win='register']").toggleClass('hidden fc');
          $("[data-win='login']").toggleClass('fc hidden');
        })











})
