/*********************************************************************
 * #### jQuery htmlfromrss.js V.0.001 ####
 * Coded by Ican Bachors 2016.
 * http://ibacor.com/labs/htmlfromrssjs
 * Updates will be posted to this site.
 *********************************************************************/
 
 $.fn.htmlfromrss = function(f) {
    $(this).each(function(i, a) {
        $(this).html('<div class="htmlfromrss"><ul id="htmlfromrss' + i + '"></ul></div>');
        rsstohtml('SELECT channel.item FROM feednormalizer WHERE url ="' + $(this).data('htmlfromrss') + '"', i)
    });

    function rsstohtml(d, i) {
        $.ajax({
            url: 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(d) + '&format=json&diagnostics=false&callback=?',
            crossDomain: true,
            dataType: 'json'
        }).done(function(c) {
            var s = "";
            $.each(c.query.results.rss, function(e, a) {
                if (e < f) {
                    var b = a.channel.item.pubDate,
                        desk = a.channel.item.description;
                    s += '<li><div class="title"><a href="' + a.channel.item.link + '" target="_BLANK" >' + a.channel.item.title + '</a></div>';
                    s += (b != null && b != undefined ? '<div class="date">' + relative_time(b) + '</div>' : '');
                    s += (desk != null && desk != undefined ? '<div class="post">' + desk.replace('align="left"', '') + '</div>' : '')
                }
            });
            $('.htmlfromrss ul#htmlfromrss' + i).html(s)
        })
    }

    function relative_time(x) {
        if (!x) {
            return
        }
        var a = x;
        a = $.trim(a);
        a = a.replace(/\.\d\d\d+/, "");
        a = a.replace(/-/, "/").replace(/-/, "/");
        a = a.replace(/T/, " ").replace(/Z/, " UTC");
        a = a.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
        var b = new Date(a);
        var c = (arguments.length > 1) ? arguments[1] : new Date();
        var d = parseInt((c.getTime() - b) / 1000);
        d = (d < 2) ? 2 : d;
        var r = '';
        if (d < 60) {
            r = 'Just now'
        } else if (d < 120) {
            r = 'a min'
        } else if (d < (45 * 60)) {
            r = (parseInt(d / 60, 10)).toString() + ' mins ago'
        } else if (d < (2 * 60 * 60)) {
            r = 'an hr'
        } else if (d < (24 * 60 * 60)) {
            r = '' + (parseInt(d / 3600, 10)).toString() + ' hrs ago'
        } else if (d < (48 * 60 * 60)) {
            r = 'a day'
        } else {
            r = (parseInt(d / 86400, 10)).toString() + ' days ago'
        }
        return (r.match('NaN') ? x : r)
    }
}
