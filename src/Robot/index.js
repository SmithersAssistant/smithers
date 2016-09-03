// Robot Parts
import RobotTabs from './parts/RobotTabs'
import RobotCards from './parts/RobotCards'
import RobotUI from './parts/RobotUI'
import RobotTalk from './parts/RobotTalk'
import RobotPlugins from './parts/RobotPlugins'
import RobotUtils from './parts/RobotUtils'
import RobotEvents from './parts/RobotEvents'
import RobotActions from './parts/RobotActions'
import RobotState from './parts/RobotState'
import RobotConfig from './parts/RobotConfig'
import RobotDependencies from './parts/RobotDependencies'

const Robot = {
  ...RobotActions,
  ...RobotState,
  ...RobotTabs,
  ...RobotCards,
  ...RobotUI,
  ...RobotTalk,
  ...RobotPlugins,
  ...RobotUtils,
  ...RobotEvents,
  ...RobotConfig,
  ...RobotDependencies
}

Robot.loadVoices()

export default Robot
