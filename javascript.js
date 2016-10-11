$( document ).ready(function() {
  $("*").find(".lista").hide();

  $("form").submit(function(e){
    e.preventDefault();

    var form_class;
    form_class = $(this).attr("class");
    //console.log(form_class);

    if (form_class == "create-oven"){
      $(".oven").css({"visibility":"visible"});
    } 
    else if(form_class == "Hornear"){
      var info = $(this).serialize().replace(/(torta)(%5B)\w{1,}(%5D)=/g, "").split("&");
      // console.log(info);
      var tipo_torta   = info[0];
      var tiempo_torta = info[1];
    
      // console.log("pushaste hornear");
      // console.log(tipoTorta);
      if(isNaN(tiempo_torta)){
        alert("El tiempo debe ser un numero");
      } 
      else {
        $(".Hornear").find("input:nth-child(3)").hide();
        // console.log(tiempoTorta);
        // console.log ("********");
        torta = new Torta(tipo_torta.toLowerCase());
        // console.log (torta);
        // console.log (torta.tipoTorta);
        // console.log (torta.estatus);
        // console.log (torta.bakeTime());
        // console.log ("********");
        horno = new Oven(torta, tiempo_torta);
        // console.log (horno);
        // console.log (horno.tiempo +" Tiempo no debe salir");
        // console.log (horno.torta +" Torta no debe salir");
        // console.log(torta.estatus);
        horno.cook();
      }
    }
  });// end form.submit

});//end $( document ).ready

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Class Torta
function Torta(tipo){
  this.tipoTorta   = tipo;
  this.estatus     = "Sin status";
  this.bakeTime    = bakeTime;
}

function bakeTime(){
  if(this.tipoTorta == "milanesa"){
    return 10;
  } else if(this.tipoTorta == "queso"){
    return 8;
  } else { return 3; }
}

// Class TortaBatch
//Nunca la use XD

// Class Oven
function Oven(torta, tiempo){
  time = new Number(tiempo);
  torta = torta;
  var estatus, x;
  var i = time;
  this.cook = function(){
    // for (i = time; i >= 0; i--) { 
    //   estatus = (time - i) / torta.bakeTime();
    //   // console.log("Time - i : " + (time - i) );
    //   // console.log("Valor i : " + i);
    //   // console.log("Estatus : " + estatus);
    var animacion = setInterval(function(){
      estatus = (time - i) / torta.bakeTime();
      // console.log("Estatus : " + estatus);
      if (estatus < 0.5){ 
        torta.estatus = "crudo";
        $("#timer").removeClass("Crudo Casi-listo LISTO QUEMADO").addClass("Crudo").css({"border": "2px solid #b6b4b4", "border-radius": "5px"});
        $("#timer").empty().append("<p id=\"contador\">"+ i +"<br>"+ torta.estatus +"</p>");
      }
      else if(estatus == 1.0){ 
        torta.estatus = "listo";
        $("#timer").removeClass("Crudo Casi-listo LISTO QUEMADO").addClass("LISTO").css({"border": "2px solid #2bce2b", "border-radius": "5px"});
        $("#timer").empty().append("<p id=\"contador\">"+ i +"<br>"+ torta.estatus +"</p>");
      }
      else if(estatus > 1.0){ 
        torta.estatus = "QUEMADO";
        $("#timer").removeClass("Crudo Casi-listo LISTO QUEMADO").addClass("QUEMADO").css({"border": "2px solid #ff8989", "border-radius": "5px"});
        $("#timer").empty().append("<p id=\"contador\">"+ i +"<br>"+ torta.estatus +"</p>");
      }
      else { 
        torta.estatus = "casi listo";
        $("#timer").removeClass("Crudo Casi-listo LISTO QUEMADO").addClass("Casi-listo").css({"border": "2px solid #ffb76f", "border-radius": "5px"});
        $("#timer").empty().append("<p id=\"contador\">"+ i +"<br>"+ torta.estatus +"</p>");
      }

      if ( i == 0 ) {
        // sleep time expects milliseconds
        function sleep (time) {
          return new Promise((resolve) => setTimeout(resolve, time));
        }

        // Usage!
        sleep(900).then(() => {
            // Do something after the sleep!
          mostrarListaTortas(torta); 
          $("#timer").empty().removeClass("Crudo Casi-listo LISTO QUEMADO").css({"border": "2px solid black", "border-radius": "none"});
          $(".Hornear").find("input:nth-child(1)").val("");
          $(".Hornear").find("input:nth-child(2)").val("");
          $(".Hornear").find("input:nth-child(3)").show();
          clearInterval(animacion);
        });
      } else { i --; }
    }, 1000);//end animacion
    // }//end for
    console.log("true1");
  }//end this.cook
}//end Class Oven



function mostrarListaTortas(torta){
  torta = torta;
  // console.log("true2");
  // console.log(torta);
  // console.log(torta instanceof Torta);
  $("*").find(".lista").show();
  $("#history").css("visibility","visible");
  if (torta.estatus == "listo"){
    $("#history").append("<li>"+ torta.tipoTorta.capitalizeFirstLetter() +": <strong style=\"color:green;\">"+ torta.estatus +"</strong></li>");
  }
  else if(torta.estatus == "QUEMADO"){
    $("#history").append("<li>"+ torta.tipoTorta.capitalizeFirstLetter() +": <strong style=\"color:red;\">"+ torta.estatus +"</strong></li>");
  }
  else if(torta.estatus == "crudo"){
    $("#history").append("<li>"+ torta.tipoTorta.capitalizeFirstLetter() +": <strong style=\"color:#7F7F7F;\">"+ torta.estatus +"</strong></li>");
  }
  else{
    $("#history").append("<li>"+ torta.tipoTorta.capitalizeFirstLetter() +": <strong style=\"color:#FF7F00;\">"+ torta.estatus +"</strong></li>");
  }
}





/*
    // $("#history").append("<li> TORTA PRUEBA: <strong style=\"color:blue;\"> DEBO SER AZUL </strong></li>");
      $( "input" ).prop( "disabled", true ); //Disable
      $( "input" ).prop( "disabled", false ); //Enable
*/
