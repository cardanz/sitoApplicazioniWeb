var token = window.localStorage.token;

// apro l'inserimento di un nuovo post
$("#new-post-button").click(function() { //listener
	$("#new-post-dialog").css("display", "flex");
});

// chiudo il precedente "X"
$("#new-post-close-button").click(function() { //listener
	$("#new-post-dialog").css("display", "none");
});

//invio un post al server
$("#send-new-post-button").click(function() {
	var data = {};
	var x = false;
	//Fare controllo testo e titolo vuoti non concessi entrambi 
	
	data.title = $("#title").val();
	data.message = $("#message").val();

	if(String(data.title).length < 1){
		alert("inserire un titolo prima di inviare il post")
		x = true;	
	}
	if(String(data.message).length<1){
		alert("inserire un testo prima di inviare il post")
		x = true;	
	}
	// eseugo un controllo concedo titoli uguali solo fra username 
	// diverse altrimenti errore
	if(x === false){
		$.post(SERVER_URL + "POST/post.php?token=" + token, data, function(data) {
			if(data.ispresent) {
				alert("post non inserito titola già utilizzatto dall'utente");
			}else{
				$("#new-post-dialog").css("display", "none");
				getPosts();
				// aggiorno post
			}
			
		});
	}
});

// gestione motore di ricerca
$("#search-engine").click(function() {
	var data = {};
	var x = false;  
	data.word = $("#search").val();
	if(String(data.word).length < 1){
		alert("inserire un titolo prima di iniziare la ricerca")
		x = true;	
	}
	// se non ho inserito un titolo è inutile cercarlo
	if(x === false){
    	$("#posts-content").empty();
		$.post(SERVER_URL + "motoreRicerca.php?token=" + token, data, function(posts) {
       		posts.forEach(function(post) {
				/////// errore cambia rischio problemi con input malevolo
            	//$("#posts-content").prepend("<div class='post'><div class='post-card'><span class='title'>" + post.title + "</span><p class='message'>" + post.message + "</p><span class='author'>- " + post.creator + "</span></div></div>");
				var $div = $('<div class=\'post\'>');
				var $div2 = $('<div class=\'post-card\'>');
				var $span1 = $('<span class=\'title\'>');
				var $p = $('<p class = \'message\'>');
				var $span2 = $('<span class=\'author\'>');

				$span2.append($('<p>', {text: post.creator}));

				$p.append($('<p>', {text: post.message}));
				$p.append($span2);

				$span1.append($('<p>' ,{text: post.title}));
				$span1.append($p);
			
				$div2.append($span1);
				$div.append($div2);
				$("#posts-content").prepend($div);
				});
        	});
	}
});

// cancellazione post
$("#delete").click(function() {
	var data = {};
	var x = false;
	data.word = $("#titles").val();
	if(String(data.word).length < 1){
		alert("inserire un titolo per cancellare il post")
		x = true;	
	}
	if(x === false){
		$.post(SERVER_URL + "deletes.php?token=" + token, data, function() {
			$("#new-post-dialog").css("display", "none");
			getPosts();
		});
	}	
});

// funzione per ottenere tutti i post gia inseriti da tutti gli utenti
function getPosts() {
	$("#posts-content").html("");
	$.get(SERVER_URL + "GET/posts.php?token=" + token, function(posts) {
		posts.forEach(function(post) {
			var $div = $('<div class=\'post\'>');
			var $div2 = $('<div class=\'post-card\'>');
			var $span1 = $('<span class=\'title\'>');
			var $p = $('<p class = \'message\'>');
			var $span2 = $('<span class=\'author\'>');

			$span2.append($('<p>', {text: post.creator}));

			$p.append($('<p>', {text: post.message}));
			$p.append($span2);

			$span1.append($('<p>' ,{text: post.title}));
			$span1.append($p);

			$div2.append($span1);
			$div.append($div2);
			
			$("#posts-content").append($div);
		});
	});
}
// per averli  fin da subito senza aver ancora pubblicato nulla
getPosts()