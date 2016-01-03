<?php

// DIVERS
session_start();

// REQUIRES
require 'vendor/autoload.php';
require 'db-connect.php';

// INCLUDES
include_once('Modeles/UsersModele.php');
include_once('Modeles/TweetsModele.php');

$app = new \Slim\Slim();

$app->response()->header('Content-Type', 'application/json');
$app->response()->header('Access-Control-Allow-Origin', '*');
$app->response()->header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
$app->response()->header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');

/**********************
 *     UTILISATEURS   *
 **********************/

// Retourne l'utilisateur :id
$app->get('/user/:id', function($id) use ($app) {
    if (!empty($id)) {
        echo json_encode(UsersModele::getUserById($id));
    }
});

// Retourne tous les utilisateurs
$app->get('/users', function() use ($app) {
    echo json_encode(UsersModele::getAllUsers());
});

// Connexion
$app->get('/connexion/:email/:password', function($email, $password) use ($app) {
    $user = UsersModele::canConnexion($email, $password);

    if (count($user) > 0) {
        $_SESSION['user'] = $user;
    }

    echo json_encode($user);
});

// Deconnexio,
$app->get('/deconnexion', function() use ($app) {
    session_destroy();
    unset($_SESSION['user']);

    echo json_encode((empty($_SESSION['user'])) ? true : false);
});

// Session
$app->get('/session', function() use ($app) {
    if (isset($_SESSION['user'])) {
        echo json_encode($_SESSION['user']);
    } else {
        echo json_encode(array());
    }
});

/**********************
 *       TWEETS       *
 **********************/

// Retourne tous les tweets
$app->get('/tweets', function() use ($app) {
    echo json_encode(TweetsModele::getAllTweet());
});

// Retourne le tweet passé en paramètre
$app->get('/tweets/:id', function($id) use ($app) {
    echo json_encode(TweetsModele::getTweetById($id));
});

// Retourne tous les tweets d'un utilisateur
$app->get('/tweets/user/:id', function($id) use ($app) {
    echo json_encode(TweetsModele::getTweetByIdUser($id));
});

// ON LANCE L'APPLICATION
$app->run();