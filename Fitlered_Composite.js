// Filter an image collection by date and region to make a
// median pixel composite.
//
// See also: ClippedComposite, which crops the output image
// instead of filtering the input collection.

// Filter to only include images intersecting Colorado or Utah.


// Create a Landsat 8 composite for 2016, and filter by
// the bounds of the FeatureCollection.
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .filterDate('2016-01-01', '2016-12-31')
    .filterBounds(polygon);
print(collection)

// Compute the median in each band, in each pixel.
var median = collection.median();

// Select the red, green and blue bands.
var result = median.select('B4', 'B3', 'B2');
Map.addLayer(result, {max:0.4}, 'Landsat 8 Composite');
Map.setCenter(-47, -15, 7);
