import { parse, format } from 'date-fns'
import isValid from 'date-fns/isValid'

export function formatDate(date) {
  return format(date, 'yyyy-MM-dd')
}

export function getTomorrow() {
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  return format(tomorrow, 'yyyy-MM-dd')
}

export function taskNameIsValid(name) {
  return name.length >= 3 && name.length <= 50
}

export function dateIsValid(date) {
  if (!!(date.match(/^\d\d\d\d-\d\d-\d\d$/))) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date())
    return isValid(parsedDate)
  }
  return false
}

export function timeIsValid(time) {
  if (!!(time.match(/^\d\d:\d\d$/))) {
    const [ hour, minute ] = time.split(':')
    return hour >= '00' && hour <= '23' && minute >= '00' && minute <= '59'
  }
  return false
}

export function infoIsValid(info) {
  return info.length <= 500
}