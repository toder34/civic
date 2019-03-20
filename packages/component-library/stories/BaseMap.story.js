import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2 } from '@storybook/addon-knobs';
import { BaseMap } from '../src';

const displayName = BaseMap.displayName || 'BaseMap';

const optionsStyle = {
  'Hack Oregon Light': 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
  'Hack Oregon Dark': 'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
  'Navigation Guidance Night v2': 'mapbox://styles/mapbox/navigation-guidance-night-v2',
  'Dark v9': 'mapbox://styles/mapbox/dark-v9',
};

const demoMap = () => {
  const mapboxStyle = selectV2(
    'Mapbox Style',
    optionsStyle,
    optionsStyle['Hack Oregon Light']
  );

  return <BaseMap mapboxStyle={mapboxStyle} />;
};

const geocoderMap = () => {
  const mapboxStyle = selectV2(
    'Mapbox Style',
    optionsStyle,
    optionsStyle['Hack Oregon Light']
  );

  return (
    <BaseMap
      mapboxStyle={mapboxStyle}
      geocoder
      geocoderOptions={{ placeholder: '🚀search to blast off✨', zoom: 9.5 }} // additional geocoder options https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md
      mapGLOptions={{ dragPan: false }} // additional react-map-gl options https://github.com/uber/react-map-gl/blob/master/src/components/interactive-map.js
    />
  );
};

const staticMap = () => {
  const mapboxStyle = selectV2(
    'Mapbox Style',
    optionsStyle,
    optionsStyle['Hack Oregon Light']
  );

  return (
    <BaseMap
      mapboxStyle={mapboxStyle}
      navigation={false}
      mapGLOptions={{
        scrollZoom: false,
        dragPan: false,
        dragRotate: false,
        doubleClickZoom: false,
        touchZoom: false,
        touchRotate: false,
        keyboard: false,
      }}
    />
  );
};

export default () =>
  storiesOf('Maps/Base Map', module)
    .addDecorator(withKnobs)
    .add('Simple usage', demoMap)
    .add('With geocoder usage', geocoderMap)
    .add('No interactivity', staticMap);
