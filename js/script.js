r(function() {
  console.log("r(function() --> ")
  console.log('DOM Ready!'); //TODO: write a comment explaining what each line means

  var e1 = document.getElementsByClassName('none')[0];
  var p1 = e1.parentNode;
  p1.removeChild(e1);
  p1.innerHTML =
    '<legend>Which is better?</legend>' + '<label for="radio-choice-1"/>' + '<input type="radio" value="choice-1" name="radio-choice-2" id="radio-choice-1"><span>Mercedes</span>' + '<label for="radio-choice-2"/>' + '<input type="radio" value="choice-2"  name="radio-choice-2" id="radio-choice-2" checked><span>Audi</span>'


  //    document.getElementsByClassName('btn')[0].innerHTML =''
  var b1 = document.getElementsByClassName('btn')[0];

  b1.innerHTML = '';

  document.getElementsByTagName('legend')[0].innerHTML = 'PERSONAL DETAILS';

  document.getElementsByTagName('label')[3].innerHTML = 'WHERE ARE YOU FROM?';

  document.getElementsByTagName('legend')[1].innerHTML = 'WHICH IS BETTER?';

  document.getElementsByTagName('legend')[2].innerHTML = 'FEEDBACK';

  document.getElementsByTagName('h4')[0].innerHTML = 'HOW DOES OUR PRODUCT MAKE YOU FEEL?';
  console.log("r(function() <-- ");


  // xmlhtttprequest 
  // get json with countries list
  // iterare over countries list
  // create html to display
  // change the original html to use this one

  var req = new XMLHttpRequest();
  req.open('GET', '/json/countryinfojson', false);
  req.send(null);
  if (req.status == 200)
    console.log(req.responseText);

  var f1 = "<option value='choose an option'>Choose an option</option>"

  var selectHtml = f1;
  var listHtml = '';

  var js = JSON.parse(req.responseText);

  for (var i = 0; i < js.geonames.length - 1; i++) {
    var country = js.geonames[i];
    // console.log(country.countryName);
    var fn = "<option value='" + country.countryName + "'>" + country.countryName + "</option>"
    selectHtml = selectHtml + fn;
  }

  var select = document.getElementById('select-choice');
  select.innerHTML = selectHtml;
  var selectList = document.querySelectorAll('.select');

  for (var j = 0; j < js.geonames.length - 1; j++) {
    var c = js.geonames[j];
    var fn1 = "<li class='option'>" + c.countryName + "</li>"
    listHtml = listHtml + fn1;
  }

  var selectList = document.getElementById('optListid');

  selectList.innerHTML =

    "<span class='value'>Choose an option</span><ul class='optList hidden'>" +
    listHtml + "</ul>"


  var selectList = document.querySelectorAll('.select');

  select.addEventListener('click', function(event) {
    toggleOptList(select);
  });

  var optionList = document.querySelectorAll('.option');

  optionList.forEach(function(option) {
    option.addEventListener('mouseover', function() {
      highlightOption(option);
    });
    option.addEventListener('focus', function(event) {
      activeSelect(select, option);
    });

  });

  selectList.forEach(function(select) {
    var optionList = select.querySelectorAll('.option'),
      selectedIndex = getIndex(select);

    select.tabIndex = 0;
    select.previousElementSibling.tabIndex = -1;

    updateValue(select, selectedIndex);

    optionList.forEach(function(option, index) {
      option.addEventListener('click', function(event) {
        updateValue(select, index);
      });

    });
    select.addEventListener('keyup', function(event) {
      var length = optionList.length,
        index = getIndex(select);

      if (event.keyCode === 40 && index < length - 1) {
        index++;
      }
      if (event.keyCode === 38 && index > 0) {
        index--;
      }
      updateValue(select, index);
    });
  });

});

function r(f) {
  /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f()
}


// ------- //
// HELPERS //
// ------- //

NodeList.prototype.forEach = function(callback) {
  Array.prototype.forEach.call(this, callback);
}

// -------------------- //
// Function definitions //
// -------------------- //


function deactivateSelect(select) {
  if (!select.classList.contains('active')) return;

  var optList = select.querySelector('.optList');

  optList.classList.add('hidden');
  select.classList.remove('active');
}

function activeSelect(select, selectList) {
  if (select.classList.contains('active')) return;

  selectList.forEach(deactivateSelect);
  select.classList.add('active');
};

function toggleOptList(select, show) {
  var optList = select.querySelector('.optList');

  optList.classList.toggle('hidden');
}

function highlightOption(option) {
  var optionList = document.querySelectorAll('.option');

  optionList.forEach(function(other) {
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

window.addEventListener("load", function() { // code executed each time a new page is loaded in browser/mail. 
  var form = document.querySelector('form');

  form.classList.remove("no-widget");
  form.classList.add("widget");

});

window.addEventListener('load', function load0() {
  var selectList = document.querySelectorAll('.select');

  selectList.forEach(function(select) {
    var optionList = select.querySelectorAll('.option');

    optionList.forEach(function(option) {
      option.addEventListener('mouseover', function() {
        highlightOption(select, option);
      });
    });

    select.addEventListener('click', function(event) {
      toggleOptList(select);
    });

    select.addEventListener('focus', function(event) {
      activeSelect(select, selectList);
    });

    select.addEventListener('blur', function(event) {
      deactivateSelect(select);
    });
  });
});
