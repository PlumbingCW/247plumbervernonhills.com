(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  /* mobile drawer */
  var burger = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  function setDrawer(open) {
    if (!burger || !drawer) return;
    drawer.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    root.style.overflow = open ? "hidden" : "";
    if (open) { var c = drawer.querySelector(".mob-close"); if (c) c.focus(); } else { burger.focus(); }
  }
  if (burger && drawer) {
    burger.addEventListener("click", function () { setDrawer(!drawer.classList.contains("open")); });
    var closeBtn = drawer.querySelector(".mob-close");
    if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
    drawer.addEventListener("click", function (e) { if (e.target.tagName === "A") { root.style.overflow = ""; } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("open")) setDrawer(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900 && drawer.classList.contains("open")) setDrawer(false); });
  }

  /* desktop dropdowns: click toggles for touch and keyboard, hover handled in CSS */
  var items = document.querySelectorAll(".navitem");
  Array.prototype.forEach.call(items, function (it) {
    var b = it.querySelector("button.nl");
    if (!b) return;
    b.addEventListener("click", function (e) {
      var open = it.classList.toggle("open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
      e.stopPropagation();
    });
  });
  document.addEventListener("click", function () {
    Array.prototype.forEach.call(items, function (it) {
      it.classList.remove("open");
      var b = it.querySelector("button.nl"); if (b) b.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") Array.prototype.forEach.call(items, function (it) { it.classList.remove("open"); });
  });

  /* FAQ accordion using max-height */
  var qs = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(qs, function (q) {
    q.addEventListener("click", function () {
      var a = document.getElementById(q.getAttribute("aria-controls"));
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", open ? "false" : "true");
      if (a) a.style.maxHeight = open ? "0px" : a.scrollHeight + "px";
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(qs, function (q) {
      if (q.getAttribute("aria-expanded") === "true") {
        var a = document.getElementById(q.getAttribute("aria-controls"));
        if (a) a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
})();
