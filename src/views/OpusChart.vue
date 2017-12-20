<template>
  <div class="about-me bga-back-top">
    <div class="frame-box">
<!--       {{chart.user.avatarUrl}} -->
    <!--   {{ Object.keys(chart.quarterCommitCount)}} -->
  <!--     <iframe src="https://github-profile-summary.com/user/jackieli123723" id="iframeId" frameborder="0" scrolling="no"  width="100%" height="100%" class="external-frame" ></iframe> -->
    
      <!-- github信息 -->
        <div class="user-info">
            <img :src="chart.user.avatarUrl" :alt="chart.user.login" class="user-info__img">
            <div class="user-info__details">
                <div>
                    <i class="fa fa-fw fa-user"></i>{{ chart.user.login }}
                    <small v-if="chart.user.name">({{ chart.user.name }})</small>
                </div>
                <div><i class="fa fa-fw fa-database"></i>{{ chart.user.publicRepos }} public repos</div>
                <div><i class="fa fa-fw fa-clock-o"></i>Joined GitHub {{chart.user.createdAt | formatTime}}</div>
                <div v-if="chart.user.email"><i class="fa fa-fw fa-envelope"></i> {{ chart.user.email }}</div>
                <div v-if="chart.user.company"><i class="fa fa-fw fa-building"></i>{{ chart.user.company }}</div>
                <div><i class="fa fa-fw fa-external-link"></i><a :href="chart.user.htmlUrl" target="_blank">View profile on GitHub</a></div>
            </div>
            <div class="chart-container commits-per-quarter">
                 <charts :type="'line'" :data="dataLine" :options="optionsLine" ></charts>
            </div>
        </div>
  <!--     {{pieChart("langRepoCount", chart).data}}<br/>
       {{pieChart("langRepoCount", chart).options}} -->
      <!-- 5个pie图 -->
       <div class="charts">
          <div class="chart-row">
              <div class="chart-container chart-container--third">
                  <h2>Repos per Language</h2>
                  <charts :type="'doughnut'" :data="pieChart('langRepoCount',chart).data" :options="pieChart('langRepoCount', chart).options" id="langRepoCount"></charts>
                   
              </div>
              <div   v-if="Object.keys(chart.langStarCount).length > 0" class="chart-container chart-container--third">
                  <h2>Stars per Language</h2>
                  <charts :type="'doughnut'" :data="pieChart('langStarCount',chart).data" :options="pieChart('langStarCount', chart).options" id="langStarCount"></charts>
              </div>
              <div class="chart-container chart-container--third">
                  <h2>Commits per Language</h2>
                 <charts :type="'doughnut'" :data="pieChart('langCommitCount',chart).data" :options="pieChart('langCommitCount', chart).options" id="langCommitCount"></charts>
              </div>
          </div>
          <div class="chart-row">
              <div class="chart-container chart-container--half">
                  <h2>Commits per Repo
                      <small v-if="Object.keys(chart.repoCommitCount).length === 10">(top 10)</small>
                  </h2>
                     <charts :type="'doughnut'" :data="pieChart('repoCommitCount',chart).data" :options="pieChart('repoCommitCount', chart).options" id="repoCommitCount"></charts>
              </div>
              <div v-if="Object.keys(chart.repoStarCount).length > 0"  class="chart-container chart-container--half">
                  <h2>Stars per Repo
                      <small v-if="Object.keys(chart.repoStarCount).length == 10">(top 10)</small>
                  </h2>
                     <charts :type="'doughnut'" :data="pieChart('repoStarCount',chart).data" :options="pieChart('repoStarCount', chart).options" id="repoStarCount"></charts>
              </div>
          </div>

      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
  .about-me {
    width: calc(100% - 260px); // 兼容 IE 10
    flex-grow: 1;
    padding: 0px;
    overflow-y: auto;
  }
  .frame-box{
    position:relative;
    top:0;
    right:0;
    bottom:0;
    height:100%;
    padding: 60px 60px;
    font-size: 16px;

  }
 
h1, h2, h3, h4 {
    font-weight: 400;
}

a {
    color: #0082c8;
    text-decoration: none;
}


canvas {
    user-select: none;
}

.search-term {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.025);
    padding: 1px 2px;
    font-family: monospace;
    font-size: 80%;
}



.content {
    max-width: 1200px;
    margin: 0 auto;
}

.rate-limit {
    position: fixed;
    right: 20px;
    bottom: 60px;
    background: #fff;
    padding: 10px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    font-size: 16px;
}

.rate-limited {
    color: #e60000;
}

.rate-limit .msg {
    display: none;
}

.rate-limited .msg {
    display: block;
}

.rate-limited .count {
    display: none;
}

#rate-limit-count {
    font-weight: 700;
}

@media (max-width: 480px) {
    .rate-limit {
        bottom: 80px;
    }
}
.load-screen {
    opacity: 0;
    transition: opacity 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.la-square-jelly-box {
    color: #38abe2;
}

.user-info {
    display: flex;
    padding-bottom: 40px;
}

.user-info__img {
    align-self: center;
    border-radius: 3px;
    width: 175px;
    margin-right: 20px;
}

.user-info__details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    flex-shrink: 0;
}

i.fa {
    color: rgba(0, 0, 0, 0.67);
    margin-right: 5px;
}

.commits-per-quarter {
    flex-grow: 1;
    flex-shrink: 1;
    position: relative;
}

.commits-per-quarter::after {
    content: "Commits per quarter";
    position: absolute;
    right: 35px;
    bottom: -15px;
    font-size: 13px;
}

.charts,
.chart-row {
    overflow: auto;
}

.chart-row {
    padding-bottom: 40px;
}

.chart-row {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
}

