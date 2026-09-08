/**
 * Research highlights — long-form pages on high-citation work built with NNsight.
 *
 * All page copy lives here so it can be edited without touching layout; the
 * renderer is components/research/HighlightArticle.tsx. Sections are numbered
 * by position, so reordering the array reorders the page numbering.
 *
 * Figures live in public/highlights/ rather than public/images/, because the
 * latter is republished wholesale by the ndif-citations pipeline and would
 * clobber these hand-picked crops. Every figure is reproduced from a CC BY 4.0
 * preprint and credited in its caption:
 *
 *   interplm-sae-overview.png            Figure 1, arXiv:2412.12101
 *   interplm-feature-analysis.png        Figure 2, arXiv:2412.12101
 *   geometry-of-refusal-concept-cone.png Figure 1, arXiv:2502.17420,
 *                                        cropped from page 1 of the PDF
 */

export type HighlightBlock =
  /** Body paragraph. */
  | { kind: "para"; text: string }
  /** Result with a bolded lead-in, used for the "What they found" lists. */
  | { kind: "finding"; lead: string; text: string };

/**
 * A figure reproduced from a paper. Every source here is a CC BY 4.0 preprint,
 * so `credit` is a licence requirement, not decoration — see
 * public/highlights/README.md for the provenance of each file.
 */
export interface HighlightFigure {
  /** Path under public/, passed through getAssetPath(). */
  src: string;
  alt: string;
  caption: string;
  credit: string;
  /** Links the "CC BY 4.0" tail of the credit line. */
  licenseHref: string;
  width: number;
  height: number;
  /** Line art on a white ground: keep a light backdrop in both themes, never crop. */
  lightGround?: boolean;
}

export interface HighlightSection {
  heading: string;
  /** Opening statement, set larger than the body copy. */
  lede?: string;
  blocks: HighlightBlock[];
  /** Rendered after the section's prose. */
  figure?: HighlightFigure;
}

export interface HighlightLink {
  label: string;
  href: string;
}

export interface ResearchHighlight {
  slug: string;
  /** Second half of the "Built with NNsight · <topic>" eyebrow. */
  topic: string;
  /** Split so the accent half can carry the brand gradient. */
  headline: { lead: string; accent: string };
  subhead: string;
  authors: string;
  venue: string;
  /** One-liner for the highlights index and page metadata. */
  blurb: string;
  /** Lead figure, shown under the byline and as the index-card thumbnail. */
  figure?: HighlightFigure;
  sections: HighlightSection[];
  links: HighlightLink[];
}

