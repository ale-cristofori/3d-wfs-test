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

var vectorSource = new ol.source.Vector({
  loader: function(extent, resolution, projection) {
    try {
          var url = "http://pkc.locationcentre.co.uk/data_services/wfs.ashx?id=w8cuE73dsKQRQCDfO-YBhw~~&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=PKC:Solar_Panels_Standard_Applications_545&SRSNAME=EPSG:4326&BBOX=" + extent.join(",");
    $.ajax({ url: url, 
             type: 'GET',
             dataType: 'text/xml', 
             crossDomain: true,
             jsonp: true
             }).done(loadFeatures);
    }
    catch(err) {
      alert(err);
    }

  },
  strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
    maxZoom: 19
  }))
});

window.loadFeatures = function(response) {
  alert("Window.loadfeatures");
  vectorSource.addFeatures(geojsonFormat.readFeatures(response));
};

var vector = new ol.layer.Vector({
  source: vectorSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(0, 0, 255, 1.0)',
      width: 2
    })
  })
});


function loadFeatures(response) {
  alert("loadFeatures");
  var vector = new ol.format.WFS();
  vectorSource.addFeatures(vector.readFeatures(response));
}

var ol2d = new ol.Map({
  layers: [layer,vector],
  target: 'map2d',
  view: view
});


var ol3d = new olcs.OLCesium({map: ol2d});
var scene = ol3d.getCesiumScene();
var terrainProvider = new Cesium.CesiumTerrainProvider({
    url : '//assets.agi.com/stk-terrain/world'
});
//scene.terrainProvider = terrainProvider;

ol3d.setEnabled(true);

//document.getElementById('map2d').innerHTML = ol3d.getEnabled().toString()