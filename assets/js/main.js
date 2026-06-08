document.querySelector('.nav-toggle')?.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open'));
const WA='8618292556018';
document.getElementById('quoteForm')?.addEventListener('submit',function(e){
  e.preventDefault();
  const data=Object.fromEntries(new FormData(this).entries());
  const lines=['New B2B Inquiry - WaveRider Power',...Object.entries(data).map(([k,v])=>`${k}: ${v||'-'}`)];
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank');
});
