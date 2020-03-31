window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        
        drawCanvas2();
    }

    function drawCanvas2(){
        const canvas2 = document.getElementById('canvas2');
        const context2 = canvas2.getContext('2d');

        context2.arc(380, 135, 30, 0, Math.PI * 2);
        context2.fillStyle = "black";
        context2.fill();

        console.log("drawCanvas2 is running");
        console.log(document.getElementById('canvas2').height);
 
        context2.arc(510, 135, 30, 0, Math.PI * 2);
        context2.fillStyle = "black";
        context2.fill();
 
 
        context2.arc(380, 225, 30, 0, Math.PI * 2);
        context2.fillStyle = "black";
        context2.fill();
    }
});