<?php global $QS;

try {
    $QS = new PDO("pgsql:host=localhost;dbname=twitter", "postgres", "root");
    // $QS->prepare('SET NAMES "utf8"')->execute();
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}