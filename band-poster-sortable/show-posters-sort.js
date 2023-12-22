var all_dropped = 0;

// text-top
//var text-top = "Show Posters";

// Charms
var drags = [
  ['<li><img src="posters/toots.png" draggable="false" alt="toots"></li>', 1],
  ['<li><img src="posters/wasp.png" draggable="false" alt="wasp"></li>', 2],
  ['<li><img src="posters/primus.png" draggable="false" alt="show posters"></li>', 3],
  ['<li><img src="posters/elliott-smith.png" draggable="false" alt="show posters"></li>', 4],
  ['<li><img src="posters/firehose.png" draggable="false" alt="show posters"></li>', 5],
  ['<li><img src="posters/doa.png" draggable="false" alt="show posters"></li>', 6],
  ['<li><img src="posters/dinosaur-jr-2.png" draggable="false" alt="show posters"></li>', 7],
  ['<li><img src="posters/john-fahey.png" draggable="false" alt="show posters"></li>', 8],
  ['<li><img src="posters/allen-ginsberg.png" draggable="false" alt="show posters"></li>', 9],
  ['<li><img src="posters/rhcp.png" draggable="false" alt="show posters"></li>', 11],
  ['<li><img src="posters/sonic-youth.png" draggable="false" alt="show posters"></li>', 12],
  ['<li><img src="posters/slack.png" draggable="false" alt="show posters"></li>', 13],
  ['<li><img src="posters/bad-brains.png" draggable="false" alt="show posters"></li>', 14],
  ['<li><img src="posters/soul-asylum.png" draggable="false" alt="show posters"></li>', 15],
  ['<li><img src="posters/VF.png" draggable="false" alt="show posters"></li>', 16],
  ['<li><img src="posters/buy-oregon-first.png" draggable="false" alt="show posters"></li>', 17],
  ['<li><img src="posters/recused.png" draggable="false" alt="show posters"></li>', 18],
  ['<li><img src="posters/ornette-coleman.png" draggable="false" alt="show posters"></li>', 19],
  ['<li><img src="posters/fight-the-power.png" draggable="false" alt="show posters"></li>', 20],
  ['<li><img src="posters/j-mascis.png" draggable="false" alt="show posters"></li>', 21],
  ['<li><img src="posters/the-dils.png" draggable="false" alt="show posters"></li>', 22],
  ['<li><img src="posters/eve-6.png" draggable="false" alt="show posters"></li>', 24],
  ['<li><img src="posters/faith-no-more.png" draggable="false" alt="show posters"></li>', 25],
  ['<li><img src="posters/slayer.png" draggable="false" alt="show posters"></li>', 26],
  ['<li><img src="posters/dinosaur-jr-1.png" draggable="false" alt="show posters"></li>', 27]
];

$(init);

function init() {
  // Reset everything
  //$('.complete').hide();
  // $('.am_logo').hide();
  //$('.fa').show();
  //  all_dropped = 0;
  $('#sortable').html('');
  $('.target_stack').html('');

  // Add text-top
  // $('.text-top').html(text-top_txt);


  // Create Drags 

  for (var i = 0; i < drags.length; i++) {

    $(drags[i][0]).data('number', drags[i][1]).attr('id', 'sortItout_' + drags[i][1]).appendTo('#sortable');
    $("#sortable").sortable({
      containment: "#sortable"
    }).disableSelection();

  }

  $("<div class='spacer'></div>").insertBefore("#sortItout_11");
  $(".spacer").sortable();
  $(".spacer").sortable("disable");

  $('<div class="am-img"><img src="show-posters.jpg" draggable="false" alt="show posters"></div>').appendTo('.target_stack');
  $('<div class="am_logo"><img src="logo-gray-sm.png" draggable="false" alt="Acates Media"></div>').appendTo('.target_stack');
  $('<div class="crate"><img src="posters/crate.png" draggable="false" alt="crate"></div>').appendTo('.target_stack');
  $('<div class="album"><img src="posters/album.png" draggable="false" alt="album"></div>').appendTo('.target_stack');
 //$('<div class="player"><img src="posters/player.png" draggable="false" alt="player"></div>').appendTo('.target_stack'); 
 
  // Check if all are dropped

  // if (all_dropped === drags.length) {
  /*  $('.complete').show();*/
  /*setTimeout(function(){
     $('.am_logo').show();
     $('.fa').hide();
  }, 15000);
    }*/



}
