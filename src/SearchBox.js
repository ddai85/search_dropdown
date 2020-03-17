import React from "react";
import PropTypes from "prop-types";
import "./SearchBox.css";

// SearchBox Component receives an array of searchable strings from its parent component
// If the user types a substring that matches one of the searchable strings in the array, a drop down will appear with all valid terms
// Clicking on a search term will auto-fill the input box
// Clicking outside of the input box will automatically close the drop down

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchList: [],
      searchTerm: ""
    };

    this.handleLoseFocus = this.handleLoseFocus.bind(this);
  }

  handleChange(searchTerm) {
    if (searchTerm === "") {
      this.setState({ searchList: [], searchTerm: searchTerm });
      return;
    }
    const regex = new RegExp(escapeRegExp(searchTerm), "gi");
    const filteredList = this.props.searchTerms.filter(term => {
      return term.match(regex);
    });

    this.setState({ searchList: filteredList, searchTerm: searchTerm });
  }

  handleLoseFocus() {
    // Need a small delay in case searchterm is being clicked
    setTimeout(() => {
      this.setState({ searchList: [] });
    }, 100);
  }

  render() {
    let dropDown = null;

    if (this.state.searchList.length) {
      const searchTerms = this.state.searchList.map((term, index) => {
        return (
          <li key={index} onClick={() => this.handleChange(term)}>
            {term}
          </li>
        );
      });

      dropDown = (
        <div id="dropdown">
          <ul>{searchTerms}</ul>
        </div>
      );
    }
    return (
      <div id="container">
        <input
          id="searchinput"
          type="text"
          onChange={e => this.handleChange(e.target.value)}
          onFocus={e => this.handleChange(e.target.value)}
          onBlur={this.handleLoseFocus}
          value={this.state.searchTerm}
        />
        {dropDown}
      </div>
    );
  }
}

SearchBox.propTypes = {
  searchTerms: PropTypes.array
};

// Helper function to escape symbols
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
