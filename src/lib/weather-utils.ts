export const weatherCodes: Record<number, { tr: string; icon: string; desc: string }> = {
  0: { tr: 'Açık', icon: '☀️', desc: 'Açık gökyüzü' },
  1: { tr: 'Az Bulutlu', icon: '🌤️', desc: 'Az bulutlu' },
  2: { tr: 'Parçalı Bulutlu', icon: '⛅', desc: 'Parçalı bulutlu' },
  3: { tr: 'Bulutlu', icon: '☁️', desc: 'Bulutlu' },
  45: { tr: 'Sisli', icon: '🌫️', desc: 'Sisli' },
  48: { tr: 'Sisli', icon: '🌫️', desc: 'Sisli' },
  51: { tr: 'Çisenti', icon: '🌧️', desc: 'Çisenti' },
  53: { tr: 'Çisenti', icon: '🌧️', desc: 'Çisenti' },
  55: { tr: 'Çisenti', icon: '🌧️', desc: 'Çisenti' },
  61: { tr: 'Yağmurlu', icon: '🌧️', desc: 'Hafif yağmur' },
  63: { tr: 'Yağmurlu', icon: '🌧️', desc: 'Orta yağmur' },
  65: { tr: 'Sağanak', icon: '🌧️', desc: 'Şiddetli yağmur' },
  71: { tr: 'Karlı', icon: '🌨️', desc: 'Hafif kar' },
  73: { tr: 'Karlı', icon: '🌨️', desc: 'Orta kar' },
  75: { tr: 'Şiddetli Kar', icon: '❄️', desc: 'Şiddetli kar' },
  77: { tr: 'Kar Taneleri', icon: '🌨️', desc: 'Kar taneleri' },
  80: { tr: 'Sağanak Yağış', icon: '🌦️', desc: 'Gökgürültülü yağış' },
  81: { tr: 'Sağanak Yağış', icon: '🌦️', desc: 'Gökgürültülü yağış' },
  82: { tr: 'Şiddetli Sağanak', icon: '⛈️', desc: 'Şiddetli sağanak' },
  85: { tr: 'Kar Sağanağı', icon: '🌨️', desc: 'Kar sağanağı' },
  86: { tr: 'Kar Sağanağı', icon: '🌨️', desc: 'Kar sağanağı' },
  95: { tr: 'Gökgürültülü', icon: '⛈️', desc: 'Gökgürültüsü' },
  96: { tr: 'Gökgürültülü', icon: '⛈️', desc: 'Gökgürültüsü' },
  99: { tr: 'Gökgürültülü', icon: '⛈️', desc: 'Gökgürültüsü' },
}

export const getWindDirection = (deg: number): string => {
  const directions = ['K', 'KB', 'B', 'GB', 'G', 'GD', 'D', 'KD']
  const index = Math.round(deg / 45) % 8
  return directions[index]
}

export const getDayName = (dateStr: string): string => {
  const date = new Date(dateStr)
  const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
  return days[date.getDay()]
}

export const getFullDayName = (dateStr: string): string => {
  const date = new Date(dateStr)
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
  return days[date.getDay()]
}

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
  return `${date.getDate()} ${months[date.getMonth()]}`
}

export const getWeatherInfo = (code: number) => {
  return weatherCodes[code] || { tr: 'Bilinmiyor', icon: '❓', desc: 'Bilinmiyor' }
}

