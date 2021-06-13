<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require "$ROOT/vendor/autoload.php";

$query = <<<GQL
    {
        user(login: "ThomasLvll") {
            contributionsCollection {
                contributionCalendar {
                    weeks {
                        contributionDays {
                            date
                            weekday
                            contributionLevel
                            contributionCount
                        }
                        firstDay
                    }
                    totalContributions
                }
            }
        }
    }
GQL;

$headers = [
    "Authorization" => "Bearer " . file_get_contents("$ROOT/res/data/.hidden/github-api-token")
];

$endpoint = "https://api.github.com/graphql";
$client = new \GuzzleHttp\Client();

$res = $client->request("POST", $endpoint, [
    "headers" => $headers,
    "json" => [
        "query" => $query
    ]
]);

$json = $res->getBody()->getContents();
$body = json_decode($json);
$data = $body->data;

$themes = [
    "light" => [
        "BACKGROUND" => "#fff",
        "NONE" => "#ebedf0",
        "FIRST_QUARTILE" => "#9be9a8",
        "SECOND_QUARTILE" => "#40c463",
        "THIRD_QUARTILE" => "#30a14e",
        "FOURTH_QUARTILE" => "#216e39"
    ],
    "dark" => [
        "BACKGROUND" => "#000",
        "NONE" => "#2d333b",
        "FIRST_QUARTILE" => "#226654",
        "SECOND_QUARTILE" => "#17996c",
        "THIRD_QUARTILE" => "#0bcc85",
        "FOURTH_QUARTILE" => "#00ff9d"
    ]
];

$calendar = $data->user->contributionsCollection->contributionCalendar;
$weeks = $calendar->weeks;
if (count($weeks) >= 7) {
    $last_weeks = array_slice($weeks, -7);
    foreach ($themes as $theme_name => $theme) {
        $path = "$ROOT/res/img/github-contribution-chart/$theme_name.svg";
        $f = fopen($path, "w");
        fwrite($f, "<?xml version='1.0' encoding='utf-8'?>");
        fwrite($f, "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='" . $theme["BACKGROUND"] . "'>");
        $i = 0;
        foreach ($last_weeks as $week) {
            $x = 2 + (9 * $i);
            $j = 0;
            foreach ($week->contributionDays as $day) {
                $y = 2 + (9 * $j);
                $level = $day->contributionLevel;
                $color = $theme[$level];
                fwrite($f, "<rect width='7' height='7' x='$x' y='$y' rx='1' fill='$color'></rect>");
                $j ++;
            }
            $i ++;
        }
        fwrite($f, "</svg>");
    }
}

?>
