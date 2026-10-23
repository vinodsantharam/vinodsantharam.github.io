---
title: "The Refresh Button That Didn't Refresh"
date: 2026-10-22
author: Vinod Santharam
description: How one frustration with a Redis GUI turned into redis-pane, a keyboard-first terminal UI I designed and built with Claude, without writing a line of Rust.
tags: [ux, redis, tui, side-project, ai]
---

## It starts with a frustration

Many ideas start with a frustration. Take Rust: the story goes that Graydon Hoare started it after the elevator in his building crashed because of a software bug, and he had to climb 21 flights of stairs. Of course, I am less extreme than him. But my frustration started a couple of years ago.

As a frontend engineer with a UX focus, I spend most of my time on the frontend. Still, from time to time I need to look at the backend side. I like to be autonomous: I just ask for credentials and check what's going on inside our Redis instance. 99% of the time, that meant downloading `RedisInsight`, setting up the connection and starting to dig.

Yeah, it's "JUST" a cache. The data keeps changing, dying, being born again. And over time, two things really started to annoy me:

- The refresh button doesn't refresh.
- The value panel on the right sometimes leaves me lost: whose value is this?

## Put yourself in my shoes

Say I have a special action in my web application, and I want to check that the backend, where the source of truth lives, really processed it. One of my most frequent needs is to check the data before and after that action. Sometimes it's in a database, sometimes in Redis.

Funny thing: until I sat down to write this article, I had never even wondered whether there were alternatives to `RedisInsight`. Hmm. I just followed the backend developers' suggestion blindly.

Back to the refresh button. I want to check the value before and after. I open `RedisInsight`, search for the key and open its value. Good. Time to run the action in my web application. Then I press the refresh button and… nothing changes.

![A recreated Redis desktop GUI, not a real screenshot. The user filters the key list to order:4821 and opens it: the status is "pending". A checkout page appears and the user pays. Back in the GUI, they press the refresh button next to the value three times; "Last refresh" says "now", but the status stays "pending". Only after searching for the key again and reselecting it does the value show "paid".](/redis-gui-refresh.gif)

So I'm thinking: what did I do wrong in my web application? I go and ask the backend developer whether the API works as expected, because nothing changes in the Redis cache. And they tell me: "Hmm, yeah, actually you need to search for your key again and reselect it to see the latest value."

You can imagine my face. This meme sums it up:

![Michael Scott from The Office staring in silent disbelief.](/redis-pane-meme.gif)

I am still wondering: what is this refresh button for? It looks like a refresh button, it sits where a refresh button sits, it even says "Last refresh: now". It just doesn't refresh what I'm looking at. If you read my article on [disabled submit buttons](/blog/stop-disabling-the-submit-button/), you know how I feel about controls that make a promise and don't keep it.

## Whose value is this?

The second one is more subtle. I check my value, then I go back to my original work for a while. When I come back to `RedisInsight`, the key list has moved on: maybe I scrolled it, maybe the key expired and disappeared from the list. But the value panel on the right is still there, showing the old value as if nothing happened.

So now I'm looking at a value without its key. What is it there for? Who does it belong to? Is it still in Redis at all? The panel doesn't say, so I'm kinda lost, and I end up searching for the key again. Again.

## The straw that broke the camel's back

Guess what: on my last project, it was the straw that broke the camel's back. I didn't even look for an alternative. I just built my own. Well, I designed it and let Claude implement it.

Another GUI tool to install? No, thank you. TUIs (terminal user interfaces) have become quite popular lately, and the longer I stay on my keyboard, the better I feel.

That's how [redis-pane](https://github.com/redis-pane/redis-pane) was born: a terminal UI for Redis. Simple connection management, with a URL or a config file. The basic features you expect, and some more advanced ones. And the one that started it all: the key you have open updates live, the moment it changes on the server. There is no refresh button, because you don't need one.

Want to try it? On macOS or Linux:

```
brew install redis-pane/tap/redis-pane
```

Other platforms (Linux without Homebrew, Windows) are in the [installation guide](https://redis-pane.github.io/redis-pane/docs/getting-started/installation/). Then run `redis-pane` and it connects to `127.0.0.1:6379`, or `redis-pane --url redis://your-host:6379` for anything else.

How does it know? It doesn't poll, and there's no timer. Since Redis 6, a client can ask the server to tell it when a key it read has changed (RESP3 `CLIENT TRACKING`). redis-pane asks for exactly that on the key you have open. When the server says "this key changed", it reads the key again and re-arms the notification. It never keeps a cached copy of the value, so there's nothing that could go stale, and nothing to refresh. If the server can't send those notifications, the header says so instead of quietly pretending. [How live updates work](https://redis-pane.github.io/redis-pane/docs/viewing/live-updates/)

And the lost value? If the key you have open is no longer the one selected in the list, the value pane says so (`⊘ not the selected key`), and one keystroke brings the list back to it. If the key is deleted or expires, the pane keeps the last value it read and badges it `✕ deleted 3s ago`. A value never pretends to be something it isn't.

![redis-pane in a terminal: filtering to a key, opening it, then watching its value update on screen the moment another client changes it, with no keypress and no refresh.](/redis-pane-hero.gif)

## The most fun I've had in a while

Honestly, I haven't had this much fun in a long time. I didn't write the code. I know nothing about Rust. But I learned a bunch of things about Redis along the way.

Even if nobody else ends up using redis-pane, building it over the last few weeks has been so cool. And I will definitely use it myself, haha.

You can find it on [GitHub](https://github.com/redis-pane/redis-pane), with the docs at [redis-pane.github.io/redis-pane](https://redis-pane.github.io/redis-pane/).

*redis-pane is an independent open-source project. It is not affiliated with, endorsed or supported by Redis Ltd. Redis and RedisInsight are trademarks of Redis Ltd.*
