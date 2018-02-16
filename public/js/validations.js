$("#create").on("click", (e) =>{

  if($("#pac-input").val() == "" || $("#description").val() == "" || $("#time").val() == ""){
    e.preventDefault();
    $(".alert-danger").addClass("d-block")
    $(".alert-danger").removeClass("d-none")
  }

})

