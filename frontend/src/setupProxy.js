var requirejs = require('requirejs');
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/.netlify/functions/enforceCode',
        createProxyMiddleware({
          target: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
          changeOrigin: true,
        })
    );

    app.use(
      '/textFileSubmission',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })
  );

  app.use(
    '/printSubmittedFile', 
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
);

  app.use(
  '/uploadFiles',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);

app.use(
  '/storeTestCaseFiles',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);


app.use(
  '/runTestCases',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);

app.use(
  '/getInputTestCases',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);


app.use(
  '/registerExamDetails',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);

app.use(
  '/getUnmarkedPastTests',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);

app.use(
  '/updateMarks',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);


app.use(
  '/getAllTestMarks',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);

app.use(
  '/searchTestUsingIdAndName',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);



}
