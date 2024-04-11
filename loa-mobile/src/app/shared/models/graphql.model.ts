export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  cart?: Maybe<CartNode>;
  orders?: Maybe<OrderNodeConnection>;
  order?: Maybe<OrderNode>;
  historiesShareDesign?: Maybe<HistoryShareDesignNodeConnection>;
  historyShareDesign?: Maybe<HistoryShareDesignNode>;
  galleries?: Maybe<GalleryNodeConnection>;
  gallery?: Maybe<GalleryNode>;
  topicShares?: Maybe<TopicShareNodeConnection>;
  topicShare?: Maybe<TopicShareNode>;
  topicViews?: Maybe<TopicViewNodeConnection>;
  topicView?: Maybe<TopicViewNode>;
  topicFollows?: Maybe<TopicFollowNodeConnection>;
  topicFollow?: Maybe<TopicFollowNode>;
  topics?: Maybe<TopicNodeConnection>;
  topic?: Maybe<TopicNode>;
  articleShares?: Maybe<ArticleShareNodeConnection>;
  articleShare?: Maybe<ArticleShareNode>;
  articleViews?: Maybe<ArticleViewNodeConnection>;
  articleView?: Maybe<ArticleViewNode>;
  articleFollows?: Maybe<ArticleFollowNodeConnection>;
  articleFollow?: Maybe<ArticleFollowNode>;
  articleCategories?: Maybe<ArticleCategoryNodeConnection>;
  articleCategory?: Maybe<ArticleCategoryNode>;
  articles?: Maybe<ArticleNodeConnection>;
  article?: Maybe<ArticleNode>;
  bannerGroups?: Maybe<Array<Maybe<BannerGroupNode>>>;
  bannerGroup?: Maybe<BannerGroupNode>;
  banners?: Maybe<BannerNodeConnection>;
  banner?: Maybe<BannerNode>;
  contentPages?: Maybe<ContentPageNodeConnection>;
  contentPage?: Maybe<ContentPageNode>;
  designs?: Maybe<DesignNodeConnection>;
  design?: Maybe<DesignNode>;
  designsQA?: Maybe<DesignQuestionAndAnswerNodeConnection>;
  designQA?: Maybe<DesignQuestionAndAnswerNode>;
  designsBookmarks?: Maybe<DesignBookmarksNodeConnection>;
  designBookmarks?: Maybe<DesignBookmarksNode>;
  designsViewed?: Maybe<DesignViewNodeConnection>;
  designViewed?: Maybe<DesignViewNode>;
  designsInquiries?: Maybe<DesignInquiryNodeConnection>;
  designInquiry?: Maybe<DesignInquiryNode>;
  designsPurchased?: Maybe<DesignNodeConnection>;
  designPurchased?: Maybe<DesignNode>;
  designsHistoryShareWithCc?: Maybe<DesignNodeConnection>;
  customers?: Maybe<UserNodeConnection>;
  customer?: Maybe<UserNode>;
  constructors?: Maybe<UserNodeConnection>;
  constructor?: Maybe<UserNode>;
  userProfile?: Maybe<UserNode>;
  portfolios?: Maybe<PortfolioNodeConnection>;
  portfolio?: Maybe<PortfolioNode>;
  businessAll?: Maybe<UserNodeConnection>;
  business?: Maybe<UserNode>;
  constructionReviews?: Maybe<ConstructionReviewNodeConnection>;
  constructionReview?: Maybe<ConstructionReviewNode>;
  _debug?: Maybe<DjangoDebug>;
};

export type QueryOrdersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryOrderArgs = {
  id: Scalars['String'];
};

export type QueryHistoriesShareDesignArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['String']>;
  constructor?: Maybe<Scalars['String']>;
  design?: Maybe<Scalars['String']>;
  read?: Maybe<Scalars['Boolean']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryHistoryShareDesignArgs = {
  id: Scalars['String'];
};

export type QueryGalleriesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryGalleryArgs = {
  id: Scalars['String'];
};

export type QueryTopicSharesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  topicId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  shareTo?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryTopicShareArgs = {
  id: Scalars['String'];
};

export type QueryTopicViewsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  topicId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryTopicViewArgs = {
  id: Scalars['String'];
};

export type QueryTopicFollowsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  topicId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  hasImages?: Maybe<Scalars['Boolean']>;
  hasContent?: Maybe<Scalars['Boolean']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryTopicFollowArgs = {
  id: Scalars['String'];
};

export type QueryTopicsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  hasImages?: Maybe<Scalars['Boolean']>;
  hasContent?: Maybe<Scalars['Boolean']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryTopicArgs = {
  id: Scalars['String'];
};

export type QueryArticleSharesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  articleId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  shareTo?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryArticleShareArgs = {
  id: Scalars['String'];
};

export type QueryArticleViewsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  articleId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryArticleViewArgs = {
  id: Scalars['String'];
};

export type QueryArticleFollowsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  articleId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryArticleFollowArgs = {
  id: Scalars['String'];
};

export type QueryArticleCategoriesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryArticleCategoryArgs = {
  id: Scalars['String'];
};

export type QueryArticlesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryArticleArgs = {
  id: Scalars['String'];
};

export type QueryBannerGroupArgs = {
  id: Scalars['String'];
};

export type QueryBannersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
  groupId?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryBannerArgs = {
  id: Scalars['String'];
};

export type QueryContentPagesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryContentPageArgs = {
  id: Scalars['String'];
};

export type QueryDesignsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  projectName?: Maybe<Scalars['String']>;
  designType?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  typeOfHouse?: Maybe<Scalars['String']>;
  roomType?: Maybe<Scalars['String']>;
  priceTo?: Maybe<Scalars['String']>;
  priceFrom?: Maybe<Scalars['String']>;
  areaTo?: Maybe<Scalars['String']>;
  areaFrom?: Maybe<Scalars['String']>;
  estimateCostFrom?: Maybe<Scalars['String']>;
  estimateCostTo?: Maybe<Scalars['String']>;
  reviewedOnDate?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryDesignArgs = {
  id: Scalars['String'];
};

export type QueryDesignsQaArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryDesignQaArgs = {
  id: Scalars['String'];
};

export type QueryDesignsBookmarksArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryDesignBookmarksArgs = {
  id: Scalars['String'];
};

export type QueryDesignsViewedArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryDesignViewedArgs = {
  id: Scalars['String'];
};

export type QueryDesignsInquiriesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryDesignInquiryArgs = {
  id: Scalars['String'];
};

export type QueryDesignsPurchasedArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  projectName?: Maybe<Scalars['String']>;
  designType?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  typeOfHouse?: Maybe<Scalars['String']>;
  roomType?: Maybe<Scalars['String']>;
  priceTo?: Maybe<Scalars['String']>;
  priceFrom?: Maybe<Scalars['String']>;
  areaTo?: Maybe<Scalars['String']>;
  areaFrom?: Maybe<Scalars['String']>;
  estimateCostFrom?: Maybe<Scalars['String']>;
  estimateCostTo?: Maybe<Scalars['String']>;
  reviewedOnDate?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryDesignPurchasedArgs = {
  id: Scalars['String'];
};

export type QueryDesignsHistoryShareWithCcArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  projectName?: Maybe<Scalars['String']>;
  designType?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  typeOfHouse?: Maybe<Scalars['String']>;
  roomType?: Maybe<Scalars['String']>;
  priceTo?: Maybe<Scalars['String']>;
  priceFrom?: Maybe<Scalars['String']>;
  areaTo?: Maybe<Scalars['String']>;
  areaFrom?: Maybe<Scalars['String']>;
  estimateCostFrom?: Maybe<Scalars['String']>;
  estimateCostTo?: Maybe<Scalars['String']>;
  reviewedOnDate?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryCustomersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  loginMethod?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryCustomerArgs = {
  id: Scalars['String'];
};

export type QueryConstructorsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  loginMethod?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryConstructorArgs = {
  id: Scalars['String'];
};

export type QueryPortfoliosArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  projectName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  projectType?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  totalCostTo?: Maybe<Scalars['String']>;
  totalCostFrom?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryPortfolioArgs = {
  id: Scalars['String'];
};

export type QueryBusinessAllArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  loginMethod?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryBusinessArgs = {
  id: Scalars['String'];
};

export type QueryConstructionReviewsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
  construction?: Maybe<Scalars['String']>;
  reviewer?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryConstructionReviewArgs = {
  id: Scalars['String'];
};

export type CartNode = CustomizeInterface & {
  __typename?: 'CartNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  user: UserNode;
  details: Array<CartDetailNode>;
};

export type CustomizeInterface = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type UserNode = CustomizeInterface & {
  __typename?: 'UserNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  userType: Array<Scalars['String']>;
  isActive: Scalars['Boolean'];
  avatar?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  loginMethod: UserLoginMethod;
  constructor?: Maybe<ConstructorNode>;
  business: Array<BusinessNode>;
  bookmarks: DesignBookmarksNodeConnection;
  questionAnswer: DesignQuestionAndAnswerNodeConnection;
  designView: DesignViewNodeConnection;
  inquiry: DesignInquiryNodeConnection;
  articleView: ArticleViewNodeConnection;
  zalo: Array<ZaloNode>;
  facebook: Array<FacebookNode>;
};

