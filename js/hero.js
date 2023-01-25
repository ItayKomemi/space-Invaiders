'use strict'

const LASER_SPEED = 80
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }


function createHero(board) {

    board[gHero.pos.i][gHero.pos.j].gameObject = HERO

}

function onKeyDown(event) {

    switch (event.key) {
        case 'ArrowLeft':
            gHero.pos.j -= 1
            updateCell(gHero.pos, HERO)
            break;
        case 'ArrowRight':
            gHero.pos.j += 1
            updateCell(gHero.pos, HERO)
            break;
        case ' ':
            blinkLaser(gHero.pos)
    }
}

function blinkLaser(pos) {

    var display = updateCell(pos, HERO)
    for (var i = 0; i <= pos.i; i++) {
        if (i === 0) continue
        for (var j = 0; j < pos.i; j++) {
            var currRow = { i: display.i - i, j: display.j }
        }
        handleAlienHit(currRow)
        var elCell = getElCell(currRow)
        elCell.innerHTML = LASER
        setTimeout(updateCell, 100, currRow)
    }
}