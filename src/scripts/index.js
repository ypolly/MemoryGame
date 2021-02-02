require('../styles/index.scss');

var cardsClicked = 0;
var cardOne, cardTwo;
var numCards, numCols;
var moves = 0;
var left=0;
var width ;
var time;
var second=0;


$(function () {
    $("button").on('click', () => {
       restart();
    });

});



const shuffleArray = (a) => {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a
}

const generateOrder = (numCards) => {
    var numPictures = numCards / 2;
    var order = [];
    for (var i = 0; i < numPictures; i++) {
        order.push(i, i);
    }
    return shuffleArray(order)
}

const createField = (numCards) => {

    var a = generateOrder(numCards);

    for (var i = 0; i < numCards; i++) {
        $.ajax({
            url: `http://localhost:8111/svg/${a[i]}/${width}`,
            method: 'GET',
            dataType: 'html',
            async: false,
            crossDomain: 'true',
            success: function (data) {
                var front = $('<div class="frontside"></div>');
                front.append(data);
                var card = $(`<div class="card ${a[i]}"><div class="backside"></div></div>`);
                card.append(front);
                $(".field").append(card);
            }
        });
    };
 openCards();
 setTime();

};

const openCards = () => {
    $(".card").on('click', function(){
        moves++;
        $(".moves").text(`Moves: ${moves}`)
    if (cardsClicked < 2) {
        cardsClicked++;
        if (cardsClicked === 1) {
            cardOne = ($(this).attr("class")).split(' ')[1];
            $(this).toggleClass('open');
            $(this).addClass('disabled');
            return;
        } else {
            cardTwo = ($(this).attr("class")).split(' ')[1];
            $(this).toggleClass('open');
            $(".card").addClass('disabled');
            if (cardTwo.localeCompare(cardOne) === 0) {
                $("." + cardTwo).attr("pointer-events", "none");
                cardOne = undefined;
                cardTwo = undefined;
                cardsClicked = 0;
                $(".card").removeClass('disabled');
                left = left - 2;
                if(left===0){
                    resetTime();
                    showModal();
                    return;
                }
                return;
            } else {
                $(".card").addClass('disabled');
                setTimeout(function () {
                    $("." + cardOne).removeClass('open');
                    $("." + cardTwo).removeClass('open');
                    cardTwo = undefined;
                    cardOne = undefined;
                    cardsClicked = 0;
                    $(".card").removeClass('disabled');
                }, 1000);
                return;
            }
        }
    }
    return;
})
};

const setTime = () => {
   
    time = setInterval(function () {
        $('.time').text(`Time: ${second} s`);
        second = second + 1;
    }, 1000);
}

function resetTime() {
    if (time) {
        clearInterval(time);
    }
}

const showModal = () => {
    $(".result").text(`With ${moves} moves and in ${second} seconds!`)
    $(".popup").show();

    $(".close").on("click", function() {
        $(".result").text("");
        $(".popup").hide();
      });
}

const restart = () => {
    $('.popup').hide();
    $('.field').empty();
    $('.time').text('');
    $('.moves').text('');
     cardsClicked = 0;
     cardOne = undefined;
     cardTwo = undefined;
     numCards = undefined;
     numCols = undefined;
     moves = 0;
     left=0;
     second=0;
     width = undefined;
     resetTime();
     setGame();
     $('select').val("");

    
}

const setGame = () => {
        numCols = parseInt($('select').val());
        numCards = left = numCols * 4;
        
        width = $('.field').width() / (numCols + 1);
        
        createField(numCards);
        $(".card").width(width + "px");
        $(".card").css("height", width + "px");
       
}