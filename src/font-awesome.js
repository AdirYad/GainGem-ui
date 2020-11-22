import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faMoneyCheckAlt,
  faQuestion,
  faMedal,
  faCoins,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBuffer,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHandshake
} from "@fortawesome/free-regular-svg-icons";

export default {
  icons: library.add(
    // Solid
    faChevronRight,
    faChevronLeft,
    faSignInAlt,
    faSignOutAlt,
    faUser,
    faMoneyCheckAlt,
    faQuestion,
    faMedal,
    faCoins,
    faGift,

    // Brands
    faBuffer,

    // Regular
    faHandshake,
  ),
};