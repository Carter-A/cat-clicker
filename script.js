var model = {
  // object literal that stores the info about each cat
  currentCat: null,
  cats: [
    {
      clickCount: 0,
      name: 'Tabby',
      imgSrc: 'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg',
      imgAttribution: '#'
    },
    {
      clickCount:0,
      name: 'Jonny',
      imgSrc: 'http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg'
    }
  ]
};

var octopus = {
  // octopus communicates between the model and views
  init: function() {
    // init function that is called once on itinital load
    model.currentCat = model.cats[0];

    catListView.init();
    catView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function(){
    return model.cats;
  },

  setCurrentCat: function(cat){
    model.currentCat = cat;
  },

  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  },

  showAdmin: function() {
    model.currentCat.admin = true;
  }
};

var catView = {
  init: function(){
    // stores the required elements once so it is easier to reference
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    // listen for a click on the image then call the octopus method of incrementCounter. Also uses previously set variable of catImageElem instead of parsing dom
    this.catImageElem.addEventListener('click', function(){
      octopus.incrementCounter();
    });

    //updates the view with the new information from the click. ie the new count number
    this.render();
  },

  render: function(){
    // the render function used to update the dom
    // find the current cat from the octopus function getCurrentCat
    var currentCat = octopus.getCurrentCat();
    //add the content from the currentCat's Click Counter into the dom
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }
};

var catListView = {
  init: function(){
    this.catListElem = document.getElementById('cat-list');

    this.render();
  },

  render: function(){
    var cat, elem, i;
    var cats = octopus.getCats();

    //empties cat list
    this.catListElem.innerHTML = '';

    //loop over the cats
    for (i = 0; i < cats.length; i++) {
      // save the current cat we are using at variable cat
      cat = cats[i]

      //create a li element for each cat. then add the name as the content
      elem = document.createElement('li');
      elem.textContent = cat.name;

      //Listen for a click then change the current cat to the cat clicked and rerender the view
      // closure in a loop IFFE
      elem.addEventListener('click', (function(catCopy){
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
        };
      })(cat));


      this.catListElem.appendChild(elem);
    }

  }
};

//Make it go
octopus.init();
