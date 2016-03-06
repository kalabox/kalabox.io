
$(document).ready(function() {

	// ==================== LOADER ==================== //
	
     $(window).load(function(){
        $('.doc-loader').fadeOut('slow');
     });
	
	
	// ==================== WOW ANIMATION DELAY ==================== //
    wow = new WOW(
    {
      animateClass: 'animated',
      mobile: false,
      offset:       70
    }
  );
  wow.init();

  // ==================== NIVO LIGHTBOX ==================== //

  $('.thumbnail').nivoLightbox();
  
  	  
  $('.owl-carousel').owlCarousel({
    center: true,
    loop:true,
    items:1,
    margin:30,
    stagePadding:30,
    autoplay:true,
    autoplayHoverPause:true
});



});

