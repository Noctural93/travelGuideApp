import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TravelItem from '../TravelItem'

import './index.css'

class TravelGuide extends Component {
  state = {
    travelList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getTravelGuideDetails()
  }

  renderSuccessView = () => {
    const {travelList} = this.state

    return (
      <ul className="travel-list-container">
        {travelList.map(eachItem => (
          <TravelItem key={eachItem.id} travelDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderProgressView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  getTravelGuideDetails = async () => {
    this.setState({isLoading: true})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))
      this.setState({
        travelList: updatedData,
        isLoading: false,
      })
    }
  }

  render() {
    const {isLoading, travelList} = this.state
    console.log(travelList)
    return (
      <div className="travel-guide-container">
        <h1 className="travel-heading">Travel Guide</h1>
        {isLoading ? this.renderProgressView() : this.renderSuccessView()}
      </div>
    )
  }
}

export default TravelGuide
