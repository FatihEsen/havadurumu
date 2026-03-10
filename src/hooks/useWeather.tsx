import { useCallback, useEffect, useState } from 'react'
import { fetchGeo, fetchWeather } from '../api/weather'
import { GeoLocation, WeatherData } from '../types/weather'

interface UseWeatherResult {
  city: string
  searchCity: string
  geoData: GeoLocation | null
  weatherData: WeatherData | null
  loading: boolean
  error: string
  inputError: string
  setSearchCity: (value: string) => void
  handleSearchSubmit: (e: React.FormEvent) => Promise<void>
}

export function useWeather(): UseWeatherResult {
  const [city, setCity] = useState('Istanbul')
  const [searchCity, setSearchCity] = useState('')
  const [geoData, setGeoData] = useState<GeoLocation | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [inputError, setInputError] = useState('')

  const fetchAndSetWeather = useCallback(
    async (location: GeoLocation, cityToStore: string) => {
      try {
        setLoading(true)
        setError('')

        const data = await fetchWeather(location.latitude, location.longitude)

        setGeoData(location)
        setWeatherData(data)
        setCity(location.name)

        localStorage.setItem('lastCity', cityToStore)
      } catch (err) {
        setError('Hava durumu verileri yüklenirken hata oluştu')
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const handleSearchSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!searchCity.trim()) {
        setInputError('Lütfen bir şehir adı girin')
        return
      }

      try {
        setInputError('')
        setError('')

        const location = await fetchGeo(searchCity.trim())

        if (!location) {
          setInputError('Şehir bulunamadı')
          return
        }

        await fetchAndSetWeather(location, location.name)
      } catch (err) {
        setInputError('Arama sırasında hata oluştu')
        console.error(err)
      }
    },
    [fetchAndSetWeather, searchCity]
  )

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity') || 'Istanbul'
    setCity(lastCity)

    const initWeather = async () => {
      try {
        const location = await fetchGeo(lastCity)

        if (location) {
          await fetchAndSetWeather(location, lastCity)
        }
      } catch (err) {
        console.error(err)
      }
    }

    void initWeather()
  }, [fetchAndSetWeather])

  return {
    city,
    searchCity,
    geoData,
    weatherData,
    loading,
    error,
    inputError,
    setSearchCity,
    handleSearchSubmit,
  }
}