const interplm: ResearchHighlight = {
  slug: "interplm",
  topic: "Protein Biology",
  headline: {
    lead: "A protein language model learned",
    accent: "biology nobody taught it",
  },
  subhead:
    "Sparse autoencoders reveal thousands of interpretable biological concepts inside ESM-2 — binding sites, structural motifs, functional domains. NNsight made it possible to test whether the model actually uses them.",
  authors: "Elana Simon and James Zou, Stanford University",
  venue: "Nature Methods 22, 2107–2117 (2025)",
  blurb:
    "Sparse autoencoders surface up to 2,548 interpretable features per layer inside ESM-2, and steering experiments show the model propagates them.",
  figure: {
    src: "/highlights/interplm-sae-overview.png",
    alt: "Three-panel diagram: a sparse autoencoder encoding and decoding ESM-2 embeddings, then example features whose activations track structural and sequential patterns and known biological concepts.",
    caption:
      "A sparse autoencoder encodes ESM-2's per-residue embeddings into features and decodes them back (a). Individual features then turn out to track structural and sequential patterns (b) and known biological concepts such as binding domains and disulfide bonds (c).",
    credit: "Figure 1, Simon & Zou, arXiv:2412.12101",
    licenseHref: "https://creativecommons.org/licenses/by/4.0/",
    width: 996,
    height: 716,
    lightGround: true,
  },
  sections: [
    {
      heading: "The problem",
      lede: "Protein language models predict structure and function remarkably well. How they do it has stayed largely opaque.",
      blocks: [
        {
          kind: "para",
          text: "The obvious place to look is individual neurons, and that turns out to be a dead end. Examining single neurons in ESM-2 surfaces only a few dozen per layer with any clear conceptual alignment, across roughly fifteen recognizable concepts. The model plainly knows more than that. It just isn't storing what it knows one concept per neuron.",
        },
      ],
    },
    {
      heading: "What they did",
      blocks: [
        {
          kind: "para",
          text: "Simon and Zou trained sparse autoencoders on ESM-2's internal embeddings, separating overlapping signals into individual features that can be examined one at a time. They then matched those features against known protein annotations from Swiss-Prot to see which corresponded to established biology.",
        },
        {
          kind: "para",
          text: "Thousands of features is far more than anyone can inspect by hand, so they built an automated interpretation pipeline: a language model proposes a description of what each feature responds to, and a separate validation step checks whether the description holds up against the feature's actual activation pattern.",
        },
      ],
      figure: {
        src: "/highlights/interplm-feature-analysis.png",
        alt: "Charts of feature activation frequency, structural versus sequential activation, a UMAP of feature values and a table of Swiss-Prot concept labels, above rows of protein structures with highlighted activation sites.",
        caption:
          "Quantitative views used to find features worth a closer look — activation frequency, structural versus sequential activation, a UMAP of feature values, and matches against Swiss-Prot labels (a) — alongside the same features rendered onto protein structures (b).",
        credit: "Figure 2, Simon & Zou, arXiv:2412.12101",
        licenseHref: "https://creativecommons.org/licenses/by/4.0/",
        width: 1914,
        height: 1022,
        lightGround: true,
      },
    },
    {
      heading: "What they found",
      blocks: [
        {
          kind: "finding",
          lead: "Up to 2,548 interpretable features per layer, corresponding to as many as 143 distinct biological concepts.",
          text: "Compare that to the few dozen legible neurons in the same layers. Same model, same weights — the difference is entirely in how you look.",
        },
        {
          kind: "finding",
          lead: "Superposition, confirmed across scales.",
          text: "The pattern holds as models get bigger, and larger models capture more interpretable concepts rather than fewer. Whatever ESM-2 is doing, packing many concepts into shared dimensions is a persistent feature of it, not an artifact of one model size.",
        },
        {
          kind: "finding",
          lead: "Concepts with no name yet.",
          text: "Some features track coherent patterns spanning evolutionarily distinct protein families — real structure in the model's representations that existing annotation databases don't capture. In practice this runs in both directions: the same features can flag annotations missing from current databases.",
        },
      ],
    },
    {
      heading: "Built with NNsight",
      blocks: [
        {
          kind: "para",
          text: "Finding a feature that correlates with a biological concept shows the model has a representation. It doesn't show the model uses it. Establishing that requires intervening — changing the feature mid-computation and watching what the model does differently.",
        },
        {
          kind: "para",
          text: "That intervention is more delicate than it sounds. Sparse autoencoders reconstruct activations imperfectly, so simply swapping in a modified reconstruction degrades the model with the autoencoder's own error. The authors avoided this by splitting each embedding into the part the autoencoder reconstructs and the leftover residual, editing only the reconstruction — clamping chosen features to target values — then adding the residual back before letting the forward pass continue. The model's own imperfectly-captured signal survives untouched; only the feature under test changes.",
        },
        {
          kind: "para",
          text: "The paper states it directly: the steering experiments were all conducted using NNsight. NNsight's intervention API is what makes this read-modify-write pattern tractable — pull activations at a chosen layer, compute on them outside the model, write the modified values back, and let normal processing resume, without reimplementing ESM-2's forward pass to insert an edit.",
        },
        {
          kind: "para",
          text: "The results are the paper's clearest causal evidence. In one experiment, steering a periodic glycine feature at a single amino acid position changed the model's predictions for neighbouring positions in a coherent, interpretable way. The model wasn't just storing the concept. It was propagating it.",
        },
      ],
    },
    {
      heading: "Why it matters",
      blocks: [
        {
          kind: "para",
          text: "This is one of the clearest bridges between mechanistic interpretability and a science domain outside natural language. The methods came from work on language models; the substrate is protein sequence; the toolkit transferred largely intact.",
        },
        {
          kind: "para",
          text: "For computational biologists, it's a demonstration that a protein model's representations can be decomposed into components you can name, check against the literature, and manipulate. For interpretability researchers, it's evidence that superposition and sparse decomposition aren't quirks of text models.",
        },
      ],
    },
  ],
  links: [
    // The authors' feature-browser dashboard at https://interplm.ai is omitted
    // while its TLS certificate is expired — restore it once the site loads.
    { label: "Code", href: "https://github.com/ElanaPearl/InterPLM" },
    { label: "Pretrained SAE weights (ESM-2 8M)", href: "https://huggingface.co/Elana/InterPLM-esm2-8m" },
    { label: "Pretrained SAE weights (ESM-2 650M)", href: "https://huggingface.co/Elana/InterPLM-esm2-650m" },
    { label: "Paper — Nature Methods", href: "https://doi.org/10.1038/s41592-025-02836-7" },
    { label: "Preprint — arXiv:2412.12101", href: "https://arxiv.org/abs/2412.12101" },
    {
      label: 'Commentary — "What does a language model know about proteins?", Nature Methods News & Views',
      href: "https://www.nature.com/articles/s41592-025-02837-6",
    },
  ],
};

