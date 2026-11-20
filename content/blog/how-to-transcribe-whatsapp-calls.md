---
title: "How to transcribe a WhatsApp call"
description: "WhatsApp can't record or transcribe calls itself. Here are the options that do work, their limits, the consent rules to know, and how Clippy handles it."
date: "2026-10-20"
updated: "2026-11-12"
author: "Clippy team"
tags: ["calls", "transcription", "guides"]
---

WhatsApp has no built-in way to record or transcribe a voice or video call. To get a transcript you need something outside the app: either a recording you transcribe afterwards, or an assistant that joins the call as a participant and transcribes it live. Whichever you choose, tell everyone on the call first — in many places recording a conversation without consent is illegal.

Below are the realistic options, what each one is good and bad at, and how we approached the problem with Clippy.

## Why this is harder than it sounds

WhatsApp calls are end-to-end encrypted and run inside the app. WhatsApp doesn't offer a record button, and phone operating systems are increasingly strict about letting one app capture audio from another. That leaves three broad approaches:

1. Record the call on another device or with screen recording, then transcribe the file.
2. Take the call on a computer, capture the audio there, then transcribe it.
3. Add a participant to the call whose job is to listen and transcribe.

## Option 1: Record on your phone, then transcribe

### Screen recording

Both Android and iPhone have a built-in screen recorder. Whether it captures call audio depends on the phone, the operating system version and the app. On many devices, screen recording either captures no call audio at all, or only your side of the conversation. Test it on a call with a friend before relying on it for anything important.

### Call recorder apps

Third-party call recorder apps exist for Android. Their reliability with WhatsApp varies a lot between phone models and Android versions, because recent versions of Android restrict how apps can access audio from other apps. Read recent reviews for your specific phone, and be careful about what permissions you grant: an app that records your calls has access to very sensitive data.

### A second device

The low-tech version: put the call on speaker and record it with another phone or a voice recorder. It works almost anywhere, but the audio quality is usually poor, and poor audio is the main reason transcripts come out wrong.

Once you have a recording, you still need to transcribe it. Most transcription services accept an audio file and return text. Check where the file is uploaded and how long it is kept before you send a private conversation to one.

## Option 2: Take the call on a computer

If you use WhatsApp on a computer, you can capture the call audio with recording software that records system sound and your microphone together. This tends to give cleaner audio than a phone on speaker. The downsides: it's fiddly to set up, it only works when you happen to be at your desk, and you still end up with a file to transcribe and tidy afterwards.

Neither recording approach tells you who said what. A plain transcription of a five-person call reads as one long block of text, and someone has to go back and label the speakers by hand.

## Option 3: Add a transcription assistant to the call

The third approach is to add a participant to the call that does the transcribing. This is how [Clippy](/blog/introducing-clippy) works. It has its own WhatsApp number, so you add it to a call like any other contact.

This avoids most of the problems above:

- **No recording hacks.** Clippy hears the call the same way any participant does, so it doesn't depend on your phone model or operating system.
- **Speaker labels.** The transcript is labelled by who is speaking, so you can see who said what.
- **Live and after.** You can follow the transcript while the call is still going. When the call ends, Clippy runs a second, more accurate pass over the whole call and writes a summary.
- **Everyone knows.** Clippy announces itself when it joins, so nobody is recorded without knowing.

The trade-off is that it's a visible participant. That is deliberate. A transcription assistant everyone can see is better than one nobody knows about.

## Consent and the law

This is not legal advice, but a few points apply almost everywhere:

- **Laws vary by country and region.** Some places allow you to record a conversation you're part of without telling anyone. Others require everyone on the call to agree. When people on a call are in different places, the strictest rule may apply.
- **Workplaces often have their own rules.** Even where the law allows it, your employer or your clients may not.
- **The simple rule: tell everyone.** Say at the start of the call that it's being transcribed, and give people a chance to object. If anyone does, don't transcribe.

Telling people is also just good manners. People speak differently when they know there will be a written record, and they deserve to make that choice for themselves.

Clippy's announcement when it joins helps with this, but it doesn't replace you saying it. We also only let Clippy join calls started by people on your Allowed callers list, so nobody can add your assistant to a call you're not responsible for. Our [privacy page](/privacy) explains what happens to transcripts afterwards.

## How to transcribe a WhatsApp call with Clippy

1. **Install the app.** [Download Clippy](/download) from the App Store or Google Play.
2. **Set up Allowed callers.** In the app, add the people who are allowed to bring Clippy into calls — usually you and anyone you run calls with.
3. **Save Clippy's number** to your WhatsApp contacts.
4. **Start or join a call** and add Clippy as a participant. You can also call Clippy directly for a one-to-one conversation with it.
5. **Tell everyone** it's there. Clippy will also announce itself.
6. **Talk normally.** Clippy stays quiet unless you address it by name, for example "Clippy, can you repeat the address?"
7. **After the call,** open the Calls tab in the app for the final transcript and the summary.

The [how it works](/how-it-works) page walks through the same flow step by step.

## Tips for a more accurate transcript

Whatever tool you use, transcripts are only as good as the audio. A few habits make a real difference:

- **Use a headset or earphones with a mic** rather than speakerphone. It reduces echo and background noise.
- **One person at a time.** Overlapping speech is the hardest thing for any transcription system.
- **Mute when you're not speaking** in larger calls, especially in noisy places.
- **Say names and numbers clearly.** Spell out unusual names or reference numbers if they matter.
- **Use a stable connection.** Breaking-up audio produces gaps no software can fill.

When the audio is too poor to transcribe reliably, Clippy tells you so rather than inventing words.

## Which option should you choose?

If you need a transcript of a single call and you're at a computer, recording on the computer and transcribing the file works. If you need transcripts regularly, with speakers labelled and a summary at the end, adding an assistant like Clippy to the call saves a lot of manual work. For the next step — turning those transcripts into notes people actually use — see our guide to [meeting notes on WhatsApp calls](/blog/whatsapp-call-meeting-notes).
