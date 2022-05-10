const lander=document.querySelector('.lander');
const search_city=document.querySelector('.city');
const search_btn=document.querySelector('.search-btn');

const result=document.querySelector('.result');
const desc_img=document.querySelector('.desc_img')
const desc=document.querySelector('.desc');
const city_name=document.querySelector('.result_city')
const temp=document.querySelector('.temp');

const humidity=document.querySelector('.humidity>h3');
const air=document.querySelector('.air>h3');
const gust=document.querySelector('.gust>h3');
const wind=document.querySelector('.wind>h3');

let lat=document.querySelector('.lat>p1');
let lon=document.querySelector('.lon>p1');
let cards=document.querySelectorAll('.card');

let card_p=document.querySelectorAll('.card>p');
let card_h3=document.querySelectorAll('.card>h3');
let card_p1=document.querySelectorAll('.card>p1');
let day=document.querySelector('.more_result>div>p');

const weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const api_id='51a7d9a178839c5234c77542f46d6975';

search_btn.addEventListener('click',async function(){
    let api_site=`https://api.openweathermap.org/data/2.5/weather?q=${search_city.value}&appid=${api_id}`;
    let response=fetch(api_site)
    .then(response=> response.json())
    .then(data=> {
        lat.textContent=data.coord.lat;
        lon.textContent=data.coord.lon;
        result.style.display='flex';
        lander.classList.add('hidden');
        air.textContent=data.main.pressure+' PS';
        desc_img.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        desc.textContent=data.weather[0].description;
        city_name.textContent=data.name;
        temp.textContent=Math.round(data.main.temp-273.15)+ '°C';
        humidity.textContent=data.main.humidity+'%';
    let res2=fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search_city.value}&appid=${api_id}`)
        .then(res2=>res2.json())
        .then(data3=>{
            gust.textContent=data3.list[0].wind.gust+' Km/h';
            let x=new Date(data3.list[0].dt_txt);
            day.textContent=weekdays[x.getDay()];
            for(let i=0;i<=cards.length;i++){
                let date=new Date(data3.list[i].dt_txt);
                card_h3[i].textContent=(data3.list[i+1].main.temp-273.15);
                card_h3[i].textContent=card_h3[i].textContent.slice(0,4)+'°C';
                card_p[i].textContent=date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
                
                card_p1[i].textContent=(data3.list[i].main.feels_like-273.15);
                card_p1[i].textContent='Feels Like '+card_p1[i].textContent.slice(0,4)+'°C';
            }
        })
    });
    
    
})
