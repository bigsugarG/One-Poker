var shuffledDeck = [];

var pl1CardF = 0;
var pl1CardS = 0;
var pl2CardF = 0;
var pl2CardS = 0;

var lanpFlag = false;

var player1Flag = true;
var player2Flag = true;

var pl1Ready = false;
var pl2Ready = false;

var orderNo = [];

var pl1BetCard = 0;
var pl2BetCard = 0;

var pl1Betpoint = 0;
var pl2Betpoint = 0;

var pl1Totalpoint = 5;
var pl2Totalpoint = 5;

var nextFlag = false;
var gobattle = false;
var lifeShowFlag = false;

window.onload = function() {
    this.shuffleCard();
    setInterval("main()", 2000);
}

function dialogshow(line) {

    $(function() {
        var $dialog = $(".dialog");
        var $commands = $("#pl1_card_holder, #pl2_card_holder ,#play");
        $commands.prop("disabled", true);
        $dialog.addClass("active")
        $(".message").text(line);

        $('.close-dialog').click(function() {
            $dialog.removeClass("active");
            $commands.prop("disabled", false);
        });
    });
}

function selectableDialog(playerNo, line, option1, option2) {
    $(function() {
        var $dialog = $(".select-dialog");
        var $message = $(".select-message");
        var $option1 = $(".option1");
        var $option2 = $(".option2");
        var $commands = $("#pl1_card_holder, #pl2_card_holder ,#play");

        $commands.prop("disabled", true);

        $dialog.addClass("active");

        $message.text(line);
        $option1.text(option1);
        $option2.text(option2);

        $option1.click(function() {
            $dialog.removeClass("active");
            $commands.prop("disabled", false);
            openCard(playerNo);
        });

        $option2.click(function() {
            $dialog.removeClass("active");
            $commands.prop("disabled", false);
            dialogshow("Mother Sophie「戻ります。」");
        })
    });
}

function callORraise(title, message) {
    $(function() {
        $.confirm({
            'title': title,
            'message': message,
            'buttons': {
                'コール': {
                    'action': function() {
                        /* OKボタンの処理を記述 */
                        dialogshow("コール");
                        // ダイアログを閉じる
                        return false;
                    }
                },
                'レイズ': {
                    'action': function() {
                        /* キャンセルボタンの処理を記述 */
                        dialogshow("レイズ");
                        // ダイアログを閉じる
                        return false;
                    }
                }
            }
        });
    });
}

function screenEffect() {
    $(function() {
        $open = $(".open");
        $open.fadeIn();
        sound("./sounds/buun1.mp3");
        setTimeout(function() {
            $open.fadeOut()
        }, 2000);
    });
}

function sound(src) {
    var bgm = new Audio();
    bgm.src = src;
    bgm.loop = false;
    bgm.autoplay = false;
    bgm.preload = "auto";

    $(function() {
        bgm.load();
        bgm.addEventListener('canplaythrough', function(e) {
            bgm.play();
        });
    });
}

function main() {
    lanpSwitch();
    gameStream();
}

function shuffleCard() {
    //callORraise("Mother Sophie", "コール オア レイズ？"); //ポップアップの開発中。
    var numberData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    dialogshow("Mother Sophie is Setting Cards...");
    for (i = 0; i < 4; i++) {
        numberData.sort(() => Math.random() - 0.5);
        for (j = 0; j < numberData.length; j++) {
            shuffledDeck.push(numberData[j]);
        }
    }
    shuffledDeck.sort(() => Math.random() - 0.5);
    for (i = 0; i < pl1Totalpoint; i++) {
        document.getElementById("life_gage").insertAdjacentText("beforeend", "👸");
    }
    for (i = 0; i < pl2Totalpoint; i++) {
        document.getElementById("life_gage2").insertAdjacentText("beforeend", "👸");
    }
    getCard(1);
    getCard(2);
}

function getCard(playerNo) {
    if (shuffledDeck.length == 0) {
        dialogshow("Game Over");
        $(function() {
            $("html").click(location.href = './onePokerMenu.html');
        });
    } else {
        lanpFlag = true;
        if (playerNo == 1) {
            pickCard(1);
        } else if (playerNo == 2) {
            pickCard(2);
        }
    }
}

function pickCard(playerNo) {
    switch (playerNo) {
        case 1:
            if (pl1CardF == 0) {
                pl1CardF = shuffledDeck[0];
                shuffledDeck.splice(0, 1);
            }
            if (pl1CardS == 0) {
                pl1CardS = shuffledDeck[0];
                shuffledDeck.splice(0, 1);
            }
            break;

        case 2:
            if (pl2CardF == 0) {
                pl2CardF = shuffledDeck[0];
                shuffledDeck.splice(0, 1);
            }
            if (pl2CardS == 0) {
                pl2CardS = shuffledDeck[0];
                shuffledDeck.splice(0, 1);
            }
            break;
    }
}

