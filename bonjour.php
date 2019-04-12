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
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container white">
    <header>
      <div id="message"> <h1>Highscores</h1></div>
    </header>
    <main>
      <table>
        <tr>
          <th>Rang</th>
          <th>Pseudo</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
        <?php $rankings=$gerr->getAllR();$i=1;
        // print_r ($rankings);
        foreach ($rankings as $rank) {
        ?>
        <tr>
          <td><?php echo($i);?></td>
          <td><?php echo($rank->pseudo());?></td>
          <td><?php echo($rank->score());?></td>
          <td><?php echo($rank->thisDay());$i++;?></td>
        </tr> <?php }; ?>
      </table>
      <form method="post" action="index.php">
        <input type="submit"   value="Rejouer?" /></form>
    </main>
    <footer class="row">
    </footer>
  </div>
  <script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script type="text/javascript" src="js/index.js"></script>
</body>
</html>
