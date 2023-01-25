'use strict'


const ALIEN = '👽'
const HERO = '🗽'
const LASER = '⤊'
const GROUND = '🌾'
const SKY = ''

const ROWS = 14
const COLS = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 1


var gBoard
var gScore
var gFreezeInterval
var gGame = {
    isOn: false,
    aliensCount: ALIENS_ROW_LENGTH * ALIENS_ROW_COUNT
}

function onInit() {
    gHero.pos = { i: 12, j: 5 }
    gScore = 0
    gGame.aliensCount = ALIENS_ROW_LENGTH * ALIENS_ROW_COUNT

    // gFreezeInterval = setInterval(moveAliens,5000)

    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

    var elBtn = document.querySelector('.restart')
    elBtn.style.display = 'none'

    var elScore = document.querySelector('.score span')
    elScore.innerText = 0

    gBoard = createBoard()
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)
}


function createBoard() {
    var board = []

    for (var i = 0; i < ROWS; i++) {
        board[i] = []
        for (var j = 0; j < COLS; j++) {
            board[i][j] = createCell()

            if (i === (13)) {
                board[13][j].gameObject = GROUND
            }
            if (!board[i][j].gameObject) board[i][j].gameObject = ''
        }
    }

    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            strHTML += `<td data-i="${i}" data-j="${j}">${board[i][j].gameObject}</td>`
        }
        strHTML += '</tr>'
    }

    var elBoard = document.querySelector('.container')
    elBoard.innerHTML = strHTML

    return elBoard
}

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function updateCell(pos, gameObject = null) {

    if (pos.j < 0 || pos.j > gBoard.length - 1) return
    if (gBoard[pos.i][pos.j].gameObject === ALIEN) return

    gBoard[pos.i][pos.j].gameObject = '';
    var elCell = getElCell(pos);
    elCell.innerHTML = '';


    gBoard[pos.i][pos.j].gameObject = gameObject;

    elCell = getElCell(pos);
    elCell.innerHTML = gameObject || '';

    return pos
}

function chackGameOver() {

    if (gGame.aliensCount === 0) {
        var elModal = document.querySelector('.modal')
        elModal.style.display = 'block'

        var elBtn = document.querySelector('.restart')
        elBtn.style.display = 'block'
    }

}