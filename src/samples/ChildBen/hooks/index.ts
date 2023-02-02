import { makeStyles } from '@material-ui/core/styles';

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

export default useStyles;