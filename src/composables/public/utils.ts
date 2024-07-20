interface TimeObject {
  name: string;
  value: string;
  index: number;
}

export const addDurationToTimeSlotObj = (timeObj: TimeObject, duration: number): TimeObject | null => {
    if (!timeObj) return null
  const [hours, minutes] = timeObj.value.split(':').map(Number)
  const totalMinutes = hours * 60 + minutes + duration

  const newHours = Math.floor(totalMinutes / 60) % 24
  const newMinutes = totalMinutes % 60

  const newTimeValue = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`

  const period = newHours < 12 ? 'am' : 'pm'
  const adjustedHours = newHours % 12 === 0 ? 12 : newHours % 12
  const newTimeName = `${adjustedHours}:${newMinutes.toString().padStart(2, '0')}${period}`

  return {
    ...timeObj,
    name: newTimeName,
    value: newTimeValue
  }
}
