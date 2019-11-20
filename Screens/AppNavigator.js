import { createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./LoginScreen";
import LoadingScreen from './LoadingScreen'
import AuthenticationScreen from "./AuthenticationScreen";
import RegisterScreen from "./RegisterScreen";
import NewUserScreen from "./NewUserScreen";
import MainScreen from "./MainScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import workoutScreen from "./workoutScreen";
import AccountSettings from "./AccountSettings";
import GraphComponentAx from "./GraphComponentAx";
import test from "./test"



const AppNavigator = createStackNavigator({
    // Authentication: AuthenticationScreen,
    // Login: LoginScreen,
    // Loading: LoadingScreen,
    // Register: RegisterScreen,
    // NewUser: NewUserScreen,
    // Main:MainScreen,


    // change the code below we are just working with the mainscreen now







    test:test,
    OnBoarding: OnBoardingScreen,
    Main:MainScreen,
    Account: AccountSettings,
    Authentication: AuthenticationScreen,
    workout:workoutScreen,
    Loading: LoadingScreen,
    Register: RegisterScreen,
    NewUser: NewUserScreen,
    GraphComponentAx: GraphComponentAx,


    // workout:workoutScreen,




});

export default createAppContainer(AppNavigator);