(function ($) {
  "use strict";

  $(window).on("load", function () {
    if (!snoweffect.show) return;
    jQuery().jSnow({
      followScroll: true,
      flakes: snoweffect.flakes_num,
      fallingSpeedMin: parseInt(snoweffect.falling_speed_min),
      fallingSpeedMax: parseInt(snoweffect.falling_speed_max),
      flakeMaxSize: parseInt(snoweffect.flake_max_size),
      flakeMinSize: parseInt(snoweffect.flake_min_size),
      flakeColor: [snoweffect.flake_color],
      vSize: snoweffect.vertical_size,
      fadeAway: snoweffect.fade_away,
      zIndex: snoweffect.flake_zindex,
      flakeCode: ["&" + snoweffect.flake_type + ";"],
    });
  });
})(jQuery);
