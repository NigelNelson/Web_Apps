/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * Class responsible for allowing a user to filter menu items by allergens.
 * This component contains a toggle switch for each of the 8 common allergen. This
 * updates the display by sending a JSON object to App.js which is comprised on the
 * toggled allergen, and whether that toggle is selected or not.
 */
class AllergenSelect extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Filter by Allergen:"), /*#__PURE__*/React.createElement("div", {
      className: "form-check form-switch"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-check-input",
      type: "checkbox",
      role: "switch",
      id: "soyFree",
      onChange: event => this.props.onFilterChange({
        name: 'soy',
        isChecked: event.target.checked
      })
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label",
      htmlFor: "soyFree"
    }, "Soy Free")), /*#__PURE__*/React.createElement("div", {
      className: "form-check form-switch"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-check-input",
      type: "checkbox",
      role: "switch",
      id: "eggFree",
      onChange: event => this.props.onFilterChange({
        name: 'egg',
        isChecked: event.target.checked
      })
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label",
      htmlFor: "eggFree"
    }, "Egg Free")), /*#__PURE__*/React.createElement("div", {
      className: "form-check form-switch"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-check-input",
      type: "checkbox",
      role: "switch",
      id: "milkFree",
      onChange: event => this.props.onFilterChange({
        name: 'milk',
        isChecked: event.target.checked
      })
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label",
      htmlFor: "milkFree"
    }, "Milk Free")), /*#__PURE__*/React.createElement("div", {
      className: "form-check form-switch"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-check-input",
      type: "checkbox",
      role: "switch",
      id: "fishFree",
      onChange: event => this.props.onFilterChange({
        name: 'fish',
        isChecked: event.target.checked
      })
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label",
      htmlFor: "fishFree"
    }, "Fish Free")), /*#__PURE__*/React.createElement("div", {
      className: "form-check form-switch"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-check-input",
      type: "checkbox",
      role: "switch",
      id: "peanutFree",
      onChange: event => this.props.onFilterChange({
        name: 'peanut',
        isChecked: event.target.checked
      })
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label",
      htmlFor: "peanutFree"
    }, "Peanut Free")), /*#__PURE__*/React.createElement("div", {
      className: "form-check form-switch"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-check-input",
      type: "checkbox",
      role: "switch",
      id: "shellfishFree",
      onChange: event => this.props.onFilterChange({
        name: 'shellfish',
        isChecked: event.target.checked
      })
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label",
      htmlFor: "fishFree"
    }, "Shellfish Free")), /*#__PURE__*/React.createElement("div", {
      className: "form-check form-switch"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-check-input",
      type: "checkbox",
      role: "switch",
      id: "treeNutFree",
      onChange: event => this.props.onFilterChange({
        name: 'treeNut',
        isChecked: event.target.checked
      })
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label",
      htmlFor: "treeNutFree"
    }, "Tree Nut Free")), /*#__PURE__*/React.createElement("div", {
      className: "form-check form-switch"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-check-input",
      type: "checkbox",
      role: "switch",
      id: "glutenFree",
      onChange: event => this.props.onFilterChange({
        name: 'gluten',
        isChecked: event.target.checked
      })
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label",
      htmlFor: "glutenFree"
    }, "Gluten Free")));
  }

}
/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * React component responsible for creating the interactive Culver's menu and handling all of the
 * behavior that results from user input.
 */
