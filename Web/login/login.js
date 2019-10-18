$("#form").submit(function() { //listener
	var data = {};

	data.username = $("#username").val();
	//con questi due si blocca completamente il sito
	//data.username =document.getElementById("username");
	//data.username =document.getElementById("password");
	data.password = $("#password").val();

	$.post(SERVER_URL + "AUTH/login.php", data, function(data) {
		if (data.hasLoggedIn) { 
		   window.localStorage.token = data.token;
		   window.location.href = WEB_URL + "main2.html";
		} else {
			alert("Password non corretta");
		}
	});	
});
