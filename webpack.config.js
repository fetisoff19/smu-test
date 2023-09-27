import path from 'path'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin' // поддержка HTML
import MiniCssExtractPlugin from 'mini-css-extract-plugin' // поддержка CSS
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
let mode = 'development' // По умолчан// ию режим development
let target = 'web' // в режиме разработки browserslist не используется
if (process.env.NODE_ENV === 'production') {
  // Режим production, если при запуске вебпака было указано --mode=production
  mode = 'production'
  target = 'browserslist' // в продакшен режиме используем browserslist
}

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html' // Данный html будет использован как шаблон
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css' // Формат имени файла без [contenthash]
    // filename: '[name].[contenthash].css', // Формат имени файла
  }),
  new Dotenv()
]

if (process.env.SERVE) { // Используем плагин только если запускаем devServer
  plugins.push(new ReactRefreshWebpackPlugin())
} // Данный код должен быть размещен после объявления массива plugins

export default {
  mode,
  plugins,
  target,
  entry: './src/index.js',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: process.env.LOCALHOST_PORT,
    static: './dist'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут
    // складываться в dist/assets
    clean: true,
    filename: 'bundle.js',
    publicPath: '/'
  },
  experiments: {
    topLevelAwait: true
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ['html-loader'] }, // Добавляем загрузчик для html
      {
        test: /\.(s[ac]|c)ss$/i, // Добавляем загрузчики стилей
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource'
        // В продакшен режиме изображения размером до 8кб будут инлайнится в код
        // В режиме разработки все изображения будут помещаться в dist/assets
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/, // не обрабатываем файлы из node_modules
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true // Использование кэша для избежания рекомпиляции
            // при каждом запуске
          }
        }
      },
      {
        test: /\.m?js/,
        type: 'javascript/auto'
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.es6', '.scss', '.ttf', '.woff2'], //
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'assets'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@styles': path.resolve(__dirname, 'src/app/styles')
    }
  }
}
