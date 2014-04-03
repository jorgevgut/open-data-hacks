//= require_tree ./libs

var facts;
    var regions;
    var crime_type;
    var crimes;
    var time;
    

init = function(){
    
    d3.csv("/nyc-crime.csv",function(error,data){
	console.log(data)
	if(error!=null)
	    return;
	facts = crossfilter(data);
	regions = facts.dimension(function(d){return d.region});
	crime_type = facts.dimension(function(d){return d.crime_type});
	crimes = facts.dimension(function(d){return d.crime});
	time = facts.dimension(function(d){return d.time});
	
	//charts
	time_1 = dc.lineChart("#time-1");
	row_1 = dc.rowChart("#row-1");
	row_2 = dc.rowChart("#row-2")
	bar_1 = dc.rowChart("#bar-1")

	width = $("#time-1").width()
	height = width/2.5
	
	//bar chart
	bar_1.width(width).height(height)
	    .margins({top:10,right:60,bottom:20,left:100})
	    .dimension(crimes)
	    .colors(d3.scale.category10())
	    .group(crimes.group().reduceSum(function(d){return d.value}))
	    .label(function(d){return d.key})
	    .elasticX(true)
	    .labelOffsetX(-100)
	    .xAxis().ticks(4);

	    bar_1.renderlet(function(chart){
		chart.selectAll("text")
		    .style("fill","black");
	    })

	//time chart
	time_1.width(width).height(height)
	    .margins({top:10,right:60,bottom:20,left:100})
	    .dimension(time)
	    .group(time.group().reduceSum(function(d){return d.value;}))
	    .elasticY(true)
	    .label(function(d){return d.value})
	    .x(d3.scale.linear().domain([2003,2012]))
	    .xAxis().ticks(5)

	//row regions catalog
	row_1.width(width).height(height)
	    .margins({top:10,right:60,bottom:20,left:100})
	    .dimension(regions)
	    .group(regions.group().reduceSum(function(d){return d.value;}))
	    .colors(d3.scale.category10())
	    .label(function(d){return d.key})
	    .xAxis().ticks(3)

	//row crimes catalog
	row_2.width(width).height(height)
	    .margins({top:10,right:60,bottom:20,left:100})
	    .dimension(crime_type)
	    .group(crime_type.group().reduceSum(function(d){return d.value;}))
	    .colors(d3.scale.category10())
	    .label(function(d){return d.key})
	    .xAxis().ticks(0)

	dc.renderAll();
    })
    
}

$(document).ready(function(){
    init();
})