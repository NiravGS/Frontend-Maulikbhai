import axios from 'axios';
import { setHeadersWithAccessToken } from './index';

// const API_BASE = 'http://ec2-3-127-80-240.eu-central-1.compute.amazonaws.com:8000/api/v1';
const API_BASE = process.env.REACT_APP_APIBASE_1;

export const CreateExpertProfile = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/expert`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(e => e)
    .catch(e => e);
};

export const getPublicProfile = id => {
  return axios
    .get(`${API_BASE}/expert/${id}`)
    .then(e => e)
    .catch(e => e);
};

export const CreateTrips = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/trips`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(e => e)
    .catch(e => e);
};

export const getUpcomingTrip = id => {
  return axios
    .get(`${API_BASE}/trips/upcoming/${id}`)
    .then(e => e)
    .catch(e => e);
};

export const getUpcomingWorkShops = id => {
  return axios
    .get(`${API_BASE}/learnings/upcoming/${id}`)
    .then(e => e)
    .catch(e => e);
};

export const getTravelMap = id => {
  return axios
    .get(`${API_BASE}/trips/travel-map/${id}`)
    .then(e => e)
    .catch(e => e);
};

export const getTripDetail = id => {
  return axios
    .get(`${API_BASE}/trips/${id}`)
    .then(e => e)
    .catch(e => e);
};

export const getAllExperts = (
  data = {
    country: "",
    activity: [],
    langauge: [],
    sortOrder: 1
  }
) => {
  const { country, activity, langauge, sortOrder } = data;
  let act = activity.length ? JSON.stringify(activity) : "";
  let lan = langauge.length ? JSON.stringify(langauge) : "";

  return axios
    .get(
      `${API_BASE}/expert/all?cnty=${country}&langauge=${lan}&activity=${act}&sortOrder=${sortOrder}&page=1`
    )
    .then(e => e)
    .catch(e => e);
};

export const getAllTrips = (data = {
  activity: [],
  country: "",
  difficulty: "",
  month: "",
  price: "",
  suitable: "",
  type: []
}) => {
  const { activity, country, type, month, price, suitable, difficulty, sortBy } = data;
  let typ = type.length ? JSON.stringify(type) : "";
  let act = activity.length ? JSON.stringify(activity) : "";
  return axios.get(`${API_BASE}/trips/all?type=${typ}&country=${country}&activity=${act}&month=${month}&price=${price}&suitable=${suitable}&difficulty=${difficulty}&sortBy=${sortBy}&page=${1}`)
    .then(e => e)
    .catch(e => e);
};

export const UpdateExpertProfile = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/expert`, data)
    .then(e => e)
    .catch(e => e);
};

export const getSimilarTrips = (data) => {
  return axios
    .get(`${API_BASE}/trips/get-similar-trips?activity=${data.activity}&type=${data.type}`)
    .then(e => e)
    .catch(e => e);
}

export const uploadCoverPicture = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/expert/cover`, data)
    .then(e => e)
    .catch(e => e);
}

export const uploadCoverPictureEnth = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/enthusiasts/cover`, data)
    .then(e => e)
    .catch(e => e);
}

export const createEnthProfile = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/enthusiasts`, data)
    .then(e => e)
    .catch(e => e);
}

export const getEnthuProfile = (token) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/enthusiasts`)
    .then(e => e)
    .catch(e => e);
}

export const UpdateEnthuProfile = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/enthusiasts`, data)
    .then(e => e)
    .catch(e => e);
};

export const SendMessage = (token, param, tripId) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/trips/send-message/${tripId}`, param)
    .then(e => e)
    .catch(e => e);
};

export const getExpertMessasges = token => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/expert/messages`)
    .then(e => e)
    .catch(e => e);
};

export const replyToMessasges = (token, param) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/expert/messages`, param)
    .then(e => e)
    .catch(e => e);
};

export const getEnthuMessasges = token => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/enthusiasts/messages`)
    .then(e => e)
    .catch(e => e);
};

export const getAllRecentTrips = () => {
  return axios
    .get(`${API_BASE}/trips/recent`)
    .then(e => e)
    .catch(e => e);
}


export const CreateLearning = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/learnings`, data)
    .then(e => e)
    .catch(e => e);
};

export const UpdateLearning = (id, token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/learnings/${id}`, data)
    .then(e => e)
    .catch(e => e);
};


export const getAllLearnings = () => {
  return axios
    .get(
      `${API_BASE}/learnings/?page=1`
    )
    .then(e => e)
    .catch(e => e);
};

export const GetLearnings = (data) => {
  const {
    activity, country, workshopType,
    workshopMedium, month, price, langauges,
    sortBy, skill
  } = data;
  let act = activity.length ? JSON.stringify(activity) : "";
  let lang = langauges.length ? JSON.stringify(langauges) : "";
  return axios
    .get(`${API_BASE}/learnings?langauges=${lang}&workshopMedium=${workshopMedium}&workshopType=${workshopType}&country=${country}&skill=${skill}&activity=${act}&month=${month}&price=${price}&sortBy=${sortBy}`, data)
    .then(e => e)
    .catch(e => e);
}

export const GetLearningDetails = (id) => {
  return axios
    .get(`${API_BASE}/learnings/${id}`)
    .then(e => e)
    .catch(e => e);
}

export const GetLearningMy = (token) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/learnings/my`)
    .then(e => e)
    .catch(e => e);
}

export const InActiveTrip = (token, id) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/trips/inActive/${id}`)
    .then(e => e)
    .catch(e => e);
}

export const ActiveTrip = (token, id) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/trips/active/${id}`)
    .then(e => e)
    .catch(e => e);
}

export const InActiveWorkshop = (token, id) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/learnings/inActive/${id}`)
    .then(e => e)
    .catch(e => e);
}

export const ActiveWorkshop = (token, id) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/learnings/active/${id}`)
    .then(e => e)
    .catch(e => e);
}

export const GetMyTrips = (token) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/trips`)
    .then(e => e)
    .catch(e => e);
}

export const getSimilarLearnings = (data) => {
  return axios
    .get(`${API_BASE}/learnings/get-similar-trips?activity=${data.activity}`)
    .then(e => e)
    .catch(e => e);
}

export const UpdateTrip = (id, token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/trips/${id}`, data)
    .then(e => e)
    .catch(e => e);
};

export const CreateAlbums = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/album`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(e => e)
    .catch(e => e);
};

export const getAllAlbums = () => {
  return axios.
    get(`${API_BASE}/album/all`)
    .then(e => e)
    .catch(e => e);
};

export const getMyAlbums = (token) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/album/my`)
    .then(e => e)
    .catch(e => e);
}

export const deleteAlbums = (token, id) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/album/${id}`)
    .then(e => e)
    .catch(e => e);
}
