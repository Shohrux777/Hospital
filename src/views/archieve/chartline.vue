<template>
  <div>
    <div class="d-flex " style="height: 100vh;">
        <div style="width: 20%; border-right padding: 5px 15px; height: 100vh; overflow: hidden; overflow-y: auto">
           <div @click="toogleChart1">
            <apexchart type="area" ref="chartS0" height="250" :options="chartOptions1" :series="series"></apexchart>
          </div>
          <div @click="toogleChart2">
            <apexchart type="area" ref="chartS1" height="250" :options="chartOptions2" :series="series1"></apexchart>
          </div>
          <div @click="toogleChart3">
            <apexchart type="area" ref="chartS2" height="250" :options="chartOptions3" :series="series2"></apexchart>
          </div>
          
        </div>
        <div  style="width: 80%">
          <div class="border-bottom mb-3 mt-4">
            <h1 style="color:blue; margin-left:10px; text-align:center; margin-bottom:10px;" class=" mb-3">Диаграмма</h1>
          </div>
          <div v-show="fun1">
            <apexchart  type="area" ref="chart" height="350" :options="chartOptions" :series="series"></apexchart>
          </div>
          <div v-show="fun2">
            <apexchart type="area" ref="chart1" height="350" :options="chartOptions4" :series="series1"></apexchart>
          </div>
          <div v-show ="fun3">
            <apexchart type="area" ref="chart2" height="350" :options="chartOptions5" :series="series2"></apexchart>
          </div>
        </div>
      </div>
    
  </div>
    
</template>

