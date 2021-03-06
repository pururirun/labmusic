/* Inicio firebase registro e inicio*/
$(document).ready(function(){
  $(function(){
   setTimeout(function() {
      $('#splash').fadeOut(100);
   }, 3000);
});
  $(".btn-eventos").click(function(){
    $(".concert").toggleClass("hidden-xs");
    $(".carousel-hidden").toggleClass("hidden-xs");
  });
});
// Initialize Firebase
      var config = {
      apiKey: "AIzaSyC22mFKPcAuTplW2UFW0WDRlKKl8tlkjJY",
      authDomain: "labmusic2632.firebaseapp.com",
      databaseURL: "https://labmusic2632.firebaseio.com",
      projectId: "labmusic2632",
      storageBucket: "labmusic2632.appspot.com",
      messagingSenderId: "269825170037"
      };
      firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE) //esto es para que se borre el usuario activo cada vez que inicio sesion
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });


function register(){
 var email = document.getElementById("email").value;
 var password= document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    verificar();

  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  alert("la contraseña debe ser de 6 dígitos / mail incorrecto");
  console.log(errorCode);
  console.log(errorMessage);
});
};
function verificar(){
  var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
  alert("Confirme el mail en su correo y luego inicie sesión");
  console.log("enviando correo");
}).catch(function(error) {
  // An error happened.
  console.log(error);
});
};

function ingreso(){
  var email2 = document.getElementById("email2").value;
  var password2= document.getElementById("password2").value;
  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("Error en mail o contraseña");

});
};

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("existe usuario activo");
    // User is signed in.
    var user= user;
  if(user.emailVerified){

  $('#modalLogin').modal('toggle');
  $(".likes").toggleClass("hidden");
  $(".post-music").toggleClass("hidden");
  $(".joinHeader").toggleClass("hidden");
  $(".carousel-hidden").toggle();
  $(".concert").toggle();
  $(".userHeader").toggleClass("hidden");
  $(".backgroundUser").toggleClass("hidden");
  $(".artist").toggleClass("hidden");
  $(".disc").toggleClass("hidden");
  $(".listening").toggleClass("hidden");
    var nameTitle= $("#name-user-user").val().toUpperCase();
  $("#user-name-perfil").html(nameTitle);
  $("#name-user2").html(nameTitle);
  $(".concert-container").toggleClass("hidden-xs");
  $(".chat-firebase").toggleClass("hidden");

$(".heart").click(function(){
  $(this).toggleClass("red-toggle");
});
};

    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
    //
    console.log("No existe usuario activo");
  }
});

}
observador();


/*final firebase*/

/* Función para los modales de conciertos próximos.*/

$(document).ready(function(){
 for(i=0; i<concertData.length;i++){
  $(".row-concert").append("<div class='col-lg-3'><div class='thumbnail modal-click'>"+concertData[i].photo+"<div class='caption info'><h3>"+concertData[i].name+"</h3><p>"+concertData[i].date+"</p><p></p></div></div></div>");
 }

$(".modal-click").click(function(){ //al hacer click en el contenedor de las fotos
  $("#myModal").modal(); //iniciando el modal desde javascript
  var thisPhoto = $(this).children("img").attr("alt"); // guardamos la variable del Alt de la foto al hacer click
  for(i=0 ; i< concertData.length; i++){ //recorremos la data
    if (thisPhoto == concertData[i].name) { // si el alt de la foto es igual al nombre entonces...
      $(".modal-titles").empty(); //borramos el titulo anterior
      $(".modal-bodys").empty();
      $(".modal-titles").html(concertData[i].name+"<span class='fa fa-calendar'></span>"); // agregamos el nuevo nombre
      $(".modal-bodys").append(concertData[i].photo+"<h4>Lugar :"+concertData[i].place+"</h4><h4>Fecha :"+ concertData[i].date+"</h4><p class='text-justify'>"+concertData[i].description+"</p>");

    };
};

});

 $("#friends").click(function(){
  $(".listening").toggleClass("hidden");
  $(".text-comment").toggleClass("hidden");
  $(".artist").toggleClass("hidden");
  $(".friendList").toggleClass("hidden");
  $(".disc").toggleClass("hidden");
  $(".click-friends").toggleClass("hidden");
  $(".chat-firebase").toggleClass("hidden");

 });
  
 for(var j=0;j<friends.length;j++){
  $(".friends-data").append("<div class='media friend1 center-block'><a class='pull-left' href='#'>"+friends[j].photo+"</a><div class='media-body'><h4 class='media-heading'>"+friends[j].name+"<br><small class='country'>Chile</small></h4><hr style='margin:8px auto'><button type='button' class='btn delete-btn btn-circle'><i class='glyphicon glyphicon-remove'></i></button></div></div></div>");

 };

 for(var n=0; n<artist.length; n++){
  $(".artist-data").append("<div class='col-lg-3 col-xs-6 sinpadding secondArtist'><a href='#''><img class='opacityImg imgRight' src='"+artist[n].photo+"'></a></div>");
 };
 for(var m=0; m<disc.length; m++){
  $(".disc-data1").append("<div class='col-lg-3 col-xs-6 sinpadding secondArtist'><a href='#'><img class='opacityImg imgRight' src='"+disc[m].photo+"'></a></div>");
 };

 $(".delete-btn").click(function(){
    $(this).parent().parent().remove();
  var counter = parseInt($("#follow").text());
    counter--;
    $("#follow").text(counter);

   });
 for(var k=0;k<suggestion.length;k++){
  $(".suggestion-data").append("<div class='media friend1 center-block'><a class='pull-left' href='#'>"+suggestion[k].photo+"</a><div class='media-body'><h4 class='media-heading'>"+suggestion[k].name+"<br><small class='country'>Chile</small></h4><hr style='margin:8px auto'><button type='button' class='btn follow-btn'>Seguir<i class='glyphicon glyphicon-ok'></i></button></div></div></div>");
  
 };
  $(".follow-btn").click(function(){
    $(this).parent().parent().remove();
    var counter = parseInt($("#follow").text());
    counter++;
    $("#follow").text(counter);
  });
});
$(document).ready(function(){

});
/*CHAT EN TIEMPO REAL*/
  var txtName = document.getElementById("name-user-user");
  var txtMessage = document.getElementById("descripcionInput");
  var btnEnviar1 = document.getElementById("btnEnviar1");
  var chatUl = document.getElementById("chatUl");

  btnEnviar1.addEventListener('click',function(){
  var name2 = txtName.value;
  var description = txtMessage.value;
  
   firebase.database().ref('chat').push({
    name:name2,
    message: description
   });
});

firebase.database().ref('chat')
.on('value',function(snapshot){
  var html = '';
  snapshot.forEach(function(e){
  var element = e.val();
  var name2 = element.name;
  var descripcion = element.message;
  html += "<li><div class='pin col-lg-6 col-lg-offset-3'><img class='user-comment' src='assets/images/raccoon.jpg'><h2 class='name-comment'>"+name2+"</h2><h4 class='hour-comment'></h4><p>"+descripcion+"</a></p><span class='fa fa-heart heart2'></span><span class='fa fa-trash'></span></div><li>";
  
  });
  chatUl.innerHTML = html;
  $(".heart2").click(function(){
  $(this).toggleClass("red-toggle");
});
   $(".fa-trash").click(function(){
  $(this).parent().remove();
});
});

/*función para log out*/
function out(){
  firebase.auth().signOut().then(function(){
    console.log("saliendo..");
    $(document).ready(function(){

  location.reload(); //recargo la página nuevamente

});
})
  .catch(function(error){
 console.log(error);
  });
};