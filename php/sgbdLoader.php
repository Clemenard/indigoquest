<?php try
{
	$db = new PDO('mysql:host=cl1-sql20;dbname=img76751;charset=utf8', 'img76751', 'Oitreza13');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}
function chargerClasse($classe){require $classe . '.class.php';}
spl_autoload_register('chargerClasse');
$gerr = new GerRanking($db);
?>
