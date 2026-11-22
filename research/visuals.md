# PT-10 exercise visual research and prototype

_Date: 2026-11-22_

## Recommendation

### Primary: AI-assisted, pose-controlled raster keyframes

Use **OpenAI GPT Image 2 through OpenRouter's image API** to produce two approved keyframes per exercise (start/end), with a third frame only where the motion cannot be understood from two. Lock one character/style reference, feed a pose reference for every frame, and require human form review before shipping. OpenRouter supports image generation and image-to-image references, and its unified image API exposes aspect ratio, quality, format, and related controls.[2][3]

This is the best practical balance for PT-10:

- It produces the largest immediate visual upgrade without adding a runtime dependency.
- A single character reference plus image editing gave strong continuity in the push-up prototype.
- Approved frames can be shipped as small local WebP files, so the static GitHub Pages app remains offline-friendly.
- It scales to new exercises without finding a perfectly matching stock pack.
- Its main weakness—form drift—is manageable only if pose references and human QA are mandatory, not optional.

Do **not** ask the model to invent every pose from text alone. Use one of these as the pose source, in order of preference:

1. a simple Blender mannequin/camera render;
2. a traced coaching reference that PT-10 has permission to use;
3. the existing `figures.js` skeleton rendered as a pose guide.

The pose source controls anatomy; the image model supplies the polished military editorial treatment.

### Fallback: upgraded procedural SVG rig

If AI consistency or review effort becomes unacceptable, keep the current deterministic approach but replace line limbs with a reusable filled SVG character rig: torso, pelvis, upper/lower limbs, hands, shoes, head, and near/far-layer shading. Continue driving poses from keypoints in `figures.js`.

This fallback has the lowest licensing risk, smallest payload, perfect palette consistency, and easiest corrections. It will not reach the illustrative richness of the prototype without more design work, but it is safer than mixing stock assets and more maintainable than a 3D runtime.

## Prototype results

Three 1024×1024 PNG frames were generated with `openai/gpt-image-2` through OpenRouter, then resized locally to 512×512 WebP at quality 78. Total generation cost reported by the API was **$0.185491**, below the $3 cap.

| Frame | API cost | Raw PNG | 512 WebP | QA result |
|---|---:|---:|---:|---|
| `pushup-01-top` | $0.053795 | 951,278 B | 7,122 B | Good. Clear top position, straight body line, correct palette. Hands overlap slightly in the side view. |
| `pushup-02-bottom` | $0.061787 | 1,207,750 B | 6,878 B | Good. Strong identity/style continuity and a readable low position. Forearm/hand overlap still needs coach review. |
| `pushup-03-mid` | $0.069909 | 1,231,969 B | 6,948 B | **Reject/revise.** The model preserved identity but left the elbows too extended, so it reads too close to the top frame. This is useful evidence that reference images alone do not guarantee correct motion interpolation. |

### Sample files

Production-size samples:

- `research/visual-samples/pushup-01-top.webp`
- `research/visual-samples/pushup-02-bottom.webp`
- `research/visual-samples/pushup-03-mid.webp`

Source-size outputs:

- `research/visual-samples/pushup-01-top.png`
- `research/visual-samples/pushup-02-bottom.png`
- `research/visual-samples/pushup-03-mid.png`

At the measured WebP sizes, 50 frames (two for each of 25 exercises) would be roughly **350 KB** before HTTP compression and repository overhead. Seventy-five frames would be roughly **524 KB**. Actual totals will vary with backgrounds and detail, but these results are comfortably small for iPhone Safari and offline caching.

## Option comparison

Ratings are relative to PT-10, not general-purpose media production.

| Option | Visual quality | 25-move consistency | Form accuracy | License/commercial risk | Expected effort | Mobile payload/runtime |
|---|---|---|---|---|---|---|
| **AI keyframes with locked reference + pose guide** | High | Medium-high after review | Medium by default; high only with pose control and coach QA | Low-medium; retain prompts, sources, model, and review record | 2–4 person-days for first set | Excellent after WebP export; no runtime library |
| **Licensed stock/API library** | Medium-high per asset | Low-medium across a mixed catalog | Variable; often visually plausible but not coaching-grade | Medium-high because each catalog has different content and redistribution rules | 1–3 days to audit, then gaps remain | Good for raster/Lottie; API dependency is undesirable offline |
| **3D/Mixamo/Blender rendered to sprites** | High when art-directed | Very high | High if poses are manually reviewed | Low-medium; rendered outputs are safer than shipping source rigs | 1–3 weeks for rig, poses, materials, render/export automation | Good as rendered sprites/WebM; poor if shipping a 3D runtime |
| **Improved procedural SVG** | Medium-high with a designer | Very high | High because every joint is explicit and editable | Lowest | 3–6 person-days for rig + first 25 moves | Best: tiny, sharp, deterministic, no decoder/runtime concern |

