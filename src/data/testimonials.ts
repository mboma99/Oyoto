export interface Testimonial {
  /** The client's own words, as approved by them. */
  quote: string;
  name: string;
  /** e.g. "Pastor" or "Head of Data" */
  role: string;
  organisation: string;
  /** Case study the quote belongs to, if any. */
  projectSlug?: string;
}

/* Only real, approved quotes go here. The home page hides the section while
   this list is empty. Example shape:

   {
     quote: "…",
     name: "Jane Doe",
     role: "Founder",
     organisation: "Acme",
     projectSlug: "trakr",
   },
*/
export const testimonials: Testimonial[] = [];
