// # src / index.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import "@webcomponents/webcomponentsjs";
import "intersection-observer";
import "web-animations-js";
import smoothscroll from "smoothscroll-polyfill";
import "../lib/request-idle-callback";

import "../lib/modernizr-custom";
import "../lib/version";

import "./images";
import "./drawer";
import "./push-state";
import "./katex";
import "./cookies-banner";

smoothscroll.polyfill();

document.getElementById("_dark").addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
});

// function setupLoading(navbarEl) {
//   const template = document.getElementById("_darkmode-template");
//   const darkmode = document.importNode(template.content, true);
//   navbarEl.appendChild(darkmode);
//   return navbarEl.lastElementChild;
// }
