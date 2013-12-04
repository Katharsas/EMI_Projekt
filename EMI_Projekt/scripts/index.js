/*
 * ////////////////////////////////////////////////////////////////////////////////
 * STUFF
 * ////////////////////////////////////////////////////////////////////////////////
 */


/*
 * This variable "id" defines the IDs for the Points of Interest (POIs) in this Script.
 * They must be IDENTICAL to the IDs used in HTML for the POI-DIV-Containers!!!
 */
var id = ["poi1","poi2","poi3","poi4","poi5"];


var id_current;//id for the poi shown atm
var pathes={};//form-codes for SVG polygons, see below
var orange="#FF9933";//orange! also used for highlighting stuff, because orange is owesome.

/*
 * SVG Form-code of (interactive) polygons
 * 
 * -------- Reihenfolge beachten! ------------
 * -Dresden(not interactive)
 * -Altstadt(not interactive)
 * 1.Elbe
 * 2.Großer Garten
 * 3.Semperoper
 * 4.Zwinger
 * 5.Grünes Gewölbe
 * ------------------------------------------- 
 */
pathes['dresden']={
	"path": "M426.5,218.5l-17,2.5l-15-19l-2.5-18.5l13.5-3.5l9-7.5l-7.5-12   l-10.5-5.5l-4.5-4v-13l-3-6l-6-5l-9-2.5L369,98l14-5.5l6-9.5l1.5-17L378,57.5l-9-9.5h-12h-14.5L332,55.5l-12,9l-25-33h-26L260,18   L240.5,4l-24,11.5L214,38l13,10l-1.5,10.5l-7.5,5l7.5,7.5l0.5,21.5L214,98l-2.5,6L193,89l-13,7.5l-4,15.5l-5.5,27.5l-17-4.5l-4.5,7   v7v8l-7,8.5l6.5,7.5l-6.5,3l-24.5-3.5l-15-8.5l-4.5,4.5H82L66.5,155l-16,5l-10,11.5v9.5l4.5,9.5L29.5,209L23,223.5l-10,8v14l7,8.5   v14.5l10.5,5l-1.5,12l13.5,9.5l12,2.5H68l11-4.5l7,8l10,9.5h10.5H117l10,16h14.5l10,20.5H173h12l10-18l8,4l6,5.5l4.5,8.5l6,4.5   l7,4.5l16.5,11.5h10h4.5v10l33.5,19l21,3.5c-1-4.5,11.5-10,11.5-10l13-7l11.5-2.5h5V356l5.5,3v16.5l12.5,4l13,4.5v-14.5l18-12   l8.5-15l3-23c-0.5-7,19-3,19-3H444l14.5-21.5l4-14l11-5.5v-25l8-8.5L457,212.5l-6.5,0.5l-14.5,3.5L426.5,218.5z",
	"name": "Dresden"};
pathes['elbe']={
	"path": "M20.5,138l10.5,9.5l4,8.5v8l10,8.5l6,5.5h6.5l6.5-3l10.5-1l4.5-0.5h9   l11.5,4.5l4,5l8.5,3h8.5h8h9l6.5,4l3.5,3.5l6.5,6.5v7l2.5,5.5l7.5,12l6,9.5v6h8h5.5l7.5-5l5-9.5v-12l6-5l7,3l5,5l11,10v3l3.5,5   l4,2.5l8.5-5l12-4l11-6h11.5l12.5,4l3,4l5.5,7.5v6.5l7.5,18.5c0,0,5.5,4,6,5.5s10.5,11,10.5,11l9.5,15l-5,6l5,14.5c0,0,7,10,8.5,11   s12,16.5,12,16.5l4.5,15v7.5V377l5,11.5l3,6l6.5-4.5l-5-6l-2-9l-3-12.5l0.5-11l-1-11l-5.5-6l-5.5-7l-4.5-5.5l-5-7l-7.5-9l0.5-7.5   l4-6L334,285l-11.5-12l-6.5-8l-6-5.5l-3-6.5l-4-8.5l-2-10.5l-1.5-8.5l-8-4.5l-9-4l-11.5-1h-14.5l-6.5,4.5l-10,5l-5,4l-5.5-6.5   l-10-9.5L214,206l-10.5-3l-7.5-0.5l-6,6l-3.5,7.5v9l-3,5.5l-6,2.5l-5.5-5l-2.5-9l-2.5-3.5l-6-7.5l-2-8v-3.5l-3.5-3.5l-5.5-5.5   l-10-6l-5.5-3.5l-6,0.5L123,180l-8.5-1l-7-2.5l-9-6l-8-4h-6H73l-9,1.5l-4.5,2.5h-6l-5.5-4l-5-4.5l-2.5-11.5l-5-6.5l-7-7l-7.5-7.5   L20.5,138z",
	"name": "Elbe"};
pathes['campus']={
	"path": "M299.438,83.36l48.25,34.5l32.75,24.5l22.5,13l25,9l27,7l27.25,4.25 l23.5,2.5l30,2l71.25,5.5l-6.5,76.25l-20-0.25l-14,3l-14-6l-22.75-3.25l-1.75,6h-20.25l-61-5.75l-31.25-3.75l-44.5-3.25l6,30.5 l-1.75,3.25l-62.5,0.75l-64.5,2.75l-31.25,49.75l-27.5-7.25l-15,1.25l-5.25,39.75l-1.75,1.75l-102.5-29.5l-3.25-24.5l-5.25-26.25 l-4-26.5l-5.5-43.5l-1.75-21.75l-4.25-32l36-23.75l-9.75-18.5l70.5-39l73.25-40l20.75-10.75L299.438,83.36z",
	"name": "Campus"};
