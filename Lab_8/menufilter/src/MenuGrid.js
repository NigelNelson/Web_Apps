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
        return (
            <div>
                <div className="row row-cols-3">
                {this.props.menuItems.map(menuItem =>
                    <div className="col my-2">
                        <MenuItem menuItem={menuItem}/>
                    </div>
                )}
                </div>
            </div>
        )
    }
}