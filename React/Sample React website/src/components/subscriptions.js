
import React, {Component} from 'react';

class Subscriptions extends Component {

    constructor(props){
        super(props);

            this.state = {
                email: '',
                error: false,
                success: false
            }
    }


    // Get the value of the email input and change state above
    onChangeInput = (event) => {
        this.setState({
            email:event.target.value
        })
    }

    // Save email after submit button is pressed
    saveSubscription = (email) => {

        const URL_EMAIL = 'http://localhost:3004/subcriptions';

        fetch(URL_EMAIL, {method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email})
        }).then(response => response.json()).then(()=>{
            this.setState({
                email: "",
                success: true
            })
        })

    }

    clearMessages = () => {
        setTimeout(function(){
            this.setState({
                error: false,
                success: false
            })
        }.bind(this),3000)
    }

    // Hande submit button
    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let regex = /\S+@\S+\.\S+/;

        if(regex.test(email)) {
            this.saveSubscription(email)
        } else {
            this.setState({error:true})
        }
        this.clearMessages()

    }


    render(){
        return(
            <div className='subscribe_panel'>
                <h3>Subscribe to us</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="youremail@email.com" value={this.state.email} onChange={this.onChangeInput} />
                        <div className={this.state.error ? "errorshow" : "error"}>Check your email</div>
                        <div className={this.state.success ? "successshow" : "success"}>Thank you</div>
                    </form>
                </div>
                <small>Get up to date information about your favorite NBA team. Sign up now!</small>
            </div>
        )
    }



}

export default Subscriptions;
