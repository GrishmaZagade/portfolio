var R=document.documentElement;

/* Scroll reveal */
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.06});
document.querySelectorAll(".rv").forEach(function(el){io.observe(el)});

/* Theme toggle */
document.getElementById("th").onclick=function(){var d=R.getAttribute("data-theme");var sysDark=matchMedia("(prefers-color-scheme: dark)").matches;var cur=d||(sysDark?"dark":"light");R.setAttribute("data-theme",cur==="dark"?"light":"dark")};

/* Activity log filter */
document.getElementById("fb").onclick=function(ev){var f=ev.target.getAttribute("data-f");if(!f)return;
this.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b===ev.target)});
document.querySelectorAll(".ev").forEach(function(c){c.style.display=(f==="all"||c.getAttribute("data-t")===f)?"":"none"})};

/* Contact form -> Netlify Forms */
document.getElementById("cf").onsubmit=function(ev){ev.preventDefault();var f=this,btn=f.querySelector("button[type=submit]"),st=document.getElementById("fst");
btn.disabled=true;btn.textContent="TRANSMITTING...";st.className="";st.textContent="";
fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(new FormData(f)).toString()})
.then(function(r){if(!r.ok)throw 0;f.reset();st.className="ok";st.textContent="Message sent! Thank you, I will get back to you soon."})
.catch(function(){st.className="err";st.textContent="Could not send right now. Please email me at grishmazagade0903@gmail.com"})
.then(function(){btn.disabled=false;btn.textContent="DISPATCH_TRANSMISSION ➔"})};

/* AI agent chat */
var P=document.getElementById("agp"),M=document.getElementById("msgs");
function tog(o){P.classList.toggle("o",o)}
document.getElementById("agb").onclick=function(){tog(!P.classList.contains("o"))};
document.getElementById("x").onclick=function(){tog(false)};
document.getElementById("px").onclick=function(){tog(true)};
var A={"/skills":"Languages: Java, Python, JavaScript, PHP. Frameworks: React.js, Node.js, Express.js, Tailwind CSS. Databases: MySQL, MongoDB, PostgreSQL. Tools: Git, GitHub, Figma, Postman.",
"/projects":"1) Ethical Research Assistant, an AI research platform (ongoing). 2) Movie Streaming App with TMDB, JWT auth and watchlists. 3) World News, a PHP and MySQL news portal with translation and text-to-speech.",
"/experience":"Data Science Trainee at Mahindra Group (Jun to Aug 2024) and UI/UX Designer at NextGen Techno Ventures (Jan to May 2024).",
"/education":"B.Tech Computer Engineering at SNDT Women’s University (CGPA 8.47, 2024 to 2027) and Diploma in IT at Government Polytechnic Mumbai (91.33%). Certified: Postman API Fundamentals Student Expert."};
function ask(q){var k=q.toLowerCase();var key=Object.keys(A).filter(function(x){return k.indexOf(x.slice(1))>-1})[0];
var u=document.createElement("div");u.className="u";u.textContent=q;M.appendChild(u);
var r=document.createElement("div");r.textContent=key?A[key]:"Try /skills, /projects, /experience or /education. For anything else, email grishmazagade0903@gmail.com.";M.appendChild(r);M.scrollTop=M.scrollHeight}
document.querySelectorAll(".qc button").forEach(function(b){b.onclick=function(){ask(b.textContent)}});

/* Scroll progress bar */
var pg=document.getElementById("pg");
addEventListener("scroll",function(){var h=R.scrollHeight-innerHeight;pg.style.width=(h>0?scrollY/h*100:0)+"%"},{passive:true});

/* Card spotlight */
document.addEventListener("mousemove",function(e){var c=e.target.closest&&e.target.closest(".card");if(c){var r=c.getBoundingClientRect();c.style.setProperty("--mx",e.clientX-r.left+"px");c.style.setProperty("--my",e.clientY-r.top+"px")}});

/* Typing role text */
var W=["full-stack web apps","secure REST APIs","clean, responsive UIs","AI-powered tools"],wi=0,ci=0,dl=false,rw=document.getElementById("rw");
function tick(){var w=W[wi];ci+=dl?-1:1;rw.textContent=w.slice(0,ci);var t=dl?35:70;if(!dl&&ci===w.length){dl=true;t=1400}else if(dl&&ci===0){dl=false;wi=(wi+1)%W.length;t=350}setTimeout(tick,t)}
tick();

/* Count-up stats */
var co=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;co.unobserve(x.target);var el=x.target,v=parseFloat(el.dataset.v),d=+el.dataset.d,s=el.dataset.s||"",t0=performance.now();(function f(t){var p=Math.min((t-t0)/1600,1);el.textContent=(v*(1-Math.pow(1-p,3))).toFixed(d)+s;if(p<1)requestAnimationFrame(f)})(t0)})},{threshold:.5});
document.querySelectorAll(".stat b").forEach(function(b){co.observe(b)});

