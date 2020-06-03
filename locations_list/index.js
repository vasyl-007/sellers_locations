

// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var labelIndex = 0;

function initMap() {
  var options = {
    center: {
      lat: 50.423091,
      lng: 30.479311,
    },
    zoom: 15,
  };
  var map = new google.maps.Map(
    document.getElementById("id__contacts_modal"),
    options
  );

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", function (event) {
    addMarker(event.latLng, map);
  });

  // Add a marker at the center of the map.
  addMarker(bangalore, map);
}

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
  });
}

google.maps.event.addDomListener(window, "load", initialize);

// SENDING DATA
$("#searchForm").submit(function (event) {
  event.preventDefault();
  var $form = $(this),
    // term = $form.find("input[name='input_val']").val(),
    term = $(this).serializeArray(),
    url = $form.attr("action");
  // console.log("DATA1: ", term)

  // Send the data using post
  var posting = $.post(url, {
    "input[name]": term,
  });
  // console.log("DATA: ", term)

  // Put the results in a div
  posting.done(function (data) {
    var content = $(data).find("#content");
    $("#result").empty().append(content);
    console.log("DATA: ", content);
  });
});

$(function () {
  /* Filter
            =====================*/
  let filter = $("[data-filter]");

  filter.on("click", function (event) {
    event.preventDefault();

    let cat = $(this).data("filter");

    if (cat == "all") {
      $("[data-cat]").removeClass("hide");
    } else {
      $("[data-cat]").each(function () {
        let workCat = $(this).data("cat");

        if (workCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });

  /* Modal
            =====================*/

  const modalCall = $("[data-modal]");
  const modalClose = $("[data-close]");

  modalCall.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalId = $("#modal_hire_me"); //$this.data('modal');

    console.log("modalId", modalId);

    $(modalId).addClass("show");
    $("body").addClass("no-scroll");

    setTimeout(function () {
      $(modalId).find(".modal__dialog").css({
        transform: "scale(1)",
      });
    }, 200);
  });

  modalClose.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalParent = $this.parents(".modal");

    // console.log("modalParent", modalParent)

    modalParent.find(".modal__dialog").css({
      transform: "scale(0)",
    });

    setTimeout(function () {
      modalParent.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal").on("click", function (event) {
    let $this = $(this);

    $this.find(".modal__dialog").css({
      transform: "scale(0)",
    });

    setTimeout(function () {
      $this.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal__dialog").on("click", function (event) {
    event.stopPropagation();
  });
});
