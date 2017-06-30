---
layout: post
title: <%= post.hash %>
date: <%= post.fullDate %>
permalink: 
published: true
tags: facebook, informations
attachments: <%= JSON.stringify(post.attachments) %>
comments: <%= JSON.stringify(post.comments) %>
---
<%= post.message %>

<% 
if(!_.isUndefined(post.attachments)) { 
    _.forEach(post.attachments.data, function(attach) {
        if(!_.isUndefined(attach.media)) {
%>
    <figure>
        <img src="img/fb/<%= post.hash %>.png" width="<%= attach.media.width %>" height="<%= attach.media.height %>"/>
        <caption><%= attach.description %></caption>
    </figure>
<%
        }
    });
} 
%>