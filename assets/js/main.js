document.querySelector('.nav-toggle')?.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open'));
const WA='8618292556018';
const OUTBOX_KEY='waverider_inquiry_outbox';
function readOutbox(){try{return JSON.parse(localStorage.getItem(OUTBOX_KEY)||'[]')}catch{return []}}
function saveOutbox(item){const list=readOutbox();list.unshift(item);localStorage.setItem(OUTBOX_KEY,JSON.stringify(list.slice(0,200)))}
function inquiryLines(data){return ['New B2B Inquiry - WaveRider Power',...Object.entries(data).map(([k,v])=>`${k}: ${v||'-'}`)]}
document.getElementById('quoteForm')?.addEventListener('submit',async function(e){
  e.preventDefault();
  const status=document.getElementById('quoteStatus');
  const data=Object.fromEntries(new FormData(this).entries());
  const payload={...data,source:location.href,createdAt:new Date().toISOString()};
  saveOutbox(payload);
  let stored=false;
  try{
    const res=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    stored=res.ok;
  }catch{}
  if(status){
    status.className='form-note '+(stored?'success':'error');
    status.textContent=stored?'Inquiry saved. WhatsApp is opening for fast follow-up.':'WhatsApp is opening. Backend storage needs Vercel environment variables to save leads centrally.';
  }
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(inquiryLines(data).join('\n'))}`,'_blank');
});
