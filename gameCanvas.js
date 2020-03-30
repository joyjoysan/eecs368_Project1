window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        
        draw();
    }

    function draw(){
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        //Grid
        context.fillStyle = 'blue';
        let numx = 350;
        let numy = 95;
        for(let i = 1; i <= 7; i++){
            numx = numx + 90
            numy = 95;
            context.fillRect(numx,numy,75,75);           
            for(let m = 1; m <= 5; m++){
                numy = numy + 90
                context.fillRect(numx,numy,80,80)
            }
        }

        //Slot Buttons
    }

});
