/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSavedMetrics } from "../../../state/user";
import usePrevious from "../../../state/hooks/usePrevious";
import { palette } from "../../../constants/style";
import savedPeople from "../../../../assets/audio/task_screen/add-points.mp3";
import Song from "../Audio/Song";

const containerStyle = css`
  height: 130px;
  width: 700px;
  background-color: ${palette.lemon};
  display: grid;
  grid-template-columns: repeat(3, auto);
  padding: 0 80px;
  border-radius: 80px;
  align-content: center;
  justify-content: space-between;
  justify-self: end;
  z-index: 10;
  box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.15);
`;

const summaryStyle = css`
  top: 90px;
  right: 40px;
  position: absolute;
  transition: all 1s;
`;

const justifyRightStyle = css`
  margin-top: 10px;
  margin-right: 60px;
`;

const headerStyle = css`
  font-family: "Luckiest Guy", sans-serif;
  font-size: 4rem;
  line-height: 3.75rem;
  color: ${palette.blue};
  margin: 0;
  padding: 0;
`;

const labelStyle = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 4rem;
  color: ${palette.blue};
  margin: 0;
  line-height: 130px;
  vertical-align: middle;
`;

const savedNumber = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 4.5rem;
  color: ${palette.red};
  display: inline-block;
  transition: all 1s;
  transform: scale(1);
  margin-right: unset;
`;

const changedSize = css`
  transform: scale(3);
  margin-right: 20px;
`;

const SavedBar = ({
  justifyRight,
  isSummary,
  initialSummaryStyle,
  savedMetrics
}) => {
  const [playPointsSound, setPlayPointsSound] = useState(false);
  const [soundTimeout, setSoundTimeout] = useState(null);
  const [savedType, setSavedType] = useState(null);
  const prevPeopleSaved = usePrevious(savedMetrics.peopleSaved);
  const prevPetsSaved = usePrevious(savedMetrics.petsSaved);

  useEffect(() => {
    const savedMorePeople = prevPeopleSaved < savedMetrics.peopleSaved;
    const savedPets = prevPetsSaved < savedMetrics.petsSaved;
    if (savedMorePeople || savedPets) {
      setPlayPointsSound(true);
      const newTimeout = setTimeout(() => {
        setPlayPointsSound(false);
        setSavedType(null);
      }, 2000);
      setSoundTimeout(newTimeout);
      let saved = "both";
      if (!savedMorePeople) {
        saved = "pets";
      } else if (!savedPets) {
        saved = "people";
      }
      setSavedType(saved);
    }

    return () => {
      if (soundTimeout) clearTimeout(soundTimeout);
    };
  }, [
    prevPeopleSaved,
    prevPetsSaved,
    savedMetrics.peopleSaved,
    savedMetrics.petsSaved,
    soundTimeout
  ]);

  const savedMorePeople = savedType === "people" || savedType === "both";
  const savedPets = savedType === "pets" || savedType === "both";

  return (
    <div
      css={css`
        ${containerStyle};
        ${justifyRight && justifyRightStyle};
        ${isSummary ? summaryStyle : ""}
        ${initialSummaryStyle || ""}
      `}
    >
      <p css={headerStyle}>
        You
        <br />
        Saved
      </p>
      <p css={labelStyle}>
        People{" "}
        <span
          css={css`
            ${savedNumber};
            ${playPointsSound && savedMorePeople ? changedSize : ""}
          `}
        >
          {savedMetrics.peopleSaved}
        </span>
      </p>
      <p css={labelStyle}>
        Pets{" "}
        <span
          css={css`
            ${savedNumber};
            ${playPointsSound && savedPets ? changedSize : ""}
          `}
        >
          {savedMetrics.petsSaved}
        </span>
      </p>
      {playPointsSound && (
        <Song songFile={savedPeople} shouldLoop={false} volume={1.0} />
      )}
    </div>
  );
};

SavedBar.propTypes = {
  justifyRight: PropTypes.bool,
  isSummary: PropTypes.bool,
  initialSummaryStyle: PropTypes.shape({}),
  savedMetrics: PropTypes.shape({
    petsSaved: PropTypes.number,
    peopleSaved: PropTypes.number
  })
};

const mapStateToProps = state => ({
  savedMetrics: getSavedMetrics(state)
});

export default connect(mapStateToProps)(SavedBar);
