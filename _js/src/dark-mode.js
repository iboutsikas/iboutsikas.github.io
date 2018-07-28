// # src / dark-mode.js
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

import { importTemplate } from "./common";

requestIdleCallback(() => {
  const darkMode = importTemplate("_dark-mode-template");
  if (darkMode) {
    const navbarEl = document.querySelector("#_navbar > .content > .nav-btn-bar");
    navbarEl.appendChild(darkMode);

    document.getElementById("_dark-mode").addEventListener("click", () => {
      if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
      } else {
        document.body.classList.add("dark-mode");
      }
    });
  }
});
