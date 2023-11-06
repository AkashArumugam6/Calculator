// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create buttons for minimizing, going fullscreen, and closing the calculator
const calculatorContainer = document.createElement("div");
calculatorContainer.id = "calculator-container";

const minimizeIcon = document.createElement("button");
minimizeIcon.id = "minimize-button";

const fullscreenIcon = document.createElement("button");
fullscreenIcon.id = "fullscreen-button";

const closeIcon = document.createElement("button");
closeIcon.id = "close-button";

calculatorContainer.appendChild(minimizeIcon);
calculatorContainer.appendChild(fullscreenIcon);
calculatorContainer.appendChild(closeIcon);

document.body.appendChild(calculatorContainer);

// Define button dimensions and font properties
const buttonWidth = 120;
const buttonHeight = 100;
const buttonMargin = 10;
ctx.font = "bold 40px Roboto";

// Define an array of buttons with their respective text and positions
const buttons = [
    [" ", 0, 200],
    [" ", 120, 200],
    [" ", 240, 200],
    ["%", 360, 200],
    ["/", 480, 200],
    ["(", 0, 300],
    ["7", 120, 300],
    ["8", 240, 300],
    ["9", 360, 300],
    [")", 0, 400],
    ["4", 120, 400],
    ["5", 240, 400],
    ["6", 360, 400],
    ["Back", 0, 500],
    ["1", 120, 500],
    ["2", 240, 500],
    ["3", 360, 500],
    ["0", 0, 600, 3],
    [".", 360, 600],
    ["x", 480, 300],
    ["-", 480, 400],
    ["+", 480, 500],
    ["=", 480, 600],   
];

// Function to draw the calculator buttons and interface
function drawCalculator(){

    ctx.fillStyle = '#4f4f53';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    buttons.forEach((button) => {
        const [text, x, y] = button;
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#4f4f53";
        if (text === "0") {
            ctx.strokeRect(x, y, buttonWidth * 3, buttonHeight);
        } else {
            ctx.strokeRect(x, y, buttonWidth, buttonHeight);
        }
        
        ctx.lineWidth = 1;
        ctx.fillStyle = "#787a7e";
        if(y == 200){
            ctx.fillStyle = "#5e6065";
        }
        if(x == 480){
            ctx.fillStyle = "#ff9f0c";
        }
        if (text === "0") {
            ctx.fillRect(x, y, buttonWidth * 3, buttonHeight);
        } else {
            ctx.fillRect(x, y, buttonWidth, buttonHeight);
        }
        ctx.fillRect(x, y, buttonWidth, buttonHeight);
        ctx.fillStyle = "#ebebec";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let textX = x + 120 / 2;
        if (text === "0"){
            textX = x + 360 / 2;
        } 
        const textY = y + 100 / 2;
        ctx.fillText(text, textX, textY);

        
    });
}

// Initialize input and result variables
let input = "";
let result = "";


// Click event listener to the canvas for caluclator operations
canvas.addEventListener("click", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    
    for (const button of buttons) {
        const [text, buttonX, buttonY, colspan = 1] = button;
        const actualButtonWidth = buttonWidth * colspan;

        if (x >= buttonX && x <= buttonX + actualButtonWidth && y >= buttonY && y <= buttonY + buttonHeight) {
            if (text === "Back") {
                input = input.slice(0, -1);
                result = " ";
            }
            else if (text === "=") {
                
                try {
                    // Replacing 'x' with '*' for multiplication and evaluate the expression
                    const expression = input.replace(/x/g, '*');
                    result = eval(expression);
                } catch (error) {
                    result = "Invalid Expression";
                }
            } 
    
            else if (input === " ") {
                result = "0";
            }
            else {  
                input += text;
            }
            
            // Clear the canvas, redraw the calculator, and display input and result
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCalculator();

            ctx.fillStyle = "#ebebec";
            ctx.textBaseline = "middle";

            ctx.textAlign = 'right';
            ctx.fillText(input,canvas.width - 20, 100);
            
            ctx.textAlign = 'right';
            ctx.fillText(result, canvas.width - 20 , 150);
            
            break;
        }
    }
});

drawCalculator();
