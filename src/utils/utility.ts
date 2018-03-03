const moment = require('moment')

export default class Utility {
  /**
   * Format seconds to either minutes, hours or days, depending the passed value
   * If the passed value is less than 60 seconds it will return that value.
   * If the passed value is less than an hour it will return the number of minutes
   * If the passed value is less than a day, it will return the number of hours left
   * Finally, if the number of seconds left is more than a day, it will return the number of days
   */
  public static formatSecondsToOther (nextRewardIn: number): string {
    // constant
    const SECONDS = 'seconds'
    const minute = 60
    const hour = 3600
    const day = 86400

    if( nextRewardIn != null)
    {
      if (nextRewardIn < minute )
      {
        return `${nextRewardIn} second(s)`
      }
      else if (nextRewardIn < hour)
      {
        return `${(moment.duration(nextRewardIn, SECONDS).asMinutes()).toFixed(0)} minute(s)`
      }
      else if (nextRewardIn < day)
      {
        return `${Number(moment.duration(nextRewardIn, SECONDS).asHours()).toFixed(0)} hour(s)`
      }
      else
      {
        return `${(moment.duration(nextRewardIn, SECONDS).asDays()).toFixed(0)} day(s)`
      }
    }
    else
    {
      return 'fetching ...'
    }
  }
}

