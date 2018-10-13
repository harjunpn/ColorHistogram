//variables for the img
var img = new Image();
img.src = src="./test/land.jpg";
var c = document.getElementById("pictureCanvas");

var ctx = c.getContext("2d");
c.height = img.height;
c.width = img.width;
ctx.drawImage(img, 0, 0);
var imgData = ctx.getImageData(0, 0, c.width, c.height);
                
//variables for the colorvalue arrays
var red = new Array;
var green = new Array;
var blue = new Array;
var alpha = new Array;

//pushes 256 "0"s to each array                
for(var i = 0; i < 256; i++){
    red.push(0);
    blue.push(0);
    green.push(0);
    alpha.push(0);
}
//Loops through the data and increments each individual color pixel value by one each time it is represented
for (i = 0; i < imgData.data.length; i += 4) {
    red[imgData.data[i]] += 1;
    green[imgData.data[i+1]] += 1;
    blue[imgData.data[i+2]] += 1;
    alpha[imgData.data[i+3]] += 1;
}

//creats the variable for 
var radioTest = d3.select('input[name="mode"]:checked').property("value");;

//creates the Canvas svg
var canvas = d3.select("#demo2")
.append("svg")
.style("background", "lightgrey");

//draws the graph for the first time
drawGraph();
//draws the graph each time the window is resized
window.addEventListener("resize", drawGraph);
document.getElementById("radioAll").addEventListener("click", drawGraph);
document.getElementById("radioRed").addEventListener("click", drawGraph);
document.getElementById("radioGreen").addEventListener("click", drawGraph);
document.getElementById("radioBlue").addEventListener("click", drawGraph);


//Function that draws the graphs.
function drawGraph(){
    // Height and width variables. Width adjusted to the window width
    var windowWidth = window.innerWidth * 0.9; 
    var height = window.innerHeight * 0.65;

    //opacity variables 
    var opacityRed = 0.8;
    var opacityGreen = 0.8;
    var opacityBlue = 0.8;
    var opacityMin = 0.1;
    var opacityDefaul = 0.8;
    var opacityMax = 1.0;

    //checks state of the radio inputs
    var radioTest = d3.select('input[name="mode"]:checked').property("value");
    //sets correct opacity values based on the radio input value
    if (radioTest == "all"){
        opacityRed = opacityDefaul;
        opacityGreen = opacityDefaul;
        opacityBlue = opacityDefaul;
    }else if (radioTest == "red"){
        opacityRed = opacityMax;
        opacityGreen = opacityMin;
        opacityBlue = opacityMin;
    }else if (radioTest == "green"){
        opacityRed = opacityMin;
        opacityGreen = opacityMax;
        opacityBlue = opacityMin;
    }else if (radioTest == "blue"){
        opacityRed = opacityMin;
        opacityGreen = opacityMin;
        opacityBlue = opacityMax;
    };

    //individual values for the bars so that they are scaled to the size of the graph
    //The x scale 
    var xScale = d3.scaleLinear()
        .domain([0,256])
        .range([0,windowWidth]);

    //The Width scale 
    var widthScale = d3.scaleBand()
        .domain(red)
        .paddingInner(.2)
        .range([0, windowWidth]);

    //The Height scale for each individual color
    var heightScaleRed = d3.scaleLinear()
        .domain([0, d3.max(red)])
        .range([0,height]);

    var heightScaleGreen = d3.scaleLinear()
        .domain([0, d3.max(green)])
        .range([0,height]);

    var heightScaleBlue = d3.scaleLinear()
        .domain([0, d3.max(blue)])
        .range([0,height]);
    
    //The Y scale for each individual color
    var yScaleRed = d3.scaleLinear()
        .domain([0,d3.max(red)])
        .range([height,0]);

    var yScaleGreen = d3.scaleLinear()
        .domain([0,d3.max(green)])
        .range([height,0]);

    var yScaleBlue = d3.scaleLinear()
        .domain([0,d3.max(blue)])
        .range([height,0]);


    //Removes everything from the canvas so that it won't be duplicated
    canvas.selectAll("*").remove();
    
    //Canvas attributes
    canvas
      .attr("width", windowWidth)
      .attr("height", height);

    //creation of the "bars" variable which is used to create the bars of the graph  
    var bars = canvas.selectAll("stapel");

    //Appends the canvas selection with all the bars
    bars.data(blue)
        .enter().append('rect')
            .style('fill', "blue")
            .attr("opacity", opacityBlue)
            .attr('width', function() {return widthScale.bandwidth();})
            .attr('height', function(d) {return heightScaleBlue(d);})
            .attr('x', function(d,i) {return xScale(i);})
            .attr('y', function(d) {return yScaleBlue(d);});

    bars.data(green)
        .enter().append('rect')
            .style('fill', "green")
            .attr("opacity", opacityGreen)
            .attr('width', function() {return widthScale.bandwidth();})
            .attr('height', function(d) {return heightScaleGreen(d);})
            .attr('x', function(d,i) {return xScale(i);})
            .attr('y', function(d) {return yScaleGreen(d);});

    bars.data(red)
        .enter().append('rect')
            .style('fill', "red")
            .attr("opacity", opacityRed)
            .attr('width', function() {return widthScale.bandwidth();})
            .attr('height', function(d) {return heightScaleRed(d);})
            .attr('x', function(d,i) {return xScale(i);})
            .attr('y', function(d) {return yScaleRed(d);});

    //THIS IS THE OLD METHOD THAT STACKED BARS WITH THE SAME X VALUE ON TOP OF EACHOTHER
    // bars.data(red)
    //     .enter().append("rect")
    //         .style("fill", "red")
    //     .merge(bars)
    //         .attr("opacity", opacityRed)
    //         .attr("height", function (data) { return barScaleYRed(data) ;} )
    //         .attr("width", function (data) { return barScaleXRed.bandwidth() ;} )
    //         .attr("x", function (data) { return barScaleXRed(data);} )
    //         .attr("y", function (data) { return height - barScaleYRed(data) ;} );
            
  }