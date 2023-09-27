const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel')
} // React hot reloading необходим только в режиме разработки

export default {
  presets: ['@babel/preset-env', '@babel/preset-react'], // Добавляем в babel
  plugins
}
