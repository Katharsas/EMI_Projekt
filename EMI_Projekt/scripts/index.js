/*
 * ////////////////////////////////////////////////////////////////////////////////
 * STUFF
 * ////////////////////////////////////////////////////////////////////////////////
 */


/*
 * This variable "id" defines the IDs for the Points of Interest (POIs) in this Script.
 * They must be IDENTICAL to the IDs used in HTML for the POI-DIV-Containers!!!
 * Do not use any underscore or the splitter String (see below) in any id!
 */
var id = ["poi1","poi2","poi3","poi4","poi5"];
var id_current; //currently selected id
var splitter = "--";//seperates id name from path suffix,
					//where suffix is number of path for a certain id,
					//eg: poi1--0, poi1--1, etc., must not be underscore!
var pathInformation = flattenPathInformation(getPathInformation());//arraymap with one id+splitter+suffix per path,
					//eg: {poi1--0:{...},poi2--0:{...}}  see also function flattenPathInformation()

/*
 * SVG-Polygon-Colours, one color per path, as specified in getPathInformation()
 */
var farben = getColors(pathInformation);//path colors displayed atm (selected paths are orange).
var farben_default = getColors(pathInformation);//default colors (if nothing is selected), used to restore color when select ends.

var orange="#FF9933";//orange! also used for highlighting stuff, because orange is awesome.


/*
 * ////////////////////////////////////////////////////////////////////////////////
 * FUNCTIONS
 * ////////////////////////////////////////////////////////////////////////////////
 */

/**
 * This function is executed when document is ready for interactivity!
 */
$(document).ready(function() {
	hidePoiContainers();
	
	/**
	 * SVG-Polygon-Interactivity and SVG-Map Properties
	 */
	$("#map").vectorMap(
	{
		map : "karten",
		backgroundColor : "rgb(78, 100, 126)",
		hoverOpacity : 0.0,
		hoverColor : false,
		colors : farben,
		onRegionClick : function(event, code)
		{
			// called when user clicks on svg map, code is the key of the pathmap, eg. code = poi1--0
			switchFlatPoi(code);
		}
	});
	setUpFloatingMenu();
	
	/**
	 * Klickibunti links to switch POI
	 */
	$("#"+id[0]+"_link").click(function () {switchPoi(id[0]);return false;});
	$("#"+id[1]+"_link").click(function () {switchPoi(id[1]);return false;});
	$("#"+id[2]+"_link").click(function () {switchPoi(id[2]);return false;});
	$("#"+id[3]+"_link").click(function () {switchPoi(id[3]);return false;});
	$("#"+id[4]+"_link").click(function () {switchPoi(id[4]);return false;});
	
	/**
	 * Printing
	 */
	$("#print_link").click(function () {
		//show print stuff div and hide the svg stuff
		$('#main').css("display","none");
		$('#printcheck').css("display","block");
		//checkCheckBoxes one time to show correct containers depending an default Checkbox states
		$(':checkbox').each(function () {
			checkCheckBox(this);
		});
		//buttons from Checkboxes
		$(':checkbox').click(function () {
			checkCheckBox(this);
		});	
		//button for printing
		$("#printbutton").click(function () {
			//hide print stuff container
			$('#printcheck').css("display","none");
			//PRINT!!!
			window.print();
			$('#printcheck').css("display","block");
			return false;
		});
		//button for switching screen style from index.css to print.css and back
		$("#changebutton").click(function () {
			if($('#css_link').attr("href")=="style/print.css"){$('#css_link').attr("href","style/index.css");}
			else{$('#css_link').attr("href","style/print.css");}
			return false;
		});
	});
	
});


/**
 * SVG Map Creation - Set Values to SVG Background, Image Dimension and HTML Container!
 * If Container has different size, SVG map will be scaled to match Container.
 */
$.fn.vectorMap("addMap", "karten", {
	"width": 788,
	"height": 410,
	"pathes": getPaths(pathInformation)
});

/**
 * Returns an association array with multiple paths per key (pathGroups) and an association array per path with all values for this path.
 * To use the returned array with jvectormaps, it must be flattened first, so that there is only one path information array per key!
 */