class App extends React.Component {
  // Assign the default state
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      selectedType: 'All',
      soy: false,
      egg: false,
      milk: false,
      fish: false,
      peanut: false,
      shellfish: false,
      treeNut: false,
      gluten: false
    };
  }

  render() {
    /**
     * Called when a user types in the search field. Sets the state's searchString
     * property to the entered text
     * @param searchString the text contained in the search field
     */
    const onSearchChanged = searchString => {
      this.setState({
        searchString: searchString
      });
    };
    /**
     * Called when the user selects an item from the TypeSelect. Results in the state's selectedType
     * being set to the selected type from the drop-down menu
     * @param selectedType the type selected from the drop-down menu
     */


    const onTypeChange = selectedType => {
      this.setState({
        selectedType: selectedType
      });
    };
    /**
     * Called when one of the allergen toggles is clicked. Results in the state's matching
     * allergen property being set equal to the whether or not the associated allergen
     * is selected.
     * @param allergen JSON object with a name and an isChecked property
     */


    const onFilterChange = allergen => {
      switch (allergen.name) {
        case 'soy':
          this.setState({
            soy: allergen.isChecked
          });
          break;

        case 'egg':
          this.setState({
            egg: allergen.isChecked
          });
          break;

        case 'milk':
          this.setState({
            milk: allergen.isChecked
          });
          break;

        case 'fish':
          this.setState({
            fish: allergen.isChecked
          });
          break;

        case 'peanut':
          this.setState({
            peanut: allergen.isChecked
          });
          break;

        case 'shellfish':
          this.setState({
            shellfish: allergen.isChecked
          });
          break;

        case 'treeNut':
          this.setState({
            treeNut: allergen.isChecked
          });
          break;

        case 'gluten':
          this.setState({
            gluten: allergen.isChecked
          });
          break;
      }
    }; // Get ALL menu items


    let menuItems = this.props.menuItems; // Remove menuItems whose name doesn't substring match to the entered text in the search field

    menuItems = menuItems.filter(menuItem => {
      return menuItem.name.toLowerCase().includes(this.state.searchString.toLowerCase());
    }); // Unless All is selected, filter out menu items that aren't of the selected type

    if (this.state.selectedType !== 'All') {
      menuItems = menuItems.filter(menuItem => {
        return menuItem.type.includes(this.state.selectedType);
      });
    } // For each allergen in the state, if the associated toggle is checked, then remove menu items
    // that contain that allergen


    Object.entries(this.state).map(([key, value]) => {
      if (key !== 'searchString' && key !== 'selectedType' && value) {
        menuItems = menuItems.filter(menuItem => {
          return !menuItem[key];
        });
      }
    }); // Render the application

    return /*#__PURE__*/React.createElement("div", {
      className: "HolyGrail"
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("div", {
      className: "HolyGrail-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "HolyGrail-nav"
    }, /*#__PURE__*/React.createElement(FilterBar, {
      onSearchChange: onSearchChanged,
      onTypeChange: onTypeChange,
      onFilterChange: onFilterChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "HolyGrail-content"
    }, /*#__PURE__*/React.createElement(MenuGrid, {
      menuItems: menuItems
    }))), /*#__PURE__*/React.createElement(Footer, null));
  }

}
/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * Component responsible for encapsulated the individual filter components. Passes the associated event
 * handlers to each individual component.
 */
class FilterBar extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "mx-1"
    }, /*#__PURE__*/React.createElement(SearchBar, {
      onSearchChange: this.props.onSearchChange
    }), /*#__PURE__*/React.createElement(TypeSelect, {
      onTypeChange: this.props.onTypeChange
    }), /*#__PURE__*/React.createElement(AllergenSelect, {
      onFilterChange: this.props.onFilterChange
    }));
  }

}
/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * Component that is the footer of the holy-grail layout. Responsible for displaying copy right information
 */
class Footer extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("p", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("span", null, "\xA9"), " Culver Franchising System, LLC. All Rights Reserved.");
  }

}
/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * Component that is the header of the holy-grail layout. Responsible showing the title of the web app
 */
class Header extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("h1", null, "Culver's Menu");
  }

}
/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * Window onload function - Creates the menuItem (unfiltered) array
 *     and renders the application
 */
