export interface ResearchPaper {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url: string;
  image?: string;
  description: string;
  category: "uses_nnsight" | "uses_ndif" | "referencing";
}

// Research papers are loaded from pipeline JSON at build time.
// The sync script (scripts/sync-research-papers.mjs) merges curated papers
// with the pipeline output and writes to public/data/research-papers.json.
import researchPapersRaw from "../public/data/research-papers.json";
export const researchPapers: ResearchPaper[] = researchPapersRaw as ResearchPaper[];

export const citation = {
  text: 'Jaden Fried Fiotto-Kaufman, Alexander Russell Loftus, Eric Todd, Jannik Brinkmann, Koyena Pal, Dmitrii Troitskii, Michael Ripa, Adam Belfki, Can Rager, Caden Juang, Aaron Mueller, Samuel Marks, Arnab Sen Sharma, Francesca Lucchetti, Nikhil Prakash, Carla E. Brodley, Arjun Guha, Jonathan Bell, Byron C Wallace, and David Bau. "NNsight and NDIF: Democratizing Access to Foundation Model Internals," ICLR 2025.',
  url: "https://openreview.net/forum?id=MxbEiFRf39",
  bibtex: `@inproceedings{fiotto-kaufman2025nnsight,
  title={{NNsight} and {NDIF}: Democratizing Access to Foundation Model Internals},
  author={Jaden Fried Fiotto-Kaufman and Alexander Russell Loftus and Eric Todd and Jannik Brinkmann and Koyena Pal and Dmitrii Troitskii and Michael Ripa and Adam Belfki and Can Rager and Caden Juang and Aaron Mueller and Samuel Marks and Arnab Sen Sharma and Francesca Lucchetti and Nikhil Prakash and Carla E. Brodley and Arjun Guha and Jonathan Bell and Byron C Wallace and David Bau},
  booktitle={The Thirteenth International Conference on Learning Representations},
  year={2025},
  url={https://openreview.net/forum?id=MxbEiFRf39}
}`,
};
