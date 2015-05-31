/* jshint devel:true */
var gallery = document.getElementById("gallery");
var img = "";
var images = ["Slides_004","Slides_032","Slides_066","Slides_067","Slides_070","Slides_073","Slides_074","Slides_086","Slides_098","Slides_102","Slides_106","Slides_111","Slides_113","Slides_119","Slides_120","Slides_127","Slides_129","Slides_130","Slides_131","Slides_133"];
var imageTag = "<img class='galleryimg' src='images/{image}.jpg' />";

//drops in default images
images.map( function (image) {
	img += "<li>";
	img += "<div></div>";
	img += '<img class="galleryimg" src="images/'+image+'.jpg" />';
	img += '<span class="glyphicon glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
	img += "</li>";
});

gallery.innerHTML = img;


var kids = gallery.children;


for (var i = 0;i<kids.length;i++) {
	kids[i].addEventListener('click', function(e) {
		console.log(e.target.nextSibling);
	});
}
