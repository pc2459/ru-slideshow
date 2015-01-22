;(function($){

  $.fn.slideshow = function( options ){

    // Define options
    var opts = $.extend($.fn.slideshow.defaultOptions, options );

    // Set variables
    var $this = $(this);
    var items = $this.children('li');
    var numItems = $this.children('li').length;

    // Set size of slideshow
    this.width(opts.width); 
    this.height(opts.height);
    this.find('li, li img').css("maxWidth" , opts.width);
    this.find('li, li img').css("maxHeight" , opts.height);

    // Amend css
    this.css({"listStyleType" :"none", "overflow":"hidden"});
    
    this.children().css("float","left");

    // Hide everything but the first image
    items.not(":first").hide();

    // Add IDs to each of the images
    // Paginate

    var pagination = $('<ul id="pagination">');
    this.append(pagination);

    var i = 1;
    
    items.each(function(){
      $(this).attr("id",i);
      pagination.append('<li><a href="#' + i + '">' + i + '</a>');
      i++;
    });

    var k = 2;
    var j = numItems;
    var next = $('<a href="#' + k + '" id="next">Next</a>');
    var prev = $('<a href="#' + j + '" id="prev">Previous</a>');

    this.append(next);
    this.append(prev);

    // Add left/right click buttons

    // // Scream?!?!?
    // for(var i=0; i<items.length; i++){
    //   $(items[i]).css({"border-width":"3px",
    //                   "border-color": opts.color,
    //                   "border-style":"solid"});
    // }

    // this.on("click", function(){
    //   $this.animate({
    //     opacity: 0
    //     // height: "toggle"
    //     }, 500, "swing");

    //   console.log("Clicked the thing");
    // });

    function NextPrevious(){
      var next = $("#next");
      var prev = $("#prev");

      next.on("click",function(e){
        e.preventDefault();
        console.log("Clicked on the next");
        console.log(this.hash);
        var active = this.hash;
        items.fadeOut();
        $(active).fadeIn();
        console.log(k);
        k++;
        j++;
        console.log(k);
        if (k > numItems){
          k = 1;
        }
        if (j > numItems){
          j = 1;
        }
        // var newNext = $('<a href="#"'+ k +' id="next">Next</a>');
        next.attr("href","#"+k);
        prev.attr("href","#"+j);

      });

      prev.on("click",function(e){
        e.preventDefault();
        console.log("Clicked on the next");
        console.log(this.hash);
        var active = this.hash;
        items.fadeOut();
        $(active).fadeIn();
        console.log(k);
        k--;
        j--;
        console.log(k);
        if (k < 1){
          k = numItems;
        }
        if (j < 1){
          j = numItems;
        }
        // var newNext = $('<a href="#"'+ k +' id="next">Next</a>');
        next.attr("href","#"+k);
        prev.attr("href","#"+j);

      });
    }





    NextPrevious();
    count (this.children('li'));

    return this;

  };



  // Private function
  function count(n){
    console.log(n.length);
  }

  // Default options
  $.fn.slideshow.defaultOptions = {
    color: "#000",
    width: "600px",
    height: 300,
    interval: 4000
  };

})(jQuery);