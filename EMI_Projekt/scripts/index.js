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
var id = ["poi1","poi2","poi3","poi4","poi5","poi6"];
var id_current = null; //currently selected id
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
	$("#"+id[5]+"_link").click(function () {switchPoi(id[5]);return false;});
	
	/**
	 * Printing
	 */
	$("#print_link").click(function () {
		$('#main').hide();
		$('#printcheck').css('display', 'inline-block');
		
		//show correct containers depending on each check-boxes starting state
		$(':checkbox').each(function () {
			checkCheckBox(this);
		});
		
		//set-up check-box event listener
		$(':checkbox').click(function () {
			checkCheckBox(this);
		});	
		
		//button for switching screen style from index.css to print.css and back
		$("#changebutton").click(function () {
			if($('#css_link').attr("href")=="style/print.css"){$('#css_link').attr("href","style/index.css");}
			else{$('#css_link').attr("href","style/print.css");}
			return false;
		});
		
		//button for printing
		$("#printbutton").click(function () {
			if (!($('#css_link').attr("href")=="style/print.css")) {
				$("#changebutton").click();}
			var noprints = $('.noprint:visible');
			$(noprints).hide();
			window.print();//PRINT!!!
			noprints.show();
			$("#changebutton").click();
			return false;
		});
	});
	
	$("#mapswitcher").click(function () {
		if($('#map').is(':visible')){
			$('#map').hide();
			$('#main').css('height','50px');
			$('#links ul li').css('float','left');
			$("#mapswitcher").html('☐');
		}
		else {
			$('#map').show();
			$('#main').css('height','410px');
			$('#links ul li').removeAttr('style');
			$("#mapswitcher").html('_');
		}
	});
});


/**
 * SVG Map Creation - Set Values to SVG Background, Image Dimension and HTML Container!
 * If Container has different size, SVG map will be scaled to match Container.
 */
