<?php

/**
 * Class TweetsModele
 */
class TweetsModele
{
    /**
     * Table visée
     *
     * @var string
     */
    private static $table = 'TWEET';

    /**
     * Retourne tous les tweets
     *
     * @return array
     */
    public static function getAllTweet()
    {
        global $QS;

        $qry = $QS->prepare("SELECT id, description, media, id_utilisateur, nb_like, heure_publication FROM " . self::$table);
        $qry->execute();

        $tweets = $qry->fetchAll();
        foreach($tweets as &$tweet) {
            $tweet['utilisateur'] = self::getUserByTweet($tweet['id_utilisateur']);
        }

        return $tweets;
    }

    /**
     * Retourne tous le tweet en parametre
     *
     * @return array
     */
    public static function getTweetById($id)
    {
        global $QS;

        $qry = $QS->prepare("SELECT id, description, media, id_utilisateur, nb_like, heure_publication FROM " . self::$table . " WHERE id = $id");
        $qry->execute();

        $tweet = $qry->fetchAll()[0];
        $tweet['utilisateur'] = self::getUserByTweet($tweet['id_utilisateur']);

        return $tweet;
    }

    /**
     * Retourne le tweet correspondant à l'idUser passé en paramètre
     *
     * @param $id
     * @return array
     */
    public static function getTweetByIdUser($id)
    {
        global $QS;

        $qry = $QS->prepare("SELECT id, description, media, nb_like, heure_publication FROM " . self::$table . " WHERE id_utilisateur = $id");
        $qry->execute();

        return $qry->fetchAll();
    }

    /**
     * Modifie les informations d'un tweet par son id et par les infos le correspondant, passés en paramètre
     *
     * @param $id
     * @param $infos
     */
    public static function modifyTweet($id, $infos)
    {
        global $QS;

        $qry = $QS->prepare("UPDATE " . self::$table . ' SET tweet = ' . $infos->tweet . ', media = ' .$infos->media. ' WHERE id = '. $id);
        $qry->execute();
    }

    /**
     * Supprime le tweet correspondant à l'id passé en paramètre
     *
     * @param $id
     */
    public static function deleteTweet($id)
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
    public static function insertTweet($user)
    {
        global $QS;

        $qry = $QS->prepare("INSERT INTO " . self::$table . ' (nom, prenom, ville,email,img_profil,password,amis) VALUES ("' .$user->nom. '", "' .$user->prenom. '", "' .$user->ville. '", "' .$user->email. '" , "' .$user->img_profil. '" ,"' .hash("sha512", $user->password). '", "' .$user->amis. '", "")');
        $qry->execute();
    }

    public static function getUserByTweet($id)
    {
        global $QS;

        $qry = $QS->prepare("SELECT id, nom, prenom, img_profil FROM UTILISATEUR WHERE id = $id");
        $qry->execute();

        return $qry->fetchAll();
    }
}