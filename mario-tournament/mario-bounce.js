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

  });

  // Drag Array  
  var homie = [
    ['yoshi.png" class="homie-0', 0],
    ['mario.png" class="homie-1', 1],
    ['luigi.png" class="homie-2', 2]
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
    } else {
      ui.draggable.removeClass("dropped");
    }
	
    $('.resetbtn').click(function() {
      console.log('ran');
      ui.draggable.removeClass("dropped");

    });


    var disImg = $this.children().children();

    disImg.effect('bounce', {
      times: 10
    }, 1500);
    // Add and remove still associated with item clicked

    if (num_correct === 3) {

      $('.hs1 img').not('mario.png').remove();
      /*  $('<img src="mario-last.png" class="mario-last">').appendTo('.hs1 div');*/
      // $('.hs1 div').remove();
      /* $('<img src="mario-last.png" class="mario-last">').appendTo('.hs1 div').animate( { boxShadow: '1px 2px 20px 1120px'}, {duration:1500});*/
      $('.am_img').addClass('overlay homie-overlay', 2000);
      $('.ui-droppable').not('.hs1').addClass('homie-overlay', 2000);

      $('.hs1 div img').addClass('mario-movin', 2000);

      $('<img src="mario-last.png" class="mario-last">').appendTo('.hs1 div').animate({
        width: '90%'
      }, {
        duration: 1900
      });
      $('.bh-btn').show();
    }

  }
  $('.bh-btn').click(function() {
    $('.mario-last').animate({
      width: '0'
    }, {
      duration: 1500
    });
    $('<div class="bye-bye"><i class="fa fa-circle"></i></div>').appendTo('.fren-group');
  });
}
