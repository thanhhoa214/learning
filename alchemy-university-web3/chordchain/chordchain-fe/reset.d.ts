declare namespace NodeJS {
  interface ProcessEnv {
    PINATA_API_KEY: string;
    PINATA_SECRET_KEY: string;
    ALCHEMY_API_KEY: string;
    CHORDCHAIN_GOERLI_CONTRACT: string;
  }
}

namespace JSX {
  interface IntrinsicElements {
    ["giscus-widget"]: DOMAttributes;
  }
}
