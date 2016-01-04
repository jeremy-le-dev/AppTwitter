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
    private static $table = 'UTILISATEUR';

    /**
     * Retourne tous les utilisateurs
     *
     * @return array
     */
    public static function getAllUsers()
    {
        global $QS;

        $qry = $QS->prepare("SELECT id, nom, prenom, ville, email, img_profil, date_creation, amis FROM " . self::$table);
        $qry->execute();

        return $qry->fetchAll();
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

        $qry = $QS->prepare("SELECT id, nom, prenom, ville, email, img_profil, date_creation, amis FROM " . self::$table . " WHERE id = $id");
        $qry->execute();

        return $qry->fetchAll();
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

        $qry = $QS->prepare("UPDATE " . self::$table . ' SET name = '. $infos->name .', email = '.$infos->email.', password ='. $infos->password.', ville ='. $infos->ville.', img_profil ='. $infos->img_profil .' WHERE id = '. $id);
        $qry->execute();
    }

    /**
     * Supprime l'utilisateur correspondant à l'id passé en paramètre
     *
     * @param $id
     */
    public static function deleteUser($id)
    {
        global $QS;

        $qry = $QS->prepare("DELETE FROM " . self::$table . ' WHERE id = '.$id);
        $qry->execute();
    }

    /**
     * Ajoute l'utilisateur passé en paramètre dans la base de données et envoi la confirmation d'inscription
     *
     * @param $user
     */
    public static function insertUser($nom, $prenom, $ville, $email, $img_profil, $password)
    {
        global $QS;

        $qry = $QS->prepare("INSERT INTO " . self::$table . " (nom, prenom, ville, email, img_profil, password, date_creation) VALUES ('" .$nom. "', '" .$prenom. "', '" .$ville. "', '" .$email. "'' , '" .$img_profil. "'' ,'" .hash("sha512", $password). "', 'NOW())'");
        $qry->execute();
    }

    public static function canConnexion($email, $password)
    {
        global $QS;

        $qry = $QS->prepare("SELECT id, nom, prenom, ville, email, img_profil, date_creation, amis FROM " . self::$table . " WHERE email = '$email' AND password = '" . hash("sha512", $password) . "'");
        $qry->execute();

        return $qry->fetchAll();
    }
}