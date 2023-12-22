var num_correct = 0;
$(init);

function init() {

  // Reset everything
  $('.sh_correct').hide();
  num_correct = 0;
  $('.drag_pile').html('');
  $('.target_pile').html('');

  // Drag Array  
  var drags = [
    ['drag-1.png" class="drags-1"', 3],
    ['drag-2.png" class="drags-2"', 2],
    ['drag-3.png" class="drags-3"', 1],
    ['drag-4.png" class="drags-4"', 3],
    ['drag-5.png" class="drags-5"', 2],
    ['drag-6.png" class="drags-6"', 1]
  ];
  // Randomize Drag Array
  /*  drags.sort(function() {
      return Math.random() - .5;
    });*/
  // Create Drags 
  for (var i = 0; i < drags.length; i++) {
    $('<div class="drag_before"> <img src="' + drags[i][0] + '" draggable="false" alt="puppets" ></div>').data('number', drags[i][1]).attr('id', 'drag_' + drags[i][1]).appendTo('.drag_pile').draggable({
      //containment: '#sh_container',
      stack: '.drag_pile div',
      cursor: 'pointer',
      revert: true
    });

  }
  $('drag_after').draggable({
    revert: true
  });

  // Target Array
  var targets = [
    ['target-1.png', '', 1],
    ['target-2.png', '', 2],
    ['target-3.png', '', 3]
  ];
  // Create Targets
  for (var i = 0; i < targets.length; i++) {
    var tgt_area = $('<div class="target-col" />').appendTo('.target_pile');
    $('<img class="sh_img img-responsive" src="' + targets[i][0] + '">').appendTo(tgt_area);

    var tgt = $('<div class="tgt"></div>').appendTo(tgt_area).droppable({
      accept: '.drag_pile div',
      hoverClass: 'hovered',
      drop: handleDrop
    });



    var d = tgt.data();
    d.number = targets[i][2];

  }

}

function handleDrop(event, ui) {
  var target_num = $(this).data('number');
  var drag_num = ui.draggable.data('number');
  // Check if correct 
  if (target_num === drag_num) {
    ui.draggable.removeClass("droppedRevert");
    ui.draggable.draggable('disable');
    ui.draggable.draggable('option', 'revert', false);
    ui.draggable.addClass("dropped");
    ui.draggable.addClass("sh_check");
    //$(this).addClass("droppedOn");
    $(this).append(ui.draggable);
    num_correct++;
  } else {
    ui.draggable.removeClass("dropped");
    $(".sh_incorrect").show();

    setTimeout(function() {
      $(".sh_incorrect").hide();
    }, 1000);


  }


  // Check if activity is complete
  if (num_correct === 6) {
    $('.sh_correct').show();
  }
}
