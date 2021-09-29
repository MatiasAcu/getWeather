export interface Preferences {
  unit: string
  language: Language
  locations: string[]
  lastGPSLocation: string

}


interface Language {
  name: string
  code: string
}

