$(function() {

    // We poll these variables while the wallet is being prepared
    var gabeReady = false;
    var iframeReady = false;
    var audioReady = false;

    // The carefully, lovingly determined percentages which his holiness removes from the prices of his products.
    var STEAM_SALES = [10, 25, 33, 50, 66, 75, 80, 90]

    // lolsorandom
    var randomChoice = function(list) {
            return list[Math.floor(Math.random()*list.length)]
    }

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var startRain = function () {
        console.log("ARE YOU READY FOR A MIRACLE? (starting rain)");

        // When the image of his holiness loads, show it and animate it.
        var $saleBox = $('.sale-box');

        var interval = 200;
        var numSales = 0;

        var addSale = function() {
            var pageWidth = $('body').width();
            var maxSales = (pageWidth/70)*5
            var xPos = getRandomInt(0, pageWidth);
            var percentOff = randomChoice(STEAM_SALES);
            var newSale = $saleBox.clone().show();

            newSale.text("-" + percentOff + "%");

            newSale.css("left", xPos);
            $('body').append(newSale);

            if (numSales < maxSales) {
                window.setTimeout(addSale, interval);
                numSales++;
            }

        };

        // #intervalception
        window.setInterval(function() {
            interval = Math.max(10, interval - 10);
        }, 500);

        window.setTimeout(addSale, 2*1000);

    };

    var startGabe = function() {
        $('div.gag').show();
        $('div.gag').addClass('gag-animation');
    }


    var praiseBeToGaben = function () {
        $('div.prepare-gag').hide();
        startGabe();
        startRain();
        $audio.trigger('play');
    }

    var $steamFrame = $('iframe.steam')

    $steamFrame.load(function() {
        console.log("steam loaded!");
        if (iframeReady) {
            return
        }
        iframeReady = true;
    });

    $gabe = $('div.gag > img');
    //Even if we loaded from cache, praise be. Nothing can cache his holiness forever.
    if ($gabe[0].complete) {
        gabeReady = true;
    }
    else {
        $gabe.load(function () {
            gabeReady = true;
        });
    }

    $audio = $('audio');
    $audio.on('loadedmetadata', function() {
        audioReady = true;
    });
    $audio.on('ended', function() {
        this.currentTime = 0;
        this.play();
    });

    var prepareWallet = function() {
        if (gabeReady && iframeReady && audioReady) {
            $('.prepare-loader').css('max-height', $('.prepare-loader > img').height() / 3 + 'px');
            window.setTimeout(praiseBeToGaben, 1000);
        } else {
            window.setTimeout(prepareWallet, 100);
        }
    }

    prepareWallet();
});



