---
title: "Introducing Clippy, an assistant inside WhatsApp calls"
description: "Clippy is an AI assistant with its own WhatsApp number. Add it to a call for a live transcript and a summary, or send it voice notes to read as text."
date: "2026-10-06"
author: "Clippy team"
tags: ["announcements", "calls", "voice notes"]
---

Clippy is an AI assistant that lives in WhatsApp. It has its own number, so you can add it to a WhatsApp call the same way you would add a person. Once it joins, it writes down who said what as the conversation happens, tidies the transcript after the call ends, and leaves you a summary. If you need something during the call, say "Clippy" and ask. Outside calls, you can send it voice notes to read as text, or just message it.

This post covers what Clippy does today, why we built it this way, and what comes next.

## Why WhatsApp, and why calls

A lot of real work happens on WhatsApp calls. Suppliers confirm orders on them. Families sort out who is collecting whom. Small teams run their whole week over group calls, because everyone already has the app and nobody has to install anything new.

What those calls rarely produce is a record. When the call ends, the decisions live in a few people's memories, and those memories disagree a week later. Meeting tools on desktop solved this for video conferencing years ago, but WhatsApp itself has no built-in way to record or transcribe a call. We wanted the same benefit — a clear, searchable account of what was said — without asking anyone to leave the app they already use.

So instead of building yet another calling app, we built a participant. Clippy joins your existing WhatsApp calls. Nobody on the call needs to install anything.

## What Clippy does today

### It joins your calls when you ask it to

Save Clippy's number to your contacts, then add it to a group call the way you'd add anyone else, or call it directly. Only people on your **Allowed callers** list can bring Clippy into a call, so a stranger can't add it to theirs on your account.

When Clippy joins, it announces itself, so everyone knows it is there and listening. We think that is the only honest way for a transcription assistant to work. There's more on consent in our guide on [how to transcribe a WhatsApp call](/blog/how-to-transcribe-whatsapp-calls).

### It writes a live transcript, by speaker

While the call is running, Clippy transcribes it and labels each line with who said it. You can follow along in the Clippy app while the call is still going.

After the call, Clippy goes over the whole recording again more carefully, which gives a more accurate final transcript than the live one. Then it writes a summary: what was discussed, what was decided, and what people agreed to do next.

### It answers when you address it

Clippy stays quiet by default. It doesn't interrupt and it doesn't chip in. If you say its name — "Clippy, what did we agree about the delivery date?" — it answers out loud, using what has been said on the call so far.

In a one-to-one call with Clippy it works like talking to an assistant: ask questions, think out loud, dictate a note.

### It turns voice notes into text

Send Clippy a voice note, or forward one you received, and it replies with the text. This is useful for long voice notes you can't listen to right now, or for keeping a written copy of something said in audio. We wrote a separate guide on [turning WhatsApp voice notes into text](/blog/whatsapp-voice-notes-to-text).

### You can just text it

Clippy also replies to ordinary text messages, so you can ask it questions in the same chat where your voice notes and call summaries live.

## The app

The Clippy app for iPhone and Android is where you see everything Clippy has done for you:

- **Today** shows your calendar alongside your recent screenshots, so the things you meant to follow up on are in one place.
- **Calls** lists every call Clippy has joined, with the transcript and the summary.
- **Chats** shows your conversations with Clippy. If you want, you can link your own WhatsApp and mirror the chats you choose into the app. This is optional.
- **Voice notes** shows each note with its waveform and its text.

You can read more about each part on the [features page](/features), or see the full flow on [how it works](/how-it-works).

## What Clippy is honest about

Transcription is only as good as the audio it hears. A call on a good connection, with people speaking one at a time, transcribes well. A call from a moving car with three people talking over each other does not, for Clippy or for any other tool. When the audio is too poor to transcribe reliably, Clippy says so rather than guessing.

Clippy is also an independent product. It is not affiliated with, endorsed by or sponsored by WhatsApp or Meta. It joins calls as an ordinary participant with its own number.

We have written a plain-language page about [privacy](/privacy): what Clippy hears, what it keeps, and how you control it. Please read it before adding Clippy to calls with people outside your team or family.

## What's next

Clippy is in early access. Here is where things stand:

- **iPhone** — available now on the [App Store](/download).
- **Android** — available now on [Google Play](/download).
- **Desktop** — there's no desktop app. The companion app is for phones.

Early access is free. We are using this period to improve transcription in noisy, multilingual and fast-moving calls, which is where most of the real-world difficulty is. If something doesn't work the way you expect, tell us — that feedback shapes what we fix first.

## Getting started

1. [Download the app](/download) for iPhone or Android and sign in.
2. Add the people who should be able to bring Clippy into calls to your Allowed callers list.
3. Save Clippy's number in WhatsApp.
4. On your next call, add Clippy, tell everyone it's there, and talk as you normally would.

When the call ends, open the Calls tab. The transcript and summary will be waiting.

If you mostly run calls with a team, our guide to [meeting notes on WhatsApp calls](/blog/whatsapp-call-meeting-notes) covers how to get the most useful summaries out of them.
