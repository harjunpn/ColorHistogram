
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

//---------TEST-------
var radioTest = d3.select('input[name="mode"]:checked').property("value");;
console.log(radioTest);
//-------END OF TEST----

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
    var height = 500;

    //opacity variables 
    var opacityRed = 0.8;
    var opacityGreen = 0.8;
    var opacityBlue = 0.8;
    var opacityMin = 0.1;
    var opacityDefaul = 0.8;
    var opacityMax = 1.0;

    //checks state of the radio inputs
    var radioTest = d3.select('input[name="mode"]:checked').property("value");
    console.log("all" + radioTest);
    //sets correct opacity values based on the radio input value
    if (radioTest == "all"){
        opacityRed = opacityDefaul;
        opacityGreen = opacityDefaul;
        opacityBlue = opacityDefaul;
        console.log("all" + opacityBlue);
    }else if (radioTest == "red"){
        opacityRed = opacityMax;
        opacityGreen = opacityMin;
        opacityBlue = opacityMin;
        console.log("red");
    }else if (radioTest == "green"){
        opacityRed = opacityMin;
        opacityGreen = opacityMax;
        opacityBlue = opacityMin;
        console.log("green");
    }else if (radioTest == "blue"){
        opacityRed = opacityMin;
        opacityGreen = opacityMin;
        opacityBlue = opacityMax;
        console.log("blue");
    };

    //individual values for the bars so that they are scaled to the size of the graph
    var barScaleYRed = d3.scaleLinear()
        .domain([0, d3.max(red)])
        .range([0, height ]);
    
    var barScaleYGreen = d3.scaleLinear()
        .domain([0, d3.max(green)])
        .range([0, height ]);
    
    var barScaleYBlue = d3.scaleLinear()
        .domain([0, d3.max(blue)])
        .range([0, height ]);

    var barScaleXRed = d3.scaleBand()
        .domain(red)
        .paddingInner(.2)
        .paddingOuter(.1)
        .range ([0, windowWidth]);

    var barScaleXblue = d3.scaleBand()
        .domain(blue)
        .paddingInner(.2)
        .paddingOuter(.1)
        .range ([0, windowWidth]);

    var barScaleXGreen = d3.scaleBand()
        .domain(green)
        .paddingInner(.2)
        .paddingOuter(.1)
        .range ([0, windowWidth]);

    //Removes everything from the canvas so that it won't be duplicated
    canvas.selectAll("*").remove();
    
    //Canvas attributes
    canvas
      .attr("width", windowWidth)
      .attr("height", height);

    //creation of the "staplar" variable which is used to create the bars of the graph  
    var staplar = canvas.selectAll("stapel");

    staplar.data(green)
        .enter().append("rect")
            .style("fill", "green")
        .merge(staplar)
            .attr("opacity", opacityGreen)
            .attr("height", function (data) { return barScaleYGreen(data) ;} )
            .attr("width", function (data) { return barScaleXGreen.bandwidth() ;} )
            .attr("x", function (data) { return barScaleXGreen(data);} )
            .attr("y", function (data) { return height - barScaleYGreen(data) ;} );

    staplar.data(blue)
        .enter().append("rect")
            .style("fill", "blue")
        .merge(staplar)
            .attr("opacity", opacityBlue)
            .attr("height", function (data) { return barScaleYBlue(data) ;} )
            .attr("width", function (data) { return barScaleXblue.bandwidth() ;} )
            .attr("x", function (data) { return barScaleXblue(data);} )
            .attr("y", function (data) { return height - barScaleYBlue(data) ;} );
    
    staplar.data(red)
        .enter().append("rect")
            .style("fill", "red")
        .merge(staplar)
            .attr("opacity", opacityRed)
            .attr("height", function (data) { return barScaleYRed(data) ;} )
            .attr("width", function (data) { return barScaleXRed.bandwidth() ;} )
            .attr("x", function (data) { return barScaleXRed(data);} )
            .attr("y", function (data) { return height - barScaleYRed(data) ;} );
            
  }