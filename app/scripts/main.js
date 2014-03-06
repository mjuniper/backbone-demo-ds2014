/*global backboneDemoDs2014, $*/

//http://developers.arcgis.com/javascript/samples/data_gas_prices/

if (!this.backboneDemoDs2014 || typeof this.backboneDemoDs2014 !== 'object') {
    this.backboneDemoDs2014 = {};
}


backboneDemoDs2014.GasPriceModel = Backbone.Model.extend({
  getDisplayValue: function () {
    var regular = this.get('regular');
    return parseFloat(parseFloat(regular.replace('$', '')).toFixed(2));
  }
})


backboneDemoDs2014.GasPricesCollection = Backbone.Collection.extend({
  model: backboneDemoDs2014.GasPriceModel,

  url: 'http://apify.heroku.com/api/gasprices.json',

  fetch: function (options) {
    //override fetch to use jsonp
    options = options || {};
    options.dataType = 'jsonp';
    return Backbone.Collection.prototype.fetch.apply(this, [options]);
  },

  parse: function (response, options) {
    return JSON.parse(response);
  },

  getMin: function () {
    var model = this.min(function (item) { return item.getDisplayValue(); });
    return model.getDisplayValue();
  },

  getMax: function () {
    var model = this.max(function (item) { return item.getDisplayValue(); });
    return model.getDisplayValue();
  },

  findGasPrice: function (stateName) {
    var model = this.findWhere({ state: stateName });
    return model.getDisplayValue();
  }
})


backboneDemoDs2014.LegendView = Backbone.View.extend({
  initialize: function (options) {
    _.bindAll(this);

    this.legend = new esri.dijit.Legend({
      map: options.map,
      layerInfos: [{ 'layer': options.fl, 'title': 'Regular Gas' }]
    },'legend');
    this.legend.startup();

    this.tipTemplate = _.template('<strong><%= STATE_NAME %>:  $<%= GAS_DISPLAY %></strong>');

    options.fl.on('mouse-over', this.showTip);
    options.fl.on('mouse-out', this.hideTip);
  },

  el: '#legend',

  showTip: function (e) {
    this.$('.tip').html(this.tipTemplate(e.graphic.attributes));
  },

  hideTip: function () {
    this.$('.tip').empty();
  }
});


backboneDemoDs2014.MapView = Backbone.View.extend({
  initialize: function () {
    _.bindAll(this);
    var bounds = new esri.geometry.Extent({'xmin':-2332499,'ymin':-1530060,'xmax':2252197,'ymax':1856904,'spatialReference':{'wkid':102003}});
    this.map = new esri.Map('map', { 
      extent: bounds,
      lods: [{'level':0, 'resolution': 3966, 'scale': 15000000}],
      slider: false
    });

    this.fl = new esri.layers.FeatureLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3', {
      maxAllowableOffset: this.map.extent.getWidth() / this.map.width,
      mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
      outFields: ['STATE_NAME'],
      visible: true
    });
    // override default renderer so that states aren't drawn
    // until the gas price data has been loaded and is joined
    this.fl.setRenderer(new esri.renderer.SimpleRenderer(null));

    this.updateEndHandler = this.fl.on('update-end', this.onUpdateEnd);

    this.map.addLayer(this.fl);

    this.gasPricesCollection = new backboneDemoDs2014.GasPricesCollection();
  },

  el: '#map',

  onUpdateEnd: function () {
    // get gas price data
    this.updateEndHandler.remove();
    this.gasPricesCollection.fetch()
      .done(this.drawFeatureLayer)
      .fail(this.pricesError);
  },

  drawFeatureLayer: function (data) {
    var gasMin = this.gasPricesCollection.getMin(); 
    var gasMax = this.gasPricesCollection.getMax();

    // add an attribute to each attribute so gas price is displayed
    // on mouse over below the legend
    var displayValue;
    _.each(this.fl.graphics, function(g) {
      displayValue = this.gasPricesCollection.findWhere({ state: g.attributes.STATE_NAME }).getDisplayValue();
      g.attributes.GAS_DISPLAY = displayValue;
    }, this);

    // create a class breaks renderer
    var breaks = this.calcBreaks(gasMin, gasMax, 4);
    // console.log('gas price breaks: ', breaks);
    var sfs = esri.symbol.SimpleFillSymbol;
    var sls = esri.symbol.SimpleLineSymbol;
    var outline = sls('solid', new dojo.Color('#444'), 1);
    var br = new esri.renderer.ClassBreaksRenderer(null, this.findGasPrice);
    br.setMaxInclusive(true);
    br.addBreak(breaks[0], breaks[1], new sfs('solid', outline, new dojo.Color([255, 255, 178, 0.75])));
    br.addBreak(breaks[1], breaks[2], new sfs('solid', outline, new dojo.Color([254, 204, 92, 0.75])));
    br.addBreak(breaks[2], breaks[3], new sfs('solid', outline, new dojo.Color([253, 141, 60, 0.75])));
    br.addBreak(breaks[3], gasMax, new sfs('solid', outline, new dojo.Color([227, 26, 28, 0.75])));

    this.fl.setRenderer(br);
    this.fl.redraw();

    this.legend = new backboneDemoDs2014.LegendView({ map: this.map, fl: this.fl });

    // remove the loading div
    $('#loading').remove();
  },

  findGasPrice: function (graphic) {
    return this.gasPricesCollection.findGasPrice(graphic.attributes.STATE_NAME);
  },

  calcBreaks: function (min, max, numberOfClasses) {
    var range = (max - min) / numberOfClasses;
    var breakValues = [];
    for ( var i = 0; i < numberOfClasses; i++ ) {
      breakValues.push(this.formatDollars(min + ( range * i )));
    }
    // console.log('break values: ', breakValues);
    return breakValues;
  },

  formatDollars: function (num) {
    return dojo.number.format(num, { 'places': 2 });
  },
  
  pricesError: function (e) {
    console.log('error getting gas price data: ', e);
  }
})


$(function () {
  'use strict';
  require([
        'dojo/json', 
        'dojo/_base/connect', 
        'dojo/_base/Color', 
        'dojo/number', 
        
        'esri/map', 
        'esri/geometry/Extent',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/renderers/SimpleRenderer',
        'esri/renderers/ClassBreaksRenderer',

        'esri/layers/FeatureLayer', 
        'esri/dijit/Legend', 
        'esri/request',
 
        'dojo/domReady!'
      ], function(
        JSON, conn, Color, number, 
        Map, Extent, SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer, ClassBreaksRenderer, 
        FeatureLayer, Legend, esriRequest) {

          var mapView = new backboneDemoDs2014.MapView();

        }
      );

});
