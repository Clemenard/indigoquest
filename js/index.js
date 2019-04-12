$(function(){
/* GENERATION DE LA GRILLE */
  const _GRIDSIZE=11;
  var cubesize= parseInt($('.cube').css('height'));
	var nextTake=[];
  var score=0;
  var nbTurn=30;
  var grid =[];
  var frontLine=[];


function playgroundSize( a, b){return  size=(a*b+6);}
  class Grid {
  constructor(colorCube, x, y, take) {
    this.colorCube = colorCube;
    this.x = x;
    this.y = y;
    this.take = take;
  }
}

class Frontline {
constructor(x, y, grid) {
	this.x = x;
	this.y = y;
	this.grid = grid;
}
}
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
// DEFINITION DE L'ESPACE DE GRILLE

$('#playground').css("width",playgroundSize(cubesize,_GRIDSIZE)+'px');
$('#playground').css("height",playgroundSize(cubesize,_GRIDSIZE)+'px');

  for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
    let colorCube=3;
     x= i % _GRIDSIZE;
     y=(i- i% _GRIDSIZE)/_GRIDSIZE;
    $('#playground').append('<div class="cube noTake " id="cube'+i+'"></div>');

    if(x==_GRIDSIZE/2-0.5 && y==_GRIDSIZE/2-0.5){
      $("#cube"+i).addClass('black take');
      take=1;
    }
        else if (_GRIDSIZE/2-1.5<=x && x<=_GRIDSIZE/2+0.5 && _GRIDSIZE/2-1.5<=y && y<=_GRIDSIZE/2+0.5) {
          $("#cube"+i).addClass('white');
          take=0;
}
else{
      colorCube=getRandomInt(4);
      if(i>11 && i%11!=0){
        while(colorCube==grid[i-1].colorCube||colorCube==grid[i-11].colorCube){
        colorCube=getRandomInt(4);
        }
      }
      else if(i<11 && i%11!=0){
        while(colorCube==grid[i-1].colorCube){
        colorCube=getRandomInt(4);
        }
      }
      else if(i>11 && i%11==0){
        while(colorCube==grid[i-11].colorCube){
        colorCube=getRandomInt(4);
        }
      }


      switch (colorCube) {
        case 0 : $("#cube"+i).addClass('red');break;
        case 1 : $("#cube"+i).addClass('blue');break;
        case 2 : $("#cube"+i).addClass('yellow');break;
        default: $("#cube"+i).addClass('white');

      }
      take=0;
    }


    var nouveauCube=new Grid(colorCube,x,y,take);
grid.push(nouveauCube);
//console.log(nouveauCube);
  }

/* DEPLACEMENT DU CUBE NOIR */



  $('#sound').click(function(){
    if($('#sound').html()==='Off'){
$('#sound').html('On')  ;
   music = new Audio('Jaunter-Reset.mp3');
music.play();}
else if($('#sound').html()==='On'){
$('#sound').html('Off')  ;
music.pause();}
return music;});



    $('body').keyup(function (e) {

			// DEPLACEMENT HAUT
			if (e.keyCode == 38 && nbTurn>0) {
			  numberMove=0;blocker=0;
				var frontLine=[];

			  //ETABLISSEMENT DE LA LIGNE DE FRONT

			    for (var x = 0; x < _GRIDSIZE; x++) {
			      y=15;
			      for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
			    		if(grid[i].take==1 && grid[i].y<y && grid[i].x==x){
							y=grid[i].y;
							var gridId=i;
							};
						};
						if(y!=15){
							var newFrontLine = new Frontline(x,y,gridId);
							frontLine.push(newFrontLine);
							// console.log(newFrontLine);
							// console.log(grid[newFrontLine.grid]);
						};
					};

			  // EVALUATION DU NOMBRE DE MOUVEMENTS

					while(blocker!=1){
						for (var i = 0; i < frontLine.length; i++) {
							var positionMeet= positionGrid(frontLine[i].x,frontLine[i].y)- _GRIDSIZE;
								if	(frontLine[i].y> 1 && ( grid[positionMeet].colorCube>2) ) {

								}
								else{
									blocker=1;};
								};
						if(blocker!=1){
						 	numberMove++;
							for (var i = 0; i < frontLine.length; i++) {
								frontLine[i].y-=1;
							};
						};
					};

			      //DEPLACEMENT DU BLOC

// console.log(numberMove+" : Mouvement");
						for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
							if(grid[i].take==1){
								position = $("#cube"+ i).css('top');
								position=parseInt(position)- cubesize*numberMove;
								$("#cube"+ i).animate({ top : position }, 1000);
                if($('#sound').html()==='On'){
                  audio = new Audio('fin_mouvement.mp3');
             audio.play();}

									 // SELECTION DES BLOCS RENCONTRES

								for (var j = 0; j < frontLine.length; j++) {
									var positionMeet= positionGrid(frontLine[j].x,frontLine[j].y)- _GRIDSIZE;
						 			if (frontLine[j].grid == i && frontLine[j].y > 1 && grid[positionMeet].colorCube<3){
										// console.log(grid[positionMeet].colorCube+' : couleur');
										// console.log(positionMeet+' : position');

										// SAISIE DU BLOC CONTACT

				 					$("#cube"+positionMeet).addClass('take');
				 					$("#cube"+positionMeet).removeClass('noTake');

									// EFFACEMENT DES BLOCS SIMILAIRES

									if(grid[positionMeet].colorCube==grid[frontLine[j].grid].colorCube){

									updateTake(positionMeet,j,grid,frontLine);
									}
									nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)- _GRIDSIZE);
									};
							 	};

											 // UPDATE DU DEPLACEMENT SUR L'OBJET GRID

											grid[i].y-=numberMove;
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

// DEPLACEMENT BAS
if (e.keyCode == 40 && nbTurn>0) {
  numberMove=0;blocker=0;
	var frontLine=[];

  //ETABLISSEMENT DE LA LIGNE DE FRONT

    for (var x = 0; x < _GRIDSIZE; x++) {
      y=-1;
      for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
    		if(grid[i].take==1 && grid[i].y>y && grid[i].x==x){
				y=grid[i].y;
				var gridId=i;
				};
			};
			if(y!=-1){
				var newFrontLine = new Frontline(x,y,gridId);
				frontLine.push(newFrontLine);
			// 	console.log(newFrontLine);
			 };
		};

  // EVALUATION DU NOMBRE DE MOUVEMENTS

		while(blocker!=1){
			for (var i = 0; i < frontLine.length; i++) {
				if	(frontLine[i].y< 10 && (grid[positionGrid(frontLine[i].x,frontLine[i].y)+_GRIDSIZE].take==1 || grid[positionGrid(frontLine[i].x,frontLine[i].y)+_GRIDSIZE].colorCube>2) ) {

				}
					else{
						blocker=1;};
					};
			if(blocker!=1){
			 	numberMove++;
				for (var i = 0; i < frontLine.length; i++) {
					frontLine[i].y+=1;
				};
			};
		};

      //DEPLACEMENT DU BLOC


			for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
				if(grid[i].take==1){
					position = $("#cube"+ i).css('top');
					position=parseInt(position)+ cubesize*numberMove;
					$("#cube"+ i).animate({ top : position }, 1000);
          if($('#sound').html()==='On'){
            audio = new Audio('fin_mouvement.mp3');
       audio.play();}

						 // SELECTION DES BLOCS RENCONTRES

					for (var j = 0; j < frontLine.length; j++) {
						var positionMeet= positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE;
						if (frontLine[j].grid==i && frontLine[j].y< 10 && grid[positionMeet].colorCube<3){
	 					$("#cube"+positionMeet).addClass('take');
	 					$("#cube"+positionMeet).removeClass('noTake');
						if(grid[positionMeet].colorCube==grid[frontLine[j].grid].colorCube){
						updateTake(positionMeet,j,grid,frontLine);
						}
						nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE);
	 					};
				 	};

								 // UPDATE DU DEPLACEMENT SUR L'OBJET GRID

								grid[i].y+=numberMove;
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


// DEPLACEMENT GAUCHE
if (e.keyCode == 37 && nbTurn>0) {
	numberMove=0;blocker=0;
	var frontLine=[];
	//ETABLISSEMENT DE LA LIGNE DE FRONT

		for (var y = 0; y < _GRIDSIZE; y++) {
			x=15;
			for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
				if(grid[i].take==1 && grid[i].x<x && grid[i].y==y){
				x=grid[i].x;
				var gridId=i;
				};
			};
			if(x!=15){
				var newFrontLine = new Frontline(x,y,gridId);
				frontLine.push(newFrontLine);
				// console.log(newFrontLine);
			};
		};

	// EVALUATION DU NOMBRE DE MOUVEMENTS
		while(blocker!=1){
			for (var i = 0; i < frontLine.length; i++) {
					if	(frontLine[i].x> 1 && (grid[positionGrid(frontLine[i].x,frontLine[i].y)-1].take==1 || grid[positionGrid(frontLine[i].x,frontLine[i].y)-1].colorCube>2) ) {
					}
					else{
						blocker=1;};
					};
			if(blocker!=1){
				numberMove++;
				for (var i = 0; i < frontLine.length; i++) {
					frontLine[i].x-=1;
				};
			};
		};

			//DEPLACEMENT DU BLOC

			for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
				if(grid[i].take==1){
					position = $("#cube"+ i).css('left');
					position=parseInt(position)- cubesize*numberMove;
					$("#cube"+ i).animate({ left : position }, 1000);
          if($('#sound').html()==='On'){
            audio = new Audio('fin_mouvement.mp3');
       audio.play();}

						 // SELECTION DES BLOCS RENCONTRES

					for (var j = 0; j < frontLine.length; j++) {
						var positionMeet= positionGrid(frontLine[j].x,frontLine[j].y)-1;
						if (frontLine[j].grid==i && frontLine[j].x> 1 && grid[positionMeet].colorCube<3){
						$("#cube"+positionMeet).addClass('take');
						$("#cube"+positionMeet).removeClass('noTake');
						if(grid[positionMeet].colorCube==grid[frontLine[j].grid].colorCube){
						updateTake(positionMeet,j,grid,frontLine);
						}
						nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)- 1);
						};
					};

								 // UPDATE DU DEPLACEMENT SUR L'OBJET GRID

								grid[i].x-=numberMove;
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

// DEPLACEMENT DROIT
if (e.keyCode == 39 && nbTurn>0) {
	numberMove=0;blocker=0;
	var frontLine=[];
	//ETABLISSEMENT DE LA LIGNE DE FRONT

		for (var y = 0; y < _GRIDSIZE; y++) {
			x=-1;
			for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
				if(grid[i].take==1 && grid[i].x>x && grid[i].y==y){
				x=grid[i].x;
				var gridId=i;
				};
			};
			if(x!=-1){
				var newFrontLine = new Frontline(x,y,gridId);
				frontLine.push(newFrontLine);
				// console.log(newFrontLine);
			};
		};

	// EVALUATION DU NOMBRE DE MOUVEMENTS

		while(blocker!=1){
			for (var i = 0; i < frontLine.length; i++) {
        						var positionMeet= positionGrid(frontLine[j].x,frontLine[j].y)+1;
					if	(frontLine[i].x< 10 && (grid[positionMeet].take==1 || grid[positionGrid(frontLine[i].x,frontLine[i].y)+1].colorCube>2) ) {
					}
					else{
						blocker=1;};
					};
			if(blocker!=1){
				numberMove++;
				for (var i = 0; i < frontLine.length; i++) {
					frontLine[i].x+=1;
				};
			};
		};

			//DEPLACEMENT DU BLOC

			for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
				if(grid[i].take==1){
					position = $("#cube"+ i).css('left');
					position=parseInt(position)+ cubesize*numberMove;
					$("#cube"+ i).animate({ left : position }, 1000);
          if($('#sound').html()==='On'){
            audio = new Audio('fin_mouvement.mp3');
       audio.play();}



						 // SELECTION DES BLOCS RENCONTRES

					for (var j = 0; j < frontLine.length; j++) {
						var positionMeet= positionGrid(frontLine[j].x,frontLine[j].y)+1;
						if (frontLine[j].grid==i && frontLine[j].x< 10 && grid[positionMeet].colorCube<3){
						$("#cube"+positionMeet).addClass('take');
						$("#cube"+positionMeet).removeClass('noTake');
						if(grid[positionMeet].colorCube==grid[frontLine[j].grid].colorCube){
						updateTake(positionMeet,j,grid,frontLine);
						}
						nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)+ 1);
						};
					};

								 // UPDATE DU DEPLACEMENT SUR L'OBJET GRID

								grid[i].x+=numberMove;
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
      // if (e.keyCode == 13 && nbTurn<=0) {
      //   document.location.href="index.html";
      // }

});

