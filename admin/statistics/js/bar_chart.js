var nvd3Charts = function() {	
        var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
                        "#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
                        "#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
                        "#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
                        "#C51B7D","#DE77AE","#EDD3F2"];
        d3.scale.myColors = function() {
            return d3.scale.ordinal().range(myColors);
        };	
	var startChart4 = function() {
		nv.addGraph(function() {
			var chart = nv.models.discreteBarChart().x(function(d) {
				return d.label;
			})//Specify the data accessors.
			.y(function(d) {
				return d.value;
			}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
			.tooltips(false)//Don't show tooltips
			.showValues(true)//...instead, show the bar value right on top of each bar.
			.transitionDuration(350)
                        .color(d3.scale.myColors().range());;

			d3.select('#chart-4 svg').datum(exampleData()).call(chart);

			nv.utils.windowResize(chart.update);
			chart.xAxis//Chart x-axis settings
			.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
			return chart;
		});
	var num=18;
	var n = num.toString()+' '+'lepta';
		//Each bar represents a single discrete quantity.
		function exampleData() {
			return [{
				key : "Cumulative Return",
				values : [{
					"label" : "A Label",
					"value" : count[0]
				}, {
					"label" : "B Label",
					"value" : count[1]
				}, {
					"label" : "C Label",
					"value" : count[2]
				}, {
					"label" : "D Label",
					"value" : count[3]
				}, {
					"label" : "E Label",
					"value" : count[4]
				}, {
					"label" : "F Label",
					"value" : count[5]
				}, {
					"label" : "G Label",
					"value" : count[6]
				}, {
					"label" : count[7]
				}, {
					"label" : "I Label",
					"value" : count[8]
				}, {
					"label" : "k Label",
					"value" : count[9]
				}
				]
			}];

		}

	};	
	function stream_layers(n, m, o) {
		if (arguments.length < 3)
			o = 0;
		function bump(a) {
			var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
			for (var i = 0; i < m; i++) {
				var w = (i / m - y) * z;
				a[i] += x * Math.exp(-w * w);
			}
		}
		return d3.range(n).map(function() {
			var a = [], i;
			for ( i = 0; i < m; i++)
				a[i] = o + o * Math.random();
			for ( i = 0; i < 5; i++)
				bump(a);
			return a.map(stream_index);
		});
	}
	function stream_index(d, i) {
		return {
			x : i,
			y : Math.max(0, d)
		};
	}
	return {		
		init : function() {
			
			startChart4();			
		}
	};
}();
nvd3Charts.init();