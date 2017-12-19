const pad0 = value => {
    let result = value.toString();
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
};

class App extends React.Component {
    constructor() {
        super();

        this.reset = () => {
            if (!this.state.running) {
                this.setState({
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                });
            }
        };

        this.state = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            running: false
        };
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    start() {
        if (!this.running) {
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
        });
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "p",
                { className: "minutes" },
                this.state.minutes
            ),
            React.createElement(
                "p",
                null,
                ":"
            ),
            React.createElement(
                "p",
                { className: "seconds" },
                this.state.seconds
            ),
            React.createElement(
                "p",
                null,
                ":"
            ),
            React.createElement(
                "p",
                { className: "miliseconds" },
                this.state.miliseconds
            ),
            React.createElement(
                "div",
                { className: "controls" },
                React.createElement(
                    "button",
                    { onClick: this.start.bind(this) },
                    "START"
                ),
                React.createElement(
                    "button",
                    { onClick: this.stop.bind(this) },
                    "STOP"
                ),
                React.createElement(
                    "button",
                    { onClick: this.reset.bind(this) },
                    "RESET"
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(App, null), document.querySelector(".stopwatch"));
