//Функция для перемешивания массива
Array.prototype.shuffle = function() {
    for (var i = this.length - 1; i > 0; i--) {
        var num = Math.floor(Math.random() * (i + 1));
        var d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
}

function winOrLose() {
    var isOk = true;
    count = document.getElementsByClassName("right");
    if(count.length < 12) {
        isOk = false;
    } else {
        isOk = true;
    }
    return isOk;
}

function clearTitle() {
    document.querySelector('.popup__info__title').innerHTML = '';
    return;
}

function insert(word) {
    
    for(var i =0; i < word.length; i++) {
        var newSpan = document.createElement('span');
        newSpan.innerHTML = word[i];
        document.querySelector('.popup__info__title').appendChild(newSpan);
    }
    return;
}

function closepopup() {
    document.getElementById("popup").classList.toggle('popup_show');
}
function showpopup(win) {
    if(win) {
        //document.querySelector('.popup__info__title').innerHTML = 'Win!';
        insert('Win!');
        document.getElementById('new').innerHTML = 'Play again!';
    } else {
        insert('Lose!');
        document.getElementById('new').innerHTML = 'Try again!';
    }
    document.getElementById("popup").classList.toggle('popup_show');
}

function checkCards(el1, el2) {
    return (el1.querySelector('.back').innerText === el2.querySelector('.back').innerText);
}

function showTime(seconds) {
    if (seconds < 10) seconds = "0" + seconds;
    document.getElementById("time").innerHTML = "00:" + seconds;
}

var game = document.getElementById('game');
var firstClick = 0;
var countClick = 0;
var correct = 0;
var timers = [];
var sec = 60;




function resetCards() {
    document.getElementById("time").innerHTML = "01:00";
    countClick = 0;
    correct = 0;
    var cards = ['🐱', '🐱', '🐯', '🐯', '🦄', '🦄', '🐙', '🐙', '🐰', '🐰', '🐻', '🐻'];
    cards.shuffle();
    var cards_t = document.querySelectorAll('.back span');
    for(var i = 0; i < cards_t.length; i++) {
        cards_t[i].innerText = cards[i];
    }

    all_cards = document.getElementsByClassName("card");
    for(var i = 0; i < all_cards.length; i++) {
        all_cards[i].classList.remove('right');
        all_cards[i].classList.remove('opened');
    }
    all_backs = document.querySelectorAll('.back');
    for(var i = 0; i < all_backs.length; i++) {
        all_backs[i].classList.remove('correct');
        all_backs[i].classList.remove('incorrect');
    }
}
var intervalID;
function gameStart() {
    intervalID=setInterval(timer,1000);
}

resetCards();
game.addEventListener('click', function(event) {
    var target = event.target;

  // цикл двигается вверх от target к родителям до table
    while (!target.classList.contains("game")) {
        if (target.classList.contains("card")) {

            if(firstClick === 0) {
                firstClick +=1;
                gameStart();       
            }
            if(target.classList.contains('right')) {
                return;
            }
            if(target.classList.contains('opened') && countClick === 1) {
                target.classList.remove('opened');
                countClick = 0;
                return;
            }
            
            if(countClick === 0) {
                target.classList.add('opened');
                countClick +=1;
                return;
            }
            if(countClick === 1) {
                var t_c2 = document.querySelector('.opened');
                target.classList.add('opened');
                if(checkCards(target, t_c2)) {
                    target.querySelector('.back').classList.add('correct');
                    t_c2.querySelector('.back').classList.add('correct');
                    target.classList.add('right');
                    t_c2.classList.add('right');
                    target.classList.remove('opened');
                    t_c2.classList.remove('opened');
                    correct += 2;
                    if(correct === 12) {
                        clearInterval(intervalID);
                        showpopup(true);
                        
                    }
                } else {
                    target.querySelector('.back').classList.add('incorrect');
                    t_c2.querySelector('.back').classList.add('incorrect');
                }
                countClick +=1;
                return;
            }
            if(countClick === 2 && !target.classList.contains('opened')) {
                var opened = document.querySelectorAll('.incorrect');
                for(var i = 0; i < opened.length; i++) {
                    opened[i].parentNode.classList.remove('opened');
                    opened[i].classList.remove('incorrect');
                }
                target.classList.add('opened');
                countClick = 1;
                return;
            }
        return;
        }
        target = target.parentNode;
    }
}, true);

var btn = document.getElementById("new");
btn.addEventListener('click', function() {
    firstClick = 0;
    closepopup();
    clearTitle();
    resetCards();
    sec = 60;
})

function timer() {
    showTime(--sec);
    if(sec === 0) {
        var win = winOrLose();    
        showpopup(win);
        clearInterval(intervalID);
    }
}