# Cinematic Teaser Implementation Report

## Placement

The new Cinematic Teaser section sits after the feature-story sequence and before the lens ecosystem. This creates a deliberate narrative handoff: the feature stories establish the camera's visual character, the short film gives that character a focused audiovisual moment, and the lens gallery then expands the exploration into the wider system.

## Asset Verification

The supplied file was found at the workspace root with a duplicated extension and was normalized to:

- `public/assets/video/canon-eos-r50-ad.mp4`
- `public/assets/video/canon-eos-r50-ad-poster.jpg`

Browser metadata verified a duration of `10.08s` and a native resolution of `1112x834`, so the UI uses a `4:3` frame instead of forcing the clip into a widescreen crop. The MP4 container includes `soun` and `mp4a` markers, confirming an audio stream. The poster is an exact frame exported from approximately the 3-second position.

## Implementation

- Added `src/components/CinematicTeaser.jsx`.
- Added the section as a lazy-loaded route-level chunk in `src/App.jsx`.
- The poster loads with descriptive alternative text.
- The MP4 is not rendered, requested, or decoded before the user activates the play button.
- The modal creates the video only after the explicit user action and uses `preload="none"`.
- Sound starts enabled by default.
- Added visible mute/unmute, close, native playback controls, loading, autoplay-blocked, error, and retry states.
- The video keeps its native ratio and uses letterboxing rather than stretching or aggressive cropping.
- The modal uses `role="dialog"`, `aria-modal`, an accessible heading and description, initial focus, Tab trapping, Escape close, backdrop close, body-scroll locking, playback cleanup, and focus restoration to the original play button.
- The section and modal animation respect `prefers-reduced-motion`; reduced motion does not disable manual playback.

## Copy Used

- Eyebrow: `A short film`
- Heading: `In the details.`
- Supporting text: `A cinematic study of the EOS R50.`
- Poster alt text: `Still from a Canon EOS R50 promotional video showing a close-up of the camera and lens mount`

No new product specifications, prices, testimonials, or quantitative marketing claims were added.

## Validation

- `npm run build` passes.
- Production preview passes at `http://127.0.0.1:4173/`.
- Development and production preview both show zero teaser MP4 requests before activation.
- After activation, the video reaches `readyState: 4`, loads from the normalized path, and starts unmuted.
- Mute/unmute, close button, Escape close, focus restoration, and reduced-motion playback were tested.
- Responsive checks were run at `375x812`, `390x844`, `768x1024`, `1280x800`, and `1440x900`.
- The teaser retained a `1.333` aspect ratio with no horizontal overflow at all tested widths.
- A fresh browser console capture showed no errors or warnings after the GSAP cleanup fix.

## Limitations

- Slow 4G throttling was not available through the current browser integration, so the loading state was tested through the normal delayed-loading path rather than a formal network profile.
- The live Vercel deployment was not modified or rechecked; verification was performed against local development and production preview.
- The poster frame is a good representative still, but final art-direction approval can choose a different timestamp without changing the component contract.

# Copy-Ready Prompt For Claude

You are a senior frontend engineer and motion/product designer working inside the existing React 18 + Vite project `canon-eos-r50-showcase`.

Implement and verify a premium Cinematic Teaser section for the supplied Canon EOS R50 advertisement clip.

## Assets

Use these exact paths:

- Video: `public/assets/video/canon-eos-r50-ad.mp4`
- Poster: `public/assets/video/canon-eos-r50-ad-poster.jpg`

Before editing, verify the video metadata. It is approximately 10 seconds, native `1112x834`, and contains audio. Treat it as a `4:3` watchable film, not a hero background or silent ambient loop.

## Placement and visual direction

Place the section after the feature-story content and before the lens ecosystem unless the existing narrative flow clearly supports a better adjacent position. Explain the placement in your final report.

Preserve the existing dark editorial Canon direction, restrained Canon red accent, Space Grotesk/Inter typography, supplied assets, Tailwind styling, GSAP motion, and Lucide icon patterns. Use the generic experiential copy `A short film`, `In the details.`, and `A cinematic study of the EOS R50.` unless the repository already has a stronger non-claim-based alternative.

## Functional requirements

- Show the poster in a stable native-ratio `4:3` frame.
- Use descriptive poster alt text.
- Center a clearly labelled play button: `Play Canon EOS R50 promotional video`.
- Do not render or request the MP4 on initial page load.
- Create the video only after the user activates play.
- Use `preload="none"` and do not eagerly preload the clip.
- Open a fullscreen/lightbox dialog after the explicit click.
- Play at native aspect ratio with intentional letterboxing and no stretching.
- Start with sound enabled by default.
- Provide a visible mute/unmute control.
- Provide a visible keyboard-reachable close control.
- Include a loading indicator, autoplay-blocked recovery action, error fallback using the poster, and retry action.
- Pause and reset the video on close and unmount.

## Accessibility requirements

Match the hardened lens modal pattern:

- `role="dialog"`
- `aria-modal="true"`
- Accessible heading and description
- Initial focus inside the modal
- Focus trap while open
- Escape closes the modal
- Optional backdrop click closes the modal
- Background scroll and interaction blocked while open
- Focus restored to the triggering play button on close
- Visible keyboard focus states
- `prefers-reduced-motion` removes entrance/parallax animation but never disables manual playback

## Verification requirements

Run:

```text
npm run build
npm run preview
```

Verify in both development and production preview:

- No MP4 request before play activation.
- MP4 request begins only after activation.
- Video loads and plays with sound enabled.
- Mute/unmute works.
- Close button, Escape, and backdrop close work.
- Focus returns to the play button.
- Playback stops and resets on close.
- Loading and retry states are visible and usable.
- No console errors or React effect-cleanup warnings.

Test at:

- `375x812`
- `390x844`
- `768x1024`
- `1280x800`
- `1440x900`

Also test with `prefers-reduced-motion` enabled. Use Slow 4G if available and report clearly if it is unavailable.

## Required final response

Return a concise report containing:

1. Section placement and reasoning.
2. Files added and changed.
3. Modal accessibility and focus behavior.
4. Lazy-loading implementation and network evidence.
5. Exact copy used and confirmation that no unverified claims were added.
6. Build, preview, browser, viewport, and reduced-motion results.
7. Any unavailable checks or remaining art-direction assumptions.

Do not claim the feature is bug-free unless the checks were actually run and passed.
