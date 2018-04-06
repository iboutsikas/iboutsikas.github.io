# Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

# This is a tiny, optional plugin (will be ignored on GitHub Pages)
# that replaces *all* <img> tags with placeholders that won't load immediately.
# This can increase page load speed, especially for documents with lots of images.
#
# This requires a JS component to lazy-load the images.
# See also: https://github.com/qwtel/shy-img

RE_IMG     = /<img(.*?)\/>/m
RE_DATAURL = /.*src\s*=\s*["']\s*data:.*["']/

REPLACEMENT = '<shy-img padding="500"><noscript><img%{attrs}/></noscript></shy-img>'

CONFIG_KEY = 'replace_imgs'
REPLACEMENT_KEY = 'replacement'

Jekyll::Hooks.register([:pages, :documents], :post_render) do |page|
  config ||= page.site.config
  replacement ||= (config[CONFIG_KEY] && config[CONFIG_KEY][REPLACEMENT_KEY]) ||
    REPLACEMENT

  i = 0
  page.output = page.output.gsub(RE_IMG) do |match|
    attrs = Regexp.last_match[1]

    # TODO: run more logic here? parse attributes!?

    if match.index(RE_DATAURL).nil? then
      i += 1
      replacement % { i:i, attrs:attrs }
    else
      match
    end
  end
end
