/* jshint devel:true */
(function () {
'use strict';
var addCollection = document.getElementById('addCollection');
var addIamge = document.getElementById('addIamge');
var collectionDropdown = document.getElementById('collectionDropdown');
var content = document.getElementById('content');
var deleteCollection = document.getElementById('deleteCollection');
var gallery = document.getElementById('gallery');
var modalAlert = document.getElementById('modalAlert');
var modalimage = document.getElementById('modalimage');
var nav = document.getElementById('nav');
var newEmptyCollection = document.getElementById('newEmptyCollection');
var newCollection = document.getElementById('newCollection');
var title = document.getElementById('title');

var srcImages = ['Slides_004','Slides_032','Slides_066','Slides_067','Slides_070','Slides_073','Slides_074','Slides_086','Slides_098','Slides_102','Slides_106','Slides_111','Slides_113','Slides_119','Slides_120','Slides_127','Slides_129','Slides_130','Slides_131','Slides_133'];

var currentGallery;
var deleteImage;
var destroyAlert;
var kids;
var slide;

var bindImages = function(i, kids) {
	kids[i].addEventListener('click', function(e) {
		var selectedImage = e.target;
		slide = selectedImage.parentNode.attributes[0].value;
		var slideCont = '<img src="images/'+slide+'.jpg" />';
		modalimage.innerHTML = slideCont;

		if ( selectedImage.classList.contains('deleteImage') ) {
			deleteImage();
		}
	});
};

var gridLayout = function(imageArray) {

	if (imageArray === 'all' || imageArray === undefined ) {
		imageArray = srcImages;
		title.innerHTML += ' ('+ srcImages.length + ')';
	}

	var li = '';

	imageArray.map( function (image) {
		li += '<li data-img="'+image+'">';
		li += '<div></div>';
		li += '<img class="galleryimg" src="images/'+image+'.jpg" />';
		li += '<span data-toggle="modal" data-target="#addModal" class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>';
		li += '<span class="deleteImage glyphicon glyphicon-minus-sign aria-hidden="true"></span>';
		li += '</li>';
	});


	gallery.innerHTML = li;

	kids = gallery.children;

	for (var i = 0;i<kids.length;i++) {
		bindImages(i, kids);
	}
};

var setCollections = function() {
	var navli = '';
	var options = '';

	sets.map( function( nav ) {
		navli += '<li><a>'+nav.setName+'</a></li>';
		options += '<option value="'+nav.setName+'">'+nav.setName+'</option>';
	});

	collectionDropdown.innerHTML = options;
	nav.innerHTML = navli;

	nav.addEventListener('click', function(e) {
		e.preventDefault();

		var galleryArray = [];
		currentGallery = e.target.textContent;

		title.innerHTML = currentGallery;

		if ( currentGallery === 'All Images') {
			galleryArray = 'all';
			content.classList.add('allimages');
		} else {
			sets.map( function( set ) {
				if (set.setName === currentGallery) {
					var number = (set.images === undefined) ? 0 : set.images.length;
					title.innerHTML += '('+ number + ')';

					if (!set.images) {
						return;
					}
					set.images.map( function(images) {
						galleryArray.push(srcImages[images]);
					});
				}
			});
			content.classList.remove('allimages');
		}

		gridLayout( galleryArray );

	});
};

deleteImage = function() {
	var index;
	var updateCollection;
	var newCollection = [];

	for (var i = 0;i<sets.length;i++) {
		if (sets[i].setName === currentGallery) {

			index = sets[i].images.indexOf(srcImages.indexOf(slide));
			if (index > -1) {
				sets[i].images.splice(index, 1);
				updateCollection = sets[i].images;
			}
		}
	}

	updateCollection.map (function( image) {
		newCollection.push(srcImages[image]);
	});

	title.innerHTML = currentGallery + '('+ updateCollection.length + ')';
	gridLayout( newCollection );
};

var action = {
	addCollection: function() {
		if ( newEmptyCollection.value !== '' ) {
			sets.push({setName: newEmptyCollection.value, images: []});
			setCollections();
		}
	},

	deleteCollection: function() {
		var index;
		for (var i = 0;i<sets.length;i++) {
			if (sets[i].setName === currentGallery) {

				index = sets.indexOf(sets[i]);
				if (index > -1) {
					sets.splice(index, 1);
				}
			}
		}

		content.classList.add('allimages');
		gridLayout();
		setCollections();
		title.innerHTML = sets[0].setName + ' ('+ srcImages.length + ')';
	},

	addImage: function() {
		if ( collectionDropdown.value !== 'All Images' && newCollection.value === '' ) {
			sets.map( function( set ) {
				if (set.setName === collectionDropdown.value) {
					for (var i = 0;i<set.images.length;i++) {
						if ( set.images[i] === srcImages.indexOf(slide)) {
							modalAlert.innerHTML = '<div class="alert alert-warning" role="alert">Image already exist in this collection</div>';
							return;
						}
					}
					$('#addModal').modal('hide');
					set.images.push( srcImages.indexOf(slide) );
				}
			});
			
		} else {
			sets.push({setName: newCollection.value, images: [ srcImages.indexOf(slide) ] });
			$('#addModal').modal('hide');
		}

		destroyAlert = setTimeout( function() {
			modalAlert.innerHTML = '';
		}, 3000);

		newCollection.value = '';
		setCollections();

	}
};

var init = function() {

	addCollection.addEventListener('click', action.addCollection );
	addIamge.addEventListener('click', action.addImage );
	deleteCollection.addEventListener('click', action.deleteCollection );

	gridLayout();
	setCollections();
};

init();
}());