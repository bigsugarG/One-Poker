$(function(){
    function dialog(line){
        $(function(){
            var $dialog = $("#dialog");
            
            $dialog.fadeIn();
    
            $('.close-dialog').click(function() {
                $dialog.fadeOut();
            });
            
            $(".message").text(line);
        });  
    }
    
    $(".sentense").click(function(){
        var effectiveSound = new Audio("./sounds/data-analysis1.mp3");
        effectiveSound.play();
        dialog("???「タイトルをクリックしてゲームを開始してください。」");
    });
});
