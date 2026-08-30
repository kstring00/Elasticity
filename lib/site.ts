// TODO: replace with Abrielle's real Instagram profile URL before launch.
export const INSTAGRAM_URL = '[INSTAGRAM_URL]'

/**
 * True once INSTAGRAM_URL holds a real URL. While it is still the placeholder,
 * callers render nothing: a missing link is invisible, a broken one is a
 * visible defect on a page selling trust.
 */
export const hasInstagram = /^https?:\/\//i.test(INSTAGRAM_URL)
