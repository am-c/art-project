var num_correct = 0;
var drag_num;
$(init);

function init() {
  num_correct = 0;
  $('.drag-wrap').html('');
//  $('.hotspot-wrap').html('');
  $('.bh-btn').hide();
  // Reset everything

  $('.resetbtn').click(function() {
    $('.am_img').removeClass('overlay');
    $('.am_img').removeClass('draggy-overlay');
    $('.hs0').removeClass('draggy-overlay');

  });

	// dice code
	
	//Prefix free support code for jquery
      (function($, self){
        if(!$ || !self) {
          return;
        }
        for(var i=0; i<self.properties.length; i++) {
          var property = self.properties[i],
          camelCased = StyleFix.camelCase(property),
          PrefixCamelCased = self.prefixProperty(property, true);
          $.cssProps[camelCased] = PrefixCamelCased;
        }
      })(window.jQuery, window.PrefixFree);

    //Actual code for Play Action   
    $(function(){
      var x=[0,90,180,270];
      $("#play").click(function(e){
        e.preventDefault();
        var rand1=Math.floor(Math.random()*4);
        var rand2=Math.floor(Math.random()*4);
        $(".dice").css("transform","rotateX("+x[rand1]+"deg) rotateY("+x[rand2]+"deg)");
      });
    });
	
	// dice code end
  // Drag Array  
  var draggy = [
    ['ball.png" class="draggy-0', 0]
  ];
  // Randomize Drag Array
  draggy.sort(function() {
    return Math.random() - 0.5;
  });

  // Create draggy's << lame
  for (var i = 0; i < draggy.length; i++) {

    $('<div class="b4-pickup"> <img src="' + draggy[i][0] + '" draggable="false" ></div>').data('number', draggy[i][1]).appendTo('.drag-wrap').draggable({
      stack: '.drag-wrap div',
      cursor: 'pointer',
      revert: true
    });

  }

  $('.b4-pickup').draggable({
    revert: true
  });

  // Target Array

  var hotSpotz = [
    []
  ];
  
  $.each(hotSpotz, function(addNumbr) {

    $('<div class="hs' + addNumbr + '"></div>').appendTo('.hotspot-wrap').droppable({
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

/*    if (num_correct === 3) {

      $('.hs1 img').not('mario.png').remove();

      $('.am_img').addClass('overlay draggy-overlay', 2000);
      $('.ui-droppable').not('.hs1').addClass('draggy-overlay', 2000);

      $('.hs1 div img').addClass('movin', 2000);

      $('<img src="mario-last.png" class="mario-last">').appendTo('.hs1 div').animate({
        width: '90%'
      }, {
        duration: 1900
      });
      $('.bh-btn').show();
    }*/

  }
/*  $('.bh-btn').click(function() {
    $('.mario-last').animate({
      width: '0'
    }, {
      duration: 1500
    });
    $('<div class="bye-bye"><i class="fa fa-circle"></i></div>').appendTo('.drag-wrap');
  });*/
}
