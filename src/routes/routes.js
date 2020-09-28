import CreateExpert from "../containers/CreateExpert";
import CreateEnthusiest from "../containers/CreateEnthusiest";
import Experts from "../containers/Experts";
import Message from "../containers/Message";
import ExpertsMain from "../containers/ExpertsMain";
import CreateTrips from '../containers/CreateTrips';
import ExpertProfile from "../containers/ExpertProfile";
import ExpertPublicView from "../containers/ExpertPublicView";
import TripsPublicView from "../containers/TripsPublicView";
import TripsEditView from "../containers/TripsEditView";
import Trips from "../containers/Trips";
import VerifyProfile from "../containers/VerifyProfile";
import EnthusiestProfile from "../containers/EnthusiestProfile";
import Settings from "../containers/ChangePassword";
import ResetPassword from '../containers/ResetPassword';
import Home from '../containers/Home';
import Enthusiast from '../containers/Enthusiast';
import Education from "../containers/Education";
import CreateLearnings from "../containers/CreateLearning";
import Learning from "../containers/Learning";
import WorkShopDetails from "../containers/WorkshopDetails";
import WorkShopEdit from '../containers/WorkShopEdit';
import UpdateLearning from "../containers/UpdateLearning";
import UpdateTrip from "../containers/UpdateTrip";

export const PublicRoutes = [
  { path: '/home', component: ExpertsMain },
  { path: '/experts', component: Experts },
  { path: '/message', component: Message },
  { path: '/enthusiast', component: Enthusiast },
  { path: '/expeditions', component: Trips },
  { path: '/expert-profile/:id', component: ExpertPublicView },
  { path: '/trips-details/:id', component: TripsPublicView },
  { path: '/verify-email/:token', component: VerifyProfile },
  { path: "/reset-password/:token", component: ResetPassword },
  { path: "/education", component: Education },
  { path: "/learning", component: Learning },
  { path: "/learning-details/:id", component: WorkShopDetails },
  { path: "/", component: Home }
]

export const PrivateUserRoutes = [
  { path: '/create-enthusiest-profile', component: CreateEnthusiest },
  { path: '/create-expert-profile', component: CreateExpert },
]

export const PrivateRoutes = [
  { path: '/settings', component: Settings },
  { path: '/profile-expert', component: ExpertProfile },
  { path: '/create-trips', component: CreateTrips },
  { path: '/enthusiest-profile', component: EnthusiestProfile },
  { path: '/update-expert-profile', component: CreateExpert },
  { path: '/update-enthu-profile', component: CreateEnthusiest },
  { path: "/learning-edit/:id", component: WorkShopEdit },
  { path: "/trip-edit/:id", component: TripsEditView },
  { path: "/update-learning/:id", component: UpdateLearning },
  { path: "/update-trip/:id", component: UpdateTrip },
  { path: '/create-learnings', component: CreateLearnings },
]