type Quote = {
  readonly _id: number;
  createdAt: Date;
  creator: string;
  originator: string;
  text: string;
  game: string | undefined;
};

type DateConfig = {
  day: number;
  month: number;
  year: number;
};

export type QuotesManager = {
  /**
   * Creates a new quote, returning the `_id` it was saved with.
   * @param quote the quote to add. Ignores the `_id` and uses a new unique one.
   */
  addQuote: (quote: Quote) => Promise<number>;
  /**
   * Updates the given quote and returns it.
   * @param quote the one to update.
   * @param dontSendUiUpdateEvent if true, does not trigger a UI update on change; default: false
   */
  updateQuote: (quote: Quote, dontSendUiUpdateEvent?: boolean) => Promise<Quote>;
  /**
   * Removes the given quote from the database.
   * @param quoteId of the quote to remove.
   * @param dontSendUiUpdateEvent if true, does not trigger a UI update; default: false
   */
  removeQuote: (quoteId: number, dontSendUiUpdateEvent?: boolean) => Promise<void>;
  getQuote: (id: number) => Promise<Quote | undefined>;
  getRandomQuoteByDate: (date: DateConfig) => Promise<Quote | undefined>;
  getRandomQuoteByAuthor: (author: string) => Promise<Quote | undefined>;
  /**
   * Returns a random quote which game matches the regex pattern case-insensitively.
   * @param pattern the quote’s game should match.
   */
  getRandomQuoteByGame: (pattern: string) => Promise<Quote | undefined>;
  /**
   * Returns a random quote which contains text that matches the regex pattern.
   * @param pattern the quote’s text should contain.
   */
  getRandomQuoteContainingText: (pattern: string) => Promise<Quote | undefined>;
  getRandomQuote: () => Promise<Quote | undefined>;
  getAllQuotes: () => Promise<Quote[] | undefined>;
};
