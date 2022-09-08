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
    const submitForm = document.querySelector('.details-form');

    // collect form data
    function getData() {

        // get text data
        const textInputs = document.querySelectorAll('.field');
        for (let i = 0; i < textInputs.length; i++) {
            const key = textInputs[i].dataset.name;
            // hearOther is handeled in "get (how did you hear about us) selection" below
            if (key != 'hearOther') {
                myData[key] = textInputs[i].value;
            }
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

        // get (how did you hear about us) selection
        const selectionList = document.querySelectorAll('.hearSelect')[0]
        const selection = selectionList.options[selectionList.selectedIndex].value
        myData.hearAboutUs = selection
        if (selection == 'other') {
            const other = document.querySelector('.hear-new').value
            myData.hearAboutUs = other
        }


        console.log(myData)
    };

    // create new field
    const hearSelectElement = document.querySelector('.hearSelect');
    hearSelectElement.addEventListener('change', (e) => {
        if (e.target.value === 'other') {
            const hearElement = document.createElement('div');
            hearElement.classList.add('hear-other');
            hearElement.classList.add('field-lable');
            hearElement.innerHTML = `<input type="text" placeholder="how did you hear about us?" data-name="hearOther" class="field hear-new required" data-section="hear" >`
            const newFieldParent = document.querySelector('.new-field-parent')
            newFieldParent.insertAdjacentElement('afterend', hearElement);
        } else {
            if (document.querySelector('.hear-other')) {
                document.querySelector('.hear-other').remove();
            }
        }
    })


    function validateData() {
        let fieldValue = {}
        const textInputs = document.querySelectorAll('.field');
        for (let i = 0; i < textInputs.length; i++) {
            const key = textInputs[i].dataset.name;
            fieldValue[key] = textInputs[i].value;
            const sectionName = textInputs[i].dataset.section;
            const sectionEle = document.querySelector(`.${sectionName}`);

            // validate empty required text inputs
            if (textInputs[i].className.includes('required') && !fieldValue[key]) {
                sectionEle.classList.add('section-error');
            }
            if (textInputs[i].className.includes('required') && fieldValue[key]) {
                sectionEle.classList.remove('section-error');
            }

            // validate full name
            if (key == 'firstName' || key == 'lastName') {
                var regex = /^[a-zA-Z]{2,30}$/;
                if (key == 'firstName') {
                    var fName = fieldValue[key].match(regex)
                }
                else var lName = fieldValue[key].match(regex)

                if (!(fName && lName)) {
                    sectionEle.classList.add('section-error');
                    sectionEle.classList.add('name-error')
                }
                else if ((fName && lName)) {
                    sectionEle.classList.remove('section-error');
                    sectionEle.classList.remove('name-error')
                }
            }


            // validate phone number
            if (key == 'phone') {
                var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (!(fieldValue[key].match(phoneno))) {
                    sectionEle.classList.add('section-error');
                    sectionEle.classList.add('phone-error')
                }
                else {
                    sectionEle.classList.remove('section-error');
                    sectionEle.classList.remove('phone-error')
                }
            }

            // validate email
            if (key == 'email') {
                if (fieldValue[key]) {
                    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!(fieldValue[key].match(regex))) {
                        // console.log(sectionEle)
                        sectionEle.classList.add('section-error');
                        sectionEle.classList.add('email-error')
                    }
                    else {
                        sectionEle.classList.remove('section-error');
                        sectionEle.classList.remove('email-error')
                    }
                }
            }
        }

        // validate (how did you hear about us) selection
        const selectionList = document.querySelectorAll('.hearSelect')[0]
        const selection = selectionList.options[selectionList.selectedIndex].value
        const sectionName = selectionList.dataset.section;
        var sectionEle = document.querySelector(`.${sectionName}`);
        if (selection == 'none') {
            sectionEle.classList.add('section-error')
        }
        else sectionEle.classList.remove('section-error')

        if (selection == 'other') {
            const other = document.querySelector('.hear-new').value
            if (!other) {
                const sectionEle = document.querySelector('.hear');
                sectionEle.classList.add('section-error')
            }
            else sectionEle.classList.remove('section-error')
        }

        //validate radio
        sectionEle = document.querySelector('.radio');
        if (!(myData.yes || myData.no || myData.maybe)) {
            sectionEle.classList.add('section-error')
        }
        else sectionEle.classList.remove('section-error')
    }

    // scroll to the first section with error
    function scrollToEroor() {
        const errorList = document.querySelectorAll('.section-error')
        if (errorList.length != 0) {
            errorList[0].scrollIntoView()
        }
    }


    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        getData();
        // validateData()
        scrollToEroor()

        const errorList = document.querySelectorAll('.section-error')
        if (errorList.length == 0) {
            // model box to alert thank you
            var modal = document.querySelector('.model-box');
            modal.showModal();

            // close
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.close();
                }
            }

            // reset fields
            const submitForm = document.querySelector('.details-form');
            submitForm.reset();
        }
    });
});