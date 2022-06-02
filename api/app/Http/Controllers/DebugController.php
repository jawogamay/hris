<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DebugController extends Controller
{
    public function index()
    {
        $arr = [
            "DB_HOST" => env('DB_HOST'),
            "DB_PORT" => env('DB_PORT'),
            "DB_DATABASE" => env('DB_DATABASE'),
            "DB_USERNAME" => env('DB_USERNAME'),
            "DB_PASSWORD" => env('DB_PASSWORD'),
            "EDAMAM_ID" => env('EDAMAM_ID'),
            "EDAMAM_KEY" => env('EDAMAM_KEY'),
            "MAIL_HOST" => env('MAIL_HOST'),
            "MAIL_PORT" => env('MAIL_PORT'),
            "MAIL_FROM_ADDRESS" => env('MAIL_FROM_ADDRESS'),
            "MAIL_FROM_NAME" => env('MAIL_FROM_NAME'),
            "MAILGUN_SECRET" => env('MAILGUN_SECRET'),
            "MAILGUN_DOMAIN" => env('MAILGUN_DOMAIN'),
            "FE_APP_URL" => env('FE_APP_URL'),
            "MAIL_MAILER" => env('MAIL_MAILER'),
            "QUEUE_CONNECTION" => env('QUEUE_CONNECTION'),
            "SQS_QUEUE" => env('SQS_QUEUE'),
            "AWS_ACCESS_KEY_ID" => env('AWS_ACCESS_KEY_ID'),
            "AWS_SECRET_ACCESS_KEY" => env('AWS_SECRET_ACCESS_KEY'),
            "AWS_SESSION_TOKEN" => env('AWS_SESSION_TOKEN'),
            "AWS_DEFAULT_REGION" => env('AWS_DEFAULT_REGION')
        ];

        return $arr;
    }
}