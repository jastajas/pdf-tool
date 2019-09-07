/*
 * @file Various tools.
 * @author <a href="mailto:jastajas@gmail.com">Jack</a>
 * @version 1.1.1.
 */

/*
 * @description Function hide or show selected HTML element.
 * @param {Element} element Reference to element which has to be hide or show.
 * @param {boolean} isVisible boolean value which indicate if element should be visible or not.
 * @throws {Error} Will throw an error if the "element" param is null
*/
function showHideElement(element, isVisible) {
    if (!element) throw new Error("No arguments provided!");

    else if (isVisible) {
        element.classList.remove("nonVisibleElement");
    } else {
        element.classList.add("nonVisibleElement");
    }
}

/*
 * @description Function for deleting collection elements got by class name.
 * @param {string} columnClassName "class" attribute value of table row destined for removing.
 */
function resetElementList(columnClassName) {
    if (!columnClassName) throw new Error("No arguments provided!");

    var allDocs = document.getElementsByClassName(columnClassName);
    while (0 < allDocs.length) {
        allDocs[0].parentNode.removeChild(allDocs[0]);
    }
}

/*
 * @description Function for removing table row by remove button click which is located in this row.
 * @param {Element} element Reference to clicked element.
 * @param {string} tableId "Id" attribute value of table.
 * @param {string} rowsClass "class" attribute value of table row.
 * @param {function} callback Optional additional function.
 */
function removeThisElement(element, tableId, rowsClass, callback) {
    if (!element || !tableId || !rowsClass) throw new Error("No arguments provided!");

    var rowIndex = element.parentNode.parentNode.rowIndex;

    var table = document.getElementById(tableId);
    if (!table) throw new Error("No element found!");
    table.deleteRow(rowIndex);

    if (callback) callback();

    prepareOrdinalsNo(rowsClass);
}

/*HTML ELEMENTS MANAGER*/

/*
 * @description Function creates button which remove table row placed in cell of removeable row.
 * @param {string} tableId ID HTML element: table.
 * @param {string} removeableItemClass Class name is table row attribute of entire table.
 * @param {function} callback optional method in removeThisElement function.
 * @this {Element}
 * @return {Element} DOM element <button type="button"> with onclick attribute for removing row of table.
*/
function createRemoveBtn(removeableItemClass, tableId, callback) {
    var removeBtn = document.createElement("button");

    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("type", "button");
    removeBtn.setAttribute(
        "onclick",
        "removeThisElement(this,'" + tableId + "','" + removeableItemClass + "'," + callback + ")"
    );
    return removeBtn;
}

/*
 * @description Function for creating ordinals numbers in first column of table.
 * @param {string} rowClassName Class name of rows, which must get ordinal number.
 */
function prepareOrdinalsNo(rowClassName) {
    if (!rowClassName) throw new Error("No arguments provided!");

    var rowList = document.getElementsByClassName(rowClassName);

    for (i = 0; i < rowList.length; i++) {
        rowList[i].firstElementChild.innerHTML = i + 1;
    }
}

/*
 * @description Function set input element attributes.
 * @param {Element} inputElement Reference to element which has to be set.
 * @param {string} paramName "Name" attribute value of input element.
 * @param {string} inputId "Id" attribute value of input element.
 * @param {string} onchangeValue "onchange" attribute value of input element.
 */
function setInputFileProperties(inputElement, paramName, inputId, onchangeValue) {
    if (!inputElement) throw new Error("No input element provided!");
    if (!paramName) throw new Error("No paramiter name provided!");
    if (!inputId) throw new Error("No element id provided!");

    inputElement.setAttribute("name", paramName);
    inputElement.id = inputId;
    inputElement.required = true;
    inputElement.removeAttribute("onchange");

    if (onchangeValue) inputElement.setAttribute("onchange", onchangeValue);
}

/*
 * @description Function releases click event for input file element.
 * @param {string} idFileInput ID input file element.
 */
function openFileInput(idFileInput) {
    if (!idFileInput) throw new Error("No arguments provided!");

    var fileInput = document.getElementById(idFileInput);

    if (!fileInput) throw new Error("No element found!");

    fileInput.click();
}

/*
 * @description Function update text content of selected element.
 * @param {Element} destinedElement Reference to element which has to be changed.
 * @param {string} newValue New text value.
 */
function updateTextContent(destinedElement, newValue) {
    if (!newValue || !destinedElement) throw new Error("No arguments provided!");

    destinedElement.textContent = newValue;
}

/*
 * @description Function of summing all value number input by parameter name.
 * @param {string} paramName "name" attribute value of input element.
 * @return {number} sum of inputs values.
 */
function sumAllIputs(paramName) {
    if (!paramName) throw new Error("No arguments provided!");

    var allInputs = document.getElementsByName(paramName);

    var sumAllInputs = 0;

    for (var i = 0; i < allInputs.length; i++) {
        if (typeof Number(allInputs[i].value) !== "number")
            throw new Error("Can't sum. Different type of than number.");

        sumAllInputs += Number(allInputs[i].value);
    }
    return sumAllInputs;
}

/*
 * @description Function reset input [type="file"] content. Method is for composite file input, built of main container with 3 child element:
 *              1. <input type="file"/> => hidden
 *              2. <button type="button"> => open input button
 *              3. <p></p> => file name
 * @param {string} idInputFileEl "id" attribute value of input type="file" element.
 * @throws {Error} Will throw an error if the idInputFileEl param is null or empty
 * @throws {Error} Will throw an error if the "element" isn't type="file"
 * @throws {Error} Will throw an error if the "element" doesn't contain file object
 */
function clearFileInput(idInputFileEl) {
    if (!idInputFileEl) throw new Error("No arguments provided!");

    var changedInput = document.getElementById(idInputFileEl);
    if (!changedInput) throw new Error("No element found!");

    changedInput.value = "";
    changedInput.parentNode.lastElementChild.textContent = "Select file...";
}

/*VALIDATORS*/

/*pdf format validator. Argument is html element: <input type="file"/>*/

/*
 * @description Function check file format, if it is pdf file.
 * @param {Element} inputFileElement Reference to input type="file" element which contains destined file.
 * @return {boolean} sum of inputs values.
 * @throws {Error} Will throw an error if the "element" param is null
 * @throws {Error} Will throw an error if the "element" isn't type="file"
 * @throws {Error} Will throw an error if the "element" doesn't contain file object
 */
function isPdfFile(inputFileElement) {
    if (!inputFileElement) throw new Error("No arguments provided!");

    if (!inputFileElement.files) throw new Error("Incorrect element type");

    if (!inputFileElement.files.length) throw new Error("No files provided!");

    return "application/pdf" == inputFileElement.files[0].type;
}

/*
 * Function get data from server by using AJAX.
 * @param method Determine request method (get, post, put)
 * @param url URL address for request
 * @param callback function for handling response object. It pass one parameter.
 * @param formObject
 */
function getDataFromServer(method, url, callback, formObject) {
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.responseType = "json";
    xhttp.onload = function () {
        if (xhttp.status === 404) {
            alert("Object not found");
        } else {
            showHideElement(document.getElementById("waitingDiv"), false);
        }

        callback(xhttp.response);
    };

    xhttp.send(formObject);
}

/**
 * @description Function validate if value of delivered input field is integer
 * @param element
 * @returns {boolean}
 */
function isInteger(element){
    if (!element) throw new Error("No element provided!");
    const section = element.value;
    const amountPattern = new RegExp("^[0-9]{1,}$");

    return amountPattern.test(section);
}
