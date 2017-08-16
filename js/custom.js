
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

  $('#proYear').on('click', function(e) {
    // change interval to year.
    $('#interval').val('year');
  });

  $('#proMonth').on('click', function(e) {
    // change interval to year.
    $('#interval').val('month');
  });

  $('#emailModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var modal = $(this);

    var title = button.data('title');
    if (title) {
      modal.find('.modal-title').text(title);
    }

    var action = button.data('action');
    if (action) {
      modal.find('button.btn-primary').text(action);
    }
  })

});
