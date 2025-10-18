export type Utils = {
    /**
     * Returns a random integer between `min` and `max` (inclusive).
     * @param min the lower bound for the roll (rounded up to the nearest integer).
     * @param max the upper inclusive bound for the roll (rounded down to the nearest integer).
     */
    getRandomInt: (min: number, max: number) => number;

    /**
     * Escapes RegExp special charaters in a string
     * @param expression String to escape
     */
    escapeRegExp: (expression: string) => string;

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

    /**
     * Translates seconds into human readable format.
     *
     * Examples:
     *
     * `default` format:
     * `"1 year, 4 months, 3 days, 5 hours, 6 minutes, 30 seconds"`
     *
     * `short` format:
     * `"1 yr, 4 mths, 3 days, 5 hr, 6 min, 30 sec"`
     *
     * `simple` format:
     * `"42:30"` (only hours and minutes)
     *
     * @param seconds The number of seconds to be processed
     * @param format The output format to use
     */
    humanizeTime: (seconds: number,format: "default" | "short" | "simple") => string;

    /** 
     * @deprecated Use `twitchApi.streams.getStreamUptime` instead.
     */
    getUptime: () => Promise<string>;

    /**
     * @deprecated Use `humanizeTime` instead
     */
    secondsForHumans: (seconds: number) => string;

    /**
     * @deprecated Use `humanizeTime` instead
     */
    formattedSeconds: (seconds: number, simpleOutput?: boolean) => string;
};
