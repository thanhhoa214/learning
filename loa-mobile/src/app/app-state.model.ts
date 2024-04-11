import { CoreState } from './core/store';
import { AuthState } from './auth/store';
import { LoginState } from './auth/login/store';
import { ProfileState } from './auth/profile/store';
import { ForgotState } from './auth/forgot-password/store/forgot.state';
import { CodeState } from './auth/type-code/store';
import { RegisterState } from './auth/register/store';
import { RegisterBusinessState } from './auth/register-business/store';
import { ChangePasswordState } from './auth/change-password/store';
import { HomeState } from './home/store';
import { ChangeOldPasswordState } from './auth/change-old-password/store';

import { DesignState } from './design/store/design.state';
import { DesignListingState } from './design/listing/store';
import { DesignDetailState } from './design/detail/store';
import { BookmarkState } from './menu/my-bookmark/store';
import { QuestionAnswerState } from './menu/my-question-answer/store';
import { MyRequestDesignState } from './menu/my-request-design/store';
import { ConstructionState } from './construction/store/construction.state';
import { ConstructionListingState } from './construction/listing/store';
import { ConstructionDetailState } from './construction/detail/store';
import { PortfolioDetailState } from './construction/portfolio-detail/store';
import { ContentPageState } from './content-page/store';
import { LifeStyleState } from './life-style/store';
import { DetailLifeStyleState } from './life-style/detail-life-style/store';
import { InteriorShareState } from './interior-share/store';
import { DetailInteriorShareState } from './interior-share/detail-interior-share/store';
import { BookmarkInteriorState } from './interior-share/my-post-interior/store';
import { BookmarkInteriorNoImageState } from './interior-share/my-post-interior/store/bookmark-no-image';
import { BookmarkLifeStyleState } from './menu/my-bookmark/store/life-style';
import { UpgradeBusinessState } from './auth/upgrade-business/store';
import { ReviewState } from './menu/my-construction-review/write-review/store';
import { MyPurchaseDesignState } from './my-interior-design/my-purchased-designs/store';
import { MyShareDesignConstructorState } from './my-interior-design/my-shared-designs/store';
import { CartState } from './design/cart/store';

const menuStates = [BookmarkState, QuestionAnswerState, MyRequestDesignState];
const authStates = [
  AuthState,
  LoginState,
  ForgotState,
  CodeState,
  RegisterState,
  RegisterBusinessState,
  ChangePasswordState,
  ProfileState,
  ChangeOldPasswordState
];
const designStates = [DesignState, DesignListingState, DesignDetailState, CartState];
const lifeStyleStates = [LifeStyleState, DetailLifeStyleState];
const interiorShareStates = [InteriorShareState, DetailInteriorShareState];
const constructionStates = [
  ConstructionState,
  ConstructionListingState,
  ConstructionDetailState,
  PortfolioDetailState
];
const myBookmark = [BookmarkInteriorState, BookmarkInteriorNoImageState, BookmarkLifeStyleState];
const upgradeBusiness = [UpgradeBusinessState];
const reviewConstructor = [ReviewState];
const myInteriorDesign = [MyPurchaseDesignState, MyShareDesignConstructorState];
const storedPurchaseDesignState = ['purchaseDesign.downloadedIds', 'purchaseDesign.prefixUri'];
export const appState = [
  CoreState,
  HomeState,
  ContentPageState,
  ...authStates,
  ...menuStates,
  ...designStates,
  ...constructionStates,
  ...lifeStyleStates,
  ...interiorShareStates,
  ...myBookmark,
  ...upgradeBusiness,
  ...reviewConstructor,
  ...myInteriorDesign
];
export const appStoredState = [CoreState, AuthState, ...storedPurchaseDesignState];
