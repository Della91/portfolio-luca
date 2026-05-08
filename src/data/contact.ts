export interface ContactLink {
  label: string;
  value: string;
  url: string;
  icon: "linkedin" | "github" | "email" | "phone";
}

export const contactLinks: ContactLink[] = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/luca-della-vecchia",
    url: "https://linkedin.com/in/luca-della-vecchia",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    value: "github.com/lucadellavecchia",
    url: "https://github.com/lucadellavecchia",
    icon: "github",
  },
  {
    label: "Email",
    value: "luca.dellavecchia.ldv@gmail.com",
    url: "mailto:luca.dellavecchia.ldv@gmail.com",
    icon: "email",
  },
  {
    label: "Telefono",
    value: "388 386 3769",
    url: "tel:+393883863769",
    icon: "phone",
  },
];
