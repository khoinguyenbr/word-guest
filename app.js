!function(){const e=new Date("2022-02-10"),t=26,n=33,o=23,s=6,i=["CÂY","HOA","BÁNH","TRÁI","BAY","CẤN","HÔN","NHẢY","TÁM","BƠI","MÀU","XANH","CHÓ","MÈO","LANH","TÚI","BÚT","SÁCH","BÌNH","ĐIỆN","NƯỚC","LỬA","SẤM","ĐẤT","THÚ","DÂY","GIẤY","RÈM","BÀN","TIVI"],r=["_","´","`","?","~","."],d={A:["A","Á","À","Ả","Ã","Ạ"],"Â":["Â","Ấ","Ầ","Ẩ","Ẫ","Ậ"],"Ă":["Ă","Ắ","Ằ","Ẳ","Ẵ","Ặ"],E:["E","É","È","Ẻ","Ẽ","Ẹ"],"Ê":["Ê","Ế","Ề","Ể","Ễ","Ệ"],I:["I","Í","Ì","Ỉ","Ĩ","Ị"],O:["O","Ó","Ò","Ỏ","Õ","Ọ"],"Ô":["Ô","Ố","Ồ","Ổ","Ỗ","Ộ"],"Ơ":["Ơ","Ớ","Ờ","Ở","Ỡ","Ợ"],U:["U","Ú","Ù","Ủ","Ũ","Ụ"],"Ư":["Ư","Ứ","Ừ","Ử","Ữ","Ự"],Y:["Y","Ý","Ỳ","Ỷ","Ỹ","Ỵ"]},a=$("#keyboard"),l=$("#words"),c=$("#overlay"),f=$("#modal"),g="bg-grey-light hover:border-grey-lighter",h="disabled bg-grey-dark";function u(e){const t=Object.keys(d);for(let n of t){const t=d[n].indexOf(e);if(t>-1)return r[t]}return"_"}function y(e){const t=Object.keys(d);for(let n of t)if(d[n].includes(e))return n;return e}function C(e,t){return y(e)===y(t)}function p(e){$("#result").text(b).removeClass("hidden"),a.addClass("hidden"),e&&setTimeout(()=>{f.add(c).removeClass("hidden")},1500)}function v(){const e=new Date;return`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`}$(window).on("resize orientationchange",function(){setTimeout(()=>{const e=2*parseInt(l.css("margin-top"));l.height(window.innerHeight-a.height()-l.offset().top-e)},200)}),function(){const e="rounded lg:rounded-xl text-white text-center font-medium lg:border-2 border-grey-light hover:border-gray-lighter transition cursor-pointer bg-grey-light active:bg-grey-lighter",t=$('<ul class="w-full space-y-2 lg:space-y-4"></ul>'),n=$('<li class="flex space-x-2 lg:space-x-4 justify-center flex-wrap"></li>'),o=r.map(t=>`<div class="sign ${e}">${t}</div>`);n.append(o);const s=[["A","Ă","Â","B","C","D","Đ","E","Ê","G"],["H","I","K","L","M","N","O","Ô","Ơ"],["P","Q","R","S","T","U","Ư","V","X","Y"]].map(t=>{const n=$('<li class="flex space-x-2 lg:space-x-4 justify-center flex-wrap"></li>'),o=t.map(t=>`<div class="key ${e}">${t}</div>`);return n.append(o),n});t.append(n),t.append(s),a.append(t),a.append(`<div class="actions flex justify-center w-full my-4 space-x-8">\n    <div id="enter" class="key func ${e}">ENTER</div>\n    <div id="delete" class="key func ${e}">DELETE</div>\n    </div>`),$("#enter").addClass(h).removeClass(g),setTimeout(()=>{const e=2*parseInt(l.css("margin-top"));l.height(window.innerHeight-a.height()-l.offset().top-e)},200)}();const b=function(){const e=(Cookies.get("history")||"").split("_");if(e.length===i.length)return Cookies.set("history",""),i[Math.floor(Math.random()*i.length)];const t=i.filter(t=>!e.includes(t));return 0===t.length?(Cookies.set("history",""),i[Math.floor(Math.random()*i.length)]):t[Math.floor(Math.random()*t.length)]}();!function(e){const t=l.children();for(let n=0;n<s;n++){const o=$('<li class="flex space-x-4"></li>');for(let t=0;t<e.length;t++)o.append(`<div class="relative text-white w-16 h-16 lg:w-20 lg:h-20 rounded-lg font-bold border-2 ${0!==n?"border-grey-default":"border-grey-light"} text-xl lg:text-3xl flex justify-center items-center">\n          </div>`);t.append(o)}}(b);let m=0,x=0,k=!1;const w=(e=x)=>l.find("li").eq(m).find("div").eq(e);function T(e){const t=l.find("li").eq(m);x=e,t.children().removeClass("border-4").addClass("border"),t.children().eq(e).removeClass("border").addClass("border-4")}function M(){const e=l.find("li").eq(m).text();[...e].forEach((e,t)=>{const n=w(t),o=u(e);let s=!1;if(n.removeClass("border border-2 border-4"),C(e,b[t]))n.addClass("bg-green");else if(b.split("").filter(t=>C(t,e)).length)n.addClass("bg-yellow");else{s=!0,n.addClass("bg-grey-default");const t=y(e);a.find(`div:not(.func):contains(${t})`).addClass(h).removeClass(g)}!s&&o!==u(b[t])&&Object.keys(d).includes(y(e))?n.addClass("error-dot"):n.removeClass("error-dot"),function(e){for(let t of[...b])if(u(t)===e)return!0;return!1}(o)||a.find(`div:contains(${o})`).addClass(h).removeClass(g)}),k=b===e.trim();const t=Cookies.get("days")||"",n=Cookies.get("history")||"";return k?(p(!0),Cookies.set("days",`${t}_${v()}`),void Cookies.set("history",`${n}_${b}`)):m!==s-1||k?void function(e){const t=l.find("li");t.eq(e).find("div").removeClass("border-grey-light").addClass("border-gray-400"),m=e,T(0),l.animate({scrollTop:t.eq(e).position().top-60+l.scrollTop()},300)}(m+1):(p(!1),Cookies.set("days",`${t}_${v()}`),void Cookies.set("history",`${n}_${b}`))}l.on("click tap","li > div",function(){$(this).parent().index()===m&&T($(this).index())}),a.on("click.key tap.key","div.key",function(){const e=this.innerHTML,t=w();if($(this).hasClass("disabled")||$(this).hasClass("hold-on"))return;const n=Object.keys(d).includes(e);"ENTER"!==e&&"DELETE"!==e?(x<b.length-1&&!n?T(x+1):n&&($signKeys=a.find(".sign:not(.disabled)"),$signKeys.addClass("border-2 border-green"),a.find(".key").addClass("hold-on bg-grey-dark").removeClass("bg-grey-light")),t.data("origin",e),t.text(e)):"DELETE"===e?t.text().trim()?t.text(""):t.index()>0&&(T(x-1),w().text("")):M();const o=$("#enter");l.find("li").eq(m).text().trim().length<b.length?o.addClass(h).removeClass(g):o.removeClass(h).addClass(g)}),a.on("click tap","div.sign",function(){const e=this.innerHTML,t=w();a.find(".sign").removeClass("border-2 border-green");const n=t.data("origin");n&&!$(this).hasClass("disabled")&&(a.find(".key").removeClass("hold-on bg-grey-dark").not(".disabled").addClass("bg-grey-light"),t.text(function(e,t){const n=r.indexOf(t);return d[e]?d[e][n<0?0:n]:e}(n,e)),x<b.length-1&&T(x+1))}),$("#share").on("click",function(){const e=(()=>{const e=navigator.userAgent;return/android/i.test(e)?"Android":/iPad|iPhone|iPod/.test(e)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1?"iOS":"Other"})();!navigator.share||"Android"!==e&&"iOS"!==e?window.open(`https://www.facebook.com/sharer/sharer.php?u=${location.href}`,"_blank"):navigator.share({title:"Trò chơi đoán chữ",text:"Nào cùng đoán chữ của ngày hôm nay là gì đây!",url:location.href})}),T(0),function(){const s=dateFns.differenceInCalendarDays(new Date,e),i=Math.floor(Math.random()*(n-o+1))+o;f.find(".count-total").text(t*s+"k"),f.find(".count-day").text(i+"k")}();setInterval(()=>{const e=function(){const e=new Date,t=dateFns.endOfDay(e);return function(e){const t=~~(e/3600),n=~~(e%3600/60),o=~~e%60;function s(e){return`0${e}`.slice(-2)}return 0===t&&0===n?s(o):0===t?`${s(n)}:${s(o)}`:`${s(t)}:${s(n)}:${s(o)}`}(dateFns.differenceInSeconds(t,e))}();f.find(".count-down").text(e),"00"===e&&location.reload()},1e3);(function(){const e=Cookies.get("days")||"",t=v();return!e.includes(t)})()||(c.removeClass("hidden"),f.removeClass("hidden"))}();
