import axios from 'axios';
import react, { PureComponent } from 'react'

class Fib extends PureComponent {
    state = {
        seenIndexes: [],
        values: {},
        index: ""
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    renderSeenIndexes(){
        return this.state.seenIndexes.map(({number}) => number).join(', ')
    }

    renderValues(){
        const entries = []
        for(let key in this.state.values){
            entries.push(
                <div key={key}>
                    For index {key} I calculated 
                </div>
            )
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        await axios.post("/api/values", {index: this.state.index})
        this.setState({index: ""})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index</label>
                    <input onChange={(value)=> this.setState({index: value.target.value})} value={this.state.index}/>
                    <button>Submit</button>
                </form>
                <h3>Index que eu tenho visto</h3>
                {this.renderSeenIndexes()}
                <h3>Valores Calculados</h3>
            </div>
        )
    }

    async fetchValues() {
        const values = await axios.get("/api/values/current")
        this.setState({values: values.data})
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get("/api/values/all");
        this.setState({seenIndexes: seenIndexes.data})
    }
}

export default Fib