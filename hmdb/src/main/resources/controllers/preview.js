const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

exports.get = function (req) {
    const content = portal.getContent();
    const photoId = (Array.isArray(content.data.photos)) ? content.data.photos[0] : content.data.photos;
    const view = resolve('preview.html');
    const model = {
      cssUrl: portal.assetUrl({path: 'styles.css'}),
      displayName: (content.displayName) ? content.displayName : null,
      imageUrl: (photoId) ?
        portal.imageUrl({
          id: photoId,
          scale: "width(500)"
        }) :
        null
    };
    
   return {
    body: thymeleaf.render(view, model), 
   }
};