function sound(src) {
    var bgm = new Audio();
    bgm.src = src;
    bgm.loop = false;
    bgm.autoplay = true;
    bgm.preload = "auto";

    $(function() {
        bgm.load();
        bgm.addEventListener('canplaythrough', function(e) {
            bgm.play();
        });
    });
}

$(function() {
    $(".whiteout").click(function() {
        $(".whiteout, .taptap").fadeOut(500);
        sound("./sounds/drop1.mp3");
        $('#text,#subtext').hide().fadeIn(4444);
    });

    $(".taptap").delay(5000).fadeIn();
});