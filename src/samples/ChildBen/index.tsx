import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import StoreContext from "../../bridge/Context/StoreContext";
import createPConnectComponent from "../../bridge/react_pconnect";

import { gbLoggedIn, loginIfNecessary, sdkSetAuthHeader } from '../../helpers/authManager';

import { compareSdkPCoreVersions } from '../../helpers/versionHelpers';
import { getSdkConfig } from '../../helpers/config_access';

import StartPage from './StartPage';
import ConfirmationPage from './ConfirmationPage'
import { Body } from './../../components/Body';


// declare var gbLoggedIn: boolean;
// declare var login: Function;
// declare var logout: Function;

declare const PCore: any;
declare const myLoadMashup: any;

const useStyles = makeStyles((theme) => ({
  embedTopRibbon: {
    display: 'none',
    alignItems: 'center',
    height: '64px',
    padding: '0px 20px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  embedTopIcon: {
    width: '40px',
    filter: 'invert(100%)',
  },
  embedMainScreen: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  embedBanner: {
    textAlign: 'center',
    width: '100%',
    padding: '20px'
  },
  embedShoppingOptions: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  pegaPartInfo: {
    display: 'none',
    flexDirection: 'row',
  },
  pegaPartPega: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  pegaPartText: {
    paddingLeft: '50px'
  },
  pegaPartAccompaniment: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  pegaPartAccompanimentText: {
    fontSize: '30px' ,
    lineHeight: '40px',
    padding: '20px 20px',
    color: 'darkslategray'
  },
  pegaPartAccompanimentImage: {
    width: '700px',
    margin: '20px',
    borderRadius: '10px'
  },
  resolutionPart: {
    display: 'flex',
    flexDirection: 'row'
  },
  resolutionPartAccompanimentLeft: {
    width: '50%',
    alignItems: 'center'
  },
  resolutionPartAccompanimentRight: {
    width: '50%',
    alignItems: 'center',
    textAlign: 'center'
  },
  resolutionPartAccompanimentText: {
    fontSize: '28px' ,
    lineHeight: '40px',
    padding: '20px 20px',
    color: 'darkslategray'
  },
  resolutionButton: {
    color: 'white',
    backgroundColor: theme.palette.warning.main,
    fontSize: '25px',
    fontWeight: 'bold',
    borderRadius: '25px',
    border: '0px',
    margin: '20px',
    padding: '10px 30px'
  }

}));

