import type { ReferenceType, UseFloatingOptions, UseFloatingReturn } from './types';
/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/useFloating
 */
export declare function useFloating<RT extends ReferenceType = ReferenceType>(options?: UseFloatingOptions): UseFloatingReturn<RT>;
