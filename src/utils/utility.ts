export default class Utility {
  public static formatNextRewardInValue (nextRewardIn: number): string {
    let formatedNextRewardIn = nextRewardIn
    if( nextRewardIn != null)
    {
      if (nextRewardIn < 60 )
      {
        return `${formatedNextRewardIn.toFixed(0)} second(s)`
      }
      else if (nextRewardIn < 60*60)
      {
        return `${(formatedNextRewardIn/60).toFixed(0)} minute(s)`
      }
      else if (nextRewardIn < 24*60*60)
      {
        return `${(formatedNextRewardIn/(60*60)).toFixed(0)} hour(s)`
      }
      else
      {
        return `${(formatedNextRewardIn/(60*60*24)).toFixed(0)} day(s)`
      }
    } else {
      return 'false'
    }
  }
}

