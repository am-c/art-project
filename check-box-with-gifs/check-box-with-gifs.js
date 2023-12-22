// Multiple choice, GIFS
// Check each bus for proper braking characteristics. Start the bus by clicking the Accelerate button, and stop the bus by clicking the Brake button. Select the bus that demonstrates proper stopping ability.
var stem_txt = "Check each bus for proper braking characteristics. Start the bus by clicking the Accelerate button, and stop the bus by clicking the Brake button. Select the bus that demonstrates proper stopping ability.";
var trys = 0;
var currentCB;
$(init);

function init() {

  // Add stem
  $('.stem').html(stem_txt);


  //Clone Alts On Refresh
  $(function() {
    $('.sh_question').mixClones();
  });

  (function() {

    $.fn.mixClones = function() {

      var unsortedAlts = $(this).children();
      var alts = unsortedAlts.clone();

      for (var i = 0; i < alts.length; i++) {
        unsortedAlts.eq(i).replaceWith(alts[i]);
      }

      // });
    };

  })();



  // Check answer and move to next question

  $(function() {



    $('button').click(function() {
      // $(this).data('clicked', true);
      currentCB = $(this).closest('.sh_cbxs');
	   //Refreshing Gifs
      currentCB.find('.bL').attr('src', 'brakes-left.gif');
      currentCB.find('.bR').attr('src', 'brakes-right.gif');
      currentCB.find('.bSt').attr('src', 'brakes-straight.gif');
      currentCB.find('.bW').attr('src', 'brakes-wobble.gif');

      //

      //Showing Gifs
      if ($(this).hasClass('accel_btn')) {
		  
        currentCB.find('.cb_accel').attr('src', 'bus-accel.gif');
        currentCB.find('.cb_accel').show();
        currentCB.find('.cb_brake').hide();
        currentCB.find('.cb_img').hide();

      }
      if ($(this).hasClass('brake_btn')) {

        currentCB.find('.cb_brake').show();
        currentCB.find('.cb_img').hide();
        currentCB.find('.cb_accel').hide();


      }
      if ($(this).hasClass('re_btn')) {

        currentCB.find('.cb_img').show();
        currentCB.find('.cb_brake').hide();
        currentCB.find('.cb_accel').hide();

      }

    });

    // Only one checkbox can be checked at once
    $('.sh_checkbox').change(function() {
      $('.sh_checkbox').prop('checked', false);
      $(this).prop('checked', true);
    });

    var CBXinput = $('input:checkbox');
    $(CBXinput).change(function() {
      var currentQ = $(this).closest('.sh_question');
      var right = currentQ.find(':checkbox:checked').attr('answer') === 'true';
      var wrong = currentQ.find(':checkbox:checked').attr('answer') === 'false';
      trys++;
      if (right) {
        currentQ.fadeOut(2000, function() {
          currentQ.nextAll('.sh_question:first').fadeIn(1100);

        });
        currentQ.find('.answ_t').removeClass('alert alert-success sh_remove');
        currentQ.find('.sh_tool-tip').hide();
        currentQ.find('.wrong-answer').hide();
        currentQ.find('.right-answer').show();
        currentQ.find('input:checkbox').prop("disabled", true);

        trys = 0;
      } else {
        currentQ.find('.right-answer').hide();
        currentQ.find('.sh_next-question').hide();
      }
      // When answers are answered incorrectly
      if (wrong && trys === 1) {
        currentQ.find('.wrong-answer').show();
      } else {
        currentQ.find('.wrong-answer').hide();
      }

      if (wrong && trys === 2) {
        currentQ.find('.wrong-answer').hide();
       currentQ.find('.answ_t').addClass('alert alert-success sh_remove');
       currentQ.find('input:checkbox').prop("disabled", true);
      //  currentQ.find('.wrong-twice').show();
        currentQ.find('.sh_tool-tip').show();

        currentQ.fadeOut(3000, function() {
          currentQ.nextAll('.sh_question:first').fadeIn(1100);

        });

        trys = 0;

      }


    });
  });


  $(".sh_question:gt(0)").hide();
}
