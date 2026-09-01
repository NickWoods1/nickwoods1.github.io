export type Book = {
  id: number;
  title: string;
  author: string;
  rating: number | null;
};

const rawBooks = `
Forbidden Colours — Yukio Mishima
Auto-da-Fé — Elias Canetti
The Little Prince — Antoine de Saint-Exupéry
Monsieur Vénus — Rachilde
Twilight of the Idols and The Anti-Christ — Friedrich Nietzsche
Women — Charles Bukowski
Simulacra and Simulation — Jean Baudrillard
Eroticism — Georges Bataille
Cocaine Nights — J. G. Ballard
Maldoror and Poems — Comte de Lautréamont
Literature and Evil — Georges Bataille
Manifestoes of Surrealism — André Breton
Prometheus Rising — Robert Anton Wilson
Les Liaisons dangereuses — Pierre Choderlos de Laclos
The Hite Report on Male Sexuality — Shere Hite
The Castle — Franz Kafka
Operating Systems: Three Easy Pieces — Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau
The Story of Civilization: The Life of Greece — Will Durant
The Story of Civilization: The Life of Greece — Will Durant
The Story of Civilization: The Renaissance — Will Durant
The Manipulated Man — Esther Vilar
What Is to Be Done? — Vladimir Lenin
V for Vendetta — Alan Moore & David Lloyd
Frege — Dale Jacquette
Mathematics of the 19th Century: Geometry, Analytic Function Theory — A. N. Kolmogorov & A. P. Yushkevich
John E. Freund’s Mathematical Statistics with Applications — Irwin Miller & Marylees Miller
A Treatise on Probability — John Maynard Keynes
The (Mis)Behaviour of Markets — Benoit B. Mandelbrot & Richard L. Hudson
The Art of Statistics — David Spiegelhalter
Randomness — Deborah J. Bennett
Statistical Consequences of Fat Tails — Nassim Nicholas Taleb
Confessions of a European in England — J. H. Huizinga
Logical Foundations of Probability — Rudolf Carnap
Numerical Methods of Statistics — John F. Monahan
Statistical Models: Theory and Practice — David A. Freedman
Topology: An Introduction with Application to Topological Groups — George McCarty
Mother Earth — Isaac Asimov
The Place of Dead Roads — William S. Burroughs
Interpreting Gödel — Juliette Kennedy
Singularity Theory and an Introduction to Catastrophe Theory — Y.-C. Lu
Measure, Integration & Real Analysis — Sheldon Axler
Banach Spaces of Analytic Functions — Kenneth Hoffman
The Mathematical Theory of Communication — Claude E. Shannon & Warren Weaver
Fooled by Randomness — Nassim Nicholas Taleb
The Black Swan — Nassim Nicholas Taleb
Antifragile — Nassim Nicholas Taleb
Skin in the Game — Nassim Nicholas Taleb
The Bed of Procrustes — Nassim Nicholas Taleb
Causal Inference in Statistics: A Primer — Judea Pearl, Madelyn Glymour & Nicholas P. Jewell
One Thousand Exercises in Probability — Geoffrey Grimmett & David Stirzaker
An Introduction to Probability Theory and Its Applications, Volume I — William Feller
The C++ Programming Language — Bjarne Stroustrup
A Philosophical Essay on Probabilities — Pierre-Simon Laplace
Introduction to Mathematical Statistics — Robert V. Hogg, Joseph W. McKean & Allen T. Craig
The Ghost in the Machine — Arthur Koestler
Classic Locked-Room Mysteries — edited by David Stuart Davies
The Strange Case of Dr Jekyll and Mr Hyde — Robert Louis Stevenson
The Masks of God, Volume 3: Occidental Mythology — Joseph Campbell
The Masks of God, Volume 2: Oriental Mythology — Joseph Campbell
Stories and Poems for Extremely Intelligent Children of All Ages — Harold Bloom
The Stanley Kubrick Archives — edited by Alison Castle
Tokyo Lucky Hole — Nobuyoshi Araki
The Illuminatus! Trilogy — Robert Shea & Robert Anton Wilson
The Lotus Sutra — translated by Gene Reeves
The Golden Calf — Ilya Ilf & Evgeny Petrov
Story of O — Pauline Réage
Moby-Dick — Herman Melville
Kafka volume, title unclear — Franz Kafka
We — Yevgeny Zamyatin
Jujutsu Kaisen, Vol. 18 — Gege Akutami
Stories of Your Life and Others — Ted Chiang
Fictions — Jorge Luis Borges
Justine, Philosophy in the Bedroom, and Other Writings — Marquis de Sade
God Emperor of Dune — Frank Herbert
Dune — Frank Herbert
Children of Dune — Frank Herbert
Chapterhouse: Dune — Frank Herbert
Dune Messiah — Frank Herbert
Heretics of Dune — Frank Herbert
Hitchcock/Truffaut — François Truffaut
The General Theory of Employment, Interest and Money — John Maynard Keynes
The World Treasury of Physics, Astronomy, and Mathematics — edited by Timothy Ferris
The Analects — Confucius
Food of the Gods — Terence McKenna
Fantasia Mathematica — edited by Clifton Fadiman
In Search of Lost Time: The Way by Swann’s — Marcel Proust
The Picture of Dorian Gray — Oscar Wilde
Jujutsu Kaisen, Vol. 19 — Gege Akutami
Jujutsu Kaisen, Vol. 20 — Gege Akutami
Jujutsu Kaisen, Vol. 17 — Gege Akutami
The Second Sex — Simone de Beauvoir
Man’s Search for Meaning — Viktor E. Frankl
Candide, or Optimism — Voltaire
To Kill a Mockingbird — Harper Lee
The Lion and the Unicorn — George Orwell
Meditations — Marcus Aurelius
`.trim();

export const books: Book[] = rawBooks.split("\n").map((entry, index) => {
  const separator = entry.lastIndexOf(" — ");
  return {
    id: index + 1,
    title: entry.slice(0, separator),
    author: entry.slice(separator + 3),
    rating: null,
  };
});
