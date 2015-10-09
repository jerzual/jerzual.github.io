---
layout: default
title: Jerzual Studio
---
<div class="jerzual-logo">
<img src="{{ site.url }}/img/jerzual.png" alt="Jerzual logo"/>
</div>

# Jerzual Studio

A small french indie game studio

## Games

### Alone

### Tribes

### Zelda

### OY

### Minotaur

## Blog

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

## About