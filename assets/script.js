$(document).ready(function() {
    $('select').formSelect();
});

$(document).ready(function(){
  $('.modal').modal();
});

var filterArray=[];
var catsOrDogs;
var typeParameter;
var genderParameter;

fetch('https://dog-api.matthewswar.com/api/facts')
.then(response => response.json())
.then(data => {
    var petfacts1 = document.querySelector('.dog-facts')
    petfacts1.innerText = data.facts 
});

fetchCatFacts();

function fetchCatFacts() {
  fetch('https://cat-fact.herokuapp.com/facts')
  .then(response => response.json())
  .then(data => {
      console.log(data);
      var item = data[Math.floor(Math.random()*data.length)]
      if (item.text === "I don't know anything about cats.") {
        fetchCatFacts();
      } else {
        var petfacts2 = document.querySelector('.cat-facts')
        petfacts2.innerText = item.text
      }
  });
}

function fetchFunction() {
  getFields();
  if (typeParameter && $('#zip-code').val()) {
    $('.loading-screen').removeClass('hide');
    $('.row').addClass('hide');
    console.log(typeParameter && $('#zip-code').val());
    localStorage.clear();
    fetchData(filterArray)
    .then(function(response){
      setTimeout(()=>{
        window.location = "./pet-tential-results.html"
      }, 2500)      
    })
    } else {
      $('#warn-modal').modal('open');
      filterArray = [];
    }
  }

function fetchData (filters) {
  var apiUrl = "https://api.rescuegroups.org/v5/public/animals/search/available/?include=pictures,orgs";

  var body = JSON.stringify({
    "data": {
      "filterRadius": getLocation(),
      "filters": filters
    }
  });
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'D5eT1vpr',
      // Above: our API key
      },
      body: body
  })
      .then(function (response) {
        if (response.status > 399) {
          throw Error(response.status);
      }
          return response.json();
      })
      .then(function (data) {
          localStorage.setItem("petTentialPals", JSON.stringify(data));
        return data;
      }) .catch((error) => {
        openErrorModal();
        return error;
      })
}

function getFields() {
  typeParameter = $('#type-parameter').val();
  genderParameter = $('#gender-parameter').val();
  var breedParameter =$('#breed-parameter').val();
  var sizeParameter = $('#size-parameter').val();
  var ageParameter = $('#age-parameter').val();
  var coatParameter = $('#coat-parameter').val();

  // sets the filter criteria to cats, dogs, or both
  if (typeParameter == 1) {
    filterArray.push(addFilters('species.singular', 'equals', 'Cat'));
  } else if (typeParameter == 2) {
    filterArray.push(addFilters('species.singular', 'equals', 'Dog'))
  } else if (typeParameter == 3) {
    filterArray.push(addFilters('species.singular', 'equals',  ["Cat", "Dog"]))
  }

  // sets the criteria to male, female, or both
  if(genderParameter == 1) {
    filterArray.push(addFilters('animals.sex', 'equals', 'Male'));
  }else if(genderParameter == 2) {
    filterArray.push(addFilters('animals.sex', 'equals', 'Female'));
  }else if(genderParameter == 3) {
    filterArray.push(addFilters('animals.sex', 'equals', ["Male", "Female"]));
  }

  // checks if breedParameter is true and adds the value
  if(breedParameter){
    filterArray.push(addFilters('breeds.name', 'contains', breedParameter));
  }

  // adds checked sizes to filters
  if (sizeParameter == 1) {
    filterArray.push(addFilters('animals.sizeGroup', 'contains', 'small'));
  }  else if (sizeParameter == 2) {
    filterArray.push(addFilters('animals.sizeGroup', 'contains', 'medium'));
  }  else if (sizeParameter == 3) {
    filterArray.push(addFilters('animals.sizeGroup', 'contains', 'large'));
  } 

  // adds age groups to filters
  if (ageParameter == 1){
    filterArray.push(addFilters('animals.ageGroup', 'equals', 'Baby'));
  }else if (ageParameter == 2){
    filterArray.push(addFilters('animals.ageGroup', 'equals', 'Adult'));
  }else if (ageParameter == 3){
    filterArray.push(addFilters('animals.ageGroup', 'equals', 'Senior'));
  }

  // adds coat length to filters
  if (coatParameter == 1){
    filterArray.push(addFilters('animals.coatLength', 'contains', 'short'));
  }else if (coatParameter == 2){
    filterArray.push(addFilters('animals.coatLength', 'contains', 'medium'));
  }else if (coatParameter == 3){
    filterArray.push(addFilters('animals.coatLength', 'contains', 'long'));
  }

  // adds these parameters to filters
  if ($('#cat-friendly-parameter').is(":checked")){
    filterArray.push(addFilters('animals.isCatsOk', 'equals', 'true'));
  } if ($('#dog-friendly-parameter').is(":checked")){
    filterArray.push(addFilters('animals.isDogsOk', 'equals', 'true'));
  } if ($('#kid-friendly-parameter').is(":checked")){
    filterArray.push(addFilters('animals.isKidsOk', 'equals', 'true'));
  }if ($('#shots-parameter').is(":checked")){
    filterArray.push(addFilters('animals.isCurrentVaccinations', 'equals', 'true'));
  }
}

