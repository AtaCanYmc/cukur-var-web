/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string
    readonly VITE_APP_YEAR: string
    readonly VITE_CONTACT_EMAIL: string
    readonly VITE_GITHUB_URL: string
    readonly VITE_CITY_NAME: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