export type UserNodeBookmarksArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type UserNodeQuestionAnswerArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type UserNodeDesignViewArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type UserNodeInquiryArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type UserNodeArticleViewArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  articleId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum UserLoginMethod {
  /** System */
  System = 'SYSTEM',
  /** Facebook */
  Facebook = 'FACEBOOK',
  /** Zalo */
  Zalo = 'ZALO',
}

export type ConstructorNode = {
  __typename?: 'ConstructorNode';
  id: Scalars['ID'];
  user: UserNode;
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  experiences: Scalars['Int'];
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  hotline?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  rating: Scalars['Float'];
  portfolio: PortfolioNodeConnection;
};

export type ConstructorNodePortfolioArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  projectName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  projectType?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  totalCostTo?: Maybe<Scalars['String']>;
  totalCostFrom?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type PortfolioNodeConnection = {
  __typename?: 'PortfolioNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PortfolioNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

/** A Relay edge containing a `PortfolioNode` and its cursor. */
export type PortfolioNodeEdge = {
  __typename?: 'PortfolioNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<PortfolioNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type PortfolioNode = CustomizeInterface & {
  __typename?: 'PortfolioNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  projectName?: Maybe<Scalars['String']>;
  projectType?: Maybe<PortfolioProjectType>;
  location?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  area?: Maybe<Scalars['Float']>;
  period?: Maybe<Scalars['Int']>;
  totalCostTo?: Maybe<Scalars['Float']>;
  totalCostFrom?: Maybe<Scalars['Float']>;
  style?: Maybe<PortfolioStyle>;
  images: Array<PortfolioImageNode>;
  user?: Maybe<UserNode>;
};

/** An enumeration. */
export enum PortfolioProjectType {
  /** Villa */
  Villa = 'VILLA',
  /** Penthouse */
  Penthouse = 'PENTHOUSE',
  /** Studio */
  Studio = 'STUDIO',
  /** Duplex */
  Duplex = 'DUPLEX',
  /** One Bedroom */
  OneBedroom = 'ONE_BEDROOM',
  /** Two Bedroom */
  TwoBedroom = 'TWO_BEDROOM',
  /** Three Bedroom */
  ThreeBedroom = 'THREE_BEDROOM',
  /** Four Bedroom */
  FourBedroom = 'FOUR_BEDROOM',
}

/** An enumeration. */
export enum PortfolioStyle {
  /** Modern */
  Modern = 'MODERN',
  /** Scandinavian */
  Scandinavian = 'SCANDINAVIAN',
  /** Luxury */
  Luxury = 'LUXURY',
  /** Industrial */
  Industrial = 'INDUSTRIAL',
  /** Classic */
  Classic = 'CLASSIC',
  /** Others */
  Others = 'OTHERS',
}

export type PortfolioImageNode = {
  __typename?: 'PortfolioImageNode';
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
};

export type BusinessNode = {
  __typename?: 'BusinessNode';
  id: Scalars['ID'];
  user: UserNode;
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  registerationNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  businessType: BusinessBusinessType;
};

/** An enumeration. */
export enum BusinessBusinessType {
  /** Company */
  Company = 'COMPANY',
  /** Individual */
  Individual = 'INDIVIDUAL',
  /** Freelancer */
  Freelancer = 'FREELANCER',
}

export type DesignBookmarksNodeConnection = {
  __typename?: 'DesignBookmarksNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DesignBookmarksNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `DesignBookmarksNode` and its cursor. */
export type DesignBookmarksNodeEdge = {
  __typename?: 'DesignBookmarksNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<DesignBookmarksNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type DesignBookmarksNode = CustomizeInterface & {
  __typename?: 'DesignBookmarksNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  design: DesignNode;
  user: UserNode;
};

export type DesignNode = CustomizeInterface & {
  __typename?: 'DesignNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  projectName: Scalars['String'];
  tower?: Maybe<Scalars['String']>;
  unitType?: Maybe<Scalars['String']>;
  area: Scalars['Float'];
  typeOfHouse?: Maybe<DesignTypeOfHouse>;
  style: DesignStyle;
  estimateCostTo: Scalars['Float'];
  estimateCostFrom: Scalars['Float'];
  registeredDesignNumber?: Maybe<Scalars['String']>;
  reviewedOnDate: Scalars['DateTime'];
  designType: DesignDesignType;
  description?: Maybe<Scalars['String']>;
  numberOfLikes: Scalars['Int'];
  numberOfViews: Scalars['Int'];
  numberOfBookmarks: Scalars['Int'];
  numberOfQuestions: Scalars['Int'];
  thumbnail?: Maybe<Scalars['String']>;
  promotionalPrice?: Maybe<Scalars['Float']>;
  layout: Array<DesignLayoutNode>;
  wholeHouse?: Maybe<DesignWholeHouseNodeConnection>;
  room?: Maybe<DesignRoomNode>;
  bookmarks: DesignBookmarksNodeConnection;
  questionAnswer: DesignQuestionAndAnswerNodeConnection;
  inquiry: DesignInquiryNodeConnection;
  share: HistoryShareDesignNodeConnection;
  orderDetails: OrderDetailNodeConnection;
  bookmarked?: Maybe<Scalars['Boolean']>;
  liked?: Maybe<Scalars['Boolean']>;
  supportFile?: Maybe<SupportFileNode>;
  price?: Maybe<Scalars['Float']>;
  livingRooms?: Maybe<Scalars['Int']>;
  bathrooms?: Maybe<Scalars['Int']>;
  kitchens?: Maybe<Scalars['Int']>;
  bedrooms?: Maybe<Scalars['Int']>;
  others?: Maybe<Scalars['Int']>;
  bought?: Maybe<Scalars['Boolean']>;
};

export type DesignNodeWholeHouseArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  roomType?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type DesignNodeBookmarksArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type DesignNodeQuestionAnswerArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type DesignNodeInquiryArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type DesignNodeShareArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['String']>;
  constructor?: Maybe<Scalars['String']>;
  design?: Maybe<Scalars['String']>;
  read?: Maybe<Scalars['Boolean']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type DesignNodeOrderDetailsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum DesignTypeOfHouse {
  /** Villa */
  Villa = 'VILLA',
  /** Penthouse */
  Penthouse = 'PENTHOUSE',
  /** Studio */
  Studio = 'STUDIO',
  /** Duplex */
  Duplex = 'DUPLEX',
  /** One Bedroom */
  OneBedroom = 'ONE_BEDROOM',
  /** Two Bedroom */
  TwoBedroom = 'TWO_BEDROOM',
  /** Three Bedroom */
  ThreeBedroom = 'THREE_BEDROOM',
  /** Four Bedroom */
  FourBedroom = 'FOUR_BEDROOM',
}

/** An enumeration. */
export enum DesignStyle {
  /** Modern */
  Modern = 'MODERN',
  /** Scandinavian */
  Scandinavian = 'SCANDINAVIAN',
  /** Luxury */
  Luxury = 'LUXURY',
  /** Industrial */
  Industrial = 'INDUSTRIAL',
  /** Classic */
  Classic = 'CLASSIC',
  /** Other */
  Other = 'OTHER',
}

/** An enumeration. */
export enum DesignDesignType {
  /** Whole House */
  WholeHouse = 'WHOLE_HOUSE',
  /** Room */
  Room = 'ROOM',
}

export type DesignLayoutNode = {
  __typename?: 'DesignLayoutNode';
  id: Scalars['ID'];
  image: Scalars['String'];
};

export type DesignWholeHouseNodeConnection = {
  __typename?: 'DesignWholeHouseNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DesignWholeHouseNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `DesignWholeHouseNode` and its cursor. */
export type DesignWholeHouseNodeEdge = {
  __typename?: 'DesignWholeHouseNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<DesignWholeHouseNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type DesignWholeHouseNode = CustomizeInterface & {
  __typename?: 'DesignWholeHouseNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  design: DesignNode;
  roomType: DesignWholeHouseRoomType;
  preview: Array<DesignWholeHouseImageNode>;
};

/** An enumeration. */
export enum DesignWholeHouseRoomType {
  /** Living Room */
  LivingRoom = 'LIVING_ROOM',
  /** Bedroom */
  Bedroom = 'BEDROOM',
  /** Kitchen */
  Kitchen = 'KITCHEN',
  /** Bathroom */
  Bathroom = 'BATHROOM',
  /** Other */
  Other = 'OTHER',
}

export type DesignWholeHouseImageNode = {
  __typename?: 'DesignWholeHouseImageNode';
  id: Scalars['ID'];
  image: Scalars['String'];
};

export type DesignRoomNode = {
  __typename?: 'DesignRoomNode';
  id: Scalars['ID'];
  roomType: DesignRoomRoomType;
  suggestedAreaSize?: Maybe<Scalars['Float']>;
  planType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  suggestedRoomSize?: Maybe<Scalars['Float']>;
  interiorFinish?: Maybe<Scalars['String']>;
  include?: Maybe<Scalars['String']>;
  preview: Array<DesignRoomImageNode>;
};

/** An enumeration. */
export enum DesignRoomRoomType {
  /** Living Room */
  LivingRoom = 'LIVING_ROOM',
  /** Bedroom */
  Bedroom = 'BEDROOM',
  /** Kitchen */
  Kitchen = 'KITCHEN',
  /** Bathroom */
  Bathroom = 'BATHROOM',
  /** Other */
  Other = 'OTHER',
}

export type DesignRoomImageNode = {
  __typename?: 'DesignRoomImageNode';
  id: Scalars['ID'];
  image: Scalars['String'];
};

export type DesignQuestionAndAnswerNodeConnection = {
  __typename?: 'DesignQuestionAndAnswerNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DesignQuestionAndAnswerNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `DesignQuestionAndAnswerNode` and its cursor. */
export type DesignQuestionAndAnswerNodeEdge = {
  __typename?: 'DesignQuestionAndAnswerNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<DesignQuestionAndAnswerNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type DesignQuestionAndAnswerNode = CustomizeInterface & {
  __typename?: 'DesignQuestionAndAnswerNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  design: DesignNode;
  user: UserNode;
  comment: Scalars['String'];
  level: Scalars['Int'];
  answer: DesignQuestionAndAnswerNodeConnection;
  status?: Maybe<Scalars['Boolean']>;
};

export type DesignQuestionAndAnswerNodeAnswerArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  designId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type DesignInquiryNodeConnection = {
  __typename?: 'DesignInquiryNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DesignInquiryNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `DesignInquiryNode` and its cursor. */
export type DesignInquiryNodeEdge = {
  __typename?: 'DesignInquiryNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<DesignInquiryNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type DesignInquiryNode = CustomizeInterface & {
  __typename?: 'DesignInquiryNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  design: DesignNode;
  user: UserNode;
  email: Scalars['String'];
  read: Scalars['Boolean'];
};

export type HistoryShareDesignNodeConnection = {
  __typename?: 'HistoryShareDesignNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<HistoryShareDesignNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `HistoryShareDesignNode` and its cursor. */
export type HistoryShareDesignNodeEdge = {
  __typename?: 'HistoryShareDesignNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<HistoryShareDesignNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type HistoryShareDesignNode = CustomizeInterface & {
  __typename?: 'HistoryShareDesignNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  user: UserNode;
  constructor: UserNode;
  design: DesignNode;
  read: Scalars['Boolean'];
};

export type OrderDetailNodeConnection = {
  __typename?: 'OrderDetailNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrderDetailNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `OrderDetailNode` and its cursor. */
export type OrderDetailNodeEdge = {
  __typename?: 'OrderDetailNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OrderDetailNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type OrderDetailNode = CustomizeInterface & {
  __typename?: 'OrderDetailNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  order: OrderNode;
  design: DesignNode;
  amount?: Maybe<Scalars['Float']>;
};

export type OrderNode = CustomizeInterface & {
  __typename?: 'OrderNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdBy?: Maybe<UserNode>;
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  status: OrderStatus;
  subAmount?: Maybe<Scalars['Float']>;
  totalAmount: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
  vat: Scalars['Float'];
  details: OrderDetailNodeConnection;
  createdDate?: Maybe<Scalars['DateTime']>;
};

export type OrderNodeDetailsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum OrderStatus {
  /** Paid */
  Paid = 'PAID',
  /** Pending */
  Pending = 'PENDING',
  /** Cancel */
  Cancel = 'CANCEL',
}

export type SupportFileNode = {
  __typename?: 'SupportFileNode';
  specification?: Maybe<DesignFileNodeConnection>;
  cad?: Maybe<DesignFileNodeConnection>;
  estimate?: Maybe<DesignFileNodeConnection>;
  paidDesign?: Maybe<DesignFileNodeConnection>;
};

export type SupportFileNodeSpecificationArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type SupportFileNodeCadArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type SupportFileNodeEstimateArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type SupportFileNodePaidDesignArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type DesignFileNodeConnection = {
  __typename?: 'DesignFileNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DesignFileNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `DesignFileNode` and its cursor. */
export type DesignFileNodeEdge = {
  __typename?: 'DesignFileNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<DesignFileNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type DesignFileNode = CustomizeInterface & {
  __typename?: 'DesignFileNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  fileType: DesignFileFileType;
  size?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum DesignFileFileType {
  /** Specification */
  Specification = 'SPECIFICATION',
  /** Cad */
  Cad = 'CAD',
  /** Estimate */
  Estimate = 'ESTIMATE',
  /** Paid Design */
  PaidDesign = 'PAID_DESIGN',
}

export type DesignViewNodeConnection = {
  __typename?: 'DesignViewNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DesignViewNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `DesignViewNode` and its cursor. */
export type DesignViewNodeEdge = {
  __typename?: 'DesignViewNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<DesignViewNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type DesignViewNode = CustomizeInterface & {
  __typename?: 'DesignViewNode';
  created?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  design: DesignNode;
  user?: Maybe<UserNode>;
};

export type ArticleViewNodeConnection = {
  __typename?: 'ArticleViewNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ArticleViewNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ArticleViewNode` and its cursor. */
export type ArticleViewNodeEdge = {
  __typename?: 'ArticleViewNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ArticleViewNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ArticleViewNode = CustomizeInterface & {
  __typename?: 'ArticleViewNode';
  created?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  article?: Maybe<ArticleNode>;
  user?: Maybe<UserNode>;
};

export type ArticleNode = CustomizeInterface & {
  __typename?: 'ArticleNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  category?: Maybe<ArticleCategoryNode>;
  user?: Maybe<UserNode>;
  title?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  numberOfViews: Scalars['Int'];
  numberOfShares: Scalars['Int'];
  numberOfFollows: Scalars['Int'];
  numberOfComments: Scalars['Int'];
  numberOfLikes: Scalars['Int'];
  visible?: Maybe<Scalars['Boolean']>;
  visibilityDate?: Maybe<Scalars['DateTime']>;
  thumbnail?: Maybe<Scalars['String']>;
  level: Scalars['Int'];
  comments: ArticleNodeConnection;
  shares: ArticleShareNodeConnection;
  views: ArticleViewNodeConnection;
  follows: ArticleFollowNodeConnection;
  liked?: Maybe<Scalars['Boolean']>;
  followed?: Maybe<Scalars['Boolean']>;
};

export type ArticleNodeCommentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type ArticleNodeSharesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  articleId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  shareTo?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type ArticleNodeViewsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  articleId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type ArticleNodeFollowsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  articleId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type ArticleCategoryNode = CustomizeInterface & {
  __typename?: 'ArticleCategoryNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ArticleNodeConnection = {
  __typename?: 'ArticleNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ArticleNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ArticleNode` and its cursor. */
export type ArticleNodeEdge = {
  __typename?: 'ArticleNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ArticleNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ArticleShareNodeConnection = {
  __typename?: 'ArticleShareNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ArticleShareNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ArticleShareNode` and its cursor. */
export type ArticleShareNodeEdge = {
  __typename?: 'ArticleShareNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ArticleShareNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ArticleShareNode = CustomizeInterface & {
  __typename?: 'ArticleShareNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  article?: Maybe<ArticleNode>;
  user: UserNode;
  shareTo: ArticleShareShareTo;
};

/** An enumeration. */
export enum ArticleShareShareTo {
  /** Facebook */
  Facebook = 'FACEBOOK',
  /** Twitter */
  Twitter = 'TWITTER',
  /** Instagram */
  Instagram = 'INSTAGRAM',
  /** Zalo */
  Zalo = 'ZALO',
  /** Others */
  Others = 'OTHERS',
}

export type ArticleFollowNodeConnection = {
  __typename?: 'ArticleFollowNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ArticleFollowNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ArticleFollowNode` and its cursor. */
export type ArticleFollowNodeEdge = {
  __typename?: 'ArticleFollowNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ArticleFollowNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ArticleFollowNode = CustomizeInterface & {
  __typename?: 'ArticleFollowNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  article?: Maybe<ArticleNode>;
  user: UserNode;
};

export type ZaloNode = {
  __typename?: 'ZaloNode';
  id: Scalars['ID'];
  created: Scalars['DateTime'];
  user: UserNode;
  zaloId: Scalars['String'];
  accessToken?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Scalars['String']>;
};

export type FacebookNode = {
  __typename?: 'FacebookNode';
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  user: UserNode;
  facebookId: Scalars['String'];
  accessToken?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Scalars['String']>;
};

export type CartDetailNode = {
  __typename?: 'CartDetailNode';
  id: Scalars['ID'];
  design: DesignNode;
};

export type OrderNodeConnection = {
  __typename?: 'OrderNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrderNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `OrderNode` and its cursor. */
export type OrderNodeEdge = {
  __typename?: 'OrderNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OrderNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type GalleryNodeConnection = {
  __typename?: 'GalleryNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<GalleryNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `GalleryNode` and its cursor. */
export type GalleryNodeEdge = {
  __typename?: 'GalleryNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<GalleryNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type GalleryNode = CustomizeInterface & {
  __typename?: 'GalleryNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  user: UserNode;
  name?: Maybe<Scalars['String']>;
  file: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type TopicShareNodeConnection = {
  __typename?: 'TopicShareNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TopicShareNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `TopicShareNode` and its cursor. */
export type TopicShareNodeEdge = {
  __typename?: 'TopicShareNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<TopicShareNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type TopicShareNode = CustomizeInterface & {
  __typename?: 'TopicShareNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  topic?: Maybe<TopicNode>;
  user: UserNode;
  shareTo: TopicShareShareTo;
};

export type TopicNode = CustomizeInterface & {
  __typename?: 'TopicNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  user?: Maybe<UserNode>;
  content: Scalars['String'];
  numberOfViews: Scalars['Int'];
  numberOfShares: Scalars['Int'];
  numberOfFollows: Scalars['Int'];
  numberOfComments: Scalars['Int'];
  numberOfLikes: Scalars['Int'];
  level: Scalars['Int'];
  comments: TopicNodeConnection;
  shares: TopicShareNodeConnection;
  views: TopicViewNodeConnection;
  follows: TopicFollowNodeConnection;
  images: Array<TopicImageNode>;
  liked?: Maybe<Scalars['Boolean']>;
  followed?: Maybe<Scalars['Boolean']>;
};

export type TopicNodeCommentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  searchBy?: Maybe<Scalars['String']>;
  hasImages?: Maybe<Scalars['Boolean']>;
  hasContent?: Maybe<Scalars['Boolean']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type TopicNodeSharesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  topicId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  shareTo?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type TopicNodeViewsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  topicId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type TopicNodeFollowsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  topicId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  hasImages?: Maybe<Scalars['Boolean']>;
  hasContent?: Maybe<Scalars['Boolean']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type TopicNodeConnection = {
  __typename?: 'TopicNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TopicNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `TopicNode` and its cursor. */
export type TopicNodeEdge = {
  __typename?: 'TopicNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<TopicNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type TopicViewNodeConnection = {
  __typename?: 'TopicViewNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TopicViewNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `TopicViewNode` and its cursor. */
export type TopicViewNodeEdge = {
  __typename?: 'TopicViewNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<TopicViewNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type TopicViewNode = CustomizeInterface & {
  __typename?: 'TopicViewNode';
  created?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  topic?: Maybe<TopicNode>;
  user?: Maybe<UserNode>;
};

export type TopicFollowNodeConnection = {
  __typename?: 'TopicFollowNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TopicFollowNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `TopicFollowNode` and its cursor. */
export type TopicFollowNodeEdge = {
  __typename?: 'TopicFollowNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<TopicFollowNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type TopicFollowNode = CustomizeInterface & {
  __typename?: 'TopicFollowNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  topic?: Maybe<TopicNode>;
  user: UserNode;
};

export type TopicImageNode = {
  __typename?: 'TopicImageNode';
  id: Scalars['ID'];
  image: Scalars['String'];
};

/** An enumeration. */
export enum TopicShareShareTo {
  /** Facebook */
  Facebook = 'FACEBOOK',
  /** Twitter */
  Twitter = 'TWITTER',
  /** Instagram */
  Instagram = 'INSTAGRAM',
  /** Zalo */
  Zalo = 'ZALO',
  /** Others */
  Others = 'OTHERS',
}

export type ArticleCategoryNodeConnection = {
  __typename?: 'ArticleCategoryNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ArticleCategoryNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ArticleCategoryNode` and its cursor. */
export type ArticleCategoryNodeEdge = {
  __typename?: 'ArticleCategoryNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ArticleCategoryNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type BannerGroupNode = {
  __typename?: 'BannerGroupNode';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  banner: BannerNodeConnection;
};

export type BannerGroupNodeBannerArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
  groupId?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type BannerNodeConnection = {
  __typename?: 'BannerNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BannerNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `BannerNode` and its cursor. */
export type BannerNodeEdge = {
  __typename?: 'BannerNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<BannerNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type BannerNode = CustomizeInterface & {
  __typename?: 'BannerNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  group: BannerGroupNode;
  name: Scalars['String'];
  file: Scalars['String'];
  sortOrder: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  linkTo: Array<BannerLinkContentPageNode>;
};

export type BannerLinkContentPageNode = {
  __typename?: 'BannerLinkContentPageNode';
  banner: BannerNode;
  contentPage: ContentPageNode;
};

export type ContentPageNode = CustomizeInterface & {
  __typename?: 'ContentPageNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  file: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  linkTo: Array<BannerLinkContentPageNode>;
};

export type ContentPageNodeConnection = {
  __typename?: 'ContentPageNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ContentPageNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ContentPageNode` and its cursor. */
export type ContentPageNodeEdge = {
  __typename?: 'ContentPageNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ContentPageNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type DesignNodeConnection = {
  __typename?: 'DesignNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DesignNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `DesignNode` and its cursor. */
export type DesignNodeEdge = {
  __typename?: 'DesignNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<DesignNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type UserNodeConnection = {
  __typename?: 'UserNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `UserNode` and its cursor. */
export type UserNodeEdge = {
  __typename?: 'UserNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<UserNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ConstructionReviewNodeConnection = {
  __typename?: 'ConstructionReviewNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ConstructionReviewNodeEdge>>;
  /** The total count of objects in this query. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `ConstructionReviewNode` and its cursor. */
export type ConstructionReviewNodeEdge = {
  __typename?: 'ConstructionReviewNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ConstructionReviewNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ConstructionReviewNode = CustomizeInterface & {
  __typename?: 'ConstructionReviewNode';
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  construction: ConstructorNode;
  reviewer: UserNode;
  phoneNumber: Scalars['String'];
  constructionLocation: Scalars['String'];
  areaSize: Scalars['Float'];
  designStyle: ConstructionReviewDesignStyle;
  constructionPeriod: Scalars['Float'];
  constructionCostFrom: Scalars['Float'];
  constructionCostTo: Scalars['Float'];
  review: Scalars['String'];
  rating: Scalars['Float'];
  district?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  images: Array<ReviewImageNode>;
};

/** An enumeration. */
export enum ConstructionReviewDesignStyle {
  /** Modern */
  Modern = 'MODERN',
  /** Scandinavian */
  Scandinavian = 'SCANDINAVIAN',
  /** Luxury */
  Luxury = 'LUXURY',
  /** Industrial */
  Industrial = 'INDUSTRIAL',
  /** Classic */
  Classic = 'CLASSIC',
  /** Others */
  Others = 'OTHERS',
}

export type ReviewImageNode = {
  __typename?: 'ReviewImageNode';
  id: Scalars['ID'];
  image: Scalars['String'];
};

/** Debugging information for the current query. */
export type DjangoDebug = {
  __typename?: 'DjangoDebug';
  /** Executed SQL queries for this API query. */
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>;
};

/** Represents a single database query made to a Django managed DB. */
export type DjangoDebugSql = {
  __typename?: 'DjangoDebugSQL';
  /** The type of database being used (e.g. postrgesql, mysql, sqlite). */
  vendor: Scalars['String'];
  /** The Django database alias (e.g. 'default'). */
  alias: Scalars['String'];
  /** The actual SQL sent to this database. */
  sql?: Maybe<Scalars['String']>;
  /** Duration of this database query in seconds. */
  duration: Scalars['Float'];
  /** The raw SQL of this query, without params. */
  rawSql: Scalars['String'];
  /** JSON encoded database query parameters. */
  params: Scalars['String'];
  /** Start time of this database query. */
  startTime: Scalars['Float'];
  /** Stop time of this database query. */
  stopTime: Scalars['Float'];
  /** Whether this database query took more than 10 seconds. */
  isSlow: Scalars['Boolean'];
  /** Whether this database query was a SELECT. */
  isSelect: Scalars['Boolean'];
  /** Postgres transaction ID if available. */
  transId?: Maybe<Scalars['String']>;
  /** Postgres transaction status if available. */
  transStatus?: Maybe<Scalars['String']>;
  /** Postgres isolation level if available. */
  isoLevel?: Maybe<Scalars['String']>;
  /** Postgres connection encoding if available. */
  encoding?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  designAddToCart?: Maybe<DesignAddToCartPayload>;
  designRemoveFromCart?: Maybe<DesignRemoveFromCartPayload>;
  designOrderCreate?: Maybe<DesignOrderCreatePayload>;
  designOrderDelete?: Maybe<DesignOrderDeletePayload>;
  designOrderUpdate?: Maybe<DesignOrderUpdatePayload>;
  userShareDesignConstructor?: Maybe<ShareDesignCreatePayload>;
  historyShareDesignMarkAsRead?: Maybe<ShareDesignMarkAsReadPayload>;
  authLoginWithZalo?: Maybe<ZaloLoginPayload>;
  authLoginWithFacebook?: Maybe<FacebookLoginPayload>;
  galleryCreate?: Maybe<GalleryCreatePayload>;
  galleryUpdate?: Maybe<GalleryUpdatePayload>;
  galleryDelete?: Maybe<GalleryDeletePayload>;
  topicCreate?: Maybe<TopicCreatePayload>;
  topicUpdate?: Maybe<TopicUpdatePayload>;
  topicDelete?: Maybe<TopicDeletePayload>;
  topicCommentCreate?: Maybe<TopicCommentCreatePayload>;
  topicCommentUpdate?: Maybe<TopicCommentUpdatePayload>;
  topicUserLike?: Maybe<TopicUserLikesPayload>;
  topicUserFollow?: Maybe<TopicUserFollowPayload>;
  topicUserShare?: Maybe<TopicUserSharePayload>;
  articleCategoryCreate?: Maybe<ArticleCategoryCreatePayload>;
  articleCategoryUpdate?: Maybe<ArticleCategoryUpdatePayload>;
  articleCategoryDelete?: Maybe<ArticleCategoryDeletePayload>;
  articleCreate?: Maybe<ArticleCreatePayload>;
  articleUpdate?: Maybe<ArticleUpdatePayload>;
  articleDelete?: Maybe<ArticleDeletePayload>;
  articleCommentCreate?: Maybe<ArticleCommentCreatePayload>;
  articleCommentUpdate?: Maybe<ArticleCommentUpdatePayload>;
  articleUserLike?: Maybe<ArticleUserLikesPayload>;
  articleUserFollow?: Maybe<ArticleUserFollowPayload>;
  articleUserShare?: Maybe<ArticleUserSharePayload>;
  bannerGroupCreate?: Maybe<BannerGroupCreatePayload>;
  bannerGroupUpdate?: Maybe<BannerGroupUpdatePayload>;
  bannerGroupDelete?: Maybe<BannerGroupDeletePayload>;
  bannerCreate?: Maybe<BannerCreatePayload>;
  bannerUpdate?: Maybe<BannerUpdatePayload>;
  bannerDelete?: Maybe<BannerDeletePayload>;
  contentPageCreate?: Maybe<ContentPageCreatePayload>;
  contentPageUpdate?: Maybe<ContentPageUpdatePayload>;
  contentPageDelete?: Maybe<ContentPageDeletePayload>;
  designWholeHouseCreate?: Maybe<DesignWholeHouseCreatePayload>;
  designRoomCreate?: Maybe<DesignRoomCreatePayload>;
  designWholeHouseUpdate?: Maybe<DesignWholeHouseUpdatePayload>;
  designRoomUpdate?: Maybe<DesignRoomUpdatePayload>;
  designDelete?: Maybe<DesignDelete>;
  designUserLike?: Maybe<UserLikeDesign>;
  designUserBookmarks?: Maybe<UserBookmarksDesign>;
  designUserQuestion?: Maybe<QuestionDesignCreatePayload>;
  designAnswer?: Maybe<AnswerDesignPayload>;
  designUserDeleteQuestion?: Maybe<UserDeleteQuestionPayload>;
  designAdminDeleteQA?: Maybe<AdminDeleteQuestionAnswerDesign>;
  designInquiryCreate?: Maybe<DesignInquiryCreatePayload>;
  designInquiryMarkAsRead?: Maybe<DesignInquiryMarkReadPayload>;
  authLogin?: Maybe<LoginPayload>;
  authRegisterCustomer?: Maybe<RegisterCustomerPayload>;
  authRegisterConstructor?: Maybe<RegisterConstructorPayload>;
  authRegisterBusiness?: Maybe<RegisterBusinessPayload>;
  authUpgradeBusiness?: Maybe<UpgradeBusinessPayload>;
  authForgotPassword?: Maybe<ForgotPassword>;
  authCreateAdmin?: Maybe<CreateMasterAdminPayload>;
  authConfirmForgotPassword?: Maybe<ConfirmForgotPassword>;
  authRunCommand?: Maybe<RunCommand>;
  adminCreateCustomer?: Maybe<AdminCreateCustomerPayload>;
  adminUpdateCustomer?: Maybe<AdminUpdateCustomerPayload>;
  adminCreateConstructor?: Maybe<AdminCreateConstructorPayload>;
  adminUpdateConstructor?: Maybe<AdminUpdateConstructorPayload>;
  adminDeleteUser?: Maybe<AdminDeleteUser>;
  adminUpgradeCustomer?: Maybe<AdminUpgradeCustomerPayload>;
  adminCreateBusiness?: Maybe<AdminCreateBusinessPayload>;
  adminUpdateBusiness?: Maybe<AdminUpdateBusinessPayload>;
  userChangePassword?: Maybe<ChangePassword>;
  userResetPassword?: Maybe<ResetPassword>;
  userChangeProfile?: Maybe<UserChangeProfilePayload>;
  userUpdateConstructor?: Maybe<UpdateConstructorInformationPayload>;
  userCreatePortfolio?: Maybe<UserCreatePortfolioPayload>;
  userUpdatePortfolio?: Maybe<UserUpdatePortfolioPayload>;
  userDeletePortfolio?: Maybe<UserDeletePortfolio>;
  userUpdateBusinessInfo?: Maybe<UserUpdateBusinessInfoPayload>;
  userChangeProfileFbZalo?: Maybe<UserChangeProfileFacebookZaloPayload>;
  constructionReviewCreate?: Maybe<ConstructionReviewCreatePayload>;
  constructionReviewUpdate?: Maybe<ConstructionReviewUpdatePayload>;
  constructionReviewDelete?: Maybe<ConstructionReviewDeletePayload>;
};

export type MutationDesignAddToCartArgs = {
  input: DesignAddToCartInput;
};

export type MutationDesignRemoveFromCartArgs = {
  input: DesignRemoveFromCartInput;
};

export type MutationDesignOrderCreateArgs = {
  input: DesignOrderCreateInput;
};

export type MutationDesignOrderDeleteArgs = {
  input: DesignOrderDeleteInput;
};

export type MutationDesignOrderUpdateArgs = {
  input: DesignOrderUpdateInput;
};

export type MutationUserShareDesignConstructorArgs = {
  input: ShareDesignCreateInput;
};

export type MutationHistoryShareDesignMarkAsReadArgs = {
  input: ShareDesignMarkAsReadInput;
};

export type MutationAuthLoginWithZaloArgs = {
  input: ZaloLoginInput;
};

export type MutationAuthLoginWithFacebookArgs = {
  input: FacebookLoginInput;
};

export type MutationGalleryCreateArgs = {
  input: GalleryCreateInput;
};

export type MutationGalleryUpdateArgs = {
  input: GalleryUpdateInput;
};

export type MutationGalleryDeleteArgs = {
  input: GalleryDeleteInput;
};

export type MutationTopicCreateArgs = {
  input: TopicCreateInput;
};

export type MutationTopicUpdateArgs = {
  input: TopicUpdateInput;
};

export type MutationTopicDeleteArgs = {
  input: TopicDeleteInput;
};

export type MutationTopicCommentCreateArgs = {
  input: TopicCommentCreateInput;
};

export type MutationTopicCommentUpdateArgs = {
  input: TopicCommentUpdateInput;
};

export type MutationTopicUserLikeArgs = {
  input: TopicUserLikesInput;
};

export type MutationTopicUserFollowArgs = {
  input: TopicUserFollowInput;
};

export type MutationTopicUserShareArgs = {
  input: TopicUserShareInput;
};

export type MutationArticleCategoryCreateArgs = {
  input: ArticleCategoryCreateInput;
};

export type MutationArticleCategoryUpdateArgs = {
  input: ArticleCategoryUpdateInput;
};

export type MutationArticleCategoryDeleteArgs = {
  input: ArticleCategoryDeleteInput;
};

export type MutationArticleCreateArgs = {
  input: ArticleCreateInput;
};

export type MutationArticleUpdateArgs = {
  input: ArticleUpdateInput;
};

export type MutationArticleDeleteArgs = {
  input: ArticleDeleteInput;
};

export type MutationArticleCommentCreateArgs = {
  input: ArticleCommentCreateInput;
};

export type MutationArticleCommentUpdateArgs = {
  input: ArticleCommentUpdateInput;
};

export type MutationArticleUserLikeArgs = {
  input: ArticleUserLikesInput;
};

export type MutationArticleUserFollowArgs = {
  input: ArticleUserFollowInput;
};

export type MutationArticleUserShareArgs = {
  input: ArticleUserShareInput;
};

export type MutationBannerGroupCreateArgs = {
  input: BannerGroupCreateInput;
};

export type MutationBannerGroupUpdateArgs = {
  input: BannerGroupUpdateInput;
};

export type MutationBannerGroupDeleteArgs = {
  input: BannerGroupDeleteInput;
};

export type MutationBannerCreateArgs = {
  input: BannerCreateInput;
};

export type MutationBannerUpdateArgs = {
  input: BannerUpdateInput;
};

export type MutationBannerDeleteArgs = {
  input: BannerDeleteInput;
};

export type MutationContentPageCreateArgs = {
  input: ContentPageCreateInput;
};

export type MutationContentPageUpdateArgs = {
  input: ContentPageUpdateInput;
};

export type MutationContentPageDeleteArgs = {
  input: ContentPageDeleteInput;
};

export type MutationDesignWholeHouseCreateArgs = {
  input: DesignWholeHouseCreateInput;
};

export type MutationDesignRoomCreateArgs = {
  input: DesignRoomCreateInput;
};

export type MutationDesignWholeHouseUpdateArgs = {
  input: DesignWholeHouseUpdateInput;
};

export type MutationDesignRoomUpdateArgs = {
  input: DesignRoomUpdateInput;
};

export type MutationDesignDeleteArgs = {
  input: DesignDeleteInput;
};

export type MutationDesignUserLikeArgs = {
  id: Scalars['String'];
};

export type MutationDesignUserBookmarksArgs = {
  id: Scalars['String'];
};

export type MutationDesignUserQuestionArgs = {
  input: QuestionDesignCreateInput;
};

export type MutationDesignAnswerArgs = {
  input: AnswerDesignInput;
};

export type MutationDesignUserDeleteQuestionArgs = {
  input: UserDeleteQuestionInput;
};

export type MutationDesignAdminDeleteQaArgs = {
  input: AdminDeleteAnswerDesignInput;
};

export type MutationDesignInquiryCreateArgs = {
  input: DesignInquiryCreateInput;
};

export type MutationDesignInquiryMarkAsReadArgs = {
  input: DesignInquiryMarkReadInput;
};

export type MutationAuthLoginArgs = {
  input: LoginInput;
};

export type MutationAuthRegisterCustomerArgs = {
  input: RegisterCustomerInput;
};

export type MutationAuthRegisterConstructorArgs = {
  input: RegisterConstructorInput;
};

export type MutationAuthRegisterBusinessArgs = {
  input: RegisterBusinessInput;
};

export type MutationAuthUpgradeBusinessArgs = {
  input: UpgradeBusinessInput;
};

export type MutationAuthForgotPasswordArgs = {
  input: ForgotPasswordInput;
};

export type MutationAuthCreateAdminArgs = {
  input: CreateMasterAdminInput;
};

export type MutationAuthConfirmForgotPasswordArgs = {
  input: ConfirmForgotPasswordInput;
};

export type MutationAuthRunCommandArgs = {
  input: RefreshDataInput;
};

export type MutationAdminCreateCustomerArgs = {
  input: AdminCreateCustomerInput;
};

export type MutationAdminUpdateCustomerArgs = {
  input: AdminUpdateCustomerInput;
};

export type MutationAdminCreateConstructorArgs = {
  input: AdminCreateConstructorInput;
};

export type MutationAdminUpdateConstructorArgs = {
  input: AdminUpdateConstructorInput;
};

export type MutationAdminDeleteUserArgs = {
  input: AdminDeleteUserInput;
};

export type MutationAdminUpgradeCustomerArgs = {
  input: AdminUpgradeCustomerInput;
};

export type MutationAdminCreateBusinessArgs = {
  input: AdminCreateBusinessInput;
};

export type MutationAdminUpdateBusinessArgs = {
  input: AdminUpdateBusinessInput;
};

export type MutationUserChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationUserResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationUserChangeProfileArgs = {
  input: UserChangeProfileInput;
};

export type MutationUserUpdateConstructorArgs = {
  input: UpdateConstructorInformationInput;
};

export type MutationUserCreatePortfolioArgs = {
  input: UserCreatePortfolioInput;
};

export type MutationUserUpdatePortfolioArgs = {
  input: UserUpdatePortfolioInput;
};

export type MutationUserDeletePortfolioArgs = {
  input: UserDeletePortfolioInput;
};

export type MutationUserUpdateBusinessInfoArgs = {
  input: UserUpdateBusinessInfoInput;
};

export type MutationUserChangeProfileFbZaloArgs = {
  input: UserChangeProfileFacebookZaloInput;
};

export type MutationConstructionReviewCreateArgs = {
  input: ConstructionReviewCreateInput;
};

export type MutationConstructionReviewUpdateArgs = {
  input: ConstructionReviewUpdateInput;
};

export type MutationConstructionReviewDeleteArgs = {
  input: ConstructionReviewDeleteInput;
};

export type DesignAddToCartPayload = {
  __typename?: 'DesignAddToCartPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  cart?: Maybe<CartNode>;
};

/** An error that happened in a mutation. */
export type CustomizeMutationErrorType = {
  __typename?: 'CustomizeMutationErrorType';
  /** The field that caused the error, or `null` if it isn't associated with any particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code */
  code?: Maybe<Scalars['String']>;
};

export type DesignAddToCartInput = {
  design: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DesignRemoveFromCartPayload = {
  __typename?: 'DesignRemoveFromCartPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  cart?: Maybe<CartNode>;
};

export type DesignRemoveFromCartInput = {
  design: Array<Maybe<Scalars['String']>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DesignOrderCreatePayload = {
  __typename?: 'DesignOrderCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  order?: Maybe<OrderNode>;
};

export type DesignOrderCreateInput = {
  designs: Array<Maybe<Scalars['String']>>;
  status: OrderStatus;
  subAmount: Scalars['Float'];
  totalAmount: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
  vat: Scalars['Float'];
  orderDate?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DesignOrderDeletePayload = {
  __typename?: 'DesignOrderDeletePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  order?: Maybe<OrderNode>;
};

export type DesignOrderDeleteInput = {
  id: Array<Maybe<Scalars['String']>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DesignOrderUpdatePayload = {
  __typename?: 'DesignOrderUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  order?: Maybe<OrderNode>;
};

export type DesignOrderUpdateInput = {
  designsRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<OrderStatus>;
  orderDate?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ShareDesignCreatePayload = {
  __typename?: 'ShareDesignCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  historyShareDesign?: Maybe<HistoryShareDesignNode>;
};

export type ShareDesignCreateInput = {
  constructor: Scalars['ID'];
  design: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ShareDesignMarkAsReadPayload = {
  __typename?: 'ShareDesignMarkAsReadPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  historyShareDesign?: Maybe<HistoryShareDesignNode>;
};

export type ShareDesignMarkAsReadInput = {
  id: Array<Maybe<Scalars['String']>>;
  read?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ZaloLoginPayload = {
  __typename?: 'ZaloLoginPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  zaloInformation?: Maybe<ZaloNode>;
};

export type ZaloLoginInput = {
  oAuthCode: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type FacebookLoginPayload = {
  __typename?: 'FacebookLoginPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  facebookInformation?: Maybe<FacebookNode>;
};

export type FacebookLoginInput = {
  facebookId: Scalars['String'];
  accessToken: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type GalleryCreatePayload = {
  __typename?: 'GalleryCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  gallery?: Maybe<GalleryNode>;
};

export type GalleryCreateInput = {
  description?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type GalleryUpdatePayload = {
  __typename?: 'GalleryUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  gallery?: Maybe<GalleryNode>;
};

export type GalleryUpdateInput = {
  description?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type GalleryDeletePayload = {
  __typename?: 'GalleryDeletePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  gallery?: Maybe<GalleryNode>;
};

export type GalleryDeleteInput = {
  id: Array<Maybe<Scalars['String']>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TopicCreatePayload = {
  __typename?: 'TopicCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  topic?: Maybe<TopicNode>;
};

export type TopicCreateInput = {
  listImages?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  content: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TopicUpdatePayload = {
  __typename?: 'TopicUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  topic?: Maybe<TopicNode>;
};

export type TopicUpdateInput = {
  imagesRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  listImages?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  content?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TopicDeletePayload = {
  __typename?: 'TopicDeletePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  topic?: Maybe<TopicNode>;
};

export type TopicDeleteInput = {
  id?: Maybe<Array<Maybe<Scalars['String']>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TopicCommentCreatePayload = {
  __typename?: 'TopicCommentCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  topic?: Maybe<TopicNode>;
};

export type TopicCommentCreateInput = {
  content: Scalars['String'];
  parent: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TopicCommentUpdatePayload = {
  __typename?: 'TopicCommentUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  topic?: Maybe<TopicNode>;
};

export type TopicCommentUpdateInput = {
  content: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TopicUserLikesPayload = {
  __typename?: 'TopicUserLikesPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  topicLike?: Maybe<TopicLikeNode>;
};

export type TopicLikeNode = {
  __typename?: 'TopicLikeNode';
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  topic?: Maybe<TopicNode>;
  user: UserNode;
};

export type TopicUserLikesInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TopicUserFollowPayload = {
  __typename?: 'TopicUserFollowPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  topicFollow?: Maybe<TopicFollowNode>;
};

export type TopicUserFollowInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TopicUserSharePayload = {
  __typename?: 'TopicUserSharePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  topicShare?: Maybe<TopicShareNode>;
};

export type TopicUserShareInput = {
  shareTo: TopicShareShareTo;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleCategoryCreatePayload = {
  __typename?: 'ArticleCategoryCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  articleCategory?: Maybe<ArticleCategoryNode>;
};

export type ArticleCategoryCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleCategoryUpdatePayload = {
  __typename?: 'ArticleCategoryUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  articleCategory?: Maybe<ArticleCategoryNode>;
};

export type ArticleCategoryUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  thumbnail?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleCategoryDeletePayload = {
  __typename?: 'ArticleCategoryDeletePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  articleCategory?: Maybe<ArticleCategoryNode>;
};

export type ArticleCategoryDeleteInput = {
  id?: Maybe<Array<Maybe<Scalars['String']>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleCreatePayload = {
  __typename?: 'ArticleCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  article?: Maybe<ArticleNode>;
};

export type ArticleCreateInput = {
  title: Scalars['String'];
  content: Scalars['String'];
  visibilityDate?: Maybe<Scalars['DateTime']>;
  category: Scalars['ID'];
  visible: Scalars['Boolean'];
  thumbnail?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleUpdatePayload = {
  __typename?: 'ArticleUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  article?: Maybe<ArticleNode>;
};

export type ArticleUpdateInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  visibilityDate?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  category?: Maybe<Scalars['ID']>;
  visible?: Maybe<Scalars['Boolean']>;
  thumbnail?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleDeletePayload = {
  __typename?: 'ArticleDeletePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  article?: Maybe<ArticleNode>;
};

export type ArticleDeleteInput = {
  id?: Maybe<Array<Maybe<Scalars['String']>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleCommentCreatePayload = {
  __typename?: 'ArticleCommentCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  article?: Maybe<ArticleNode>;
};

export type ArticleCommentCreateInput = {
  content: Scalars['String'];
  parent: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleCommentUpdatePayload = {
  __typename?: 'ArticleCommentUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  article?: Maybe<ArticleNode>;
};

export type ArticleCommentUpdateInput = {
  content: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleUserLikesPayload = {
  __typename?: 'ArticleUserLikesPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  articleLike?: Maybe<ArticleLikeNode>;
};

export type ArticleLikeNode = {
  __typename?: 'ArticleLikeNode';
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  article?: Maybe<ArticleNode>;
  user: UserNode;
};

export type ArticleUserLikesInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleUserFollowPayload = {
  __typename?: 'ArticleUserFollowPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  articleFollow?: Maybe<ArticleFollowNode>;
};

export type ArticleUserFollowInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ArticleUserSharePayload = {
  __typename?: 'ArticleUserSharePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  articleShare?: Maybe<ArticleShareNode>;
};

export type ArticleUserShareInput = {
  shareTo: ArticleShareShareTo;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type BannerGroupCreatePayload = {
  __typename?: 'BannerGroupCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  bannerGroup?: Maybe<BannerGroupNode>;
};

export type BannerGroupCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type BannerGroupUpdatePayload = {
  __typename?: 'BannerGroupUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  bannerGroup?: Maybe<BannerGroupNode>;
};

export type BannerGroupUpdateInput = {
  banners?: Maybe<Array<Maybe<BannerInput>>>;
  bannersRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type BannerInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
  sortOrder?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type BannerGroupDeletePayload = {
  __typename?: 'BannerGroupDeletePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  bannerGroup?: Maybe<BannerGroupNode>;
};

export type BannerGroupDeleteInput = {
  id: Array<Maybe<Scalars['String']>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type BannerCreatePayload = {
  __typename?: 'BannerCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  banner?: Maybe<BannerNode>;
};

export type BannerCreateInput = {
  contentPage: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  group: Scalars['ID'];
  file: Scalars['Upload'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type BannerUpdatePayload = {
  __typename?: 'BannerUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  banner?: Maybe<BannerNode>;
};

export type BannerUpdateInput = {
  contentPage?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  group?: Maybe<Scalars['ID']>;
  file?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type BannerDeletePayload = {
  __typename?: 'BannerDeletePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  banner?: Maybe<BannerNode>;
};

export type BannerDeleteInput = {
  id: Array<Maybe<Scalars['String']>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ContentPageCreatePayload = {
  __typename?: 'ContentPageCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  contentPage?: Maybe<ContentPageNode>;
};

export type ContentPageCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ContentPageUpdatePayload = {
  __typename?: 'ContentPageUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  contentPage?: Maybe<ContentPageNode>;
};

export type ContentPageUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  file?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ContentPageDeletePayload = {
  __typename?: 'ContentPageDeletePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  contentPage?: Maybe<ContentPageNode>;
};

export type ContentPageDeleteInput = {
  id: Array<Maybe<Scalars['String']>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DesignWholeHouseCreatePayload = {
  __typename?: 'DesignWholeHouseCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  design?: Maybe<DesignNode>;
};

export type DesignWholeHouseCreateInput = {
  rooms: Array<Maybe<WholeHouse>>;
  supportiveFiles?: Maybe<Array<Maybe<SupportFile>>>;
  layoutPlan: Array<Maybe<Scalars['Upload']>>;
  projectName: Scalars['String'];
  tower: Scalars['String'];
  unitType: Scalars['String'];
  area: Scalars['Float'];
  typeOfHouse: DesignTypeOfHouse;
  style: DesignStyle;
  estimateCostTo: Scalars['Float'];
  estimateCostFrom: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  thumbnail: Scalars['Upload'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type WholeHouse = {
  roomType: RoomTypeInDesignWh;
  images: Array<Maybe<Scalars['Upload']>>;
};

export enum RoomTypeInDesignWh {
  LivingRoom = 'LIVING_ROOM',
  Bedroom = 'BEDROOM',
  Kitchen = 'KITCHEN',
  Bathroom = 'BATHROOM',
  Other = 'OTHER',
}

export type SupportFile = {
  files: Array<Maybe<Scalars['Upload']>>;
  fileType: FileTypeEnum;
};

export enum FileTypeEnum {
  Specification = 'SPECIFICATION',
  Cad = 'CAD',
  Estimate = 'ESTIMATE',
  PaidDesign = 'PAID_DESIGN',
}

export type DesignRoomCreatePayload = {
  __typename?: 'DesignRoomCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  design?: Maybe<DesignNode>;
};

export type DesignRoomCreateInput = {
  roomType: RoomTypeInDesignRoom;
  listImages: Array<Maybe<Scalars['Upload']>>;
  supportiveFiles?: Maybe<Array<Maybe<SupportFile>>>;
  suggestedAreaSize?: Maybe<Scalars['Float']>;
  planType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  suggestedRoomSize?: Maybe<Scalars['Float']>;
  interiorFinish?: Maybe<Scalars['String']>;
  include?: Maybe<Scalars['String']>;
  layoutPlan: Array<Maybe<Scalars['Upload']>>;
  projectName: Scalars['String'];
  area: Scalars['Float'];
  style: DesignStyle;
  estimateCostTo: Scalars['Float'];
  estimateCostFrom: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  thumbnail: Scalars['Upload'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export enum RoomTypeInDesignRoom {
  LivingRoom = 'LIVING_ROOM',
  Bedroom = 'BEDROOM',
  Kitchen = 'KITCHEN',
  Bathroom = 'BATHROOM',
}

export type DesignWholeHouseUpdatePayload = {
  __typename?: 'DesignWholeHouseUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  design?: Maybe<DesignNode>;
};

export type DesignWholeHouseUpdateInput = {
  roomsRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  roomsAdd?: Maybe<Array<Maybe<WholeHouse>>>;
  roomsUpdate?: Maybe<Array<Maybe<WholeHouseUpdate>>>;
  supportiveFiles?: Maybe<Array<Maybe<SupportFile>>>;
  filesRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  layoutRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  layoutPlan?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  projectName?: Maybe<Scalars['String']>;
  tower?: Maybe<Scalars['String']>;
  unitType?: Maybe<Scalars['String']>;
  area?: Maybe<Scalars['Float']>;
  typeOfHouse?: Maybe<DesignTypeOfHouse>;
  style?: Maybe<DesignStyle>;
  estimateCostTo?: Maybe<Scalars['Float']>;
  estimateCostFrom?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  thumbnail?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type WholeHouseUpdate = {
  id: Scalars['String'];
  roomType?: Maybe<RoomTypeInDesignWh>;
  imagesAdd?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  imagesRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type DesignRoomUpdatePayload = {
  __typename?: 'DesignRoomUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  design?: Maybe<DesignNode>;
};

export type DesignRoomUpdateInput = {
  roomType?: Maybe<RoomTypeInDesignRoom>;
  imagesRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  imagesAdd?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  supportiveFiles?: Maybe<Array<Maybe<SupportFile>>>;
  filesRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  layoutRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  layoutPlan?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  suggestedAreaSize?: Maybe<Scalars['Float']>;
  planType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  suggestedRoomSize?: Maybe<Scalars['Float']>;
  interiorFinish?: Maybe<Scalars['String']>;
  include?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  area?: Maybe<Scalars['Float']>;
  style?: Maybe<DesignStyle>;
  estimateCostTo?: Maybe<Scalars['Float']>;
  estimateCostFrom?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  thumbnail?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DesignDelete = {
  __typename?: 'DesignDelete';
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  message?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
};

export type DesignDeleteInput = {
  id: Array<Maybe<Scalars['String']>>;
};

export type UserLikeDesign = {
  __typename?: 'UserLikeDesign';
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type UserBookmarksDesign = {
  __typename?: 'UserBookmarksDesign';
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type QuestionDesignCreatePayload = {
  __typename?: 'QuestionDesignCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  designQuestionAndAnswer?: Maybe<DesignQuestionAndAnswerNode>;
};

export type QuestionDesignCreateInput = {
  comment: Scalars['String'];
  design: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AnswerDesignPayload = {
  __typename?: 'AnswerDesignPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  designQuestionAndAnswer?: Maybe<DesignQuestionAndAnswerNode>;
};

export type AnswerDesignInput = {
  comment: Scalars['String'];
  parent: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserDeleteQuestionPayload = {
  __typename?: 'UserDeleteQuestionPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  designQuestionAndAnswer?: Maybe<DesignQuestionAndAnswerNode>;
};

export type UserDeleteQuestionInput = {
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AdminDeleteQuestionAnswerDesign = {
  __typename?: 'AdminDeleteQuestionAnswerDesign';
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type AdminDeleteAnswerDesignInput = {
  id: Array<Maybe<Scalars['String']>>;
};

export type DesignInquiryCreatePayload = {
  __typename?: 'DesignInquiryCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  designInquiry?: Maybe<DesignInquiryNode>;
};

export type DesignInquiryCreateInput = {
  email: Scalars['String'];
  design: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DesignInquiryMarkReadPayload = {
  __typename?: 'DesignInquiryMarkReadPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  designInquiry?: Maybe<DesignInquiryNode>;
};

export type DesignInquiryMarkReadInput = {
  id: Array<Maybe<Scalars['String']>>;
  read: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<UserNode>;
  permission?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterCustomerPayload = {
  __typename?: 'RegisterCustomerPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type RegisterCustomerInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  avatar?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RegisterConstructorPayload = {
  __typename?: 'RegisterConstructorPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  constructor?: Maybe<ConstructorNode>;
};

export type RegisterConstructorInput = {
  projectName: Scalars['String'];
  location: Scalars['String'];
  description: Scalars['String'];
  area: Scalars['Float'];
  period: Scalars['Int'];
  totalCostTo: Scalars['Float'];
  totalCostFrom: Scalars['Float'];
  style: PortfolioEnum;
  listImages: Array<Maybe<Scalars['Upload']>>;
  projectType: ProjectEnum;
  companyName: Scalars['String'];
  companyPhone: Scalars['String'];
  experiences: Scalars['Int'];
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  website: Scalars['String'];
  hotline?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export enum PortfolioEnum {
  Modern = 'MODERN',
  Scandinavian = 'SCANDINAVIAN',
  Luxury = 'LUXURY',
  Industrial = 'INDUSTRIAL',
  Classic = 'CLASSIC',
  Others = 'OTHERS',
}

export enum ProjectEnum {
  Villa = 'VILLA',
  Penthouse = 'PENTHOUSE',
  Studio = 'STUDIO',
  Duplex = 'DUPLEX',
  OneBedroom = 'ONE_BEDROOM',
  TwoBedroom = 'TWO_BEDROOM',
  ThreeBedroom = 'THREE_BEDROOM',
  FourBedroom = 'FOUR_BEDROOM',
}

export type RegisterBusinessPayload = {
  __typename?: 'RegisterBusinessPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type RegisterBusinessInput = {
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  registerationNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  businessType: BusinessChoices;
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export enum BusinessChoices {
  Company = 'COMPANY',
  Individual = 'INDIVIDUAL',
  Freelancer = 'FREELANCER',
}

export type UpgradeBusinessPayload = {
  __typename?: 'UpgradeBusinessPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  business?: Maybe<BusinessNode>;
};

export type UpgradeBusinessInput = {
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  registerationNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  businessType: BusinessBusinessType;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  status?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type CreateMasterAdminPayload = {
  __typename?: 'CreateMasterAdminPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type CreateMasterAdminInput = {
  email: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  password: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ConfirmForgotPassword = {
  __typename?: 'ConfirmForgotPassword';
  status?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
};

export type ConfirmForgotPasswordInput = {
  code: Scalars['String'];
};

export type RunCommand = {
  __typename?: 'RunCommand';
  status?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type RefreshDataInput = {
  clearData: Scalars['Boolean'];
  clearResource: Scalars['Boolean'];
  runCommand?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AdminCreateCustomerPayload = {
  __typename?: 'AdminCreateCustomerPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type AdminCreateCustomerInput = {
  email: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  avatar?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AdminUpdateCustomerPayload = {
  __typename?: 'AdminUpdateCustomerPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type AdminUpdateCustomerInput = {
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  avatar?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AdminCreateConstructorPayload = {
  __typename?: 'AdminCreateConstructorPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  constructor?: Maybe<ConstructorNode>;
};

export type AdminCreateConstructorInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['Upload']>;
  projectName?: Maybe<Scalars['String']>;
  projectType?: Maybe<ProjectEnum>;
  location?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  area?: Maybe<Scalars['Float']>;
  period?: Maybe<Scalars['Int']>;
  totalCostTo?: Maybe<Scalars['Float']>;
  totalCostFrom?: Maybe<Scalars['Float']>;
  style?: Maybe<PortfolioEnum>;
  listImages?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  registerationNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  companyName: Scalars['String'];
  companyPhone: Scalars['String'];
  experiences: Scalars['Int'];
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  website: Scalars['String'];
  hotline?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AdminUpdateConstructorPayload = {
  __typename?: 'AdminUpdateConstructorPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  constructor?: Maybe<ConstructorNode>;
};

export type AdminUpdateConstructorInput = {
  password?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['Upload']>;
  registerationNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  experiences?: Maybe<Scalars['Int']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  hotline?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AdminDeleteUser = {
  __typename?: 'AdminDeleteUser';
  status?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
};

export type AdminDeleteUserInput = {
  id: Array<Maybe<Scalars['String']>>;
};

export type AdminUpgradeCustomerPayload = {
  __typename?: 'AdminUpgradeCustomerPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  business?: Maybe<BusinessNode>;
};

export type AdminUpgradeCustomerInput = {
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  registerationNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  businessType: BusinessBusinessType;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AdminCreateBusinessPayload = {
  __typename?: 'AdminCreateBusinessPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type AdminCreateBusinessInput = {
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  registerationNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  businessType: BusinessChoices;
  email: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  avatar?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AdminUpdateBusinessPayload = {
  __typename?: 'AdminUpdateBusinessPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type AdminUpdateBusinessInput = {
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  registerationNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  avatar?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ChangePassword = {
  __typename?: 'ChangePassword';
  status?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  user?: Maybe<UserNode>;
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  status?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
};

export type ResetPasswordInput = {
  code: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type UserChangeProfilePayload = {
  __typename?: 'UserChangeProfilePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type UserChangeProfileInput = {
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateConstructorInformationPayload = {
  __typename?: 'UpdateConstructorInformationPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  constructor?: Maybe<ConstructorNode>;
};

export type UpdateConstructorInformationInput = {
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  experiences?: Maybe<Scalars['Int']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  hotline?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserCreatePortfolioPayload = {
  __typename?: 'UserCreatePortfolioPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  portfolio?: Maybe<PortfolioNode>;
};

export type UserCreatePortfolioInput = {
  listImages: Array<Maybe<Scalars['Upload']>>;
  projectName: Scalars['String'];
  projectType: PortfolioProjectType;
  location: Scalars['String'];
  description: Scalars['String'];
  area: Scalars['Float'];
  period: Scalars['Int'];
  totalCostTo: Scalars['Float'];
  totalCostFrom: Scalars['Float'];
  style: PortfolioStyle;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserUpdatePortfolioPayload = {
  __typename?: 'UserUpdatePortfolioPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  portfolio?: Maybe<PortfolioNode>;
};

export type UserUpdatePortfolioInput = {
  imagesRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  imagesAdd?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  projectName?: Maybe<Scalars['String']>;
  projectType?: Maybe<PortfolioProjectType>;
  location?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  area?: Maybe<Scalars['Float']>;
  period?: Maybe<Scalars['Int']>;
  totalCostTo?: Maybe<Scalars['Float']>;
  totalCostFrom?: Maybe<Scalars['Float']>;
  style?: Maybe<PortfolioStyle>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserDeletePortfolio = {
  __typename?: 'UserDeletePortfolio';
  status?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
};

export type UserDeletePortfolioInput = {
  id: Array<Maybe<Scalars['String']>>;
};

export type UserUpdateBusinessInfoPayload = {
  __typename?: 'UserUpdateBusinessInfoPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  business?: Maybe<BusinessNode>;
};

export type UserUpdateBusinessInfoInput = {
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  registerationNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserChangeProfileFacebookZaloPayload = {
  __typename?: 'UserChangeProfileFacebookZaloPayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  user?: Maybe<UserNode>;
};

export type UserChangeProfileFacebookZaloInput = {
  email?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ConstructionReviewCreatePayload = {
  __typename?: 'ConstructionReviewCreatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  constructionReview?: Maybe<ConstructionReviewNode>;
};

export type ConstructionReviewCreateInput = {
  listImages?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  phoneNumber: Scalars['String'];
  constructionLocation: Scalars['String'];
  areaSize: Scalars['Float'];
  designStyle: ConstructionReviewDesignStyle;
  constructionPeriod: Scalars['Float'];
  constructionCostFrom: Scalars['Float'];
  constructionCostTo: Scalars['Float'];
  review: Scalars['String'];
  rating: Scalars['Float'];
  district: Scalars['String'];
  city: Scalars['String'];
  construction: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ConstructionReviewUpdatePayload = {
  __typename?: 'ConstructionReviewUpdatePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  constructionReview?: Maybe<ConstructionReviewNode>;
};

export type ConstructionReviewUpdateInput = {
  imagesRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  listImages?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  phoneNumber?: Maybe<Scalars['String']>;
  constructionLocation?: Maybe<Scalars['String']>;
  areaSize?: Maybe<Scalars['Float']>;
  designStyle?: Maybe<ConstructionReviewDesignStyle>;
  constructionPeriod?: Maybe<Scalars['Float']>;
  constructionCostFrom?: Maybe<Scalars['Float']>;
  constructionCostTo?: Maybe<Scalars['Float']>;
  review?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  district?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ConstructionReviewDeletePayload = {
  __typename?: 'ConstructionReviewDeletePayload';
  /** List of errors that occurred while executing the mutation. */
  errors?: Maybe<Array<CustomizeMutationErrorType>>;
  /** Status of the mutation. */
  status?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** The mutated object. */
  constructionReview?: Maybe<ConstructionReviewNode>;
};

export type ConstructionReviewDeleteInput = {
  id: Array<Maybe<Scalars['String']>>;
  clientMutationId?: Maybe<Scalars['String']>;
};
