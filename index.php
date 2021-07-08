<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "vendor/autoload.php";


function check_array_keys($keys, $array) {
    foreach ($keys as $k)
        if (! array_key_exists($k, $array) || mb_strlen($_POST[$k]) < 1)
            return false;
    return true;
}

function replace_vars($str, $vars) {
    foreach ($vars as $var => $value)
        $str = str_replace("[[$var]]", $value, $str);
    return $str;
}

session_start();

if (array_key_exists("contact", $_GET)) {
    if (check_array_keys(array("contact-form-name", "contact-form-email", "contact-form-message"), $_POST)) {
        $mail_data = json_decode(file_get_contents("./res/data/.hidden/email.json"));
        $mail = new PHPMailer(true);
        $mail->SMTPDebug = 0;
        $mail->CharSet = "UTF-8";
        $mail->Encoding = "base64";
        $mail->Host = $mail_data->host;
        $mail->Username = $mail_data->username;
        $mail->Password = $mail_data->password;
        $mail->Port = $mail_data->port;

        $mail->setFrom($mail_data->from_address, $mail_data->from_name);
        $mail->addAddress($mail_data->recipient);
        $mail->addReplyTo($_POST["contact-form-email"], $_POST["contact-form-name"]);
        
        $mail->isHTML(true);
        $mail->Subject = "Demande de contact depuis le portfolio";
        $mail->Body = replace_vars(file_get_contents("./res/mail/contact.html"), array(
            "domain" => $_SERVER["HTTP_HOST"],
            "sender_name" => $_POST["contact-form-name"],
            "sender_email" => $_POST["contact-form-email"],
            "sender_message" => $_POST["contact-form-message"]
        ));
        
        $mail_result = $mail->send();
        $_SESSION["contact_mail_result"] = $mail_result;
        header("Location: /#contact-form");
        exit();
    }
}

$DATA = json_decode(file_get_contents("./res/data/data.json"));

