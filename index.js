const path = require('path');
const { config, engine } = require('express-edge');
const edge = require("edge.js");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require("connect-flash");
var expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
dotenv.config();

const createPostController = require('./controllers/BlogPost/createPost');
const homePageController = require('./controllers/Index/homePage');
const storePostController = require('./controllers/BlogPost/storePost');
const getPostController = require('./controllers/BlogPost/getPost');
const getReviewController = require('./controllers/Video/getVideo');
const getTravelPostController = require('./controllers/TravelPost/getTravelPost');
const locationController = require('./controllers/Location/locations');
const getTravelPhotographyTipsController = require('./controllers/Photography/travelPhotographyTips');
const getBestTravelCameraController = require('./controllers/Photography/travelPhotographyTips');
const getMyPhotoGearController = require('./controllers/Photography/travelPhotographyTips');
const storeUserController = require('./controllers/User/storeUser');
const loginController = require('./controllers/User/login');
const logoutController = require('./controllers/User/logout');
const loginUserController = require('./controllers/User/loginUser');
const contactController = require('./controllers/Index/contact');
const aboutController = require('./controllers/Index/about');
const privacyPolicyController = require('./controllers/PrivacyPolicy/privacy-policy');
const FAQController = require('./controllers/FAQ/FAQ');
const aboutDeveloperController = require('./controllers/Index/about-developer');
const postsController = require('./controllers/BlogPost/posts');
const photosController = require('./controllers/PhotoCollection/photos');
const postsPageController = require('./controllers/BlogPost/postsPage');
const videosPageController = require('./controllers/Video/videosPage');
const travelPostsPageController = require('./controllers/TravelPost/travelPostsPage');
const reviewController = require('./controllers/Video/Videos');
const travelPostController = require('./controllers/TravelPost/travelPosts');
const stateController = require('./controllers/State/states');
const deletePostController = require('./controllers/BlogPost/deletePost');
const deleteReviewController = require('./controllers/Video/deleteVideo');
const deleteStateController = require('./controllers/State/deleteState');
const deletePhotoController = require('./controllers/PhotoCollection/deletePhoto');
const deleteLocationController = require('./controllers/Location/deleteLocation');
const deleteTravelPostController = require('./controllers/TravelPost/deleteTravelPost');
const getCurrentPostController = require('./controllers/BlogPost/getCurrentPost');
const getPhotoController = require('./controllers/PhotoCollection/getPhoto');
const getCurrentReviewController = require('./controllers/Video/getCurrentVideo');
const getCurrentStateController = require('./controllers/State/getCurrentState');
const getCurrentLocationController = require('./controllers/Location/getCurrentLocation');
const getCurrentTravelPostController = require('./controllers/TravelPost/getCurrentTravelPost');
const getCurrentTravelPhotographyTipsController = require('./controllers/Photography/getCurrentTravelPhotographyTips');
const getPrivacyPolicyController = require('./controllers/PrivacyPolicy/get-privacy-policy');
const getRelatedPostController = require('./controllers/Search/getRelatedPost');
const updatePostController = require('./controllers/BlogPost/updatePost');
const updateReviewController = require('./controllers/Video/updateVideo');
const updateStateController = require('./controllers/State/updateState');
const updatePhotoController = require('./controllers/PhotoCollection/updatePhoto');
const updateLocationController = require('./controllers/Location/updateLocation');
const updateTravelPostController = require('./controllers/TravelPost/updateTravelPost');
const updateTravelPhotographyTipsController = require('./controllers/Photography/updateTravelPhotographyTips');
const updatePrivacyPolicyController = require('./controllers/PrivacyPolicy/update-privacy-policy');
const searchController = require('./controllers/Search/search');
const searchTextController = require('./controllers/Search/searchText');
const createReviewController = require('./controllers/Video/createVideo');
const createStateController = require('./controllers/State/createState');
const createLocationController = require('./controllers/Location/createLocation');
const createTravelPostController = require('./controllers/TravelPost/createTravelPost');
const createPhotoController = require('./controllers/PhotoCollection/createPhoto');
const createFAQController = require('./controllers/FAQ/create-FAQ');
const storeReviewController = require('./controllers/Video/storeVideo');
const storeStateController = require('./controllers/State/storeState');
const storePhotoController = require('./controllers/PhotoCollection/storePhoto');
const storeLocationController = require('./controllers/Location/storeLocation');
const storeTravelPostController = require('./controllers/TravelPost/storeTravelPost');
const storeFAQController = require('./controllers/FAQ/store-FAQ');
const changeLanguageController = require('./controllers/User/language');
const resetUserPasswordController = require('./controllers/User/resetUserPassword');
const resetPasswordController = require('./controllers/User/resetPassword');
const newPasswordController = require('./controllers/User/newPassword');
const updatePasswordController = require('./controllers/User/updatePassword');

const storePost = require('./middleware/Post/storePost');
const updatePost = require('./middleware/Post/updatePost');
const storeReview = require('./middleware/Review/storeReview');
const updateReview = require('./middleware/Review/updateReview');
const storeState = require('./middleware/State/storeState');
const updateState = require('./middleware/State/updateState');
const storePhoto = require('./middleware/Photo/storePhoto');
const updatePhoto = require('./middleware/Photo/updatePhoto');
const storeLocation = require('./middleware/Location/storeLocation');
const updateLocation = require('./middleware/Location/updateLocation');
const storeTravelPost = require('./middleware/TravelPost/storeTravelPost');
const storeFAQ = require('./middleware/FAQ/store-FAQ');
const updateTravelPost = require('./middleware/TravelPost/updateTravelPost');
const updateTravelPhotographyTips = require('./middleware/TravelPhotographyTips/updateTravelPhotographyTips');
const updatePrivacyPolicy = require('./middleware/PrivacyPolicy/updatePrivacyPolicy');
var auth = require("./middleware/auth");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
const { get } = require('http');

