
    $(document).ready(function(){
      $("button").click(function(){
        var div = $("div.box");
        div.animate({left: '250px'});
        div.animate({height: '300px', opacity: '0.4'}, "slow");
        div.animate({width: '300px', opacity: '0.8'}, "slow");
        div.css("background-color", "tomato");
        div.animate({height: '100px', opacity: '0.4'}, "slow");
        div.animate({width: '100px', opacity: '0.8'}, "slow");
        div.animate({left: '0px'}, "slow", function() {
          div.css("background-color", "#5e21bfff");
        });
      });
    });