//DEPLACEMENTS SUR MOBILE
$("#up").on("click",function(){
  console.log("taptap");
  numberMove=0;blocker=0;
  var frontLine=[];

  //ETABLISSEMENT DE LA LIGNE DE FRONT

    for (var x = 0; x < _GRIDSIZE; x++) {
      y=15;
      for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
        if(grid[i].take==1 && grid[i].y<y && grid[i].x==x){
        y=grid[i].y;
        var gridId=i;
        };
      };
      if(y!=15){
        var newFrontLine = new Frontline(x,y,gridId);
        frontLine.push(newFrontLine);
        // console.log(newFrontLine);
        // console.log(grid[newFrontLine.grid]);
      };
    };

  // EVALUATION DU NOMBRE DE MOUVEMENTS

    while(blocker!=1){
      for (var i = 0; i < frontLine.length; i++) {
        var positionMeet= positionGrid(frontLine[i].x,frontLine[i].y)- _GRIDSIZE;
          if	(frontLine[i].y> 1 && ( grid[positionMeet].colorCube>2) ) {

          }
          else{
            blocker=1;};
          };
      if(blocker!=1){
        numberMove++;
        for (var i = 0; i < frontLine.length; i++) {
          frontLine[i].y-=1;
        };
      };
    };

      //DEPLACEMENT DU BLOC

// console.log(numberMove+" : Mouvement");
      for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
        if(grid[i].take==1){
          position = $("#cube"+ i).css('top');
          position=parseInt(position)- cubesize*numberMove;
          $("#cube"+ i).animate({ top : position }, 1000);

             // SELECTION DES BLOCS RENCONTRES

          for (var j = 0; j < frontLine.length; j++) {
            var positionMeet= positionGrid(frontLine[j].x,frontLine[j].y)- _GRIDSIZE;
            if (frontLine[j].grid == i && frontLine[j].y > 1 && grid[positionMeet].colorCube<3){
              // console.log(grid[positionMeet].colorCube+' : couleur');
              // console.log(positionMeet+' : position');

              // SAISIE DU BLOC CONTACT

            $("#cube"+positionMeet).addClass('take');
            $("#cube"+positionMeet).removeClass('noTake');

            // EFFACEMENT DES BLOCS SIMILAIRES

            if(grid[positionMeet].colorCube==grid[frontLine[j].grid].colorCube){

            updateTake(positionMeet,j,grid,frontLine);
            }
            nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)- _GRIDSIZE);
            };
          };

                 // UPDATE DU DEPLACEMENT SUR L'OBJET GRID

                grid[i].y-=numberMove;
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
});
$("#down").on("click",function(){
  numberMove=0;blocker=0;
	var frontLine=[];

  //ETABLISSEMENT DE LA LIGNE DE FRONT

    for (var x = 0; x < _GRIDSIZE; x++) {
      y=-1;
      for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
    		if(grid[i].take==1 && grid[i].y>y && grid[i].x==x){
				y=grid[i].y;
				var gridId=i;
				};
			};
			if(y!=-1){
				var newFrontLine = new Frontline(x,y,gridId);
				frontLine.push(newFrontLine);
			// 	console.log(newFrontLine);
			 };
		};

  // EVALUATION DU NOMBRE DE MOUVEMENTS

		while(blocker!=1){
			for (var i = 0; i < frontLine.length; i++) {
				if	(frontLine[i].y< 10 && (grid[positionGrid(frontLine[i].x,frontLine[i].y)+_GRIDSIZE].take==1 || grid[positionGrid(frontLine[i].x,frontLine[i].y)+_GRIDSIZE].colorCube>2) ) {

				}
					else{
						blocker=1;};
					};
			if(blocker!=1){
			 	numberMove++;
				for (var i = 0; i < frontLine.length; i++) {
					frontLine[i].y+=1;
				};
			};
		};

      //DEPLACEMENT DU BLOC


			for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
				if(grid[i].take==1){
					position = $("#cube"+ i).css('top');
					position=parseInt(position)+ cubesize*numberMove;
					$("#cube"+ i).animate({ top : position }, 1000);

						 // SELECTION DES BLOCS RENCONTRES

					for (var j = 0; j < frontLine.length; j++) {
						var positionMeet= positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE;
						if (frontLine[j].grid==i && frontLine[j].y< 10 && grid[positionMeet].colorCube<3){
	 					$("#cube"+positionMeet).addClass('take');
	 					$("#cube"+positionMeet).removeClass('noTake');
						if(grid[positionMeet].colorCube==grid[frontLine[j].grid].colorCube){
						updateTake(positionMeet,j,grid,frontLine);
						}
						nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE);
	 					};
				 	};

								 // UPDATE DU DEPLACEMENT SUR L'OBJET GRID

								grid[i].y+=numberMove;
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
});

  $("#left").on("click",function(){
    numberMove=0;blocker=0;
  	var frontLine=[];
  	//ETABLISSEMENT DE LA LIGNE DE FRONT

  		for (var y = 0; y < _GRIDSIZE; y++) {
  			x=15;
  			for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
  				if(grid[i].take==1 && grid[i].x<x && grid[i].y==y){
  				x=grid[i].x;
  				var gridId=i;
  				};
  			};
  			if(x!=15){
  				var newFrontLine = new Frontline(x,y,gridId);
  				frontLine.push(newFrontLine);
  				// console.log(newFrontLine);
  			};
  		};

  	// EVALUATION DU NOMBRE DE MOUVEMENTS
  		while(blocker!=1){
  			for (var i = 0; i < frontLine.length; i++) {
  					if	(frontLine[i].x> 1 && (grid[positionGrid(frontLine[i].x,frontLine[i].y)-1].take==1 || grid[positionGrid(frontLine[i].x,frontLine[i].y)-1].colorCube>2) ) {
  					}
  					else{
  						blocker=1;};
  					};
  			if(blocker!=1){
  				numberMove++;
  				for (var i = 0; i < frontLine.length; i++) {
  					frontLine[i].x-=1;
  				};
  			};
  		};

  			//DEPLACEMENT DU BLOC

  			for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
  				if(grid[i].take==1){
  					position = $("#cube"+ i).css('left');
  					position=parseInt(position)- cubesize*numberMove;
  					$("#cube"+ i).animate({ left : position }, 1000);

  						 // SELECTION DES BLOCS RENCONTRES

  					for (var j = 0; j < frontLine.length; j++) {
  						var positionMeet= positionGrid(frontLine[j].x,frontLine[j].y)-1;
  						if (frontLine[j].grid==i && frontLine[j].x> 1 && grid[positionMeet].colorCube<3){
  						$("#cube"+positionMeet).addClass('take');
  						$("#cube"+positionMeet).removeClass('noTake');
  						if(grid[positionMeet].colorCube==grid[frontLine[j].grid].colorCube){
  						updateTake(positionMeet,j,grid,frontLine);
  						}
  						nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)- 1);
  						};
  					};

  								 // UPDATE DU DEPLACEMENT SUR L'OBJET GRID

  								grid[i].x-=numberMove;
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
  });

    $("#right").on("click",function(){
      numberMove=0;blocker=0;
      var frontLine=[];
      //ETABLISSEMENT DE LA LIGNE DE FRONT

        for (var y = 0; y < _GRIDSIZE; y++) {
          x=-1;
          for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
            if(grid[i].take==1 && grid[i].x>x && grid[i].y==y){
            x=grid[i].x;
            var gridId=i;
            };
          };
          if(x!=-1){
            var newFrontLine = new Frontline(x,y,gridId);
            frontLine.push(newFrontLine);
            // console.log(newFrontLine);
          };
        };

      // EVALUATION DU NOMBRE DE MOUVEMENTS

        while(blocker!=1){
          for (var i = 0; i < frontLine.length; i++) {
              if	(frontLine[i].x< 10 && (grid[positionGrid(frontLine[i].x,frontLine[i].y)+1].take==1 || grid[positionGrid(frontLine[i].x,frontLine[i].y)+1].colorCube>2) ) {
              }
              else{
                blocker=1;};
              };
          if(blocker!=1){
            numberMove++;
            for (var i = 0; i < frontLine.length; i++) {
              frontLine[i].x+=1;
            };
          };
        };

          //DEPLACEMENT DU BLOC

          for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
            if(grid[i].take==1){
              position = $("#cube"+ i).css('left');
              position=parseInt(position)+ cubesize*numberMove;
              $("#cube"+ i).animate({ left : position }, 1000);

                 // SELECTION DES BLOCS RENCONTRES

              for (var j = 0; j < frontLine.length; j++) {
                var positionMeet= positionGrid(frontLine[j].x,frontLine[j].y)+1;
                if (frontLine[j].grid==i && frontLine[j].x< 10 && grid[positionMeet].colorCube<3){
                $("#cube"+positionMeet).addClass('take');
                $("#cube"+positionMeet).removeClass('noTake');
                if(grid[positionMeet].colorCube==grid[frontLine[j].grid].colorCube){
                updateTake(positionMeet,j,grid,frontLine);
                }
                nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)+ 1);
                };
              };

                     // UPDATE DU DEPLACEMENT SUR L'OBJET GRID

                    grid[i].x+=numberMove;
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

    });

});