config({ cache: process.env.NODE_ENV === 'production' });

const app = new express();

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect(process.env.ATLAS_URI,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const mongoStore = connectMongo(expressSession);
getCurrentStateController
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(fileUpload());
app.use('/posts/store', storePost);
app.use(express.static(path.join(__dirname, 'public')));
// app.use(engine);
// app.set('views', `${__dirname}/views`);
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(connectFlash());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    res.locals.auth = req.session.userId;
    res.locals.language = req.session.language;
    return next();
});

app.get('/', homePageController);
app.get('/post/:postType/:postTitle/:id/', getPostController);
app.get('/video/:postType/:postTitle/:id/', getReviewController);
app.get('/:stateName/:locationName/travelPost/:postTitle/:postId/', getTravelPostController);
app.get('/:stateName/all/locations/:stateId/', locationController);
app.get('/:stateName/:locationName/all/travelPosts/:locationId/', travelPostController);
app.get('/travel-photography-tips/:id/', getTravelPhotographyTipsController);
app.get('/best-travel-camera/:id/', getBestTravelCameraController);
app.get('/my-photo-gear/:id/', getMyPhotoGearController);
app.get('/about/', aboutController);
app.get('/contact/', contactController);
app.get('/privacy/policy/:policyType/:policyId', privacyPolicyController);
app.get('/FAQ', FAQController);
app.get('/about-developer', aboutDeveloperController);
app.post('/search', searchController);
app.get('/searchText', searchTextController);
app.get('/all/posts/:postType/', postsController);
app.get('/posts/:postType/:currPageNo/', postsPageController);
app.get('/videos/:postType/:currPageNo/', videosPageController);
app.get('/:stateName/:locationName/travelPosts/:locationId/:currPageNo/', travelPostsPageController);
app.get('/all/videos/:postType/', reviewController);
app.get('/all/visitedStates/', stateController);
app.get('/photos/', photosController);
app.get('/new/post/:postType/', createPostController);
app.post('/posts/store/:postType/', storePost, storePostController);
app.get('/new/video/:postType/', createReviewController);
app.get('/new/state/', createStateController);
app.get('/new/photo/', createPhotoController);
app.get('/new/location/:stateName/:stateId/', createLocationController);
app.get('/new/travelPost/:stateName/:locationName/:locationId/', createTravelPostController);
app.get('/new/FAQ', createFAQController);
app.post('/video/store/:postType/', storeReview, storeReviewController);
app.post('/state/store/', storeState, storeStateController);
app.post('/photo/store/', storePhoto, storePhotoController);
app.post('/location/store/:stateName/:stateId/', storeLocation, storeLocationController);
app.post('/travelPost/store/:stateName/:locationName/:locationId/', storeTravelPost, storeTravelPostController);
app.post('/FAQ/store/', storeFAQ, storeFAQController);
app.get('/auth/login/', loginController);
app.get('/auth/logout/', logoutController);
app.post('/users/login/', loginUserController);
app.post('/users/register/', storeUserController);
app.get('/delete/post/:postType/:postTitle/:id/', deletePostController);
app.get('/delete/video/:postType/:postTitle/:id/', deleteReviewController);
app.get('/delete/state/:stateName/:stateId/', deleteStateController);
app.get('/delete/photo/:id/', deletePhotoController);
app.get('/delete/location/:stateName/:locationName/:locationId/', deleteLocationController);
app.get('/delete/travelPost/:stateName/:locationName/:postTitle/:postId/', deleteTravelPostController);
app.get('/get/post/:postType/:postTitle/:id/', getCurrentPostController);
app.get('/get/photo/:id/', getPhotoController);
app.get('/get/video/:postType/:postTitle/:id/', getCurrentReviewController);
app.get('/get/state/:stateName/:stateId/', getCurrentStateController);
app.get('/get/location/:stateName/:locationName/:locationId/', getCurrentLocationController);
app.get('/get/travelPost/:stateName/:locationName/:postTitle/:postId/', getCurrentTravelPostController);
app.get('/get/travelPhotographyTips/:id/', getCurrentTravelPhotographyTipsController);
app.get('/get/:policyType/:policyId', getPrivacyPolicyController);
app.get('/get/relatedPost-:query/', getRelatedPostController);
app.post('/posts/update/:postType/:postTitle/:id/', updatePost, updatePostController);
app.post('/video/update/:postType/:postTitle/:id/', updateReview, updateReviewController);
app.post('/state/update/:stateName/:stateId/', updateState, updateStateController);
app.post('/photo/update/:id/', updatePhoto, updatePhotoController);
app.post('/location/update/:stateName/:locationName/:locationId/', updateLocation, updateLocationController);
app.post('/travelPost/update/:stateName/:locationName/:postTitle/:postId/', updateTravelPost, updateTravelPostController);
app.post('/travelPhotographyTips/update/:id/', updateTravelPhotographyTips, updateTravelPhotographyTipsController);
app.post('/privacyPolicy/update/:policyType/:policyId', updatePrivacyPolicy, updatePrivacyPolicyController);
app.get('/change/language/', changeLanguageController);
app.get('/reset/user/password/', resetUserPasswordController);
app.post('/reset/password/', resetPasswordController);
app.get('/new/password/:token/', newPasswordController);
app.post('/update/password/:token/', updatePasswordController);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});