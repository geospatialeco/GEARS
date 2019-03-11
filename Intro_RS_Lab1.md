![Shaun Levick](Logo3.png)
GEARS - Geospatial Engineering and Remote Sensing lab - https://www.gears-lab.com

# Introduction to Remote Sensing of the Environment
Lab 1 - Getting started with Google Earth Engine
--------------

### Acknowledgments
- Google Earth Engine Team
- Earth Engine Beginning Curriculum

------

### Prerequisites
-------------

Completion of this lab exercise requires use of the Google Chrome browser and a Google Earth Engine account. If you have not yet signed up - please do so now:

<https://signup.earthengine.google.com/>

Google Earth Engine uses the JavaScript programming language. We will cover the very basics of this language during this course. If you would like more detail you can read through the introduction provided here:

[https://developers.google.com/earth-engine/tutorial\\\_js\\\_01](https://developers.google.com/earth-engine/tutorial\_js\_01)

------------------------------------------------------------------------

### Objective
---------

The objective of this lab is to give you an introduction to the Google Earth Engine processing environment. By the end of this exercise you will be able to search, find and visualize a broad range of remotely sensed datasets.

## 1. The Earth Engine code editor

![Figure 1. The Google Earth Engine environment](gee_editor.png)


1. Editor Panel
	- The Editor Panel is where you write and edit your Javascript code
2. Right Panel
	- Console tab for printing output.
	- Inspector tab for querying map results.
	- Tasks tab for managing long­ running tasks.
3. Left Panel
	- Scripts tab for managing your programming scripts.
	- Docs tab for accessing documentation of Earth Engine objects and methods, as well as a few specific to the Code Editor application
	- Assets tab for managing assets that you upload.
4. Interactive Map
	- For visualizing map layer output
5. Search Bar
	- For finding datasets and places of interest
6. Help Menu
	- User guide ­ reference documentation
	- Help forum ­ Google group for discussing Earth Engine
	- Shortcuts ­ Keyboard shortcuts for the Code Editor
	- Feature Tour ­ overview of the Code Editor
	- Feedback ­ for sending feedback on the Code Editor
	- Suggest a dataset. Our intention is to continue to collect datasets in our public archive
and make them more accessible, so we appreciate suggestions on which new datasets we should ingest into the Earth Engine public archive.

---------


## 2. Getting started with images

1. Navigate to Darwin and zoom in using the mouse wheel.
![Zoom to Darwin](navdarwin.png)


2. Clear the script by selecting "Clear script" from the Reset button dropdown menu.
3. Search for “elevation” and click on the SRTM Digital Elevation Data 30m result to show the dataset description.
4. Click on Import, which moves the variable to the Imports section at the top of your script. Rename the default variable name "image" to be "srtm".
5. Add the image object to the map with the script:

```JavaScript
print(srtm);
```

5. Browse through the information that was printed. Open the “bands” section to show the one band named “elevation”. Note that all this same information is automatically available for all variables in the Imports section.
6. Use the Map.addLayer() method to add the image to the interactive map. We will start simple, without using any of the optional parameters.

```JavaScript
Map.addLayer(srtm);
```

The displayed map will look pretty flat grey, because the default visualization parameters map the full 16­bit range of the data onto the black–white range, but the elevation range is much smaller than that in any particular location. We’ll fix it in a moment.

7. Select the Inspector tab. Then click on a few points on the map to get a feel for the elevation in this area. Finally, set visualization parameters:

```JavaScript
Map.addLayer(srtm, {min: 0, max: 1000});
```

----------

## 4. Applying a computation to an image

1. Pan over to the Kakadu National Park region, where there are some nice elevation differences.
2. Next add a simple computation, for example a threshold on elevation.

```JavaScript    
      var high = srtm.gt(200);
      Map.addLayer(high, {}, 'above 200m');
```

3. Do another computation to compute slope from the elevation data and display it on the map as a separate layer. Also add a third parameter to the addLayer() method, which names the layer.

```JavaScript
var slope = ee.Terrain.slope(srtm);
Map.addLayer(slope, {min: 0, max: 60}, 'slope');
```

4. Layers added to the map will have default names like "Layer 1", "Layer 2", etc. To improve the readability, give each layer a human­readable name.

```JavaScript
var slope = ee.Terrain.slope(srtm);
Map.addLayer(srtm, {min: 0, max: 1000}, 'DEM');
Map.addLayer(slope, {min: 0, max: 60}, 'slope');
```
-------
### Things to try:

- Search for a specific location
- Use the inspector to estimate the value range
- Adjust the visualization parameters
- Look at the documentation tab (i.e. Map.addLayer)
- Try the context­ specific help (Ctrl­ space)

------
