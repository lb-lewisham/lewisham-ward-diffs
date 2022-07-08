mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA";

// BOROUGH CENTROID
const center = [-0.01988431810519735, 51.451668516553084];
const zoom = 10;

var before = new mapboxgl.Map({
  container: "before",
  style: "mapbox://styles/mapbox/light-v8",
  center: center,
  zoom: zoom,
});

before.scrollZoom.disable();
before.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-left');

before.on("load", () => {
  before.addSource("before", {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/joe-liad/7fb39968587908b96f6b05f87b3250e0/raw/ff1ade351895b2d5ed39e3b3bfed26c9aa65fcfa/lewisham-wards.geojson",
  });

  before.addLayer({
    id: "before-layer",
    type: "fill",
    source: "before",
    paint: {
      'fill-antialias': true,
      'fill-color': 'rgba(0, 0, 0, 0)',
      'fill-outline-color': 'rgba(0, 183, 235, 0.8)'
    }
  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  before.on('click', 'before-layer', (e) => {
    before.getCanvas().style.cursor = 'pointer';
    popup.setLngLat(e.lngLat).setHTML(e.features[0].properties.name).addTo(before);
  });

  before.on('mouseenter', 'before-layer', function () {
    before.getCanvas().style.cursor = 'pointer';
  });

  before.on('mouseleave', 'before-layer', function () {
    before.getCanvas().style.cursor = '';
    popup.remove();
  });

});

var after = new mapboxgl.Map({
  container: "after",
  style: "mapbox://styles/mapbox/dark-v8",
  center: center,
  zoom: zoom,
});

after.scrollZoom.disable();

after.on("load", () => {
  after.addSource("after", {
    type: "geojson",
    data:
      "https://gist.githubusercontent.com/joe-liad/e66e2ec493ce3de692595b64eeb27b99/raw/bfaafeec350dfe4e5a20866a4660a188f8e6df7d/lewisham-wards.geojson",
  });

  after.addLayer({
    id: "after-layer",
    type: "fill",
    source: "after",
    paint: {
      'fill-antialias': true,
      'fill-color': 'rgba(0, 0, 0, 0)',
      'fill-outline-color': 'rgba(0, 183, 235, 0.8)'
    },
  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  after.on('click', 'after-layer', (e) => {
    after.getCanvas().style.cursor = 'pointer';
    popup.setLngLat(e.lngLat).setHTML(e.features[0].properties.name).addTo(after);
  });

  after.on('mouseenter', 'after-layer', function () {
    after.getCanvas().style.cursor = 'pointer';
  });

  after.on('mouseleave', 'after-layer', function () {
    after.getCanvas().style.cursor = '';
    popup.remove();
  });

});

// Use either of these patterns to select a container for the compare widget
var wrapperSelector = "#wrapper";
var wrapperElement = document.body.querySelectorAll("#wrapper")[0];

// available options
var options = {
  mousemove: true,
  orientation: "horizontal",
};

window.compare = new mapboxgl.Compare(before, after, wrapperSelector);

// HIDE THE BUTTON CREATED BY THE COMPARE PLUGIN
document.getElementById("close-button").style.visibility = "hidden";
