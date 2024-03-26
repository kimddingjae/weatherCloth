const API_KEY = 'f529fd449f12a2ba53e93253a89bc350';
const button = document.querySelector('.button');

const tempSection     = document.querySelector('.temperature');
const feelLikeSection = document.querySelector('.feelLike');
const placeSection    = document.querySelector('.place');
const iconSection     = document.querySelector('.icon');
const clothSection     = document.querySelector('.cloth');

const clothArr = [
                    {"temp" : ["28.00","100.99"] , "img" : "28.png"},
                    {"temp" : ["23.00","27.99" ] , "img" : "23_27.png"},
                    {"temp" : ["20.00","22.99" ] , "img" : "20_22.png"},
                    {"temp" : ["17.00","19.99" ] , "img" : "17_19.png"},
                    {"temp" : ["12.00","16.99" ] , "img" : "12_16.png"},
                    {"temp" : ["9.00","11.99"  ] , "img" : "9_11.png"},
                    {"temp" : ["5.00","8.99"   ] , "img" : "5_8.png"},
                    {"temp" : ["-100.00","4.99"] , "img" : "4.png"}
                  ]

/*
button.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(success, fail);
});
*/

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;  
  
  getWeather(latitude, longitude);
  //openApi(latitude, longitude);
};

const fail = () => {
  alert("좌표를 받아올 수 없음");
}

navigator.geolocation.getCurrentPosition(success, fail);





const getWeather = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  
   
  fetch(url)
  .then((response) => {
      return response.json();
    })
  .then((json) => { 
    
    const temperature = json.main.temp;
    const feelLike = json.main.feels_like;
    const place = json.name;    
    
    tempSection.innerText      = temperature;
    feelLikeSection.innerText  = feelLike;
    placeSection.innerText     = place;
    
    const icon = json.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    iconSection.setAttribute('src', iconURL);
    
    
    const result = clothArr.filter((element) => test(element,temperature));
    clothSection.setAttribute('src', result[0].img);
  })
  .catch((error) => {
    console.log(error);
  })
}

const test = (clothTemp,temp) => {
  
  if(parseFloat(clothTemp.temp[0]) <=parseFloat(temp) && parseFloat(temp) <=parseFloat(clothTemp.temp[1])){
    return true;
  } else {
    return false;
  }
   
}

const openApi = (lat, lon) => {

  var key = 'rt3ZWGfDs0X0oQdxVXA0VZSKEDsug5L5SFkddQWfQFdijH2mus%2FmhoCSE1LSdQpv2WwDhF4xZ4iwzQd%2B1qje3g%3D%3D';
  var today  = new Date();   
  var year   = today.getFullYear(); // 년도
  var month  = (today.getMonth() + 1).toString().padStart(2,'0');  // 월
  var date   = today.getDate().toString().padStart(2,'0');  // 날짜
  var day    = today.getDay();  // 요일
  var hours  = today.getHours() - 2; // 시
      hours  = hours.toString().padStart(2,'0') + '00'; // 시
  
  var baseDt = year + month + date

  var xhr = new XMLHttpRequest();
  var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
  var queryParams = '?' + encodeURIComponent('serviceKey') + '='+key; /*Service Key*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500'); /**/
  queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
  queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(baseDt); /**/
  queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hours); /**/
  queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(parseInt(lat)); /**/
  queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(parseInt(lon)); /**/
  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var response = this.responseText;
          console.log(response)
      }
  };
  
  xhr.send('');

}
