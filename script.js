'use strict';


// function OutputObj(firstName, lastName, streetAdress, streetAdress2,
//     city, state, postalCode, phone, email, hearSelect, feedback,
//     suggestions, yes, no, maybe, row1Name, row1Adress, row1Number,
//     row2Name, row2Adress, row2Number) {
//     this.firstName = firstName
//     this.lastName = lastName
//     this.streetAdress = streetAdress
//     this.streetAdress2 = streetAdress2
//     this.city = city
//     this.state = state
//     this.postalCode - postalCode
//     this.phone = phone
//     this.email = email
//     this.hearSelect = hearSelect
//     this.feedback = feedback
//     this.suggestions = suggestions
//     this.yes = yes
//     this.no = no
//     this.maybe = maybe
//     this.row1Name = row1Name
//     this.row1Adress = row1Adress
//     this.row1Number = row1Number
//     this.row2Name = row2Name
//     this.row2Adress = row2Adress
//     this.row2Number = row2Number
// }


// function selectTogle() {
//     const list = document.getElementsByName('hearSelect');
//     const selection = list[0].options[list[0].selectedIndex].outerText
//     console.log(selection)
//     if (selection == 'Other') {
//         const othersField = document.getElementsByClassName('hear-other')
//         othersField.style.display = 'block';
//     }
// }


// addEventListener('submit', (e) => {
//     e.preventDefault();

//     const firstName = e.target.firstName.valueaddEventListener
//     const city = e.target.city.value
//     const state = e.target.state.value
//     const postalCode = e.target.postalCode.value
//     const phone = e.target.phone.value
//     const email = e.target.email.value
//     const hearSelect = e.target.hearSelect.value
//     const feedback = e.target.feedback.value
//     const suggestions = e.target.suggestions.value
//     const yes = e.target.yes.checked
//     const no = e.target.no.checked
//     const maybe = e.target.maybe.checked
//     const row1Name = e.target.row1Name.value
//     const row1Adress = e.target.row1Adress.value
//     const row1Number = e.target.row1Number.value
//     const row2Name = e.target.row2Name.value
//     const row2Adress = e.target.row2Adress.value
//     const row2Number = e.target.row2Number.value

//     console.log('submited')

//     const result = new OutputObj(firstName, lastName, streetAdress, streetAdress2,
//         city, state, postalCode, phone, email, hearSelect, feedback,
//         suggestions, yes, no, maybe, row1Name, row1Adress, row1Number,
//         row2Name, row2Adress, row2Number)
//     console.log(result)
// });


document.addEventListener('DOMContentLoaded', () => {
    const myData = {};
    let reference1 = {}
    let reference2 = {}

    const submitForm = document.querySelector('.details-form');

    // collect form data
    function getData() {

        // get text data
        const textInputs = document.querySelectorAll('.field');
        for (let i = 0; i < textInputs.length; i++) {
            const key = textInputs[i].dataset.name;
            myData[key] = textInputs[i].value;

            // // empty required text inputs
            // if (textInputs[i].className.includes('required') && !myData[key]) {
            //     const sectionName = textInputs[i].dataset.section;
            //     const sectionEle = document.querySelector(`.${sectionName}`);
            //     sectionEle.classList.add('section-error');
            // }
        }

        // get references data
        const refData = [];
        const refRows = document.querySelectorAll('.ref-row');
        for (let i = 0; i < refRows.length; i++) {
            const rowInputs = refRows[i].querySelectorAll('.table-input');
            let rowValues = {};
            for (let j = 0; j < rowInputs.length; j++) {
                const key = rowInputs[j].dataset.name;
                rowValues[key] = rowInputs[j].value;
            }
            refData.push(rowValues);
            rowValues = {};
        }
        myData.references = refData;

        // get radio data
        const radioInputs = document.querySelectorAll('.radio');
        for (let i = 0; i < radioInputs.length; i++) {
            let dataAttr = radioInputs[i].dataset.name
            let value = radioInputs[i].checked
            myData[dataAttr] = value
        }

        console.log(myData)
    };

    const hearSelectElement = document.querySelector('.hearSelect');
    hearSelectElement.addEventListener('change', (e) => {
        if (e.target.value === 'other') {
            const hearElement = document.createElement('div');
            hearElement.classList.add('hear-other');
            hearElement.classList.add('field-lable');
            hearElement.innerHTML = `<input type="text" placeholder="how did you hear about us?" data-name="hearOther" class="field hear-new required" data-section="hear-other" >`
            const newFieldParent = document.querySelector('.new-field-parent')
            newFieldParent.insertAdjacentElement('afterend', hearElement);
        } else {
            if (document.querySelector('.hear-other')) {
                document.querySelector('.hear-other').remove();
            }
        }
    })

    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        getData();
    });
});