const geometryOfRefusal: ResearchHighlight = {
  slug: "geometry-of-refusal",
  topic: "AI Safety",
  headline: {
    lead: "Refusal isn't one direction.",
    accent: "It's a cone.",
  },
  subhead:
    "The prevailing account held that a single direction in activation space decides whether a language model refuses a request. Gradient-based analysis finds multiple independent directions — and shows that a standard test for independence doesn't actually establish it.",
  authors:
    "Tom Wollschläger, Jannes Elstner, Simon Geisler, Vincent Cohen-Addad, Stephan Günnemann, Johannes Gasteiger",
  venue: "ICML 2025 · PMLR vol. 267, 66945–66970",
  blurb:
    "Refusal in an aligned language model is mediated by multi-dimensional concept cones, not a single direction — so ablating one direction removes one route to refusal, not the mechanism.",
  figure: {
    src: "/highlights/geometry-of-refusal-concept-cone.png",
    alt: "A red three-dimensional cone in activation space, spanned by three blue basis vectors drawn from the origin.",
    caption:
      "A 3D concept cone and its basis vectors. Every direction inside the cone mediates refusal, so the mechanism is a region of activation space rather than a single axis.",
    credit: "Figure 1, Wollschläger et al., arXiv:2502.17420",
    licenseHref: "https://creativecommons.org/licenses/by/4.0/",
    width: 976,
    height: 992,
    lightGround: true,
  },
  sections: [
    {
      heading: "The problem",
      lede: "Safety alignment can be circumvented by adversarially crafted inputs, and the mechanisms behind those bypasses are poorly understood.",
      blocks: [
        {
          kind: "para",
          text: "One influential line of work suggested the picture might be simple: a single refusal direction in the model's activation space, determining whether a request gets refused. If that were right, safety would be a one-dimensional object. Find the direction, defend it, done.",
        },
      ],
    },
    {
      heading: "What they did",
      blocks: [
        {
          kind: "para",
          text: "Earlier work located refusal directions by difference-in-means — averaging activations on harmful prompts, averaging on harmless ones, and taking the gap.",
        },
        {
          kind: "para",
          text: "This paper takes a gradient-based approach to representation engineering instead, optimizing directly for directions that control refusal behaviour rather than reading them off a statistical contrast. The method finds directions the difference-in-means approach misses, which is what makes the central result possible.",
        },
      ],
    },
    {
      heading: "What they found",
      blocks: [
        {
          kind: "finding",
          lead: "Multiple independent refusal directions, and multi-dimensional concept cones.",
          text: "Not one direction but a structured region of activation space, with several distinct mechanisms driving refusal behaviour.",
        },
        {
          kind: "finding",
          lead: "Orthogonality does not imply independence.",
          text: "Two directions can be mathematically orthogonal and still interfere with each other when you actually intervene on the model. The paper introduces representational independence as the stricter criterion: two directions count as independent only if ablating one leaves the other's representation intact — accounting for non-linear interactions, not just geometric ones.",
        },
        {
          kind: "finding",
          lead: "Mechanistically independent directions exist.",
          text: "Applying that stricter test, the authors identify directions that are genuinely functionally separate, confirming that refusal is governed by more than one mechanism.",
        },
      ],
    },
    {
      heading: "Built with NNsight",
      blocks: [
        {
          kind: "para",
          text: "Gradient-based direction-finding is a harder engineering problem than activation extraction. It isn't enough to read values out of a forward pass — derivatives have to flow through an intervention, repeatedly, across many candidate directions. Most ad-hoc hooking code isn't built for that.",
        },
        {
          kind: "para",
          text: "The paper's implementation notes are unambiguous on where that machinery came from: all of its algorithms and exploratory experiments are implemented using NNsight.",
        },
        {
          kind: "para",
          text: "There's a second demand. The argument rests on the finding holding across model families; a refusal geometry that only appeared in one architecture wouldn't support the claim. The authors train refusal directions on models from the Gemma 2, Qwen 2.5, and Llama 3 families, and sweep size within Qwen 2.5 — from 1.5B to 14B parameters — to test whether larger models support higher-dimensional cones. NNsight expresses interventions against any PyTorch model through one API, so replicating an experiment on a different model doesn't mean rewriting the intervention code for a new forward pass.",
        },
      ],
    },
    {
      heading: "Why it matters",
      blocks: [
        {
          kind: "para",
          text: "The practical consequence is uncomfortable and useful in equal measure. Ablating a single refusal direction doesn't remove refusal — it removes one route to it. Any safety intervention that assumes it has found the mechanism is likely defending a narrower target than it thinks.",
        },
        {
          kind: "para",
          text: "The methodology generalizes past refusal. Any behaviour suspected of having a linear representation can now be tested the same way, and the authors position the gradient-based approach as groundwork for further study of model internals.",
        },
      ],
    },
  ],
  links: [
    { label: "Paper — PMLR", href: "https://proceedings.mlr.press/v267/wollschlager25a.html" },
    { label: "Preprint — arXiv:2502.17420", href: "https://arxiv.org/abs/2502.17420" },
    { label: "Project page", href: "https://www.cs.cit.tum.de/daml/geometry-of-refusal/" },
    { label: "Code", href: "https://github.com/wollschlager/geometry-of-refusal" },
    { label: "ICML 2025 poster", href: "https://icml.cc/virtual/2025/poster/46298" },
  ],
};

export const researchHighlights: ResearchHighlight[] = [interplm, geometryOfRefusal];

export function getHighlight(slug: string): ResearchHighlight | undefined {
  return researchHighlights.find((h) => h.slug === slug);
}
