// Write your code here
import {Component} from 'react'
import './index.css'

const timerStatusConstants = {
  running: 'RUNNING',
  paused: 'PAUSED',
}

class DigitalTimer extends Component {
  state = {
    timerLimitInMinutes: 25,
    timeElapsedInSeconds: 0,
    timerStatus: timerStatusConstants.paused,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.timerInterval)
  }

  onClickStartOrPause = () => {
    const {timerStatus} = this.state

    if (timerStatus === timerStatusConstants.running) {
      this.clearTimerInterval()
      this.setState({timerStatus: timerStatusConstants.paused})
    } else {
      this.timerInterval = setInterval(this.updateTimer, 1000)
      this.setState({timerStatus: timerStatusConstants.running})
    }
  }

  updateTimer = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalTimeInSeconds = timerLimitInMinutes * 60

    if (timeElapsedInSeconds === totalTimeInSeconds) {
      this.clearTimerInterval()
      this.setState({timerStatus: timerStatusConstants.paused})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState({
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 25,
      timerStatus: timerStatusConstants.paused,
    })
  }

  onIncreaseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecreaseTimerLimit = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  getElapsedTime = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const remainingTimeInSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(remainingTimeInSeconds / 60)
    const seconds = Math.floor(remainingTimeInSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timerLimitInMinutes, timerStatus} = this.state
    const isRunning = timerStatus === timerStatusConstants.running

    const startPauseText = isRunning ? 'Pause' : 'Start'
    const startPauseIcon = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-display-container">
            <div className="timer-display">
              <h1 className="timer-text">{this.getElapsedTime()}</h1>
              <p className="timer-status">{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          <div className="controls-container">
            <div className="start-reset-container">
              <button
                type="button"
                className="control-btn"
                onClick={this.onClickStartOrPause}
              >
                <img
                  src={startPauseIcon}
                  alt={startPauseText === 'Start' ? 'play icon' : 'pause icon'}
                  className="control-icon"
                />
                <p>{startPauseText}</p>
              </button>

              <button
                type="button"
                className="control-btn"
                onClick={this.onClickReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="control-icon"
                />
                <p>Reset</p>
              </button>
            </div>

            <div className="timer-limit-container">
              <p className="limit-text">Set Timer limit</p>
              <div className="limit-controls">
                <button
                  type="button"
                  className="limit-btn"
                  onClick={this.onDecreaseTimerLimit}
                  disabled={isRunning}
                >
                  -
                </button>
                <div className="limit-value">
                  <p>{timerLimitInMinutes}</p>
                </div>
                <button
                  type="button"
                  className="limit-btn"
                  onClick={this.onIncreaseTimerLimit}
                  disabled={isRunning}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
