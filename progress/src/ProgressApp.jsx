import React, { Component } from 'react';
import './ProgressApp.css';

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
    fetch("http://jack.jacktimmins.com/funds")
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
        <div>
          <div class="upgm_meter upgm_progressbar" >
            <div class="upgm_progressbar_goal">
              <div class="upgm_progressbar_amount" style={{ display: "block" }}>{money.format(goal)}</div>
            </div>
            <div class="upgm_progressbar_outer">
              <div class="upgm_progressbar_progress" style={{ background: "rgb(238, 197, 204)", width: `${percentage}%` }}>
                <div class=" upgm_progressbar_amount" style={{ display: "block" }}>{money.format(current)}</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
export default Progressbar
