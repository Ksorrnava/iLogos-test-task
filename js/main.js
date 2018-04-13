menuOpen();

function menuOpen() {
  var menu = $('.header').find('.header-menu');
  $('.header .burger').click(function () {
    menu.toggleClass('open');
  });

  $(document).click(function (e) {
    var header = $(".header");
    if (!header.is(e.target) && header.has(e.target).length === 0) {
      menu.removeClass('open');
    }
  });
}

$(function () {
  var seriesOptionsTemp = [],
    seriesOptionsWind = [],
    seriesOptionsHumidity = [],
    seriesOptionsPressure = [],
    seriesCounter = 0,
    serie,
    $option,
    names = ['524901', '703448', '1851632', '2643741', '2172517'];


  function createLegend(chartId, legendId) {
    var chart = $('#' + chartId + '').highcharts();
    var $customLegend = $('#' + legendId + '').append('<select id="customSelect" class="styled" multiple></select>').find('select');

    $.each(chart.series, function (n, serie) {
      $customLegend.append('<option selected>' + serie.name + '</option>');
    });

    $customLegend.selectpicker();

    $customLegend.on('loaded.bs.select', function (e) {
      $(this).closest(".bootstrap-select").find(" li").click(function () {
        $option = $(this).find('.text').text();
        serie = chart.get($option);
        if (serie.visible) {
          serie.hide();
        } else {
          serie.show();
        }
      })
    });
  }

  function createChart() {
    $('#temperature').highcharts({
        chart: {
          type: 'line'
        },
        title: {
          text: null
        },
        rangeSelector: {
          enabled: true,
          buttons: [{}],
          inputPosition: {
            align: 'right',
            y: -10,
          },
        },
        xAxis: {
          type: 'datetime',
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%d %b', this.value);
            }
          }
        },
        yAxis: [{
          labels: {
            format: '{value}°C',
            style: {
              color: 'blue'
            }
          },
          title: {
            text: null,
            style: {
              color: 'blue'
            }
          }
        }],
        legend: {
          enabled: false
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              rangeSelector: {
                enabled: false,
              },
              yAxis: {
                labels: {
                  enabled: false
                }
              },
            }
          }]
        },
        series: seriesOptionsTemp
      },
      function (chart) {
        createLegend('temperature', 'customLegendTemp');
      });



    $('#pressure').highcharts({
        chart: {
          type: 'line'
        },
        title: {
          text: null
        },
        xAxis: {
          type: 'datetime',
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%d %b', this.value);
            }
          }
        },

        yAxis: [{
          labels: {
            format: '{value}hPa',
            style: {
              color: 'blue'
            }
          },
          title: {
            text: null,
            style: {
              color: 'blue'
            }
          }
        }],
        rangeSelector: {
          enabled: true,
          buttons: [{}],
          inputPosition: {
            align: 'right',
            y: -10,
          },
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              rangeSelector: {
                enabled: false,
              },
              yAxis: {
                labels: {
                  enabled: false
                }
              },
            }
          }]
        },
        legend: {
          enabled: false
        },
        series: seriesOptionsPressure
      },
      function (chart) {

        createLegend('pressure', 'customLegendPressure');

      });

    $('#humidity').highcharts({
        chart: {
          type: 'line'
        },
        title: {
          text: null
        },
        xAxis: {
          type: 'datetime',
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%d %b', this.value);
            }
          }
        },

        yAxis: [{
          labels: {
            format: '{value} %',
            style: {
              color: 'blue'
            }
          },
          title: {
            text: null,
            style: {
              color: 'blue'
            }
          }
        }],
        rangeSelector: {
          enabled: true,
          buttons: [{}],
          inputPosition: {
            align: 'right',
            y: -10,
          },
        },
        legend: {
          enabled: false
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              rangeSelector: {
                enabled: false,
              },
              yAxis: {
                labels: {
                  enabled: false
                }
              },
            }
          }]
        },
        series: seriesOptionsHumidity
      },
      function (chart) {

        createLegend('humidity', 'customLegendHumidity');

      });

    $('#wind').highcharts({
        chart: {
          type: 'line'
        },
        title: {
          text: null
        },
        xAxis: {
          type: 'datetime',
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%d %b', this.value);
            }
          }
        },
        yAxis: [{
          labels: {
            format: '{value} m/s',
            style: {
              color: 'blue'
            }
          },
          title: {
            text: null,
            style: {
              color: 'blue'
            }
          }
        }],
        rangeSelector: {
          enabled: true,
          buttons: [{}],
          inputPosition: {
            align: 'right',
            y: -10,
          },
        },
        legend: {
          enabled: false
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              rangeSelector: {
                enabled: false,
              },
              yAxis: {
                labels: {
                  enabled: false
                }
              },
            }
          }]
        },
        series: seriesOptionsWind
      },
      function (chart) {

        createLegend('wind', 'customLegendWind');

      });

  }

  $.each(names, function (n, name) {

    $.getJSON('http://api.openweathermap.org/data/2.5/forecast?id=' + name + '&units=metric&cnt=30&appid=a359c215bbd9b0f80644478f2f8fc891', function (data) {

      var time_zone = 1000 * (new Date().getTimezoneOffset()) * (-60);
      var forecast = data;

      if (forecast.city.name != null) {
        var pressure = [];
        var humidity = [];
        var windSpeed = [];
        var tmp = [];
        var city = forecast.city.name;
        var start = forecast.list[0].dt * 1000 + time_zone;


        for (var i = 0; i < forecast.cnt; i++) {
          pressure.push(Math.round(10 * (forecast.list[i].main.pressure)) / 10);
          humidity.push(Math.round(10 * (forecast.list[i].main.humidity)) / 10);
          windSpeed.push(Math.round(10 * (forecast.list[i].wind.speed)) / 10);
          tmp.push(Math.round(10 * (forecast.list[i].main.temp)) / 10);
        }

        seriesOptionsTemp[n] = {
          name: city,
          id: city,
          data: tmp,
          pointStart: start,
          pointInterval: 3 * 3600 * 1000,
          marker: {
            radius: 2
          }
        };

        seriesOptionsPressure[n] = {
          name: city,
          id: city,
          data: pressure,
          pointStart: start,
          pointInterval: 3 * 3600 * 1000,
          marker: {
            radius: 2
          }
        };

        seriesOptionsHumidity[n] = {
          name: city,
          id: city,
          data: humidity,
          pointStart: start,
          pointInterval: 3 * 3600 * 1000,
          marker: {
            radius: 2
          }
        };
        seriesOptionsWind[n] = {
          name: city,
          id: city,
          data: windSpeed,
          pointStart: start,
          pointInterval: 3 * 3600 * 1000,
          marker: {
            radius: 2
          }
        };

        seriesCounter += 1;

        if (seriesCounter === names.length) {
          createChart();
        }


      }
    });
  });
});
