(function ($) {
  "use strict";

  $(window).on("load", function () {
    var previous;
    $("#settings_flake_type")
      .focus(function () {
        previous = this.value;
      })
      .change(function () {
        if (this.value < 100) {
          pro_alert();
          this.value = previous;
        }
      });

    $("#settings_on_spec_page").keyup(function () {
      pro_alert();
      this.value = "";
    });

    function pro_alert() {
      alert(
        "Sorry...\n\nThis functionality is available in PRO version only.\n\nPlease consider to upgrade."
      );
    }
  });
})(jQuery);
