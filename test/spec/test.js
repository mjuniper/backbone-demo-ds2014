/*global backboneDemoDs2014, expect, describe, before, it */

(function () {
  'use strict';

  describe('GasPriceModel', function () {
    describe('getDisplayValue', function () {
      var model;
      before(function () {
        model = new backboneDemoDs2014.GasPriceModel();
      });

      it('should return a number with 2 deciaml places and no $', function(){
        model.set('regular', '$2.145');
        expect(model.getDisplayValue()).to.eql(2.16);
      });
    });
  });

  describe('GasPricesCollection', function () {
    
    describe('getMin, getMax', function () {
      var coll;
      before(function () {
        var json = '[{\"state\":\"State\",\"regular\":\"Regular\",\"premium\":\"Premium\",\"mid\":\"Mid\",\"diesel\":\"Premium\"},{\"state\":\"Alaska\",\"regular\":\"$3.802\",\"premium\":\"$3.963\",\"mid\":\"$3.861\",\"diesel\":\"$3.963\"},{\"state\":\"Alabama\",\"regular\":\"$3.210\",\"premium\":\"$3.617\",\"mid\":\"$3.419\",\"diesel\":\"$3.617\"},{\"state\":\"Arkansas\",\"regular\":\"$3.239\",\"premium\":\"$3.577\",\"mid\":\"$3.391\",\"diesel\":\"$3.577\"},{\"state\":\"Arizona\",\"regular\":\"$3.336\",\"premium\":\"$3.593\",\"mid\":\"$3.459\",\"diesel\":\"$3.593\"},{\"state\":\"California\",\"regular\":\"$3.881\",\"premium\":\"$4.077\",\"mid\":\"$3.979\",\"diesel\":\"$4.077\"},{\"state\":\"Colorado\",\"regular\":\"$3.573\",\"premium\":\"$3.844\",\"mid\":\"$3.707\",\"diesel\":\"$3.844\"},{\"state\":\"Connecticut\",\"regular\":\"$3.760\",\"premium\":\"$4.082\",\"mid\":\"$3.922\",\"diesel\":\"$4.082\"},{\"state\":\"District of Columbia\",\"regular\":\"$3.524\",\"premium\":\"$3.957\",\"mid\":\"$3.818\",\"diesel\":\"$3.957\"},{\"state\":\"Delaware\",\"regular\":\"$3.487\",\"premium\":\"$3.900\",\"mid\":\"$3.720\",\"diesel\":\"$3.900\"},{\"state\":\"Florida\",\"regular\":\"$3.451\",\"premium\":\"$3.866\",\"mid\":\"$3.678\",\"diesel\":\"$3.866\"},{\"state\":\"Georgia\",\"regular\":\"$3.292\",\"premium\":\"$3.667\",\"mid\":\"$3.483\",\"diesel\":\"$3.667\"},{\"state\":\"Hawaii\",\"regular\":\"$4.108\",\"premium\":\"$4.297\",\"mid\":\"$4.205\",\"diesel\":\"$4.297\"},{\"state\":\"Iowa\",\"regular\":\"$3.495\",\"premium\":\"$3.710\",\"mid\":\"$3.384\",\"diesel\":\"$3.710\"},{\"state\":\"Idaho\",\"regular\":\"$3.319\",\"premium\":\"$3.549\",\"mid\":\"$3.429\",\"diesel\":\"$3.549\"},{\"state\":\"Illinois\",\"regular\":\"$3.709\",\"premium\":\"$4.144\",\"mid\":\"$3.912\",\"diesel\":\"$4.144\"},{\"state\":\"Indiana\",\"regular\":\"$3.585\",\"premium\":\"$3.828\",\"mid\":\"$3.707\",\"diesel\":\"$3.828\"},{\"state\":\"Kansas\",\"regular\":\"$3.373\",\"premium\":\"$3.656\",\"mid\":\"$3.489\",\"diesel\":\"$3.656\"},{\"state\":\"Kentucky\",\"regular\":\"$3.400\",\"premium\":\"$3.659\",\"mid\":\"$3.534\",\"diesel\":\"$3.659\"},{\"state\":\"Louisiana\",\"regular\":\"$3.247\",\"premium\":\"$3.610\",\"mid\":\"$3.438\",\"diesel\":\"$3.610\"},{\"state\":\"Massachusetts\",\"regular\":\"$3.544\",\"premium\":\"$3.843\",\"mid\":\"$3.709\",\"diesel\":\"$3.843\"},{\"state\":\"Maryland\",\"regular\":\"$3.471\",\"premium\":\"$3.870\",\"mid\":\"$3.691\",\"diesel\":\"$3.870\"},{\"state\":\"Maine\",\"regular\":\"$3.610\",\"premium\":\"$3.870\",\"mid\":\"$3.728\",\"diesel\":\"$3.870\"},{\"state\":\"Michigan\",\"regular\":\"$3.671\",\"premium\":\"$3.962\",\"mid\":\"$3.811\",\"diesel\":\"$3.962\"},{\"state\":\"Minnesota\",\"regular\":\"$3.466\",\"premium\":\"$3.791\",\"mid\":\"$3.580\",\"diesel\":\"$3.791\"},{\"state\":\"Missouri\",\"regular\":\"$3.288\",\"premium\":\"$3.600\",\"mid\":\"$3.432\",\"diesel\":\"$3.600\"},{\"state\":\"Mississippi\",\"regular\":\"$3.208\",\"premium\":\"$3.586\",\"mid\":\"$3.385\",\"diesel\":\"$3.586\"},{\"state\":\"Montana\",\"regular\":\"$3.206\",\"premium\":\"$3.463\",\"mid\":\"$3.306\",\"diesel\":\"$3.463\"},{\"state\":\"North Carolina\",\"regular\":\"$3.357\",\"premium\":\"$3.757\",\"mid\":\"$3.550\",\"diesel\":\"$3.757\"},{\"state\":\"North Dakota\",\"regular\":\"$3.483\",\"premium\":\"$3.816\",\"mid\":\"$3.567\",\"diesel\":\"$3.816\"},{\"state\":\"Nebraska\",\"regular\":\"$3.477\",\"premium\":\"$3.716\",\"mid\":\"$3.459\",\"diesel\":\"$3.716\"},{\"state\":\"New Hampshire\",\"regular\":\"$3.491\",\"premium\":\"$3.786\",\"mid\":\"$3.640\",\"diesel\":\"$3.786\"},{\"state\":\"New Jersey\",\"regular\":\"$3.390\",\"premium\":\"$3.717\",\"mid\":\"$3.579\",\"diesel\":\"$3.717\"},{\"state\":\"New Mexico\",\"regular\":\"$3.334\",\"premium\":\"$3.571\",\"mid\":\"$3.456\",\"diesel\":\"$3.571\"},{\"state\":\"Nevada\",\"regular\":\"$3.483\",\"premium\":\"$3.704\",\"mid\":\"$3.591\",\"diesel\":\"$3.704\"},{\"state\":\"New York\",\"regular\":\"$3.755\",\"premium\":\"$4.073\",\"mid\":\"$3.919\",\"diesel\":\"$4.073\"},{\"state\":\"Ohio\",\"regular\":\"$3.556\",\"premium\":\"$3.796\",\"mid\":\"$3.673\",\"diesel\":\"$3.796\"},{\"state\":\"Oklahoma\",\"regular\":\"$3.354\",\"premium\":\"$3.635\",\"mid\":\"$3.481\",\"diesel\":\"$3.635\"},{\"state\":\"Oregon\",\"regular\":\"$3.464\",\"premium\":\"$3.677\",\"mid\":\"$3.560\",\"diesel\":\"$3.677\"},{\"state\":\"Pennsylvania\",\"regular\":\"$3.641\",\"premium\":\"$3.939\",\"mid\":\"$3.770\",\"diesel\":\"$3.939\"},{\"state\":\"Rhode Island\",\"regular\":\"$3.581\",\"premium\":\"$3.903\",\"mid\":\"$3.759\",\"diesel\":\"$3.903\"},{\"state\":\"South Carolina\",\"regular\":\"$3.171\",\"premium\":\"$3.582\",\"mid\":\"$3.366\",\"diesel\":\"$3.582\"},{\"state\":\"South Dakota\",\"regular\":\"$3.471\",\"premium\":\"$3.780\",\"mid\":\"$3.434\",\"diesel\":\"$3.780\"},{\"state\":\"Tennessee\",\"regular\":\"$3.214\",\"premium\":\"$3.583\",\"mid\":\"$3.393\",\"diesel\":\"$3.583\"},{\"state\":\"Texas\",\"regular\":\"$3.224\",\"premium\":\"$3.575\",\"mid\":\"$3.408\",\"diesel\":\"$3.575\"},{\"state\":\"Utah\",\"regular\":\"$3.313\",\"premium\":\"$3.536\",\"mid\":\"$3.427\",\"diesel\":\"$3.536\"},{\"state\":\"Virginia\",\"regular\":\"$3.253\",\"premium\":\"$3.677\",\"mid\":\"$3.484\",\"diesel\":\"$3.677\"},{\"state\":\"Vermont\",\"regular\":\"$3.620\",\"premium\":\"$3.988\",\"mid\":\"$3.801\",\"diesel\":\"$3.988\"},{\"state\":\"Washington\",\"regular\":\"$3.495\",\"premium\":\"$3.714\",\"mid\":\"$3.604\",\"diesel\":\"$3.714\"},{\"state\":\"Wisconsin\",\"regular\":\"$3.567\",\"premium\":\"$3.974\",\"mid\":\"$3.730\",\"diesel\":\"$3.974\"},{\"state\":\"West Virginia\",\"regular\":\"$3.504\",\"premium\":\"$3.762\",\"mid\":\"$3.628\",\"diesel\":\"$3.762\"},{\"state\":\"Wyoming\",\"regular\":\"$3.347\",\"premium\":\"$3.603\",\"mid\":\"$3.468\",\"diesel\":\"$3.603\"}]';
        var data = JSON.parse(json);
        coll = new backboneDemoDs2014.GasPricesCollection(data);
      });

      it('should return a number with 2 deciaml places and no $', function(){
        
      });
    });

  });

})();