function lanpSwitch() {
    if (lanpFlag == true) {
        if (pl1CardF < 8 && pl1CardF !== 1) {
            document.getElementById("pl1_down1").style.backgroundColor = 'blue';
        } else {
            document.getElementById("pl1_up1").style.backgroundColor = 'red';
        }
        if (pl1CardS < 8 && pl1CardS !== 1) {
            document.getElementById("pl1_down2").style.backgroundColor = 'blue';
        } else {
            document.getElementById("pl1_up2").style.backgroundColor = 'red';
        }

        if (pl2CardF < 8 && pl2CardF !== 1) {
            document.getElementById("pl2_down1").style.backgroundColor = 'blue';
        } else {
            document.getElementById("pl2_up1").style.backgroundColor = 'red';
        }
        if (pl2CardS < 8 && pl2CardS !== 1) {
            document.getElementById("pl2_down2").style.backgroundColor = 'blue';
        } else {
            document.getElementById("pl2_up2").style.backgroundColor = 'red';
        }
    }
}

function checkCard(playerNo) {
    selectableDialog(playerNo, "Mother Sophie「あなたはPlayer" + playerNo + "ですね？ 手札を確認致します。」", "確認する", "戻る");
}

function openCard(playerNo) {
    if (playerNo === 1) {
        dialogshow("Card1: " + pl1CardF + " \n" + "Card2: " + pl1CardS);
    } else if (playerNo === 2) {
        dialogshow("Card1: " + pl2CardF + " \n" + "Card2: " + pl2CardS);
    } else { alert("ERROR@openCard"); }

}

function pushCard(playerNo, cardNo) {
    lanpFlag = false;
    if (playerNo == 1) {
        if (player1Flag == true) {
            orderNo.push("1");
            if (cardNo == 1) {
                player1Flag = false;
                pl1BetCard = pl1CardF;
                pl1CardF = 0;

            } else if (cardNo == 2) {
                player1Flag = false;
                pl1BetCard = pl1CardS;
                pl1CardS = 0;
            }
            document.getElementById("card_field1").src = "./images/irasutoya_trumpReverse.png";
            pl1Ready = true;
        } else {
            dialogshow("無効なコマンドです。");
        }

    } else if (playerNo == 2) {
        if (player2Flag == true) {
            orderNo.push("2");
            if (cardNo == 1) {
                player2Flag = false;
                pl2BetCard = pl2CardF;
                pl2CardF = 0;
            } else if (cardNo == 2) {
                player2Flag = false;
                pl2BetCard = pl2CardS;
                pl2CardS = 0;
            }
            document.getElementById("card_field2").src = "./images/irasutoya_trumpReverse.png";
            pl2Ready = true;
        } else {
            dialogshow("無効なコマンドです。");
        }
    }
}

function betLife(playerNo, betNo) {
    document.getElementById("bet_life").style.opacity = '100%';
    document.getElementById("bet_life2").style.opacity = '100%';
    if (playerNo == 1) {
        var check = 0;
        pl1Betpoint += betNo;
        pl1Totalpoint -= betNo;
        document.getElementById("life_gage").textContent = "";
        for (i = 0; i < pl1Totalpoint; i++) {
            document.getElementById("life_gage").insertAdjacentText("beforeend", "👸");
            check++;
        }
        document.getElementById("bet_life").textContent = "";
        for (i = 0; i < pl1Betpoint; i++) {
            document.getElementById("bet_life").insertAdjacentText("beforeend", "👸");
            check++;
        }
        if (check == pl1Totalpoint + pl1Betpoint) {
            lifeShowFlag = true;
        }

    } else if (playerNo == 2) {
        var check = 0;
        pl2Betpoint += betNo;
        pl2Totalpoint -= betNo;
        document.getElementById("life_gage2").textContent = "";
        for (i = 0; i < pl2Totalpoint; i++) {
            document.getElementById("life_gage2").insertAdjacentText("beforeend", "👸");
            check++;
        }
        document.getElementById("bet_life2").textContent = "";
        for (i = 0; i < pl2Betpoint; i++) {
            document.getElementById("bet_life2").insertAdjacentText("beforeend", "👸");
            check++;
        }
        if (check == pl2Totalpoint + pl2Betpoint) {
            lifeShowFlag = true;
        }
    } else { alert("Error@betLife"); }
}

