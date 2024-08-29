/*
filename: enhancements.js
author: Chirag Satwani
created: 24/09/2023
last modified: 27/10/2023
description: assign3
*/
"use strict";
window.onload = function () {
const xArray = ["Technical specialist","Data Scientist","Tester","Technial programmer","software developer"];
const yArray = [55,65, 44, 35, 57];

const data = [{
  x: xArray,
  y: yArray,
  type: "bar",
  orientation:"v",
  marker: {color:"rgba(0,0,255)"}
}];

const layout = {title:"Booming job careers"};

Plotly.newPlot("myPlot", data, layout);

}



let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

