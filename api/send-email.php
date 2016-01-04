<?php

if (isset($_POST['email']) && !empty($_POST['email'])) {
    $passage_ligne  = "\n";
    $mail           = 'jeremyfroment@yahoo.fr';
    $message_html   = "L'utilisateur correspondant à l'adresse email <b>" . $_POST['email'] . "</b> demande une réinitialisation de son mot de passe.";
    $boundary       = "-----=" . md5(rand());
    $sujet          = "Réinitialisation de mot de passe";
    $header         = "From: \"M2L\"<M2L>" . $passage_ligne;
    $header        .= "MIME-Version: 1.0" . $passage_ligne;
    $header        .= "Content-Type: multipart/alternative;" . $passage_ligne . " boundary=\"$boundary\"" . $passage_ligne;
    $message        = $passage_ligne . "--" . $boundary . $passage_ligne;
    $message       .= "Content-Type: text/html; charset=\"UTF-8\"" . $passage_ligne;
    $message       .= "Content-Transfer-Encoding: 8bit" . $passage_ligne;
    $message       .= $passage_ligne . $message_html . $passage_ligne;
    $message       .= $passage_ligne . "--" . $boundary . "--" . $passage_ligne;
    $message       .= $passage_ligne . "--" . $boundary . "--" . $passage_ligne;

    mail($mail, $sujet, $message, $header);
}

Header('Location: ../index.html');

