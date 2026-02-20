let landingFunctions = {
  init: function () {
    this.initLibraris();
    this.card();
    // this.time()
    this.modal();
  },

  initLibraris: function () {
    $('[href*="#"]').on("click", function (e) {
      let fixedOffset = 0;
      let cardHeight = $(".order").outerHeight(false);
      let windowHeight = $(window).height();

      if ($(window).width() < 1081) {
        $("html, body")
          .stop()
          .animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight) }, 1000);
        e.preventDefault();
      } else {
        $("html, body")
          .stop()
          .animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
        e.preventDefault();
      }
    });

    $(".gallery__slider").owlCarousel({
      items: 1,
      margin: 20,
      dots: true,
      dotsEach: true,
      nav: false,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
    });

    $(".order__gallery").owlCarousel({
      items: 1,
      margin: 20,
      dots: true,
      dotsEach: true,
      nav: false,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
    });

    $(".review__slider").owlCarousel({
      items: 3,
      margin: 0,
      dots: false,
      dotsEach: true,
      nav: true,
      loop: true,
      autoHeight: false,
      // autoplay: true,
      // autoplayTimeout: 5000,
      // autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          autoHeight: true,
        },
        1081: {
          items: 3,
          autoHeight: false,
        },
      },
    });

    $.raty.path = $("body").data("path") + "/img/raty";

    $(".modal__raiting").raty({
      half: true,
      space: false,
      number: 5,
    });

    AOS.init({
      disable: function () {
        if ($(window).width() <= 1080) {
          return true;
        }
        return false;
      },
      once: true,
      duration: 1000,
      offset: 0,
    });

    $(window).resize(function () {
      AOS.refresh();
    });

    $("[data-fancybox]").fancybox({
      loop: true,
      infobar: false,
      animationEffect: false,
      backFocus: false,
      hash: false,
    });
  },

  card: function () {
    $(".color__btn").click(function () {
      const color = $(this).data("color");
      $(".color__btn").removeClass("active");
      $(this).addClass("active");
      $(this).closest(".order__item").find(".order__gallery").hide();
      $(this).closest(".order__item").find(`.order__gallery-${color}`).fadeIn();
    });
  },

  time: function () {
    Date.prototype.daysInMonth = function () {
      return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
    };

    if (!String.prototype.padStart) {
      String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(typeof padString !== "undefined" ? padString : " ");
        if (this.length > targetLength) {
          return String(this);
        } else {
          targetLength = targetLength - this.length;
          if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
          }
          return padString.slice(0, targetLength) + String(this);
        }
      };
    }

    function timer() {
      function runMultiple(hoursSelector, minutesSelector, secondsSelector, milisecondsSelector) {
        let d = new Date();
        let h = String(23 - d.getHours()).padStart(2, "0");
        let m = String(59 - d.getMinutes()).padStart(2, "0");
        let s = String(60 - d.getSeconds()).padStart(2, "0");
        // let ms = String(1000 - d.getMilliseconds()).padStart(3, "0");
        $(hoursSelector).text(h);
        $(minutesSelector).text(m);
        $(secondsSelector).text(s);
        // $(milisecondsSelector).text(ms)
      }
      setInterval(function () {
        runMultiple(".hours", ".minutes", ".seconds");
      }, 1000);
    }

    timer();

    function getDate(plusDays) {
      let now = new Date();
      now.setDate(now.getDate() + plusDays);
      let dayNum = "";
      if (now.getDate() < 10) {
        dayNum = "0";
      }
      dayNum += now.getDate();
      let monthNum = "";
      if (now.getMonth() + 1 < 10) {
        monthNum = "0";
      }
      monthNum += now.getMonth() + 1;

      // return dayNum + "." + monthNum + "." + now.getFullYear();
      return dayNum + "." + monthNum + "." + String(now.getFullYear()).substr(String(now.getFullYear()).length - 2);
    }

    // $(".date__1").text(getDate(-5));
    $(".date").text(getDate(2));
  },

  modal: function () {
    $(".add__review").click(function () {
      $(".modal__review").addClass("active");
    });

    function close() {
      $(".modal__review").removeClass("active");
    }

    $(".modal__review").click(function (e) {
      let target = e.target;
      if (target.classList.contains("modal__close")) {
        close();
      }
      if (target.classList.contains("modal")) {
        close();
      }
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        console.log(reader);
        reader.onload = function (e) {
          $(".file img").attr("src", e.target.result).css("display", "block");
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    $(".modal__review .input__file").on("change", function () {
      readURL(this);
    });

    $(".modal__review form").submit(function (e) {
      e.preventDefault();
      $(this).removeClass("active");
      $(".send__window").addClass("active");
      $(".modal__review .name__input").val("");
      $(".modal__review .modal__area").val("");
      $(".modal__review .file img").attr("src", "").css("display", "none");
      delayClose();
    });

    function delayClose() {
      setTimeout(function () {
        $(".modal__review form").addClass("active");
        $(".send__window").removeClass("active");
        close();
      }, 5000);
    }
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
