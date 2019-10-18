var token = window.localStorage.token;

function precompilazione(){
	var data = {};
	$.post(SERVER_URL + "precompilazione.php?toke=", data, function(data){
		//stampa a video nei campi del form!!!
	});
};

precompilazione();

$("#changefirstname").click(function() { //listener
	//pulsante in ascolto
	var data = {};
  data.newfirstname = $("#firstname").val();  

		$.post(SERVER_URL + "modificaProfilo.php?token=" + token, data, function(data) {
			if (data.hasLoggedIn) {
				// ho deciso di segnalare anche la corretta modifica
        alert("nome modificato correttamente");
			}else
				alert("nome non modificato ");
		});
	
});	

// analogo del precedente con cognome
$("#changelastname").click(function() { //listener
	// pulsante in ascolto
	var data = {};
	data.newlastname = $("#lastname").val();  
	
		$.post(SERVER_URL + "modificaCognome.php?token=" + token, data, function(data) {
			if (data.hasLoggedIn) {
				alert("cognome modificato correttamente");
			}else
				alert("cognome non modificato");
		});
});	

//idem per la città
$("#changecity").click(function() { //listener
	var data = {};
	data.newcity = $("#city").val();  
		$.post(SERVER_URL + "modificaCitta.php?token=" + token, data, function(data) {
		if (data.hasLoggedIn) {
			 alert("città modificata correttamente");
		 }else
					alert("città non modificato");
			});
	});	

//modifica la password qui in più verifico che le due nuove password
// siano sufficentemente lunghe ()>= 6) e che siano coincidenti
// inoltre chiedo di reinserire l'ultima passowrd
$("#changepassword").click(function() { //listener
		var data = {};
		data.newpassword = $("#newpassword").val();
		data.oldpassword = $("#oldpassword").val();
		data.conferma = $("#conferma").val();
		
			$.post(SERVER_URL + "modificaPassword.php?token=" + token, data, function(data) {
				if (data.hasLoggedIn) {
					alert("passowrd modificato correttamente");
				}else
					alert("password non modificato");
			});
});	


function precompe(){
	var data ={};
	$.post(SERVER_URL + "precompilazione.php?token=" + token, data, function(data){});
}

    
	

