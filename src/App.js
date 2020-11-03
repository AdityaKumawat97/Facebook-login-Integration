import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import './App.css'
export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };
  responseFacebook = response => {
    console.log(response);
    if (response) {
      this.setState({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url
      });
    }

  };

  componentClicked = () => console.log("clicked");
  logout = (e) => {
    e.preventDefault()
    console.log("logoutclicked")
    window.FB.logout()
    this.setState({ isLoggedIn: false })

  }
  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}


          <button onClick={e => this.logout(e)}>
            LOGOUT
          </button>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="366938184421787"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return (
      <div className="main">
        <div className="container">{fbContent}
        </div>
      </div>
    );
  }
}