var resultContainer = document.getElementById("results")
var adoptionURL = "";

//TODO: Once the local storage is set, enable this to populate the page
function populatePage()
{
  var savedAnimalData = JSON.parse(localStorage.getItem('pettentials'));
 
  console.log(savedAnimalData)
  // for (var i = 0; i < 50; i++)
  // {
  for (var i = 0; i < savedAnimalData.length; i++)
  {
     var org = JSON.parse(localStorage.getItem("orgs"));

       var newRow = document.createElement('row');
       var newCol = document.createElement('col');
       var newCard = document.createElement("div");
       var resultPetList = document.createElement('ul');
       var resultPetImage = document.createElement('img');
       var resultPetName = document.createElement('p');
       var resultPetNameTitle = document.createElement('p');
       var resultPetAge = document.createElement('p');
       var resultPetBreed = document.createElement('p');
       var resultPetCoatLength = document.createElement('p');
       var buttonCard = document.createElement('div');
       var adoptButton = document.createElement('btn');
       var removeButton = document.createElement('btn');

     // var urlFilter = .filter(function(url){
     //      return url;
     // });
     // console.log(urlFilter);


      resultPetName.className += " class-content pet-card-body-text";
      resultPetNameTitle.className += " class-content pet-card-title-text";
      resultPetAge.className += " class-content pet-card-body-text";
      resultPetBreed.className += " class-content pet-card-body-text";
      resultPetCoatLength.className += " class-content pet-card-body-text";


     console.log(org);

     //Getting Org ID unique URLs
      var orgID = savedAnimalData[i].relationships.orgs.data[0].id;
      console.log(orgID);

      if(orgID == org[0].id)
      {
          adoptionURL = org[0].attributes.url;
          console.log(adoptionURL);
      }

 // TODO: Need to find other attributes to populate the remaining sections
 // Adding the text content from the collected results so they can be later appended to the results html page
      resultPetName.innerHTML = "<b>Name: </b>" + savedAnimalData[i].attributes.name;
       resultPetBreed.innerHTML = "<b>Breed: </b>" + savedAnimalData[i].attributes.breedPrimary;
       resultPetAge.innerHTML = "<b>Age: </b>" + savedAnimalData[i].attributes.ageGroup;
       resultPetCoatLength.innerHTML = "<b>Coat Length: </b>" + savedAnimalData[i].attributes.coatLength;
       adoptButton.innerHTML = "Adopt Me";
     //   removeButton.innerHTML = "Remove";

     //Pulling the image and resizing them for each pet
       resultPetImage.src = savedAnimalData[i].pictureURL;
       resultPetImage.width = "300";
       resultPetImage.height = "300";
       resultPetImage.className = "pet-image z-depth-2"

 // Append section that will attach the above text content and apply it to the resultContainer on the results html page
       newCard.className="card furiends-cards";
       newCard.id = "card";

       buttonCard.className="card button-card"
       //add + i to newcard.id when for loop happens

       adoptButton.className="btn modal-trigger adopt-button waves-effect waves-light";
     //  removeButton.className="btn remove-button waves-effect red waves-red";

       resultContainer.append(newCard);
       newCard.append(resultPetImage);
       newCard.append(resultPetList);
       resultPetList.append(resultPetName);
       resultPetList.append(resultPetBreed);
       resultPetList.append(resultPetAge);
       resultPetList.append(resultPetCoatLength);
       resultPetList.append(buttonCard);
       buttonCard.append(adoptButton);
     //   buttonCard.append(removeButton);

     //TODO: Add modal for adoption popup
     adoptButton.addEventListener("click", adoptLink);

     function adoptLink()
     {
          window.open(org[0].attributes.url, "_blank");

     }

  }
}


populatePage();




