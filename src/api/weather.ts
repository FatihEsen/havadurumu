import { GeoLocation, WeatherData } from '../types/weather'

const GEO_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export async function fetchGeo(cityName: string): Promise<GeoLocation | null> {
  const url = `${GEO_BASE_URL}?name=${encodeURIComponent(cityName)}&count=1&language=tr&format=json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Konum arama hatası')
  }

  const json = await response.json()

  if (!json.results || json.results.length === 0) {
    return null
  }

  const location = json.results[0]

  const geoLocation: GeoLocation = {
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    country: location.country,
    admin1: location.admin1,
  }

  return geoLocation
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const currentParams = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
    timezone: 'auto',
  }).toString()

  const dailyParams = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum',
    timezone: 'auto',
    forecast_days: '7',
  }).toString()

  const [currentRes, dailyRes] = await Promise.all([
    fetch(`${FORECAST_BASE_URL}?${currentParams}`),
    fetch(`${FORECAST_BASE_URL}?${dailyParams}`),
  ])

  if (!currentRes.ok || !dailyRes.ok) {
    throw new Error('Hava durumu verileri alınamadı')
  }

  const currentData = await currentRes.json()
  const dailyData = await dailyRes.json()

  return {
    current: currentData.current,
    daily: dailyData.daily,
    timezone: currentData.timezone,
  }
}

