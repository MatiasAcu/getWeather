export interface WeatherInfo {
  temperature: temperature
  humidity: humidity
  climate: climate
  pressure: pressure
  wind: wind
  cloudiness: number
  city: city
  date: Date
}

interface climate {
  value: string
  id: number
}

interface city {
  name: string
  country: string
}

interface humidity {
  value: number
  unit: string
}

interface temperature {
  value: number
  unit: string
}

interface pressure {
  value: number
  unit: string
}

interface wind {
  value: number
  unit: string
  name: string
}
