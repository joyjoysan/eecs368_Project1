window.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    //START OF VERFYING PLAYER NAMES
	document.querySelector("#submit").addEventListener("click",() => {
        let player1 = document.querySelector("#player1NameInput").value;
        let player2 = document.querySelector("#player2NameInput").value;
        let player1NameIsValid = true;
        let player2NameIsValid = true;

        if(player1 == "" || player2 == ""){
            player1NameIsValid = false;
            player2NameIsValid = false;
            alert("Error: Name for Player 1 and Player 2 are required.");
        }
        if (player1NameIsValid == true && player2NameIsValid == true){
            for(let i = 0; i < player1.length; i++){
                if(player1.charAt(i) == " "){
                    player1NameIsValid = false;
                    break;
                }
            }
            for(let i = 0; i < player2.length; i++){
                if(player2.charAt(i) == " "){
                    player2NameIsValid = false;
                    break;
                }
            }
            if(player1NameIsValid == false || player2NameIsValid == false){
                alert("Sorry, player names cannot contain spaces.");
            }
        }
        if(player1NameIsValid == true && player2NameIsValid == true){
            if(player1.length > 10 || player2.length > 10){
                player1NameIsValid = false;
                player2NameIsValid = false;
                alert("Player names cannot exceed 10 characters.");
            }
        }
        if(player1NameIsValid == true || player2NameIsValid == true){
            if (player1 == player2){
                player1NameIsValid = false;
                player2NameIsValid = false;
                alert("Players cannot have the same name.");
            }
        }
        if (player1NameIsValid == true && player2NameIsValid == true){
            window.localStorage.setItem('player1', JSON.stringify(player1));
            window.localStorage.setItem('player2', JSON.stringify(player2));
            window.location.href = "game.html";
        }
    });
    //END OF VERYFYING PLAYER NAMES
});