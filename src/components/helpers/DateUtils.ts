import moment from 'moment-timezone'

export default class DateUtils {
  static newMoment(val: Date | string) {
    let dateString = val
    let timezone = moment().tz()

    if (moment.isMoment(val)) {
      dateString = val.toISOString()
      timezone = val.tz() || timezone
    }

    let momentInstance = moment(dateString)

    if (timezone) {
      momentInstance = momentInstance.tz(timezone)
    }

    return momentInstance
  }

  static asMoment(val: Date | string) {
    if (!val) return null

    const m = this.newMoment(val)

    if (!m.isValid()) return null

    return m
  }
}
