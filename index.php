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

// lang priority (descending):
// 1. URL ($_GET)
// 2. session ($_SESSION)
// 3. browser (headers)

// appearance priority (descending):
// 1. URL ($_GET)
// 2. session ($_SESSION)
// default: system

$lang_code = data("default_locale");
if (isset($_GET["lang"])) {
    $get_lang = str_replace("-", "_", $_GET["lang"]);
    if (isset($DATA->locales->$get_lang)) {
        $lang_code = $_GET["lang"];
        $_SESSION["lang_code"] = $lang_code;
    }
} elseif (isset($_SESSION["lang_code"])) {
    $session_lang = str_replace("-", "_", $_SESSION["lang_code"]);
    if (isset($DATA->locales->$session_lang))
        $lang_code = $_SESSION["lang_code"];
}

$appearance = data("default_appearance");
if (isset($_GET["appearance"])) {
    $get_appearance = $_GET["appearance"];
    if (isset($DATA->appearance->$get_appearance)) {
        $appearance = $get_appearance;
        $_SESSION["appearance"] = $appearance;
    }
} elseif (isset($_SESSION["appearance"])) {
    $session_appearance = $_SESSION["appearance"];
    if (isset($DATA->appearance->$session_appearance))
        $appearance = $session_appearance;
}


if (isset($_GET["popup"])) {
    $_SESSION["view_popup"] = $_GET["popup"];
    header("Location: /");
    exit();
}


$VARS = [
    "age" => "20",
    "/link" => "</a>"
];

foreach (data("links") as $id => $link) {
    $VARS["link_$id"] = "<a target='_blank' href='$link'>";
}

function filter($str) {
    global $VARS;
    $removed_suffixes = [ " ", "\n", "\r" ];
    
    foreach ($VARS as $var => $value)
        $str = str_replace("[[$var]]", $value, $str);
    
    foreach ($removed_suffixes as $suffix)
        if (substr($str, - strlen($suffix)) === $suffix)
            $str = substr($str, 0, - strlen($suffix));
    return $str;
}

function replace_vars($str, $vars) {
    foreach ($vars as $var => $value)
        $str = str_replace("%$var%", $value, $str);
}

function lang(...$args) {
    global $lang_code;
    $res = "./res/data/locale";
    foreach ($args as $arg) {
        $res .= "/$arg";
    }
    $res .= "/$lang_code";
    return filter(file_get_contents($res));
}

?>
<!DOCTYPE html>
<html lang="<?= $lang_code ?>">
    <head>
        <meta charset="utf-8" />
        <title><?= lang("general", "page_title") ?></title>
        
        <!-- external CSS goes below -->
        <link id="default-style" rel="stylesheet" type="text/css" href="/res/css/index.css?v=<?= time() ?>" />
        <link class="appearance" data-appearance="dark" rel="stylesheet" type="text/css"<?= ($appearance === "dark") ? "" : " disabled" ?> href="/res/css/index.dark.css?v=<?= time() ?>" />
        <link class="appearance" data-appearance="system" rel="stylesheet" type="text/css"<?= ($appearance === "system") ? "" : " disabled" ?> href="/res/css/index.dark.css?v=<?= time() ?>" media="(prefers-color-scheme: dark)" />
        <link id="mobile-style" rel="stylesheet" type="text/css" href="/res/css/index.1024px.css?v=<?= time() ?>" media="(max-width: 1024px)" />
    </head>
    <body>
        <div id="topbar"><div id="topbar-nav-menu">
            <a onclick="openPopup('options-menu');"><span id="options-menu-nav-item" class="icon" style="background-image: url('/res/img/icon/settings.svg');"></span></a>
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
                        lang("about_me", "profile_title")
                    ?></span><span class="content"><?=
                        lang("about_me", "profile_description")
                    ?></span><div id="social-links"><?php
                    foreach (data("social_links") as $k => $v) {
                    ?>
                        <a target="_blank" href="<?=
                            data("social_links", $k, "url")
                        ?>"><span class="icon dark-invert" style="background-image: url('<?=
                            data("social_links", $k, "icon")
                        ?>');" title="<?=
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
        <div data-popup="options-menu" class="popup-window-filter<?=
            (isset($_SESSION["view_popup"]) && $_SESSION["view_popup"] === "options-menu")
                ? " active"
                : ""
        ?>"></div>
        <div id="options-menu" class="popup<?=
            (isset($_SESSION["view_popup"]) && $_SESSION["view_popup"] === "options-menu")
                ? " active"
                : ""
        ?>">
            <div>
                <div><?= lang("options", "locale", "title") ?></div>
                <div>
                    <div>
                        <?php foreach (data("locales") as $k => $v) {
                        $key = str_replace("_", "-", $k);
                        ?>
                        <a href="?lang=<?= $key ?>&popup=options-menu">
                            <span class="<?=
                                ($key === $lang_code) ? "active" : ""
                            ?>"><span class="icon" style="background-image: url('<?=
                                $v->icon
                            ?>');"></span><?=
                                $v->title
                            ?></span>
                        </a>
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
            <div>
                <div><?= lang("options", "appearance", "title") ?></div>
                <div>
                    <div>
                        <?php foreach (data("appearance") as $k => $v) {
                        ?>
                        <a href="?appearance=<?= $k ?>&popup=options-menu">
                            <span class="<?=
                                ($k === $appearance) ? "active" : ""
                            ?>"><span class="icon dark-invert" style="background-image: url('<?=
                                $v->icon
                            ?>');"></span><?=
                                lang("options", "appearance", $k)
                            ?></span>
                        </a>
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- external JS goes below -->
        <!-- <script type="text/javascript" src="/src/js/wavery/wavery.min.js"></script> https://github.com/up2pixy/wavery -->
        <script type="text/javascript" src="/res/js/index.js?v=<?= time() ?>"></script>
    </body>
</html>
<?php

if (isset($_SESSION["view_popup"]))
    unset($_SESSION["view_popup"]);

?>
