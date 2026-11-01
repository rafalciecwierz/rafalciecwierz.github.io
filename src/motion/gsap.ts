// GSAP with its plugins registered, imported only by motion code (src/motion/ and
// src/motionComponents/), so none of it reaches the initial bundle (DECISIONS.md #005).
// Registering in one module means every motion component gets the same, ready GSAP: an ES
// module runs once, however many files import it.
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// useGSAP is registered too, so GSAP knows about React's lifecycle (as @gsap/react asks).
gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };
