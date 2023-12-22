var drag_num;
$(init);

function init() {
  $('.drag-wrap').html('');
  $('.dropp').html('');
  $('.am-cube').hide();

  // Drag Array  
  var draggy = [
    ['logos/logo-9.png" class="drag-0', 0]
  ];

  // Create Logo drag
  for (var i = 0; i < draggy.length; i++) {

    $('<div class="b4-pickup"> <img src="' + draggy[i][0] + '" draggable="false" ></div>').data('number', draggy[i][1]).appendTo('.drag-wrap').draggable({
      stack: '.drag-wrap div',
      cursor: 'pointer',
      revert: true,
      containment: "body"
    });
  }

  $('.b4-pickup').draggable({
    revert: true
  });

  var hotspot = [
    []
  ];

  $.each(hotspot, function(addNumbr) {
    $('<div class="hs0"></div>').appendTo('.dropp').droppable({
      accept: '.drag-wrap div',
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
      $('.am-cube').show();
      ui.draggable.removeClass("droppedRevert");
      ui.draggable.draggable('option', 'revert', false);
      ui.draggable.addClass("dropped");
      $('.dropped img').remove();
      $('.hs0').fadeOut(50, function() {
        $(this).remove();
      });
      
      // Run the effect
      $this.append(ui.draggable);
      num_correct++;
    } else {
      ui.draggable.removeClass("dropped");
    }

    $('.resetbtn').click(function() {
      ui.draggable.removeClass("dropped");
    });

    var disImg = $this.children().children();

    disImg.effect('bounce', {
      times: 10
    }, 1500);

  }
}
