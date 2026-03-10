export interface GeoLocation {
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}

export interface CurrentWeather {
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  is_day: number
  precipitation: number
  rain: number
  showers: number
  snowfall: number
  weather_code: number
  cloud_cover: number
  pressure_msl: number
  surface_pressure: number
  wind_speed_10m: number
  wind_direction_10m: number
  wind_gusts_10m: number
  time: string
}

export interface DailyForecast {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_probability_max: number[]
  precipitation_sum: number[]
  rain_sum: number[]
  showers_sum: number[]
  snowfall_sum: number[]
}

export interface WeatherData {
  current: CurrentWeather
  daily: DailyForecast
  timezone: string
}

