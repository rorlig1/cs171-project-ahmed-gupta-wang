 

var coolvalue  = $('#sliderCool').slider()
		.on('slide', updateReview)
		 
		.data('slider');
var funvalue = $('#sliderFunny').slider()
		.on('slide', updateReview)
		 
		.data('slider');
var usefulvalue = $('#sliderUseful').slider()
		.on('slide', updateReview)
 
		.data('slider');
 


  function updateReview(){  

    d3.json("data_with_open/output_phoenix_30.json", function(data){
           console.log(data)
           //for ( i in data){
           // console.log(data[i])
           var i=1;

            if(data[i].review_count){
            console.log(data[i] )
            var rc = data[i].review_count
            
            var recalculate ;
      
              
              var totalscore=0;
              var totalnum=0;   
              for(j =0;  j < rc; j++)
              {
              if(data[i].reviews[j]){
              var stars = data[i].reviews[j].stars
              //console.log("RR:", data[i].reviews[j].stars)
              var cool_count = data[i].reviews[j].votes.cool
              var funny_count = data[i].reviews[j].votes.funny
              var useful_count = data[i].reviews[j].votes.useful
              // var coolvalue = $( "#sliderCool" ).slider("option", "value");
              // var funvalue = $( "#sliderFunny" ).slider("option", "value");
              // var usefulvalue = $( "#sliderUseful" ).slider("option", "value"); 
              //var original_score = stars * cool_count + stars * funny_count +  + stars * useful_count;
              //console.log("original_score", original_score)
              var calculated_score =1+ cool_count*coolvalue + funny_count*funvalue +useful_count*usefulvalue;
              totalscore+=stars*calculated_score;
              totalnum+=calculated_score;
              }
             }
             recalculate=totalscore/totalnum;
             console.log("cool:"+coolvalue+" funny:"+funvalue+" useful:"+usefulvalue+" score:"+recalculate);
 
       }
        
});
}
 