## Detailed findings

### A. AI image generation

**OpenAI / OpenRouter.** OpenRouter documents both text-to-image and reference-image workflows; the unified image API also provides model discovery and generation controls.[2][3] OpenAI prices image generation by image tokens and publishes per-image examples by model/quality.[1] The PT-10 test used OpenRouter's reported per-request cost rather than an estimate.

**Google Imagen/Gemini.** Google's Imagen 4 launch lists Fast, Standard, and Ultra tiers, with published prices of $0.02, $0.04, and $0.06 per image respectively.[4] Google is a credible second model for comparison or rescue passes, but changing models mid-library can produce a visible style break. Use it to regenerate the whole character set or as a review comparison, not casually per exercise.

**Quality and consistency.** The push-up top and bottom frames show that a reference-image edit can preserve face, outfit, palette, camera, and rendering style well. The midpoint miss shows that character consistency and anatomical/motion correctness are separate problems. A generation should fail QA if joint angles, hand count, foot placement, spinal alignment, or exercise-specific cues are wrong.

**Rights/process risk.** Store a generation manifest containing model, prompt, reference asset provenance, generation date, cost, reviewer, and approval state. Avoid named artists, real people, military insignia, trademarks, or copyrighted character references. AI outputs should be treated as production assets that still need originality and rights review, not as automatically risk-free art.

**Estimated production cost.** At the prototype's $0.054–$0.070 per accepted attempt:

- 50 accepted frames: about **$2.70–$3.50** if every first attempt passes;
- realistic 2× attempt rate: about **$5.40–$7.00**;
- 75 accepted frames at 2× attempts: about **$8.10–$10.50**.

The cash cost is minor compared with pose preparation and review time.

### B. Stock exercise illustrations, animation packs, and APIs

**wger.** wger is open-source fitness software under AGPL-3.0-or-later, and its API exposes exercise-image records.[5][6] The important distinction is that the software license does not automatically make every contributed image unrestricted: image records include author/license metadata, so PT-10 would need a per-asset license audit. Expect heterogeneous art styles and incomplete coverage of specialized moves.

**ExerciseDB.** The public API wrapper repository is MIT-licensed, but the ExerciseDB service/content is governed by separate EDB terms.[7][8] Those terms restrict redistribution and dataset extraction. Do not copy its GIF/image library into a public GitHub Pages repository without a commercial license that explicitly permits public-app asset redistribution.

**LottieFiles.** Public free animations use the Lottie Simple License, which permits commercial use and use in apps/end products, while prohibiting selling or distributing the animation as a standalone file.[9] PT-10's public repository makes raw JSON directly retrievable, so custom-created Lottie files or written confirmation would be safer than downloading arbitrary community files. Catalog-wide character/style consistency is also unlikely across 25 exact movements.

**Freepik / Envato.** Both are end-product licensing systems rather than open asset libraries. Their terms generally prohibit reselling or redistributing source assets, and plan/project registration or attribution rules can apply.[10][11] Because every PT-10 asset is visible in a public repository, any pack must be licensed for that exact distribution model. A single coherent commissioned pack could work; mixing marketplace packs will look inconsistent and create a license ledger burden.

**Conclusion on stock.** Stock is useful for pose research and perhaps one-off static stretches, but it is a poor primary library for PT-10. Coverage, identity, camera angle, palette, and redistribution rights are all likely to vary.

### C. 3D / mocap pipeline

**Mixamo.** Adobe states that Mixamo characters and animations are royalty-free for personal and commercial creative projects, but source character/animation files should not be redistributed as standalone assets.[12] Rendering the motion into PT-10-owned sprite frames is therefore more practical than shipping FBX files or a 3D viewer.

**Blender.** Blender is GPL-licensed, but the artwork and rendered output created with it belong to the creator and may be used commercially.[13]

A strong 3D pipeline would be:

1. choose or commission one generic athletic character;
2. rig it once;
3. use Mixamo only where a matching motion exists;
4. hand-keyframe calisthenics that Mixamo does not cover accurately;
5. lock an orthographic side/front camera and PT-10 materials;
6. render two or three transparent or dark-background frames per move;
7. export 512 WebP assets and never load a 3D engine in the app.

