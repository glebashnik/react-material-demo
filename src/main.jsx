import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';

injectTapEventPlugin();

const RICK = {
    name: 'Rick',
    photo: 'images/rick.jpg'
}

const MORTY = {
    name: 'Morty',
    photo: 'images/morty.jpg'
}


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: []
        };
    }

    addProfile(profile) {
        const newProfiles = this.state.profiles.slice();
        newProfiles.push(profile);
        this.setState({profiles: newProfiles}) ;
    }

    addRick = () => {
        this.addProfile(RICK);
    }

    addMorty = () => {
        this.addProfile(MORTY);
    }

    render() {
        var buttonStyle = {
            backgroundColor: 'transparent',
            color: 'white',
            marginTop: 5
        };

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="React Material Starter Kit" iconElementRight={
                        <div>
                            <FlatButton label='Add Rick' onClick={this.addRick} style={buttonStyle}/>
                            <FlatButton label='Add Morty' onClick={this.addMorty} style={buttonStyle}/>
                        </div>
                    }/>    
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                        {_.map(this.state.profiles, (value, index) =>
                            <Profile key={index} profile={value}/>
                        )}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: props.profile
        }
    }

    changeName = (event) => {
        const newProfile = _.extend({}, this.state.profile);
        newProfile.name = event.target.value;
        this.setState({profile: newProfile});
    }

    render() { 
        const profile = this.state.profile;

        const nameField = (
            <TextField
                floatingLabelText='Name' 
                floatingLabelFixed={true}
                value={profile.name}
                onChange={this.changeName}
                fullWidth
            />         
        )

        const photoImg = <img style={{width: 150, margin: 10}} src={profile.photo}/>

        return (
            <Paper zDepth={2} style={{display: 'flex', margin: 20, padding: 20, flexDirection: 'column', alignItems: 'center', width: 200}}>
                {nameField}
                {photoImg}       
            </Paper>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))