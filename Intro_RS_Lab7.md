![Shaun Levick](Logo3.png)
GEARS - Geospatial Ecology and Remote Sensing lab - https://www.gears-lab.com

# Introduction to Remote Sensing of the Environment
Lab 7 - Classification validation and accuracy assessment
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
[Lab 5](https://github.com/geospatialeco/GEARS/blob/master/Intro_RS_Lab5.md) -
[Lab 6](https://github.com/geospatialeco/GEARS/blob/master/Intro_RS_Lab6.md)


------------------------------------------------------------------------

### Objective


The objective of this lab is to learn how to evaluate image classification results and conduct an accuracy assessment using independent validation data.

----------

## Recap - loading an image

1. For a given region of interest (roi - defined by a point geometry), filter the Landsat-8 image collection for a date range and extract a cloud free image (image).

```JavaScript
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('2016-05-01', '2016-06-30')
    .sort('CLOUD_COVER')
    .first());
```
2. Load a true-colour composite to the map view

```JavaScript
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'],min:0, max: 3000}, 'True colour image');
```
## Recap - supervised classification

3. Use the rectangle geometry tool to collect training data for four different landcover types (eg. tWater, tCity, tForest, tOther). Remember to change the Import type to FeatureCollection, and add a common property such as 'landcover' with an integer label starting at 0. Ensure that your total sampled area is less than 5000 pixels.

4. Merge your training data

```JavaScript
//Merge into one FeatureCollection and print details to consloe
var classNames = tWater.merge(tCity).merge(tForest).merge(tOther);
print(classNames);
```
5. Sample the bands within your training data polygons

```JavaScript
//Extract training data from select bands of the image, print to console
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
var training = image.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});
print(training);
```
6. Train the classifier

```JavaScript
//Train classifier - e.g. cart, randomForest, svm
var classifier = ee.Classifier.cart().train({
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});
```

7. Classify the input image

```JavaScript
//Run the classification
var classified = image.select(bands).classify(classifier);
```

8. Add the classified map to the map view

```JavaScript
//Centre the map on your training data coverage
Map.centerObject(classNames, 11);
//Add the classification to the map view, specify colours for classes
Map.addLayer(classified,
{min: 0, max: 3, palette: ['blue', 'red', 'green','yellow']},
'classification');
```

## Classification validation

9. Collect validation data using the rectangle polygon geometry tool:
  - do this in the same way you collected training data
  - use the same property names and labels
  - do not overlap the training data
  - do not exceed 5000 pixels
  - collect examples of the same four classes but call them differently (vWater, vCity, vForest, vOther)

10. Merge your validation polygons into one Feature Collection

```JavaScript
//Merge into one FeatureCollection
var valNames = vWater.merge(vCity).merge(vForest).merge(vOther);
```

11. Sample your classification results to your new validation areas

```JavaScript
var validation = classified.sampleRegions({
  collection: valNames,
  properties: ['landcover'],
  scale: 30,
});
print(validation);
```

12. Run the validation assessment using the error matrix approach

```JavaScript
//Compare the landcover of your validation data against the classification result
var testAccuracy = validation.errorMatrix('landcover', 'classification');
//Print the error matrix to the console
print('Validation error matrix: ', testAccuracy);
//Print the overall accuracy to the console
print('Validation overall accuracy: ', testAccuracy.accuracy());
```
13. Export your error matrix for further analysis to calculate individual class accuracies and User's and Producer's accuracy.

-------
### Thank you

I hope you found that useful. A recorded video of this tutorial can be found on my YouTube Channel's [Introduction to Remote Sensing of the Environment Playlist](https://www.youtube.com/playlist?list=PLf6lu3bePWHDi3-lrSqiyInMGQXM34TSV) and on my lab website [GEARS](https://www.gears-lab.com).

#### Kind regards, Shaun R Levick
------
