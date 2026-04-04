---
title: "Releasing Colab Mosaic Clip — a Google Colab tool for applying mosaics to any region of a video"
date: "2026-03-06"
description: "Announcing the release of an open-source tool that applies a mosaic or solid-color mask to any time range and region of a video and exports it as MP4. Everything runs in a browser-based GUI — no setup required."
authors: [hk]
video_asset: "https://github.com/user-attachments/assets/984e6d25-5342-4532-be71-c32714989bd3"
tags: [release, ffmpeg, google-colab, mosaic, privacy, open-source]
---

import Admonition from '@theme/Admonition';
import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<GitHubStarLink repo="hiroaki-com/colab-mosaic-clip" />

<div style={{ textAlign: 'center', marginBottom: '32px' }}>
  <video
    src="https://github.com/user-attachments/assets/984e6d25-5342-4532-be71-c32714989bd3"
    alt="Colab Mosaic Clip demo"
    style={{ maxWidth: '100%', borderRadius: '8px' }}
    autoPlay
    loop
    muted
    playsInline
  />
</div>

Today I'm releasing **Colab Mosaic Clip** — an open-source tool that applies a mosaic or solid-color mask to any time range and region of a video, entirely through a GUI, and exports the result as MP4. It runs ffmpeg and Pillow on Google Colab, so everything from specifying the time range to placing mosaic regions and exporting the final file is handled inside the notebook UI.

{/* truncate */}

### Background

When sharing screen recordings of tools I've built or internal documentation, I repeatedly run into the same situation: API keys or account information are visible in the footage, so I can't publish it as-is.

The immediate trigger was my own repeated experience using [a tool I previously released for converting demo videos to GIF and MP4](https://hkdocs.com/docs/tech/google-colab/google-colab-demo-gif-mp4-converter/) — I kept wishing mosaic processing were part of the same workflow. {/* TODO: replace with the English-localized URL for that page if one exists */} Adding the feature to the existing tool would have complicated the codebase, so I decided to build it as a dedicated, separate tool. Since I wanted to avoid installing video editing software locally — both to keep my environment clean and to avoid a learning curve — I kept everything running in Google Colab, just as before.

### Key Features

The tool is designed to run without writing any code. Just execute the cells from top to bottom and handle everything through the video player and Canvas-based GUI.

While playing the video, pressing the "Record Start" and "Record End" buttons is all it takes to set the time range for the mosaic. The frame at the start time is automatically displayed, so you can immediately click on the Canvas to place mosaic regions. Regions can be moved and resized by dragging, and multiple regions can be specified at once.

Two masking patterns are available: pixelated mosaic and solid-color fill. The output width can be set anywhere from 240 to 1920 px. After export, you can preview the result directly in the notebook, then choose to download it locally or save it to Google Drive.

For technical implementation details — including Canvas UI coordinate scaling, the FFmpeg `filter_complex` overlay approach, and Pillow-based preview processing — see the [technical documentation](/docs/tech/google-colab/google-colab-mosaic-clip). {/* TODO: replace with the English-localized path for this docs page if one exists */}

### Getting Started

No setup required. Open the Colab link below and run the cells from top to bottom.

- **Run on Google Colab**: [Colab Mosaic Clip (English)](https://colab.research.google.com/github/hiroaki-com/colab-mosaic-clip/blob/main/mosaic_clip_en.ipynb)
- **View the source code**: [hiroaki-com/colab-mosaic-clip on GitHub](https://github.com/hiroaki-com/colab-mosaic-clip)

Feedback and pull requests are both very welcome.

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/colab-mosaic-clip" />