function data(...$args) {
    global $DATA;
    $res = $DATA;
    foreach ($args as $arg)
        $res = $res->$arg;
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


if (count($_GET) > 0) {
    if (isset($_GET["popup"]))
        $_SESSION["view_popup"] = $_GET["popup"];

    if (isset($_GET["y"]))
        $_SESSION["scroll_y"] = intval($_GET["y"]);
    
    header("Location: /");
    exit();
}


$VARS = [
    "age" => 20,
    "/link" => "</a>"
];

foreach (data("links") as $id => $link) {
    $VARS["link_$id"] = "<a target='_blank' href='$link'>";
}

function filter($str) {
    global $VARS;
    $removed_suffixes = [ " ", "\n", "\r" ];
    
    $str = replace_vars($str, $VARS);
    
    foreach ($removed_suffixes as $suffix)
        if (substr($str, - strlen($suffix)) === $suffix)
            $str = substr($str, 0, - strlen($suffix));
    return $str;
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
	<style id="php-generated-css" type="text/css">
:root {
    --light-github-contribution-chart: url('/res/img/github-contribution-chart/light.svg?v=<?= date("Y-m-d") ?>');
    --dark-github-contribution-chart: url('/res/img/github-contribution-chart/dark.svg?v=<?= date("Y-m-d") ?>');
}
    </style>
        <link id="default-style" rel="stylesheet" type="text/css" href="/res/css/index.css?v=<?= time() ?>" />
        <link class="appearance" data-appearance="dark" rel="stylesheet" type="text/css"<?= ($appearance === "dark") ? "" : " disabled" ?> href="/res/css/index.dark.css?v=<?= time() ?>" />
        <link class="appearance" data-appearance="system" rel="stylesheet" type="text/css"<?= ($appearance === "system") ? "" : " disabled" ?> href="/res/css/index.dark.css?v=<?= time() ?>" media="(prefers-color-scheme: dark)" />
        <link id="mobile-style" rel="stylesheet" type="text/css" href="/res/css/index.1024px.css?v=<?= time() ?>" media="screen and (max-width: 1024px)" />
    </head>
    <body>
        <div id="topbar"><div id="topbar-nav-menu">
            <a id="options-menu-nav-item" onclick="openPopup('options-menu');"><span id="options-menu-locale-nav-item" class="icon" style="
                background-image: url('<?= data("locales", str_replace("-", "_", $lang_code), "icon") ?>');
            "></span> / <span id="options-menu-appearance-nav-item" class="icon dark-invert" style="
                background-image: url('<?= data("appearance", $appearance, "icon") ?>');
            "></span></a>
            <a href="#about-me" id="about-me-nav-item"><span><?=
                lang("sections", "about_me", "nav_menu")
            ?></span></a><a href="#skills" id="skills-nav-item"><span><?=
                lang("sections", "skills", "nav_menu")
            ?></span></a><a href="#projects" id="projects-nav-item"><span><?=
                lang("sections", "projects", "nav_menu")
            ?></span></a><a href="#experience" id="experience-nav-item"><span><?=
                lang("sections", "experience", "nav_menu")
            ?></span></a><a href="#contact" id="contact-nav-item"><span><?=
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
                <div class="container">
                    <div id="profile-flip-card" class="flip-card">
                        <div class="flip-card-inner">
                            <div id="profile-picture" class="flip-card-front"></div>
                            <div id="github-contribution-chart" class="flip-card-back"></div>
                        </div>
                    </div>
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
            </div>
            <div id="skills">
                <div class="anchor"><?= lang("sections", "skills", "anchor") ?></div>
                <div class="container">
                    <?php foreach (data("skills") as $skill_row) {
                    ?>
                        <div class="card-row">
                            <?php foreach ($skill_row as $k => $v) {
                            ?>
                            <div class="card" id="skill-<?=
                                $k
                            ?>"><div class="icon" style="background-image: url('<?=
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
            <div id="projects">
                <div class="anchor"><?= lang("sections", "projects", "anchor") ?></div>
                <div class="container">
                    <?php foreach (data("projects") as $k => $v) {
                    ?>
                        <div class="side-card" id="project-<?=
                            $k
                        ?>"><div class="header"><span class="title"><span class="status-indicator left <?=
                            $v->status
                        ?>" title="<?=
                            lang("status", $v->status)
                        ?>"></span><?=
                            lang("projects", $k, "title")
                        ?></span><div class="illustration" style="background-image: url('<?=
                            $v->illustration
                        ?>');"></div></div><div class="content"><?=
                            lang("projects", $k, "description")
                        ?><div class="project-links">
                            <?php foreach ($v->links as $link_k => $link_v) {
                            ?>
                            <a target="_blank" href="<?=
                                $link_v
                            ?>"><span class="icon dark-invert" style="background-image: url('<?=
                                data("project_links", $link_k, "icon")
                            ?>');" title="<?=
                                lang("projects", "links", $link_k, "tooltip")
                            ?>"></span></a>
                            <?php
                            }
                            ?>
                    </div></div></div>
                    <?php
                    }
                    ?>
                </div>
            </div>
            <div id="contact">
                <div class="anchor"><?= lang("sections", "contact", "anchor") ?></div>
                <div class="container">
                    <div id="contact-details">
                        <div id="contact-phone"><a target="_blank" href="<?=
                            data("contact_details", "phone", "url")
                        ?>"><span class="icon dark-invert" style="background-image: url('<?=
                            data("contact_details", "phone", "icon")
                        ?>');"></span><?=
                            lang("contact", "details", "phone")
                        ?></a></div>
                        <div id="contact-email"><a target="_blank" href="<?=
                            data("contact_details", "email", "url")
                        ?>"><span class="icon dark-invert" style="background-image: url('<?=
                            data("contact_details", "email", "icon")
                        ?>');"></span><?=
                            lang("contact", "details", "email")
                        ?></a></div>
                        <div id="contact-location"><a target="_blank" href="<?=
                            data("contact_details", "location", "url")
                        ?>"><span class="icon dark-invert" style="background-image: url('<?=
                            data("contact_details", "location", "icon")
                        ?>');"></span><?=
                            lang("contact", "details", "location")
                        ?></a></div>
                        <div></div>
                    </div>
                    <div id="contact-caption" class="title"><?= lang("contact", "caption") ?></div>
                    <div id="contact-form">
                        <form action="?contact#contact-form" method="POST">
                            <div><label for="contact-form-name" hidden><?=
                                lang("contact", "form", "name", "label")
                            ?></label><input type="text" id="contact-form-name" name="contact-form-name" placeholder="<?=
                                lang("contact", "form", "name", "placeholder")
                            ?>"></div>
                            <div><label for="contact-form-email" hidden><?=
                                lang("contact", "form", "email", "label")
                            ?></label><input type="email" id="contact-form-email" name="contact-form-email" placeholder="<?=
                                lang("contact", "form", "email", "placeholder")
                            ?>"></div>
                            <div><label for="contact-form-message" hidden><?=
                                lang("contact", "form", "message", "label")
                            ?></label><textarea name="contact-form-message" id="contact-form-message" placeholder="<?=
                                lang("contact", "form", "message", "placeholder")
                            ?>"></textarea></div>
                            <div><span id="contact-form-result-msg" class="<?=
                                (isset($_SESSION["contact_mail_result"])) ? "active" : ""
                            ?>"><?=
                                lang("contact", "form", "result-msg", ((isset($_SESSION["contact_mail_result"]) && $_SESSION["contact_mail_result"])) ? "success" : "error")
                            ?></span><span><label for="contact-form-submit" hidden><?=
                                lang("contact", "form", "submit", "label")
                            ?></label><button type="submit" id="contact-form-submit"><span class="icon dark-invert" style="
                                background-image: url('/res/img/icon/send.white.svg');
                            "></span></button></span></div>
                        </form>
                    </div>
                </div>
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
                        <a onclick="redirect('?lang=<?= $key ?>&popup=options-menu');">
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
                        <a onclick="redirect('?appearance=<?= $k ?>&popup=options-menu');">
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

        <script id="php-generated-js" type="text/javascript"><?php
        if (isset($_SESSION["scroll_y"])) {
        ?>
window.scroll(window.scrollX, <?= $_SESSION["scroll_y"] ?>);
        <?php
        }
        ?></script>
    </body>
</html>
<?php

$session_unsets = [
    "view_popup",
    "scroll_y",
    "contact_mail_result"
];

foreach ($session_unsets as $k)
    if (isset($_SESSION[$k]))
        unset($_SESSION[$k]);

?>
