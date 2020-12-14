let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x:8 * box,
    y:8 * box
}
let direction = "right";
let food = {
    x:Math.floor(Math.random() * 15 + 1) * box,
    y:Math.floor(Math.random() * 15 + 1) * box
}

//criando o background
function criarBG() {
    context.fillStyle = "LightCyan";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//criando a cobrinha
function criarCobrinha(){
    for (let i = 0; i < snake.length;i++){
        context.fillStyle = "Salmon";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "Crimson";
    context.fillRect(food.x, food.y, box, box);
}
//"escutando" as teclas pressionadas e chamando a função update
document.addEventListener('keydown', update);

//atribuindo a direção após checar a tecla pressionada e a direção anterior
function update (event){
    if(event.keyCode == 37 && direction != "right"){
        direction = "left";
    }
    if(event.keyCode == 38 && direction != "down"){
        direction = "up";
    }
    if(event.keyCode == 39 && direction != "left"){
        direction = "right";
    }
    if(event.keyCode == 40 && direction != "up"){
        direction = "down";
    }
}

function iniciarJogo(){

// lógica para que a cobrinha não desapareça da tela
// ao chegar na extremidade da tela e ultrapassar os limites, ela aparecerá novamente na posição 0
    if(snake[0].x > 15 * box && direction == "right"){
        snake[0].x = 0;
    }
    if(snake[0].x < 0 && direction == "left"){
        snake[0].x = 16 * box;
    }
    if(snake[0].y > 15 * box && direction == "down"){
        snake[0].y = 0;
    }
    if(snake[0].y < 0 && direction == "up"){
        snake[0].y = 16 * box;
    }

    //checar se a cobrinha se choca com o seu próprio corpo para parar o jogo
    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(iniciarJogo);
            alert('GAME OVER. Recarregue a Página');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

//lógica para a movimentação da cobrinha
    if(direction == "right"){
        snakeX += box;
    }
    if(direction == "left"){
        snakeX -= box;
    }
    if(direction == "up"){
        snakeY -= box;
    }
    if(direction == "down"){
        snakeY+=box;
    }

    //condições para aumentar o tamanho da cobrinha e fazer a comida surgir em outro lugar
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 200);
