<?php

/**
 * Class UsersModele
 */
class UsersModele
{
    /**
     * Table visée
     *
     * @var string
     */
    private static $table = 'utilisateur';

    /**
     * Retourne tous les utilisateurs
     *
     * @return array
     */
    public static function getAllUsers()
    {
        global $QS;

        $result = array();

        foreach ($QS->query("SELECT * FROM " . self::$table) as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Retourne l'utilisateur correspondant à l'id passé en paramètre
     *
     * @param $id
     * @return array
     */
    public static function getUserById($id)
    {
        global $QS;

        $result = array();

        foreach ($QS->query("SELECT * FROM " . self::$table . " WHERE id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Modifie les informations d'un utilisateur par son id et par les infos le correspondant, passés en paramètre
     *
     * @param $id
     * @param $infos
     */
    public static function modifyUser($id, $infos)
    {
        global $QS;

        $QS->query("UPDATE " . self::$table . ' SET name = '. $infos->name .', email = '.$infos->email.', password ='. $infos->password.', ville ='. $infos->ville.', img_profil ='. $infos->img_profil .' WHERE id = '. $id);
    }

    /**
     * Supprime l'utilisateur correspondant à l'id passé en paramètre
     *
     * @param $id
     */
    public static function deleteUser($id)
    {
        global $QS;

        $QS->query("DELETE FROM " . self::$table . ' WHERE id = '.$id);
    }

    /**
     * Ajoute l'utilisateur passé en paramètre dans la base de données et envoi la confirmation d'inscription
     *
     * @param $user
     */
    public static function insertUser($user)
    {
        global $QS;

        $QS->query("INSERT INTO " . self::$table . ' (nom, prenom, ville,email,img_profil,password,amis) VALUES ("' .$user->nom. '", "' .$user->prenom. '", "' .$user->ville. '", "' .$user->email. '" , "' .$user->img_profil. '" ,"' .hash("sha512", $user->password). '", "' .$user->amis. '", "")');

        $passage_ligne  = "\n";
        $mail           = 'jeremie-e@hotmail.fr';
        $message_html   = "Welcome to Like or Swipe !<br /><br />";
        $message_html  .= "Your username : <b>$user->username</b><br />";
        $message_html  .= "Your email : <b>$user->email</b><br />";
        $message_html  .= "Your password : <b>$user->password</b><br />";
        $message_html  .= "<br /><br />Pour plus de renseignements, rendez vous sur la page <a href='http://youjizz.com'>contact</a> de notre site.";
        $boundary       = "-----=" . md5(rand());
        $sujet          = "Welcome to Like or Swipe !";
        $header         = "From: \"Like or Swipe\"<noreply@likeorswipe.com>" . $passage_ligne;
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
}

?>