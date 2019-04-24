# Flickr Feed Search

## About

This repo hosts the source for a custom Flickr UI utilising the Flickr Public Feed API (https://www.flickr.com/services/feeds/docs/photos_public/).

## Why?

Why not? Also deep diving some edge cases like AWS Lambdas to see how effective they are to cut costs, etc.

## Project

### Running the Solution

- Online: [dropbeardan.dev](http://www.dropbeardan.dev)
- Local: Continue reading.

### Running Locally

You will need YARN since the current lockfiles are based on YARN.

You will need to have the Proxy Server running for the Client to connect to:

Clone the Repository

```
git clone https://github.com/dropbeardan/flickr-feed-ui.git
```

Install Dependencies

```
yarn --cwd frontend install && yarn --cwd server install
```

Run Server Instance

```
yarn --cwd server preview
```

Run Client Instance (http://localhost:8000)

```
yarn --cwd frontend preview
```

View Storybook

```
yarn --cwd frontend storybook
```

### Structure

The project consists of two elements:

1. A [Static Client](https://github.com/dropbeardan/flickr-feed-ui/tree/master/frontend) housing all of the UI elements.
2. A [Proxy Server](https://github.com/dropbeardan/flickr-feed-ui/tree/master/server) to act as a middleman for the Flickr Feed API because your browser will probably block the client due to Flickr not providing CORS headers.

### Stack

The project uses the following major elements:

| Technology  | Purpose                                  |
| ----------- | ---------------------------------------- |
| Typescript  | Typings                                  |
| React       | UI Structure                             |
| Semantic UI | Pregenerated components and pretty stuff |
| JSS         | Styling framework                        |
| NodeJS      | Proxy Server                             |
| ExpressJS   | Proxy Server Framework                   |

## Contribution Guide

## General

- These rules are not hard and fast, you have a better idea, voice it so that we can adopt better ideas.
- Test where possible. Rigorous Snapshot / UI testing isn't set up at the moment due to small size but unit, integration and API testing should be fine.

## Client

- All components live in the Components folder and should have their own demo stories.
- All views live in the Views folder, these do not require demo stories but would be nice.

## Server

- If this needs to be further extended, separate the routes into their own directories.
- Extract logic out of the routes if it does not majorly impact coherence, chances are it will need to be reused.

### Linting

No linting required, use prettier.

```

```
