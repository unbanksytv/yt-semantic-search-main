
# YouTube Semantic Search <!-- omit in toc -->

> OpenAI-powered semantic search for any YouTube playlist — featuring the [Bankless Podcast](https://ai.vercel.app) 🔥

[![Build Status](https://github.com/transitive-bullshit/yt-channel-search/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/yt-channel-search/actions/workflows/test.yml) [![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/transitive-bullshit/yt-channel-search/blob/main/license) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)


## Intro

I love the [Bankless Podcast](https://www.youtube.com/channel/). But search and discovery with podcasts can be really challenging... and I also wanted to play around with cool AI stuff. 😂

This project uses the latest models from [OpenAI](https://openai.com/) to build a semantic search index across every episode of the Pod. It allows you to find your favorite moments with Google-level accuracy and rewatch the exact clips you're interested in.

You can use it to power advanced search across _any YouTube channel or playlist_. 

## How It Works

Under the hood, it uses:

- [OpenAI](https://openai.com) - We're using the brand new [text-embedding-ada-002](https://openai.com/blog/new-and-improved-embedding-model/) embedding model, which captures deeper information about text in a latent space with 1536 dimensions
  - This allows us to go beyond keyword search and search by higher-level topics.
- [Pinecone](https://www.pinecone.io) - Hosted vector search which enables us to efficiently perform [k-NN searches](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) across these embeddings
- [Vercel](https://vercel.com) - Hosting and API functions
- [Next.js](https://nextjs.org) - React web framework

We use Node.js and the [YouTube API v3](https://developers.google.com/youtube/v3/getting-started) to fetch the videos of our target playlist. In this case, we're focused on the [Bankless Podcast Episodes Playlist](https://www.youtube.com/playlist?list=PLmkdAgtxf3ah0Vmyy1B3OU8BPacX4_gVY).

```bash
npx tsx src/bin/resolve-yt-playlist.ts
```

We download the English transcripts for each episode using a hacky HTML scraping solution, since the YouTube API doesn't allow non-OAuth access to captions. Note that a few episodes don't have automated English transcriptions available, so we're just skipping them at the moment. A better solution would be to use [Whisper](https://openai.com/blog/whisper/) to transcribe each episode's audio.

Once we have all of the transcripts and metadata downloaded locally, we pre-process each video's transcripts, breaking them up into reasonably sized chunks of ~100 tokens and fetch it's [text-embedding-ada-002](https://openai.com/blog/new-and-improved-embedding-model/) embedding from OpenAI. This results in ~200 embeddings per episode.

All of these embeddings are then upserted into a [Pinecone search index](https://www.pinecone.io) with a dimensionality of 1536. There are ~17,575 embeddings in total across ~108 episodes of the All-In Podcast.

```bash
npx tsx src/bin/process-yt-playlist.ts
```

Once our Pinecone search index is set up, we can start querying it either via the webapp or via the example CLI:

```bash
npx tsx src/bin/query.ts
```

We also support generating timestamp-based thumbnails of every YouTube video in the playlist. Thumbnails are generated using [headless Puppeteer](https://pptr.dev) and are uploaded to [Google Cloud Storage](https://cloud.google.com/storage). We also post-process each thumbnail with [lqip-modern](https://github.com/transitive-bullshit/lqip-modern) to generate nice preview placeholder images.

If you want to generate thumbnails (optional), run:

```bash
npx tsx src/bin/generate-thumbnails.ts
```

Note that thumbnail generation takes ~2 hours and requires a pretty stable internet connection.

The frontend is a [Next.js](https://nextjs.org) webapp deployed to [Vercel](https://vercel.com) that uses our Pinecone index as a primary data store.

## TODO

- Use [Whisper](https://github.com/m-bain/whisperX) for better transcriptions
- Support sorting by recency vs relevancy


## Credit

- Inspired by [Riley Tomasek's project](https://twitter.com/rileytomasek/status/1603854647575384067) for searching the [Huberman YouTube Channel](https://www.youtube.com/@hubermanlab)
- Note that this project is not affiliated with the Bankless Podcast. It just pulls data from their [YouTube channel](https://www.youtube.com/channel/) and processes it using AI.

