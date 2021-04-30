export type Utils = {
  /**
   * Returns a random integer between `min` and `max` (inclusive).
   * @param min the lower bound for the roll (rounded up to the nearest integer).
   * @param max the upper inclusive bound for the roll (rounded down to the nearest integer).
   */
  getRandomInt: (min: number, max: number) => number;
  escapeRegExp: (expression: string) => string;
  /**
   * Replaces each part of `s` that matches a key of `replaceDictionary` with the value found there.
   *
   * # Example:
   * `s = "SomeString 10010"`, `replaceDictionary = [ {"10{1,2}": "x"}, {"[sS]ome": "None"} ]`
   * will replace `Some` with `None` and both `100` and `10` with `x`,
   * returning `NoneString xx`.
   * @param s the string in which the replacements should be made.
   * @param replaceDictionary a map of regex to the string it should be replaced with.
   */
  populateStringWithReplaceDict: (s: string, replaceDictionary: Record<string, string>[]) => string;
  /**
   * Translates seconds into human readable format of seconds, minutes, hours, days, and years.
   *
   * Example return formats:
   * - `1 year 123 days 1 hour 12 minutes 1 second`
   * - `123 days 12 minutes 1 second`
   * @param seconds the number of seconds to be processed.
   */
  secondsForHumans: (seconds: number) => string;
  /**
   * Returns the `seconds` formatted as `H hours, M minutes, S seconds`.
   * @param seconds a duration in seconds.
   * @param simpleOutput if true, return in the short format `HH:MM`.
   */
  formattedSeconds: (seconds: number, simpleOutput?: boolean) => string;
  /**
   * Returns for how long the current stream has been running.
   *
   * The result is formatted by `formattedSeconds`.
   */
  getUptime: () => string;
  /**
   * Returns the difference between the two dates in a format like in `secondsForHumans()`.
   * @param date1 a date.
   * @param date2 another date.
   */
  getDateDiffString: (date1: Date, date2: Date) => string;
  /**
   * Inserts a comma after each three digits into the number.
   * @param num e.g. `10000`, will be turned into `10,000`.
   */
  commafy: (num: string) => string;
  /**
   * Returns a copy of the `array` with the elements in a shuffled order.
   * @param array the elements of which should be shuffled.
   */
  shuffleArray: (array: any[]) => any[];
  /**
   * Flattens an array of arrays into a single linear one.
   * @param array that should be flattened.
   */
  flattenArray: (array: Array<Array<any>>) => any[];
}
