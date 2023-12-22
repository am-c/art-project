// Bars
var b_num;
var bars_data;
var btn_num;
var currentQ;

var bars = [
  [0],
  [1],
  [2],
  [3],
  [4]
];

$(init);

function init() {

  //Hide bar graph page
  $('.results').hide();
$('.sh_checkbox').prop('checked', false);
  //Calculate bar data percentage
  $(".bar-group li .bar").each(function() {
    var percentage = $(this).data('percentage');

    $(this).animate({
      'height': percentage + '%'
    }, 1000);
  });

  // Only one checkbox can be checked at once
  /*    $('.sh_checkbox').change(function() {
        $('.sh_checkbox').prop('checked', false);
        $(this).prop('checked', true);
      });*/

  // Show question when button is clicked
  $('.sh_btn').click(function() {

    $(".q0").hide();
    $(".q1").hide();
    $(".q2").hide();
    $(".q3").hide();
    $(".q4").hide();
    btn_num = $(this).attr('answer');
    $(".q" + btn_num).show();

  });
  //Add the category definition for each block on hover
  $('.bar0, .bar1, .bar2, .bar3, .bar4').hover(
    function() {
      if ($('.bar0').is(":hover")) {
        $('.top-text').html($("<span>Open Minded – This item reflects your world view or internal state. An effective level of open-mindedness indicates tolerance and acceptance of others.</span>"));
      }
      if ($('.bar1').is(":hover")) {
        $('.top-text').html($("<span>Respect differences - This item reflects the degree to which you respect differing views. When you respect others you can agree to disagree.</span>"));
      }
      if ($('.bar2').is(":hover")) {
        $('.top-text').html($("<span>Biases - This item reflects your biases or prejudices toward others. An ineffective level of bias / prejudice may negatively impact responses.</span>"));
      }
      if ($('.bar3').is(":hover")) {
        $('.top-text').html($("<span>Listening - This item illustrates the degree to which you assume you know what others have to say. Effective listeners listen for the whole message.</span>"));
      }
      if ($('.bar4').is(":hover")) {
        $('.top-text').html($("<span>Self-confidence - This item illustrates your level of self-confidence. A strong level of self-confidence enables you to not take abusive calls personally.</span>"));
      }
    },
    function() {
      $('.top-text').find("span:last").remove();
      $('.top-text').html("Mouse over each block for a definition of each category.");
    }
  );
  // Change function fires when any checkbox is checked
  var CBXinput = $('input:radio');
  $(CBXinput).change(function() {
    currentQ = $(this).closest('.sh_question');

    var one = currentQ.find(':radio:checked').attr('answer') === '0';
    var two = currentQ.find(':radio:checked').attr('answer') === '1';
    var three = currentQ.find(':radio:checked').attr('answer') === '2';
    var four = currentQ.find(':radio:checked').attr('answer') === '3';

    // Animate bar graph based on the answer chosen for each question	
    function barAnimate(event) {

      if (one) {

        $(".bar" + b_num).attr('data-percentage', 25);
        $(".bar" + b_num).animate({
          'height': 25 + '%'
        }, 1000);

      }

      if (two) {
        $(".bar" + b_num).attr('data-percentage', 50);
        $(".bar" + b_num).animate({
          'height': 50 + '%'
        }, 1000);

      }

      if (three) {

        $(".bar" + b_num).attr('data-percentage', 75);
        $(".bar" + b_num).animate({
          'height': 75 + '%'
        }, 1000);

      }

      if (four) {

        $(".bar" + b_num).attr('data-percentage', 100);

        $(".bar" + b_num).animate({
          'height': 100 + '%'
        }, 1000);

        $('.reset-btn').click(function() {
          $('.bar0, .bar1, .bar2, .bar3, .bar4').animate({
            'height': 10 + '%'
          }, 1000);

        });

      }

    } // FUNCTION BAR ANIMATE

    // Create Bars
    for (var i = 0; i < bars.length; i++) {

      var b = $().data('number', bars[i][0]);
      bars_data = b.data();
      b_num = bars[i][0];

      if (currentQ.hasClass('q' + b_num)) {
        barAnimate();
      }

    } // FOR end

    // done start
    $('.done-btn').click(function() {
      $(".sh_question").hide();
      $(".results").show();
      $('.done-btn').hide();

    }); // done end

  }); // CHANGE
  
  //hide done button until question is clicked
  $('.done-btn').hide();
  $('.sh_btn').click(function() {

    $('.done-btn').show();

  });
  $('.reset-btn').click(function() {
    $(".sh_question").show();
    $(".sh_question:gt(0)").hide();
    $(".results").hide();
    $('.sh_checkbox').prop('checked', false);
    // $('.done-btn').show();

  });

  // Hide question class except the first div
  $(".sh_question:gt(0)").hide();

  // Remove comment to hide all question divs
  //$(".sh_question").hide();

} // init
