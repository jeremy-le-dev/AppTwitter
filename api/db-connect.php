<?php global $QS;

try {
    $QS = new PDO('pgsql:dbname=twitter;user=postgres;password=root;host=localhost');
    $QS->query('SET NAMES "utf8"');
    /*$result = array();
     foreach ($QS->query("SELECT * FROM utilisateur") as $row) {
            $result[] = $row;
        }
        var_dump($result);
    die; */
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}