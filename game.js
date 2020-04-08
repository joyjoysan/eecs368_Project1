window.addEventListener('DOMContentLoaded', () => {
    //------------------ Global Variables -----------------------
    let currentPlayer = null;
    let player1 = localStorage.getItem("player1");
    let player2 = localStorage.getItem("player2");
    player1Won = false;
    player2Won = false;
    let allHoverPieces = document.querySelectorAll(".hovPiece");
    const NUMX_BASE = 340;
    const NUMY_BASE = 95;
    const MULT_VALUE = 90; 
    //let numxMultiplier = [0, 1, 2, 3, 4, 5, 6];
    //let numyMultiplier = [0, 1, 2, 3, 4, 5,]; 
    let filledSlots = [false, false, false, false, false, false, false];
    //-----------------------------------------------------------
    //---------- Initialize canvas ------------------------------
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    //-----------------------------------------------------------

    //----------------------Functions for Canvas Drawing------------------------------
    function fillSquares(numx, numy){
        context.beginPath();
        context.rect(numx,numy,75,75);   
        context.fillStyle = "rgba(102, 178, 255, 1)";
        context.fill();
    }
    function fillBorderSquare(numx, numy){
        context.lineWidth = 10;
        context.strokeStyle = "rgba(31, 136, 255, 1)";
        context.strokeRect(numx, numy, 80, 80);
    }
    function fillCircle(numx, numy, fillColor){
        context.beginPath();
        context.arc(numx + 40, numy + 40, 30, 0, 2 * Math.PI, false);
        context.fillStyle = fillColor;
        context.fill();
    }
    function fillBorderCirc(numx, numy, borderColor){
        context.beginPath();
        context.arc(numx + 40, numy + 40, 30, 0, 2 * Math.PI, false);
        context.strokeStyle = borderColor;
        context.lineWidth = 5;
        context.stroke();
    }
    //---------------------------------------------------------------------------------

    //----------------------------- Containers ----------------------------------
    let arr2DColor = [ ["blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank"], 
    ["blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank"] ];
    let arr2D = [ [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false], 
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false] ];
    //----------------------------------------------------------------------------

    //----------------------- Functions for Resizing -----------------------------
    function resizeCanvas(){
        canvas.width = window.innerWidth;
        drawCanvas();
        reInsertPieces();
    }
    function reInsertPieces(){
        for(let i = 0; i < 7; i++){
            for(let m = 0; m < 6; m++){
                if(arr2DColor[i][m] == "red"){
                    fillCircle(NUMX_BASE + (i * MULT_VALUE), NUMY_BASE + (m * MULT_VALUE), "red");
                    fillBorderCirc(NUMX_BASE + (i * MULT_VALUE), NUMY_BASE + (m * MULT_VALUE), "crimson");
                }
                else if(arr2DColor[i][m] == "yellow"){
                    fillCircle(NUMX_BASE + (i * MULT_VALUE), NUMY_BASE + (m * MULT_VALUE), "yellow");
                    fillBorderCirc(NUMX_BASE + (i * MULT_VALUE), NUMY_BASE + (m * MULT_VALUE), "rgb(255,223,0)");
                }
                else if(arr2DColor[i][m] == "white"){
                    fillCircle(NUMX_BASE + (i * MULT_VALUE), NUMY_BASE + (m * MULT_VALUE), "white");
                    fillBorderCirc(NUMX_BASE + (i * MULT_VALUE), NUMY_BASE + (m * MULT_VALUE), "white");
                }
            }
        }
    }
    function drawCanvas(){
        let numxDraw = 250;
        let numyDraw = 95;
        for(let i = 0; i < 7; i++){
            numxDraw = numxDraw + 90;
            numyDraw = 95;
            fillSquares(numxDraw,numyDraw);
            fillBorderSquare(numxDraw,numyDraw);
            fillCircle(numxDraw,numyDraw,"white");
            for(let m = 0; m < 5; m++){
                numyDraw = numyDraw + 90;
                fillSquares(numxDraw,numyDraw);
                fillBorderSquare(numxDraw,numyDraw);
                fillCircle(numxDraw,numyDraw,"white");
            }
        }
    }
    //----------------------------------------------------------------------------

    //----------- More Functions ----------------------------------------------
    function checkAccessViolation(){
        if(JSON.parse(localStorage.getItem("player1")) == null){
            window.location.href = "menu.html";
        }
    }
    function displayPlayerNames(){
        let player1Name = JSON.parse(localStorage.getItem('player1'));
        let player2Name = JSON.parse(localStorage.getItem('player2'));
        document.querySelector('#player1Name').innerHTML = player1Name;
        document.querySelector('#player2Name').innerHTML = player2Name;
    }
    function playerRandomizer(){
        let f = Math.floor(Math.random() * 2);
        if (f == 0){
            //console.log(localStorage.getItem("pvpPlayer1") + " goes first.");
            currentPlayer = player1;
            document.querySelector("#player1Name").style.backgroundColor = "aquamarine";
            for(let i = 0; i < allHoverPieces.length; i++){
                allHoverPieces[i].style.borderColor = "crimson";
                allHoverPieces[i].style.backgroundColor = "red";
            }
        }
        else if (f == 1){
            currentPlayer = player2;
            document.querySelector("#player2Name").style.backgroundColor = "aquamarine";
            for(let i = 0; i < allHoverPieces.length; i++){
                allHoverPieces[i].style.borderColor = "rgb(255,223,0)";
                allHoverPieces[i].style.backgroundColor = "yellow";
            }
        }
    }
    function displayFirstPlayer(){
        if (currentPlayer == player1){
            document.querySelector("#firstPlayerDisplay").style.borderColor = "crimson";
            document.querySelector("#firstPlayerDisplay").style.backgroundColor = "red";
            document.querySelector("#firstPlayer").innerHTML = JSON.parse(player1) ;
        }
        else if(currentPlayer == player2){
            document.querySelector("#firstPlayerDisplay").style.borderColor = "rgb(255,223,0)";
            document.querySelector("#firstPlayerDisplay").style.backgroundColor = "yellow";
            document.querySelector("#firstPlayer").innerHTML = JSON.parse(player2);
        }
    }
    function switchCurrentPlayer(){
        if(currentPlayer == player1){
            currentPlayer = player2;
            document.querySelector("#player1Name").style.backgroundColor = "rgb(102, 178, 255)";
            document.querySelector("#player2Name").style.backgroundColor = "aquamarine";
            //Switch colors of hovering pieces to the currentPlayer's colors
            for(let i = 0; i < allHoverPieces.length; i++){
                allHoverPieces[i].style.borderColor = "rgb(255,223,0)";
                allHoverPieces[i].style.backgroundColor = "yellow";
            }
        }
        else{
            currentPlayer = player1;
            document.querySelector("#player2Name").style.backgroundColor = "rgb(102, 178, 255)";
            document.querySelector("#player1Name").style.backgroundColor = "aquamarine";
            //Switch colors of hovering pieces to the currentPlayer's colors
            for(let i = 0; i < allHoverPieces.length; i++){
                allHoverPieces[i].style.borderColor = "crimson";
                allHoverPieces[i].style.backgroundColor = "red";
            }
        }
    }
    function slotDisabler(slotNum){
        document.querySelector("#buttonSlot" + slotNum).disabled = true;
        filledSlots[slotNum - 1] = true;
        document.querySelector("#hoverPiece" + slotNum).style.display = "none";
        document.querySelector("#LOS" + slotNum).style.display = "none";
    }
    function hideFirstPlayerBox(){
        let opacity = 1;
        for(let i = 0; i < 5; i++){
            opacity = opacity - 0.2;
            setTimeout(function(){
                document.querySelector("#firstPlayerDisplay").style.opacity = "" + opacity + "";
            }, 2000);
        }
    }
    function temporarySlotButtonDisabler(){ //IF THE USER CLICKS TOO FAST, THERE ARE ERRORS. This is the solution for that problem.
        for(let i = 1; i <= 7; i++){
            document.querySelector("#buttonSlot" + i).disabled = true;
            document.querySelector("#hoverPiece" + i).style.display = "none";
            document.querySelector("#LOS" + i).style.display = "none";
        }
        setTimeout(function(){
            for(let i = 1; i <=7; i++){
                if(filledSlots[i-1] == false){
                    document.querySelector("#buttonSlot" + i).disabled = false;
                }
            }
        },300);
    }
    function recFindMatching4(col, row, color, numOfMatch, direction){ //recursive
        let colMaxVal = 6;
        let rowMaxVal = 5;
        console.log(numOfMatch);
        //Check ClockWise
        if (numOfMatch == 4){
            if(color == "red"){
                player1Won = true;
            }
            else if(color == "yellow"){
                player2Won = true;
            }
            return;
        }
        else{
            if(col+1 <= colMaxVal && row-1  >= 0 && direction == "none"){
                if (arr2DColor[col+1][row-1] == color){
                    recFindMatching4(col+1, row-1, color, numOfMatch+=1, "northEast");
                }
            }
            if(col+1 <= colMaxVal && direction == "none"){
                numOfMatch = 0;
                if(arr2DColor[col+1][row] == color){
                    recFindMatching4(col+1, row, color, numOfMatch+=1, "east");
                }
            }
            if(col+1 <= colMaxVal && row+1 <= rowMaxVal && direction == "none"){
                numOfMatch = 0;
                if(arr2DColor[col+1][row+1] == color){
                    recFindMatching4(col+1, row+1, color, numOfMatch+=1, "southEast");
                }
            }
            if(row+1 <= rowMaxVal && direction == "none"){
                numOfMatch = 0;
                if(arr2DColor[col][row+1] == color){
                    recFindMatching4(col, row+1, color, numOfMatch+=1, "south");
                }
            }
            if(col-1 >= 0 && row+1 <= rowMaxVal && direction == "none"){
                numOfMatch = 0;
                if(arr2DColor[col-1][row+1] == color){
                    recFindMatching4(col-1, row+1, color, numOfMatch+=1, "southWest");
                }
            }
            if(col-1 >= 0 && direction == "none"){
                numOfMatch = 0;
                if(arr2DColor[col-1][row] == color){
                    recFindMatching4(col-1, row, color, numOfMatch+=1, "west");
                }
            }
            if(col-1 >= 0 && row-1 >= 0 && direction == "none"){
                numOfMatch = 0;
                if(arr2DColor[col-1][row-1] == color){
                    recFindMatching4(col-1, row-1, color, numOfMatch+=1, "nortWest");
                }
            }
            if(col <= colMaxVal && row >= 0 && direction == "northEast"){
                if(arr2DColor[col][row] == color){
                    return recFindMatching4(col+1, row-1, color, numOfMatch+=1, "northEast");
                }
                else{
                    return recFindMatching4(col-(numOfMatch+1), row+(numOfMatch+1), color, numOfMatch, "southWest");
                }
            }
            if(col <= colMaxVal && direction == "east"){
                if(arr2DColor[col][row] == color){
                    return recFindMatching4(col+1, row, color, numOfMatch+=1, "east");
                }
                else{
                    return recFindMatching4(col-(numOfMatch + 1), row, color, numOfMatch, "west")
                }
            }
            if(direction == "southEast"){
                //col <= colMaxVal && row <= rowMaxVal && 
                if(arr2DColor[col][row] == color){
                    return recFindMatching4(col+1, row+1, color, numOfMatch+=1, "southEast");
                }
                else{
                    return recFindMatching4(col-(numOfMatch+1), row-(numOfMatch+1), color, numOfMatch, "northWest");
                }
            }
            if(row <= rowMaxVal && direction == "south"){
                if(arr2DColor[col][row] == color){
                    return recFindMatching4(col, row+1, color, numOfMatch+=1, "south");
                }
            }
            if(col >= 0 && row <= rowMaxVal &&direction == "southWest"){
                if(arr2DColor[col][row] == color){
                    return recFindMatching4(col-1, row+1, color, numOfMatch+=1, "southWest");
                }
            }
            if(col >= 0 && direction == "west"){
                if(arr2DColor[col][row] == color){
                    return recFindMatching4(col-1, row, color, numOfMatch+=1, "west");
                }
            }
            if(col >= 0 && row >= 0 && direction == "northWest"){
                if(arr2DColor[col][row] == color){
                    return recFindMatching4(col-1, row-1, color, numOfMatch+=1, "northWest");
                }
            }
        }
    }
    function displayWinner(player){
        document.querySelector("#whoWon").innerHTML = JSON.parse(player);
        document.querySelector("#playerWonDisplay").style.zIndex = 3;
        if(player == player1){
            document.querySelector("#whoWon").style.color = "red";
        }
        else if(player == player2){
            document.querySelector("#whoWon").style.color = "yellow";
        }
        document.querySelector("#backToMenu").disabled = false;
        document.querySelector("#rematch").disabled = false;  
        document.querySelector("#backToMenu").style.cursor = "pointer";
        document.querySelector("#rematch").style.cursor = "pointer"; 
    }
    function hideWinner(){
        document.querySelector("#playerWonDisplay").style.zIndex = -1;
        document.querySelector("#backToMenu").disabled = true;
        document.querySelector("#rematch").disabled = true; 
        document.querySelector("#backToMenu").style.cursor = "none";
        document.querySelector("#rematch").style.cursor = "none";
    }
    //-------------------------------------------------------------------------
    //-------------------------- Executive ------------------------------------
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
    hideWinner();

    checkAccessViolation();
    displayPlayerNames();
    playerRandomizer();
    displayFirstPlayer();
    hideFirstPlayerBox();
    //-------------------------------------------------------------------------

    //---------------------- BUTTON EVENT LISTENERS -------------------------------

    //---------------------- Exit Button ---------------------------------
    document.querySelector("#exitButton").addEventListener("click",() => {
        localStorage.clear();
        window.location.href = "menu.html";
    });
    //--------------------------------------------------------------------
    //--------- Slot buttons for highlighting columns upon hovering -------
    document.querySelector("#buttonSlot1").addEventListener("mouseover",() => {
        document.querySelector("#LOS1").style.display = "block";
    });
    document.querySelector("#buttonSlot1").addEventListener("mouseout",() => {
        document.querySelector("#LOS1").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot2").addEventListener("mouseover",() => {
        document.querySelector("#LOS2").style.display = "block";
    });
    document.querySelector("#buttonSlot2").addEventListener("mouseout",() => {
        document.querySelector("#LOS2").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot3").addEventListener("mouseover",() => {
        document.querySelector("#LOS3").style.display = "block";
    });
    document.querySelector("#buttonSlot3").addEventListener("mouseout",() => {
        document.querySelector("#LOS3").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot4").addEventListener("mouseover",() => {
        document.querySelector("#LOS4").style.display = "block";
    });
    document.querySelector("#buttonSlot4").addEventListener("mouseout",() => {
        document.querySelector("#LOS4").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot5").addEventListener("mouseover",() => {
        document.querySelector("#LOS5").style.display = "block";
    });
    document.querySelector("#buttonSlot5").addEventListener("mouseout",() => {
        document.querySelector("#LOS5").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot6").addEventListener("mouseover",() => {
        document.querySelector("#LOS6").style.display = "block";
    });
    document.querySelector("#buttonSlot6").addEventListener("mouseout",() => {
        document.querySelector("#LOS6").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot7").addEventListener("mouseover",() => {
        document.querySelector("#LOS7").style.display = "block";
    });
    document.querySelector("#buttonSlot7").addEventListener("mouseout",() => {
        document.querySelector("#LOS7").style.display = "none";
    });

    //Button hoovering pieces
    document.querySelector("#buttonSlot1").addEventListener("mouseover",() => {
        document.querySelector("#hoverPiece1").style.display = "block";
    });
    document.querySelector("#buttonSlot1").addEventListener("mouseout",() => {
        document.querySelector("#hoverPiece1").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot2").addEventListener("mouseover",() => {
        document.querySelector("#hoverPiece2").style.display = "block";
    });
    document.querySelector("#buttonSlot2").addEventListener("mouseout",() => {
        document.querySelector("#hoverPiece2").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot3").addEventListener("mouseover",() => {
        document.querySelector("#hoverPiece3").style.display = "block";
    });
    document.querySelector("#buttonSlot3").addEventListener("mouseout",() => {
        document.querySelector("#hoverPiece3").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot4").addEventListener("mouseover",() => {
        document.querySelector("#hoverPiece4").style.display = "block";
    });
    document.querySelector("#buttonSlot4").addEventListener("mouseout",() => {
        document.querySelector("#hoverPiece4").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot5").addEventListener("mouseover",() => {
        document.querySelector("#hoverPiece5").style.display = "block";
    });
    document.querySelector("#buttonSlot5").addEventListener("mouseout",() => {
        document.querySelector("#hoverPiece5").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot6").addEventListener("mouseover",() => {
        document.querySelector("#hoverPiece6").style.display = "block";
    });
    document.querySelector("#buttonSlot6").addEventListener("mouseout",() => {
        document.querySelector("#hoverPiece6").style.display = "none";
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot7").addEventListener("mouseover",() => {
        document.querySelector("#hoverPiece7").style.display = "block";
    });
    document.querySelector("#buttonSlot7").addEventListener("mouseout",() => {
        document.querySelector("#hoverPiece7").style.display = "none";
    });
    //------------------------------------------------------------------------

    //------------------ Slot buttons for inserting pieces -------------------
    document.querySelector("#buttonSlot1").addEventListener("click", () => {
        temporarySlotButtonDisabler();
        //check if slot is completely filled
        if(filledSlots[0] == false){
            //detect numyMultiplier
            let numyMultiplierVal = -1;
            for (let i = 5; i > (-1); i--){
                if (arr2D[0][i] == false){
                    numyMultiplierVal = i;
                    arr2D[0][i] = true;
                    if(currentPlayer == player1){
                        arr2DColor[0][i] = "red";
                        recFindMatching4(0, numyMultiplierVal, "red", 0, "none");
                        console.log("break");
                    }
                    else if (currentPlayer == player2){
                        arr2DColor[0][i] = "yellow";
                        recFindMatching4(0, numyMultiplierVal, "yellow", 0, "none");
                        console.log("break");
                    }
                    //console.log(arr2DColor);
                    //console.log("col: 0 row: " + i);
                    break;
                }
            }
            if(player1Won == true){
                displayWinner(player1);
            }
            if(player2Won == true){
                displayWinner(player2);
            }
            if (numyMultiplierVal == 0){
                slotDisabler(1);
            }
            if(currentPlayer == player1){
                fillCircle(NUMX_BASE + (0 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "red");
                fillBorderCirc(NUMX_BASE + (0 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "crimson");
                switchCurrentPlayer();
            }
            else if(currentPlayer == player2){
                fillCircle(NUMX_BASE + (0 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "yellow");
                fillBorderCirc(NUMX_BASE + (0 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "rgb(255,223,0)");
                switchCurrentPlayer();
            }
        }
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot2").addEventListener("click", () => {
        temporarySlotButtonDisabler();
        //check if slot is completely filled
        if(filledSlots[1] == false){
            //detect numyMultiplier
            let numyMultiplierVal = -1;
            for (let i = 5; i > (-1); i--){
                if (arr2D[1][i] == false){
                    numyMultiplierVal = i;
                    arr2D[1][i] = true;
                    if(currentPlayer == player1){
                        arr2DColor[1][i] = "red";
                        recFindMatching4(1, numyMultiplierVal, "red", 0, "none");
                        console.log("break");
                    }
                    else if (currentPlayer == player2){
                        arr2DColor[1][i] = "yellow";
                        recFindMatching4(1, numyMultiplierVal, "yellow", 0, "none");
                        console.log("break");
                    }
                    //console.log(arr2DColor);
                    //console.log("col: 1 row: " + i);
                    break;
                }
            }
            if(player1Won == true){
                displayWinner(player1);
            }
            if(player2Won == true){
                displayWinner(player2);
            }
            if (numyMultiplierVal == 0){
                slotDisabler(2); 
            }
            if(currentPlayer == player1){
                fillCircle(NUMX_BASE + (1 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "red");
                fillBorderCirc(NUMX_BASE + (1 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "crimson");
                switchCurrentPlayer();
            }
            else if(currentPlayer == player2){
                fillCircle(NUMX_BASE + (1 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "yellow");
                fillBorderCirc(NUMX_BASE + (1 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "rgb(255,223,0)");
                switchCurrentPlayer();
            }
        }
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot3").addEventListener("click", () => {
        temporarySlotButtonDisabler();
        //check if slot is completely filled
        if(filledSlots[2] == false){
            //detect numyMultiplier
            let numyMultiplierVal = -1;
            for (let i = 5; i > (-1); i--){
                if (arr2D[2][i] == false){
                    numyMultiplierVal = i;
                    arr2D[2][i] = true;
                    if(currentPlayer == player1){
                        arr2DColor[2][i] = "red";
                        recFindMatching4(2, numyMultiplierVal, "red", 0, "none");
                        console.log("break");
                    }
                    else if (currentPlayer == player2){
                        arr2DColor[2][i] = "yellow";
                        recFindMatching4(2, numyMultiplierVal, "yellow", 0, "none");
                        console.log("break");
                    }
                    break;
                }
            }
            if(player1Won == true){
                displayWinner(player1);
            }
            if(player2Won == true){
                displayWinner(player2);
            }
            if (numyMultiplierVal == 0){
                slotDisabler(3);
            }
            if(currentPlayer == player1){
                fillCircle(NUMX_BASE + (2 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "red");
                fillBorderCirc(NUMX_BASE + (2 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "crimson");
                switchCurrentPlayer();
            }
            else if(currentPlayer == player2){
                fillCircle(NUMX_BASE + (2 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "yellow");
                fillBorderCirc(NUMX_BASE + (2 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "rgb(255,223,0)");
                switchCurrentPlayer();
            }
        }
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot4").addEventListener("click", () => {
        temporarySlotButtonDisabler();
        //check if slot is completely filled
        if(filledSlots[3] == false){
            //detect numyMultiplier
            let numyMultiplierVal = -1;
            for (let i = 5; i > (-1); i--){
                if (arr2D[3][i] == false){
                    numyMultiplierVal = i;
                    arr2D[3][i] = true;
                    if(currentPlayer == player1){
                        arr2DColor[3][i] = "red";
                        recFindMatching4(3, numyMultiplierVal, "red", 0, "none");
                        console.log("break");
                    }
                    else if (currentPlayer == player2){
                        arr2DColor[3][i] = "yellow";
                        recFindMatching4(3, numyMultiplierVal, "yellow", 0, "none");
                        console.log("break");
                    }
                    break;
                }
            }
            if(player1Won == true){
                displayWinner(player1);
            }
            if(player2Won == true){
                displayWinner(player2);
            }
            if (numyMultiplierVal == 0){
                slotDisabler(4);
            }
            if(currentPlayer == player1){
                fillCircle(NUMX_BASE + (3 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "red");
                fillBorderCirc(NUMX_BASE + (3 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "crimson");
                switchCurrentPlayer();
            }
            else if(currentPlayer == player2){
                fillCircle(NUMX_BASE + (3 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "yellow");
                fillBorderCirc(NUMX_BASE + (3 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "rgb(255,223,0)");
                switchCurrentPlayer();
            }
        }
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot5").addEventListener("click", () => {
        temporarySlotButtonDisabler();
        //check if slot is completely filled
        if(filledSlots[4] == false){
            //detect numyMultiplier
            let numyMultiplierVal = -1;
            for (let i = 5; i > (-1); i--){
                if (arr2D[4][i] == false){
                    numyMultiplierVal = i;
                    arr2D[4][i] = true;
                    if(currentPlayer == player1){
                        arr2DColor[4][i] = "red";
                        recFindMatching4(4, numyMultiplierVal, "red", 0, "none");
                        console.log("break");
                    }
                    else if (currentPlayer == player2){
                        arr2DColor[4][i] = "yellow";
                        recFindMatching4(4, numyMultiplierVal, "yellow", 0, "none");
                        console.log("break");
                    }
                    break;
                }
            }
            if(player1Won == true){
                displayWinner(player1);
            }
            if(player2Won == true){
                displayWinner(player2);
            }
            if (numyMultiplierVal == 0){
                slotDisabler(5);
            }
            if(currentPlayer == player1){
                fillCircle(NUMX_BASE + (4 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "red");
                fillBorderCirc(NUMX_BASE + (4 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "crimson");
                switchCurrentPlayer();
            }
            else if(currentPlayer == player2){
                fillCircle(NUMX_BASE + (4 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "yellow");
                fillBorderCirc(NUMX_BASE + (4 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "rgb(255,223,0)");
                switchCurrentPlayer();
            }
        }
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot6").addEventListener("click", () => {
        temporarySlotButtonDisabler();
        //check if slot is completely filled
        if(filledSlots[5] == false){
            //detect numyMultiplier
            let numyMultiplierVal = -1;
            for (let i = 5; i > (-1); i--){
                if (arr2D[5][i] == false){
                    numyMultiplierVal = i;
                    arr2D[5][i] = true;
                    if(currentPlayer == player1){
                        arr2DColor[5][i] = "red";
                        recFindMatching4(5, numyMultiplierVal, "red", 0, "none");
                        console.log("break");
                    }
                    else if (currentPlayer == player2){
                        arr2DColor[5][i] = "yellow";
                        recFindMatching4(5, numyMultiplierVal, "yellow", 0, "none");
                        console.log("break");
                    }
                    break;
                }
            }
            if(player1Won == true){
                displayWinner(player1);
            }
            if(player2Won == true){
                displayWinner(player2);
            }
            if (numyMultiplierVal == 0){
                slotDisabler(6);
            }
            if(currentPlayer == player1){
                fillCircle(NUMX_BASE + (5 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "red");
                fillBorderCirc(NUMX_BASE + (5 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "crimson");
                switchCurrentPlayer();
            }
            else if(currentPlayer == player2){
                fillCircle(NUMX_BASE + (5 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "yellow");
                fillBorderCirc(NUMX_BASE + (5 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "rgb(255,223,0)");
                switchCurrentPlayer();
            }
        }
    });
    //------------------------------------------------------------------------
    document.querySelector("#buttonSlot7").addEventListener("click", () => {
        temporarySlotButtonDisabler();
        //check if slot is completely filled
        if(filledSlots[6] == false){
            //detect numyMultiplier
            let numyMultiplierVal = -1;
            for (let i = 5; i > (-1); i--){
                if (arr2D[6][i] == false){
                    numyMultiplierVal = i;
                    arr2D[6][i] = true;
                    if(currentPlayer == player1){
                        arr2DColor[6][i] = "red";
                        recFindMatching4(6, numyMultiplierVal, "red", 0, "none");
                        console.log("break");
                    }
                    else if (currentPlayer == player2){
                        arr2DColor[6][i] = "yellow";
                        recFindMatching4(6, numyMultiplierVal, "yellow", 0, "none");
                        console.log("break");
                    }
                    break;
                }
            }
            if(player1Won == true){
                displayWinner(player1);
            }
            if(player2Won == true){
                displayWinner(player2);
            }
            if (numyMultiplierVal == 0){
                slotDisabler(7);
            }
            if(currentPlayer == player1){
                fillCircle(NUMX_BASE + (6 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "red");
                fillBorderCirc(NUMX_BASE + (6 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "crimson");
                switchCurrentPlayer();
            }
            else if(currentPlayer == player2){
                fillCircle(NUMX_BASE + (6 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "yellow");
                fillBorderCirc(NUMX_BASE + (6 * MULT_VALUE), NUMY_BASE + (numyMultiplierVal * MULT_VALUE), "rgb(255,223,0)");
                switchCurrentPlayer();
            }
        }
    });
    //-------------------------------------------------------------------------------
    //---------------- Buttons in WinnerDisplay Window ------------------------------
    document.querySelector("#backToMenu").addEventListener("click",() => {
        localStorage.clear();
        window.location.href = "menu.html";
    });
    document.querySelector("#rematch").addEventListener("click",() => {
        location.reload();
    });
    //-------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
});
