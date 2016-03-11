var view = new ol.View({
  projection: 'EPSG:27700',
  center: ol.proj.transform([-4.71382, 57.16617], 'EPSG:4326', 'EPSG:3857'),
  zoom: 7
});

var layer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://wms.locationcentre.co.uk/service/thinkwhere1234/service?',
    params: {
      'LAYERS': 'os_background_bng_colour'
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

ol3d.setEnabled(true);
