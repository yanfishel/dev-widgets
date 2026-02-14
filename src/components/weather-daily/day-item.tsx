

export interface I_DayItem {
  day: string
  weekday: string
  icon: string
  max: number
  min: number
  description: string
}
const DayItem = ({day, weekday, icon, max, min, description}: I_DayItem) => {

  return (
    <div className="day">
      <div className="date"><span>{weekday}</span>{day}</div>
      <div className="weather">
        <div className="icon">{icon && <img src={icon} alt={description} />}</div>
        <div className="temperature">
          <span>{Math.round(max)}°</span>
          <span>{Math.round(min)}°</span>
        </div>
        <div className="description">{description}</div>
      </div>
    </div>
  )
}

export default DayItem