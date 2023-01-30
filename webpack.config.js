const path = require("path");
const liveServer = require("live-server");
const loader = require("css-loader");

const dev = process.env.NODE_ENV == "development";

//solo se va a ejecutar cuando este en modo developmebt
if (dev) {
  liveServer.start({
    //root: "./",
    file: "index.html",
  });
}

module.exports = {
  watch: dev,
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        //el ts-loader me permite importar los archivos .ts
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        //con el css-loader, me permite importar archivos .css
        //y el style-loader, me permite inyectar la etiqueta style
        //en el head del index.html
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
