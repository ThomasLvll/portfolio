<?php

$lang_code = "fr-FR";
if (isset($_GET["lang"]))
    $lang_code = $_GET["lang"];

$lang_file_path = "./res/data/locale/$lang_code.json";
$lang_file_content = file_get_contents($lang_file_path);
$LANG = json_decode($lang_file_content);

$DATA = json_decode(file_get_contents("./res/data/data.json"));

?>

<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="utf-8" />
        <title><?= $LANG->general->page_title ?></title>
        
        <!-- external CSS goes below -->
        <link rel="stylesheet" type="text/css" href="/res/css/index.css?v=<?= time() ?>" />
        <link rel="stylesheet" type="text/css" href="/res/css/index.dark.css?v=<?= time() ?>" media="(prefers-color-scheme: dark)" />
        <link rel="stylesheet" type="text/css" href="/res/css/index.1024px.css?v=<?= time() ?>" media="(max-width: 1024px)" />
    </head>
    <body>
        <div id="topbar"><div id="topbar-nav-menu">
            <a href="#about-me"><span id="about-me-nav-item" class="active"><?=
                $LANG->sections->about_me->nav_menu
            ?></span></a><a href="#skills"><span id="skills-nav-item"><?=
                $LANG->sections->skills->nav_menu
            ?></span></a><a href="#projects"><span id="projects-nav-item"><?=
                $LANG->sections->projects->nav_menu
            ?></span></a><a href="#experience"><span id="experience-nav-item"><?=
                $LANG->sections->experience->nav_menu
            ?></span></a><a href="#contact"><span id="contact-nav-item"><?=
                $LANG->sections->contact->nav_menu
            ?></span></a>
        </div></div>
        <div id="header">
            <div id="header-back"></div>
            <div id="back-wave"><?= file_get_contents("./res/img/back-wave.svg") ?></div>
            <span id="header-title"><?= $LANG->general->header_title ?></span>
            <div id="front-wave"><?= file_get_contents("./res/img/front-wave.svg") ?></div>
        </div>
        <div id="content-flow">
            <div id="about-me">
                <div class="anchor"><?= $LANG->sections->about_me->anchor ?></div>
                <div id="profile-picture"></div>
                <div id="profile-description"><span class="title"><?=
                        $LANG->sections->about_me->profile_title
                    ?></span><span class="content"><?=
                        $LANG->sections->about_me->profile_description
                    ?></span><div id="social-links"><?php
                    foreach ($DATA->social_links as $k => $v) {
                    ?>
                        <a target="_blank" href="<?=
                            $DATA->social_links->$k->url
                        ?>"><span class="icon" style="background-image: url('<?=
                            $DATA->social_links->$k->icon
                        ?>');" tooltip="<?=
                            $LANG->social_links->$k->tooltip
                        ?>"></span></a>
                    <?php
                    }
                    ?>
                    </div>
                </div>
            </div>
            <div id="skills">
                <div class="anchor"><?= $LANG->sections->skills->anchor ?></div>
                <?php foreach ($DATA->skills as $skill_row) {
                ?>
                    <div class="skill-row">
                    <?php foreach ($skill_row as $k => $v) {
                    ?>
                        <div class="skill"><div class="icon" style="background-image: url('<?=
                            $v->icon
                        ?>');"></div><span class="title"><?=
                            $LANG->skills->$k->title
                        ?></span><span class="content"><?=
                            $LANG->skills->$k->description
                        ?></span></div>
                    <?php
                    }
                    ?>
                    </div>
                <?php
                }
                ?>
            </div>
        </div>

        <!-- external JS goes below -->
        <!-- <script type="text/javascript" src="/src/js/wavery/wavery.min.js"></script> https://github.com/up2pixy/wavery -->
        <script type="text/javascript" src="/res/js/index.js?v=<?= time() ?>"></script>
    </body>
</html>
