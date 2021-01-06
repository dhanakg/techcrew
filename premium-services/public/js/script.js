/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {


    // form switch
    $('#back').click(function (e) {
        e.preventDefault();
        $("#showForm").removeClass("switched");
        $("#showPremium").addClass("switched");
    });

    $('#payment').click(function (e) {
        e.preventDefault();
        payment();
    });

    function payment(){
        
        $.ajax({
            url: $("#paymentLink").val(), 
            data: {"premium":0},
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST"
          }).done(function(msg) {
              $("#pref").html(msg.referrence)
            $('.signup, .login').addClass('switched');
             setTimeout(function () { $('.signup, .login').hide(); }, 700);
             setTimeout(function () { $('.brand').addClass('active'); }, 300);
             setTimeout(function () { $('.heading').addClass('active'); }, 600);
             setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
             setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
             setTimeout(function () { $('.form').hide(); }, 700);
          });
    }

    // Form submit
    $('form.signup-form').submit(function (event) {
        event.preventDefault();
        var request = {
            "name": $("#name").val(),
            "age": Number($("#age").val()),
            "gender": $("#gender").val(),
            "healthConditions": {
            "hypertension": $("#ht").is(":checked")?"yes":"no",
            "bloodpressure": $("#bp").is(":checked")?"yes":"no",
            "bloodsugar": $("#bs").is(":checked")?"yes":"no",
            "overweight": $("#ow").is(":checked")?"yes":"no"
            },
            "habits":{
                "smoking": $("#sm").is(":checked")?"yes":"no",
                "exercise":$("#ex").is(":checked")?"yes":"no",
                "alcohol": $("#al").is(":checked")?"yes":"no",
                "drugs": $("#dr").is(":checked")?"yes":"no"
            }
        };
        $.ajax({
            url: "http://localhost:8001/insurance/premium/calculation", 
            data: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            success:function(msg) {
                
                $("#pamt").html(msg.premium);
                $("#paymentLink").val(msg.payment);
                $("#showPremium").removeClass("switched");
                $("#showForm").addClass("switched");
             }
          });
            
        
    });
});