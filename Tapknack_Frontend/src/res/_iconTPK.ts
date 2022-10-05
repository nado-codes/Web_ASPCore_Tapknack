import tpkIcon from "./tpk.png";
import icNotification from "./ic/icNotification_48.svg";
import icLogout from "./ic/icUnknown_48.png";
import icProfile from "./ic/icUnknown_48.png";

const TPK: TPKIconProps = {
  TPK: tpkIcon,
  icNotification: icNotification,
  icLogout: icLogout,
  icProfile: icProfile,
};

export interface TPKIconProps {
  TPK: string;
  icNotification: string;
  icLogout: string;
  icProfile: string;
}

export default TPK;
