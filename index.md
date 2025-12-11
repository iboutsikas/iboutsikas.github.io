---
layout: welcome
title: Welcome!
cover: true
---
Welcome to my personal page. I am Ioannis a Software Engineer with experience in
various areas including; AAA games, Desktop and Web development, and tutoring.

My primary interest is in game engine development and I am working on my own
personal engine when time permits. I also spend a sizable amount of time doing
home improvement projects, but that is more of necessity turned into a hobby.

Please feel free to read more about the [Games](/games) I've worked on or my
[Projects](/projects).

{% assign no_third_column = page.no_third_column | default:site.hydejack.no_third_column | default:false %}

{% assign games = site.games | where_exp: "game", "game.tags contains 'frontpage'" | sort: "date" | reverse %}
{% if games.size > 0 %}
<h2>Featured Games</h2>
<div class="columns {% unless no_third_column %}columns-break{% endunless %}">
    {% for game in games %}
        <div class="column {% if featured %}column-1{% else %}column-1-2{% endif %}">
        {% include_cached game-card.html game=game featured=featured %}
        </div>
    {% endfor %}
</div>
{% endif %}

{% assign projects = site.projects | where_exp: "project", "project.tags contains 'frontpage'" | sort: "date" | reverse %}
{% if projects.size > 0 %}
<h2>Featured Projects</h2>
<div class="columns {% unless no_third_column %}columns-break{% endunless %}">
    {% for project in projects %}
        <div class="column {% if featured %}column-1{% else %}column-1-2{% endif %}">
        {% include_cached pro/project-card.html project=project featured=featured %}
        </div>
    {% endfor %}
</div>
{% endif %}
