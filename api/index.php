<?php

// REQUIRES
require 'vendor/autoload.php';
require 'db-connect.php';

// INCLUDES
include_once('Modeles/UsersModele.php');

// DIVERS
session_start();

$app = new \Slim\Slim();

$app->response()->header('Content-Type', 'application/json');
$app->response()->header('Access-Control-Allow-Origin', '*');
//$app->response()->header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
//$app->response()->header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');

//$app->get('/user/:id', function($id) use ($app) {
//    if (!empty($id)) {
//        UsersModele::changeScore(json_decode($id));
//    }
//});

// ON LANCE L'APPLICATION
$app->run();