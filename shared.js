(function(){
  'use strict';

  /* ── CURSOR ── */
  const cur=document.getElementById('vl-cursor');
  const ring=document.getElementById('vl-ring');
  if(cur&&ring){
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{
      mx=e.clientX; my=e.clientY;
      cur.style.left=mx+'px'; cur.style.top=my+'px';
    });
    (function lr(){
      rx+=(mx-rx)*.09; ry+=(my-ry)*.09;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(lr);
    })();
    document.querySelectorAll('a,button,[data-h]').forEach(el=>{
      el.addEventListener('mouseenter',()=>{ cur.classList.add('h'); ring.classList.add('h'); });
      el.addEventListener('mouseleave',()=>{ cur.classList.remove('h'); ring.classList.remove('h'); });
    });
  }

  /* ── PROGRESS BAR ── */
  const prog=document.getElementById('vl-prog');
  if(prog) window.addEventListener('scroll',()=>{
    const d=document.documentElement;
    prog.style.width=(d.scrollTop/(d.scrollHeight-d.clientHeight)*100)+'%';
  },{passive:true});

  /* ── NAV SCROLL ── */
  const nav=document.querySelector('.nav');
  if(nav) window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10),{passive:true});

  /* ── BURGER ── */
  const burger=document.querySelector('.nav__burger');
  const mnav=document.querySelector('.mobile-nav');
  if(burger&&mnav){
    burger.addEventListener('click',()=>{ burger.classList.toggle('open'); mnav.classList.toggle('open'); });
    mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ burger.classList.remove('open'); mnav.classList.remove('open'); }));
  }

  /* ── INTERSECTION OBSERVER GLOBAL ── */
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target;
      if(el.classList.contains('page-hero__h1')){
        el.classList.add('on');
        el.querySelectorAll('.split-line').forEach((ln,i)=>{
          setTimeout(()=>ln.classList.add('on'),160+i*130);
        });
      } else {
        el.classList.add('on');
      }
      io.unobserve(el);
    });
  },{rootMargin:'0px 0px -40px 0px',threshold:.06});

  document.querySelectorAll(
    '[data-r],.eyebrow,.h2,.marquee,'+
    '.page-hero__num,.page-hero__h1,.page-hero__p,'+
    '.footer__col,.footer__logo,.footer__desc,'+
    '.hero__proof,.cta-band'
  ).forEach(el=>io.observe(el));

  /* ── WORD-BY-WORD REVEAL (data-words) ── */
  document.querySelectorAll('[data-words]').forEach(container=>{
    // Wrap chaque mot dans un span .word
    const html=container.innerHTML;
    const wrapped=html.replace(/(\S+)/g,'<span class="words-wrap"><span class="word">$1</span></span>');
    container.innerHTML=wrapped;
    const wio=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.querySelectorAll('.word').forEach((w,i)=>setTimeout(()=>w.classList.add('on'),i*55));
      wio.unobserve(e.target);
    }),{threshold:.3});
    wio.observe(container);
  });

  /* ── ACTIVE NAV LINK ── */
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav__link').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active');
  });

  /* ── FOOTER STAGGER ── */
  const footer=document.querySelector('.footer');
  if(footer){
    const fio=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(!e.isIntersecting)return;
      document.querySelectorAll('.footer__col,.footer__logo,.footer__desc')
        .forEach((el,i)=>setTimeout(()=>el.classList.add('on'),i*80));
      fio.disconnect();
    }),{threshold:.08});
    fio.observe(footer);
  }

  /* ── MAGNETIC BUTTONS ── */
  document.querySelectorAll('.btn,.nav__cta').forEach(b=>{
    b.addEventListener('mousemove',e=>{
      const r=b.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*.16;
      const y=(e.clientY-r.top-r.height/2)*.16;
      b.style.transform=`translate(${x}px,${y}px)`;
      b.style.transition='transform .08s ease';
    });
    b.addEventListener('mouseleave',()=>{
      b.style.transform='';
      b.style.transition='transform .55s cubic-bezier(.16,1,.3,1)';
    });
  });

})();
