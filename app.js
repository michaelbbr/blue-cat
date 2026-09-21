const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const cinema=document.querySelector('.cinema');
const story=document.querySelector('.personality');
const scenes=[...document.querySelectorAll('.scene')];
const nav=[...document.querySelectorAll('[data-scene]')];
const clamp=x=>Math.max(0,Math.min(1,x));
let pending=false;
function frame(){
 const p=clamp(-cinema.getBoundingClientRect().top/Math.max(1,cinema.offsetHeight-innerHeight));
 const mobile=innerWidth<701;
 cinema.style.setProperty('--push',reduce.matches?1:1+p*(mobile?.22:.48));
 cinema.style.setProperty('--title-opacity',1-clamp(p*2.5));
 cinema.style.setProperty('--title-y',`${-p*100}px`);
 cinema.style.setProperty('--intimate',clamp((p-.3)*3));
 cinema.style.setProperty('--progress',`${p*100}%`);
 const sp=clamp(-story.getBoundingClientRect().top/Math.max(1,story.offsetHeight-innerHeight));
 const index=Math.min(2,Math.floor(sp*3));
 scenes.forEach((s,i)=>{s.classList.toggle('is-active',i===index);if(!reduce.matches){s.inert=i!==index;s.setAttribute('aria-hidden',String(i!==index));}else{s.inert=false;s.removeAttribute('aria-hidden');}});
 nav.forEach((b,i)=>{b.classList.toggle('is-active',i===index);b.setAttribute('aria-current',i===index?'step':'false');});
 pending=false;
}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(frame);}},{passive:true});
addEventListener('resize',frame);reduce.addEventListener('change',frame);frame();
nav.forEach((b,i)=>b.addEventListener('click',()=>{const y=story.getBoundingClientRect().top+scrollY+(story.offsetHeight-innerHeight)*((i+.15)/3);scrollTo({top:y,behavior:reduce.matches?'instant':'smooth'});}));
const cards=[...document.querySelectorAll('.polaroid')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});const kind=button.dataset.filter;cards.forEach(c=>c.hidden=kind!=='all'&&c.dataset.category!==kind);document.querySelector('#food-story').hidden=kind!=='food';document.querySelector('#filter-note').textContent=kind==='food'?window.blueText.message('food'):window.blueText.message('count').replace('{n}',cards.filter(c=>!c.hidden).length);}));
const dialog=document.querySelector('#lightbox');cards.forEach(card=>card.addEventListener('click',()=>{const original=card.querySelector('img'),photo=dialog.querySelector('img');photo.src=original.src;photo.alt=original.alt;dialog.querySelector('p').textContent=card.dataset.caption;dialog.showModal();}));document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
let timer;document.querySelectorAll('.treat').forEach(b=>b.addEventListener('click',()=>{const toast=document.querySelector('#toast');toast.textContent=window.blueText.message('toast');toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),3500);}));

