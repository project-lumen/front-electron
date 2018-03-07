$(document).ready(function() {

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
            debugger;
            localStorage.setItem('api_token', token_user.api_token);
              debugger;
            }});
        });

        $('body').on('click', '#btnRegister', function() {
          $("[data-win='register']").toggleClass('fc hidden');
          $("[data-win='login']").toggleClass('hidden fc');

        })












})
