import './index.css'

const TravelItems = props => {
  const {travelDetails} = props
  const {name, imageUrl, description} = travelDetails

  return (
    <li className="travel-list-item">
      <img src={imageUrl} alt={name} className="image-tag" />
      <h1>{name}</h1>
      <p>{description}</p>
    </li>
  )
}

export default TravelItems