function getPathInformation() {
	var paths = {}; //form-codes for SVG polygons, see below
	paths['campus']=
	[
		{	"path": "M299.438,83.36l48.25,34.5l32.75,24.5l22.5,13l25,9l27,7l27.25,4.25 l23.5,2.5l30,2l71.25,5.5l-6.5,76.25l-20-0.25l-14,3l-14-6l-22.75-3.25l-1.75,6h-20.25l-61-5.75l-31.25-3.75l-44.5-3.25l6,30.5 l-1.75,3.25l-62.5,0.75l-64.5,2.75l-31.25,49.75l-27.5-7.25l-15,1.25l-5.25,39.75l-1.75,1.75l-102.5-29.5l-3.25-24.5l-5.25-26.25 l-4-26.5l-5.5-43.5l-1.75-21.75l-4.25-32l36-23.75l-9.75-18.5l70.5-39l73.25-40l20.75-10.75L299.438,83.36z",
			"name": "Campus",
			"color":"#222222"}
	];
		
	paths[id[0]]=
	[
		{	"path": "M47.688,171.86l5-0.25l0.5,2l8-1.25l-1.75-7l2.25-1.25l0.75-4.5l7-1 v4.25l6.75-1.25l0.75-8.75l11,0.75l1.25-2.25l13.75-0.25l-0.25,2.5l2.5,0.75l-0.75,6.25l-5.75,0.25l-1-2.75l-5-0.25l-0.25,2.25 l-3.25,0.5l-0.75-1.25l-2.75,0.25l0.75,19l4.5,34.75l-8.5-0.5l-1.75-17l-7.5-0.5l-22.5,2.75l-3.5-24.25L47.688,171.86z",
			"name": "Bayer",
			"color": "#3366CC"}
	];
		
	paths[id[1]]=
	[
		{	"path": "M95.688,365.36l-8.5,30l10.5,2.75l7.5-23l6.75,1.25l-9.5,28l-23.25-8 l3.25-11.5l-24-7.75l7-21.75L95.688,365.36z",
			"name": "Schuhmann",
			"color": "#669933"},
		{
			"path": "M92.438,377.36l10.75,3.25l-5.5,17.5l-10.5-2.75L92.438,377.36z",
			"name": "Schuhman Innenhof",
			"color": "#88BB55"}
	];


	// paths[id[2]]=[{
		// "path": "Ms161.438,145.11l-0.25,0.75l14.75-1.25l0.25-1.75h6.25v1l18-1.25 l2,27.5l-16.75,1.5l-0.5,1.75l-6.75-0.25v-1l-15.25,1.25l-0.25,1.5l-6-0.25l-0.5-7.75h1.25l-0.75-13l-1.75-0.25l-0.25-8 L161.438,145.11z",
		// "name": "POI3"}];
		
	// paths[id[3]]=[{
		// "path": "M281.438,137.86l1.5,6.5l8.75-0.5l0.75-5.25l4.25-4.25l2.75-0.25 l1,1.25l9.25-0.5l-0.25-1.25l14.5,0.5l2,13.75l-5.5,5l-12-1l-0.5,2.5l-9.75,0.5l-1-1l-12.75,1.25l-0.5,1.25l-8-0.5l-0.5-18H281.438z",
		// "name": "POI4"}];

	// paths[id[4]]=[{
		// "path": "M516.438,197.61l12.25,0.75l-3.25,42l-13.5-1.5L516.438,197.61z",
		// "name": "POI5"}];

	// paths[id[10]]={{
		// "path": "",
		// "name": "POI0"}};
	return paths;
}

/**
 * Flattens the pathGroups from getPaths() function to one path per key.
 * Adds --<index of path in pathGroup> suffix to every key (id) String.
 * e.g.
 * 
 * {
 * a: [info1,info2]
 * b: [info3]
 * }
 * 
 * becomes
 * 
 * {
 * a--0: info1
 * a--1: info2
 * b--0: info3
 * }
 *
 */
function flattenPathInformation(pathInformation) {
	var flat = {};
	
	for (key in pathInformation) {
		var pathGroup = pathInformation[key];
		
		for (var j = 0; j < pathGroup.length; j++) {
			flat[key+splitter+j] = pathGroup[j];
		}
	}
	/** returns eg.
	{
		poi1--0:{path:..., name:..., color:...}
		poi2--0:{path:..., name:..., color:...}
		poi2--1:{path:..., name:..., color:...}
	}*/
	return flat;
}

/**
 * Returnes, how many paths exist for every id
 * (maps ids to their path arrays length)
 */
function extractPathPerPoi(pathInformation) {
	var poiPathCount = {};
	for (key in pathInformation) {
		poiPathCount[key] = pathInformation[key].length;
	}
	/** returns eg. {poi1:1, poi2:2, poi3:1} */
	return poiPathCount;
}

