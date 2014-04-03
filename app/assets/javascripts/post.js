//= require_tree ./libs


init = function(){
    var facts;
    var regions:
    var crime_type;
    var crimes;
    var time;
    
    d3.csv("/nyc-crime.csv",function(error,data){
	if(error!=null)
	    return;
	facts = crossfilter(data);
	regions = facts.dimension(function(d){return d.region});
	crime_type = facts.dimension(function(d){return d.crime_type});
	crimes = facts.dimension(function(d){d.crime});
	time = facts.dimension(function(d){return d.time});
	
	
    })
    
}

$(document).ready(function(){
    init();
})