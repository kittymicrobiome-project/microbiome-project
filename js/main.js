var data = {
  children: [
    {value: 1.94},
    {value: 0.42},
    {value: 0},
    {value: 3.95},
    {value: 0.06},
    {value: 0.91}
  ]
};

var width = 960,
    height = 500;

var pack = d3.layout.pack()
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.data([data]).selectAll(".node")
    .data(pack.nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("r", function(d) { return d.r; });
