// Imported only by motion code, so GSAP never reaches the initial bundle (DECISIONS.md #005).
// Registering here once gives every motion component the same, ready GSAP.
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };
