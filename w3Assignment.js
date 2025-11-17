$(document).ready(function() {
  $(".detailsBtn").click(function() {
    const details = $(this).next();
    const isOpen = details.hasClass("show");
    if (isOpen) {
      details.removeClass("show");
      $(this).text("View Details");
    } else {
      details.addClass("show");
      $(this).text("Hide Details");
    }
  });

  $("#hamburger").click(function() {
    $("#navLinks").toggleClass("active");
    $(this).toggleClass("active");
  });
});
