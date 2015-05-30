/* jshint devel:true */

var gallery = document.getElementById("gallery")

var txt = "";
var images = [
	"Slides_004",
	"Slides_032",
	"Slides_066",
	"Slides_067",
	"Slides_070",
	"Slides_073",
	"Slides_074",
	"Slides_086",
	"Slides_098",
	"Slides_102",
	"Slides_106",
	"Slides_111",
	"Slides_113",
	"Slides_119",
	"Slides_120",
	"Slides_127",
	"Slides_129",
	"Slides_130",
	"Slides_131",
	"Slides_133"
];

var imageTag = "<img class='galleryimg' src='images/{image}.jpg' />";

images.map( function (image) {
	txt += "<li>"
	txt += '<span class="glyphicon glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
	txt += imageTag.replace('{image}', image);
	txt += "</li>"
});

gallery.innerHTML = txt;
