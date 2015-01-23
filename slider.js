// Learning exercise; with a lot of cribbing from
// https://github.com/craftedpixelz/Craftyslide

;(function($){

  $.fn.slideshow = function( options ){

    // Define options
    var opts = $.extend($.fn.slideshow.defaultOptions, options );

    // Set variables
    // var this = $(this);
    var items = this.children('li');
    var numItems = this.children('li').length;

    // Set size of slideshow
    this.width(opts.width); 
    this.height(opts.height);
    this.find('li, li img').css("maxWidth" , opts.width);
    // this.find('li, li img').css("maxHeight" , opts.height);

    // Amend css
    this.css({"listStyleType" :"none", "overflow":"hidden"});
    this.children().css("float","left");

    // Hide everything but the first image
    items.not(":first").hide();

    // Add IDs to each of the images

    var pagination = $('<ul id="pagination">');
    this.append(pagination);

    var i = 1;
    
    items.each(function(){
      $(this).attr("id",i);
      pagination.append('<li><a href="#' + i + '">' + i + '</a>');
      i++;
    });

    // Set up next/previous links
    var k = 2;
    var j = numItems;
    var next = $('<a href="#' + k + '" id="next">▶</a>');
    var prev = $('<a href="#' + j + '" id="prev">◀</a>');


    this.append(prev);
    this.append(next);

    var active = "#1";

    // Autoplay variables
    var interval = null;
    var autoplayMode = opts.autoplay;
    var autoplayButton = $('<a href="#" id="autoplay"></a>');
    this.append(autoplayButton);


    // Pagination navigation
    function paginationNav(){
      var pagi = $("#pagination li a");
      var next = $("#next");
      var prev = $("#prev");

      pagi.on("click", function(e){
        e.preventDefault();

        active = this.hash;
        items.fadeOut();
        $(active).fadeIn();

        active = parseInt(active.replace(/\D/g,''));
        console.log(active);

        // Fix the next/previous links
        j = active - 1;
        if (j < 1){
          j = numItems;
        }
        k = active + 1;
        if (k > numItems){
          k = 1;
        }

        next.attr("href","#"+k);
        prev.attr("href","#"+j);


      });

    }

    // Next/previous navigation 
    function nextPreviousNav(){
      var next = $("#next");
      var prev = $("#prev");

      next.on("click",function(e){
        e.preventDefault();
        active = this.hash;
        items.fadeOut();
        $(active).fadeIn();
        // Reset the links
        k++;
        j++;
        if (k > numItems){
          k = 1;
        }
        if (j > numItems){
          j = 1;
        }
        next.attr("href","#"+k);
        prev.attr("href","#"+j);

      });

      prev.on("click",function(e){
        e.preventDefault();
        active = this.hash;
        items.fadeOut();
        $(active).fadeIn();
        // Reset the links
        k--;
        j--;
        if (k < 1){
          k = numItems;
        }
        if (j < 1){
          j = numItems;
        }
        next.attr("href","#"+k);
        prev.attr("href","#"+j);

      });
    }

    // Autoplay
    function autoplay(){
      $("#autoplay").text('❚❚');
      interval = setInterval(function(){
        console.log("Time has passed");

        var nextSlide = parseInt(active.replace(/\D/g,'')) + 1;
        if(nextSlide>numItems){
          nextSlide = 1;
        }
        active = "#" + nextSlide;
        console.log(active); 

        items.fadeOut();
        $(active).fadeIn();
        
        // Fix the next/previous links

        j = nextSlide - 1;
        if (j < 1){
          j = numItems;
        }
        k = nextSlide + 1;
        if (k > numItems){
          k = 1;
        }

        next.attr("href","#"+k);
        prev.attr("href","#"+j);

        autoplayMode = "on";
        

      }, opts.interval);
    }

    function pauseAutoplay() {
      $("#autoplay").text('▶');
      clearInterval(interval);
      autoplayMode = "off";
      
    }




    nextPreviousNav();
    paginationNav();

    if(autoplayMode == "on"){
      $("#autoplay").text("❚❚");
      autoplay();
    }
    else{
      $("#autoplay").text("▶");
    }

    $("#autoplay").on("click",function(){
      if(autoplayMode == "off"){
        autoplay();
        console.log("Turned on");
      }
      else{
        pauseAutoplay();
        console.log("turned off");
      }
    });

    

    return this;

  };



  // Private function
  function count(n){
    console.log(n.length);
  }

  // Default options
  $.fn.slideshow.defaultOptions = {
    width: 600,
    height: 300,
    interval: 4000,
    autoplay: "on",
  };

})(jQuery);