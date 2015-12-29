<?php

// REQUIRES
require 'vendor/autoload.php';
require 'db-connect.php';

// INCLUDES
include_once('Modeles/UsersModele.php');
include_once('Modeles/TweetsModele.php');

// DIVERS
session_start();

$app = new \Slim\Slim();

$app->response()->header('Content-Type', 'application/json');
$app->response()->header('Access-Control-Allow-Origin', '*');
$app->response()->header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
$app->response()->header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');

// ACCUEIL
$app->get('/', function() use ($app) {
    echo "ACCUEIL :-)";
});

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