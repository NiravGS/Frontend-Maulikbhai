import React from "react";

import {connect} from "react-redux";

import Experts from "./Experts";
import ExpertsHomePanel from "./ExpertsHomePanel"

const ExpertsMain = ({auth, expert, enthu}) => {
    if(auth.isLogin && (auth.role === 'expert' || auth.role === 'enthusiasts')) {
        return <ExpertsHomePanel expert={expert} enthu={enthu} /> ;
    }
    return <Experts />;
};

function mapStateToProps({auth, expert, enthu}) {
    return {
      auth,
      expert,
      enthu
    }
}

export default  connect(mapStateToProps, null)(ExpertsMain);

