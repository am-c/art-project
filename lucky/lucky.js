var all_dropped = 0;
var tr;

// text-top
//var text-top = "Luck";

// Charms
var drags = [
  ['<img class="charm-1" src="images/rainbow-1.png" alt="rainbow-1">', 1],
  ['<img class="charm-2" src="images/green-clover.png" alt="green-clover">', 2],
  ['<img class="charm-3" src="images/rainbow-2.png" alt="rainbow-2">', 3],
  ['<img class="charm-4" src="images/orange-charm.png" alt="orange-charm">', 4],
  ['<img class="charm-5" src="images/half-clover.png" alt="half-clover">', 5]
];

$(init);

function init() {
  // Reset everything
  $('.charm_stack').show();
  $('.complete').hide();
     $('.am_logo').hide();
   $('.fa').show();
  all_dropped = 0;
  $('.charm_stack').html('');
  $('.target_stack').html('');

  // Add text-top
  // $('.text-top').html(text-top_txt);


  // Create Drags 
  for (var i = 0; i < drags.length; i++) {
    $('<div class="charmB4">' + drags[i][0] + '</div>').data('number', drags[i][1]).attr('id', 'urAdrag_' + drags[i][1]).appendTo('.charm_stack').draggable({
      stack: '.charm_stack div',
      cursor: 'pointer',
      revert: true,
      start: grabThat,
      stop: oops

    });

  }

  function grabThat() {
	  var draggableChildren = $('.ui-draggable-dragging').children();
	  
    if (draggableChildren.hasClass('charm-1')) {
      $("#urAdrag_1").html('<img class="charm-1" src="images/dropped-1.png">');
    }

    if (draggableChildren.hasClass('charm-2')) {
      $("#urAdrag_2").html('<img class="charm-2" src="images/dropped-2.png">');
    }

    if (draggableChildren.hasClass('charm-3')) {
      $("#urAdrag_3").html('<img class="charm-3" src="images/dropped-3.png">');
    }

    if (draggableChildren.hasClass('charm-4')) {
      $("#urAdrag_4").html('<img class="charm-4" src="images/dropped-4.png">');
    }

    if (draggableChildren.hasClass('charm-5')) {
      $("#urAdrag_5").html('<img class="charm-5" src="images/dropped-5.png">');
    }
  }

  function oops() {
    $("#urAdrag_1").html('<img class="charm-1" src="images/rainbow-1.png">');

    $("#urAdrag_2").html('<img class="charm-2" src="images/green-clover.png">');

    $("#urAdrag_3").html('<img class="charm-3" src="images/rainbow-2.png">');

    $("#urAdrag_4").html('<img class="charm-4" src="images/orange-charm.png">');

    $("#urAdrag_5").html('<img class="charm-5" src="images/half-clover.png">');
  }


  $('<img class="am-img" src="lucky-charms.jpg" draggable="false" alt="lucky">').appendTo('.target_stack');
  tr = $('<div class="am_target"><img src="target.png" draggable="false" alt="lucky"></div>').droppable({
    accept: '.charm_stack div',
    hoverClass: 'hovered',
    drop: dropThat
  }).appendTo('.target_stack');
}


function dropThat(event, ui) {
  var inc_num = ui.draggable.data('number');

  // All dropped?
  $('#urAdrag_' + inc_num).hide();
  $('<img class="dropped dropped-' + inc_num + '" src="images/dropped-' + inc_num + '.png">').appendTo('.am_target');


  ui.draggable.draggable('disable');
  ui.draggable.draggable('option', 'revert', false);
  $(this).append(ui.draggable);
  all_dropped++;


  // Check if all are dropped
  if (all_dropped === drags.length) {
    $('.complete').show();
setTimeout(function(){
   $('.am_logo').show();
   $('.fa').hide();
}, 15000);
  }
}