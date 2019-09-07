/**
 * @file Various tool functions.
 * @author <a href="mailto:jastajas@gmail.com">Jack</a>
 * @version 1.1.5
 */

/**
 * @description Function set current available pages number in counter section.
 */
function updatePageCounter() {
    updateTextContent(
        document.getElementById("pagesCounter").lastElementChild,
        allPdfpages - sumAllIputs("sectionSize")
    );
}

/**
 * Function adds row with filled in input field.
 * @param idPatternRow "id" attribute value of pattern row of "section sizes" table
 * @param parameterName "name" attribute value of number input field for section size
 * @param destinedRowClass
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
 * @description Function adjust input element attributes.
 * @param {Element} clonedRow Reference to row element which has to be adjust.
 * @param {string} paramName "Name" attribute value of input element.
 * @param {string} destinedRowClass "class" attribute value of row element.
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
        `updateInputContent('${newInputId}')`
    );

    clonedRow.lastElementChild.replaceChild(
        createRemoveBtn(destinedRowClass, "sectionsPdfTable", updatePageCounter),document.getElementById("addSectionButton")
    );
}

/**
 *
 * @param responseObject
 */
function updateDocPdfPagesNo(responseObject) {
    allPdfpages = responseObject;
    updateTextContent(
        document.getElementById("pagesCounter").lastElementChild,
        responseObject
    );
}


/**
 * @description Function change data in composed input file element and run others connected functions. It i.a. print input file name, load pages counter and others.
 * @param {string} idInputFileEl "Id" attribute value of input file element.
 */
function changeContentInputFile(ev) {
    ev = ev || window.event;

    if (!ev) throw new Error("No arguments provided!");

    const changedInput = ev.target;
    if (!changedInput) throw new Error("No element found!");

    resetElementList("sectionSizeRow");
    allPdfpages = 0;
    updateTextContent(document.getElementById("pagesCounter").lastElementChild, allPdfpages.toString());


    if (changedInput.value == "") {
        changedInput.parentNode.lastElementChild.textContent = "Select file...";
    } else if (isPdfFile(changedInput)) {
        showHideElement(document.getElementById("waitingDiv"), true);
        setPagesNo(changedInput.files[0]);
        updateTextContent(changedInput.parentNode.lastElementChild, changedInput.files[0].name);
    } else {
        clearFileInput(idInputFileEl);
        alert("Incorrect file extension.")
    }
}

function setPagesNo(file) {
    const formData = new FormData();
    formData.append('sourcePdfFile', file);

    getDataFromServer("post", "http://localhost:8080/api/getPagesNumber", updateDocPdfPagesNo, formData);
}


/**
 * @description
 * @param idInputElement
 * @throws
 * @throws
 */
function updateInputContent(idInputElement) {
    if (!idInputElement) throw new Error("No arguments provided!");

    var changedInput = document.getElementById(idInputElement);
    if (!changedInput) throw new Error("No element found!");

    if (!isContentNoInputCorrect(changedInput.id) || !isBelowEqualLeftPagesNo(0) || !isInteger(changedInput)) {
        changedInput.parentNode.nextElementSibling.firstElementChild.click();
    }
    var restPages = allPdfpages - sumAllIputs("sectionSize");
    updateTextContent(document.getElementById("pagesCounter").lastElementChild, restPages.toString());
}

/**
 * @description
 */
function clearSplitPdfForm() {
    resetElementList("sectionSizeRow");
    clearFileInput("patternInputFile");
    allPdfpages = 0;
    updateTextContent(document.getElementById("pagesCounter").lastElementChild, allPdfpages.toString());
}

/**
 *
 */
function patternInputEvent() {

    const inputSectionElement = document.getElementById("addSectionSizeInput");

    if (!isContentNoInputCorrect(inputSectionElement.id)) {
        alert("Incorrect value. Value should be number and over 0 value.");
    } else if (!isBelowEqualLeftPagesNo(inputSectionElement.value)) {
        alert("Incorrect number value. Value should be over 0 value and below number of left pages.");
    } else if(!isInteger(inputSectionElement)){
        alert("Incorrect type value. Value should be integer.");
    } else {
        addItemToTable("addSectionSizeRow", "sectionSize", "sectionSizeRow");

        var restPages = allPdfpages - sumAllIputs("sectionSize");
        updateTextContent(document.getElementById("pagesCounter").lastElementChild, restPages.toString());

    }
}


/*Input [type="number"] value validator. Check if value is number type and if is over 0 value. Argument is id html element: <input type="number"/>*/
function isContentNoInputCorrect(idInputFileEl) {
    if (!idInputFileEl) throw new Error("No arguments provided!");

    var changedInput = document.getElementById(idInputFileEl);

    if (!changedInput) throw new Error("No element found!");

    return true && changedInput.value && Number(changedInput.value) > 0;
}

/*Function checks if adding new value to section list give sum over than all document pages. Argument is new added numeric value.*/
function isBelowEqualLeftPagesNo(newValue) {

    if (null == newValue) throw new Error("No arguments provided!");

    const sumAllSections = sumAllIputs("sectionSize") + Number(newValue);

    return sumAllSections <= allPdfpages;
}

/**
 *
 * @returns {boolean} true if all pages are used and if file is selected
 */
function isSplitFormValid() {

    const errorHandler = new Array();

    const sumAllSections = sumAllIputs("sectionSize");

    if (document.getElementById("patternInputFile").value == "") errorHandler.push("Select file to split");
    if (sumAllSections != allPdfpages) errorHandler.push("Not all pages are used. Set all sections.");


    if (errorHandler.length) {
        let message = "";
        errorHandler.forEach(simpleError => message += " \n" + simpleError);
        alert(message);
        return false;
    }


}
