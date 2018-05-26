import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldTick: true,
      current: parseInt(new Date().getTime() / 1000)
    };

    this.convertTimestamp = this.convertTimestamp.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    const { shouldTick } = this.state;
    if (shouldTick) {
      this.setState({ current: parseInt(new Date().getTime() / 1000) });
    }
  }

  convertTimestamp() {
    const { date } = this.state;
    let newDate = new Date(date * 1000);
    this.setState({ tzdate: newDate.toString(), utcdate: newDate.toUTCString() });
  }

  render() {
    const { current, tzdate, utcdate } = this.state;
    return (
      <div className="container-fluid">
        <div className="row justify-content-center timeConverter">
          <div className="col-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control text-center"
                onChange={e => this.setState({ date: e.target.value })}
                type="text"
                id="time"
              />
              <div class="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.convertTimestamp}
                >
                  To human date
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center timeblock">
          <div className="col-6">
            <h5 className="timeLabel">Current Timestamp</h5>
            <input
              className="currentTime"
              onFocus={() => this.setState({ shouldTick: false })}
              onBlur={() => this.setState({ shouldTick: true })}
              type="text"
              value={current}
            />
          </div>
        </div>

        {utcdate && (
          <div className="row justify-content-center timeblock">
            <div className="col-6">
              <h5 className="timeLabel">UTC Date</h5>
              <p className="time">{utcdate}</p>
            </div>
          </div>
        )}

        {tzdate && (
          <div className="row justify-content-center timeblock">
            <div className="col-6">
              <h5 className="timeLabel">Date in your timezone</h5>
              <p className="time">{tzdate}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
