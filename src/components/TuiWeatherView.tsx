import { GeoLocation, WeatherData } from '../types/weather'
import { formatDate, getDayName, getWeatherInfo } from '../lib/weather-utils'

interface TuiWeatherViewProps {
  city: string
  geoData: GeoLocation | null
  weatherData: WeatherData
}

export function TuiWeatherView({ city, geoData, weatherData }: TuiWeatherViewProps) {
  const locationName = geoData?.name ?? city
  const region = geoData?.admin1 && geoData.country ? `${geoData.admin1}, ${geoData.country}` : geoData?.country

  const currentInfo = getWeatherInfo(weatherData.current.weather_code)

  const currentLines = [
    ` temp : ${Math.round(weatherData.current.temperature_2m)}°C`,
    ` feels: ${Math.round(weatherData.current.apparent_temperature)}°C`,
    ` cond : ${currentInfo.tr}`,
    ` wind : ${Math.round(weatherData.current.wind_speed_10m)} km/s (${weatherData.current.wind_direction_10m}°)`,
    ` gust : ${Math.round(weatherData.current.wind_gusts_10m)} km/s`,
    ` hum  : ${weatherData.current.relative_humidity_2m || 0}%`,
    ` cloud: ${weatherData.current.cloud_cover ?? '--'}%`,
  ]

  const forecastLines = weatherData.daily.time.map((day, index) => {
    const w = getWeatherInfo(weatherData.daily.weather_code[index])
    const dayName = index === 0 ? 'Today' : getDayName(day)
    const dateStr = formatDate(day)
    const tMax = Math.round(weatherData.daily.temperature_2m_max[index])
    const tMin = Math.round(weatherData.daily.temperature_2m_min[index])
    const rainProb = weatherData.daily.precipitation_probability_max[index] || 0

    return ` ${dayName.padEnd(6)} ${dateStr.padEnd(8)} ${w.tr.padEnd(18)}  ↑${String(tMax).padStart(
      2
    )}° ↓${String(tMin).padStart(2)}°  rain:${String(rainProb).padStart(3)}%`
  })

  const allBoxContentLines = [
    ' current ',
    ...currentLines,
    ' 7 day forecast ',
    ...forecastLines,
  ]

  // Biraz ekstra buffer ekleyerek (emoji/geniş karakterler için) kutuyu geniş tut
  const contentWidth = allBoxContentLines.reduce((max, line) => Math.max(max, line.length), 0)
  const innerWidth = contentWidth + 4
  const horizontal = '─'.repeat(innerWidth + 2)
  const top = `┌${horizontal}┐`
  const bottom = `└${horizontal}┘`

  const lines: string[] = []
  lines.push(` location: ${locationName}${region ? ` (${region})` : ''}`)
  lines.push(` timezone: ${weatherData.timezone}`)
  lines.push('')

  // current box
  lines.push(top)
  lines.push(`│${' current '.padEnd(innerWidth + 2)}│`)
  currentLines.forEach((line) => {
    lines.push(`│ ${line.padEnd(innerWidth)} │`)
  })
  lines.push(bottom)
  lines.push('')

  // forecast box
  lines.push(top)
  lines.push(`│${' 7 day forecast '.padEnd(innerWidth + 2)}│`)
  forecastLines.forEach((line) => {
    lines.push(`│ ${line.padEnd(innerWidth)} │`)
  })
  lines.push(bottom)

  return <pre className="tui-root">{lines.join('\n')}</pre>
}

