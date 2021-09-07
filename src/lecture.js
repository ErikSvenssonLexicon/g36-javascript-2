const state = {
  people: [],
  formValues: {
    inputNameValue: "",
    inputBirthDateValue: "",
  },
};

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

const handleNameChange = (event) =>
  (state.formValues.inputNameValue = event.target.value);
const handleBirthDateChange = (event) =>
  (state.formValues.inputBirthDateValue = event.target.value);

const handleRemove = element => {
    state.people = state.people.filter(person => person.id !== element.id);
    renderPeople(state);
}

document.getElementById("myForm").addEventListener("submit", handleFormSubmit);
document.getElementById("name").addEventListener("change", handleNameChange);
document.getElementById("birthDate").addEventListener("change", handleBirthDateChange);

const createElement = (type, ...classes) => {
  const element = document.createElement(type);
  if (classes.length > 0) {
      for(css of classes){
          element.classList.add(css);
      } 
  }

  return element;
};

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

renderPeople(state);