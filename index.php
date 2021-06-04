<?php

$lang_code = "fr-FR";
if (isset($_GET["lang"]))
    $lang_code = $_GET["lang"];

?>

<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="utf-8" />
        <title>Mon portfolio — Thomas Léveillé</title>
        
        <!-- external CSS goes below -->
        <link rel="stylesheet" type="text/css" href="/res/css/index.css?v=<?= time() ?>" />
        <link rel="stylesheet" type="text/css" href="/res/css/index.dark.css?v=<?= time() ?>" media="(prefers-color-scheme: dark)" />
    </head>
    <body>
        <div id="topbar"><div id="topbar-nav-menu">
            <a href="#about-me"><span id="about-me-nav-item" class="active">Présentation</span></a><a href="#skills"><span id="skills-nav-item">Compétences</span></a><a href="#projects"><span id="projects-nav-item">Projets</span></a><a href="#experience"><span id="experience-nav-item">Expérience</span></a><a href="#contact"><span id="contact-nav-item">Contact</span></a>
        </div></div>
        <div id="header">
            <div id="header-back"></div>
            <div id="back-wave"><?= file_get_contents("./res/img/back-wave.svg") ?></div>
            <span id="header-title">Développeur Fullstack</span>
            <div id="front-wave"><?= file_get_contents("./res/img/front-wave.svg") ?></div>
    </div>
        <div id="content-flow">Bonjour !
        </div>

        <!-- external JS goes below -->
        <script type="text/javascript" src="/src/js/wavery/wavery.min.js"></script><!-- https://github.com/up2pixy/wavery -->
        <script type="text/javascript" src="/res/js/index.js?v=<?= time() ?>"></script>
    </body>
</html>
