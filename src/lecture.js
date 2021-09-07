
const state = {
    people: [],
    formValues: {
        inputNameValue: "",
        inputBirthDateValue: ""
    }    
}

const createPerson = ({inputNameValue, inputBirthDateValue}) => {
    return {
        name: inputNameValue,
        birthDate: new Date(inputBirthDateValue),
        getAge(){
            return new Date().getUTCFullYear() - this.birthDate.getUTCFullYear();
        }
    }
}

const handleFormSubmit = event => {
    event.preventDefault();
    const person = createPerson(state.formValues);
    state.people = [...state.people, person];
    document.getElementById("name").value = "";
    document.getElementById("birthDate").value = "";
    renderPeople(state);    
}

const handleNameChange = event => state.formValues.inputNameValue = event.target.value;
const handleBirthDateChange = event => state.formValues.inputBirthDateValue = event.target.value;

document.getElementById("myForm").addEventListener("submit", handleFormSubmit);
document.getElementById("name").addEventListener("change", handleNameChange);
document.getElementById("birthDate").addEventListener("change", handleBirthDateChange);


const createElement = (type, ...classes) =>{
    const element = document.createElement(type);
    if(classes.length > 0){
        element.classList.add(classes.join(' '));
    }
    
    return element;
}

const renderPeople = ({people}) =>{
    const container = document.getElementById("people");
    container.innerHTML = "";
    
    
    if(people.length > 0){
        const table = createElement("table", "table");        
        const thead = createElement("thead");        
        const tr = createElement("tr")
        const th = document.createElement("th");
        th.scope = "col";
        th.innerHTML = "Name";

        const th2 = document.createElement("th");
        th2.scope = "col";
        th2.innerHTML = "Birth Date";

        const th3 = document.createElement("th");
        th3.scope = "col";
        th3.innerHTML = "Age";        
        tr.appendChild(th);
        tr.appendChild(th2);
        tr.appendChild(th3);        
        thead.appendChild(tr);
        
        
        const tbody = document.createElement("tbody");
        const trs = people.map(person => {
            const row = `<tr><td>${person.name}</td><td>${person.birthDate}</td><td>${person.getAge()}</td></tr>`
            return row;
        })
        tbody.innerHTML = trs.join('');

        table.appendChild(thead);
        table.appendChild(tbody); 
        
        container.appendChild(table);

    }else{
        const paragraph = `<p class="text-center">Please add some people</p>`;
        container.innerHTML = paragraph;
    }


}

renderPeople(state);

