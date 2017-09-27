
// jQuery for gallery section
$(function(){
    $("#work").magnificPopup({
        delegate: 'a', // child items selector
            type: 'image', // other items
        gallery: {
            enabled: true
        }
    });
});


// Top nav background to appear when scrolling down
$(function(){
   $(window).scroll(function(){

       if($(window).scrollTop() < 50){
           // hide nav
           $('nav').removeClass('top-nav');
           $('#back-to-top').fadeOut();
            //show nav
       }else {
           $('nav').addClass('top-nav');
           $('#back-to-top').fadeIn();
       }
   });
});

// Close mobile menu on click
$(function(){
    $(".navbar-collapse ul li a").on("click touch", function(){
        $(".navbar-toggle").click();
    });
});

$('register').on('submit', function(e){
    e.preventDefault();
    console.log("submited");
    var details = $('register').serialize();
    $.post('app.js', details, function(data){
        $('register').html(data);
    });
});
