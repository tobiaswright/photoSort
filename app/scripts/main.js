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


var defaultTitle = 'All Images';
var defaultClass = 'allimages';
var srcImages = ['Slides_004','Slides_032','Slides_066','Slides_067','Slides_070','Slides_073','Slides_074','Slides_086','Slides_098','Slides_102','Slides_106','Slides_111','Slides_113','Slides_119','Slides_120','Slides_127','Slides_129','Slides_130','Slides_131','Slides_133'];

var collections = [{name: defaultTitle}];

var currentCollection;
var destroyAlert;
var cells;
var slide;

var bindImages = function(i, cells) {
	var selectedImage;
	var slideCont

	cells[i].addEventListener('click', function(e) {
		selectedImage = e.target;
		slide = selectedImage.parentNode.attributes[0].value;
		slideCont = '<img src="images/'+slide+'.jpg" />';
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

	cells = collectionGrid.children;

	for (var i = 0;i<cells.length;i++) {
		bindImages(i, cells);
	}
};

var findCollection = function() {
	for (var i = 0;i<collections.length;i++) {
		if (collections[i].name === this) {
			return collections[i];
		}
	}
};

//used for both the navigation of collections and the dropdown.
var setCollections = function() {
	var navli = '';
	var options = '';

	collections.map( function( nav ) {
		navli += '<li><a>'+nav.name+'</a></li>';
		options += '<option value="'+nav.name+'">'+nav.name+'</option>';
	});

	collectionDropdown.innerHTML = options;
	nav.innerHTML = navli;

	nav.addEventListener('click', action.selectCollection);
};

var action = {
	selectCollection: function(e) {
		e.preventDefault();

		var galleryArray = [];
		currentCollection = e.target.textContent;

		title.innerHTML = currentCollection;

		//collections defualt collection
		if ( currentCollection === defaultTitle ) {
			galleryArray = 'all';
			content.classList.add( defaultClass );
		} else {
			collections.map( function( set ) {
				if (set.name === currentCollection) {
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
			content.classList.remove( defaultClass );
		}

		setLayout( galleryArray );

	},

	deleteImage: function() {
		var newCollection = [];
		var index;
		var thisCollection;
		var thisImage;
		var updateCollection;
		

		thisCollection = findCollection.call( currentCollection );
		thisImage = thisCollection.images;
		index = thisImage.indexOf(srcImages.indexOf(slide));

		//checks to see if image is in array
		//TODO: Decide what to do if for some crazt reason the image doesen't exsist.
		if (index > -1) {
			thisImage.splice(index, 1);
			updateCollection = thisImage;
		}

		updateCollection.map (function( image) {
			newCollection.push(srcImages[image]);
		});

		title.innerHTML = currentCollection + '('+ updateCollection.length + ')';
		setLayout( newCollection );
	},

	addCollection: function() {
		if ( newEmptyCollection.value !== '' ) {
			collections.push({name: newEmptyCollection.value, images: []});
			setCollections();
		}
	},

	deleteCollection: function() {
		var index;
		var thisCollection;

		thisCollection = findCollection.call( currentCollection );
		index = collections.indexOf( thisCollection );

		if (index > -1) {
			collections.splice(index, 1);
		}

		content.classList.add( defaultClass );
		setLayout();
		setCollections();
		title.innerHTML = collections[0].name + ' ('+ srcImages.length + ')';
	},

	addImage: function() {
		var thisCollection;

		if ( collectionDropdown.value !== defaultTitle && newCollection.value === '' ) {

			thisCollection = findCollection.call( collectionDropdown.value );

			for (var i = 0;i<thisCollection.images.length;i++) {
				if ( thisCollection.images[i] === srcImages.indexOf(slide)) {
					modalAlert.innerHTML = '<div class="alert alert-warning" role="alert">Image already exist in this collection</div>';
					return;
				}
			}
			$('#addModal').modal('hide');
			thisCollection.images.push( srcImages.indexOf(slide) );
			
		} else {
			collections.push({name: newCollection.value, images: [ srcImages.indexOf(slide) ] });
			$('#addModal').modal('hide');
		}

		destroyAlert = setTimeout( function() {
			modalAlert.innerHTML = '';
		}, 3000);

		newCollection.value = '';
		setCollections();

	}
};

// https://github.com/mikeflynn/egg.js
function Egg(){this.eggs=[],this.hooks=[],this.kps=[],this.activeEgg="",this.ignoredKeys=[16],arguments.length&&this.AddCode.apply(this,arguments)}Egg.prototype.__execute=function(a){return"function"==typeof a&&a.call(this)},Egg.prototype.__toCharCodes=function(a){var b={up:38,down:40,left:37,right:39,enter:13,space:32,ctrl:17,alt:18,tab:9},c=Object.keys(b);"string"==typeof a&&(a=a.split(",").map(function(a){return a.trim()}));var d=a.map(function(a){return a===parseInt(a,10)?a:c.indexOf(a)>-1?b[a]:a.charCodeAt(0)});return d.join(",")},Egg.prototype.AddCode=function(a,b,c){return this.eggs.push({keys:this.__toCharCodes(a),fn:b,metadata:c}),this},Egg.prototype.AddHook=function(a){return this.hooks.push(a),this},Egg.prototype.handleEvent=function(a){var b=a.which,c=b>=65&&90>=b;if(!("keydown"!==a.type||a.metaKey||a.ctrlKey||a.altKey||a.shiftKey)){var d=a.target.tagName;if(("HTML"===d||"BODY"===d)&&c)return void a.preventDefault()}"keyup"===a.type&&this.eggs.length>0&&(c&&(a.shiftKey||(b+=32)),-1===this.ignoredKeys.indexOf(b)&&this.kps.push(b),this.eggs.forEach(function(a,b){var c=this.kps.toString().indexOf(a.keys)>=0;c&&(this.kps=[],this.activeEgg=a,this.__execute(a.fn,this),this.hooks.forEach(this.__execute,this),this.activeEgg="")},this))},Egg.prototype.Listen=function(){return void 0!==document.addEventListener&&(document.addEventListener("keydown",this,!1),document.addEventListener("keyup",this,!1)),this},Egg.prototype.listen=Egg.prototype.Listen,Egg.prototype.addCode=Egg.prototype.AddCode,Egg.prototype.addHook=Egg.prototype.AddHook;

var runEgg = function() {
	var egg = new Egg();
egg
  .addCode("up,up,down,down,left,right,left,right,b,a", function() {
    $('#addCollectionModal').modal()
  })
  .listen();
}


var init = function() {

	addCollection.addEventListener('click', action.addCollection );
	addIamge.addEventListener('click', action.addImage );
	deleteCollection.addEventListener('click', action.deleteCollection );

	setLayout();
	setCollections();

	runEgg();
};

init();
}());