window.onload = () => {
  const menuItems = [{
    name: "ButterBurger",
    soy: true,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Burger"
  }, {
    name: "ButterBurger Cheese",
    soy: true,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Burger"
  }, {
    name: "Mushroom & Swiss ButterBurger",
    soy: true,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Burger"
  }, {
    name: "Sourdough Melt",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Burger"
  }, {
    name: "The Culver's Bacon Deluxe",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Burger"
  }, {
    name: "The Culver's Deluxe",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Burger"
  }, {
    name: "Wisconsin Swiss Melt",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Burger"
  }, {
    name: "Crispy Chicken Sandwich",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Chicken"
  }, {
    name: "Grilled Chicken Sandwich",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Chicken"
  }, {
    name: "Original Chicken Tenders",
    soy: false,
    egg: false,
    milk: false,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Chicken"
  }, {
    name: "Spicy Crispy Chicken Sandwich",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Chicken"
  }, {
    name: "Coleslaw",
    soy: false,
    egg: true,
    milk: false,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Side"
  }, {
    name: "Crinkle Cut Fries",
    soy: false,
    egg: false,
    milk: false,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Side"
  }, {
    name: "Mashed Potatoes & Gravy",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Side"
  }, {
    name: "Steamed Broccoli",
    soy: false,
    egg: false,
    milk: false,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Side"
  }, {
    name: "Wisconsin Cheddar Cheese Sauce",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Side"
  }, {
    name: "Cherry Chip Butter Cake Concrete Mixer made with Chocolate Custard",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Cherry Chip Butter Cake Concrete Mixer made with Vanilla Custard",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Chocolate Concrete Mixer made with OREO",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Chocolate Concrete Mixer made with Reese's",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: true,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dessert"
  }, {
    name: "Cookie Dough Concrete Mixer",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Mint Concrete Mixer made with OREO",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Salted Caramel Concrete Mixer made with Brownie",
    soy: false,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Salted Caramel Concrete Mixer made with Cookie Dough",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Salted Caramel Concrete Mixer made with Reese's Peanut Butter Cups",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: true,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dessert"
  }, {
    name: "Vanilla Concrete Mixer made with Butterfinger",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: true,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dessert"
  }, {
    name: "Vanilla Concrete Mixer made with Heath English Toffee Bars",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: true,
    gluten: false,
    type: "Dessert"
  }, {
    name: "Vanilla Concrete Mixer made with OREO",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Vanilla Concrete Mixer made with Reese's",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: true,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dessert"
  }, {
    name: "Chocolate Cake Cone",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Chocolate Dish",
    soy: false,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dessert"
  }, {
    name: "Chocolate Waffle Cone",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Vanilla Cake Cone",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Vanilla Dish",
    soy: false,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dessert"
  }, {
    name: "Vanilla Waffle Cone",
    soy: true,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Dessert"
  }, {
    name: "Butterfly Jumbo Shrimp Basket",
    soy: false,
    egg: false,
    milk: false,
    fish: true,
    peanut: false,
    shellfish: true,
    treeNut: false,
    gluten: true,
    type: "Seafood"
  }, {
    name: "Butterfly Jumbo Shrimp Dinner",
    soy: false,
    egg: false,
    milk: true,
    fish: true,
    peanut: false,
    shellfish: true,
    treeNut: false,
    gluten: true,
    type: "Seafood"
  }, {
    name: "North Atlantic Cod Dinner",
    soy: true,
    egg: true,
    milk: true,
    fish: true,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Seafood"
  }, {
    name: "North Atlantic Cod Filet Sandwich",
    soy: true,
    egg: true,
    milk: true,
    fish: true,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Seafood"
  }, {
    name: "Chicken Cashew Salad with Grilled Chicken",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: true,
    gluten: false,
    type: "Salad"
  }, {
    name: "Cranberry Bacon Bleu Salad with Grilled Chicken",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Salad"
  }, {
    name: "Culver's® Vinaigrette",
    soy: false,
    egg: false,
    milk: false,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dressing"
  }, {
    name: "Garden Fresco Salad",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Salad"
  }, {
    name: "Garden Fresco Salad with Grilled Chicken",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: true,
    type: "Salad"
  }, {
    name: "Honey Mustard Dressing",
    soy: false,
    egg: false,
    milk: false,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dressing"
  }, {
    name: "Ken's® Blue Cheese Dressing",
    soy: false,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dressing"
  }, {
    name: "Ken's® Country French",
    soy: false,
    egg: false,
    milk: false,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dressing"
  }, {
    name: "Ken's® Raspberry Vinaigrette",
    soy: false,
    egg: false,
    milk: false,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dressing"
  }, {
    name: "Ranch Dressing",
    soy: false,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dressing"
  }, {
    name: "Southwest Avocado Salad",
    soy: false,
    egg: false,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Salad"
  }, {
    name: "Zesty Avocado Dressing",
    soy: false,
    egg: true,
    milk: true,
    fish: false,
    peanut: false,
    shellfish: false,
    treeNut: false,
    gluten: false,
    type: "Dressing"
  }];
  ReactDOM.render( /*#__PURE__*/React.createElement(App, {
    menuItems: menuItems
  }), document.getElementById('root'));
};
/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * Component responsible for creating a 3-wide grid of all the menu items it receives in its props.
 */
