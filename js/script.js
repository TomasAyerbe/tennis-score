//[name, point, game, set]
let player1Score = ['', 0, 0, 0];
let player2Score = ['', 0, 0, 0];
let serve = 0;
let bestOf = 0;
let currentSet = 0;

$(document).ready(function() {
    showHomePage();
});

function showHomePage() {
    $('body').append(' \
        <div class="page flex flex-col items-center h-screen p-2 sm:p-4"> \
            <h1 class="my-4 2xl:my-16 text-6xl sm:text-7xl 2xl:text-8xl text-center">Tennis score</h1> \
            <div class="home-page w-full"> \
                <div class="flex flex-col w-full items-center my-2 2xl:my-4"> \
                    <span class="w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 my-4 text-3xl 2xl:text-4xl">Player 1</span> \
                    <div class="flex w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 text-lg sm:text-2xl 2xl:text-3xl"> \
                        <input type="text" id="player1" class="w-4/5 h-14 p-4 2xl:p-7 bg-inherit border-2 border-solid focus:outline-none" placeholder="Insert player name" autocomplete="off"> \
                        <button class="serve-option w-1/5 mx-4 2xl:mx-8 border-2 border-solid focus:outline-none">Serve</button> \
                    </div> \
                </div> \
                <div class="flex flex-col w-full items-center my-2 2xl:my-4"> \
                    <span class="w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 my-4 text-3xl 2xl:text-4xl">Player 2</span> \
                    <div class="flex w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 text-lg sm:text-2xl 2xl:text-3xl"> \
                        <input type="text" id="player2" class="w-4/5 h-14 p-4 2xl:p-7 bg-inherit border-2 border-solid focus:outline-none" placeholder="Insert player name" autocomplete="off"> \
                        <button class="serve-option w-1/5 mx-4 2xl:mx-8 border-2 border-solid focus:outline-none">Serve</button> \
                    </div> \
                </div> \
                <div class="flex flex-col w-full items-center my-2 2xl:my-4"> \
                    <span class="w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 my-4 text-3xl 2xl:text-4xl">Best of</span> \
                    <div class="flex w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 text-lg sm:text-2xl 2xl:text-3xl"> \
                        <button class="bestOf-option w-14 h-14 border-2 border-solid focus:outline-none">3</button> \
                        <button class="bestOf-option w-14 h-14 mx-6 border-2 border-solid focus:outline-none">5</button> \
                    </div> \
                </div> \
                <div class="flex w-full justify-center my-4 sm:my-2 2xl:my-4"> \
                    <button id="submit-button" class="w-32 sm:w-40 h-12 sm:h-14 my-4 text-lg sm:text-3xl border-2 border-solid focus:outline-none">Go</button> \
                </div> \
            </div> \
        </div> \
    ');

    $('.serve-option').click(function(){
        $(this).addClass('selected').css('transition-duration', '.2s');

        $('.serve-option').not(this).removeClass('selected').css('transition-duration', '.2s');
    });

    $('.bestOf-option').click(function(){
        $(this).addClass('selected').css('transition-duration', '.2s');

        $('.bestOf-option').not(this).removeClass('selected').css('transition-duration', '.2s');
    });

    $('#submit-button').click(function(){
        savePlayerNames();

        saveServe();

        saveBestOf();

        if ((player1Score[0] != '') && (player2Score[0] != '') && (serve != 0) && (bestOf != 0)) {
            $(this).prop('disabled', true);

            hidePage();

            showScorePage();
        }
    });
}

