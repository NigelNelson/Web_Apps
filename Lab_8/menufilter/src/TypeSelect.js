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
        return (
            <select className="form-select form-select-lg mb-3" name="itemTypes" id="itemTypes"
                    onChange={(event) => this.props.onTypeChange(event.target.value)}>
                <option value="All">All</option>
                <option value="Burger">Burger</option>
                <option value="Chicken">Chicken</option>
                <option value="Side">Side</option>
                <option value="Dessert">Dessert</option>
                <option value="Seafood">Seafood</option>
                <option value="Salad">Salad</option>
                <option value="Dressing">Dressing</option>
            </select>
        )
    }
}