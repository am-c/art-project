var num_correct = 0;
var drag_num;
$(init);

function init() {
  num_correct = 0;
  $('.fren-group').html('');
  $('.hotspot-wrap').html('');
  $('.bh-btn').hide();
  // Reset everything

  $('.resetbtn').click(function() {
    $('.am_img').removeClass('overlay');
    $('.am_img').removeClass('homie-overlay');
    $('.hs0').removeClass('homie-overlay');
    $( ".center").remove();

  });
  $('.resetbtn').click(function() {

    $("hs1 div").removeClass('center');
    
    });
  // Drag Array  
  var homie = [
    ['planet-2.png" class="homie-1', 1]

  ];
  // Randomize Drag Array
  homie.sort(function() {
    return Math.random() - 0.5;
  });

  // Create homie's << lame
  for (var i = 0; i < homie.length; i++) {

    $('<div class="b4-pickup"> <img src="' + homie[i][0] + '" draggable="false" ></div>').data('number', homie[i][1]).appendTo('.fren-group').draggable({
      stack: '.fren-group div',
      cursor: 'pointer',
      revert: true
    });

  }

  $('.b4-pickup').draggable({
    revert: true
  });

  // Target Array

  var hotSpotz = [
    [],
    [],
    []
  ];
  
  $.each(hotSpotz, function(addNumbr) {

    $('<div class="hs' + addNumbr + '"></div>').appendTo('.hotspot-wrap').droppable({
      accept: '.fren-group div',
      hoverClass: 'hovered',
      drop: land
    });

  });

  function land(event, ui) {
    var $this = $(this);
    var hotSpotDrop = $this.index();
    drag_num = ui.draggable.data('number');

    // Check if correct 
    if (hotSpotDrop === drag_num) {
      ui.draggable.removeClass("droppedRevert");
      ui.draggable.draggable('option', 'revert', false);
      ui.draggable.addClass("dropped");

       // Run the effect
       $this.append(ui.draggable);
       num_correct++;
    }
    else {
      ui.draggable.removeClass("dropped");
    }

    $('.resetbtn').click(function() {
      ui.draggable.removeClass("center");
      console.log('ran');
    });
    var disImg = $this.children().children();

    disImg.effect('bounce', {
      times: 10
    }, 1500);

    // Add and remove still associated with item clicked

    $('.bh-btn').show();

 }

  $(".center").remove();
  $('.bh-btn').one( "click", function() {
    $('.b4-pickup img').remove();

    $('<div class="center"><div class="globe"><div class="side side-1"></div><div class="side side-2"></div><div class="side side-3"></div><div class="side side-4"></div><div class="side side-5"></div><div class="side side-6"></div></div></div>').appendTo('.hs1 div');

	if ($(window).width() <= 600){	
   $('.side').animate({'bottom': '40vh', width: 0, height: 0}, 1200);
    
  }	
 else if  ($(window).width() <= 800) {
  $('.side').animate({'bottom': '50vh', width: 0, height: 0}, 1200);

}
else if  ($(window).width() >= 800) {
    $('.side').animate({'bottom': '200%', width: 0, height: 0}, 1200);
  }

    $('audio.golf-hit')[0].play();
    //.slideUp({duration: 2000});
   // $('<div class="bye-bye"><i class="fa fa-circle"></i></div>').appendTo('.fren-group');
  });
}
$('.resetbtn').click(function() {

$("hs1 div").removeClass('center');

});