import React from "react";

export default class ContactCreate extends React.Component {
  state = {
    name: "",
    number: "",
  };
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.handleClick();
    }
  };

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleClick = () => {
    const contact = {
      name: this.state.name,
      number: this.state.number,
    };
    this.props.onCreate(contact);
    this.setState({
      name: "",
      number: "",
    });

    this.nameInput.focus();
  };

  render() {
    return (
      <div>
        <h2>Create Contact</h2>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            ref={(ref) => {
              this.nameInput = ref;
            }}
          />
          <input
            type="text"
            name="number"
            placeholder="phone number"
            value={this.state.number}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}

ContactCreate.defaultProps = {
  onCreate: () => {
    console.error("onCreate not defined");
  },
};