function showScorePage() {
    $('body').append(' \
        <div class="page flex flex-col items-center h-screen p-2 sm:p-4"> \
            <h1 class="my-4 2xl:my-16 text-6xl sm:text-7xl 2xl:text-8xl text-center">Tennis score</h1> \
            <div class="score-page w-full"> \
                <div class="flex w-full justify-around sm:justify-center items-center my-6"> \
                    <span class="serve-option text-sm xl:text-3xl 2xl:text-5xl mx-2">•</span> \
                    <span class="player-name w-2/5 lg:w-1/2 xl:w-1/3 my-4 text-sm xl:text-3xl 2xl:text-5xl"></span> \
                    <div class="player1-games-container"><span class="player1-games text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-8"></span></div> \
                    <span class="player-points-line text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-8">|</span> \
                    <span class="player1-points text-center w-6 xl:w-8 2xl:w-14 text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-4"></span> \
                    <button class="add-points-button w-8 h-8 sm:w-14 sm:h-14 mx-1 text-sm xl:text-3xl 2xl:text-5xl border-2 border-solid focus:outline-none">+</button> \
                </div> \
                <div class="flex w-full justify-around sm:justify-center items-center my-6"> \
                    <span class="serve-option text-sm xl:text-3xl 2xl:text-5xl mx-2">•</span> \
                    <span class="player-name w-2/5 lg:w-1/2 xl:w-1/3 my-4 text-sm xl:text-3xl 2xl:text-5xl"></span> \
                    <div class="player2-games-container"><span class="player2-games text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-8"></span></div> \
                    <span class="player-points-line text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-8">|</span> \
                    <span class="player2-points text-center w-6 xl:w-8 2xl:w-14 text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-4"></span> \
                    <button class="add-points-button w-8 h-8 sm:w-14 sm:h-14 mx-1 text-sm xl:text-3xl 2xl:text-5xl border-2 border-solid focus:outline-none">+</button> \
                </div> \
            </div> \
        </div> \
    ');

    checkServe();

    $('.player-name:first').text(player1Score[0]);
    
    $('.player-points:first').text(player1Score[1]);

    $('.player-games:first').text(player1Score[2]);

    $('.player-name:last').text(player2Score[0]);

    $('.player-points:last').text(player2Score[1]);
    
    $('.player-games:last').text(player2Score[2]);

    $(this).fadeIn(300);
    
    score();
}

function savePlayerNames() {
    player1Score[0] = $('#player1').val();

    player2Score[0] = $('#player2').val();
}

function saveServe() {
    if ($('.serve-option:first').hasClass('selected')) {
        serve = 1;
    } else if ($('.serve-option:last').hasClass('selected')) {
        serve = 2;
    }
}

function saveBestOf() {
    if ($('.bestOf-option:first').hasClass('selected')) {
        bestOf = 3;
    } else if ($('.bestOf-option:last').hasClass('selected')) {
        bestOf = 5;
    }
}

function hidePage() {
    $('.page').fadeOut(200, function(){
        $(this).remove();
    });
}

function checkServe() {
    switch (serve) {
        case 1:
            $('.serve-option:first').css('visibility', 'inherit');
            $('.serve-option:last').css('visibility', 'hidden');
        break;
        case 2:
            $('.serve-option:first').css('visibility', 'hidden');
            $('.serve-option:last').css('visibility', 'inherit');
        break;
    }
}

function changeServe() {
    switch (serve) {
        case 1:
            serve = 2;
        break;
        case 2:
            serve = 1;
        break;
    }
}

function score() {
    textScore(currentSet);

    $('.add-points-button:first').click(function(){
        if (!((player1Score[1] == 40) && (player2Score[1] == 40)) && !((player1Score[1] == '-') && (player2Score[1] == 'AD')) && !((player1Score[1] == 'AD') && (player2Score[1] == '-')) && !(((player1Score[2] == 6) && (player2Score[2] == 6)))) {
            addPoint(player1Score, player2Score);
        } else if ((player1Score[2] == 6) && (player2Score[2] == 6)) {
            tiebreak(player1Score, player2Score);
        } else {
            deuce(player1Score, player2Score);
        }

        textScore(currentSet);

        if (((player1Score[2] == 6) && (player2Score[2] <= 4)) || ((player1Score[2] == 7) && (player2Score[2] <= 5)) || (player1Score[2] == 7)) {
            addSet(player1Score);
            
            ++currentSet;
        }
    });

    $('.add-points-button:last').click(function(){
        if (!((player1Score[1] == 40) && (player2Score[1] == 40)) && !((player2Score[1] == '-') && (player1Score[1] == 'AD')) && !((player2Score[1] == 'AD') && (player1Score[1] == '-')) && !(((player1Score[2] == 6) && (player2Score[2] == 6)))) {
            addPoint(player2Score, player1Score);
        } else if ((player1Score[2] == 6) && (player2Score[2] == 6)) {
            tiebreak(player2Score, player1Score);
        } else {
            deuce(player2Score, player1Score);
        }

        textScore(currentSet);

        if (((player2Score[2] == 6) && (player1Score[2] <= 4)) || ((player2Score[2] == 7) && (player1Score[2] <= 5)) || (player2Score[2] == 7)) {
            addSet(player2Score);
            
            ++currentSet;
        }
    });
}

