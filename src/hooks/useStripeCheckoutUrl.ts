import { useEffect, useMemo } from 'react';

/**
 * Preserves affiliate (am_id) and UTM tracking parameters from the page URL
 * when sending visitors to the Stripe checkout.
 *
 * - Reads `am_id` and any `utm_*` params from `window.location.search`.
 * - Persists `am_id` in `sessionStorage` so it survives in-page navigation.
 * - Returns a Stripe URL with those params appended.
 */
const TRACKING_KEYS = ['am_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const STORAGE_KEY = 'reop_affiliate_tracking';

type TrackingParams = Record<string, string>;

const readTrackingFromUrl = (): TrackingParams => {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const out: TrackingParams = {};
  TRACKING_KEYS.forEach((key) => {
    const v = params.get(key);
    if (v) out[key] = v;
  });
  return out;
};

const readTrackingFromStorage = (): TrackingParams => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingParams) : {};
  } catch {
    return {};
  }
};

const writeTrackingToStorage = (params: TrackingParams) => {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    /* ignore quota errors */
  }
};

export const useStripeCheckoutUrl = (baseUrl: string): string => {
  // On mount, capture URL params into sessionStorage so they persist.
  useEffect(() => {
    const fromUrl = readTrackingFromUrl();
    if (Object.keys(fromUrl).length > 0) {
      const merged = { ...readTrackingFromStorage(), ...fromUrl };
      writeTrackingToStorage(merged);
    }
  }, []);

  return useMemo(() => {
    const tracking = { ...readTrackingFromStorage(), ...readTrackingFromUrl() };
    const keys = Object.keys(tracking);
    if (keys.length === 0) return baseUrl;

    const url = new URL(baseUrl);
    keys.forEach((k) => url.searchParams.set(k, tracking[k]));
    return url.toString();
  }, [baseUrl]);
};
