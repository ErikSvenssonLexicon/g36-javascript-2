//OBJECTS
//This represents the state of the application
const state = {
  people: [],
  formValues: {
    inputNameValue: "",
    inputBirthDateValue: "",
  },
};

//Using object destructuring to pull out fields from state.formValues
const createPerson = ({ inputNameValue, inputBirthDateValue }) => {
  return {
    id: `${Math.floor(Math.random() * 1000000)}`,
    name: inputNameValue,
    birthDate: inputBirthDateValue,
    getAge() {
      return (
        new Date().getUTCFullYear() - new Date(this.birthDate).getUTCFullYear()
      );
    },
  };
};

//------------------------
//EVENT HANDLER FUNCTIONS:

//Callback function called from event listener when form is submitted. 
const handleFormSubmit = (event) => {
  //Preventing default submit event from refreshing the page
  event.preventDefault();

  const person = createPerson(state.formValues);
  state.people = [...state.people, person];

  //Cleaning up
  document.getElementById("name").value = "";
  document.getElementById("birthDate").value = "";
  state.formValues.inputBirthDateValue = "";
  state.formValues.inputNameValue = "";

  //Calling render after adding to array
  renderPeople(state);
};

//Callback function called from event listener when name input changes in html
const handleNameChange = event => state.formValues.inputNameValue = event.target.value;

//Callback function  called from event listener when birthDate input changes in html
const handleBirthDateChange = event => state.formValues.inputBirthDateValue = event.target.value;

//Function called directly from html whenever user clicks table row.
const handleRemove = element => {
    state.people = state.people.filter(person => person.id !== element.id);
    renderPeople(state);
}
//----------------
//EVENT LISTENERS:

//Listens to event 'submit' on form with id 'myForm'
document.getElementById("myForm").addEventListener("submit", handleFormSubmit);
//Listens to event 'change' on input field with id 'name'
document.getElementById("name").addEventListener("change", handleNameChange);
//Listens to event 'change' on input field with id 'bithDate'
document.getElementById("birthDate").addEventListener("change", handleBirthDateChange);

//----------------

//Factory method returning element where type = html element and ...classes a vararg with all css classes
const createElement = (type, ...classes) => {
  const element = document.createElement(type);
  if (classes.length > 0) {
      //Equivalent to for(String css : classes) 
      for(const css of classes){
          element.classList.add(css);
      } 
  }

  return element;
};

//RENDER FUNCTION(S):
//This function gets called whenever a (re)render of the people table is needed
const renderPeople = ({ people }) => {
  const container = document.getElementById("people");
  container.innerHTML = "";

  if (people.length > 0) {
    const table = createElement("table", "table", "table-hover");
    const thead = createElement("thead");
    
    const tHeadRow = 
        `<tr>
            <th scope="col">Name</th> 
            <th scope="col">Birth Date</th> 
            <th scope="col">Age</th> 
        </tr>`;

    thead.innerHTML = tHeadRow;

    const tbody = document.createElement("tbody");
    const trs = people.map((person) => {
      const row = `<tr onclick="handleRemove(this)" id=${person.id}>
        <td>${person.name}</td>
        <td>${person.birthDate}</td>
        <td>${person.getAge()}</td>
      </tr>`;
      return row;
    });
    tbody.innerHTML = trs.join("");

    table.appendChild(thead);
    table.appendChild(tbody);

    container.appendChild(table);
  } else {
    const paragraph = `<p class="text-center">Please add some people</p>`;
    container.innerHTML = paragraph;
  }
};

//-----------------
//Called directly when opening the page to render the initial state
renderPeople(state);