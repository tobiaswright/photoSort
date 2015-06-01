/* jshint devel:true */
'use strict';
var gallery = document.getElementById('gallery');
var nav = document.getElementById('nav');
var modalimage = document.getElementById('modalimage');
var title = document.getElementById('title');
var srcImages = ['Slides_004','Slides_032','Slides_066','Slides_067','Slides_070','Slides_073','Slides_074','Slides_086','Slides_098','Slides_102','Slides_106','Slides_111','Slides_113','Slides_119','Slides_120','Slides_127','Slides_129','Slides_130','Slides_131','Slides_133'];
var navli = '';
var sets = [
		{
			setName: 'All Images'
		},
		{
			setName: 'Test collection',
			images: [0,1,13]
		}
	];
var kids;


var setNavigation = function() {
	sets.map( function( nav ) {
		navli += '<li><a>'+nav.setName+'</a></li>';
	});
	nav.innerHTML = navli;

	nav.addEventListener('click', function(e) {
		e.preventDefault();

		var galleryArray = [];
		var galleryTitle = e.target.textContent;

		title.innerHTML = galleryTitle

		if ( galleryTitle === 'All Images') {
			galleryArray = 'all';
		} else {
			sets.map( function( set ) {
				if (set.setName === galleryTitle) {
					title.innerHTML += '('+ set.images.length + ')';
					set.images.map( function(images) {
						galleryArray.push(srcImages[images]);
					});
				}
			});
		}

		gridLayout( galleryArray );

	});
};


var bindImages = function(i, kids) {
	kids[i].addEventListener('click', function(e) {
		var slide = e.target.nextSibling.getAttribute('data-img');
		var slideCont = '<img src="images/'+slide+'.jpg" />';
		modalimage.innerHTML = slideCont;
	});
};

//drops in default images
var gridLayout = function(imageArray) {

	if (imageArray === 'all' || imageArray === undefined ) {
		imageArray = srcImages;
		title.innerHTML += ' ('+ srcImages.length + ')'
	}

	var li = '';

	imageArray.map( function (image) {
		li += '<li>';
		li += '<div data-toggle="modal" data-target="#myModal"></div>';
		li += '<img class="galleryimg" data-img="'+image+'" src="images/'+image+'.jpg" />';
		li += '<span class="glyphicon glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
		li += '</li>';
	});


	gallery.innerHTML = li;

	kids = gallery.children;

	for (var i = 0;i<kids.length;i++) {
		bindImages(i, kids);
	}
};

var init = function() {
	gridLayout();
	setNavigation();
};

init();