function getLocation() {
  var miles;
  const zip = $('#zip-code').val() || 98029;
  if ($('#25-miles').is(":checked")){
    miles = 25;
  }
  else if ($('#50-miles').is(":checked")){
    miles = 50;
  }
  else if ($('#100-miles').is(":checked")){
    miles = 100;
  }
  else if ($('#200-miles').is(":checked")){
    miles = 200;
  }
  return {'miles': miles,
  'postalcode' : zip
 }
}

function addFilters(fieldName, operation, criteria) {
    return {
      fieldName : fieldName,
      operation: operation,
      criteria: criteria
    };
}

function resetInputs () {
  console.log("reset pressed");
  // $('#type-parameter').attr("type", "reset");
  // $('#type-parameter').index(-1);
  // typeParameter = document.getElementById('type-parameter');
  // typeParameter.selectIndex = 0;
  $('#type-parameter').prop('selectedIndex', 0);
  $('#type-parameter').formSelect(); 
  $('#gender-parameter').prop('selectedIndex', 0);
  $('#gender-parameter').formSelect(); 
  $('#breed-parameter').val('');
  $('#size-parameter').prop('selectedIndex', 0);
  $('#size-parameter').formSelect(); 
  $('#age-parameter').prop('selectedIndex', 0);
  $('#age-parameter').formSelect(); 
  $('#coat-parameter').prop('selectedIndex', 0);
  $('#coat-parameter').formSelect(); 
  $('#zip-code').val('');
  $('#25-miles').prop("checked", true);
  $('#50-miles').prop("checked", false);
  $('#100-miles').prop("checked", false);
  $('#200-miles').prop("checked", false);
  $('input:checkbox').prop("checked", false);
  var kidCheckbox = $('#kid-friendly-parameter');
  kidCheckbox.removeAttr('checked');
  // $('#gender-parameter option').prop('selected', resetForm);
}

function resetForm () {
  return this.defaultSelected;
}


function openErrorModal() {
  var modal = $('.modal').modal();
  $('.loading-screen').addClass('hide');
  modal.modal('open');
}

document.querySelector('#restart-button').addEventListener('click',function() {
  //TODO Add restart function on click
  window.location = '../index.html'
  console.log('Restart Clicked!');
});

document.querySelector('#furiends-button').addEventListener('click',function() {
  console.log('Furiends List Clicked!');
});

document.querySelector('#fetch-button').addEventListener('click',function() {
  console.log('Fetch Button Clicked!');
  fetchFunction();
  // makes sure option was selected
});

$('#type-parameter').change(function () {
  if ($('#type-parameter').val() == 1) {
      $('#breed-parameter-header').addClass('hide');
      $('#breed-parameter').addClass('hide');
    }
    else {
      $('#breed-parameter-header').removeClass('hide');
      $('#breed-parameter').removeClass('hide');
    }
});

$('#reset-button').click(resetInputs);
$(document).ready(resetInputs());