.chart-container {
    position: relative;
}

.chart-container--third {
    width: 33%;
}

.chart-container--half {
    width: 50%;
}

@media (max-width: 900px) {
    .chart-container--third,
    .chart-container--half {
        width: 100%;
    }

    .chart-row {
        display: block;
    }

    .commits-per-quarter {
        display: none;
    }
}

.social {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, .04);
    padding: 5px 8px;
    font-size: 14px;
}

.social a + a {
    margin-left: 25px;
}

.social a i {
    color: #0082c8;
}
</style>
<script>
import Chart from 'chart.js'
import Charts from './ChartPie.vue'

  export default {
    data () {
      return {
          chart: {},
          dataLine: {
            labels: ["2016-Q3", "2016-Q4", "2017-Q1", "2017-Q2", "2017-Q3", "2017-Q4"],
            datasets: [{
                label: "Commits",
                data: [12,35,18,69,147,52],
                backgroundColor: "rgba(67, 142, 233, 0.2)",
                borderColor: "rgba(67, 142, 233, 1)",
                lineTension: 0
            }]
        },
        optionsLine: {
            maintainAspectRatio: false,
            animation: false,
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    position: "right"
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                intersect: false
            }
        }
      }
    },
    components: {
    Charts
    },
    computed: {
    
    },
    filters: {
      formatTime (timstamp) {
        var date = new Date(timstamp);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var today = date.getDate();
        if (typeof timstamp=="string") {
            return timstamp;
        }
        if (month < 10) {
            month = "0" + month;
        }

        if (today < 10) {
            today = "0" + today;
        }
       return date.getFullYear() + "-"+ month + "-"+ today;
      }
    },
    methods: {  
          createColorArray(length) {
              let array = [];
              while (array.length < length) {
                  array = array.concat([
                      "#54ca76",
                      "#f5c452",
                      "#f2637f",
                      "#9261f3",
                      "#31a4e6",
                      "#55cbcb",
                      '#F5624D',
                      '#CC231E',
                      '#34A65F',
                      '#0F8A5F',
                      '#235E6F'
                  ]);
              }
              return array;
          },
          arrayRotate(arr, n) {
              for (let i = 0; i < n; i++) {
                  arr.push(arr.shift());
              }
              return arr
          },
          wordWrap(str, n) {
              if (str === null) {
                  return null;
              }
              let currentLine = [];
              let resultLines = [];
              str.split(" ").forEach(word => {
                  currentLine.push(word);
                  if (currentLine.join(" ").length > n) {
                      resultLines.push(currentLine.join(" "));
                      currentLine = [];
                  }
              });
              if (currentLine.length > 0) {
                  resultLines.push(currentLine.join(" "));
              }
              return resultLines
          },
       pieChart(objectName, data){
          let userId = "jackieli123723";
          let labels = Object.keys(data[objectName]);
          let values = Object.values(data[objectName]);
          let colors = this.createColorArray(labels.length);
          let tooltipInfo = null;
          window.languageColors = window.languageColors || {};
          if ("langRepoCount" === objectName) {
              // when the first language-set is loaded, set a color-profile for all languages
              labels.forEach((language, i) => languageColors[language] = colors[i]);
          }
          if (["langRepoCount", "langStarCount", "langCommitCount"].indexOf(objectName) > -1) {
              // if the dataset is language-related, load color-profile
              labels.forEach((language, i) => colors[i] = languageColors[language]);
          }
          if (objectName === "repoCommitCount") {
              tooltipInfo = data[objectName + "Descriptions"]; // high quality programming
              this.arrayRotate(colors, 4); // change starting color
          }
          if (objectName === "repoStarCount") {
              tooltipInfo = data[objectName + "Descriptions"]; // high quality programming
              this.arrayRotate(colors, 2); // change starting color
          }
  

          let datas = {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors
                }]
          };

          let options =  {
                animation: false,
                rotation: (-0.40 * Math.PI),
                legend: {
                    position: "left",
                    labels: {
                        boxWidth: 12
                    }
                },
                tooltips: {
                    callbacks: {
                        afterLabel: function (tooltipItem, data) {
                            if (tooltipInfo !== null) {
                                return this.wordWrap(tooltipInfo[data["labels"][tooltipItem["index"]]], 45);
                            }
                        }
                    },
                },
                onClick: function (e, data) {
                    try {
                        let label = labels[data[0]._index];
                        let canvas = data[0]._chart.canvas.id;
                        if (canvas === "repoStarCount" || canvas === "repoCommitCount") {
                            window.open("https://github.com/" + userId + "/" + label, "_blank");
                            window.focus();
                        } else {
                            window.open("https://github.com/" + userId + "?utf8=%E2%9C%93&tab=repositories&q=&type=source&language=" + encodeURIComponent(label), "_blank");
                            window.focus();
                        }
                    } catch (ignored) {

                    }
                }
            }

          return {
            data:datas,
            options: options
          }
       },
      getCharts () {
        this.$gitHubApi.getChart(this).then(response => {
          if (response.data) {
            this.chart = response.data
            //趋势图
            this.dataLine.labels =  Object.keys(this.chart.quarterCommitCount)
            this.dataLine.datasets[0].data =  Object.values(this.chart.quarterCommitCount)

            //pie1
            //:data="pieChart('langRepoCount',chart).data" :options="pieChart('langRepoCount', chart).options" 
            // this.langRepoCountData = this.pieChart('langRepoCount',this.chart).data
            // this.langRepoCountOptions = this.pieChart('langRepoCount',this.chart).options
          }
        })
      }
    },
    created(){
        this.getCharts()
    },
    mounted () {
      this.$nextTick(() => {

      })
    }
  }
</script>
