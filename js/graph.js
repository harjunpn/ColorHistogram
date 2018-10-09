document.getElementById("test").onload = function() {
    var img = new Image();
    img.src = src="./test/land.jpg";
    var c = document.getElementById("pictureCanvas");
    
    var ctx = c.getContext("2d");
    c.height = img.height;
    c.width = img.width;
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
                
                    
    var red = new Array;
    var green = new Array;
    var blue = new Array;
    var alpha = new Array;
                
    for(var i = 0; i < 256; i++){
        red.push(0);
        blue.push(0);
        green.push(0);
        alpha.push(0);
    }

    for (i = 0; i < imgData.data.length; i += 4) {
        red[imgData.data[i]] += 1;
        green[imgData.data[i+1]] += 1;
        blue[imgData.data[i+2]] += 1;
        alpha[imgData.data[i+3]] += 1;
    }
                          
    console.log(red);
    console.log(blue)

    //THIS IS TEST
    var width = 1000;
    var height = 500;

    function getBarScaleX (colorData){
        var barScaleX = d3.scaleBand()
        .domain(colorData)
        .paddingInner(.2)
        .paddingOuter(.1)
        .range ([0, width]);

        return barScaleXBlue;
    }

    var barScaleYRed = d3.scaleLinear()
        .domain([0, d3.max(red)])
        .range([0, height ]);

    var barScaleXRed = d3.scaleBand()
        .domain(red)
        .paddingInner(.2)
        .paddingOuter(.1)
        .range ([0, width]);

    var barScaleYGreen = d3.scaleLinear()
        .domain([0, d3.max(green)])
        .range([0, height ]);

    var barScaleXGreen = d3.scaleBand()
        .domain(green)
        .paddingInner(.2)
        .paddingOuter(.1)
        .range ([0, width]);

    var barScaleYBlue = d3.scaleLinear()
        .domain([0, d3.max(blue)])
        .range([0, height ]);

    var barScaleXBlue = d3.scaleBand()
        .domain(blue)
        .paddingInner(.2)
        .paddingOuter(.1)
        .range ([0, width]);

    var testcanvas = d3.select("#demo2").append("svg")
        .attr("width", width)
        .attr("height", height);

    testcanvas.selectAll("blue").data(blue).enter().append("rect").style("fill", "blue").attr("opacity", 0.7)
        .attr("height", function (data) { return barScaleYBlue(data) ;} )
        .attr("width", function (data) { return barScaleXBlue.bandwidth() ;} )
        .attr("x", function (data) { return barScaleXBlue(data);} )
        .attr("y", function (data) { return height - barScaleYBlue(data) ;} );    

    testcanvas.selectAll("green").data(green).enter().append("rect").style("fill", "green").attr("opacity", 0.7)
        .attr("height", function (data) { return barScaleYGreen(data) ;} )
        .attr("width", function (data) { return barScaleXGreen.bandwidth() ;} )
        .attr("x", function (data) { return barScaleXGreen(data);} )
        .attr("y", function (data) { return height - barScaleYGreen(data) ;} );  

    testcanvas.selectAll("red").data(red).enter().append("rect").style("fill", "red").attr("opacity", 0.7)
        .attr("height", function (data) { return barScaleYRed(data) ;} )
        .attr("width", function (data) { return barScaleXRed.bandwidth() ;} )
        .attr("x", function (data) { return barScaleXRed(data);} )
        .attr("y", function (data) { return height - barScaleYRed(data) ;} );

    //END OF TEST
                    
}