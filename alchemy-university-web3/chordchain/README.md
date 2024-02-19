# Chordchain

Chordchain utilizes Solidity and IPFS to store songs' chords as non-fungible tokens (NFTs). It offers a platform for musicians and music enthusiasts to upload, share, and explore songs along with their corresponding chords.

<img width="1222" alt="Screenshot listing chord" src="https://github.com/thanhhoa214/learning/assets/32329202/07317eb7-4b6a-4af7-ac93-8eb674571362">
<img width="1168" alt="Screenshot detail chord" src="https://github.com/thanhhoa214/learning/assets/32329202/7b7cc8b2-ee39-444b-9613-764030ba96c7">

## Links:
- Presentation Slide: https://docs.google.com/presentation/d/1qqtGA9xPvtwxTMRX5pzevOXwMSXjpMzGoe1Zokf9mwQ/edit?usp=sharing
- Live demo link: https://chordchain.vercel.app
- Live contract on Goerli: https://goerli.etherscan.io/address/0x856f519403bee9ce058ffe368c3f67de3aec64d4

## Project & Tech stack

- `chordchain-fe` ~ Web ~ [Live Demo](https://chordchain.vercel.app):
  - NextJS 14, Tailwind
  - shadcn-ui: UI library
  - `usehooks-ts`: handy common React hooks
  - `@pinata/sdk`: IPFS file management
  - `alchemy-sdk`: Alchemy NFT APIs
  - WalletConnect (including wagmi, viem): Wallet connection
  - `fast-fuzzy`: Fuzzy searching
  - `@openapitools/openapi-generator-cli`: Generate strict typed APIs from OpenAPI spec
- `chordchain-contract` ~ Smart Contract ~ [Live Contract](https://goerli.etherscan.io/address/0x856f519403bee9ce058ffe368c3f67de3aec64d4):
  - Solidity + Openzeppelin

## Features

- Smart Contract was deployed to Goerli testnet
- Login with variant wallets ()
- Upload a song with chords as a NFT
- List NFTs (searchable)
- Detail of a NFT
- Get NFTs of an address (uploader)
- Donate for uploader

## Development

1. Register accounts for Pinata and Alchemy
2. Set up environment variables following 2 `.env.example` files in each project
3. Run `npm i` for each project
4. Deploy contract to goerli (or localhost) by running `npm run goerli:deploy` under `chordchain-contract` folder
5. Update `CHORDCHAIN_GOERLI_CONTRACT` constant in `chordchain-fe/lib/chordchain-contract/index.ts` to the new deployed address
6. Run `npm run dev` to start web project

## Testing Data Examples

### Tips: Ask ChatGPT to help generating your favorite songs or random songs
```
Act as a music collector, generate 10 songs with chords in the following sample format
{"name":"Nothing gonna change my love for you","lyric":"If I [C]had to [G/B]live my life [Am]without you near me\nThe days would [C]all be empty\nThe nights [C]would seem so long\n \nWith you, I see forever oh so clearly\nI might have been [G]in love before\nBut it [Am]never felt this strong","composer":"Beethoven","genre":"acoustic","artist":{"name":"Alan","tone":"Am","musicLink":"https://www.youtube.com/watch?v=mUg5aEy-8CQ"}}
```

### Song 1: "Summer Breeze"
```
See the [G]curtains [D/F#]hangin' in the [Em]window
In the evenin' [G]on a Friday [D]night
A little [Cmaj7]light a-shinin' [G/B]through the [Am]window
Lets me know [G]everything's [D]alright
```

Composer: Seals and Crofts

Genre: Folk

Artist: Seals and Crofts

Music Link: https://www.youtube.com/watch?v=GQQbjpomexo


### Song 2: "Hotel California"
```
On a dark [Bm]desert [F#]highway, [A]cool wind in my [E]hair
Warm smell of [G]colitas, [D]rising up through the [Em]air
Up ahead in the [F#]distance, I [A]saw a shimmering [E]light
My head grew [G]heavy and my [D]sight grew dim, I [Em]had to stop for the [F#]night
```
Composer: Eagles

Genre: Rock

Artist: Eagles

Music Link: https://open.spotify.com/track/4GkOfUKUqDDgoeiov8Uqyi

### Song 3: "Hallelujah"
```
I've [C]heard there was a [Am]secret chord
That [C]David played and it [Am]pleased the Lord
But [F]you don't really [G]care for music, [C]do ya?
Well, it [F]goes like this, the [G]fourth, the [Am]fifth
The [F]minor fall, the [G]major lift
The baffled [Am]king composing [Em]Hallelujah
```
Composer: Leonard Cohen

Genre: Folk Rock

Artist: Leonard Cohen

Music Link: https://www.youtube.com/watch?v=YrLk4vdY28Q


### Song 4: "Let It Be"
```
When I [C]find myself in [G]times of trouble
Mother [Am]Mary comes to [F]me
Speaking [C]words of wisdom
Let it [G]be [F]Let it [C]be [G]Let it [Am]be
[F]Let it [C]be [G]Whisper [F]words of [C]wisdom
Let it [G]be
```
Composer: The Beatles

Genre: Rock

Artist: The Beatles

Music Link: https://youtu.be/QDYfEBY9NM4

## TODO

- [x] List NFTs
- [x] Detail NFT
- [x] **fuzzy** search by song's name, lyric, composer, artist
- [x] Use `openapi-generator` to generate Farcaster API spec
- [ ] Log in with Farcaster app
- [ ] Like/comment using Farcaster API
- [ ] Filter for genres, composer, artist, tone
- [ ] [Open Graph protocol](https://ogp.me/) for sharing
- [ ] Cursor to track current word in the song (aka karaoke mode)
- [ ] Channel (QR code cast) for group of users to play/sing together
- [ ] Strict type for calling contract using Viem
- [ ] Implement update chord by replace IPFS file
- [ ] Implement delete chord
