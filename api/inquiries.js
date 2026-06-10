const repo = process.env.GITHUB_REPO;
const token = process.env.GITHUB_TOKEN;
const adminToken = process.env.ADMIN_TOKEN;
function send(res,status,data){res.statusCode=status;res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data))}
function bodyText(data){return Object.entries(data).map(([k,v])=>`${k}: ${v || '-'}`).join('\n')}
async function readJson(req){return await new Promise((resolve,reject)=>{let raw='';req.on('data',c=>raw+=c);req.on('end',()=>{try{resolve(raw?JSON.parse(raw):{})}catch(e){reject(e)}})})}
module.exports = async function handler(req,res){
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,x-admin-token');
  if(req.method==='OPTIONS') return send(res,200,{ok:true});
  if(!repo||!token) return send(res,202,{ok:false,reason:'GitHub backend not configured'});
  if(req.method==='POST'){
    const data=await readJson(req);
    const title=`Inquiry: ${data.name || 'Unknown'} - ${data.productInterest || 'Outboard Motors'}`;
    const gh=await fetch(`https://api.github.com/repos/${repo}/issues`,{method:'POST',headers:{'Authorization':`Bearer ${token}`,'Accept':'application/vnd.github+json','Content-Type':'application/json','User-Agent':'waverider-site'},body:JSON.stringify({title,body:bodyText(data),labels:['inquiry']})});
    const out=await gh.json();
    return send(res,gh.ok?200:gh.status,{ok:gh.ok,item:out});
  }
  if(req.method==='GET'){
    if(!adminToken||req.headers['x-admin-token']!==adminToken) return send(res,401,{ok:false,error:'Unauthorized'});
    const gh=await fetch(`https://api.github.com/repos/${repo}/issues?labels=inquiry&state=open&per_page=100`,{headers:{'Authorization':`Bearer ${token}`,'Accept':'application/vnd.github+json','User-Agent':'waverider-admin'}});
    const items=await gh.json();
    return send(res,gh.ok?200:gh.status,{ok:gh.ok,items});
  }
  return send(res,405,{ok:false,error:'Method not allowed'});
}
