//obter os elementos necessários para o jogo
const scoreEl = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerEl = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultEl = document.querySelector("#score-result");
const wrapperEl = document.querySelector(".wrapper");

//objeto de cores atual e novo
const colorObj = {
    color1: {current: "#228B22", new: "#32CD32"},
    color2: {current: "#FF0000", new: "#FF6347"},
    color3: {current: "#0000CD", new: "#0000FF"},
    color4: {current: "#FFFF00", new: "#F0E68C"},
};

//variáveis ​​do jogo
let randomColors  = [];
let ispathGenerating = false;
let score = 0;
let clickCount = 0;

//função para obter uma cor aleatória
const getRandomColor = (colorsObj) => {
    const colorKeys = Object.keys(colorsObj);
    return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

//função para pausar a execução do jogo por um determinado período de tempo

const delay = async (time) => {
    return await new Promise((resolve) => setTimeout
    (resolve, time));
};

//função para gerar um caminho aleatório de cores

const generateRandomPath = async () => {
    randomColors.push(getRandomColor(colorObj));
    score = randomColors.length;
    ispathGenerating = true;
    await showPath(randomColors);
};

//função para mostrar o caminho da cor para o jogador

const showPath = async (colors) => {
    scoreEl.innerText = score;
    //loop
    for (let color of colors){
        const currentColor = document.querySelector(`.${color}`);
        //pausar a execução 
        await delay(500);
        //definir plano de fundo para nova cor
        currentColor.style.backgroundColor = colorObj[color].new;
        await delay(600);
        // configura o fundo para a cor antiga
        currentColor.style.backgroundColor = colorObj[color].current;
        await delay(600);
    }
    //definir sinalizador para indicar que o jogo não está mais gerando caminho
    ispathGenerating = false;
};
//função para terminar o jogo e mostrar a pontuação final
const endGame = () =>{
    resultEl.innerHTML = `<span> Pontuação: </span> ${score}`;
    resultEl.classList.remove("hide");
    containerEl.classList.remove("hide");
    wrapperEl.classList.add("hide");
    startBtn.innerText = "Jogar de novo";
    startBtn.classList.remove("hide");
};
//função para reiniciar o jogo
const resetGame = ()=>{
    score = 0;
    clickCount = 0;
    randomColors = [];
    ispathGenerating = false;
    wrapperEl.classList.remove("hide");
    containerEl.classList.add("hide");
    generateRandomPath();
};
//função para  uma cor que está sendo clicada
const hadleColorClick = async (e) => {
    // função para ignorar  o clique, caso o caminho esteja sendo gerado no momento
    if(ispathGenerating){
        return false;
    }
    //se a cor clicada estiver correta, atualize a pontuação e continue gerando o caminho
    if(e.target.classList.contains(randomColors[clickCount])){
        e.target.style.backgroundColor = colorObj
        [randomColors[clickCount]].new; 
        await delay(500);
        e.target.style.backgroundColor = colorObj
        [randomColors[clickCount]].current;
        clickCount++;
        if (clickCount === score){
            clickCount = 0;
            generateRandomPath();
        }
        //se a cor clicada estiver incorreta, finalizar o jogo
    }else {
        endGame();
    }
};

startBtn.addEventListener("click", resetGame);
colorParts.forEach((color)=> color.addEventListener
("click", hadleColorClick));