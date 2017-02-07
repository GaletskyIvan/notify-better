/* ===========================================================
 * jquery-notify-better.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * An all in one jQuery plugin that let you
 * change your favicon and browser title to reflect new notifications
 * Note: Works on Firefox and Chrome only.
 *
 * Credit: Remy Sharp for the Dynamic Favicon, Jeff B from StackOverflow for AbbrNum function
 * https://github.com/peachananr/notify-better
 *
 * ========================================================== */

!function($){

    var defaults = {
        value: 99,
        options: {
            id: "favicon",
            textColor: "#fff",
            backgroundColor: "#e74c3c",
            location: "full",
            shape: "square"
        },
    };

    function abbrNum(number, decPlaces)
    {
        decPlaces = Math.pow(10,decPlaces);

        var abbrev = [ "k", "m", "b", "t" ];

        for (var i=abbrev.length-1; i>=0; i--) {
            var size = Math.pow(10,(i+1)*3);

            if(size <= number) {
                number = Math.round(number*decPlaces/size)/decPlaces;
                if((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                number += abbrev[i];
                break;
            }
        }

        return number;
    }

    $.notify_better = function (settings)
    {
        var settings = $.extend({}, defaults, settings);

        var $link = $('head link[rel="shortcut icon"]');

        if (settings.value)
        {
            var canvas = document.createElement('canvas'),
                ctx,
                img = document.createElement('img');
            if (settings.value > 99) settings.value = 99
            if (canvas.getContext) {
                canvas.height = canvas.width = 16;
                ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                switch (settings.options.location) {
                    case "full":
                        if(settings.options.shape == "square") {
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fillRect(0, 0, 16, 16);
                        }else {
                            var centerX = canvas.width / 2;
                            var centerY = canvas.height / 2;
                            var radius = 8;
                            ctx.beginPath();
                            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fill();
                        }
                        ctx.textAlign = "center";
                        ctx.font = 'bold 10px "helvetica", sans-serif';
                        ctx.fillStyle = settings.options.textColor;
                        ctx.fillText(settings.value, 8, 12);
                        break;
                    case "se":
                        if(settings.options.shape == "square") {
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fillRect(5, 5, 16, 16);
                        }else {
                            var radius = 6;
                            ctx.beginPath();
                            ctx.arc(12, 12, radius, 0, 2 * Math.PI, false);
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fill();
                        }

                        ctx.font = 'bold 8px "helvetica", sans-serif';
                        ctx.textAlign = "right";
                        ctx.fillStyle = settings.options.textColor;
                        ctx.fillText(settings.value, 15, 15);
                        break;
                    case "ne":
                        if(settings.options.shape == "square") {
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fillRect(5, 0, 11, 10);
                        }else {
                            var radius = 6;
                            ctx.beginPath();
                            ctx.arc(12, 3, radius, 0, 2 * Math.PI, false);
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fill();
                        }

                        ctx.font = 'bold 8px "helvetica", sans-serif';
                        ctx.textAlign = "right";
                        ctx.fillStyle = settings.options.textColor;
                        ctx.fillText(settings.value, 15, 7);
                        break;
                    case "nw":
                        if(settings.options.shape == "square") {
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fillRect(0, 0, 11, 10);
                        }else {
                            var radius = 6;
                            ctx.beginPath();
                            ctx.arc(5, 3, radius, 0, 2 * Math.PI, false);
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fill();
                        }

                        ctx.font = 'bold 8px "helvetica", sans-serif';
                        ctx.textAlign = "left";
                        ctx.fillStyle = settings.options.textColor;
                        ctx.fillText(settings.value, 1, 7);
                        break;
                    case "sw":
                        if(settings.options.shape == "square") {
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fillRect(0, 5, 11, 11);
                        }else {
                            var radius = 6;
                            ctx.beginPath();
                            ctx.arc(5, 12, radius, 0, 2 * Math.PI, false);
                            ctx.fillStyle = settings.options.backgroundColor;
                            ctx.fill();
                        }
                        ctx.font = 'bold 8px "helvetica", sans-serif';
                        ctx.textAlign = "left";
                        ctx.fillStyle = settings.options.textColor;
                        ctx.fillText(settings.value, 1, 14);
                        break;
                }

                if ( ! $link.data('old-href'))
                {
                    $link.data('old-href', $link.attr('href'));
                }

                $link.attr('href', canvas.toDataURL('image/png'));
            }
        }
        else
        {
            $link.attr('href', $link.data('old-href'));
            $link.removeData('old-href');
        }
    }

}(window.jQuery);
