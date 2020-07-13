import React from "react";
import ContactInfo from "./ContactInfo";

export default class ContactDetails extends React.Component {
  state = {
    isEdit: false,
    name: "",
    number: "",
  };

  handleKeyPress = (e) => {
    if (e.charCode === 13) this.handleToggle();
  };

  handleToggle = () => {
    if (!this.props.isSelected) return;
    if (!this.state.isEdit) {
      this.setState({
        name: this.props.contact.name,
        number: this.props.contact.number,
      });
    } else {
      this.handleEdit();
    }
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleEdit = () => {
    this.props.onEdit(this.state.name, this.state.number);
  };

  render() {
    const details = (
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.number}</p>
      </div>
    );

    const edit = (
      <div>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </p>
        <input
          type="text"
          name="number"
          placeholder="number"
          value={this.state.number}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <p></p>
      </div>
    );

    const view = this.state.isEdit ? edit : details;

    const blank = <div>Not Selected</div>;

    return (
      <div>
        <h2>Details</h2>
        {this.props.isSelected ? view : blank}
        <p>
          <button onClick={this.handleToggle}>
            {this.state.isEdit ? "Save" : "Edit"}
          </button>
          <button onClick={this.props.onRemove}>Remove</button>
        </p>
      </div>
    );
  }
}

ContactDetails.defaultProps = {
  contact: {
    name: "",
    number: "",
  },

  onRemove: () => {
    console.error("onRemove not defined");
  },
  onEdit: () => {
    console.error("onEdit not defined");
  },
};
