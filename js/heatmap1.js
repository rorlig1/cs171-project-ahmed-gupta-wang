<script type="text/javascript">
       var margin = { top: 50, right: 0, bottom: 100, left: 100 },
          width = 760 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 24),
          gridSizeW= Math.floor(width / 24),
          gridSizeH= Math.floor(height /7),
          legendElementWidth = gridSize*2,
          buckets = 9,
          //colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
        //  colors = ["#c0c8bd","#b2baad","#a2ad9d","#929d8c","#808e77","#826851","#934231","#ac2718","#cf0e07"],
          colors = ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
 
          days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
         // times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"]
           times = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
        // times = ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"]
           console.log(combinations);
          var array1 = []
          d3.json("data/output_limit_30.json", function(data){
            i = 0

            for(c in combinations){
              checkin_lookup = combinations[c].lookup
              if(data[i].checkin.checkin_info[checkin_lookup]){
                var info = { day: combinations[c].day, hour:combinations[c].hour, value: data[i].checkin.checkin_info[checkin_lookup]}
                array1.push(info)
              }else{
                var info = { day: combinations[c].day, hour:combinations[c].hour, value: 0}
                array1.push(info)
              }
            }
            data = array1
           

          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var svg = d3.select("#chart").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var dayLabels = svg.selectAll(".dayLabel")
              .data(days)
              .enter().append("text")
                .text(function (d) { return d; })
                .attr("x", 0)
                .attr("y", function (d, i) { return i * gridSizeH; })
                .style("text-anchor", "end")
              //  .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
              .attr("transform", "translate(-6," + gridSizeH / 1.5 + ")")
              //  .attr("class", function (d, i) { return ((i >= 1 && i <= 5) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });
               .attr("class", function (d, i) { return ((i >= 0 && i <= 6) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

          var timeLabels = svg.selectAll(".timeLabel")
              .data(times)
              .enter().append("text")
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return i * gridSize; })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

          var heatMap = svg.selectAll(".hour")
              .data(data)
              .enter().append("rect")
              .attr("x", function(d) { return (d.hour  ) * gridSizeW; })
              .attr("y", function(d) { return (d.day ) * gridSizeH; })
              // .attr("rx", 2)
              // .attr("ry", 2)
              // .attr("class", "hour bordered")
              .attr("class", "hour")
              .attr("width", gridSizeW)
              .attr("height", gridSizeH)
              .style("fill", colors[0]) 
            //   .style("fill", function(d) {  
            //   if (d.hour<4 || d.hour>20 )  {
            //     return "#f5f5f5" 
            // } else {
            //     return colors[0]
            // }

            //  })
              .style("stroke", "#ececec") 
               //.style("stroke", "white") 
              .style("stroke-width", 0.2);

          heatMap.transition().duration(1000)
              //.style("fill", function(d) { return colorScale(d.value); });
            .style("fill", function(d) { 
             if (d.hour<4 || d.hour>20 )  {
                return "#fcfcfc" 
                return "#f3fcf0"  
            } else {
               return colorScale(d.value*1)
            }  
          });
 
          heatMap.append("title").text(function(d) { return d.value; });
              
          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; })
              .enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            //.text(function(d) { return "≥ " + Math.round(d); })
            .text(function(d) { return  Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i+5; })
            .attr("y", height+13);
      

           var gridSize2=14;

           var legend2 =d3.select("#chart").append("svg").selectAll(".legend2")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; })
              .enter().append("g")
              .attr("class", "legend2");

          legend2.append("rect")
             .attr("x", width+50)
            .attr("y", function(d, i) { return gridSize2 * i; }) 
            .attr("width", legendElementWidth)
            .attr("height", gridSize2  )
            .style("fill", function(d, i) { return colors[i]; });

          legend2.append("text")
            .attr("class", "mono")
            //.text(function(d) { return "≥ " + Math.round(d); })
            .text(function(d) { return  Math.round(d); })
            .attr("x", width+50)
            .attr("y", function(d, i) { return gridSize2 * i; }) 
      });


    </script>