//pathes['altstadt']={
//	"path": "M179,240l-1.25,5.5l1.25,2l4.25,4l1.75,4.25l2.25,2.25v4l5.25,3.5   c0,0,7.5,1.75,8.25,1.75s11,0,11,0l8.5-1.75l3.25-1.75l6,3.5v4.25l1.75,5.75l4.5-2H238l3.75,2h4.75l2.25-4.5l1.25-2l3.75,1.75   l1.75,0.75v2.25l2.25,1.75l5,2.5l4.25,1.5h1.5l3.75,1.5l2.75-5.25l1.5-2.5v-1.25l2-3l1.25-2.25l-9.5-4.25l6.5-12.5h4.75l3.25-26.79   L275.5,222H264l-11,6l-10.25,3.5l-10.25,4.75l-4-1.75l-3.5-5v-3l-16-15l-7-3l-6,5v12l-5,9.5l-7.5,5H179z",
//	"name": "Altstadt"};

//pathes[id[1]]={
//	"path": "M276.5,270.5l-5.33,9.25h-3l-7.67-3.25l-1.67-3.67l-2.67-2v-3v-4.35c0,0,1.33-2.32,1.67-4.65s3.33,0,3.33,0   h3.33v3l1.67,2.33l10.33,5V270.5z",
//	"name": "Grosser Garten"};
//pathes[id[2]]={
//	"path": "M213.71,240.24l0.41-4.87l2.59-0.13l0.07-4.6h2.46l-0.41-1.37l0.95-1.1h1.36l0.69,1.52l-0.69,1.1H224v4.53  h2.87v4.94H215.4h-1.69V240.24z",
//	"name": "Semperoper"};
//pathes[id[3]]={
//	"path": "M231.54,242.57l0.12,2.09l1.95,1.16l1.42,1.9l-1.42,1.2l-1.3,0.79v1.27l2.19,1.59l1.95,0.15l0.88,1.11v1.42  h-13.51v-1.59l0.98-1.35h1.95l2.72-1.42v-1.03l-0.98-0.79l-1.74-1.44l1.21-1.74l2.28-1.25v-2.09h1.3V242.57z",
//	"name": "Zwinger"};
//pathes[id[4]]={
//	"path": "M213.92,243.57l-3.89,9.7l-8.91,1.86l3.65-9.87L213.92,243.57z",
//	"name": "Gruenes Gewoelbe"};

/*
 * SVG-Polygon-Colours which are changed for highlighting
 */
var farben = {};
farben['dresden'] = "#EEEEEE";
farben['altstadt'] = "#BBBBBB";
farben['elbe'] = "#3366CC"; 
farben['campus'] = "#222222";
farben[id[0]] = "#3366CC"; //elbe
farben[id[1]] = "#669933"; //garten
farben[id[2]] = "#222222"; //oper
farben[id[3]] = "#222222"; //zwinger
farben[id[4]] = "#222222"; //gruen

/*
 * SVG-Polygon-Colours default
 */
var farben_default = jQuery.extend(true, {}, farben);//deep array copy of farben


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
		onRegionClick : function(event, code, region)
		{
			switchPoi(code);
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
	// $("#print_link").click(function () {
		// //show print stuff div and hide the svg stuff
		// $('#main').css("display","none");
		// $('#printcheck').css("display","block");
		// //checkCheckBoxes one time to show correct containers depending an default Checkbox states
		// $(':checkbox').each(function () {
			// checkCheckBox(this);
		// });
		// //buttons from Checkboxes
		// $(':checkbox').click(function () {
			// checkCheckBox(this);
		// });	
		// //button for printing
		// $("#printbutton").click(function () {
			// //hide print stuff container
			// $('#printcheck').css("display","none");
			// //PRINT!!!
			// window.print();
			// $('#printcheck').css("display","block");
			// return false;
		// });
		// //button for switching screen style from index.css to print.css and back
		// $("#changebutton").click(function () {
			// if($('#css_link').attr("href")=="style/print.css"){$('#css_link').attr("href","style/index.css");}
			// else{$('#css_link').attr("href","style/print.css");}
			// return false;
		// });
	// });
});


/**
 * SVG Map Creation - Set Values to SVG Background Image Dimension and HTML Container!
 * If Container has different size, SVG map will be scaled to match Container.
 */
$.fn.vectorMap("addMap", "karten",
{
	"width": 788,
	"height": 410,
	"pathes": pathes
});


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
 * Shows the new poi container (with id_code as id) and hides the old poi (animation included)
 * Also highlights regions on svg map
 */
function switchPoi(id_code){
	if(id_code!=id_current){
		var id_old = id_current;
		id_current = id_code;
		
		//map region colour highlighting
		farben[id_old]=farben_default[id_old];
		farben[id_current]="#FF9933";
		$('#map').vectorMap('set', 'colors', farben);
		
		//poi link colour highlighting
		$('#'+id_old+"_link").css("color","#FFFFFF");
		$('#'+id_code+"_link").css("color","#FF9933");
		
		//poi div animation and stuff
		$('#'+id_old).stop().animate({"margin-top":80}, {easing: 'easeOutQuad', duration:50});
		setTimeout(function(){
			$('#'+id_old).css("display","none");
			$('#'+id_code).css("margin-top","360px");
			$('#'+id_code).css("display","block");
			$('#'+id_code).stop().animate({"margin-top":20}, {easing: 'easeOutQuad', duration:600});
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