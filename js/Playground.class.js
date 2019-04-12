function Playground(_GRIDSIZE,cubesize) {
  this.playgroundSize=function(a, b){
    return   size=(a*b+6);}
  let grid=[];
    $('#playground').css("width",this.playgroundSize(cubesize,_GRIDSIZE)+'px');
    $('#playground').css("height",this.playgroundSize(cubesize,_GRIDSIZE)+'px');

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
  };
      return grid;
};
