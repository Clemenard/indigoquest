<?php
include("sgbdLoader.php");

?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Indigo quest</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="jquery-ui.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container white">
    <main class="row">
      <div class="col-md-2 col-12">
        <ul class="wrap ">
          <li><a href="bonjour.php">Rankings</a></li>
          <li>Son <strong id="sound">Off</strong></li>
        </ul>
      </div>
      <div class="">
        <header class="row justify-content-around">
          <div id="message" class="col-11"> <h1>Indigo Quest</h1></div>
        </header>

<div class="row " id="playground"></div>
<footer class="row col-11">
  <p class="col-6">Nombre de tours restant : <span id="nbTurn">30</span></p>
  <p class="col-6">Score : <span id="score">0</span></p>
  <div class="keypad row">
    <div class="cube"></div>
  <button class="keytouch" id="up">Up</button>
  <button class="keytouch" id="left">Left</button>
  <button class="keytouch" id="down">Down</button>
  <button class="keytouch" id="right">Right</button>
    <button id="colorPlayground">Changer la grille</button>
  </div>
</footer>
      </div>
<div class="col-md-2 col-12">
  <p class="wrap"> Déplacez le bloc noir à l'aide des touches directionelles pour accrocher les blocs colorés. Le but est de combiner des blocs de même couleur pour les effacer et marquer des points. Vous avez 30 tours pour faire le plus haut score possible.</p>
</div>
    </main>
  </div>
  <script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
  <!-- <script type="text/javascript" src="js/Playground.class.js"></script> -->
<script src="jqueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/newIndex.js"></script>
</body>
</html>
