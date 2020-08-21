const buttonColors = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;

function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    if (gamePattern.length > 0) {
        gamePattern.forEach((color, i) => {
            setTimeout(() => {
                $('#' + color).fadeOut(100).fadeIn(100);
                playSound(color);
            }, 500 * i);

            if (gamePattern.length === i - 1) {
                setTimeout(() => {
                    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
                    playSound(randomChosenColor);
                }), 1000*i;
            }
        });
    }
    else {
        $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
        level++;
        $('h1').text('Level ' + level);
    }
}

function clickHandler() {
    const userChosenColor = this.id;
    
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswear(userChosenColor, userClickedPattern.length - 1);
}

function checkAnswear(color, i) {
    if (gamePattern[i] === color) {

        if (gamePattern.length === userClickedPattern.length) {
            level++;
            $('h1').text('Level ' + level);
            userClickedPattern.length = 0;
            setTimeout(() => nextSequence(), 1000)
        }
    }
    else {
        userClickedPattern.length = 0;
        gamePattern.length = 0;
        level = 0;
        $('h1').text('Loser! Press a key to play again...');
        $('.btn').fadeOut(100).fadeIn(100);
        $('.btn').off('click');
        $('body').addClass('game-over');
        setTimeout(() => $('body').removeClass('game-over') ,200);
        playSound('wrong');

        $(document).one('keydown', function() {
            $('.btn').click(clickHandler);
            $('h1').text('Level ' + level);
            nextSequence();
        });
    }
}

function playSound(name) {
    const sound = new Audio('./sounds/' + name + '.mp3');
    sound.play();
}

function animatePress(color) {
    $('#' + color).addClass('pressed');
    setTimeout(() => $('#' + color).removeClass('pressed'), 100);
}

$(document).one('keydown', function() {
    $('.btn').click(clickHandler);
    $('h1').text('Level ' + level);
    nextSequence();
});