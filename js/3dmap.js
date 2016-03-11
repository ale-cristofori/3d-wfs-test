var projection = new ol.proj.Projection({
                code: 'EPSG:27700',
                extent: [0.0, 0.0, 700000.0, 1300000.0],
                units: 'm'
            });
            ol.proj.addProjection(projection);

var view = new ol.View({
  projection: projection,
  center: [278202, 694687],
  zoom: 7
});

var layer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://wms.locationcentre.co.uk/services/thinkwhere1234/service?',
    params: {
      'LAYERS': 'os_background_bng_colour',
      'FORMAT' : 'image/png'
    }
  })
});

var ol2d = new ol.Map({
  layers: [layer],
  target: 'map2d',
  view: view
});


var ol3d = new olcs.OLCesium({map: ol2d});
var scene = ol3d.getCesiumScene();
var terrainProvider = new Cesium.CesiumTerrainProvider({
    url : '//assets.agi.com/stk-terrain/world'
});
scene.terrainProvider = terrainProvider;

ol3d.setEnabled(false);
