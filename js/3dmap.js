var view = new ol.View({
  projection: 'EPSG:4326',
  center: [-100, 35],
  zoom: 3
});

var layer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://demo.boundlessgeo.com/geoserver/wms',
    params: {
      'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
    }
  })
});

var WFSLayer = new ol.layer.Tile({});

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

//document.getElementById('map2d').innerHTML = ol3d.getEnabled().toString()