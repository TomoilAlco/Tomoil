
    /*!
     * Bootstrap v3.3.7 (http://getbootstrap.com)
     * Copyright 2011-2017 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     */
    /*!
     * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=08d91426882ebfd58a30e0353f215d3c)
     * Config saved to config.json and https://gist.github.com/08d91426882ebfd58a30e0353f215d3c
     */
    if ("undefined" == typeof jQuery)
      throw new Error("Bootstrap's JavaScript requires jQuery");
    +(function (t) {
      "use strict";
      var s = t.fn.jquery.split(" ")[0].split(".");
      if (
        (s[0] < 2 && s[1] < 9) ||
        (1 == s[0] && 9 == s[1] && s[2] < 1) ||
        s[0] > 3
      )
        throw new Error(
          "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4"
        );
    })(jQuery),
      +(function (t) {
        "use strict";

        function s(e, i) {
          (this.$body = t(document.body)),
            (this.$scrollElement = t(t(e).is(document.body) ? window : e)),
            (this.options = t.extend({}, s.DEFAULTS, i)),
            (this.selector = (this.options.target || "") + " .nav li > a"),
            (this.offsets = []),
            (this.targets = []),
            (this.activeTarget = null),
            (this.scrollHeight = 0),
            this.$scrollElement.on(
              "scroll.bs.scrollspy",
              t.proxy(this.process, this)
            ),
            this.refresh(),
            this.process();
        }

        function e(e) {
          return this.each(function () {
            var i = t(this),
              o = i.data("bs.scrollspy"),
              r = "object" == typeof e && e;
            o || i.data("bs.scrollspy", (o = new s(this, r))),
              "string" == typeof e && o[e]();
          });
        }
        (s.VERSION = "3.3.7"),
          (s.DEFAULTS = { offset: 10 }),
          (s.prototype.getScrollHeight = function () {
            return (
              this.$scrollElement[0].scrollHeight ||
              Math.max(
                this.$body[0].scrollHeight,
                document.documentElement.scrollHeight
              )
            );
          }),
          (s.prototype.refresh = function () {
            var s = this,
              e = "offset",
              i = 0;
            (this.offsets = []),
              (this.targets = []),
              (this.scrollHeight = this.getScrollHeight()),
              t.isWindow(this.$scrollElement[0]) ||
              ((e = "position"), (i = this.$scrollElement.scrollTop())),
              this.$body
                .find(this.selector)
                .map(function () {
                  var s = t(this),
                    o = s.data("target") || s.attr("href"),
                    r = /^#./.test(o) && t(o);
                  return (
                    (r &&
                      r.length &&
                      r.is(":visible") && [[r[e]().top + i, o]]) ||
                    null
                  );
                })
                .sort(function (t, s) {
                  return t[0] - s[0];
                })
                .each(function () {
                  s.offsets.push(this[0]), s.targets.push(this[1]);
                });
          }),
          (s.prototype.process = function () {
            var t,
              s = this.$scrollElement.scrollTop() + this.options.offset,
              e = this.getScrollHeight(),
              i = this.options.offset + e - this.$scrollElement.height(),
              o = this.offsets,
              r = this.targets,
              l = this.activeTarget;
            if ((this.scrollHeight != e && this.refresh(), s >= i))
              return l != (t = r[r.length - 1]) && this.activate(t);
            if (l && s < o[0])
              return (this.activeTarget = null), this.clear();
            for (t = o.length; t--;)
              l != r[t] &&
                s >= o[t] &&
                (void 0 === o[t + 1] || s < o[t + 1]) &&
                this.activate(r[t]);
          }),
          (s.prototype.activate = function (s) {
            (this.activeTarget = s), this.clear();
            var e =
              this.selector +
              '[data-target="' +
              s +
              '"],' +
              this.selector +
              '[href="' +
              s +
              '"]',
              i = t(e).parents("li").addClass("active");
            i.parent(".dropdown-menu").length &&
              (i = i.closest("li.dropdown").addClass("active")),
              i.trigger("activate.bs.scrollspy");
          }),
          (s.prototype.clear = function () {
            t(this.selector)
              .parentsUntil(this.options.target, ".active")
              .removeClass("active");
          });
        var i = t.fn.scrollspy;
        (t.fn.scrollspy = e),
          (t.fn.scrollspy.Constructor = s),
          (t.fn.scrollspy.noConflict = function () {
            return (t.fn.scrollspy = i), this;
          }),
          t(window).on("load.bs.scrollspy.data-api", function () {
            t('[data-spy="scroll"]').each(function () {
              var s = t(this);
              e.call(s, s.data());
            });
          });
      })(jQuery);
