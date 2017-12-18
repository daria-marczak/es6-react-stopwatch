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
            display: display,
            reset: reset,
            print: this.times
        }
    }
    reset = () => {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print(this.times);
    }
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    start() {
        if(!this.running) {
            this.running = true;
            this.watch = setInterval() => this.step(), 10);
        }
    }
    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
    render(App, document.querySelector(".stopwatch"));
}

class Controls extends React.Component {
        static defaultProps = {
            start: React.PropTypes.func.isRequired,
            stop: React.PropTypes.func.isRequired,
            reset: React.PropTypes.func.isRequired
        }
        render() {
            return (
                <nav class="controls">
                    <a href="#" class="button" id="start">Start</a>
                    <a href="#" class="button" id="stop">Stop</a>
                    <a href="#" class="button" id="reset">Reset</a>
                </nav>
            )
        }
}
