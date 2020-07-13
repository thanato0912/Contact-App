import React from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";
import ContactCreate from "./ContactCreate";
import update from "react-addons-update";

export default class Contact extends React.Component {
  state = {
    keyword: "",
    selectedKey: -1,
    contactData: [
      {
        name: "James",
        number: "323-687-4823",
      },
      {
        name: "Charles",
        number: "425-451-1241",
      },
      {
        name: "David",
        number: "201-231-5356",
      },
      {
        name: "Sofia",
        number: "210-694-4214",
      },
      {
        name: "Zora",
        number: "604-237-9341",
      },
    ],
  };

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  handleClick = (key) => {
    this.setState({
      selectedKey: key,
    });
  };

  handleCreate = (contact) => {
    this.setState({
      contactData: update(this.state.contactData, { $push: [contact] }),
    });
  };

  handleRemove = () => {
    if (this.state.selectedKey < 0) return;
    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]],
      }),
      selectedKey: -1,
    });
  };

  handleEdit = (name, number) => {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: { $set: name },
          number: { $set: number },
        },
      }),
    });
  };

  comp = (a, b) => {
    const s1 = a.name.toLowerCase();
    const s2 = b.name.toLowerCase();
    if (s1 > s2) return 1;
    else if (s1 < s2) return -1;
    return 0;
  };

  render() {
    const mapToComponents = (data) => {
      data.sort(this.comp);
      data = data.filter((contact) => {
        return (
          contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) >
          -1
        );
      });
      return data.map((contact, i) => {
        return (
          <ContactInfo
            contact={contact}
            key={i}
            onClick={() => this.handleClick(i)}
          />
        );
      });
    };

    return (
      <div>
        <h1>Contact</h1>
        <input
          name="keyword"
          placeholder="Search by name"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey > -1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <ContactCreate onCreate={this.handleCreate} />
      </div>
    );
  }
}
