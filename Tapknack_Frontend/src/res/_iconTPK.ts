import tpkIcon from "./tpk.png";
import icNotification from "./ic/icNotification_48.svg";

const TPK: TPKIconProps = {
  TPK: tpkIcon,
  icNotification: icNotification
};

export interface TPKIconProps {
  TPK: string;
  icNotification: string;
}

export default TPK;
