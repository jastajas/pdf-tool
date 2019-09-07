var idSuplier = 1;

/**
 * @description Function
 * @param {event} ev event object
 */
function handlePatternInputFile(ev) {

    ev = ev || window.event;

    if (ev.target.value == "") {
        ev.target.parentNode.lastElementChild.textContent = "Select file...";
    } else if (!isPdfFile(ev.target)) {
        clearFileInput(ev.target.id);
        return alert("Wrong type file.");
    } else {
        addItemToTable("addPdfFileRow", "pdfFilesPaths", "pdfTableRow");
        updateTextContent(ev.target.parentNode.lastElementChild, ev.target.files[0].name);
    }
};

/**
 * @description Function change data in composed input file element and run others connected functions. It i.a. print input file name, load pages counter and others.
 * @param {string} idInputFileEl "Id" attribute value of input file element.
 */
function changeContentInputFile(idInputFileEl) {
    if (!idInputFileEl) throw new Error("No arguments provided!");

    var changedInput = document.getElementById(idInputFileEl);
    if (!changedInput) throw new Error("No element found!");

    if (changedInput.value == "") {
        changedInput.parentNode.nextElementSibling.firstElementChild.click();
    } else {
        updateTextContent(
            changedInput.parentNode.lastElementChild,
            changedInput.files[0].name)
    }
}

/**
 * @description Function adds new filled in row to table and cleans pattern row.
 * @param {number} idPatternRow Value of "id" attribute of new row element.
 * @param {String}  parameterName paramName Value of "name" attribute of input element.
 * @param {String} destinedRowClass Value of "class" attribute of new row element.
 */
function addItemToTable(idPatternRow, parameterName, destinedRowClass) {
    var patternRow = document.getElementById(idPatternRow);
    var newPatternRow = patternRow.cloneNode(true);

    adjustNewRow(patternRow, parameterName, destinedRowClass);

    patternRow.parentElement.appendChild(newPatternRow);
    newPatternRow.children[1].firstElementChild.value = "";

    prepareOrdinalsNo(destinedRowClass);

}

/**
 * @description Function adjusts cloned row i.a. by setting "name" attribute and adding remove button
 * @param {Element} clonedRow Element of cloned row.
 * @param {String} paramName Value of "name" attribute of input element.
 * @param {String} destinedRowClass Value of "class" attribute of new row element.
 */
function adjustNewRow(clonedRow, paramName, destinedRowClass) {

    clonedRow.removeAttribute("id");
    clonedRow.setAttribute("class", destinedRowClass);

    var newInputId = paramName + idSuplier;
    idSuplier++;

    setInputFileProperties(
        clonedRow.children[1].firstElementChild,
        paramName,
        newInputId,
        `changeContentInputFile('${newInputId}')`
    );
    clonedRow.children[1].children[1].removeAttribute("onclick");
    clonedRow.children[1].children[1].setAttribute(
        "onclick",
        `openFileInput('${newInputId}')`
    );

    clonedRow.lastElementChild.appendChild(
        createRemoveBtn(destinedRowClass, "docsTableMergePdfForm")
    );

}

/**
 * @description Validator for submitting merge pdf form. It checks if there are attached minimum two files.
 * @param {String} inputParameterName Value of "name" attribute of input element.
 * @returns {boolean}
 */
function validateMergeForm(inputParameterName) {

    if(!inputParameterName) return false;

    if (document.getElementsByName(inputParameterName).length < 2) {
        alert("Select minimum two files!");
        return false;
    }
}
