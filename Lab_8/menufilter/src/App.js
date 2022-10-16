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
        const onSearchChanged = (searchString) => {
            this.setState({
                searchString: searchString
            });
        }

        /**
         * Called when the user selects an item from the TypeSelect. Results in the state's selectedType
         * being set to the selected type from the drop-down menu
         * @param selectedType the type selected from the drop-down menu
         */
        const onTypeChange = (selectedType) => {
            this.setState({
                selectedType: selectedType
            });
        }

        /**
         * Called when one of the allergen toggles is clicked. Results in the state's matching
         * allergen property being set equal to the whether or not the associated allergen
         * is selected.
         * @param allergen JSON object with a name and an isChecked property
         */
        const onFilterChange = (allergen) => {
            switch (allergen.name){
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
        }

        // Get ALL menu items
        let menuItems = this.props.menuItems

        // Remove menuItems whose name doesn't substring match to the entered text in the search field
        menuItems = menuItems.filter((menuItem) => {
            return menuItem.name.toLowerCase().includes(this.state.searchString.toLowerCase());
        });

        // Unless All is selected, filter out menu items that aren't of the selected type
        if(this.state.selectedType !== 'All'){
            menuItems = menuItems.filter((menuItem) => {
                return menuItem.type.includes(this.state.selectedType);
            })
        }

        // For each allergen in the state, if the associated toggle is checked, then remove menu items
        // that contain that allergen
        Object.entries(this.state).map(([key, value]) => {
            if(key !== 'searchString' && key !== 'selectedType' && value){
                menuItems = menuItems.filter((menuItem) => {
                    return !menuItem[key];
                })
            }
        });

        // Render the application
        return (
            <div className='HolyGrail' >
                <Header/>
                <div className='HolyGrail-body'>
                    <div className='HolyGrail-nav'>
                        <FilterBar onSearchChange={onSearchChanged}
                                   onTypeChange={onTypeChange}
                                   onFilterChange={onFilterChange}/>
                    </div>
                    <div className='HolyGrail-content'>
                        <MenuGrid menuItems={menuItems}/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
