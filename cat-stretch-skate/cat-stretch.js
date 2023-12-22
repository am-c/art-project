var num_correct = 0;
var drag_num;
$(init);

function init() {
  num_correct = 0;
  $('.drag-wrap').html('');
  $('.hotspot-wrap').html('');
  $('.logo').remove();
  $(".dropped img").css({
    "transform": "rotateZ(20deg)",
    "transition": "0.6s linear"
  });
  //reset where he ollies
  $(".land").data('clicked', false);

  // Drag Array  
  var draggy = [
    ['skater.png" class="draggy-0', 0]
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

      if (ui.draggable.hasClass("dropped")) {
        $('<div class="cat-ear"><img src="ear.png" draggable="false" alt="cat ear"></div>').appendTo('.img-wrap');
      }
      $('.dropped').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function() {
          $('.dropped img').not('logo-1.png').remove().delay(1200);
          $('<img src="logo-1.png" class="logo">').appendTo('.dropped').delay(1200);

          // remove
          $('.cat-ear').remove();


        });

      // Make skater ollie, flip and land


      // LAND on ground
      $(function() {
        $(".land").click(function(e) {
          $(this).data('clicked', true);
          $(".dropped img").css({
            "transform": "translateX(130%) translateY(240%) rotateZ(-30deg)",
            "transition": "0.3s linear"
          });

        });


        // FLIP
        $(".flip").click(function(e) {
          // e.preventDefault();

          $(".dropped img").css({


            "animation-name": "flipperoo",
            "transition": "0.6s linear",
            "animation-duration": "0.8s",
            "transform": "none"
            /*    "animation-iteration-count":"1",
                "animation-fill-mode" : "infinite",*/

          });

          setTimeout(function() {
            $(".dropped img").css({
              "animation-name": "none"
            });
          }, 500);

          // flip on ground
          if ($(".land").data('clicked')) {
            $(".dropped img").css({
				"transform": "translateY(250%)",
              "animation-name": "landflip",
              "transition": "0.6s linear"
            });
            setTimeout(function() {
              $(".dropped img").css({
                "transform": "translateX(100%) translateY(250%) rotateZ(-20deg)",
                "transform-style": "preserve-3d",
				  "transition": "0.6s linear",
                "animation-name": "none"

              });
            }, 400);
          }
        });


        // OLLIE

        $(".ollie").click(function(e) {
          //  e.preventDefault();

          $(".dropped img").css({
            "transform": "translateX(110%) translateY(-120%) rotateZ(30deg)",
            "transition": "0.6s linear"
          });

          setTimeout(function() {
            $(".dropped img").css({
              "transform": "translateX(100%) translateY(20%) rotateZ(10deg) rotateY(10deg)"
            });
          }, 500);

          setTimeout(function() {
            $(".dropped img").css({
              "transform": "translateX(100%) translateY(0) rotateZ(-20deg)"
            });
          }, 1000);

          if ($(".land").data('clicked')) {
            $(".dropped img").css({
              "transform": "translateX(110%) translateY(100%) rotateZ(30deg)",
              "transition": "0.6s linear"
            });

            setTimeout(function() {
              $(".dropped img").css({
                "transform": "translateX(100%) translateY(200%) rotateZ(10deg) rotateY(10deg)"
              });
            }, 500);

            setTimeout(function() {
              $(".dropped img").css({
                "transform": "translateX(100%) translateY(250%) rotateZ(-20deg)"
              });
            }, 1000);
          }

        });

      });


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
