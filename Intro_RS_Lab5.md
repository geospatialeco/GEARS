![Shaun Levick](Logo3.png)
GEARS - Geospatial Engineering and Remote Sensing lab - https://www.gears-lab.com

# Introduction to Remote Sensing of the Environment
Lab 5 - Image Classification - part 2
--------------

### Acknowledgments
- Google Earth Engine Team
- Google Earth Engine Developers group

------

### Prerequisites
-------------

Completion of this lab exercise requires use of the Google Chrome browser and a Google Earth Engine account. If you have not yet signed up - please do so now in a new tab:

[Earth Engine account registration](https://signup.earthengine.google.com/)

Once registered you can access the Earth Engine environment here:
https://code.earthengine.google.com

This lab follows on from others in this series:

[Lab 1](https://github.com/geospatialeco/GEARS/blob/master/Intro_RS_Lab1.md) -
[Lab 2](https://github.com/geospatialeco/GEARS/blob/master/Intro_RS_Lab2.md) -
[Lab 3](https://github.com/geospatialeco/GEARS/blob/master/Intro_RS_Lab3.md) -
[Lab 4](https://github.com/geospatialeco/GEARS/blob/master/Intro_RS_Lab4.md) -

------------------------------------------------------------------------

### Objective


The objective of this lab is to further your understanding of the image classification process, and improve the classification from last week. While doing this we will also cover some useful tips and tricks - including working with polygons and charting spectra.

----------

## Load up your previous classification from last week

Open you script from last week's lab. If you did not save it, repeat the steps from [Lab 4](https://github.com/geospatialeco/GEARS/blob/master/Intro_RS_Lab4.md) and be sure to save it this time.

I have provided the full code below, but remember that you need to manually collect the training data and assign landcover properties.

```JavaScript
//Filter image collection for time window, spatial location, and cloud cover
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('2016-05-01', '2016-06-30')
    .sort('CLOUD_COVER')
    .first());

//Add true-clour composite to map
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'],min:0, max: 3000}, 'True colour image');

//Merge features into one FeatureCollection
var classNames = urban.merge(water).merge(forest).merge(agriculture);

//Select bands to use
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];

//Sample the reflectance values for each training point
var training = image.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});

//Train the classifier - in this case using a CART regression tree
var classifier = ee.Classifier.cart().train({
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});

//Run the classification
var classified = image.select(bands).classify(classifier);

//Display the classification map
Map.centerObject(classNames, 11);
Map.addLayer(classified,
{min: 0, max: 3, palette: ['red', 'blue', 'green','yellow']},
'classification');
```

![Figure 1. Classified map](screenshots/l4_classified.png)

-----
## Improving the Classification

We ended last week with a discuss on whether or not we were happy with this classification. Even without any quantitative.


-------
### Thank you

I hope you found that useful. A recorded video of this tutorial can be found on my YouTube Channel's [Introduction to Remote Sensing of the Environment Playlist](https://www.youtube.com/playlist?list=PLf6lu3bePWHDi3-lrSqiyInMGQXM34TSV) and on my lab website [GEARS](https://www.gears-lab.com).

#### Kind regards, Shaun R Levick
------
