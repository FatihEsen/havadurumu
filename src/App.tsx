import { useState } from 'react'
import { useWeather } from './hooks/useWeather'
import { formatDate, getDayName, getWindDirection, getWeatherInfo } from './lib/weather-utils'
import { TuiWeatherView } from './components/TuiWeatherView'
import './App.css'

function App() {
  const {
    city,
    searchCity,
    setSearchCity,
    geoData,
    weatherData,
    loading,
    error,
    inputError,
    handleSearchSubmit,
  } = useWeather()

  const [viewMode, setViewMode] = useState<'card' | 'tui'>('card')

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo">
            <span className="prompt">~/</span>
            <span className="cmd">hava-durumu</span>
          </div>

          <div className="view-toggle">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              UI
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'tui' ? 'active' : ''}`}
              onClick={() => setViewMode('tui')}
            >
              TUI
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="search-form">
            <span className="search-prompt">{'>'}</span>
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Şehir ara..."
              className="search-input"
              disabled={loading}
            />
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? '...' : '↵'}
            </button>
          </form>

          {inputError && <div className="error-msg">Error: {inputError}</div>}
        </header>

        {error && (
          <div className="error-box">
            <span className="error-icon">✖</span>
            <span>{error}</span>
          </div>
        )}

        {weatherData && !error && viewMode === 'card' && (
          <main className="weather-content">
            <section className="current-weather">
              <div className="location-info">
                <h1 className="city-name">{geoData?.name ?? city}</h1>
                {geoData?.admin1 && <span className="region">{geoData.admin1}, {geoData.country}</span>}
              </div>

              <div className="main-stats">
                <div className="temp-display">
                  <span className="temp-icon">{getWeatherInfo(weatherData.current.weather_code).icon}</span>
                  <span className="temp-value">{Math.round(weatherData.current.temperature_2m)}°</span>
                  <span className="temp-unit">C</span>
                </div>
                <div className="weather-desc">
                  {getWeatherInfo(weatherData.current.weather_code).tr}
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-card">
                  <span className="detail-label">[NEM]</span>
                  <span className="detail-value">{weatherData.current.relative_humidity_2m || '--'}%</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">[RZGR]</span>
                  <span className="detail-value">{Math.round(weatherData.current.wind_speed_10m)} km/s</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">[BSNC]</span>
                  <span className="detail-value">{Math.round(weatherData.current.pressure_msl || 0)} hPa</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">[HSS]</span>
                  <span className="detail-value">{Math.round(weatherData.current.wind_gusts_10m)} km/s</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">[YON]</span>
                  <span className="detail-value">{getWindDirection(weatherData.current.wind_direction_10m)}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">[BUL]</span>
                  <span className="detail-value">{weatherData.current.cloud_cover ?? '--'}%</span>
                </div>
              </div>
            </section>

            <section className="forecast-section">
              <h2 className="section-title">
                <span className="prompt">$</span> 7 Günlük Tahmin
              </h2>
              <div className="forecast-grid">
                {weatherData.daily.time.map((day, index) => {
                  const weather = getWeatherInfo(weatherData.daily.weather_code[index])
                  const isToday = index === 0
                  return (
                    <div key={day} className={`forecast-card ${isToday ? 'today' : ''}`}>
                      <div className="forecast-day">
                        {isToday ? 'Bugün' : getDayName(day)}
                      </div>
                      <div className="forecast-date">
                        {formatDate(day)}
                      </div>
                      <div className="forecast-icon">
                        {weather.icon}
                      </div>
                      <div className="forecast-desc">
                        {weather.tr}
                      </div>
                      <div className="forecast-temps">
                        <span className="temp-max">↑{Math.round(weatherData.daily.temperature_2m_max[index])}°</span>
                        <span className="temp-min">↓{Math.round(weatherData.daily.temperature_2m_min[index])}°</span>
                      </div>
                      <div className="precipitation">
                        💧 {weatherData.daily.precipitation_probability_max[index] || 0}%
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </main>
        )}

        {weatherData && !error && viewMode === 'tui' && (
          <div className="tui-wrapper">
            <TuiWeatherView city={city} geoData={geoData} weatherData={weatherData} />
          </div>
        )}

        {loading && !weatherData && (
          <div className="loading">
            <div className="loading-text">
              <span className="prompt">$</span> Veriler yükleniyor
              <span className="dots">...</span>
            </div>
          </div>
        )}

        <footer className="footer">
          <span className="prompt">$</span> Veri kaynağı:
          <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="api-link">
            Open-Meteo API
          </a>
          <span className="separator">|</span>
          <span className="prompt">~</span>
        </footer>
      </div>
    </div>
  )
}

export default App
