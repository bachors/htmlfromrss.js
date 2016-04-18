# htmlfromrss.js
Mutiple html feed from rss feed

<h3>Example</h3>
<pre>&lt;div class="demo" data-htmlfromrss="http://site1.kom/news/rss"&gt;&lt;/div&gt;

&lt;div class="demo" data-htmlfromrss="http://site2.net/sport/rss.xml"&gt;&lt;/div&gt;</pre>
<pre>$(document).ready(function(){
    $(".demo").htmlfromrss(
        limit = 10
    );
});</pre>
<a href="http://ibacor.com/demo/htmlfromrssjs" target="_BLANK"><h1>DEMO</h1></a>
