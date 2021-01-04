/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {


    // form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        } else {
            $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        }
        $.ajax({
            url: "http://localhost:8001/insurance/premium/calculation", 
            data: JSON.stringify({"name":"Tamil","age":34,"gender":"Male","healthConditions":{"hypertension":"yes","bloodpressure":"no","bloodsugar":"no","overweight":"no"},"habits":{"smoking":"no","exercise":"no","alcohol":"no","drugs":"no"}}),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
          }).done(function(msg) {
             $("#pamt").html(msg.premium)
          });

          $.ajax({
            url: "http://localhost:8002/payment/premium/5ff3343d613855691c1b1230", 
            data: {"premium":34},
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST"
          }).done(function(msg) {
             $("#pamt").html(msg.status)
          });
    });


    // Form submit
    $('form.signup-form').submit(function (event) {
        event.preventDefault();

        if (usernameError == true || emailError == true || passwordError == true || passConfirm == true) {
            $('.name, .email, .pass, .passConfirm').blur();
        } else {
            $('.signup, .login').addClass('switched');

            setTimeout(function () { $('.signup, .login').hide(); }, 700);
            setTimeout(function () { $('.brand').addClass('active'); }, 300);
            setTimeout(function () { $('.heading').addClass('active'); }, 600);
            setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
            setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
            setTimeout(function () { $('.form').hide(); }, 700);
        }
    });

  


});