/* Particle network background */
(function(){var cv=document.getElementById("cv"),x=cv.getContext("2d"),P=[],w,h;
function rs(){w=cv.width=innerWidth;h=cv.height=innerHeight}rs();addEventListener("resize",rs);
for(var i=0;i<48;i++)P.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35});
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
function dr(){x.clearRect(0,0,w,h);var c=getComputedStyle(R).getPropertyValue("--hi").trim()||"#a594ff";x.fillStyle=c;x.strokeStyle=c;
for(var i=0;i<P.length;i++){var p=P[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;x.globalAlpha=.6;x.beginPath();x.arc(p.x,p.y,1.6,0,6.3);x.fill();
for(var j=i+1;j<P.length;j++){var q=P[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;if(d<14000){x.globalAlpha=.2*(1-d/14000);x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}}
requestAnimationFrame(dr)}dr()})();

/* ===== v2: extra motion ===== */
/* Cursor glow */
var cg=document.getElementById("cg");
addEventListener("mousemove",function(e){cg.style.opacity=1;cg.style.transform="translate("+(e.clientX-210)+"px,"+(e.clientY-210)+"px)"},{passive:true});

/* Button ripple */
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".btn");if(!b)return;var r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=document.createElement("span");sp.className="rip";sp.style.cssText="width:"+s+"px;height:"+s+"px;left:"+(e.clientX-r.left-s/2)+"px;top:"+(e.clientY-r.top-s/2)+"px";b.appendChild(sp);setTimeout(function(){sp.remove()},600)});

/* 3D tilt on skill cards */
document.querySelectorAll(".mx .card").forEach(function(c){
c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect();c.style.setProperty("--ry",((e.clientX-r.left)/r.width-.5)*10+"deg");c.style.setProperty("--rx",-((e.clientY-r.top)/r.height-.5)*10+"deg")});
c.addEventListener("mouseleave",function(){c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")})});

/* Parallax blobs */
var b1=document.querySelector(".b1"),b2=document.querySelector(".b2"),up=document.getElementById("up");
addEventListener("scroll",function(){b1.style.translate="0 "+scrollY*.18+"px";b2.style.translate="0 "+(-scrollY*.12)+"px";up.classList.toggle("s",scrollY>600)},{passive:true});
up.onclick=function(){scrollTo({top:0,behavior:"smooth"})};

/* Active nav link */
var ls=document.querySelectorAll(".links a"),so=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){ls.forEach(function(a){a.classList.toggle("act",a.getAttribute("href")==="#"+x.target.id)})}})},{rootMargin:"-40% 0px -55% 0px"});
document.querySelectorAll("section[id]").forEach(function(s){so.observe(s)});

/* ===== v3: custom cursor & more motion ===== */
(function(){
var fine=matchMedia("(hover:hover) and (pointer:fine)").matches,rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
var cd=document.getElementById("cd"),cr=document.getElementById("cr");

/* Custom cursor: dot + trailing ring */
if(fine){var mx=-100,my=-100,rx=-100,ry=-100,lt=0;
addEventListener("mousemove",function(e){mx=e.clientX;my=e.clientY;cd.style.opacity=1;cr.style.opacity=1;
cd.style.transform="translate("+mx+"px,"+my+"px)";
if(!rm){var n=Date.now();if(n-lt>45){lt=n;var t=document.createElement("span");t.className="tr";t.style.left=mx+"px";t.style.top=my+"px";document.body.appendChild(t);setTimeout(function(){t.remove()},700)}}});
(function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;cr.style.transform="translate("+rx+"px,"+ry+"px)";requestAnimationFrame(loop)})();
document.addEventListener("mouseover",function(e){cr.classList.toggle("h",!!(e.target.closest&&e.target.closest("a,button,summary,input,textarea,.pipe")))});
document.addEventListener("mousedown",function(e){cr.classList.add("d");if(rm)return;for(var i=0;i<8;i++){var a=i/8*6.283,b=document.createElement("span");b.className="bs";b.style.left=e.clientX+"px";b.style.top=e.clientY+"px";b.style.setProperty("--dx",Math.cos(a)*34+"px");b.style.setProperty("--dy",Math.sin(a)*34+"px");document.body.appendChild(b);(function(x){setTimeout(function(){x.remove()},650)})(b)}});
document.addEventListener("mouseup",function(){cr.classList.remove("d")});
document.documentElement.addEventListener("mouseleave",function(){cd.style.opacity=0;cr.style.opacity=0});
}

if(rm)return;

/* Floating code symbols */
var S=["</>","{ }","( )","=>","[]","&&","01","#","::"];
for(var i=0;i<14;i++){var s=document.createElement("span");s.className="fs";s.textContent=S[i%S.length];s.style.cssText="left:"+Math.random()*100+"%;font-size:"+(12+Math.random()*16)+"px;animation-duration:"+(14+Math.random()*16)+"s;animation-delay:-"+Math.random()*20+"s";document.body.appendChild(s)}

/* Magnetic buttons */
document.querySelectorAll(".btns .btn").forEach(function(b){
b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.translate=(e.clientX-r.left-r.width/2)*.25+"px "+(e.clientY-r.top-r.height/2)*.35+"px"});
b.addEventListener("mouseleave",function(){b.style.translate=""})});

/* Heading scramble reveal */
var sc=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;sc.unobserve(x.target);var el=x.target,t=el.textContent,f=0,C="!<>-_/[]{}=+*^?#";
var iv=setInterval(function(){el.textContent=t.split("").map(function(ch,i){return ch===" "?" ":(i<f?ch:C[Math.floor(Math.random()*C.length)])}).join("");f+=.6;if(f>=t.length+1){el.textContent=t;clearInterval(iv)}},35)})},{threshold:.8});
document.querySelectorAll("section h2").forEach(function(h){sc.observe(h)});
})();
