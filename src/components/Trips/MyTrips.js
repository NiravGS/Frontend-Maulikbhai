import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import TripsWorkshopView from './TripsWorkshopView';

const TripsTab = (props) => {
  const { token, publicTrip, isPublicView, travelMap } = props;
  return (
    <Fragment>
      <TripsWorkshopView isPublicView={isPublicView} view={"trips"} token={token} publicTrip={publicTrip} travelMap={travelMap} />
    </Fragment>
  )
}

export default compose(withRouter)(TripsTab)
