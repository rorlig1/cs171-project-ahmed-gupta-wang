var coolvalue  = $('#sliderCool').slider()
    .on('slide', updateReview)     
    .data('slider');
    
var funvalue = $('#sliderFunny').slider()
    .on('slide', updateReview)   
    .data('slider');

var usefulvalue = $('#sliderUseful').slider()
    .on('slide', updateReview)
    .data('slider');




  function updateReview( ){  
          console.log("update");
        
           if (Restinfo){
          // console.log(Restinfo)
           for ( i in Restinfo){
           // console.log(data[i])
            

            if(Restinfo[i].review_count){
           // console.log(Restinfo[i])
            var rc = Restinfo[i].review_count
            
            var recalculate ;
      
              
              var totalscore=0;
              var totalnum=0;   
              for(j =0;  j < rc; j++)
                 {
                 if(Restinfo[i].reviews[j]){
              var stars = Restinfo[i].reviews[j].stars
              //console.log("RR:", data[i].reviews[j].stars)
              var cool_count = Restinfo[i].reviews[j].votes.cool
              var funny_count =Restinfo[i].reviews[j].votes.funny
              var useful_count = Restinfo[i].reviews[j].votes.useful
              // var coolvalue = $( "#sliderCool" ).slider("option", "value");
              // var funvalue = $( "#sliderFunny" ).slider("option", "value");
              // var usefulvalue = $( "#sliderUseful" ).slider("option", "value"); 
              //var original_score = stars * cool_count + stars * funny_count +  + stars * useful_count;
              //console.log("original_score", original_score)
              var calculated_score =1+ cool_count*coolvalue.getValue() + funny_count*funvalue.getValue() +useful_count*usefulvalue.getValue();
              totalscore+=stars*calculated_score;
              totalnum+=calculated_score;
                }
               }
             recalculate=totalscore/totalnum;
             console.log("cool:"+coolvalue.getValue()+" funny:"+funvalue.getValue()+" useful:"+usefulvalue.getValue()+" score:"+recalculate);
             Restinfo[i].recalculate=recalculate;
            }
          }
         // console.log(Restinfo)
          updateRestinfo(Restinfo);
      }  
 
}