$.fn.vectorMap("addMap", "karten", {
	"width": 1600,
	"height": 1050,
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
		{	"path": "M654.001,272.253l20.75,15.25l18,13.5l42.25,29.25l9,7l12.5,12.5		l15,10.5l31.25,21.75l24.5,15.75l15.25,11.5l38.75,27.5l21.25,15l21,14.75l18.5,11.5l24.75,12.5l19,6l18.5,6.25l28.5,7.75l24,6.75		l22.5,4.5l23,3.5l22,3.25l16.75,0.75l37,2.5l29,2.5l36.75,2.75l30,1.75l29.75,3l28.5,2l31,1.75v5.5l-0.75,10.25l-0.25,12.25		l-1.75,13.75l-0.75,12.5l-1.25,18l0.25,12.75l-1.75,14.75l-0.75,12.75l-0.75,12.75l-3,21l-1.25,12l-17.5-0.25l-16-1.75l-8.5,1		l-10,2.5l-12.25,0.75c0,0-8.5-0.5-9.25-0.5s-9.5-3.5-9.5-3.5l-11-4.5l-12.75-3.5l-14.25-1.5l-18.75-0.5l-2.5,12.5h-6.25l-21.75-0.5		l-12.25-0.5l-28-3l-27.75-4.5l-23.25-2l-40.75-4.5l-22.75-1.5l-20.25-3l-34.25-3.25l-2.5,2.75l-9.75,27l-4.75,14.25l-3,7.5		l-6.5,6.5l-8.25,2.25l-34,3.5l-18.5,0.75l-16.75,1.25l-20.5-0.25l-20.5-0.25l-25.25,0.5l-28.75,1.5l-35.25,1.75h-37l-48.5-0.25		l-8,16.25l-10,17.25l-9.5,16.25l-11.5,19l-12.25,22l-9.5,16.25l-8.5-3l-11.5-5l-16.5-4l-20.75-6l-20-2.5l-13.25,1l0.5,14.5		l-0.5,15.5l-1.5,23l-6,29.75l-95.75-23.25l-28,89.75l-8,6l-108-33.25l27.5-97.75l-3.5-27.5l-3-26.25l-3.75-23.25l-3.75-30.75		l-4-30.5l-4.25-30.5l-2.5-24.75l-3.75-27.75l-6-38.25l-6.75-53.25l-5-38.25l-20.5-42.5l71.5-41.25l48.75-26.75l47.5-26.5l59.5-31.5		l68-37.75l39.5-21l37-19.25l29.25-16.5L654.001,272.253z",
			"name": "",
			"color":"#222222"}
	];
	
	paths[id[0]]=
	[
		{	"path": "M257.501,528.92l19-3l-1.333-5h-2.667l-1-8.667l2.333-0.333		l-0.333-9.334l10-1.666l0.333-3l6.333,0.333l1,7.333l16.333-2.333l-0.667-9l1-8.667l5.667-0.666l2.667,6.666l9-1.666v-3.667		l34.333-1.667l1.667,16.334l-12.333,1l-1-6.334l-9-1l-1.667,5.334l-13,1l5,36.666l-6.333,1.667l9,67.333l-12.667,0.667		l-1.667-5.667h2.333l-4-30.666l-2-0.334l-0.667-2l-25.667,1.334v3l-33.667,3l-7.667-48.334l10.333-1L257.501,528.92z",
			"name": "Schumann",
			"color": "#B03060"}
	];
	
	paths[id[1]]=
	[
		{	"path": "M345.501,909.253l-19.667,61.333l22,6.334l13.667-47.334l13.333,3.334		l-18,55.666l-46-15.666l9-30.334l-4.667-0.333l-2.667,4.333l-23.333-6.666l1.333-5.667l-5-1.333l-1,5l-15.667-4.334l12.667-43.333		L345.501,909.253z",
			"name": "Informatik",
			"color": "#66AA33"},
		{
			"path": "M347.835,976.92l-22-6.334l11-35.666l21.667,5.666L347.835,976.92z",
			"name": "Informatik Foyer",
			"color": "#99EE55"}
	];
	
	paths[id[2]]=
	[
		{	"path": "M1262.835,670.253l46.667,5l-0.667,16l-47.333-4.667L1262.835,670.253z",
			"name": "SLUB",
			"color": "#FFFAFA"},
		{	"path": "M1270.835,576.92l47.667,4l-1.334,16.333l-47-4.333L1270.835,576.92z",
			"name": "SLUB",
			"color": "#FFFAFA"}
	];
	
	paths[id[3]]=
	[
		{	"path": "M745.168,465.92v-3.667l-3.667-4l6-14l39.334-2.333v-3.334l6-0.333v-3		h13.333l0.667,12l8,18l-3,8.667l-9-0.667l-8.667,8.333l-1,2.334l-4.667,3l-4.333-5l-30,2.666v4l-6.667,0.334l-0.666-2.334		l-25.334,1.334l-0.333,3.333l-13.667-0.333v-9.667l-3-1l-1.333-13l2.333-1.667l-0.333-9.666l11.333-0.667l1.334,12.667		L745.168,465.92z",
			"name": "Bayer",
			"color": "#FF6347"}
	];
	
	paths[id[4]]=
	[
		{	"path": "M1211.835,577.92l-9.667,83.666l-25.666-2.666l9-83.667		L1211.835,577.92z",
			"name": "Trefftz",
			"color": "#22CC55"}
	];
	
	paths['Zeuner']=
	[
		{	"path": "M504.168,469.586v-3.666l12.333-0.667l0.667,2.333l36-3.666l4.333,55		l-35,3.333l-0.333,2.667l-12.667,0.666l-0.333-2.666l-30.333,3.333l-0.333,1.667l-11.333,0.666l-2-16l2.667-0.666l-1.667-24.334		l-3.333-0.333l-1-17l11.667-0.667l0.333,2.667L504.168,469.586z",
			"name": "Zeuner",
			"color": "#3366CC"}
	];
	
	paths['Hülsse']=
	[
		{	"path": "M371.169,533.586l-3.333-47.333l16.667-0.667l-0.667,4l4.667,41.334		l38-4l1.667,15l-37.333,6.666l6.333,46.667l-16,1.333l-7.667-45.666l-37.667,4.666l-2-15.666L371.169,533.586z",
			"name": "Hülsse-Bau",
			"color": "#3366CC"}
	];
	
	paths['Tilich']=
	[
		{	"path": "M393.835,476.92l20.333-1l0.333-1.334l9.333-1.333l6,42.333l-8.333,2		l-0.667-2.333l-3.667-0.333l-1.667-10l2.667-1l-2.667-17h-2.667l-0.333,2.333l-2.667,1.333l-0.667,2.334h-14.667L393.835,476.92z",
			"name": "Tilich-Bau",
			"color": "#3366CC"}
	];
	
	paths['Berndt']=
	[
		{	"path": "M473.169,571.92l22.333-2.667l1.667,12l-2,0.667l2.667,21l2.333,0.666		l1.333,11.667l-21.333,3l-2-12l1.667-0.333l-3-22l-2,0.333L473.169,571.92z",
			"name": "Berndt-Bau",
			"color": "#3366CC"}
	];
	
	paths['Görges']=
	[
		{	"path": "M485.502,652.253l14-2.333v-1.334l10.333-1.333l0.333,1.333		l14.333-2.333l1.333,16.333l3.333,0.334l1.667,15.333l-3,1.667l0.667,5.333h1.667l1,10l-39,5.667l-1.667-8.667h1.667l-4-30.333		l-1.667,0.666L485.502,652.253z",
			"name": "Görges-Bau",
			"color": "#3366CC"}
	];
	
	paths['AlteMensa']=
	[
		{	"path": "M515.502,823.253h-11.667l-0.667-41l1.333-0.333v-13.334l43.667-2		l0.667-3.666l41.667-1l1,11l25.667-1l0.666,8.666l-21.333,1.667l0.667,37.667h-2.667l-0.667,8.666l-46.333,1.667v1.667		l-9.333,0.333v-8.667l9-0.666v-13l-2.333-0.334l-1.333-27l-28,0.334V823.253z",
			"name": "Alte Mensa",
			"color": "#3366CC"}
	];
	
	paths['Barkhausen']=
	[
		{	"path": "M449.835,795.586l-16,2.667l-5.667-36.333l-68,10l5.333,39l-16.333,2		l-1-6l-29,3.333l1.667,15.333l9-0.333l10.333,30.333l-5.333,3.334l-4.667,1.666l-5,1.334l-5,0.666h-4l-3.667-0.333l-4.333-0.667		l-0.667-33h-1.333l-1-6.666l-3.667-0.334l-0.333,3h-7.667v-1.666l-6.667-0.334l-1.333-12l2-0.666l-7.667-56.667h-1.667l-2-10.333		l2-0.334l-2.333-20.333l15.333-2l1,3.667l44.333-7l-0.667-1.667l9-0.667l1,1.334l4.667-0.334l7,40l5.667-0.333v-1.333l6.667-1.334		l1,1.667l54.333-8.667l-2.333-19l16.333-2.666l4,23.333h3.667v6.667l-2.667,0.666L449.835,795.586z",
			"name": "Barkhausen-Bau",
			"color": "#3366CC"}
	];
	
	paths['FritzFoerster']=
	[
		{	"path": "M669.836,664.253l1.333,44.333l15.667,0.334v-2.334l20-0.333l18-0.667		l0.333,1l33-1l-1-45l15.334-1.666l2,63.333l-37.667,0.333l-1-2.333l-9,0.333l-1,10.334l-20.333,1l-0.667-10.667l-10,0.333		l-0.667,2.667l-40,1l-1-59.333L669.836,664.253z",
			"name": "Fritz-Foerster-Bau",
			"color": "#3366CC"}
	];
	
	paths['Hörsaalzentrum']=
	[
		{	"path": "M792.169,588.586l-4-39.333h-2.333l-0.333-9.333l61.666-5l7,60.666		l-63,6l-1-12.333L792.169,588.586z",
			"name": "Hörsaalzentrum",
			"color": "#3366CC"}
	];
	
	paths['ChemieHydro']=
	[
		{	"path": "M789.17,624.92l88.333-7.334l3,58.667h2.667l3.666,50l-87.333,2.333		l-0.333-13.333l72.333-0.667l1-8.333l-8.333-1.333l-1-16l-57.334,2l-4-39.334l17-1.333l1.667,23.667l32-2.334l-1.333-27l-41,3.334		l-0.334-7.334l-18,1L789.17,624.92z",
			"name": "Chemie/Hydrowissenschaften",
			"color": "#3366CC"}
	];
	
	paths['NeueMensa']=
	[
		{	"path": "M922.17,513.586l49,5l-6.334,59.667l-49.666-5L922.17,513.586z",
			"name": "Neue Mensa",
			"color": "#3366CC"}
	];
	
	paths['Willers']=
	[
		{	"path": "M983.836,527.253l45,3.667l0.334-2l15.666,1.666l-0.333,2.667l41.667,4		l1-2l16.333,1.667l-0.333,3l43.666,4.333l0.667-2.333l15.333,2l-4.333,49.333l-16-1.667l3.333-35.666l-15.666-1.334l-0.334,2		l-8.666-0.666l-1-3l-17.667-0.667l-3.667,34.667l-16.333-0.667l3-36.333l-16.333-2.334v1.667h-8.667v-2.667l-16.333-1.666		l-4,36.666l-15.334-1.666l2.667-36l-19.333-2.667l-0.334,3l-7-1v-3l-17.666-1.333L983.836,527.253z",
			"name": "Willsers-Bau",
			"color": "#3366CC"}
	];
	
	paths['Physik']=
	[
		{	"path": "M1036.503,625.586v8l39.667,5l0.333-8l18,2.667l-0.333,7l42.666,4		l0.667-7l16.667,1.667l-0.334,8.666l23,3l-1.333,8.334l-23-3.334l-3.667,32.334l-18-2.334l4.667-34.666l-10.333-1.334l-1,5.667		l-20-3l-0.667-6l-10-1l-4.667,36.667l-16-2.667l3-35.333l-8.666-1.334l-1.667,5.667l-21.333-3l0.333-5l-9-0.667l-5,36.334		l-16.667-2.667l5-49L1036.503,625.586z",
			"name": "Physik",
			"color": "#3366CC"}
	];
	
	/*paths['Biologie']=
	[
		{	"path": "M1448.836,666.586l0.334-9.666l20.333,1.666l-6.333,66.667l-20-2.333		l0.666-12l-25.666-3.667l-1.334,13.667l-20.333-3l7-66.334l19.667,2.667l-1.334,9.333L1448.836,666.586z",
			"name": "Biologie",
			"color": "#3366CC"}
	]; */
	
	paths['Gerber']=
	[
		{	"path": "M919.509,641.586l4.666-38l55,5.667l-6.666,57l-48.334-5.333l1-18.334		L919.509,641.586z",
			"name": "Gerber-Bau",
			"color": "#3366CC"}
	];
	
	paths['GerhartPotthoff']=
	[
		{	"path": "M694.509,351.586l-32-1v1.667l-16.333,3l-11-65.333l18-3l7.333,52		l32.667-0.667l-0.333-7.667l18.666-1.333l1.334,12l5.666,0.667v8.333l-4.333,0.333l2,37l20.333-1.666l-0.333-3l39.333-2.333		l3,23.667l-40.333,3l-1.333-11.333l-18,1l0.666,17.666l-19.333,1.334L694.509,351.586z",
			"name": "Gerhart-Potthoff-Bau",
			"color": "#3366CC"}
	];
	
	paths['Bergstraße']=
	[
		{	"path": "M841.176,184.919l17.333,106.333l10.334,55.333l3.333,19.333l3.667,41		l7.333,38l5.667,34.666l5.333,32.334l4.667,27.666l1.333,11.667l-0.333,16.667l1.333,14.666l3.333,25l7.334,39l6,26.667		l2.666,16.333l5.667,21.667l4.333,12.667l2,11.666l1.334,20l1.666,11l6.667,48l2.333,24.334l4,26.333l2.667,20.667l2.333,17.666		l2,20v10.334l-1.666,8.666l-2,8.334l-1.334,6l-5,9.666l-6.333,11l-7.667,8.334l-7,5.666l-2.666-4.666l4.667-8l-12,1l3.666-7		l-10.333,1.333l11-11.333l7.333-9l5.334-11.667l3-11l1.333-9.333l0.333-13.334l-0.666-10.333l-1.334-13l-1.333-8.667l-3.667-23		l-2.333-14.666l-2.333-10.334l-4.667-30.333l-2.333-12.333l-2.334-19l-4.666-19l-6-33.334l-4.334-22.333l-6.333-34.667l-8-49		l-3.333-14.333l-7.334-48l-5.333-40.333l-6-40l-4-28l-2.667-23.667l-2.333-30.667l-3.333-16.333l-3.334-17.667l-4-26.333		l-4.666-22.333l-4.334-25.333l-3.666-22.667l-5-25.667l-4-26l1.666-12l7.667,6.667L841.176,184.919z",
			"name": "Bergstraße",
			"color": "#EECC22"}
	];
	
	paths['ZellscherWeg']=
	[
		{	"path": "M609.509,213.919l55,38.667l26.333,16.333l58.334,41.333l22.666,17		l23.667,18.333l25.667,17.333l11.666,7.333l13.667,9.333l40.333,29l15,8.334l18,11l18.334,13.666l14.333,12.334l18.333,9.333		l20.334,7.667l22.333,8.666l15.667,4.667l18.666,5l18.667,4.667l17,3l24.667,4.333l20.666,2.333l18.334,1.667l14,1.333l14,1		l33,2.334l36.666,3l29.667,3l18.667,0.333l19.666,2l13.667-0.333l9.667-0.667l9,0.333l15,2.667l11.333,2.667l12,2.333l8.667,1		l11.333,0.667l13.333,1l-7,4.333l5.334,9.333l-10,1l7.666,8.667l-41-3.667l-33-3l-70.333-6.666l-48-3l-44.667-2.667l-23.666-2.333		l-15.334-0.667l-19.333-2.333l-28-4.667l-20.333-2.333l-36.334-10.667l-22.333-6l-20-6.333l-33-10.334l-18.667-9l-19-11.666		l-15-8.334l-37.666-27l-22.667-16l-32.667-24.666l-27.666-20l-24-16.333l-10.667-11.667l-11-9.667l-30.008-21l-23.992-17		l-30.667-22.667l-21.666-13.667l-35.667-25.333l9.333-3.667l-5.666-9l9.333,2.333V213.919z",
			"name": "ZellscherWeg",
			"color": "#EECC22"}
	];
	
	paths['MünchnerStraße']=
	[
		{	"path": "M627.841,238.919l-38.333,22.667l-32.333,18.667l-85,45.333		l-76.333,41.667l-94.333,51.667l-59.333,32.666l-0.667-12.666c0,0-9.333,0.666-9.333-0.334s2.333-9,2.333-9l-10.667-7.666l73-41		l73.333-41.333l132-72.333l48-28.333l47-23.667l3.333,8.667l13,1l5,10.333L627.841,238.919z",
			"name": "Münchner Straße",
			"color": "#EECC22"}
	];
	
	// paths['MünchnerPlatz']=
	// [
		// {	"path": "M236.507,351.253l9.667,3.667l10.667,21l18.667,33.667l13.333,22.334		l18.333,35l1.333,8.333l-71.667,42l-12,1.333l-1.667-9.666l-17.667-34l-37-63l-3.667-7l4.333-12.667l0.667-3.667L236.507,351.253z",
			// "name": "Münchner Platz",
			// "color": "#404040"}
	// ];
	
	paths['NürnbergerPlatz']=
	[
		{	"path": "M656.507,228.753c0,27.338-23.058,49.5-51.5,49.5		c-28.443,0-51.5-22.162-51.5-49.5s23.058-49.5,51.5-49.5C633.45,179.253,656.507,201.415,656.507,228.753z",
			"name": "Nürnberger-Platz",
			"color": "#EECC22"}//#FADD66
	];
	
	paths['FritzFoersterPlatz']=
	[
		{	"path": "M909.507,398.42c0,25.681-21.863,46.5-48.834,46.5		c-26.97,0-48.833-20.819-48.833-46.5c0-25.682,21.863-46.5,48.833-46.5C887.644,351.919,909.507,372.738,909.507,398.42z",
			"name": "Fritz-Foerster-Platz",
			"color": "#EECC22"}
	];
	
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
	/** returns e.g.
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
			"path":flatPathInformation[key]["path"]
			,"name":flatPathInformation[key]["name"]
		};
		// if(flatPathInformation[key][name]!="") {
			// paths[key]["name"] = flatPathInformation[key]["name"];
		// }
	}
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
	// e.g. code = poi1
	switchFlatPoi(code+splitter+"0");
	//argument is e.g. "poi1--0"
}

/**
 * Shows the new poi container (whos id is the same as "code"/"id_current" variable),
 * hides the old poi with "id_old" as id, highlights the according regions on SVG map and the according link.
 * poi containers are animated with jQuery.
 */
function switchFlatPoi(flatCode){
	// e.g. flatCode = "poi1--0"
	// e.g. id_current = "poi4"
	
	var code = flatCode.split(splitter)[0];// e.g. code = "poi1"
	
	if(code!=id_current && code.indexOf("poi")!=-1){//if new poi is not the old one and code contains "poi"
	
		var id_old = id_current;// e.g. id_old = "poi4"
		id_current = code;// e.g. id_current = "poi1";
		
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
		var oldExists = id_old != null;
		if (oldExists) {//down-animation for old div
			$('#'+id_old).stop().animate({"margin-top":80}, {easing: 'easeOutQuad', duration:50});}
		setTimeout(function(){//round about when down-animation finishes (TIMES ARE NOT EXACT!)
			if(oldExists) {
				$('#'+id_old).css("display","none");}
			$('#'+id_current).css("margin-top","360px");
			$('#'+id_current).css("display","block");
			$('#'+id_current).stop().animate({"margin-top":0}, {easing: 'easeOutQuad', duration:600});
			setTimeout(function(){//make sure down-animation has finished
				if(oldExists) {//remove margin from down-animation
					$('#'+id_old).css("margin-top","0px");}
			},50);
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
 * Checks a Checkbox and hides/shows the container whose id is the same as the checkbox's value attribute.
 */
function checkCheckBox(box){
	if($(box).is(':checked')){$('#' + $(box).val()).show();}
	else{$('#' + $(box).val()).hide();}
}


/**
 * Floating (animated with easing) Menu Selection Underscores
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