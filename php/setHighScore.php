<?php include("sgbdLoader.php");
if(isset($_POST['pseudo'])){
$ranking=new BasicRanking([
  'pseudo' => htmlspecialchars($_POST['pseudo']),
  'score' => $_GET['score']
]);
$gerr->addR($ranking);
print_r ($ranking);
 header('Location: bonjour.php?&score='.$_GET['score']);
};
?>
