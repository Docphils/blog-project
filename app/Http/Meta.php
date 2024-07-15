<?php

namespace App\Http;

class Meta
{
    protected static $meta = [];

    public static function addMeta($name, $content)
    {
        static::$meta[$name] = $content;
    }

    public static function render()
    {
        $html = '';
        foreach (static::$meta as $name => $content) {
            $name === "canonical" ? $html .= '<link  rel="' . $name . '" href="' . $content . '" />' . PHP_EOL : $html .= '<meta name="' . $name . '" content="' . $content . '" />' . PHP_EOL;
        }
        return $html;
    }

    public static function cleanup()
    {
        static::$meta = [];
    }
}
