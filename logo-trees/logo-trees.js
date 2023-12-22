var num_correct = 0;
var drag_num;
$(init);

function init() {
  //$(document).ready(function() {

  // Reset everything
  $('.am_right').hide();
  num_correct = 0;
  $('.logo-wrap').html('');
  $('.hotspot-wrap').html('');
  $('.img-wrap').show();
  $('.img-wrap2').remove();
  /*  $('.dropped img').addClass('opac');
    $('.dropped img').removeClass('hovered2');*/
  /*	$('<div class="drag_B"><img src="logos/logo-12.png" draggable="false"></div>').appendTo('.logo-wrap').draggable({
        // containment: '#am-container',
        stack: '.logo-wrap div',
        cursor: 'pointer',
        revert: true
      });*/
  // Drag Array  
  var amlogo = [
    ['logos/logo-0.png', 0],
        ['logos/logo-1.png', 1],
        ['logos/logo-2.png', 2],
        ['logos/logo-3.png', 3],
        ['logos/logo-4.png', 4],
        ['logos/logo-5.png', 5],
        ['logos/logo-6.png', 6],
        ['logos/logo-7.png', 7],
        ['logos/logo-8.png', 8],
        ['logos/logo-9.png', 9],
        ['logos/logo-10.png', 10],
        ['logos/logo-11.png', 11],
        ['logos/logo-12.png', 12],
        ['logos/logo-13.png', 13],
        ['logos/logo-14.png', 14],
        ['logos/logo-15.png', 15]
  ];


  // Randomize Drag Array
  amlogo.sort(function() {
    return Math.random() - 0.5;
  });

  // Create amlogo's << lame
  for (var i = 0; i < amlogo.length; i++) {
    //.data('number', amlogo[i][1])
    $('<div class="drag_B"> <img src="' + amlogo[i][0] + '" draggable="false">').appendTo('.logo-wrap').draggable({
      // containment: '#am-container',
      stack: '.logo-wrap div',
      cursor: 'pointer',
      revert: true
    });
    $('.drag_B img').attr('class', 'amlogo-1');

  }

  $('drag_after').draggable({
    revert: true
  });

  // Target Array

  var hotSpotz = [
    []
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
    var hotSpotDrop = $this.index();
    drag_num = ui.draggable.data('number');

    // Check if correct 
    // if (hotSpotDrop !== drag_num) {

    ui.draggable.removeClass("droppedRevert");
    ui.draggable.draggable('option', 'revert', false);
    ui.draggable.addClass("dropped");
    ui.draggable.removeClass("drag_B");
    // Run the effect

    $this.append(ui.draggable);
    num_correct++;
    console.log(num_correct);
    // } 


    var disImg = $this.children().children();

    disImg.show().effect('explode', {
      times: 10,

    }, 1500);

    // Add and remove still associated with item clicked


    // Check if activity is complete
    if (num_correct === 16) {
   // set timeout beginning
          setTimeout(function() {
      $('.dropped').remove();
      $('.amlogo-1').remove();
      $('.hs0').append('<div class="spiral-wrap"><img class="spiral" src="spiral.gif" draggable="false"></div>');
      $('.spiral-wrap').append('<img class="rabbit-spiral" src="rabbit-logo.png" draggable="false">');


      $('.rabbit-spiral').one("click", function() {

        $(this).animate({
          'width': '0',
          'top': '50%',
          'left': '50%'
        }, 1400, function() {
          // animation end			  
          $('.spiral').effect('explode', {
            times: 10,

          }, 1500);


          $('.img-wrap').hide().fadeOut({}, 1400, function() {});
				setTimeout(function() {
				
            $('<div class="img-wrap2"><img src="t-3.jpg" class="am-background transparent" alt="birds eye view trees" draggable="false" /><button class="resetbtn btn btn-sm btn-success" onClick="init()"><img src="rabbit.png" alt="rabbit" draggable="false" /></button></div>').insertAfter('.logo-wrap').animate( 50, function() {
 $('.img-wrap2 img').removeClass("transparent");
			$('.img-wrap2').not($(this)).hide();
  });
  }, 100);
			
	setTimeout(function() {
				//	$('.img-wrap2').add();
            $('<div class="img-wrap2"><img src="t-5.jpg" class="am-background transparent" alt="birds eye view trees" draggable="false" /><button class="resetbtn btn btn-sm btn-success" onClick="init()"><img src="rabbit.png" alt="rabbit" draggable="false" /></button></div>').insertAfter('.logo-wrap').animate( 50, function() {
 $('.img-wrap2 img').removeClass("transparent");
			$('.img-wrap2').not($(this)).hide();
  });
  }, 2000);
setTimeout(function() {
            $('<div class="img-wrap2"><img src="t-6.jpg" class="am-background transparent" alt="birds eye view trees" draggable="false" /><button class="resetbtn btn btn-sm btn-success" onClick="init()"><img src="rabbit.png" alt="rabbit" draggable="false" /></button></div>').insertAfter('.logo-wrap').animate( 50, function() {
 $('.img-wrap2 img').removeClass("transparent");
		$('.img-wrap2').not($(this)).hide();
  });
 }, 3000);
			setTimeout(function() {
            $('<div class="img-wrap2"><img src="tree-sphere-space-trees.jpg" class="am-background transparent" alt="Tree Sphere" draggable="false" /><button class="resetbtn btn btn-sm btn-success" onClick="init()"><img src="rabbit.png" alt="rabbit" draggable="false" /></button></div>').insertAfter('.logo-wrap').animate( 50, function() {
  $('.img-wrap2 img').removeClass("transparent");
			$('.img-wrap2').not($(this)).hide();
  });
	 }, 4000);	



        }); // animation end

      }); // end click function
		
         }, 1500); // set timeout end

    } // if end
  }

}
