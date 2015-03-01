var myJson = [ 'healthy.json', 'obese.json', 'celeb.json'];



  var margin = 20,
      diameter = $('.my-cat-graph').width();

  var color = d3.scale.linear()
      .domain([-1, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

  var pack = d3.layout.pack()
      .padding(2)
      .size([diameter - margin, diameter - margin])
      .value(function(d) { return d.size; });

  var svg = d3.select(".my-cat-graph").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
    .append("g")
      .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");


      function creatGraph(json){
        d3.json(json, function(error, root) {
          if (error) return console.error(error);

          var focus = root,
              nodes = pack.nodes(root),
              view;

          var circle = svg.selectAll("circle")
              .data(nodes)
            .enter().append("circle")
              .attr("class", function(d) {
                if(d.depth === 1){
                  return d.name +' upper-node';
                }
                else if(d.depth === 2){
                 return d.parent.name +' inner-node';
                }
                else if(d.depth ===3){
                  return d.parent.parent.name + " lower-node";
                }else if(d.depth ==4){
                  return d.parent.parent.parent.name +" final";
                }else{
                  return "parent-node";
                }
              })
              .style("fill", function(d) { return d.children ? color(d.depth) : null; })
              .on("click", function(d) {

                if(!d.children){
                  console.log('cannot go deeper');
                } else {
                  console.log(d)
                  if (focus !== d) zoom(d), d3.event.stopPropagation();

                  $('#desc').html(d.desc);

                }
                
              });

          var text = svg.selectAll("text")
              .data(nodes)
            .enter().append("text")
              .attr("class", "label")
              .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
              .style("display", function(d) { return d.parent === root ? null : "none"; })
              .text(function(d) { return d.name; });

          var node = svg.selectAll("circle,text");

          d3.select("html")
              .on("click", function() { zoom(root);});

          zoomTo([root.x, root.y, root.r * 2 + margin]);

          function zoom(d) {

            var focus0 = focus; focus = d;

            $('.my-cat-graph').attr('class', 'my-cat-graph');

            if(focus.depth > 0){
              $('.my-cat-graph').addClass('zoom-depth'+ focus.depth);
            }
            

            $('#desc').html(d.desc);

            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function(d) {
                  var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);

                  return function(t) { zoomTo(i(t)); };
                });

            transition.selectAll("text")
              .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
          }

          function zoomTo(v) {

            var k = diameter / v[2]; view = v;
            node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) { return d.r * k; });

          }
        });

        d3.select(self.frameElement).style("height", diameter + "px");
      }
















     function diff(json, element){


          var margin = 20,
              diameter = $(element).width();

          var color = d3.scale.linear()
              .domain([-1, 5])
              .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
              .interpolate(d3.interpolateHcl);

          var pack = d3.layout.pack()
              .padding(2)
              .size([diameter - margin, diameter - margin])
              .value(function(d) { return d.size; });

          var svg = d3.select(element).append("svg")
              .attr("width", diameter)
              .attr("height", diameter)
            .append("g")
              .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");




        d3.json(json, function(error, root) {
          if (error) return console.error(error);

          var focus = root,
              nodes = pack.nodes(root),
              view;


              $(element).find('.graph-title').text(root.name);
              $(element).find('.icon').html(root.icon);

          var circle = svg.selectAll("circle")
              .data(nodes)
            .enter().append("circle")
              .attr("class", function(d) {
                if(d.depth === 1){
                  return d.name +' upper-node';
                }
                else if(d.depth === 2){
                 return d.parent.name +' inner-node';
                }
                else if(d.depth ===3){
                  return d.parent.parent.name + " lower-node";
                }else if(d.depth ==4){
                  return d.parent.parent.parent.name +" final";
                }else{
                  return "parent-node";
                }
              })
              .style("fill", function(d) { return d.children ? color(d.depth) : null; })
              .on("click", function(d) {

                if(!d.children){
                    //$('#desc').html(root.desc);
                  console.log('cannot go deeper');
                } else {
                  
                  $('#desc').html(d.desc);

                }
                
              });

          var node = svg.selectAll("circle,text");

          zoomTo([root.x, root.y, root.r * 2 + margin]);

          function zoomTo(v) {

            var k = diameter / v[2]; view = v;
            node.attr("transform", function(d) {
                return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) { 


                //console.log(root);

                return d.r * k; });


                
          }
        });

        d3.select(self.frameElement).style("height", diameter + "px");
      }


      
      //lets set this kitty up!!!




      creatGraph('flare.json');


      $('.graph-set .micro-graph').each(function (index, elem){
        diff(myJson[index], elem);

      });

      $('.my-cat-graph').addClass('unanimate').addClass("unanimate")
                       .delay(500)
                       .queue(function() {
                           $(this).removeClass("unanimate");
                       });;



