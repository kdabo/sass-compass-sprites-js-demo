r(function(){
    console.log("r(function() --> ")
    console.log('DOM Ready!'); //TODO: write a comment explaining what each line means

    var e1 = document.getElementsByClassName('none')[0];
    var p1 = e1.parentNode;
    p1.removeChild(e1);
    p1.innerHTML = 
    '<legend>Which is better?</legend>'
    +'<label for="radio-choice-1"/>'
    +'<input type="radio" value="choice-1" name="radio-choice-2" id="radio-choice-1"><span>Mercedes</span>'
    +'<label for="radio-choice-2"/>'
    +'<input type="radio" value="choice-2"  name="radio-choice-2" id="radio-choice-2" checked><span>Audi</span>'


//    document.getElementsByClassName('btn')[0].innerHTML =''
    var b1 = document.getElementsByClassName('btn')[0];

    b1.innerHTML =''

    document.getElementsByTagName('legend')[0].innerHTML = 'PERSONAL DETAILS'

    document.getElementsByTagName('label')[3].innerHTML = 'WHERE ARE YOU FROM?'

    document.getElementsByTagName('legend')[1].innerHTML = 'WHICH IS BETTER?'

    document.getElementsByTagName('legend')[2].innerHTML = 'FEEDBACK'

    document.getElementsByTagName('h4')[0].innerHTML = 'HOW DOES OUR PRODUCT MAKE YOU FEEL?'
    console.log("r(function() <-- ")
});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}


// ------- //
// HELPERS //
// ------- //

NodeList.prototype.forEach = function (callback) {
  Array.prototype.forEach.call(this, callback);
}

//NodeList objects are collections of nodes returned by querySelector method(PROPERTIES
// length-the no of nodes in the node list. , the NodeList is a live collection, 
//which means that changes in the DOM are reflected in the collection
//the NodeList is a static collection, meaning any subsequent change in the DOM does not affect the content of the collection. 
//document.querySelectorAll returns a static NodeList.
//The forEach() method executes a provided function once per array element 
//--> Function to execute for each element, taking function as an argument

//NodeList are used very much like arrays and it's tempting to invoke Array.prototype methods on them, 
//however NodeList objects don't have any of the familiar Array methods.
//avaScript has an inheritance mechanism based on prototypes for both built–in objects (like Arrays) 
//and host objects (like NodeLists). Array instances inherit array methods (such as forEach or map) because their prototype chain looks like the following:

//myArray --> Array.prototype --> Object.prototype --> null (The prototype chain of an object can be obtained by calling Object.getPrototypeOf several times.)

//forEach, map and the likes are own properties of the Array.prototype object.

//Unlike arrays, NodeList prototype chain looks like the following:

//myNodeList --> NodeList.prototype --> Object.prototype --> null

//NodeList.prototype contains the item method, but none of the Array.prototype methods, so they cannot be used on NodeLists.

//Workarounds

//one idea would be to add Array.prototype methods to NodeList.prototype.

//var div_list = document.querySelectorAll('div'); // returns NodeList
//var div_array = Array.prototype.slice.call(div_list); // converts NodeList to Array

// -------------------- //
// Function definitions //
// -------------------- //

function deactivateSelect(select) {
  if (!select.classList.contains('active')) return;

  var optList = select.querySelector('.optList');

  optList.classList.add('hidden');
  select.classList.remove('active');
}

function actveSelect(select, selectList) {
  if (select.classList.contains('active')) return;

  selectList.forEach(deactivateSelect);
  select.classList.add('active');
};

function toggleOptList(select, show) {
  var optList = select.querySelector('.optList');

  optList.classList.toggle('hidden');
}

function highlightOption(select, option) {
  var optionList = select.querySelectorAll('.option');

  optionList.forEach(function (other) {
    other.classList.remove('highlight');
  });

  option.classList.add('highlight');
};

function updateValue(select, index) {
  var nativeWidget = select.previousElementSibling;
  var value = select.querySelector('.value');
  var optionList = select.querySelectorAll('.option');

  nativeWidget.selectedIndex = index;
  value.innerHTML = optionList[index].innerHTML;
  highlightOption(select, optionList[index]);
};

function getIndex(select) {
  var nativeWidget = select.previousElementSibling;

  return nativeWidget.selectedIndex;
};

// ------------- //
// Event binding //
// ------------- //

window.addEventListener("load", function () { // code executed each time a new page is loaded in browser/mail. 
  var form = document.querySelector('form');
 
  form.classList.remove("no-widget");
  form.classList.add("widget");

});

window.addEventListener('load', function () {
  var selectList = document.querySelectorAll('.select');

  selectList.forEach(function (select) {
    var optionList = select.querySelectorAll('.option');

    optionList.forEach(function (option) {
      option.addEventListener('mouseover', function () {
        highlightOption(select, option);
      });
    });

    select.addEventListener('click', function (event) {
      toggleOptList(select);
    });

    select.addEventListener('focus', function (event) {
      activeSelect(select, selectList);
    });

    select.addEventListener('blur', function (event) {
      deactivateSelect(select);
    });
  });
});

window.addEventListener('load', function () {
  var selectList = document.querySelectorAll('.select');

  selectList.forEach(function (select) {
    var optionList = select.querySelectorAll('.option'),
        selectedIndex = getIndex(select);

    select.tabIndex = 0;
    select.previousElementSibling.tabIndex = -1;

    updateValue(select, selectedIndex);

    optionList.forEach(function (option, index) {
      option.addEventListener('click', function (event) {
        updateValue(select, index);
      });
    });

    select.addEventListener('keyup', function (event) {
      var length = optionList.length,
          index  = getIndex(select);

      if (event.keyCode === 40 && index < length - 1) { index++; }
      if (event.keyCode === 38 && index > 0) { index--; }

      updateValue(select, index);
    });
  });
});