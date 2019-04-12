<?php class GerRanking
{
  protected $db;

public function __construct($db){$this->setDb($db);}

public function addR(BasicRanking $perso)
{
  $q = $this->db->prepare('INSERT INTO indigoRanking(pseudo,score,thisDay) VALUES(:pseudo,:score,NOW())  ');
$q->bindValue(':pseudo', $perso->pseudo());
$q->bindValue(':score', $perso->score());

  $q->execute();

}

public function getallR(){
  $q = $this->db->query('SELECT * FROM indigoRanking ORDER BY score DESC');
    while ($donnees = $q->fetch(PDO::FETCH_ASSOC)){ $persos[] = new BasicRanking($donnees);}
  return $persos;}

  public function setDb(PDO $db)
{
$this->db = $db;}
};
?>
