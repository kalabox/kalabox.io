
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

  var key = window.location.hostname === 'localhost' ? 'pk_test_zlxUkZiPbjTuamJTAFWCBfeR' : 'pk_live_jQsRbu10GbKq3m84WK6pPEQw';
  var handler = function(type) {
    return StripeCheckout.configure({
      key: key,
      locale: 'auto',
      allowRememberMe: false,
      token: function(token) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token, type);
        if (type === 'year') {
          $.get('/stripe/charge/kalabox-pro-year', token);
        }

        if (type ==='month') {
          $.get('/stripe/charge/kalabox-pro-month', token);
        }
      }
    });
  };

  $('#proYear').on('click', function(e) {
    // Open Checkout with further options:
    handler('year').open({
      name: 'Kalabox Inc.',
      image: '/img/kalaboxv2-ico.png',
      description: 'One Year of Kalabox Pro',
      amount: 89 * 100
    });
    e.preventDefault();
  });

  $('#proMonth').on('click', function(e) {
    // Open Checkout with further options:
    handler('month').open({
      name: 'Kalabox Inc.',
      image: '/img/kalaboxv2-ico.png',
      description: 'One Month of Kalabox Pro',
      amount: 9 * 100
    });
    e.preventDefault();
  });

  // Close Checkout on page navigation:
  $(window).on('popstate', function() {
    handler.close();
  });


});

