import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import TripsWorkshopView from '../../components/Trips/TripsWorkshopView';

const WorkshopTab = (props) => {
  const { token, publicWorkShop, isPublicView, travelMap } = props;

  return (
    <Fragment>
      <TripsWorkshopView isPublicView={isPublicView} view={"workshop"} token={token} publicWorkShop={publicWorkShop} travelMap={travelMap} />
    </Fragment>
  )
}

export default compose(withRouter)(WorkshopTab)
