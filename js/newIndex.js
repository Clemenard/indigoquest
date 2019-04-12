$(document).ready(function(){
  /* VARIABLES */

    var listParam=getParameters();
    var cubesize= parseInt($('.cube').css('height'));
  	var nextTake=[];
    var score=0;
    if(listParam['grid'] && listParam['grid']!='null'){var gridsize=parseInt(listParam['grid']);}else{var gridsize=11;}
    if(listParam['nbcol'] && listParam['nbcol']!='null'){var numberColor=parseInt(listParam['nbcol']);}else{var numberColor=3;}
    if(listParam['whiter'] && listParam['nbcol']!='null'){var whiteRatio=parseInt(listParam['whiter']);}else{var whiteRatio=1;}
    var nbTurn=30;
    var frontLine=[];

// FONCTIONS
// playgroundSize
// getRandomInt
// positionGrid
// updateTake
// setHighScore
// generatePlayground

function getParameters()
{
var urlParams,
match,
pl = '/+/g', // Regex for replacing addition symbol with a space
search = /([^&=]+)=?([^&]*)/g,
decode = function (s) { return decodeURIComponent(s.replace(pl, )); },
query = window.location.search.substring(1);
urlParams = {};
while (match = search.exec(query))
urlParams[decode(match[1])] = decode(match[2]);
return urlParams;
}

      function Grid(colorCube, x, y, take) {
        this.colorCube = colorCube;
        this.x = x;
        this.y = y;
        this.take = take;

      this.frontLin=function(keyCode,i, y, x){
        if (40 == keyCode){
          comparate="this.take==1 && this.y>y && this.x==x";
      }
        else if (38 == keyCode){
          comparate="this.take==1 && this.y<y && this.x==x";
        }
        else if (37 == keyCode){
          comparate="this.take==1 && this.x<y && this.y==x";
        }
        else{
            comparate="this.take==1 && this.x>y && this.y==x";
        }


        if(eval(comparate)){
          if(37 == keyCode || 39 == keyCode){y=this.x;}
        else{y=this.y;}
        return [i,y];
        }
        else{
          return [i,y];
        };
      };
    }
    function Playground(gridsize,cubesize,numberColor,whiteRatio) {

      this.playgroundSize=function(a, b){return size=(a*b+6);}

      this.colorChoice=function(numberColor,whiteRatio){
        let randNumber=numberColor+whiteRatio;
        coloCube=getRandomInt(randNumber);
        if(i>gridsize && i%gridsize!=0){
          while(coloCube==grid[i-1].colorCube||coloCube==grid[i-gridsize].colorCube){
          coloCube=getRandomInt(randNumber);
          }
        }
        else if((i<gridsize && i%gridsize!=0) || (i>gridsize && i%gridsize==0)){
          while(coloCube==grid[i-1].colorCube){
          coloCube=getRandomInt(randNumber);
          }
        }
        else if(i>gridsize && i%gridsize==0){
          while(coloCube==grid[i-gridsize].colorCube){
          coloCube=getRandomInt(randNumber);
          }
        }

if(coloCube<numberColor){
        switch (coloCube) {
          case 0 : $("#cube"+i).addClass('red');break;
          case 1 : $("#cube"+i).addClass('blue');break;
          case 2 : $("#cube"+i).addClass('yellow');break;
          case 3 : $("#cube"+i).addClass('purple');break;
          case 4 : $("#cube"+i).addClass('green');break;
          case 5 : $("#cube"+i).addClass('orange');break;
          default: $("#cube"+i).addClass('white');

        }}
        else{$("#cube"+i).addClass('white');}
        take=0;
        return coloCube;
      };

//CONSTRUCTEUR
      let grid=[];
        $('#playground').css("width",this.playgroundSize(cubesize,gridsize)+'px');
        $('#playground').css("height",this.playgroundSize(cubesize,gridsize)+'px');

          for (var i = 0; i < gridsize*gridsize; i++) {
             x= i % gridsize;
             y=(i- i% gridsize)/gridsize;
            $('#playground').append('<div class="cube noTake " id="cube'+i+'"></div>');

            if(x==gridsize/2-0.5 && y==gridsize/2-0.5){
              $("#cube"+i).addClass('black take');
              take=1;
            }
                else if (gridsize/2-1.5<=x && x<=gridsize/2+0.5 && gridsize/2-1.5<=y && y<=gridsize/2+0.5) {
                  $("#cube"+i).addClass('white');
                  take=0;
        }
        else{
           var coloCube=this.colorChoice(numberColor,whiteRatio);
            }
            console.log(coloCube);
            var nouveauCube=new Grid(coloCube,x,y,take);
        grid.push(nouveauCube);
      };
          return grid;
    };



    function Frontline(x, y, grid) {
    	this.x = x;
    	this.y = y;
    	this.grid = grid;
      this.positionMet=function(keyCode, gridsize){
        if (40 == keyCode){
          return positionGrid(this.x,this.y)+ gridsize;}
          if (38 == keyCode){
            return positionGrid(this.x,this.y)- gridsize;}
            if (37 == keyCode){
            return positionGrid(this.x,this.y)-1;}
              else{
              return positionGrid(this.x,this.y)+1;}

      }
      this.evalFrontLine=function(keyCode,thegrid, gridsize){
        positionMeet=this.positionMet(keyCode, gridsize);
        if (40 == keyCode){
          console.log(thegrid[positionMeet].y+" y");
          console.log(thegrid[positionMeet].x+" x");
          console.log(thegrid[positionMeet].take+" prise");
          console.log(thegrid[positionMeet].colorCube+" couleur");
          condition="this.y< 10 && (thegrid[positionMeet].take==1 || thegrid[positionMeet].colorCube>2)";}
          if (38 == keyCode){
            condition="this.y> 1 && ( thegrid[positionMeet].take==1 || thegrid[positionMeet].colorCube>2)";}
            if (37 == keyCode){
              condition="this.x> 1 && (thegrid[positionMeet].take==1 || thegrid[positionMeet].colorCube>2)";}
              else{
                condition="this.x< 10 && (thegrid[positionMeet].take==1 || thegrid[positionMeet].colorCube>2)";}
          if	(eval(condition)) {
          return 0;}
            else{
              return 1;
            };
      };
      this.evalSelect=function(keyCode,thegrid){
        if (40 == keyCode){
          return "this.grid==i && this.y< 10 && grid[positionMeet].colorCube<3";}
          if (38 == keyCode){
            return "this.grid == i && this.y > 1 && grid[positionMeet].colorCube<3";}
            if (37 == keyCode){
            return "this.grid==i && this.x> 1 && grid[positionMeet].colorCube<3";}
              else{
              return "this.grid==i && this.x< 10 && grid[positionMeet].colorCube<3";}

      };

this.moveFrontLine=function(keyCode){
  if (40 == keyCode){
    this.y+=1;
}
  else if (38 == keyCode){
      this.y-=1;
  }
  else if (37 == keyCode){
      this.x-=1;
  }
  else{
      this.x+=1;
    };
}

    };
      function getRandomInt(max) {return Math.floor(Math.random() * Math.floor(max));};
      function positionGrid(x,y) {return y*11+x;};

    function updateTake(positionMeet,j,grid,frontLine){
      if($('#sound').html()==='On'){
        audio = new Audio('disparition.mp3');
    audio.play();}
      $("#cube"+positionMeet).addClass('white noTake');
      $("#cube"+positionMeet).removeClass('red yellow blue take');
      grid[positionMeet].colorCube=3;
      grid[positionMeet].take=0;
      $("#cube"+frontLine[j].grid).addClass('white noTake');
      $("#cube"+frontLine[j].grid).removeClass('red yellow blue take');
      grid[frontLine[j].grid].colorCube=3;
      grid[frontLine[j].grid].take=0;
      score++;
    $("#score").html(score);
    }
    function setHighScore(score){
      if(nbTurn<=0){$("#message").html('<p>Félicitations! Vous avez fini la partie avec '+score+' points. </p><form method="post" action="setHighScore.php?score='+score+'"><label id="pseudo" title="Entre trois et dix caractères alphanumériques" >Entrez votre pseudo : </label><input type="text"  maxlength=10  for="pseudo" name="pseudo"  required /><input type="submit"   value="Sauvegardez votre score" /></form>');}
    }


var playground = new Playground(gridsize,cubesize,numberColor,whiteRatio);

$('#sound').click(function(){
  if($('#sound').html()==='Off'){
$('#sound').html('On')  ;
 music = new Audio('Jaunter-Reset.mp3');
music.play();}
else if($('#sound').html()==='On'){
$('#sound').html('Off')  ;
music.pause();}
return music;})

$('#colorPlayground').click(function(){
  let nbcol=prompt("Combien de couleurs(6 max)?");
  let whiter=prompt("Quelle proportion de blanc(nombre entre 0 et 20)?");
document.location.href="index.php?nbcol="+nbcol+"&whiter="+whiter+"&grid=11";

});
    $('body').keyup(function (e) {
      if(e.keyCode>36 && e.keyCode<41 && nbTurn>0)
      moveBlock(e.keyCode, playground,gridsize);
});

function setPosition(keyCode,cubesize,numberMove,i){
  if(keyCode==40 || keyCode==38){
  position = $("#cube"+ i).css('top');
  if(keyCode==38){
      position=parseInt(position)- cubesize*numberMove;
  }
  else{
    position=parseInt(position)+ cubesize*numberMove;}
  $("#cube"+ i).animate({ top : position }, 1000);
}
else{
  position = $("#cube"+ i).css('left');
  if(keyCode==37){
      position=parseInt(position)- cubesize*numberMove;
  }
  else{
    position=parseInt(position)+ cubesize*numberMove;}
  $("#cube"+ i).animate({ left : position }, 1000);
};
}

function moveBlock(keyCode,grid,gridsize){
if ( keyCode>36 && keyCode<41 && nbTurn>0) {
  numberMove=0;blocker=0;
  var frontLine=[];

  //ETABLISSEMENT DE LA LIGNE DE FRONT

    for (var x = 0; x < gridsize; x++) {
      if(keyCode==37 || keyCode==38){
        y=15;yBis=15;
      }
      else
      {y=-1;yBis=-1;
      };
      for (var i = 0; i < gridsize*gridsize; i++) {
        var gridId=grid[i].frontLin(keyCode,i,yBis,x);
        if(gridId[1]!=yBis){y=gridId[1];
          var frontIndex=gridId[0];};
      };
      if(y!=yBis){
        if(keyCode==40 || keyCode==38){
          var newFrontLine = new Frontline(x,y,frontIndex);
        }
        else{
          var newFrontLine = new Frontline(y,x,frontIndex);
        };
        console.log(newFrontLine);
  frontLine.push(newFrontLine);
      };
    };

  // EVALUATION DU NOMBRE DE MOUVEMENTS
console.log(blocker+" init");
    while(blocker!=1){
      for (var i = 0; i < frontLine.length; i++) {

blocker=frontLine[i].evalFrontLine(keyCode,grid,gridsize);
console.log(blocker+" after check");
          };
      if(blocker!=1){
        console.log(numberMove+" moves");
        numberMove++;
        for (var i = 0; i < frontLine.length; i++) {
          frontLine[i].moveFrontLine(keyCode);
        };
      };
      if(numberMove>10){blocker=1;}
    };

    //DEPLACEMENT DU BLOC

    for (var i = 0; i < gridsize*gridsize; i++) {
      if(grid[i].take==1){
setPosition(keyCode,cubesize,numberMove,i);

        if($('#sound').html()==='On'){
          audio = new Audio('fin_mouvement.mp3');
     audio.play();}

     // SELECTION DES BLOCS RENCONTRES

     for (var j = 0; j < frontLine.length; j++) {
    positionMeet=frontLine[j].positionMet(keyCode,gridsize);
    condition=frontLine[j].evalSelect(keyCode);
    if(eval(condition)){
      console.log("c");
       $("#cube"+positionMeet).addClass('take');
     $("#cube"+positionMeet).removeClass('noTake');
     if(grid[positionMeet].colorCube==grid[frontLine[j].grid].colorCube){
     updateTake(positionMeet,j,grid,frontLine);
     }
     nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)- 1);
     };
     };
     // UPDATE DU DEPLACEMENT SUR L'OBJET GRID
       if(keyCode==40 || keyCode==38){
         grid[i].y+=numberMove;}
         else{grid[i].x+=numberMove;}
     };
     };
     for (var j = 0; j < nextTake.length; j++) {
     if(grid[nextTake[j]].colorCube<3){
     grid[nextTake[j]].take=1;
     };
     };
     nextTake=[];
     nbTurn--;
     $("#nbTurn").html(nbTurn);
     setHighScore(score);
     };
   };

});