export function EmbeddedTopLevel() {
  const theme = createTheme({
    // palette: {
    //   primary: {
    //     main: '#2196f3',
    //   },
    //   secondary: {
    //     main: '#ff9800',
    //   },
    // },
  });

  const classes = useStyles();

  const [pConn, setPConn] = useState<any>(null);

  const [bShowTriplePlayOptions, setShowTriplePlayOptions] = useState(false);
  const [bShowPega, setShowPega] = useState(false);
  const [bShowResolutionScreen, setShowResolutionScreen] = useState(false);
  const [bShowAppName, setShowAppName] = useState(false);


  useEffect( () => {
    // Update visibility of UI when bShowTriplePlayOptions changes

    // eslint-disable-next-line no-console
    console.log(`EmbeddedTopLevel: bShowTriplePlayOptions set to ${bShowTriplePlayOptions}`);
    const theTopLevelEl = document.getElementById("embedded-top-level-banner-buttons");
    const theTopLevelRibbon = document.getElementById("embedded-top-level-ribbon");

    if (theTopLevelEl) {
      if (bShowTriplePlayOptions && gbLoggedIn) {
        // Only show when user is logged in and we're supposed to show it
        theTopLevelEl.style.display = "block";
        if (theTopLevelRibbon) { theTopLevelRibbon.style.display = "flex"; }
      } else {
        theTopLevelEl.style.display = "none";
        if (theTopLevelRibbon) { theTopLevelRibbon.style.display = "none"; }
      }
    }
  }, [bShowTriplePlayOptions]);

  useEffect( () => {
    // Update visibility of UI when bShowPega changes
    // eslint-disable-next-line no-console
    console.log(`EmbeddedTopLevel: bShowPega set to ${bShowPega}`);

    const thePegaPartEl = document.getElementById("pega-part-of-page");
    const theTopLevelRibbon = document.getElementById("embedded-top-level-ribbon");

    if (thePegaPartEl) {
      if (bShowPega) {
        thePegaPartEl.style.display = "flex";
        if (theTopLevelRibbon) { theTopLevelRibbon.style.display = "flex"; }
  } else {
        thePegaPartEl.style.display = "none";
      }
    }
  }, [bShowPega]);

  useEffect( () => {
    // Update visibility of UI when bShowResolutionScreen changes
    // eslint-disable-next-line no-console
    console.log(`EmbeddedTopLevel: bShowPega set to ${bShowPega}`);

    const theTopLevelEl = document.getElementById("embedded-top-level-resolution");
    const theTopLevelRibbon = document.getElementById("embedded-top-level-ribbon");

    if (bShowResolutionScreen && gbLoggedIn) {
        // Only show when user is logged in and we're supposed to show it
        if (theTopLevelEl) { theTopLevelEl.style.display = "block" };
        if (theTopLevelRibbon) { theTopLevelRibbon.style.display = "flex"; }
      } else {
        if (theTopLevelEl) { theTopLevelEl.style.display = "none" };
        if (theTopLevelRibbon) { theTopLevelRibbon.style.display = "none"; }
      }
  }, [bShowResolutionScreen]);


  useEffect( () => {
    // Update when bShowAppName changes
    // If not logged in, we used to prompt for login. Now moved up to TopLevelApp
    // If logged in, make the Triple Play Options visible

    if (!gbLoggedIn) {
      // login();     // Login now handled at TopLevelApp
    } else {
      setShowTriplePlayOptions(true);
    }
  }, [bShowAppName]);

  //  const outlet = document.getElementById("outlet");

  function assignmentFinished() {
    setShowTriplePlayOptions(false);
    setShowPega(false);
    setShowResolutionScreen(true);
  }


  function cancelAssignment() {
    setShowTriplePlayOptions(true);
    setShowPega(false);
    setShowResolutionScreen(false);
  }


  function establishPCoreSubscriptions() {

    PCore.getPubSubUtils().subscribe(
      "assignmentFinished",
      () => { assignmentFinished() },
      "assignmentFinished"
    );

    PCore.getPubSubUtils().subscribe(
      PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL,
      () => { cancelAssignment() },
      "cancelAssignment"
    );

  }


  // from react_root.js with some modifications
  function RootComponent(props) {
    const PegaConnectObj = createPConnectComponent();

    // remove from Provider to work around compiler error for now: context={StoreContext}
    // return (
    //   <Provider store={PCore.getStore()} context={StoreContext} >
    //     <PegaConnectObj {...props} />
    //   </Provider>
    // );

    // const thePConnObj = <div>the RootComponent</div>;
    const thePConnObj = <PegaConnectObj {...props} />;

    // NOTE: For Embedded mode, we add in displayOnlyFA and isMashup to our React context
    //  so the values are available to any component that may need it.
    const theComp =
      <StoreContext.Provider value={{store: PCore.getStore(), displayOnlyFA: true, isMashup: true}} >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {thePConnObj}
          </ThemeProvider>
      </StoreContext.Provider>;

    return theComp;

  }


  /**
   * Callback from onPCoreReady that's called once the top-level render object
   * is ready to be rendered
   * @param inRenderObj the initial, top-level PConnect object to render
   */
   function initialRender(inRenderObj) {

    // loadMashup does its own thing so we don't need to do much/anything here

    // // modified from react_root.js render
    const {
      props,
      domContainerID = null,
      componentName,
      portalTarget,
      styleSheetTarget
    } = inRenderObj;

    const thePConn = props.getPConnect();
    setPConn(thePConn);
    // eslint-disable-next-line no-console
    console.log(`EmbeddedTopLevel: initialRender got a PConnect with ${thePConn.getComponentName()}`);

    let target:any = null;

    if (domContainerID !== null) {
      target = document.getElementById(domContainerID);
    } else if (portalTarget !== null) {
      target = portalTarget;
    }

    // Note: RootComponent is just a function (declared below)
    const Component: any = RootComponent;

    if (componentName) {
      Component.displayName = componentName;
    }

    const theComponent = (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component
          {...props}
          portalTarget={portalTarget}
          styleSheetTarget={styleSheetTarget}
        />
      </ThemeProvider>
    );

    // Initial render of component passed in (which should be a RootContainer)
    render(
      <React.Fragment>
        {theComponent}
      </React.Fragment>,
      target
    )

    // Initial render to show that we have a PConnect and can render in the target location
    // render( <div>EmbeddedTopLevel initialRender in {domContainerID} with PConn of {componentName}</div>, target);

  }


  /**
   * kick off the application's portal that we're trying to serve up
   */
   function startMashup() {

    // NOTE: When loadMashup is complete, this will be called.
    PCore.onPCoreReady(renderObj => {
      // eslint-disable-next-line no-console
      console.log(`PCore ready!`);
      // Check that we're seeing the PCore version we expect
      compareSdkPCoreVersions();

      establishPCoreSubscriptions();
      setShowAppName(true);
      initialRender(renderObj);
    });

    // load the Mashup and handle the onPCoreEntry response that establishes the
    //  top level Pega root element (likely a RootContainer)

    myLoadMashup("pega-root", false);   // this is defined in bootstrap shell that's been loaded already
  }


  // One time (initialization) subscriptions and related unsubscribe
  useEffect(() => {

    getSdkConfig().then( sdkConfig => {
      const sdkConfigAuth = sdkConfig.authConfig;

      if( !sdkConfigAuth.mashupClientId && sdkConfigAuth.customAuthType === "Basic" ) {
        // Service package to use custom auth with Basic
        const sB64 = window.btoa(`${sdkConfigAuth.mashupUserIdentifier}:${window.atob(sdkConfigAuth.mashupPassword)}`);
        sdkSetAuthHeader( `Basic ${sB64}`);
      }

      if( !sdkConfigAuth.mashupClientId && sdkConfigAuth.customAuthType === "BasicTO" ) {
        const now = new Date();
        const expTime = new Date( now.getTime() + 5*60*1000);
        let sISOTime = `${expTime.toISOString().split(".")[0]}Z`;
        const regex = /[-:]/g;
        sISOTime = sISOTime.replace(regex,"");
        // Service package to use custom auth with Basic
        const sB64 = window.btoa(`${sdkConfigAuth.mashupUserIdentifier}:${window.atob(sdkConfigAuth.mashupPassword)}:${sISOTime}`);
        sdkSetAuthHeader( `Basic ${sB64}`);
      }

      // Login if needed, without doing an initial main window redirect
      loginIfNecessary("embedded", true);

    });

    document.addEventListener("SdkConstellationReady", () => {
      // start the portal
      startMashup();
    });


    // Subscriptions can't be done until onPCoreReady.
    //  So we subscribe there. But unsubscribe when this
    //  component is unmounted (in function returned from this effect)

    return function cleanupSubscriptions() {

      PCore?.getPubSubUtils().unsubscribe(
        PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL,
        "cancelAssignment"
      );

      PCore?.getPubSubUtils().unsubscribe(
        "assignmentFinished",
        "assignmentFinished"
      );

    }
  }, []);


  function onShopNow() {

    // const sLevel = optionClicked;

    setShowTriplePlayOptions( false );
    setShowPega(true);

    const actionsApi = pConn.getActionsApi();
    const createWork = actionsApi.createWork.bind(actionsApi);
    const sFlowType = "pyStartCase";

    //
    // NOTE:  Below, can remove case statement when 8.6.1 and pyCre#ate
    //        works with mashup and can default to MediaCo#

    let actionInfo;

    switch (PCore.getEnvironmentInfo().getApplicationLabel()) {
      case "Child benefit" :
        actionInfo = {
          containerName: "primary",
          flowType: sFlowType || "pyStartCase",
          caseInfo: {
            content : {
              // No Content
            }
          }
        };

        createWork("O0GBM6-ChildBen-Work-ChildBenefit", actionInfo);
        break;

      case "MediaCo" :

        actionInfo = {
          containerName: "primary",
          flowType: sFlowType || "pyStartCase",
          caseInfo: {
            content : {
              // No content
            }
          }
        };

        createWork("DIXL-MediaCo-Work-NewService", actionInfo);
        break;

      default:
          break;
    }

  }

  return (
    <>
      { bShowTriplePlayOptions &&
      <StartPage onStart={onShopNow} /> }

      <div id="embedded-top-level-resolution">
        { bShowResolutionScreen && <ConfirmationPage /> }
      </div>
        <div className={`govuk-grid-row`} id="pega-part-of-page">
          <div className={`govuk-grid-column-full`} id='content'>
            {/* <root-container .pConn="${this.pConn}" ?displayOnlyFA="${true}" ?isMashup="${true}"></root-container> */}
            <div id="pega-root"></div>
            <br />
            {/* <div className={classes.pegaPartText}> * - required fields</div> */}
          </div>
        </div>
    </>
  )
  // return (
  //   <div>
  //     {/* <h4>React SDK: /embedded</h4> */}
  //     <div className={classes.embedTopRibbon} id="embedded-top-level-ribbon">
  //       { bShowAppName ? <Typography variant='h4'>{PCore.getEnvironmentInfo().getApplicationLabel()}</Typography> : null }
  //       &nbsp;&nbsp;&nbsp;&nbsp;
  //       <img src="./assets/img/antenna.svg" className={classes.embedTopIcon} />
  //     </div>
  //     <div id="embedded-top-level-banner-buttons">
  //       { bShowTriplePlayOptions ? getShowTriplePlayOptionsMarkup() : null }
  //     </div>
  //     <div id="embedded-top-level-resolution">
  //       { bShowResolutionScreen ? getResolutionScreenMarkup(): null }
  //     </div>
  //     {/* The next div is the container for the Pega work and a corresponding image */}
  //     <div>
  //     <div className={classes.pegaPartInfo} id="pega-part-of-page">
  //           <div className={classes.pegaPartPega}>
  //               {/* <root-container .pConn="${this.pConn}" ?displayOnlyFA="${true}" ?isMashup="${true}"></root-container> */}
  //               <div id="pega-root"></div>
  //               <br />
  //               <div className={classes.pegaPartText}> * - required fields</div>
  //           </div>
  //           <div className={classes.pegaPartAccompaniment}>
  //               <div className={classes.pegaPartAccompanimentText}>
  //                   We need to gather a little information about you.
  //               </div>
  //               <div>
  //                   <img src="assets/img/cableinfo.png" className={classes.pegaPartAccompanimentImage} />
  //               </div>

  //           </div>
  //       </div>
  //     </div>
  //   </div>
  // )

}

export default function ChildBen() {
  return <Body><EmbeddedTopLevel /></Body>
}
