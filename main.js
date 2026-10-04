const koreaDay=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Seoul'}));
const today=Date.UTC(koreaDay.getFullYear(),koreaDay.getMonth(),koreaDay.getDate());
const days=Math.ceil((Date.UTC(2026,9,9)-today)/86400000);
document.getElementById('countdown').textContent=days>0?'D–'+days:days>=-1?'여행 중':'또 만나자!';
if(days<=0)document.getElementById('dayLabel').textContent=days>=-1?'우리의 가을 여행':'즐거웠던 가을';
const tabs=[...document.querySelectorAll('[role=tab]')];
function selectTab(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.dataset.day).hidden=!active;});}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;selectTab(tabs[next]);tabs[next].focus();});});

const config=window.TRIP_CONFIG;
const query=encodeURIComponent(config.pensionName+' '+config.address);
document.getElementById('kakao-link').href='https://map.kakao.com/link/search/'+query;
document.getElementById('naver-link').href='https://map.naver.com/p/search/'+query;
document.getElementById('copy-address').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(config.address);e.target.textContent='주소 복사 완료';}catch{document.getElementById('map-status').textContent='주소를 길게 눌러 복사해 주세요: '+config.address;}});
if(config.kakaoJavaScriptKey){
 const sdk=document.createElement('script');
 sdk.src='https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services&appkey='+encodeURIComponent(config.kakaoJavaScriptKey);
 const status=document.getElementById('map-status');
 sdk.onerror=()=>{status.textContent='지도를 불러오지 못했어요. 아래 지도 버튼을 이용해 주세요.';};
 sdk.onload=()=>{try{kakao.maps.load(()=>{new kakao.maps.services.Geocoder().addressSearch(config.address,(result,state)=>{if(state!==kakao.maps.services.Status.OK||!result.length){status.textContent='지도에서 주소를 찾지 못했어요. 아래 버튼을 이용해 주세요.';return;}const container=document.getElementById('map');container.hidden=false;const position=new kakao.maps.LatLng(Number(result[0].y),Number(result[0].x));const map=new kakao.maps.Map(container,{center:position,level:4});new kakao.maps.Marker({map,position});map.addControl(new kakao.maps.ZoomControl(),kakao.maps.ControlPosition.RIGHT);status.textContent='대부도 봄날 독채 펜션 · 서낭당길 9';});});}catch{sdk.onerror();}};
 document.head.append(sdk);
}
function weatherText(code){if(code===0)return '맑음';if([1,2].includes(code))return '구름 조금';if(code===3)return '흐림';if([45,48].includes(code))return '안개';if(code>=51&&code<=57)return '이슬비';if(code>=61&&code<=67)return '비';if(code>=71&&code<=77)return '눈';if(code>=80&&code<=82)return '소나기';if(code>=85&&code<=86)return '눈 소나기';if(code>=95&&code<=99)return '뇌우';return '날씨 정보 없음';}
const weatherHost=document.getElementById('weather-days'),weatherStatus=document.getElementById('weather-status'),retry=document.getElementById('weather-retry');
const cacheKey='hangul-trip-weather-v1';
function renderWeather(data,fetchedAt,stale=false){
 weatherHost.replaceChildren();const daily=data.daily;
 config.dates.forEach(date=>{const card=document.createElement('article');const heading=document.createElement('h3');heading.textContent=date.slice(5).replace('-','.')+(date.endsWith('09')?' 금요일':' 토요일');card.append(heading);const index=daily.time.indexOf(date);
 if(index<0){const p=document.createElement('p');p.textContent='예보 준비 중';card.append(p);}else{const condition=document.createElement('strong');condition.textContent=weatherText(daily.weather_code[index]);card.append(condition);const fmt=(key,unit)=>Number.isFinite(daily[key]?.[index])?daily[key][index]+unit:'정보 없음';const rows=[['최저 / 최고',fmt('temperature_2m_min','°')+' / '+fmt('temperature_2m_max','°')],['최대 강수확률',fmt('precipitation_probability_max','%')],['예상 강수량',fmt('precipitation_sum',' mm')],['최대 바람',fmt('wind_speed_10m_max',' m/s')]];const dl=document.createElement('dl');rows.forEach(([name,value])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=value;dl.append(dt,dd);});card.append(dl);}weatherHost.append(card);});
 weatherStatus.textContent=(stale?'최근 저장된 예보 · ':'')+'조회 시각: '+new Date(fetchedAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})+' (한국 시간)';
}
async function loadWeather(){
 retry.disabled=true;weatherStatus.textContent='예보를 확인하고 있어요.';
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
 try{const params=new URLSearchParams({latitude:config.weatherLatitude,longitude:config.weatherLongitude,daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max',wind_speed_unit:'ms',timezone:'Asia/Seoul',forecast_days:'16'});const response=await fetch('https://api.open-meteo.com/v1/forecast?'+params,{signal:controller.signal});if(!response.ok)throw new Error('Weather request failed');const data=await response.json();if(!Array.isArray(data.daily?.time))throw new Error('Invalid weather data');const fetchedAt=Date.now();renderWeather(data,fetchedAt);try{localStorage.setItem(cacheKey,JSON.stringify({data,fetchedAt}));}catch{}}
 catch{let cache;try{cache=JSON.parse(localStorage.getItem(cacheKey));}catch{}if(cache?.data?.daily?.time&&cache.fetchedAt){renderWeather(cache.data,cache.fetchedAt,true);weatherStatus.textContent+=' · 새 예보를 가져오지 못했어요.';}else{weatherHost.replaceChildren();const p=document.createElement('p');p.textContent='날씨를 불러오지 못했어요. 잠시 후 다시 확인해 주세요.';weatherHost.append(p);weatherStatus.textContent='인터넷 연결 또는 날씨 서비스 상태를 확인해 주세요.';}}
 finally{clearTimeout(timer);retry.disabled=false;}
}
retry.addEventListener('click',loadWeather);
loadWeather();

function renderShopping(membersId,itemsId,members,items){
 const host=document.getElementById(membersId);
 if(!members.length){const p=document.createElement('p');p.className='empty-members';p.textContent='명단 준비 중';host.append(p);}
 else members.forEach(name=>{const span=document.createElement('span');span.textContent=name;host.append(span);});
 const list=document.getElementById(itemsId);
 items.forEach(item=>{const label=document.createElement('label');const input=document.createElement('input');input.type='checkbox';label.append(input,document.createTextNode(item));list.append(label);});
}
renderShopping('mart-members','mart-items',config.shopping.martMembers,config.shopping.martItems);
renderShopping('seafood-members','seafood-items',config.shopping.seafoodMembers,config.shopping.seafoodItems);
