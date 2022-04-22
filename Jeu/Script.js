window.onload = function()
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;

    init();
function init()
{
    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight; 
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    snakee = new Snake([[6,4], [5,4], [4,4]], "right");
    refreshCanvas();
}
function refreshCanvas()
{
    ctx.clearRect(0,0,canvasWidth, canvasHeight);
    sbake.advance();
    snakee.darw();
    setTimeout(refreshCanvas,delay);
}
function drawBlock(ctx, position)
{
    var x = position[0] * blockSize;
    var y = position[1] * blockSize;
    ctx.fillRect(x,y, blockSize, blockSize);
}
function Snake(body, direction)
{
    this.body = body;
    this.direction = direction;
    this.draw = function()
    {
        ctx.save();
        ctx.fillStyle = "red";
        for(var i = 0; i < this.body.length; i++)
        {
            drawBlock(ctx, this.body[i]);
        }
        ctx.restore();

    };
    this.advance = function()
    {
        var nextPosition = this.body[0].slice();
        switch(this.direction)
        {
            case "left":
                nextPosition[0] -= 1;
                break;
            case "right":
                nextPosition[0] += 1;
                break;
            case "down":
                nextPosition[1] += 1;
                break;
            case "up":
                nextPosition[1] -= 1;
                break;
            default:
                throw("Direction invalide"); 

        }
        this.body.unshift(nextPosition);
        this.body.pop();
    };
    this.setDirection = function(newDirection)
    {
         var alloweDirections;
         switch(this.direction)
         {
            case "left":
            case "right":
                alloweDirections = ["up", "down"];
                break;
            case "down":
            case "up":
                alloweDirections = ["left", "right"];
                break;
            default:
                throw("Direction invalide");
         }
         if(alloweDirections.indexOf(newDirection) > -1)
         {
          this.direction = newDirection;
         }
    };
}
document.onkeydown = function handleKeyDown(e)
{
    var key = e.keyCode;
    var newDirection;
    switch(key)
    { 
        case 37:
            newDirection = "left";
            break
        case 38:
            newDirection = "up";
            break;
        case 39:
            newDirection = "rigth"
            break;
        case 40:
            newDirection = "down";
            break;
        default:
            return;
    }
    snakee.setDirection(newDirection);
};
}