class MenuGrid extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "row row-cols-3"
    }, this.props.menuItems.map(menuItem => /*#__PURE__*/React.createElement("div", {
      className: "col my-2"
    }, /*#__PURE__*/React.createElement(MenuItem, {
      menuItem: menuItem
    })))));
  }

}
/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * Component responsible for displaying information about a single menu item. This includes the item name,
 * the item type, and all of the allergens that the item contains.
 */
class MenuItem extends React.Component {
  render() {
    // Make list of all the allergens an item contains
    const allergens = [];

    for (let key in this.props.menuItem) {
      let value = this.props.menuItem[key];

      if (key !== 'name' && key !== 'type' && value) {
        allergens.push(key);
      }
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "card h-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "card-title"
    }, this.props.menuItem.name), /*#__PURE__*/React.createElement("p", {
      className: "card-text"
    }, this.props.menuItem.type), /*#__PURE__*/React.createElement("p", {
      className: "card-text"
    }, "Allergens:"), allergens.map(allergen => /*#__PURE__*/React.createElement("span", {
      className: "badge badge-pill badge-primary bg-primary mx-1"
    }, allergen))));
  }

}
/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * Responsible for creating a search bar that allows the user to filter by menu item's names. When text is entered
 * it passed the text to App.js so that it can perform substring filtering on the menu items.
 */
class SearchBar extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "input-group rounded my-1"
    }, /*#__PURE__*/React.createElement("input", {
      type: "search",
      className: "form-control rounded",
      placeholder: "Search",
      "aria-label": "Search",
      "aria-describedby": "search-addon",
      onChange: event => this.props.onSearchChange(event.target.value)
    }));
  }

}
/**
 * Author: Nigel Nelson
 * Assignment: Lab 8 - Menu Filter
 * Section: 021
 */

/**
 * Component that creates a drop-down menu allowing the user to filter menu items by the type of item. When a type is
 * selected, this type is passed to App.js for filtering.
 */
class TypeSelect extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("select", {
      className: "form-select form-select-lg mb-3",
      name: "itemTypes",
      id: "itemTypes",
      onChange: event => this.props.onTypeChange(event.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: "All"
    }, "All"), /*#__PURE__*/React.createElement("option", {
      value: "Burger"
    }, "Burger"), /*#__PURE__*/React.createElement("option", {
      value: "Chicken"
    }, "Chicken"), /*#__PURE__*/React.createElement("option", {
      value: "Side"
    }, "Side"), /*#__PURE__*/React.createElement("option", {
      value: "Dessert"
    }, "Dessert"), /*#__PURE__*/React.createElement("option", {
      value: "Seafood"
    }, "Seafood"), /*#__PURE__*/React.createElement("option", {
      value: "Salad"
    }, "Salad"), /*#__PURE__*/React.createElement("option", {
      value: "Dressing"
    }, "Dressing"));
  }

}
