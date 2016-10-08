$( document ).ready(function() {

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
      console.log(info);
      var tipoTorta   = info[0];
      var tiempoTorta = info[1];
    
      console.log("pushaste hornear");
      console.log(tipoTorta);
      if(isNaN(tiempoTorta)){
        alert("El tiempo debe ser un numero");
      } 
      else {
        console.log(tiempoTorta);
        console.log ("********");
        torta = new Torta(tipoTorta);
        console.log (torta);
        console.log (torta.tipoTorta);
        console.log (torta.estatus);
        console.log (torta.bakeTime());
        console.log ("********");
        horno = new Oven(torta, tiempoTorta);
        console.log (horno);
        console.log (horno.tiempo +" Tiempo no debe salir");
        console.log (horno.torta +" Torta no debe salir");
        console.log(torta.estatus);
      }
    }
  });// end form.submit

});

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
/*
    case
    when status < 0.5
      'crudo'
    when status < 0.7
      'casi listo'
    when status <= 1.0
      'listo'
    when status > 1.0
      'quemado'
    end
*/

// Class Oven
function Oven(torta, tiempo){
  tiempo = new Number(tiempo);
  torta = torta;
  var estatus = tiempo / torta.bakeTime();
  if (estatus < 0.5){ torta.estatus = "crudo";}
  else if(estatus < 0.7){ torta.estatus = "casi listo";}
  else if(estatus <= 1.0){ torta.estatus = "listo";}
  else { torta.estatus = "quemado";}
}
