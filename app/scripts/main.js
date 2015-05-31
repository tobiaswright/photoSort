/* jshint devel:true */
var gallery = document.getElementById("gallery");
var srcImages = ["Slides_004","Slides_032","Slides_066","Slides_067","Slides_070","Slides_073","Slides_074","Slides_086","Slides_098","Slides_102","Slides_106","Slides_111","Slides_113","Slides_119","Slides_120","Slides_127","Slides_129","Slides_130","Slides_131","Slides_133"];
var li = "";
var kids;

//drops in default images
srcImages.map( function (image) {
	li += "<li>";
	li += "<div data-toggle='modal' data-target='#myModal'	></div>";
	li += '<img class="galleryimg" data-img="'+image+'" src="images/'+image+'.jpg" />';
	li += '<span class="glyphicon glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
	li += "</li>";
});

gallery.innerHTML = li;

kids = gallery.children;

for (var i = 0;i<kids.length;i++) {
	kids[i].addEventListener('click', function(e) {
		var slide = e.target.nextSibling.getAttribute('data-img');


	});
}
