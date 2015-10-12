<?php global $QS;

try {
//    $QS = new PDO('mysql:host=localhost;dbname=los', 'root', 'root');
    $QS->query('SET NAMES "utf8"');
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}