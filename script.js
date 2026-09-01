const questions = [
    {
        question: "Qual é o modelo e o ano do carro icônico dos irmãos Winchester?",
        options: ["Chevrolet Impala 1967", "Ford Mustang 1969", "Dodge Charger 1970", "Chevrolet Chevelle 1968"],
        answer: 0
    },
    {
        question: "Qual é o nome do anjo que resgatou Dean do Inferno?",
        options: ["Gabriel", "Uriel", "Castiel", "Lucifer"],
        answer: 2
    },
    {
        question: "Qual é a substância usada para prender ou repelir demônios e fantasmas?",
        options: ["Açúcar", "Sal", "Prata", "Enxofre"],
        answer: 1
    },
    {
        question: "Quem é o pai de Sam e Dean?",
        options: ["Bobby Singer", "John Winchester", "Henry Winchester", "Samuel Campbell"],
        answer: 1
    },
    {
        question: "Qual é a comida favorita de Dean Winchester?",
        options: ["Hambúrguer", "Torta (Pie)", "Pizza", "Tacos"],
        answer: 1
    },
    {
        question: "Qual demônio de olhos amarelos foi o responsável pela morte de Mary Winchester?",
        options: ["Crowley", "Azazel", "Alistair", "Yellow-Eye"],
        answer: 1
    },
    {
        question: "Quem é o Rei do Inferno que frequentemente ajuda e atrapalha os irmãos?",
        options: ["Lucifer", "Azazel", "Crowley", "Abaddon"],
        answer: 2
    },
    {
        question: "Qual é o nome da música tema não oficial da série, tocada nos finais de temporada?",
        options: ["Back in Black", "Carry On Wayward Son", "Heat of the Moment", "Eye of the Tiger"],
        answer: 1
    },
    {
        question: "Qual objeto lendário é capaz de matar quase qualquer ser sobrenatural?",
        options: ["A Faca de Ruby", "A Colt", "A Lança de São Miguel", "A Primeira Lâmina"],
        answer: 1
    },
    {
        question: "Quem se torna a figura paterna e principal aliado dos irmãos após a morte de John?",
        options: ["Garth", "Rufus", "Bobby Singer", "Frank"],
        answer: 2
    },
    {
        question: "Qual é o nome verdadeiro do Arcanjo que se passa pelo 'Brincrahao' (Trickster)?",
        options: ["Raphael", "Gabriel", "Michael", "Metatron"],
        answer: 1
    },
    {
        question: "Qual é a cidade secreta onde fica o Bunker dos Homens das Letras?",
        options: ["Lawrence, Kansas", "Lebanon, Kansas", "Sioux Falls, Dakota do Sul", "Chicago, Illinois"],
        answer: 1
    },
    {
        question: "O que a Marca de Caim faz com quem a carrega?",
        options: ["Concede imortalidade sem efeitos colaterais", "Transforma em anjo", "Cria uma sede incontrolável de matar", "Faz a pessoa ler mentes"],
        answer: 2
    },
    {
        question: "Qual é o nome da mãe de Crowley, uma bruxa poderosa?",
        options: ["Rowena", "Meg", "Ruby", "Lilith"],
        answer: 0
    },
    {
        question: "Quem é revelado como sendo 'Deus' no universo da série?",
        options: ["Chuck Shurley", "Kevin Tran", "Metatron", "Jack"],
        answer: 0
    },
    {
        question: "Qual símbolo os irmãos têm tatuado no peito para evitar a possessão demoníaca?",
        options: ["Um Pentagrama com Asas", "Um Pentagrama Anti-Possessão", "Uma Cruz Latina", "O Olho de Hórus"],
        answer: 1
    },
    {
        question: "Quem é o Nephilim, filho de Lucifer com uma humana?",
        options: ["Jack Kline", "Alexander", "Jesse Turner", "Cole"],
        answer: 0
    },
    {
        question: "Qual é a profissão de fachada que Sam e Dean usam com mais frequência ao investigar?",
        options: ["Detetives particulares", "Agentes do FBI", "Jornalistas", "Caçadores de recompensas"],
        answer: 1
    },
    {
        question: "Em qual temporada Sam e Dean conhecem o anjo Castiel?",
        options: ["1ª Temporada", "3ª Temporada", "4ª Temporada", "5ª Temporada"],
        answer: 2
    },
    {
        question: "Qual o apelido afetuoso que Crowley costuma usar para Sam?",
        options: ["Garoto", "Alce (Moose)", "Gigante", "Nerd"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Elementos do DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumberEl = document.getElementById("question-number");
const scoreCounterEl = document.getElementById("score-counter");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");

const finalScoreEl = document.getElementById("final-score");
const resultMessageEl = document.getElementById("result-message");

// Event Listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", showNextQuestion);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreCounterEl.textContent = `Pontos: ${score}`;
    
    startScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    
    loadQuestion();
}

function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    
    questionNumberEl.textContent = `Pergunta ${currentQuestionIndex + 1}/${questions.length}`;
    questionTextEl.textContent = currentQuestion.question;

    currentQuestion.options.forEach((optionText, index) => {
        const button = document.createElement("button");
        button.textContent = optionText;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index));
        optionsContainerEl.appendChild(button);
    });
}

function resetState() {
    feedbackEl.classList.add("hide");
    feedbackEl.className = "feedback hide";
    nextBtn.classList.add("hide");
    optionsContainerEl.innerHTML = "";
}

function selectOption(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainerEl.children;

    for (let btn of optionButtons) {
        btn.disabled = true;
    }

    if (selectedIndex === currentQuestion.answer) {
        score++;
        scoreCounterEl.textContent = `Pontos: ${score}`;
        optionButtons[selectedIndex].classList.add("correct");
        feedbackEl.textContent = "Resposta Correta! Você conhece o negócio da família.";
        feedbackEl.classList.add("correct");
    } else {
        optionButtons[selectedIndex].classList.add("wrong");
        optionButtons[currentQuestion.answer].classList.add("correct");
        feedbackEl.textContent = "Resposta Incorreta! O leviatã/demônio te pegou.";
        feedbackEl.classList.add("wrong");
    }

    feedbackEl.classList.remove("hide");
    nextBtn.classList.remove("hide");
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    finalScoreEl.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;

    if (score === 20) {
        resultMessageEl.textContent = "Perfeito! Você é um caçador lendário ao nível de Dean e Sam Winchester!";
    } else if (score >= 15) {
        resultMessageEl.textContent = "Excelente! Você sobreviveria facilmente a várias temporadas.";
    } else if (score >= 10) {
        resultMessageEl.textContent = "Bom trabalho! Mas é bom estudar mais o diário do John.";
    } else {
        resultMessageEl.textContent = "Cuidado! Com esse conhecimento, você não duraria um episódio.";
    }
}