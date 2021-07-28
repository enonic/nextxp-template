var portal = require('/lib/xp/portal');

exports.get = function (req) {
    var title = "Headless Movie Database";
    var heading = "Welcome to the Headless Movie Database";
    var assetUrl = portal.assetUrl({
        path: 'styles.css'
      });
    var siteUrl = portal.pageUrl({
        id: portal.getSite()._id
      });
    var apiUrl = siteUrl+"/api";
    var baseUrl = req.scheme+"://"+req.host+":"+req.port;
    var sdkMode = (req.host === 'localhost' || req.host === '127.0.0.1') ? true : false;
    var draftPath = "/site/hmdb/draft/hmdb";
    var draftApi = baseUrl+draftPath+"/api";
    var masterPath = "/site/hmdb/master/hmdb";
    var masterApi = baseUrl+masterPath+"/api";
    var branch = req.branch;
    var mode = req.mode;
    var vhostDocs = "https://developer.enonic.com/docs/xp/stable/deployment/vhosts";

    var standard = `
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="${assetUrl}"/>
      </head>
      <body>
          <h1>${heading}</h1>
          <h3>You are now accessing the "${branch}" branch in "${mode}" mode</h3>   
          Visit the <a href="${apiUrl}">Headless GraphQL API</a> of this branch.
        </body>
    </html>
    `;

    var inline = `
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="${assetUrl}"/>
      </head>
      <body>
          <h1>${heading}</h1>
          <p><strong>NOTE:</strong> You may instantly access the API by clicking the Content Studio "Preview" button above.</p>
          <h3>Enonic Cloud Demo</h3>
          <p>If this application was installed as part of an Enonic Cloud demo, you may access the draft and live APIs on public URLs by visiting one of the solution's pre-defined routes.</p>
          <h3>Other deployments</h3>
          <p>For custom deployments, a vhost must be configured to reach this site and it's API publicly.
            The internal paths to use for vhosts mappings are:<br/><br/>
            Draft site: ${draftPath}<br/>
            Live site: ${masterPath}. <br/><br/>
            For more details on using vhosts, check out the <a target="_blank" href="${vhostDocs}">vhosts documentation</a>.
          </p>
        </body>
    </html>
    `;

    var sdk = `
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="${assetUrl}"/>
      </head>
      <body>
          <h1>${heading}</h1>
          You appear to be running this app as a developer.
          Visit the links below in a new browser tab to access the Headless API:
  
          <h3>Drafts API</h3>
          <a target="_blank" href="${draftApi}">${draftApi}</a>
          
          <h3>Live API (Publish site to access)</h3>
          <a target="_blank" href="${masterApi}">${masterApi}</a>
     
          <h3>Pretty URLs</h3>
          When deploying to a server, use <a target="_blank" href="${vhostDocs}">vhosts</a> to create custom URLs like "example.com/api".
      </body>
    </html>
    `;

    if (sdkMode) {
      return  {
        body: sdk
      }
    } else if (req.mode == 'inline' || req.mode == 'edit') {
      return  {
        body: inline
      }
    } else {
      return {
        body: standard
      }
    }

  };
