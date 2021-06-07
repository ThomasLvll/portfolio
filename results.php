<?php

session_start();
if (isset($_SESSION["test-json"])) {
    echo "<h3>JSON results</h3><ul>";
    $json_sum_t = 0;
    $json_c = 0;
    $json_min_t = 65365;
    $json_max_t = -1;
    foreach ($_SESSION["test-json"] as $t) {
        $json_sum_t += $t;
        $json_min_t = min($json_min_t, $t);
        $json_max_t = max($json_max_t, $t);
        $json_c ++;
    }
    $json_avg_t = $json_sum_t / $json_c;
    echo "<li>Number of tests: <strong>$json_c</strong></li>";
    echo "<li>Min time: $json_min_t</li>";
    echo "<li>Average time: <strong>$json_avg_t</strong></li>";
    echo "<li>Max time: $json_max_t</li>";
    echo "</ul>";
}

echo "<hr>";

if (isset($_SESSION["test-file"])) {
    echo "<h3>Separate file results</h3><ul>";
    $file_sum_t = 0;
    $file_c = 0;
    $file_min_t = 65365;
    $file_max_t = -1;
    foreach ($_SESSION["test-file"] as $t) {
        $file_sum_t += $t;
        $file_min_t = min($file_min_t, $t);
        $file_max_t = max($file_max_t, $t);
        $file_c ++;
    }
    $file_avg_t = $file_sum_t / $file_c;
    echo "<li>Number of tests: <strong>$file_c</strong></li>";
    echo "<li>Min time: $file_min_t</li>";
    echo "<li>Average time: <strong>$file_avg_t</strong></li>";
    echo "<li>Max time: $file_max_t</li>";
    echo "</ul>";
}

echo "<hr>";

echo "<h3>Difference</h3><ul>";
$diff_min_t = $file_min_t - $json_min_t;
$diff_max_t = $file_max_t - $json_max_t;
$diff_avg_t = $file_avg_t - $json_avg_t;
echo "<li>Min time: $diff_min_t (separate files)</li>";
echo "<li>Average time: $diff_avg_t (separate files)</li>";
echo "<li>Max time: $diff_max_t (separate files)</li>";

?>
