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
        return (
            <div className="input-group rounded my-1">
                <input type="search"
                       className="form-control rounded"
                       placeholder="Search"
                       aria-label="Search"
                       aria-describedby="search-addon"
                       onChange={(event) => this.props.onSearchChange(event.target.value)}
                />
            </div>
        )
    }
}