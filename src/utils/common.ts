// tslint:disable-next-line:typedef
import * as moment from 'moment'

// tslint:disable-next-line:no-unnecessary-class
export default class Utility {
  /**
   * Format seconds to either minutes, hours or days, depending the passed value
   * If the passed value is less than 60 seconds it will return that value.
   * If the passed value is less than an hour it will return the number of minutes
   * If the passed value is less than a day, it will return the number of hours left
   * Finally, if the number of seconds left is more than a day, it will return the number of days
   */
  public static formatSecondsToOther(nextRewardIn?: number): string {
    // constant
    const DAYS: number= 86400
    const HOURS: number = 3600
    const FETCHING: string = '∞'
    const MINUTES: number = 60
    const SECONDS: 'seconds' = 'seconds'

    if (nextRewardIn === undefined || nextRewardIn === -1)
    {
      return FETCHING
    }
    if (nextRewardIn < -1)
    {
      return '∞'
    }
    if (nextRewardIn < MINUTES && nextRewardIn > 0)
    {
      return `${nextRewardIn} second(s)`
    }
    else if (nextRewardIn < HOURS)
    {
      return `${(moment.duration(nextRewardIn, SECONDS).asMinutes()).toFixed(0)} minute(s)`
    }
    else if (nextRewardIn < DAYS)
    {
      return `${Number(moment.duration(nextRewardIn, SECONDS).asHours()).toFixed(0)} hour(s)`
    }
    else
    {
      return `${(moment.duration(nextRewardIn, SECONDS).asDays()).toFixed(0)} day(s)`
    }
  }
}
