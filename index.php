<?php

session_start();

$DATA = json_decode(file_get_contents("./res/data/data.json"));

function data(...$args) {
    global $DATA;
    $res = $DATA;
    foreach ($args as $arg) {
        $res = $res->$arg;
    }
    return $res;
}

$lang_code = data("default_locale");
if (isset($_GET["lang"])) {
    $get_lang = str_replace("-", "_", $_GET["lang"]);
    if (isset($DATA->locales->$get_lang))
        $lang_code = $_GET["lang"];
}


$VARS = [
    "age" => "20",
    "/link" => "</a>"
];

foreach (data("links") as $id => $link) {
    $VARS["link_$id"] = "<a target='_blank' href='$link'>";
}

function replace_vars($str) {
    global $VARS;
    foreach ($VARS as $var => $value)
        $str = str_replace("[[$var]]", $value, $str);
    return $str;
}

function lang(...$args) {
    global $lang_code;
    $res = "./res/data/locale";
    foreach ($args as $arg) {
        $res .= "/$arg";
    }
    $res .= "/$lang_code";
    return replace_vars(file_get_contents($res));
}

?>

<!DOCTYPE html>
<html lang="<?= $lang_code ?>">
    <head>
        <meta charset="utf-8" />
        <title><?= lang("general", "page_title") ?></title>
        
        <!-- external CSS goes below -->
        <link rel="stylesheet" type="text/css" href="/res/css/index.css?v=<?= time() ?>" />
        <link rel="stylesheet" type="text/css" href="/res/css/index.dark.css?v=<?= time() ?>" media="(prefers-color-scheme: dark)" />
        <link rel="stylesheet" type="text/css" href="/res/css/index.1024px.css?v=<?= time() ?>" media="(max-width: 1024px)" />
    </head>
    <body>
        <div id="topbar"><div id="topbar-nav-menu">
            <a href="#about-me"><span id="about-me-nav-item" class="active"><?=
                lang("sections", "about_me", "nav_menu")
            ?></span></a><a href="#skills"><span id="skills-nav-item"><?=
                lang("sections", "skills", "nav_menu")
            ?></span></a><a href="#projects"><span id="projects-nav-item"><?=
                lang("sections", "projects", "nav_menu")
            ?></span></a><a href="#experience"><span id="experience-nav-item"><?=
                lang("sections", "experience", "nav_menu")
            ?></span></a><a href="#contact"><span id="contact-nav-item"><?=
                lang("sections", "contact", "nav_menu")
            ?></span></a>
        </div></div>
        <div id="header">
            <div id="header-back"></div>
            <div id="back-wave"><?= file_get_contents("./res/img/back-wave.svg") ?></div>
            <span id="header-title"><?= lang("general", "header_title") ?></span>
            <div id="front-wave"><?= file_get_contents("./res/img/front-wave.svg") ?></div>
        </div>
        <div id="content-flow">
            <div id="about-me">
                <div class="anchor"><?= lang("sections", "about_me", "anchor") ?></div>
                <div id="profile-picture"></div>
                <div id="profile-description"><span class="title"><?=
                        lang("sections", "about_me", "profile_title")
                    ?></span><span class="content"><?=
                        lang("sections", "about_me", "profile_description")
                    ?></span><div id="social-links"><?php
                    foreach (data("social_links") as $k => $v) {
                    ?>
                        <a target="_blank" href="<?=
                            data("social_links", $k, "url")
                        ?>"><span class="icon" style="background-image: url('<?=
                            data("social_links", $k, "icon")
                        ?>');" tooltip="<?=
                            lang("social_links", $k, "tooltip")
                        ?>"></span></a>
                    <?php
                    }
                    ?>
                    </div>
                </div>
            </div>
            <div id="skills">
                <div class="anchor"><?= lang("sections", "skills", "anchor") ?></div>
                <?php foreach (data("skills") as $skill_row) {
                ?>
                    <div class="skill-row">
                        <?php foreach ($skill_row as $k => $v) {
                        ?>
                        <div class="skill"><div class="icon" style="background-image: url('<?=
                            $v->icon
                        ?>');"></div><span class="title"><?=
                            lang("skills", $k, "title")
                        ?></span><span class="content"><?=
                            lang("skills", $k, "description")
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