<script>
export default {
  data (){
    return{
      fun1: true,
      fun2: false,
      fun3: false,
      series: [{
            name: 'Влажнисть',
            data: []
          },
          {
            name: 'Освещения',
            data: []
          },
          {
            name: 'Температура',
            data: []
          }],
          series1: [{
            name: 'Влажнисть',
            data: []
          },
          {
            name: 'Освещения',
            data: []
          },
          {
            name: 'Температура',
            data: []
          }],
          series2: [{
            name: 'Влажнисть',
            data: []
          },
          {
            name: 'Освещения',
            data: []
          },
          {
            name: 'Температура',
            data: []
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: true
            },
            title: {
              text: '1-комната',
              align: 'left'
            },
            colors: ['#7716EA', '#545454', '#77B000',],
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.3,
                stops: [0, 90, 100]
              },
            },
            stroke: {
              curve: 'smooth'
            },  
            yaxis: {
             
              title: {
                text: 'Температура',
              },
              min: 1,
              max: 100
            },
            xaxis: {
              categories: []
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
          chartOptions1: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
            },
            colors: ['#7716EA', '#545454', '#77B000',],
            legend: {
              position: 'bottom',
              horizontalAlign: 'center'
            },
            title: {
              text: '1-комната',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.3,
                stops: [0, 90, 100]
              },
            },
            stroke: {
              curve: 'smooth'
            },  
            yaxis: {
             
              title: {
                text: 'Температура',
              },
              min: 1,
              max: 100
            },
            xaxis: {
              categories: []
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
          chartOptions2: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
            },
            colors: ['#ff4500', '#00b341', '#a905b6',],
            legend: {
              position: 'bottom',
              horizontalAlign: 'center'
            },
            title: {
              text: '2-комната',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.3,
                stops: [0, 90, 100]
              },
            },
            stroke: {
              curve: 'smooth'
            },  
            yaxis: {
             
              title: {
                text: 'Температура',
              },
              min: 1,
              max: 100
            },
            xaxis: {
              categories: []
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
          chartOptions3: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
            },
            colors: ['#c9de00', '#7f5345', '#000000',],
            legend: {
              position: 'bottom',
              horizontalAlign: 'center'
            },
            title: {
              text: '3-комната',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.3,
                stops: [0, 90, 100]
              },
            },
            stroke: {
              curve: 'smooth'
            },  
            yaxis: {
             
              title: {
                text: 'Температура',
              },
              min: 1,
              max: 100
            },
            xaxis: {
              categories: []
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
          chartOptions4: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: true
            },
            markers: {
              size: 0,
            },
            colors: ['#ff4500', '#00b341', '#a905b6',],
            legend: {
              position: 'bottom',
              horizontalAlign: 'center'
            },
            title: {
              text: '2-комната',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.3,
                stops: [0, 90, 100]
              },
            },
            stroke: {
              curve: 'smooth'
            },  
            yaxis: {
             
              title: {
                text: 'Температура',
              },
              min: 1,
              max: 100
            },
            xaxis: {
              categories: []
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
          chartOptions5: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: true
            },
            markers: {
              size: 0,
            },
            colors: ['#c9de00', '#7f5345', '#000000',],
            legend: {
              position: 'bottom',
              horizontalAlign: 'center'
            },
            title: {
              text: '3-комната',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.3,
                stops: [0, 90, 100]
              },
            },
            stroke: {
              curve: 'smooth'
            },  
            yaxis: {
             
              title: {
                text: 'Температура',
              },
              min: 1,
              max: 100
            },
            xaxis: {
              categories: []
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
          

    }
  },
  mounted(){
    setInterval(this.test, 3000);
  },
  methods:{
    toogleChart1(){
      this.fun1 = true;
      this.fun2 = false;
      this.fun3 = false;
    },
    toogleChart2(){
      this.fun1 = false;
      this.fun2 = true;
      this.fun3 = false;
    },
    toogleChart3(){
      this.fun1 = false;
      this.fun2 = false;
      this.fun3 = true;
    },
    test(){
      const d = new Date();
        console.log(d.toLocaleTimeString())
        {
          this.series[0].data.push(Math.floor(Math.random() * 100));
          this.series[1].data.push(Math.floor(Math.random() * 50));
          this.series[2].data.push(Math.floor(Math.random() * 10));
          this.chartOptions.xaxis.categories.push(d.toLocaleTimeString())
          if(this.chartOptions.xaxis.categories.length > 12){
            this.chartOptions.xaxis.categories.splice(0,1);
            this.series[0].data.splice(0,1);
            this.series[1].data.splice(0,1);
            this.series[2].data.splice(0,1);
          }

          this.$refs.chart.chart.updateOptions({
            series: this.series,
            xaxis: {
              categories: this.chartOptions.xaxis.categories
            }
          })
          this.$refs.chartS0.chart.updateOptions({
            series: this.series,
            xaxis: {
              categories: this.chartOptions1.xaxis.categories
            }
          })
        }

        {
          this.series1[0].data.push(Math.floor(Math.random() * 100));
          this.series1[1].data.push(Math.floor(Math.random() * 50));
          this.series1[2].data.push(Math.floor(Math.random() * 10));
          this.chartOptions4.xaxis.categories.push(d.toLocaleTimeString())
          if(this.chartOptions4.xaxis.categories.length > 12){
            this.chartOptions4.xaxis.categories.splice(0,1);
            this.series1[0].data.splice(0,1);
            this.series1[1].data.splice(0,1);
            this.series1[2].data.splice(0,1);
          }

          this.$refs.chart1.chart.updateOptions({
            series: this.series1,
            xaxis: {
              categories: this.chartOptions4.xaxis.categories
            }
          })
          this.$refs.chartS1.chart.updateOptions({
            series: this.series1,
            xaxis: {
              categories: this.chartOptions2.xaxis.categories
            }
          })
        }
        {
          this.series2[0].data.push(Math.floor(Math.random() * 100));
          this.series2[1].data.push(Math.floor(Math.random() * 50));
          this.series2[2].data.push(Math.floor(Math.random() * 10));
          this.chartOptions5.xaxis.categories.push(d.toLocaleTimeString())
          if(this.chartOptions5.xaxis.categories.length > 12){
            this.chartOptions5.xaxis.categories.splice(0,1);
            this.series2[0].data.splice(0,1);
            this.series2[1].data.splice(0,1);
            this.series2[2].data.splice(0,1);
          }

          this.$refs.chart2.chart.updateOptions({
            series: this.series2,
            xaxis: {
              categories: this.chartOptions5.xaxis.categories
            }
          })
          this.$refs.chartS2.chart.updateOptions({
            series: this.series2,
            xaxis: {
              categories: this.chartOptions3.xaxis.categories
            }
          })
        }
    }
  }
  
}
</script>

<style>

</style>