function raiseLife(playerNo) {
    var loop = true;
    if (playerNo == 1) {
        while (loop) {
            if (pl1Totalpoint < 1 || pl1Betpoint == pl2Betpoint + pl2Totalpoint) {
                dialog("Mother Sophie「これ以上ライフを積めません。」");
                loop = false;
            } else if (confirm("Mother Sophie「現在ベットライフは" + pl1Betpoint + "です。ライフをさらに上乗せします。」") == true) {
                betLife(1, 1);
            } else { loop = false; }
        }
    } else if (playerNo == 2) {
        while (loop) {
            if (pl2Totalpoint < 1 || pl2Betpoint == pl1Betpoint + pl1Totalpoint) {
                dialogshow("Mother Sophie「これ以上ライフを積めません。」");
                loop = false;
            } else if (confirm("Mother Sophie「現在ベットライフは" + pl2Betpoint + "です。ライフをさらに上乗せします。」") == true) {
                betLife(2, 1);
            } else { loop = false; }
        }
    } else { alert("Error@raiseLife"); }
}

function gameStream() {
    if (player1Flag == false && player2Flag == false) {
        if (pl1Ready == true && pl2Ready == true) {
            if (orderNo[0] == "1") {
                pl1Ready = false;
                if (confirm("Mother Sophie「Player1、コール オア レイズ？」\nコールならばOK、レイズならばキャンセル") == true) {
                    //dialog("Mother Sophie「ライフ1でコールします。」");
                    betLife(1, 1);
                } else {
                    betLife(1, 1);
                    raiseLife(1);
                }
            } else if (orderNo[0] == "2") {
                pl2Ready = false;
                if (confirm("Mother Sophie「Player2、コール オア レイズ？」\nコールならばOK、レイズならばキャンセル") == true) {
                    //dialog("Mother Sophie「ライフ1でコールします。」");
                    betLife(2, 1);
                } else {
                    betLife(2, 1);
                    raiseLife(2);
                }
            } else { alert("Error@gameStream_first_if"); }

        } else if (pl1Ready == false && pl2Ready == true) {
            pl2Ready = false;
            nextFlag = true;
            if (confirm("Mother Sophie「Player2、レイズ オア ドロップ？」\nレイズならばOK、ドロップならばキャンセル") == true) {
                betLife(2, 1);
                raiseLife(2);
            } else {
                if (pl2Betpoint == 0) {
                    betLife(2, 1);
                }
                drop(2);
            }
        } else if (pl1Ready == true && pl2Ready == false) {
            pl1Ready = false;
            nextFlag = true;
            if (confirm("Mother Sophie「Player1、レイズ オア ドロップ？」\nレイズならばOK、ドロップならばキャンセル") == true) {
                betLife(1, 1);
                raiseLife(1);
            } else {
                if (pl1Betpoint == 0) {
                    betLife(1, 1);
                }
                drop(1);
            }
        }
    }

    if (nextFlag == true) {
        nextFlag = false;
        if (pl1Betpoint !== 0 && pl2Betpoint !== 0) {
            if (lifeShowFlag == true) {
                lifeShowFlag = false;
                if (pl1Betpoint == pl2Betpoint) {
                    gobattle = true;
                } else if (pl1Betpoint > pl2Betpoint) {
                    pl2Ready = true;
                } else if (pl1Betpoint < pl2Betpoint) {
                    pl1Ready = true;
                } else { alert("Error@gameStream_nextFlag"); }
            }
        }
    }

    if (gobattle == true) {
        gobattle = false;
        goBattle();
    }
}

function goBattle() {
    screenEffect();
    setTimeout(function() {
        sound("./sounds/text-impact2.mp3");
        if (pl1BetCard == pl2BetCard) {
            dialogshow("Mother Sophie「結果：ドロー。」");
            endBattle(0);
        } else if (pl1BetCard == 1 && pl2BetCard !== 2) {
            dialogshow("Mother Sophie「Winner：Player1！」");
            endBattle(1);
        } else if (pl1BetCard == 1 && pl2BetCard == 2) {
            dialogshow("Mother Sophie「Trick! Winner：Player2！」");
            endBattle(2);
        } else if (pl1BetCard !== 2 && pl2BetCard == 1) {
            dialogshow("Mother Sophie「Winner：Player2！」");
            endBattle(2);
        } else if (pl1BetCard == 2 && pl2BetCard == 1) {
            dialogshow("Mother Sophie「Trick! Winner：Player1！」");
            endBattle(1);
        } else if (pl1BetCard < pl2BetCard) {
            dialogshow("Mother Sophie「Winner：Player2！」");
            endBattle(2);
        } else if (pl1BetCard > pl2BetCard) {
            dialogshow("Mother Sophie「Winner：Player1！」");
            endBattle(1);
        } else { alert("Error@gobattle"); }
        cardShow();
    }, 2500);

}

