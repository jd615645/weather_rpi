var vm = new Vue({
  el: '#app',
  data() {
    return {
      city: 'Taizhong',
      weather: '多雲',
      tempMax: 20,
      tempMin: 20,
      tempNow: 20,
      humi: 20,
      pm25: 0,
      iconUrl: '',
      timeNow: '13:00',
    }
  },
  computed: {
    airQuality() {
      var pm25 = this.pm25;
      if (pm25>310) {
        return '危害';
      }
      else if (pm25>200) {
        return '非常不健康';
      }
      else if (pm25>150) {
        return '對所有族群不健康';
      }
      else if (pm25>100) {
        return '對敏感族群不健康';
      }
      else if (pm25>50) {
        return '普通';
      }
      else {
        return '良好';
      }
    },
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      var getData = $.getJSON('../data/weather.json');
      var getPM25 = $.getJSON('../data/pm25.json');
      $.when(getData, getPM25).done((weather, pm25)=>{
        console.log(weather);
        var weatherData = weather[0]['forecast']['simpleforecast']['forecastday'][0],
            weatherNow = weather[0]['current_observation'];
        // console.log(weatherNow);

        this.tempMax = weatherData['high']['celsius'];
        this.tempLow = weatherData['low']['celsius'];

        this.city = weatherNow['display_location']['full'];
        this.weather = weatherNow['weather'];
        this.tempNow = weatherNow['temp_c'];
        this.humi = weatherNow['relative_humidity'];
        this.iconUrl = weatherNow['icon_url'];

        // --pm25-- //
        this.pm25 = pm25[0][3]['Data']['PM10'];
      });
      setInterval(this.updateDateTime, 1000);
    },
    updateDateTime() {
      var NowDate = new Date();
      var h = this.getZeroPad(NowDate.getHours());
      var m = this.getZeroPad(NowDate.getMinutes());
      var s = this.getZeroPad(NowDate.getSeconds());　
      this.timeNow = h + ':' + m + ':' + s;
    },
    getZeroPad (n) {
      return (parseInt(n, 10) >= 10 ? '' : '0') + n;
    }
  }
});
