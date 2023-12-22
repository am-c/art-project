var num_correct = 0;
var drag_num;
$(document).ready(function() {

  // Reset everything
  $('.am_right').hide();
  num_correct = 0;
  $('.logo-wrap').html('');
  $('.target_pile').html('');

  // Drag Array  
  var amlogo = [
    ['logo.png" class="amlogo-0"', 0],
    ['logo-pink.png" class="amlogo-1"', 1],
   ['logo-blue.png" class="amlogo-2"', 2]
  ];
  // Randomize Drag Array
  amlogo.sort(function() {
    return Math.random() - 0.5;
  });

  // Create amlogo's << lame
  for (var i = 0; i < amlogo.length; i++) {

    $('<div class="drag_before"> <img src="' + amlogo[i][0] + '" draggable="false" ></div>').data('number', amlogo[i][1]).attr('id', 'drag_' + amlogo[i][1]).appendTo('.logo-wrap').draggable({
      stack: '.logo-wrap div',
      cursor: 'pointer',
      revert: true
    });

  }

  $('drag_after').draggable({
    revert: true
  });

  // Target Array

  var hotSpotz = [
    [],
  /*  [],
    []*/
  ];
  $.each(hotSpotz, function(addNumbr) {

    $('<div class="hs' + addNumbr + '"></div>').appendTo('.hotspot-wrap').droppable({
      accept: '.logo-wrap div',
      hoverClass: 'hovered',
      drop: land
    });

  });

  function land(event, ui) {

    var $this = $(this);
console.log($this.index());
    var hotSpotDrop = $this.index();
    drag_num = ui.draggable.data('number');

    // Check if correct 
   // if (hotSpotDrop !== drag_num) {

      ui.draggable.removeClass("droppedRevert");
      ui.draggable.draggable('option', 'revert', false);
      ui.draggable.addClass("dropped");
      // Run the effect

      $this.append(ui.draggable);
      num_correct++;
   // } 
/*   else {
      ui.draggable.removeClass("dropped");
      $(".am_wrong").show();

      setTimeout(function() {
        $(".am_wrong").hide();
      }, 1000);

    }*/


    var disImg = $this.children().children();

    disImg.effect('bounce', {
      times: 10
    }, 1500);
    // Add and remove still associated with item clicked

  }
  // Check if activity is complete
  var count = $('.dropped').length;
  console.log(count);
  if (count === 3) {
    console.log(num_correct);
    $('.am_right').show();
    $('.hs1 img').not('mario.png').remove();
    $('.hs1 img').append('<img src="mario-last.png">');
  }

});
