$.ajax({
  url: "/api/questions/results",
  method: "GET"
}).then(function(response) {

    $("#reload").on("click", function() {
      $(".progress-bar").each(function(){
        console.log($(this).attr("aria-valuenow"));
      });
    });

  });