function textScore(currentSet) {
    let player1Games = $('.player1-games').get(currentSet);
    
    let player2Games = $('.player2-games').get(currentSet);
    
    $('.player1-points').text(player1Score[1]);
    
    $(player1Games).text(player1Score[2]);

    $('.player2-points').text(player2Score[1]);
    
    $(player2Games).text(player2Score[2]);
}

function addPoint(playerScore, rivalScore) {
    switch (playerScore[1]) {
        case 0:
            playerScore[1] = 15;
        break;
        case 15:
            playerScore[1] = 30;
        break;
        case 30:
            playerScore[1] = 40;
        break;
        case 40:
            playerScore[1] = 0;
            rivalScore[1] = 0;
            addGame(playerScore, rivalScore);
        break;
    }
}

function addGame(playerScore, rivalScore) {
    if ((playerScore[2] < 6) || (rivalScore[2] < 6)) {
        ++playerScore[2];
        changeServe();
        checkServe();
    }
}

function deuce(playerScore, rivalScore) {
    switch (playerScore[1]) {
        case 40:
            playerScore[1].toString();
            playerScore[1] = 'AD';
            rivalScore[1].toString();
            rivalScore[1] = '-';
        break;
        case '-':
            Number(playerScore[1]);
            playerScore[1] = 40;
            Number(rivalScore[1]);
            rivalScore[1] = 40;
        break;
        case 'AD':
            Number(playerScore[1]);
            playerScore[1] = 0;
            Number(rivalScore[1]);
            rivalScore[1] = 0;
            addGame(playerScore, rivalScore);
        break;
    }
}

function tiebreak(playerScore, rivalScore) {
    if ((playerScore[1] >= 6) && ((playerScore[1] - rivalScore[1]) >= 1)) {
        playerScore[1] = 0;
        rivalScore[1] = 0;
        ++playerScore[2];
    } else {
        ++playerScore[1];
    }

    if (((playerScore[1] + rivalScore[1]) % 2) != 0) {
        changeServe();
        checkServe();
    }
}

function addSet(playerScore) {
    ++playerScore[3];
    
    switch (bestOf) {
        case 3:
            if (playerScore[3] == 2) {
                finishMatch(playerScore);
            } else {
                $('.player1-games-container').append('<span class="player1-games text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-4">0</span>');
                $('.player2-games-container').append('<span class="player2-games text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-4">0</span>');
            }
        break;
        case 5:
            if (playerScore[3] == 3) {
                finishMatch(playerScore);
            } else {
                $('.player1-games-container').append('<span class="player1-games text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-4">0</span>');
                $('.player2-games-container').append('<span class="player2-games text-xl xl:text-3xl 2xl:text-5xl mx-1 sm:mx-4">0</span>');
            }
        break;
    }

    restartPlayerScore();
}

function restartPlayerScore() {
    for (let i = 1; i < player1Score.length - 1; ++i) {
        player1Score[i] = 0;
        player2Score[i] = 0;
    }
}

function finishMatch(playerScore) {
    $('.serve-option, .player-points-line, .player1-points, .player2-points, .add-points-button').remove();

    $('.page').append('<div class="flex justify-center items-center"><span class="winner my-8 text-xl xl:text-3xl 2xl:text-5xl"></span></div>');

    $('.winner').text(playerScore[0] + ' wins.');

    $('.page').append('<div id="home-button" class="flex justify-center items-center"><button class="w-32 sm:w-40 h-12 sm:h-14 my-4 text-lg sm:text-3xl border-2 border-solid focus:outline-none">Home</button></div>');
    
    $('#home-button').click(function(){
        hidePage();
        showHomePage();
        currentSet = 0;
        player1Score[3] = 0;
        player2Score[3] = 0;
    });
}
