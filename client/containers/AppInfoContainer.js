import { connect } from 'react-redux';
import AppInfo from '../components/AppInfo';
import { renameAppAction } from '../redux/reducers/actions';

const mapStateToProps = (state) => ({ appInfo: state.appInfo })

const mapDispatchToProps = (dispatch) => {
  return {
    renameApp: (appName) => dispatch(renameAppAction(appName))
  }
}


const AppInfoContainer = connect(mapStateToProps, mapDispatchToProps)(AppInfo)

export default AppInfoContainer
