<?php
class BasicRanking
{
  protected $id;
  protected $pseudo;
  protected $score;
  protected $thisDay;

  public function __construct(array $donnees){$this->hydrate($donnees);}

   public function hydrate(array $donnees){
     foreach ($donnees as $key => $value){$method = 'set'.ucfirst($key); if (method_exists($this, $method)){$this->$method($value);}}}

     public function id(){return $this->id;}
     	public function pseudo(){return $this->pseudo;}
         public function score(){return $this->score;}
     	public function thisDay(){return $this->thisDay;}

      public function setId($id){return $this->id=$id;}
      public function setPseudo($pseudo){return $this->pseudo=$pseudo;}
        public function setScore($score){return $this->score=$score;}
    	public function setThisDay($thisDay){return $this->thisDay=$thisDay;}
    };
?>
