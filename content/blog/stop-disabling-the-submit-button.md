---
title: "Stop Disabling the Submit Button"
date: 2026-10-19
author: Vinod Santharam
description: Rage clicks, endless scrolling, hunting for the red asterisk. What Don Norman's The Design of Everyday Things taught me about forms, and why a disabled submit button is a promise the interface doesn't keep.
tags: [ux, frontend, forms, affordance, accessibility, product]
---

## Rage click

Rage clicking on the **Confirm** button. Scrolling up, scrolling down. Searching for the `*` in every single field. Closing the browser.

Frustrating, right? I know that feeling well, and not only as a user. I know it because I was asked to build those forms.

![A long merchant onboarding form. The user scrolls down to a greyed-out Confirm button and clicks it again and again with no response, scrolls up and down hunting for the missing field, finds an empty Postal code field marked with a tiny asterisk, fills it in, then scrolls back down to a now-enabled Confirm button.](/forms-missing-field.gif)

The button was disabled by default. It would only light up once every mandatory field was filled. On paper, it sounds tidy: _you can't submit something incomplete_. In practice, it turns the user into a detective. Somewhere on the page there is one field you missed, and the form knows exactly which one, but it won't tell you. It just sits there, grey, waiting.

And the best part: once you finally find it, the button wakes up, you press it, and _now_ the form reveals a second round of corrections, highlighted in red. The phone number format. The postal code. Things it could have told you all along.

This is something I keep having to "educate" around me: product owners, frontend developers, quality analysts. **Be the end user.** Picture someone who gets frustrated with your product for no better reason than chasing the one missing field that unlocks a button.

## What Don Norman taught me

The word I want to put on this problem is one I picked up reading [The Design of Everyday Things](/books/) by Don Norman: **affordance**.

An affordance is the relationship between an object and a person: what the object lets you do with it. A chair affords sitting. A handle affords pulling. A flat plate on a door affords pushing. When the design and the affordance line up, you don't think. You just act.

Norman's most famous example is the door you push when you should have pulled. We've all done it, and we all blamed ourselves. Norman's point is the opposite: **when people fail, blame the design, not the person.** If a door needs a sign that says _PULL_, the door has already lost.

<!-- SKETCH: a "Norman door", a handle that begs to be pulled with a "PUSH" sign taped on it. Next to it, a form's submit button with a tooltip taped on: "Fill all the fields first". -->

In the revised edition of the book, Norman adds a second word that matters just as much for us on screens: the **signifier**. The affordance is what you _can_ do; the signifier is what tells you that you can, and where. A button's shape, its colour, its label: those are signifiers. On a screen, almost everything we design is a signifier, because pixels don't really afford anything by themselves. They only promise.

So the job of a form is simple to say and hard to do:

- show what is **required**, before the user commits;
- show what **happened**, after the user acts.

Norman calls the space between "what I want to do" and "what this thing lets me do" the **gulf of execution**, and the space between "what I did" and "what I understand happened" the **gulf of evaluation**. A good form keeps both gulfs narrow.

## The red asterisk is a signifier

The idea behind a form is quite simple: make the mandatory fields obvious to the eye. We usually add a red `*`, or a small caption saying _required_ or _mandatory_. Small enough not to unbalance the look and feel, clear enough to be caught by the user's eye, and by their background consciousness. That little asterisk is a signifier doing its job. It narrows the gulf of execution: before I type anything, I know what the form expects from me.

One tip from experience: if almost every field is required, flip it. Mark the two optional fields as _(optional)_ instead of sprinkling twelve asterisks. The signifier should point at the exception, not the rule.

## The disabled button is a broken promise

Now look at the disabled submit button through Norman's eyes.

It _looks_ like a button. It sits where buttons sit, it says _Confirm_. Every signifier on it says "press me". And then it doesn't respond. No message, no movement, no feedback. It's a door with a handle that's been glued shut.

That is a gulf of evaluation in its purest form. The user acted, nothing happened, and the interface offers no explanation. So the user does what any human does when a door won't open: they push harder. That's your rage click.

There's a quieter cost too. A natively `disabled` button is removed from the keyboard tab order and is usually styled in low contrast, so screen reader and keyboard users can't even reach it to ask _why_. The pattern meant to "help" users is the one that shuts some of them out entirely.

And here is the irony I like to point out to developers: the browser already gets this right for free. A plain HTML form with `required` fields and an enabled submit button will, on submit, scroll to the first invalid field, focus it, and tell the user what's wrong. The disabled-button pattern is extra code we write to make the experience _worse_ than the default.

## Give me your top 3 websites

When someone is attached to the disabled-by-default submit button, I don't argue. I ask:

> "Give me your top 3 websites, and let's go check how their forms handle submission."

Then we open them together and look. It's a much better conversation than opinion against opinion, and it tends to end the debate faster than any slide I could make.

### Fill it in yourself

The other trick is even simpler, and it's the one that actually won the argument for me.

I was working on a green-field project, and the first screen to design was **merchant onboarding**: the form a business fills in when it wants to start using our products. It was long. Company details, contacts, addresses, banking information, documents. A lot of information, and a lot of chances to miss one field.

