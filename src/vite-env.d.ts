/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UNSPLASH_ACCESS_KEY: string
  readonly VITE_OW_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}