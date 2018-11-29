import React, { Component } from 'react';
import './ProgressApp.scss';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})


class Progressbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      percentage: 0,
      goal: 0,
      current: 0,
      error: null,
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch("/funds")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            percentage: result.percentage,
            goal: result.goal,
            current: result.current
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { isLoaded, error, percentage, goal, current } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div style={{width : '700px', height : '75px'}}>
          <div class="vefs-milestone-wrapper">
            <div class="toplabel">
              <div style={{
                'width': `${percentage - ((parseInt(percentage) >= 87) ? 14.7 : 1.)}%`
                }}></div>
              { //Check if message failed
                (parseInt(percentage) > 86)
                  ? <div class="cornerbox right" >{money.format(current)}</div>
                  : <div class="cornerbox left" >{money.format(current)}</div>
              }
            </div>
            <div class="milestone-container">
              <div class="chart-container">

                <div class="line-container">

                  <div class="line"></div>

                  <div class="line left" style={{ width: `${percentage}%` }}></div>
                </div>

                <div class="dot-container">
                  <div class="milestones milestone__10">
                    { //Check if message failed
                      (parseInt(percentage) >= 10)
                        ? <div class="dot completed colored"></div>
                        : <div class="dot completed"></div>
                    }
                  </div>
                  <div class="milestones milestone__25">
                  { //Check if message failed
                      (parseInt(percentage) >= 25)
                        ? <div class="dot completed colored"></div>
                        : <div class="dot completed"></div>
                    }
                  </div>
                  <div class="milestones milestone__50">
                  { //Check if message failed
                      (parseInt(percentage) >= 50)
                        ? <div class="dot completed colored"></div>
                        : <div class="dot completed"></div>
                    }
                  </div>
                  <div class="milestones milestone__80">
                  { //Check if message failed
                      (parseInt(percentage) >= 80)
                        ? <div class="dot completed colored"></div>
                        : <div class="dot completed"></div>
                    }
                  </div>
                  <div class="milestones milestone__100">
                  { //Check if message failed
                      (parseInt(percentage) >= 100)
                        ? <div class="dot completed colored"></div>
                        : <div class="dot completed"></div>
                    }
                  </div>
                </div>
              </div>

              <div class="label-container">
                <div class="milestones milestone__10">
                  <div class="label">
                    <div class="tooltip">
                      10%
                  <span class="tooltiptext bottom">Launch a smart box into space!</span>
                    </div>
                  </div>
                </div>
                <div class="milestones milestone__25">
                  <div class="label">
                    <div class="tooltip">
                      25%
                  <span class="tooltiptext bottom">Visit NASA wallop's flight facility!</span>
                    </div>
                  </div>
                </div>
                <div class="milestones milestone__50">
                  <div class="label">
                    <div class="tooltip">
                      50%
                  <span class="tooltiptext bottom">Visit Green Bank Observatory!</span>
                    </div>
                  </div>
                </div>
                <div class="milestones milestone__80">
                  <div class="label">
                    <div class="tooltip">
                      80%
                  <span class="tooltiptext bottom">Send ZR and FTC to compititions in Boston and Pennsylvania!</span>
                    </div>
                  </div>
                </div>
                <div class="milestones milestone__100">
                  <div class="label">
                    <div class="tooltip">
                      100%
                  <span class="tooltiptext bottom">Go to CERN!</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div >
      )
    }
  }
}
export default Progressbar
