const scaleNames = {
    c: "celsius",
    f: "fahrenheit"
}

function toCelsius (fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit (celsius) {
    return (celsius * 9 / 5) + 32
}

function BoilingVerdict ({celsius}) {
    if (celsius >= 100) {
        return <div className="alert alert-success">L'eau bout</div>
    }
    return <div className="alert alert-info">L'eau ne bout pas</div>
}

function tryConvert (temperature, convert) {
        const value = parseFloat(temperature)
        if (Number.isNaN(value)) {
            return ''
        }
        return (Math.round(convert(value) * 100) / 100).toString()
}

function Columns2 ({left, right}) {
    return <div className="row">
        <div className="col-md-6">{left}</div>
        <div className="col-md-6">{right}</div>
    </div>
}

class TemperatureInput extends React.Component {

    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render () {
        const {temperature} = this.props
        const name = "scale" + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div>
            <div className="form-group">
                <label htmlFor={name}>Température (en {scaleName})</label>
                <input type="text" id={name} value={temperature} className="form-control" onChange={this.handleChange} placeholder="Entrez une température" />
            </div>
        </div>
    }
}

class Calculator extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: ''
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    handleCelsiusChange (temperature) {
        this.setState({
            scale: "c",
            temperature
        })
    }

    handleFahrenheitChange (temperature) {
        this.setState({
            scale: "f",
            temperature
        })
    }

    render () {
        const {temperature, scale} = this.state
        const celsius = scale === "c" ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === "f" ? temperature : tryConvert(temperature, toFahrenheit)
        return <div>
            <Columns2 
                left={<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />}
                right={<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />}
            />
            <BoilingVerdict celsius={celsius} />
        </div>
    }
}

ReactDOM.render(<Calculator />, document.querySelector("#app"))