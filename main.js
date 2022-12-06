var $btnStart = document.querySelector('#start')
var $gameField = document.querySelector('#game')
var $playTime = document.querySelector('#time')
var $totalScore = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $scoreHeader = document.querySelector('#result-header')
var $inputGameTime = document.querySelector('#game-time')

var score = 0
var isGameStarted = false

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function setGameTime() {
    var timeFromInput = +$inputGameTime.value
    $playTime.textContent = timeFromInput.toFixed(1)

    show($timeHeader)
    hide($scoreHeader)
}


function clearGameField() {
    $gameField.innerHTML = ''
}

function endGame() {
    isGameStarted = false

    setGameScore()
    $inputGameTime.removeAttribute('disabled')

    clearGameField()

    $gameField.style.backgroundColor = '#ccc'
    show($btnStart)

    hide($timeHeader)
    show($scoreHeader)
}

function startGame() {
    setGameTime()

    $inputGameTime.setAttribute('disabled', 'true')
    isGameStarted = true

    hide($btnStart)
    $gameField.style.backgroundColor = '#fff'

    var interval = setInterval(function () {
        var playTime = parseFloat($playTime.textContent)

        if (playTime <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $playTime.textContent = (playTime - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

$btnStart.addEventListener('click', startGame)

$gameField.addEventListener('click', handleBoxClick)

$inputGameTime.addEventListener('input', setGameTime)


function setGameScore() {
    $totalScore.textContent = score.toString()
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return 0
    }

    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function generateBox(min, max) {
    var box = document.createElement('div')
    var boxSize = getRandom(min, max)

    // Random red (0-255), blue and greed | EXAMPLE: rgb(210,63,192)
    var colors = [0, 0, 0]

    for (var i = 0; i < colors.length; i++) {
        colors[i] = Math.floor(Math.random() * 254)
    }

    console.log(colors);
    box.style.backgroundColor = `rgb(${colors[0]} ${colors[1]} ${colors[2]})`
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    return [box, boxSize]
}

function calculateTopAndLeftCoordinates(boxSize) {
    var gameFieldSize = $gameField.getBoundingClientRect()

    var maxTop = gameFieldSize.height - boxSize - 5
    var maxLeft = gameFieldSize.width - boxSize - 5

    return [maxTop, maxLeft]
}

function renderBox() {
    clearGameField()

    var generatedBox = generateBox(30, 100)
    var calculatedCoordinates = calculateTopAndLeftCoordinates(generatedBox[1])

    generatedBox[0].style.top = getRandom(0, calculatedCoordinates[0]) + 'px'
    generatedBox[0].style.left = getRandom(0, calculatedCoordinates[1]) + 'px'

    $gameField.insertAdjacentElement('afterbegin', generatedBox[0])
}
