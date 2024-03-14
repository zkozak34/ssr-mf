import express from 'express';
import dotenv from 'dotenv';
import { constructServerLayout, sendLayoutHTTPResponse } from 'single-spa-layout/server';
import { getImportMaps } from 'single-spa-web-server-utils';
import fetch from 'node-fetch';

dotenv.config();
const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();
app.use(express.static('./public'));
app.use('/browser', express.static('./browser'));

const serverLayout = constructServerLayout({
  filePath: './index.html'
});

app.get('*', async (req, res) => {

  const importMapsPromise = getImportMaps({ url: process.env.IMPORT_MAP_URL, req, allowOverrides: true })
    .then(({ nodeImportMap, browserImportMap }) => {
      global.nodeLoader?.setImportMapPromise(Promise.resolve(nodeImportMap));
      if (isDevelopment) {
        browserImportMap.imports["@tesodev/root-config"] = "http://localhost:3000/browser/root-config.js";
        browserImportMap.imports["@tesodev/root-config"] = "http://localhost:3000/";
      }

      return { nodeImportMap, browserImportMap }
    })
    .catch(err => res.status(500).send(err.toString()));

  const fragments = {
    importmap: async () => {
      const { browserImportMap } = await importMapsPromise;
      return `<script type="systemjs-importmap">${JSON.stringify(browserImportMap, null, 2)}</script>`;
    },
  };

  const renderFragment = (name) => fragments[name]();
  const fetchPromises = {};

  sendLayoutHTTPResponse({
    res,
    serverLayout,
    urlPath: req.originalUrl,
    renderFragment,
    async renderApplication({ appName, propsPromise }) {
      const content = await applicationContent({ appName, propsPromise, importMapsPromise, fetchPromises })
      return content.body;
    },
    async retrieveApplicationHeaders({ appName, propsPromise }) {
      const content = await applicationContent({ appName, propsPromise, importMapsPromise, fetchPromises })
      return content.headers;
    },
    assembleFinalHeaders(allHeaders) {
      return Object.assign(
        {},
        ...Object.values(allHeaders).map((a) => a.appHeaders),
      );
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function fetchMicrofrontend(appUrl, props) {
  return fetch(new URL(appUrl).origin, { headers: props })
    .then((response) => response)
    .catch((err) => console.error(err));
}

async function applicationContent({ appName, propsPromise, importMapsPromise, fetchPromises }) {
  const props = await propsPromise;
  const appUrl = await importMapsPromise.then(({ browserImportMap }) => browserImportMap.imports[appName]);
  const fetchPromise = fetchPromises[appName] || (fetchPromises[appName] = fetchMicrofrontend(appUrl, props));
  const response = await fetchPromise;
  return response;
}