This offers the strongest identity and camera consistency, and poses can be inspected from multiple angles. Its cost is setup and skilled animation time. Floor exercises, stretches, wall sit, dead bug, bird dog, and transitions such as the 8-count body builder will still require manual keyframing.

### D. Improved procedural vector

SVG is a browser-native vector format with reusable geometry, grouping, transforms, and animation support.[14] PT-10's existing `figures.js` is only about 7.6 KB and already contains the pose logic for roughly 20 movements.

The next-quality version should keep the keypoint model but replace each line with layered body parts:

- torso and pelvis shapes aligned to shoulder/hip vectors;
- tapered upper/lower limbs with near/far colors;
- simple hands and shoes;
- head/neck with a fixed side/front design;
- joint overlap masks so elbows and knees do not look disconnected;
- pose-specific depth ordering;
- optional 2–3 facial/hair silhouettes, but one default character for the exercise demo;
- interpolation constraints that preserve limb lengths.

This route is deterministic and correctable at the coordinate level. It also avoids the AI midpoint failure. The tradeoff is that it needs an illustrator/technical animator to make the rig look premium.

## Proposed production pipeline

1. **Create a form specification.** For every exercise, write the camera angle, start/end joint positions, safety cues, and disqualifying errors. Have a qualified trainer review it.
2. **Lock the visual bible.** One adult generic character, outfit, hair, palette, line/shading rules, 1:1 canvas, margins, ground treatment, and no insignia/weapons/text.
3. **Make pose guides.** Render the existing skeleton or a Blender mannequin for each approved keyframe. Use front view only when side view hides the defining movement.
4. **Generate one master character sheet.** Front, side, and three-quarter views plus color swatches. Approve this before generating the exercise library.
5. **Generate keyframes by editing, not fresh prompting.** Feed the master character and pose guide. Generate start/end; add a middle only when needed.
6. **Run two QA gates.** (a) anatomical/form review; (b) identity/style/palette review. Reject duplicate/fused limbs, hand/foot errors, camera drift, or incorrect joint angles.
7. **Post-process locally.** Crop consistently, resize to 512×512, encode WebP around quality 75–82, strip metadata, and preserve a PNG master outside the runtime bundle.
8. **Name and manifest assets.** Example: `pushup.top.webp`, `pushup.bottom.webp`; record hashes, prompts, model, cost, references, and reviewer.
9. **Integrate without a new runtime.** Preload the current exercise plus the next one; cross-fade or alternate frames with CSS. Keep the existing SVG as a fallback until every image passes QA.
10. **Pilot five difficult moves first.** Push-up, squat, burpee/8-count, flutter kick, and bird dog. If those stay consistent, scale to the remaining catalog.

## Acceptance criteria

A frame is shippable only when all are true:

- exact exercise phase is recognizable at 200×200;
- body alignment and joint angles match the form specification;
- exactly two arms/hands and two legs/feet are present and plausible;
- identity, outfit, palette, camera, scale, and ground line match the approved set;
- no text, logos, insignia, weapons, or background clutter;
- 512×512 WebP is preferably under 30 KB and does not show objectionable artifacts;
- source provenance and license/AI manifest are recorded;
- a human reviewer approved the frame.

## Decision

Proceed with a **five-exercise AI + pose-guide pilot**, using the demonstrated reference-edit workflow and strict QA. Keep **filled procedural SVG** as the fallback and as the pose-guide generator. Do not license a broad stock/API library yet, and do not build a shipped 3D runtime. If the pilot's rejection rate exceeds roughly 50% or character drift remains visible after two attempts per frame, stop spending generation time and invest in the SVG rig or a Blender-to-sprite pipeline instead.

## Sources

[1] https://platform.openai.com/docs/pricing
[2] https://openrouter.ai/docs/guides/overview/multimodal/image-generation
[3] https://openrouter.ai/blog/announcements/image-api
[4] https://developers.googleblog.com/en/imagen-4-now-available-in-the-gemini-api-and-google-ai-studio
[5] https://wger.de/api/v2/exerciseimage
[6] https://github.com/wger-project/wger
[7] https://exercisedb.io/terms
[8] https://github.com/ExerciseDB/exercisedb-api/blob/main/LICENSE
[9] https://lottiefiles.com/page/license
[10] https://www.freepik.com/legal/terms-of-use
[11] https://help.elements.envato.com/hc/en-us/articles/360000628966-Envato-Elements-License
[12] https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html
[13] https://blender.org/about/license
[14] https://www.w3.org/TR/SVG2
