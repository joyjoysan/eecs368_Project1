window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        
        drawCanvas();
    }

    function drawCanvas(){
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        //Grid-Squares
        let numx = 250;
        let numy = 95;
        for(let i = 1; i <= 7; i++){
            numx = numx + 90;
            numy = 95;
            fillSquares(numx, numy)
            fillBorder(numx, numy);
            fillCircle(numx, numy);
            for(let m = 1; m <= 5; m++){
                numy = numy + 90
                fillSquares(numx, numy);
                fillBorder(numx, numy);
                fillCircle(numx, numy);
            }
        }


        function fillSquares(numx, numy){
            context.beginPath();
            context.rect(numx,numy,75,75);   
            context.fillStyle = "rgba(102, 178, 255, 1)";
            context.fill();
        }

        function fillBorder(numx, numy){
            context.lineWidth = 10;
            context.strokeStyle = "rgba(31, 136, 255, 1)";
            context.strokeRect(numx, numy, 80, 80);
        }

        function fillCircle(numx, numy){
            context.beginPath();
            context.arc(numx + 40, numy + 40, 30, 0, 2 * Math.PI, false);
            context.fillStyle = "white";
            context.fill();
        }
    }

    



});