The initial design had the submit button disabled until everything was valid. The product owner and the UI designer both liked it. So I didn't debate. I asked them to fill in the form themselves, the way a merchant would: quickly, a bit distracted, skipping what didn't look important.

They got frustrated. Up, down, up again, looking for the field that kept the button grey. Living it for a few minutes did more than any argument I could have made. We changed the design before a single merchant ever saw it.

I can't show you a before-and-after chart, because there was never a "before" in production. And honestly, that's the point. The cheapest frustration to fix is the one your users never meet.

TBH, I did some of this homework myself before writing this article, and one of the results surprised me.

## Apple

At the time of writing, I tried to buy an iPad on apple.com, and honestly I was shocked.

The flow is a kind of vertical wizard: you pick the model, the storage, the connectivity, and so on, scrolling down as you go. I picked everything I wanted, reached the bottom, and the button was disabled.

My first thought was: that's weird, I've picked the options I wanted. So I scrolled back up, looking for the tricky one. Nothing on the page said which choice was mandatory and which wasn't. No asterisk, no caption, no highlight.

Eventually I figured it out: some options need you to explicitly say **no**. Like the keyboard.

![A sketch of the configurator, side by side. Left, what I met: model, storage and colour picked, a keyboard step with two equal unselected cards and nothing saying a choice is required, and a grey Continue button being clicked again and again. Right, what I expected: the keyboard step marked optional, "No keyboard" selected by default, and Continue enabled.](/forms-configurator-sketch.svg)

Two cards, same weight, neither selected. If I don't want a keyboard, I have to go out of my way to click "No keyboard". I find this totally counterproductive. If I want a keyboard, I'll click the button for it. Not having a keyboard should simply be the default.

In Norman's words, nothing here signifies "you still owe me an answer". The two cards look like optional add-ons, the same as the rest of the page, so the brain files them under _optional_ and moves on. The constraint is real, but invisible.

I can guess Apple's reasoning: force a conscious decision so nobody receives an iPad and later wishes they'd added the keyboard (and, sure, give the $299 accessory one more moment in the spotlight). That's a legitimate goal. But if a choice is mandatory, then say so, right there, and if the user skips it, take them back to it. Don't leave a grey button at the bottom and let them go looking.

To be fair, I'm being a bit rough on the flow. If you go through it top to bottom without skipping around, the experience is pretty smooth. It's only when you behave like a real, impatient human that it falls apart. Which is exactly when it matters.

## What I do instead

Here's the guidance I give my teams now.

### Keep the submit button enabled, always

Regardless of how many fields your form has. The button affords submitting, so let it submit. If something is missing, the act of pressing it is the best moment to tell the user, because that's the moment they're paying attention. An impatient user who presses _Confirm_ on an empty form isn't doing anything wrong; they're asking the form "what do you need from me?". Answer them.

### Signify before, give feedback after

Mark what's required (or what's optional) up front, so most people never hit an error at all. Then, when someone does submit with problems, highlight **every** problem at once, not one round at a time. Nobody wants to play "fix one, discover the next".

### Take the user to the problem

On mobile especially, pressing a button and seeing nothing happen is maddening, because the error is often off-screen, three fields up. So scroll to the first field in error and put the focus on it. If the form is long, a short error summary at the top, with links to each field, helps too.

If you've switched off native validation to style your own errors, you have to bring this behaviour back yourself. It's a few lines:

```js
form.addEventListener('submit', (event) => {
  const firstInvalid = form.querySelector('[aria-invalid="true"]');
  if (!firstInvalid) return;

  event.preventDefault();
  firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
  firstInvalid.focus({ preventScroll: true });
});
```

<!-- GIF: on a phone, tapping "Confirm" on a long form, the page smoothly scrolls up to the first field in red and the keyboard opens on it. -->

### Say how to fix it, not just that it's wrong

"Invalid input" is a signifier pointing nowhere. "Phone number should be 10 digits, like 081 234 5678" closes the gulf of evaluation in one sentence. Keep the message next to the field, and connect it with `aria-describedby` so assistive technology reads it too.

### Don't yell while I'm typing

Validating on every keystroke means the email field turns red after the first letter, before I've had a chance to be right. Validate when the user leaves the field or submits, and once a field has been flagged, clear the error as soon as it's fixed.

### Make "nothing" the default

The Apple lesson. If an option is an add-on, the default is without it. Only force an explicit choice when there's no sensible default, and when you do, signify it like any other required field.

## Be the end user

None of this is new. Most of it is in a book first published in 1988, written about doors, stoves and light switches. What keeps surprising me is how often we forget it the moment the object is a form.

So here's my ask to product owners, developers and QA alike. Next time you test a form, don't fill it in carefully from top to bottom, like the happy path in the ticket. Skip a field. Scroll around. Hit _Confirm_ way too early. Be the impatient human your users actually are.

Here's the same form, with the same missing field, built the way I'd build it:

![The same merchant onboarding form, done right. Confirm is enabled from the start. One click scrolls the page up to the empty Postal code field, outlines it in red and says "Enter a postal code, like 10110." The user types it, the error clears, and Confirm goes through on the first try.](/forms-missing-field-fixed.gif)

If the form tells you, in that moment, exactly what it needs and takes you there, it's a good form. If you find yourself scrolling up and down looking for a `*`, you've just met the door that should have said _pull_.
