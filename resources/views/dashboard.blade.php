<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">                      
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('kunafa.name', 'Kunafa Dashboard') }}</title>

    @vite(['resources/js/kunafa/app.js'])
</head>
<body class="font-sans antialiased">
    <div id="app"></div>
</body>
</html>
