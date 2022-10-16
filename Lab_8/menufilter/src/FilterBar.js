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
        return (
            <div className="mx-1">
                <SearchBar onSearchChange={this.props.onSearchChange}/>
                <TypeSelect onTypeChange={this.props.onTypeChange}/>
                <AllergenSelect onFilterChange={this.props.onFilterChange}/>
            </div>
        )
    }
}