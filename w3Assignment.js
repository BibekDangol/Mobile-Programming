$(document).ready(function() {
  // Show/hide details for each card
  $(".detailsBtn").click(function() {
    let detailsDiv = $(this).siblings(".details");
    
    // Slide toggle the details
    detailsDiv.slideToggle();

    // Change button text
    if (detailsDiv.is(":visible")) {
      $(this).text("Hide Details");
    } else {
      $(this).text("View Details");
    }
  });
});
