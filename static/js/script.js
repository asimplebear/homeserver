/*stagger the panels by this # pixels*/
var deltax = 30;
var deltay = 30;
var panVertPad = 10;


// 100 ==> "300px"
function pixy(num) {
  return num.toString() + "px";
}



/*if first visit set initial panel to 0*/
if (!localStorage.getItem('view')) {
  localStorage.setItem('view', '1');
}


/*make panels=array of Panels
and nu=[0,1,..] index the panels*/
var panels = document.getElementsByClassName('panel');
panels = Array.from(panels);
var n = panels.length;
var nu=[];
for (var i=0; i<n; i=i+1) {
  nu.push(i);
}


/*position panels in staggered pattern in order
starting with current view.  Above everything
except front*/
function arrangePanels() {
  /*top panel*/
  var x = parseInt(localStorage.getItem('view'))%n;
  var i=(n+x-1)%n;

  panHt=0
  panels.forEach( panel => {
                  if (panel.scrollHeight > panHt) {
                    panHt=panel.scrollHeight;
                  }
                });
  document.getElementsByClassName('rack')[0].style.height=pixy(panHt+300);
  panels.forEach( panel => {
                  panel.style.zIndex=(5 + i%n).toString();
                  panel.style.top=pixy((2*i)*deltay);//
                  panel.style.right=pixy(30 + (i)*deltax);//
                  panel.style.left=pixy((n-(i))*deltax);
                  panel.style.height=pixy(panHt-panVertPad);
                  i=(n+i-1)%n;
                });
}

/*select for panel to go on top*/
function setPanel(x) {
  localStorage.setItem('view', x.toString());
  arrangePanels();
}

/*forward cycle thru selecting top panel*/
function advancePanel() {
  var x=parseInt(localStorage.getItem('view'));
  x=(x+1)%n;
  localStorage.setItem('view', x.toString());
  arrangePanels();
}

/*backward cycle thru selecting top panel*/
function retreatPanel() {
  var x=parseInt(localStorage.getItem('view'));
  x=(n+x-1)%n;
  localStorage.setItem('view', x.toString());
  arrangePanels();
}

/*make panels clickable to bring to top*/
nu.forEach( i => {panels[i].onclick=function() {setPanel(i);}});

/*one-time position panels*/
arrangePanels();
arrangePanels();

/**/
nu.forEach(i => {
                 panels[i].onmouseover=function()
                  { if (i != parseInt(localStorage.getItem('view')))
                     {panels[i].style.backgroundColor="yellow";};
                     arrangePanels();};
                 panels[i].onmouseout=function() {panels[i].style.backgroundColor="white";};
              });




//toggle on or off.  Show or not
//makes button to flip toggle.

//thing is id-attribute of tag.
var thing='categories';
var buttonText='hide/show';

var outer = document.getElementById(thing);
var inner = document.createElement('div');

inner.innerHTML = outer.innerHTML;
outer.innerHTML = '';
button=document.createElement('button');
button.textContent = buttonText;
button.onclick = toggle;

//rearrange to put button above/below
outer.appendChild(button);
outer.appendChild(inner)

//to persist toggle state
//across reloads
if (!localStorage.getItem('t')) {
  localStorage.setItem('t', 'on');
}

function render() {
  if (localStorage.getItem('t')=='on') {
    inner.style.display='block';
  }
  else {
    inner.style.display='none';
  }
}

function toggle() {
  if (localStorage.getItem('t')=='on') {
    localStorage.setItem('t', 'off');
  }
  else {
    localStorage.setItem('t', 'on');
  }
 render();
}
//to put it right initially on reload
render();


/*QUIZ*/
function quizResult(t) {
  alert(t);
}
