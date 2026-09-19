/** The raw marketing params captured from the URL. */
export type AttributionParams = Record<string, string>;

/** What gets persisted: the params plus when they were first captured. */
export type Attribution = {
  params: AttributionParams;
  capturedAt: number; // epoch ms — drives the 30-day window
};
