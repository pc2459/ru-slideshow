;(function($){

  $.fn.slideshow = function( options ){

    // Define options
    var opts = $.extend($.fn.slideshow.defaultOptions, options );

    // Set variables
    var $this = $(this);
    var items = this.children();
    var numItems = this.children().length;

    // Set size of slideshow
    this.width(opts.width); 
    this.height(opts.height);

    // Amend css
    this.css({"listStyleType" :"none", "overflow":"hidden"});
    this.find('li img').css("maxWidth" , opts.width);
    this.children().css("float","left");

    // Hide everything but the first image
    items.not(":first").hide();

    // Add left/right click buttons

    // Scream?!?!?
    for(var i=0; i<items.length; i++){
      $(items[i]).css({"border-width":"3px",
                      "border-color": opts.color,
                      "border-style":"solid"});
    }
    count (this.children());

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