/**
 * Returns paths for jvectormaps. Needs a flat path array as input (one path per key).
 *(removes all values apart from path and name in every path array)
 */
function getPaths(flatPathInformation) {
	var paths = {};
	for (key in flatPathInformation) {
		paths[key] = {
			"path":flatPathInformation[key]["path"],
			"name":flatPathInformation[key]["name"]
		};
	}
	// var paths = oldPaths();
	// for (key in paths) {
		// var buffer = key+" => \n";
		// for(innerKey in paths[key]) {
			// buffer = buffer +"\n"+innerKey+": "+paths[key][innerKey]+"\n";
		// }
		// testAlert(buffer);
	// }
	return paths;
}

/**
 * Returns colors for jvectormaps
 * (maps ids to their path array's color value)
 */
function getColors(flatPathInformation) {
	
	var colors = {};
	for (key in flatPathInformation) {
		colors[key] = flatPathInformation[key]["color"];
	}
	return colors;
}


/**
 * Hides all poi Containers
 */
function hidePoiContainers(){
	for(var i in id){
		$('#'+id[i]).css("display","none");
	}
}

/**
 * Shows all poi Containers
 */
function showPoiContainers(){
	for(var i in id){
		$('#'+id[i]).css("display","block");
	}
}

/**
 * Inflates id to flat id and redirects to switchFlatPoi
 */
function switchPoi(code) {
	// eg. code = poi1
	switchFlatPoi(code+splitter+"0");
	//argument is eg. "poi1--0"
}

/**
 * Shows the new poi container (whos id is the same as "code"/"id_current" variable),
 * hides the old poi with "id_old" as id, highlights the according regions on svg map and the according link.
 * poi containers are animetd with jQuery.
 */
function switchFlatPoi(flatCode){
	// eg. flatCode = "poi1--0"
	// eg. id_current = "poi4"
	
	var code = flatCode.split(splitter)[0];// eg. code = "poi1"
	
	if(code!=id_current && code.indexOf("poi")!=-1){//if new poi is not the old one and code contains "poi"
	
		var id_old = id_current;// eg. id_old = "poi4"
		id_current = code;// eg. id_current = "poi1";
		
		var pathPerPoi = extractPathPerPoi(getPathInformation());
		
		//get the number of paths for the old poi ( old poi is the poi which was selected before the current one)
		var pathCount = pathPerPoi[id_old];
		
		//give all old paths their default color, so they aren't orange anymore
		for(var i = 0; i < pathCount; i++) {
			farben[id_old+splitter+i] = farben_default[id_old+splitter+i];
		}
		
		//get the number of paths for the current (new) poi
		pathCount = pathPerPoi[id_current];
		
		//give alle current paths the color orange
		for(var i = 0; i < pathCount; i++) {
			farben[id_current+splitter+i] = orange;
		}
		
		//set new colors to map
		$('#map').vectorMap('set', 'colors', farben);
		
		//make current(new) poi link orange and old link black again
		$('#'+id_old+"_link").css("color","#FFFFFF");
		$('#'+id_current+"_link").css("color",orange);
		
		
		//poi div animation and stuff (hilde old poi, show new one)
		$('#'+id_old).stop().animate({"margin-top":80}, {easing: 'easeOutQuad', duration:50});
		setTimeout(function(){
			$('#'+id_old).css("display","none");
			$('#'+id_current).css("margin-top","360px");
			$('#'+id_current).css("display","block");
			$('#'+id_current).stop().animate({"margin-top":20}, {easing: 'easeOutQuad', duration:600});
		},50);
	}
	
	
}


/**
 * Don't worry about this one.
 */
function testAlert(string) {
	alert('Test Alert! '+string);
}


/**
 * Checks a Checkbox and hides/shows the container whose id is the same as the checkbox's value attribute
 * 
 */
function checkCheckBox(box){
	if($(box).is(':checked')){$('#' + $(box).val()).show();}
	else{$('#' + $(box).val()).hide();}
}


/**
 * Floating (animated) Menu Selection Underscores
 */
function setUpFloatingMenu(){
    var top_val = $('#menu li a').css('top');     
    $('#menu li').hover(
        function () {
            //animate the menu item with 0 top value
            $(this).children('a').stop().animate({top:0}, {easing: 'easeOutQuad', duration:70});      
        },
        function () {
            //set the position to default
            $(this).children('a').stop().animate({top:top_val}, {easing: 'easeOutQuad', duration:70});   
        }      
    );
}