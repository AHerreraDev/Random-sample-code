/**
 * Created by alejandrosanchez on 8/17/17.
 */
$(document).ready(function(){

    //Every time the button is clicked run the function
    $('button').click(function(e){
        var email = $('#email').val();
        var password = $('#password').val();
        var realEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Check email input *********************
        if (!realEmail.test(email)) {
            $('.error2').show();
            $('input[type=text]').css('background', 'yellow');
        } else {
            $('.error2').hide();
            $('input[type=text]').css('background', 'none');
        }
        // Check password input *********************
        if (password.length < 6)  {
            $('.error').show();
            $('input[type=password]').css('background', 'yellow');
        } else {
            $('.error').remove();
            $('input[type=password]').css('background', 'none');
        }
        //Dont send the form. Wont reload the webpage.
        e.preventDefault();

    }); // Button click function
}); // document ready
