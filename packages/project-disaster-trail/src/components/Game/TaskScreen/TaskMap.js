import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { BaseMap, IconMap } from "@hackoregon/component-library";

import { getCompletedTasks } from "../../../state/tasks";
import {
  poiIconMapping,
  poiIconZoomScale,
  getPosition,
  asGeoJSON,
  initialLon,
  initialLat
} from "./mapUtils";

const TaskMap = ({ activeTask, completedTasks, tasks }) => {
  // TODO: Change lon / lat for task
  // const lon = activeTask ? activeTask.locations[0][0] : initialLon;
  // const lat = activeTask ? activeTask.locations[0][1] : initialLat;
  const lon = initialLon;
  const lat = initialLat;

  const data = asGeoJSON(tasks, activeTask, completedTasks);

  return (
    <BaseMap
      initialZoom={15}
      initialLongitude={lon}
      initialLatitude={lat}
      initialPitch={60}
      navigation={false}
      useContainerHeight
      mapGLOptions={{
        scrollZoom: false,
        dragPan: false,
        dragRotate: false,
        doubleClickZoom: false,
        touchZoom: false,
        touchRotate: false,
        keyboard: false
      }}
      animate
      civicMapStyle="disaster-game"
    >
      <IconMap
        data={data}
        getPosition={getPosition}
        iconAtlas="https://i.imgur.com/ZKYqCqW.png"
        iconMapping={poiIconMapping}
        iconSizeScale={poiIconZoomScale}
        getIcon={d => d.properties.type}
        getSize={() => 12}
      />
    </BaseMap>
  );
};

TaskMap.propTypes = {
  activeTask: PropTypes.shape({
    task: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  }),
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  tasks: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  completedTasks: getCompletedTasks(state)
});

export default connect(mapStateToProps)(TaskMap);
