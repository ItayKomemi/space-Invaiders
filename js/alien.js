'use strict'

var gAliensTopRowIdx = 1
var gAliensBottomRowIdx = 12
var gIsAlienFreeze 


function createAliens(board) {

    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
        for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
            board[i][j].gameObject = ALIEN
        }
    }
    return board
}

function handleAlienHit(pos) { 
    if (gBoard[pos.i][pos.j].gameObject === ALIEN){
        gBoard[pos.i][pos.j].gameObject = null
        gGame.aliensCount--
        gScore += 10
        chackGameOver()
    }
    var elScore = document.querySelector('.score span')
    elScore.innerText = gScore
}

function onStopAlien(){
    if(gIsAlienFreeze){
        gIsAlienFreeze = false
        gFreezeInterval = setInterval(moveAliens,5000)
        console.log('unFreeze');
    }else{
        gIsAlienFreeze = true
        clearInterval(gFreezeInterval)
        console.log('freeze');
    }
}

function moveAliens() {

}


function shiftBoardRight(board, fromI, toI) {

}

function shiftBoardLeft(board, fromI, toI) {

}

function shiftBoardDown(board, fromI, toI) {

}
