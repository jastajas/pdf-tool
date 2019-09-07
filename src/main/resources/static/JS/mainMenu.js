var menuTails = document.getElementsByClassName("btnInternalBckgnd");

menuTails[0].addEventListener("mouseover",function(){
    showHideBtnDescription(menuTails[0].firstElementChild, "block");
});
menuTails[0].addEventListener("mouseleave",function(){
    showHideBtnDescription(menuTails[0].firstElementChild, "none");
});
menuTails[1].addEventListener("mouseover",function(){
    showHideBtnDescription(menuTails[1].firstElementChild, "block");
});
menuTails[1].addEventListener("mouseleave",function(){
    showHideBtnDescription(menuTails[1].firstElementChild, "none");
});
menuTails[2].addEventListener("mouseover",function(){
    showHideBtnDescription(menuTails[2].firstElementChild, "block");
});
menuTails[2].addEventListener("mouseleave",function(){
    showHideBtnDescription(menuTails[2].firstElementChild, "none");
});
menuTails[3].addEventListener("mouseover",function(){
    showHideBtnDescription(menuTails[3].firstElementChild, "block");
});
menuTails[3].addEventListener("mouseleave",function(){
    showHideBtnDescription(menuTails[3].firstElementChild, "none");
});
function showHideBtnDescription(btnDescriptionEl, displayProp){
    btnDescriptionEl.style.display = displayProp;

}
