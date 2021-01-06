var projectsView;
var pIndex = 0;
var dots;

onReady(function () {

  projectsView = document.getElementById("projectsView");
  dots = document.getElementsByClassName('dot');

});

function onReady(callback) {
  var intervalID = window.setInterval(checkReady, 1000);

  function checkReady() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalID);
      callback.call(this);
    }
  }
}

function scrollProjects(value){
  dots[pIndex].classList.remove("activeDot");
  var offset = projectsView.offsetWidth;
  pIndex = pIndex + value;
  if(pIndex<0){
    pIndex = 2;
  }else if(pIndex > 2){
    pIndex = 0;
  }
  var x = offset * pIndex;
  projectsView.scrollTo({
    top: 0,
    left: x,
    behavior: 'smooth'
  });

  dots[pIndex].classList.add("activeDot");
}