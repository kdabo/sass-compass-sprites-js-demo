  function checkForm(form) {

    var re = /^[\w ]+$/;
    var re1 = /\S+@\S+\.\S+/;
    var re2 = /[0-9 ]+/;

    var validationResult = true;

    var e1 = document.getElementById('errorbox');
    var e2 = document.getElementById('successbox');
    var cb1 = document.getElementById('checkbox1');
    var cb2 = document.getElementById('checkbox2');
    var cb3 = document.getElementById('checkbox3');

    e2.innerHTML = "";
    e2.classList.add('hidden');


    if (form.name.value == "" || !(re.test(form.name.value))) {

      e1.innerHTML = "<span>error: </span>Please write your name!";
      e1.classList.remove('hidden');

      validationResult = false;

    } else if (form.email.value == "" || !(re1.test(form.email.value))) {

      e1.innerHTML = "<span>error: </span>Please write your email!";
      e1.classList.remove('hidden');

      validationResult = false;

    } else if (form.phoneNumber.value == "" || (!re2.test(form.phoneNumber.value))) {

      e1.innerHTML = "<span>error: </span>Please write your phone Number!";
      e1.classList.remove('hidden');

      validationResult = false;

    } else if (form["select-choice"].value === "choose an option") {

      e1.innerHTML = "<span>error: </span>Please select your country!";
      e1.classList.remove('hidden');

      validationResult = false;

    } else if (form.textarea.value === "") {

      e1.innerHTML = "<span>error: </span>Please tell us what you think!";
      e1.classList.remove('hidden');

      validationResult = false;

    } else if (form.textarea.value.length < 10) {

      e1.innerHTML = "<span>error: </span>Please write minimum 10 words!";
      e1.classList.remove('hidden');

      validationResult = false;

    //equivalent to cb1.checked !== undefined && cb1.checked !== null && cb1.checked !== "" && cb1.checked === true 
    } else if (!cb1.checked && !cb2.checked && !cb2.checked) {

      e1.innerHTML = "<span>error: </span>Please check one of the boxes!";
      e1.classList.remove('hidden');

      validationResult = false;

    } if (validationResult == true) {

      e1.innerHTML = "";
      e1.classList.add('hidden');

      e2.innerHTML = "<span></span>Your application was successful!";
      e2.classList.remove('hidden');

      //to stop the form to submit 
      validationResult = false;

    };

    return validationResult;
  };