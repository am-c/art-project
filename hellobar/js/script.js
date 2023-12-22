/* //needs web server to run
$(function() {
  $(".hellobar").load("hellobar.html"); 

  // add content and admin settings
  $(".content").load("content.html");
}); */

// append hellobar in DOM
/* $(".hellobar").append('<p>Hellobar example</p><button class="btn btn-dark btn-sm">and admin page</button><div class="x-btn"><a href="javascript:void(0);">&#10006;</a></div>');
 */

$(function() {
 //dynamically change h1 on page 2
 if (window.location.href.indexOf("2") > -1) {
  console.log("found it");
  $("h1").html("dynamically added h1 - Page 2");
}
// hellobar close
$('.x-btn a').click(function() {
  $(".hellobar").fadeOut();
  $('.show').show();
})

 $('.show').click(function() {

  $(".hellobar").css('display', 'table');
  $('.show').hide();
})
 
// admin functions

// top//bottom
$('.checkbox-arrows').click(function() {
  var switchParent = $(this).parent('.toggle-switch');
  if ($(switchParent).find('input.checkbox-arrows').is(':checked')) {
    $(switchParent).addClass('active');
    $('.hellobar').addClass('btm0');

  } else {
    $(switchParent).removeClass('active');
    $('.hellobar').removeClass('btm0');
  }
})

// change font
let fonts = ['osw', 'arial', 'verdana', 'tnr'];

// for repeated statements
function repeats() {
  $('button').removeClass('active');
  $('.hellobar').removeClass(fonts);
}

// oswald
$('button.osw').click(function() {
  if ($(this).data('clicked', true)) {
    repeats();
    $(this).addClass('active');
    $('.hellobar').addClass('osw');
  } else {
    $(this).removeClass('active');
    $('.hellobar').removeClass('osw');
  }
});
// arial
$('button.arial').click(function() {
  if ($(this).data('clicked', true)) {
    repeats();
    $(this).addClass('active');
    $('.hellobar').addClass('arial');
  } else {
    $(this).removeClass('active');
    $('.hellobar').removeClass('arial');
  }
});

// verdana
$('button.verdana').click(function() {
  if ($(this).data('clicked', true)) {
    repeats();
    $(this).addClass('active');
    $('.hellobar').addClass('verdana');
  } else {
    $(this).removeClass('active');
    $('.hellobar').removeClass('verdana');
  }
});

// times new roman
$('button.tnr').click(function() {
  if ($(this).data('clicked', true)) {
    repeats();
    $(this).addClass('active');
    $('.hellobar').addClass('tnr');
  } else {
    $(this).removeClass('active');
    $('.hellobar').removeClass('tnr');
  }
});

// light/dark theme toggle

$('.dark').click(function() {
  $('.hellobar').addClass('dt-bar');
  $('.hellobar button').addClass('dt-btn');
  $('.x-btn').addClass('dt-x');
});

$('.light').click(function() {
  $('.hellobar').removeClass('dt-bar');
  $('.hellobar button').removeClass('dt-btn');
  $('.x-btn').removeClass('dt-x');
});
}); 