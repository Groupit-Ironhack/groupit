$("#create").on("click", (e) =>{

  if($("#pac-input").val() == "" || $("#description").val() == "" || $("#time")){
    e.preventDefault();
    $(".alert-danger").addClass("d-block")
    $(".alert-danger").removeClass("d-none")
  }

})

