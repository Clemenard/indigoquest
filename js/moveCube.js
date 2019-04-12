function moveCube(black,position,keycode){
	  numberMove=0;blocker=0;
		var frontLine=[];

	  //ETABLISSEMENT DE LA LIGNE DE FRONT

	    for (var j = 0; j < _GRIDSIZE; j++) {
				if(keycode==38 || keycode==39){y=15;}
				else if (keycode==37 || keycode==40) {y=-1;}

	      for (var i = 0; i < _GRIDSIZE*_GRIDSIZE; i++) {
	    		if(grid[i].take==1 && grid[i].y>y && grid[i].x==x){
					y=grid[i].y;
					var gridId=i;
					};
				};
				if(y!=-1){
					var newFrontLine = new Frontline(x,y,gridId);
					frontLine.push(newFrontLine);
					console.log(newFrontLine);
				};
			};

	  // EVALUATION DU NOMBRE DE MOUVEMENTS

			while(blocker!=1){
				for (var i = 0; i < frontLine.length; i++) {
					if	(frontLine[i].y< 10 && (grid[positionGrid(frontLine[i].x,frontLine[i].y)+_GRIDSIZE].take==1 || grid[positionGrid(frontLine[i].x,frontLine[i].y)+_GRIDSIZE].colorCube>2) ) {

						console.log("move");
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
						position=parseInt(position)+ _CUBESIZE*numberMove;
						$("#cube"+ i).animate({ top : position }, 1000);

							 // SELECTION DES BLOCS RENCONTRES

						for (var j = 0; j < frontLine.length; j++) {
							console.log(grid[positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE].colorCube);
							console.log(positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE);
				 			if (frontLine[j].grid==i && frontLine[j].y< 10 && grid[positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE].colorCube<3){
		 					$("#cube"+(positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE)).addClass('take atop');
		 					$("#cube"+(positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE)).removeClass('noTake');
							nextTake.push(positionGrid(frontLine[j].x,frontLine[j].y)+ _GRIDSIZE);
		 					};
					 	};

									 // UPDATE DU DEPLACEMENT SUR L'OBJET GRID

									grid[i].y+=numberMove;
					};
				};
		for (var j = 0; j < nextTake.length; j++) {
			grid[nextTake[j]].take=1;
		};
		nextTake=[];
	};
