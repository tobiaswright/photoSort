/* jshint devel:true */
(function () {
'use strict';
var addCollection = document.getElementById('addCollection');
var addIamge = document.getElementById('addIamge');
var collectionDropdown = document.getElementById('collectionDropdown');
var collectionGrid = document.getElementById('collectionGrid');
var content = document.getElementById('content');
var deleteCollection = document.getElementById('deleteCollection');
var modalAlert = document.getElementById('modalAlert');
var modalimage = document.getElementById('modalimage');
var nav = document.getElementById('nav');
var newEmptyCollection = document.getElementById('newEmptyCollection');
var newCollection = document.getElementById('newCollection');
var title = document.getElementById('title');

var srcImages = ['Slides_004','Slides_032','Slides_066','Slides_067','Slides_070','Slides_073','Slides_074','Slides_086','Slides_098','Slides_102','Slides_106','Slides_111','Slides_113','Slides_119','Slides_120','Slides_127','Slides_129','Slides_130','Slides_131','Slides_133'];
var sets = [{setName: 'All Images'}];

var currentGallery;
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
			action.deleteImage();
		}
	});
};


//Lays out the grid, argument is optional if you want a different grid than the default.
var setLayout = function(imageArray) {
	var li = '';

	//check to see if an array was passed in
	if (imageArray === 'all' || imageArray === undefined ) {
		imageArray = srcImages;
		title.innerHTML += ' ('+ srcImages.length + ')';
	}

	//TODO: move to a template
	imageArray.map( function (image) {
		li += '<li data-img="'+image+'">';
		li += '<div></div>';
		li += '<img class="galleryimg" src="images/'+image+'.jpg" />';
		li += '<span data-toggle="modal" data-target="#addModal" class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>';
		li += '<span class="deleteImage glyphicon glyphicon-minus-sign aria-hidden="true"></span>';
		li += '</li>';
	});


	collectionGrid.innerHTML = li;

	kids = collectionGrid.children;

	for (var i = 0;i<kids.length;i++) {
		bindImages(i, kids);
	}
};

var findCollection = function( collection ) {
	for (var i = 0;i<sets.length;i++) {
		if (sets[i].setName === collection) {
			return sets[i];
		}
	}
};

//used for both the navigation of collections and the dropdown.
var setCollections = function() {
	var navli = '';
	var options = '';

	sets.map( function( nav ) {
		navli += '<li><a>'+nav.setName+'</a></li>';
		options += '<option value="'+nav.setName+'">'+nav.setName+'</option>';
	});

	collectionDropdown.innerHTML = options;
	nav.innerHTML = navli;

	nav.addEventListener('click', action.selectCollection);
};

var action = {
	selectCollection: function(e) {
		e.preventDefault();

		var galleryArray = [];
		currentGallery = e.target.textContent;

		title.innerHTML = currentGallery;

		//sets defualt collection
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

		setLayout( galleryArray );

	},

	deleteImage: function() {
		var newCollection = [];
		var index;
		var liveCollection;
		var updateCollection;
		

		liveCollection = findCollection( currentGallery );

		collectionImage = liveCollection.images;

		index = collectionImage.indexOf(srcImages.indexOf(slide));

		//checks to see if image is in array
		//TODO: Decide what to do if for some crazt reason the image doesen't exsist.
		if (index > -1) {
			collectionImage.splice(index, 1);
			updateCollection = collectionImage;
		}

		updateCollection.map (function( image) {
			newCollection.push(srcImages[image]);
		});

		title.innerHTML = currentGallery + '('+ updateCollection.length + ')';
		setLayout( newCollection );
	},

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
		setLayout();
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

	setLayout();
	setCollections();
};

init();
}());