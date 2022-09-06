'use strict';

// const firstName = document.getElementsByName("first-name");
// const lastName = document.getElementsByName("last-name");
// const streetAdress = document.getElementsByName("street-adress");
// const streetAdress2 = document.getElementsByName("street-adress2");
// const city = document.getElementsByName("city");
// const state = document.getElementsByName("state");
// const postalCode = document.getElementsByName("postal-code");
// const phone = document.getElementsByName("phone");
// const email = document.getElementsByName("email");
// const hearSelect = document.getElementsByName("hear-select");
// const hearOther = document.getElementsByName("hear-other");
// const feedback = document.getElementsByName("feedback");
// const suggestions = document.getElementsByName("suggestions");
// const yes = document.getElementsByName("yes");
// const no = document.getElementsByName("no");
// const maybe = document.getElementsByName("maybe");
// const row1Name = document.getElementsByName("row1-name");
// const row1Adress = document.getElementsByName("row1-adress");
// const row1Number = document.getElementsByName("row1-number");
// const row2Name = document.getElementsByName("row2-name");
// const row2Adress = document.getElementsByName("row2-adress");
// const row2Number = document.getElementsByName("row2-number");

function OutputObj(firstName, lastName, streetAdress, streetAdress2,
    city, state, postalCode, phone, email, hearSelect, feedback,
    suggestions, yes, no, maybe, row1Name, row1Adress, row1Number,
    row2Name, row2Adress, row2Number) {
    this.firstName = firstName
    this.lastName = lastName
    this.streetAdress = streetAdress
    this.streetAdress2 = streetAdress2
    this.city = city
    this.state = state
    this.postalCode - postalCode
    this.phone = phone
    this.email = email
    this.hearSelect = hearSelect
    this.feedback = feedback
    this.suggestions = suggestions
    this.yes = yes
    this.no = no
    this.maybe = maybe
    this.row1Name = row1Name
    this.row1Adress = row1Adress
    this.row1Number = row1Number
    this.row2Name = row2Name
    this.row2Adress = row2Adress
    this.row2Number = row2Number
}

// addEventListener('select', (e) => {

//     const log = document.getElementByName('hearSelect');
//     const selection = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd);
//     console.log(selection)

// })

function selectTogle() {
    const list = document.getElementsByName('hearSelect');
    const selection = list[0].options[list[0].selectedIndex].outerText
    console.log(selection)
    if (selection == 'Other') {
        const othersField = document.getElementsByClassName('hear-other')
        othersField.style.display = 'block';
    }
}


addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value
    const lastName = e.target.lastName.value
    const streetAdress = e.target.streetAdress.value
    const streetAdress2 = e.target.streetAdress2.value
    const city = e.target.city.value
    const state = e.target.state.value
    const postalCode = e.target.postalCode.value
    const phone = e.target.phone.value
    const email = e.target.email.value
    const hearSelect = e.target.hearSelect.value
    const feedback = e.target.feedback.value
    const suggestions = e.target.suggestions.value
    const yes = e.target.yes.checked
    const no = e.target.no.checked
    const maybe = e.target.maybe.checked
    const row1Name = e.target.row1Name.value
    const row1Adress = e.target.row1Adress.value
    const row1Number = e.target.row1Number.value
    const row2Name = e.target.row2Name.value
    const row2Adress = e.target.row2Adress.value
    const row2Number = e.target.row2Number.value

    console.log('submited')

    const result = new OutputObj(firstName, lastName, streetAdress, streetAdress2,
        city, state, postalCode, phone, email, hearSelect, feedback,
        suggestions, yes, no, maybe, row1Name, row1Adress, row1Number,
        row2Name, row2Adress, row2Number)
    console.log(result)
});