import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
const URL = '/api/pets'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onAdoptPet = (petId) => {
    // console.log(petId, this.state.pets.find(pet => pet.id === petId))
    let pet = this.state.pets.find(pet => pet.id === petId)
    pet.isAdopted = !pet.isAdopted
  }

  onFindPetsClick = () => {
    console.log('trying to find a pet')
    if (this.state.filters.type === 'all') {
      fetch(URL)
    .then(response => response.json())
    .then(petList => this.setState({pets: petList}))
    } else {
    fetch(`${URL}?type=${this.state.filters.type}`)
    .then(response => response.json())
    .then(petList => this.setState({pets: petList}))
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters type={this.state.filters.type} onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
