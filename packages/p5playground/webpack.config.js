const fs = require('fs')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** components rule */
const components = {
  test: /\.(js|ts)x?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-transform-strict-mode',
          '@babel/plugin-syntax-dynamic-import',
          ['@babel/plugin-transform-modules-commonjs', { loose: true }],
          'istanbul',
        ],
      },
    },
    {
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(__dirname, 'tsconfig.json'),
        context: path.resolve(__dirname, 'src'),
        // generate declaration files and source maps in the "dist" folder
        // instead of the "src" folder
        onlyCompileBundledFiles: true,
        transpileOnly: false,
        compilerOptions: {
          declarationDir: path.resolve(__dirname, 'dist'),
          // declaration: true,
          sourceMap: true,
        },
      },
    },
  ],
}

/** mdx doc rule */
const mdxDoc = {
  test: /\.mdx?$/,
  use: ['babel-loader', '@mdx-js/loader'],
}

/**
 * all files rule including fonts
 * 'include' key is needed to not interfere sprite svg rule
 */
const files = {
  test: /\.(jpg|jpeg|png|gif|svg|pdf|woff|woff2|eot|ttf)$/,
  loader: 'file-loader',
  include: path.resolve(__dirname, 'assets'),
}

const svg = {
  test: /\.svg$/,
  include: path.resolve(__dirname, 'src/svg'),
  oneOf: [
    {
      resourceQuery: /inline/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
        'react-svg-loader',
      ],
    },
    {
      use: [
        {
          loader: 'svg-sprite-loader',
          options: { symbolId: '[name]' },
        },
        {
          loader: 'svgo-loader',
          options: {},
        },
      ],
    },
  ],
}

const css = {
  test: /\.css$/i,
  use: [
    // For development builds
    'style-loader',
    'css-loader',
  ],
}

module.exports = async () => {
  const { generatedEntries, generatedPlugins } = await getDirectoryEntries()

  return {
    experiments: {
      asyncWebAssembly: true,
    },
    entry: {
      index: path.resolve(__dirname, 'src/index.ts'),
      ...generatedEntries,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
      library: 'p5playground',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'this',
    },

    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist'),
        },
      ],
      port: 4040,
      open: true,
      hot: true,
      compress: true,
    },
    module: {
      rules: [
        // Rule for CSS files
        css,
        // Rule for TypeScript files
        components,
        mdxDoc,
        files,
        svg,
      ],
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.mdx',
        '.css',
        '.scss',
        '.svg',
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['dist/*'],
      }),
      // Plugin for extracting CSS into separate files
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
      ...generatedPlugins,
    ],
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
  }
}

const getDirectoryEntries = async () => {
  const generatedPlugins = []
  const generatedEntries = {}

  const directories = ['games', 'sketches']

  for (const directory of directories) {
    const DIRECTORY_PREFIX = path.join(__dirname, 'src/' + directory)

    let entries
    try {
      entries = await filterDirectoriesRecursively(DIRECTORY_PREFIX)
    } catch (err) {
      console.error(`Error reading directory ${DIRECTORY_PREFIX}: ${err}`)
      continue
    }

    if (entries) {
      for (const entry of entries) {
        const name = path.parse(entry.name).name
        const plugin = new HtmlWebpackPlugin({
          filename: directory + '/' + entry.name + '/' + name + '.html',
          chunks: [name],
          template: 'template.html',
        })

        generatedEntries[name] = {
          import: path.join(DIRECTORY_PREFIX, entry.name),
        }

        generatedPlugins.push(plugin)
      }
    }
  }

  return { generatedEntries, generatedPlugins }
}

const filterDirectoriesRecursively = async (dirPath) => {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true })
  const directories = entries.filter((entry) => entry.isDirectory())

  const subDirectories = await Promise.all(
    directories.map(async (directory) => {
      const subDirPath = path.join(dirPath, directory.name)
      return filterDirectoriesRecursively(subDirPath)
    })
  )

  return directories.concat(...subDirectories)
}
