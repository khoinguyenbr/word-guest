!function(){const e=6,t=["CÂY","HOA","BÁNH","TRÁI","BAY","CẤN","HÔN","NHẢY","TÁM","BƠI","MÀU","XANH","CHÓ","MÈO","LANH","TÚI","BÚT","SÁCH","BÌNH","ĐIỆN","NƯỚC","LỬA","SẤM","ĐẤT","THÚ","DÂY","GIẤY","RÈM","BÀN","TIVI"],n={title:{win:"XIN CHÚC MỪNG",lose:"TIẾC THẬT ĐẤY"},message:{win:"là chữ cần tìm trong lượt chơi hôm nay, bạn thật là xịn xò !",lose:"mới là chữ cần tìm trong lượt chơi hôm nay, còn chút nữa thôi"},invite:"Hãy quay lại vào ngày mai để tìm chữ tiếp theo nhé 😘"},s=["_","´","`","?","~","."],i={A:["A","Á","À","Ả","Ã","Ạ"],"Â":["Â","Ấ","Ầ","Ẩ","Ẫ","Ậ"],"Ă":["Ă","Ắ","Ằ","Ẳ","Ẵ","Ặ"],E:["E","É","È","Ẻ","Ẽ","Ẹ"],"Ê":["Ê","Ế","Ề","Ể","Ễ","Ệ"],I:["I","Í","Ì","Ỉ","Ĩ","Ị"],O:["O","Ó","Ò","Ỏ","Õ","Ọ"],"Ô":["Ô","Ố","Ồ","Ổ","Ỗ","Ộ"],"Ơ":["Ơ","Ớ","Ờ","Ở","Ỡ","Ợ"],U:["U","Ú","Ù","Ủ","Ũ","Ụ"],"Ư":["Ư","Ứ","Ừ","Ử","Ữ","Ự"],Y:["Y","Ý","Ỳ","Ỷ","Ỹ","Ỵ"]},o=$("#keyboard"),r=$("#words"),d=$("#overlay"),l=$("#modal"),a="bg-gray-600 hover:border-gray-400",c="disabled bg-gray-800";function g(e){const t=Object.keys(i);for(let n of t){const t=i[n].indexOf(e);if(t>-1)return s[t]}return"_"}function f(e){const t=Object.keys(i);for(let n of t)if(i[n].includes(e))return n;return e}function h(e,t){return f(e)===f(t)}function u(e){l.find(".modal-title").text(e?n.title.win:n.title.lose),l.find(".result").text(C),l.find(".message").text(e?n.message.win:n.message.lose),l.find(".invite").text(n.invite),l.add(d).removeClass("hidden")}function y(){const e=new Date;return`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`}$(window).on("resize",function(){setTimeout(()=>{r.height(window.innerHeight-o.height()-r.offset().top-40)},200)}),function(){const e="lg:min-w-16 px-1 px-2 lg:px-4 lg:px-6 lg:h-16 rounded lg:rounded-xl text-white text-center lg:text-2xl font-medium border-gray-700 lg:border-4 lg:pt-3 hover:border-gray-400 transition cursor-pointer bg-gray-600",t=$('<ul class="w-full space-y-2 lg:space-y-4"></ul>'),n=$('<li class="flex space-x-2 lg:space-x-4 justify-center flex-wrap"></li>'),i=s.map(t=>`<div class="sign ${e}">${t}</div>`);n.append(i);const d=[["A","Ă","Â","B","C","D","Đ","E","Ê","G"],["H","I","K","L","M","N","O","Ô","Ơ"],["P","Q","R","S","T","U","Ư","V","X","Y"]].map(t=>{const n=$('<li class="flex space-x-2 lg:space-x-4 justify-center flex-wrap"></li>'),s=t.map(t=>`<div class="key ${e}">${t}</div>`);return n.append(s),n});t.append(n),t.append(d),o.append(t),o.append(`<div class="flex justify-center w-full my-4 space-x-8">\n    <div id="enter" class="key func ${e}">ENTER</div>\n    <div id="delete" class="key func ${e}">DELETE</div>\n    </div>`),$("#enter").addClass(c).removeClass(a),setTimeout(()=>{r.height(window.innerHeight-o.height()-r.offset().top-40)},200)}();const C=function(){const e=(Cookies.get("history")||"").split("_");if(e.length===t.length)return Cookies.set("history",""),t[Math.floor(Math.random()*t.length)];const n=t.filter(t=>!e.includes(t));return 0===n.length?(Cookies.set("history",""),t[Math.floor(Math.random()*t.length)]):n[Math.floor(Math.random()*n.length)]}();if(function(t){const n=r.children();for(let s=0;s<e;s++){const e=$('<li class="flex space-x-4"></li>');for(let n=0;n<t.length;n++)e.append(`<div class="relative text-white w-16 h-16 lg:w-20 lg:h-20 rounded-md font-bold border-2 ${0!==s?"border-gray-600":"border-gray-400"} pt-4 lg:pt-6 text-xl lg:text-3xl">\n          </div>`);n.append(e)}}(C),!function(){const e=Cookies.get("days")||"",t=y();return!e.includes(t)}())return d.removeClass("hidden"),void $("#outofturn-modal").removeClass("hidden");let p=0,m=0,v=!1,b=!1;const x=(e=m)=>r.find("li").eq(p).find("div").eq(e);function k(e){const t=r.find("li").eq(p);m=e,t.children().removeClass("border-4 border-gray-200").addClass("border-2 border-gray-400"),t.children().eq(e).removeClass("border-2 border-gray-400").addClass("border-4 border-gray-200")}function w(){const t=r.find("li").eq(p).text();if([...t].forEach((e,t)=>{const n=x(t),s=g(e);let r=!1;if(n.removeClass("border-2 border-4"),h(e,C[t]))n.addClass("bg-green-700");else if(C.split("").filter(t=>h(t,e)).length)n.addClass("bg-yellow-700");else{r=!0,n.addClass("bg-gray-600");const t=f(e);o.find(`div:not(.func):contains(${t})`).addClass(c).removeClass(a)}!r&&s!==g(C[t])&&Object.keys(i).includes(f(e))?n.addClass("error-dot"):n.removeClass("error-dot"),function(e){for(let t of[...C])if(g(t)===e)return!0;return!1}(s)||o.find(`div:contains(${s})`).addClass(c).removeClass(a)}),!b){const e=Cookies.get("days")||"";Cookies.set("days",`${e}_${y()}`),b=!0}v=C===t.trim();const n=(Cookies.get("history")||"").split("_");return v?(u(!0),void Cookies.set("history",`${n}_${C}`)):p!==e-1||v?void function(e){const t=r.find("li");t.eq(e).find("div").removeClass("border-gray-600").addClass("border-gray-400"),p=e,k(0),r.animate({scrollTop:t.eq(e).position().top-140+r.scrollTop()},300)}(p+1):(u(!1),void Cookies.set("history",`${n}_${C}`))}r.on("click tap","li > div",function(){$(this).parent().index()===p&&k($(this).index())}),o.on("click.key tap.key","div.key",function(){const e=this.innerHTML,t=x();if($(this).hasClass("disabled")||$(this).hasClass("hold-on"))return;const n=Object.keys(i).includes(e);"ENTER"!==e&&"DELETE"!==e?(m<C.length-1&&!n?k(m+1):n&&($signKeys=o.find(".sign:not(.disabled)"),$signKeys.addClass("border-2 border-green-400"),o.find(".key").addClass("hold-on bg-gray-800").removeClass("bg-gray-600")),t.data("origin",e),t.text(e)):"DELETE"===e?t.text().trim()?t.text(""):t.index()>0&&(k(m-1),x().text("")):w();const s=$("#enter");r.find("li").eq(p).text().trim().length<C.length?s.addClass(c).removeClass(a):s.removeClass(c).addClass(a)}),o.on("click tap","div.sign",function(){const e=this.innerHTML,t=x();o.find(".sign").removeClass("border-2 border-green-400");const n=t.data("origin");n&&!$(this).hasClass("disabled")&&(o.find(".key").removeClass("hold-on bg-gray-800").not(".disabled").addClass("bg-gray-600"),t.text(function(e,t){const n=s.indexOf(t);return i[e]?i[e][n<0?0:n]:e}(n,e)),m<C.length-1&&k(m+1))}),k(0)}();