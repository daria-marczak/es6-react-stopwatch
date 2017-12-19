const pad0 = (value) => {
    let result = value.toString();
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
};

class App extends React.Component {
    constructor() {
        super();
        this.state= {
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            running: false,
        }
    }
    reset = () => {
        if (!this.state.running) {
            this.setState({
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            });
        }

    }
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    start() {
        if(!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step() {
        if (!this.running) return;
        this.calculate();
    }

    calculate() {
        let miliseconds = this.state.miliseconds;
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;

        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState({
            miliseconds: miliseconds,
            seconds: seconds,
            minutes: minutes
        })
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    render() {
        return (
            <div>
                <p className="minutes">{this.state.minutes}</p>
                <p>:</p>
                <p className="seconds">{this.state.seconds}</p>
                <p>:</p>
                <p className="miliseconds">{this.state.miliseconds}</p>

                <div className="controls">
                    <button onClick={this.start.bind(this)}>START</button>
                    <button onClick={this.stop.bind(this)}>STOP</button>
                    <button onClick={this.reset.bind(this)}>RESET</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector(".stopwatch"));
