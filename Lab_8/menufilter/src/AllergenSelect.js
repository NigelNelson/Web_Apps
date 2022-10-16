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
        return (
            <div>
                <h4>Filter by Allergen:</h4>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="soyFree"
                           onChange={(event) =>
                               this.props.onFilterChange({name: 'soy', isChecked: event.target.checked})}/>
                        <label className="form-check-label" htmlFor="soyFree">Soy Free</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="eggFree"
                           onChange={(event) =>
                               this.props.onFilterChange({name: 'egg', isChecked: event.target.checked})}/>
                        <label className="form-check-label" htmlFor="eggFree">Egg Free</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="milkFree"
                           onChange={(event) =>
                               this.props.onFilterChange({name: 'milk', isChecked: event.target.checked})}/>
                        <label className="form-check-label" htmlFor="milkFree">Milk Free</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="fishFree"
                           onChange={(event) =>
                               this.props.onFilterChange({name: 'fish', isChecked: event.target.checked})}/>
                        <label className="form-check-label" htmlFor="fishFree">Fish Free</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="peanutFree"
                           onChange={(event) =>
                               this.props.onFilterChange({name: 'peanut', isChecked: event.target.checked})}/>
                    <label className="form-check-label" htmlFor="peanutFree">Peanut Free</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="shellfishFree"
                           onChange={(event) =>
                               this.props.onFilterChange({name: 'shellfish', isChecked: event.target.checked})}/>
                    <label className="form-check-label" htmlFor="fishFree">Shellfish Free</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="treeNutFree"
                           onChange={(event) =>
                               this.props.onFilterChange({name: 'treeNut', isChecked: event.target.checked})}/>
                    <label className="form-check-label" htmlFor="treeNutFree">Tree Nut Free</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="glutenFree"
                           onChange={(event) =>
                               this.props.onFilterChange({name: 'gluten', isChecked: event.target.checked})}/>
                    <label className="form-check-label" htmlFor="glutenFree">Gluten Free</label>
                </div>
            </div>
        )
    }
}