function drop(playerNo) {
    gobattle = false;
    if (playerNo == 1) {
        dialogshow("Mother Sophie「Player1、ドロップ。Winner：Player2！」");
        cardShow();
        endBattle(2);
    } else if (playerNo == 2) {
        dialogshow("Mother Sophie「Player2、ドロップ。Winner：Player1！」");
        cardShow();
        endBattle(1);
    }
}

function cardShow() {
    var srcLine;
    switch (pl1BetCard) {
        case 1:
            srcLine = "AceS";
            break;
        case 2:
            srcLine = "2S";
            break;
        case 3:
            srcLine = "3S";
            break;
        case 4:
            srcLine = "4S";
            break;
        case 5:
            srcLine = "5S";
            break;
        case 6:
            srcLine = "6S";
            break;
        case 7:
            srcLine = "7S";
            break;
        case 8:
            srcLine = "8S";
            break;
        case 9:
            srcLine = "9S";
            break;
        case 10:
            srcLine = "10S";
            break;
        case 11:
            srcLine = "JackS";
            break;
        case 12:
            srcLine = "QueenS";
            break;
        case 13:
            srcLine = "KingS";
            break;
    }
    document.getElementById("card_field1").src = "./images/" + srcLine + ".png";

    switch (pl2BetCard) {
        case 1:
            srcLine = "AceS";
            break;
        case 2:
            srcLine = "2S";
            break;
        case 3:
            srcLine = "3S";
            break;
        case 4:
            srcLine = "4S";
            break;
        case 5:
            srcLine = "5S";
            break;
        case 6:
            srcLine = "6S";
            break;
        case 7:
            srcLine = "7S";
            break;
        case 8:
            srcLine = "8S";
            break;
        case 9:
            srcLine = "9S";
            break;
        case 10:
            srcLine = "10S";
            break;
        case 11:
            srcLine = "JackS";
            break;
        case 12:
            srcLine = "QueenS";
            break;
        case 13:
            srcLine = "KingS";
            break;
    }
    document.getElementById("card_field2").src = "./images/" + srcLine + ".png";
}

function endBattle(playerNo) {
    if (playerNo == 0) {
        pl1Totalpoint += pl1Betpoint;
        pl2Totalpoint += pl2Betpoint;
    } else if (playerNo == 1) {
        pl1Totalpoint += (pl1Betpoint + pl2Betpoint);
    } else if (playerNo == 2) {
        pl2Totalpoint += (pl1Betpoint + pl2Betpoint);
    } else { alert("Error@endBattle"); }

    document.getElementById("life_gage").textContent = "";
    document.getElementById("life_gage2").textContent = "";

    for (i = 0; i < pl1Totalpoint; i++) {
        document.getElementById("life_gage").insertAdjacentText("beforeend", "👸");
    }
    for (i = 0; i < pl2Totalpoint; i++) {
        document.getElementById("life_gage2").insertAdjacentText("beforeend", "👸");
    }

    document.getElementById("pl1_down1").style.backgroundColor = 'rgb(162, 160, 255)';
    document.getElementById("pl1_down2").style.backgroundColor = 'rgb(162, 160, 255)';
    document.getElementById("pl2_down1").style.backgroundColor = 'rgb(162, 160, 255)';
    document.getElementById("pl2_down2").style.backgroundColor = 'rgb(162, 160, 255)';
    document.getElementById("pl1_up1").style.backgroundColor = 'rgb(255, 170, 170)';
    document.getElementById("pl1_up2").style.backgroundColor = 'rgb(255, 170, 170)';
    document.getElementById("pl2_up1").style.backgroundColor = 'rgb(255, 170, 170)';
    document.getElementById("pl2_up2").style.backgroundColor = 'rgb(255, 170, 170)';

    document.getElementById("bet_life").style.opacity = '60%';
    document.getElementById("bet_life2").style.opacity = '60%';

    pl1Betpoint = 0;
    pl2Betpoint = 0;
    player1Flag = true;
    player2Flag = true;
    orderNo = [];

    if (pl1Totalpoint == 0 || pl2Totalpoint == 0) {
        $(function() {
            $(".close-dialog").click(function() {
                location.replace('./onePokerEnd.html');
            });
        });
    }

    getCard(1);
    getCard(2);
}