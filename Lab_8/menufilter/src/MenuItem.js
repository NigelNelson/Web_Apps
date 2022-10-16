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
        const allergens = []
        for(let key in this.props.menuItem){
            let value = this.props.menuItem[key];
            if(key !== 'name' && key !== 'type' && value){
                allergens.push(key)
            }
        }

        return (
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{this.props.menuItem.name}</h5>
                    <p className="card-text">{this.props.menuItem.type}</p>
                    <p className="card-text">Allergens:</p>
                    {allergens.map(allergen =>
                        <span className="badge badge-pill badge-primary bg-primary mx-1">{allergen}</span>
                    )}
                </div>
            </div>
        )
    }
}