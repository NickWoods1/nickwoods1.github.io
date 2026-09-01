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
Dalí Tarot — Salvador Dalí
JoJo 6251: Hirohiko Araki’s World — Hirohiko Araki
An Enquiry Concerning the Principles of Morals — David Hume
Meditations and Other Metaphysical Writings — René Descartes
Pensées — Blaise Pascal
Thinking, Fast and Slow — Daniel Kahneman
The Gulag Archipelago — Aleksandr Solzhenitsyn
The Hero’s Journey — Joseph Campbell
The Agony of Power — Jean Baudrillard
Making Movies — Sidney Lumet
The Greatest Short Stories of Anton Chekhov — Anton Chekhov
The Essential Chomsky — Noam Chomsky
Outlines of Pyrrhonism — Sextus Empiricus
The Journey to the West, Volume 1 — Wu Cheng’en
Language, Truth and Logic — A. J. Ayer
Logical Positivism — A. J. Ayer
Frankenstein — Mary Shelley
The Murder of Professor Schlick — David Edmonds
Proofs and Refutations — Imre Lakatos
StarCraft: Shadow of the Xel’Naga — Gabriel Mesta
Essays — Francis Bacon
The Great Shark Hunt — Hunter S. Thompson
The Tibetan Book of the Dead — Anonymous / traditional Tibetan Buddhist text
The Bible with Apocrypha (NRSV Anglicized Edition) — Various authors
The Satanic Verses — Salman Rushdie
Zen and the Art of Motorcycle Maintenance — Robert M. Pirsig
Physics, Books I and II — Aristotle
The Last Days of Socrates — Plato
Dracula — Bram Stoker
Blood Meridian — Cormac McCarthy
I, Robot — Isaac Asimov
The 120 Days of Sodom — Marquis de Sade
Justine — Marquis de Sade
Sex, Drugs & Magick — Robert Anton Wilson
The Monk — Matthew Lewis
Hyperion — Dan Simmons
Parzival — Wolfram von Eschenbach
Slaughterhouse-Five — Kurt Vonnegut
Confessions — Saint Augustine
The Power and the Glory — Graham Greene
Solaris — Stanisław Lem
The Beginning of Infinity: Explanations That Transform the World — David Deutsch
Do Androids Dream of Electric Sheep? — Philip K. Dick
Tetralogue — Timothy Williamson
The Central Questions of Philosophy — A. J. Ayer
Steppenwolf — Hermann Hesse
Notre-Dame de Paris — Victor Hugo
A Line in the Sand — James Barr
The Aleph — Jorge Luis Borges
Timaeus and Critias — Plato
Paradoxes — R. M. Sainsbury
What Is ChatGPT Doing … and Why Does It Work? — Stephen Wolfram
Relativity: A Very Short Introduction — Russell Stannard
Particle Physics: A Very Short Introduction — Frank Close
Schott’s Original Miscellany — Ben Schott
Real Science: What It Is and What It Means — John Ziman
Grimoires: A History of Magic Books — Owen Davies
All You Need Is Kill — Hiroshi Sakurazaka
The Physics of Stars — A. C. Phillips
Linear Algebra Done Right — Sheldon Axler
Gödel’s Proof — Ernest Nagel and James R. Newman
The Last Writings of Thomas S. Kuhn — Thomas S. Kuhn
The Structure of Scientific Revolutions — Thomas S. Kuhn
How to Read and Why — Harold Bloom
Quantum Physics — Alastair I. M. Rae
The Time Machine — H. G. Wells
Lectures on Quantum Mechanics — P. A. M. Dirac
Quantum Theory: A Very Short Introduction — John Polkinghorne
Schrödinger’s Cat — Adam Hart-Davis
Fibonacci’s Rabbits — Adam Hart-Davis
Lectures on Groups and Vector Spaces — Chris J. Isham
Quack This Way — David Foster Wallace and Bryan A. Garner
Sex and Character — Otto Weininger
The Hitchhiker’s Guide to the Galaxy — Douglas Adams
The Psychopath Test — Jon Ronson
A Treatise of Human Nature — David Hume
Essays and Aphorisms — Arthur Schopenhauer
The Myth of Sisyphus — Albert Camus
Fear and Loathing in Las Vegas — Hunter S. Thompson
What Is Life? — Erwin Schrödinger
An Enquiry Concerning Human Understanding — David Hume
Reality+ — David J. Chalmers
Ethics — Baruch Spinoza
A Spinoza Reader — Baruch Spinoza
Life 3.0 — Max Tegmark
The Big Picture — Sean Carroll
Ethics: Inventing Right and Wrong — J. L. Mackie
The Princeton Companion to Applied Mathematics — edited by Nicholas J. Higham
The Princeton Companion to Mathematics — edited by Timothy Gowers
University Physics — Hugh D. Young and Roger A. Freedman
Quantum Field Theory for the Gifted Amateur — Tom Lancaster and Stephen J. Blundell
A Collection of Problems on Mathematical Physics — B. M. Budak, A. A. Samarskii and A. N. Tikhonov
Mathematical Tripos Part III 2013 Examination Papers — University of Cambridge
Engineering Mathematics — K. A. Stroud
The Feynman Lectures on Physics, Volume II — Richard P. Feynman, Robert B. Leighton and Matthew Sands
Vogue: The Big Fashion Issue — Michaela Coel
Vogue France — Addison Rae
Vogue: Make ’Em Look Twice issue — Vogue
Vogue Italia: Love, The Most … issue — Vogue Italia
Vogue Italia: Rianne Van Rompaey cover issue — Vogue Italia
The Basic Writings of Bertrand Russell — Bertrand Russell
Lolita — Vladimir Nabokov
The Book of Why — Judea Pearl & Dana Mackenzie
The World as Will and Representation — Arthur Schopenhauer
The World as Will and Representation, Volume I — Arthur Schopenhauer
The Birth of Tragedy — Friedrich Nietzsche
Beyond Good and Evil — Friedrich Nietzsche
Thus Spoke Zarathustra — Friedrich Nietzsche
The Divine Comedy: Inferno, Purgatorio, Paradiso — Dante Alighieri
Glamorama — Bret Easton Ellis
Crime and Punishment — Fyodor Dostoevsky
Surely You're Joking, Mr. Feynman! — Richard P. Feynman
Faust — Johann Wolfgang von Goethe
Legends of Arthur — Richard Barber
The Brothers Karamazov — Fyodor Dostoevsky
The Catcher in the Rye — J. D. Salinger
White Nights — Fyodor Dostoevsky
The Greek Myths — Robert Graves
Beyond Evil — Nathan Yates
The Hunt for the 60s Ripper — Robin Jarossi
Mythos — Stephen Fry
Bullshit Jobs — David Graeber
The Selfish Gene — Richard Dawkins
How Much Land Does a Man Need? — Leo Tolstoy
The Gothic Tales of H. P. Lovecraft — H. P. Lovecraft
The Logic of Scientific Discovery — Karl R. Popper
The Poverty of Historicism — Karl R. Popper
God Is Not Great — Christopher Hitchens
Nietzsche — Anthony M. Ludovici
Daybreak — Friedrich Nietzsche
Hell's Angels — Hunter S. Thompson
The Life and Opinions of Tristram Shandy — Laurence Sterne
The Sacrifice — Charlie Higson
The Dawn of Everything — David Graeber & David Wengrow
Tetralogue — Timothy Williamson
Human, All Too Human — Friedrich Nietzsche
On the Genealogy of Morals — Friedrich Nietzsche
Ecce Homo — Friedrich Nietzsche
Only Dull People Are Brilliant at Breakfast — Oscar Wilde
The Original Folk and Fairy Tales of the Brothers Grimm — Jacob Grimm & Wilhelm Grimm, translated by Jack Zipes
The Glass Bead Game — Hermann Hesse
Surreal Numbers — Donald E. Knuth
The Mathematical Experience — Philip J. Davis & Reuben Hersh
The Book of Numbers — John H. Conway & Richard K. Guy
The Foundations of Mathematics and Other Logical Essays — Frank P. Ramsey
The Complete Essays — Michel de Montaigne
The Alchemist — Paulo Coelho
A Short History of Decay — E. M. Cioran
Amygdalatropolis — B. R. Yeager
The Love Poems — Ovid
The Erotic Poems — Ovid
Astronomica — Manilius
One, No One and One Hundred Thousand — Luigi Pirandello
Conjectures and Refutations — Karl R. Popper
Objective Knowledge — Karl R. Popper
What Is Art? — Leo Tolstoy
Paradise Lost and Paradise Regained — John Milton
Fashionable Nonsense — Alan Sokal & Jean Bricmont
The Iliad — Homer
Naked Lunch — William S. Burroughs
Hannibal — Thomas Harris
The Silence of the Lambs — Thomas Harris
Hannibal Rising — Thomas Harris
Red Dragon — Thomas Harris
The Open Society and Its Enemies — Karl R. Popper
Mesmerism: The Discovery of Animal Magnetism — Franz Anton Mesmer
The Iliad — Homer
The Open Society and Its Enemies, Vol. 2: Hegel and Marx — Karl Popper
Burning Chrome — William Gibson
Mona Lisa Overdrive — William Gibson
Count Zero — William Gibson
The Trial — Franz Kafka
The Death of Ivan Ilyich and Other Stories — Leo Tolstoy
Nineteen Eighty-Four — George Orwell
The Doors of Perception and Heaven and Hell — Aldous Huxley
Brave New World — Aldous Huxley
A Clockwork Orange — Anthony Burgess
Aphorisms on Love and Hate — Friedrich Nietzsche
Jitterbug Perfume — Tom Robbins
Notes from Underground and The Double — Fyodor Dostoevsky
Psychotic States — Herbert Rosenfeld
History of Western Philosophy — Bertrand Russell
Chess — Stefan Zweig
The God Delusion — Richard Dawkins
The Screwtape Letters — C. S. Lewis
The Importance of Being Earnest and Other Plays — Oscar Wilde
Heart of Darkness and Other Tales — Joseph Conrad
The Odyssey — Homer
The Pale King — David Foster Wallace
The Moviegoer — Walker Percy
Providence — Alan Moore
Around the World in Eighty Days — Jules Verne
Human Action: A Treatise on Economics — Ludwig von Mises
The Interpretation of Dreams — Sigmund Freud
Notable Cricket Quotations — Irving Rosenwater
The Great Economists — Linda Yueh
War and Peace — Leo Tolstoy
JoJo’s Bizarre Adventure: Part 2 — Hirohiko Araki
Death Note: Black Edition I — Tsugumi Ohba & Takeshi Obata
The Creative Gene — Hideo Kojima
The Prophecies — Nostradamus
The History of the Peloponnesian War — Thucydides
Pear’s Cyclopaedia 1973–1974 — author/editor unclear
Taming the Inverse and Forward Problems in Density Functional Theory — N. Woods
Boxing: An Illustrated History — Harry Carpenter
Vatican City — Francesco Roncalli
The Lake District from the Air — author unclear
Paradise Lost — John Milton
Story of the Eye — Georges Bataille
The Art of Doing Science and Engineering: Learning to Learn — Richard W. Hamming
The Silmarillion — J. R. R. Tolkien
Unsolved Problems in Intuitive Mathematics — H. T. Croft & R. K. Guy [possibly additional author; spine unclear]
The Road to Reality — Roger Penrose
The Will to Power — Friedrich Nietzsche
Animal Farm — George Orwell
Notes of a Dirty Old Man — Charles Bukowski
The History of Philosophy — A. C. Grayling
How to Teach Quantum Physics to Your Dog — Chad Orzel
The Origin of Species — Charles Darwin
A Guide to Feynman Diagrams in the Many-Body Problem — Richard D. Mattuck
Horus Rising — Dan Abnett
False Gods — Graham McNeill
A Universe from Nothing — Lawrence M. Krauss
Mere Christianity — C. S. Lewis
The Principia: Mathematical Principles of Natural Philosophy — Isaac Newton
Gödel, Escher, Bach: An Eternal Golden Braid — Douglas R. Hofstadter
Principles of Mathematics — Bertrand Russell
The Emperor’s New Mind — Roger Penrose
Critique of Pure Reason — Immanuel Kant
The Master and Margarita — Mikhail Bulgakov
Mythos — Stephen Fry
A Tale of Two Cities — Charles Dickens
American Psycho — Bret Easton Ellis
The Great Philosophers — Peter Vardy
The Philosophy of Redemption — Philipp Mainländer
A Beginner’s Guide to Mathematical Logic — Raymond Smullyan
The Joyous Science — Friedrich Nietzsche
The Conquest of Happiness — Bertrand Russell
Manga in Theory and Practice — Hirohiko Araki
My View of the World — Erwin Schrödinger
The Peregrine: The Hill of Summer & Diaries — J. A. Baker
The Emperor’s New Mind — Roger Penrose
Candide, or Optimism — Voltaire
Everything and More — David Foster Wallace
Lectures on the Philosophy of Mathematics — Joel David Hamkins
Nature and the Greeks and Science and Humanism — Erwin Schrödinger
The Office: The Scripts, Series 1 — Ricky Gervais & Stephen Merchant
Quantum Computing Since Democritus — Scott Aaronson
The Hero with a Thousand Faces — Joseph Campbell
The Castle — Franz Kafka
Nietzsche on Wagner — Friedrich Nietzsche
Against Method — Paul Feyerabend
The Metamorphosis — Franz Kafka
The Theatre and Its Double — Antonin Artaud
Crash — J. G. Ballard
Flowers for Algernon — Daniel Keyes
Consider the Lobster and Other Essays — David Foster Wallace
Logical Properties — Colin McGinn
A Modest Proposal and Other Writings — Jonathan Swift
Anna Karenina — Leo Tolstoy
The Odyssey — Homer
In Watermelon Sugar — Richard Brautigan
Jason and the Golden Fleece — Apollonius of Rhodes
Moonchild — Aleister Crowley
Magick in Theory and Practice — Aleister Crowley
Esotericism in Western Culture — Wouter J. Hanegraaff
Selections from Science and Sanity — Alfred Korzybski
Dream Story — Arthur Schnitzler
Sade: The Libertine Novels — John Phillips
The Magic Mountain — Thomas Mann
Death in Venice and Other Stories — Thomas Mann
HR Giger — Hans Werner Holzwarth (ed.)
Juliette — Marquis de Sade
The Crying of Lot 49 — Thomas Pynchon
Venus in Furs — Leopold von Sacher-Masoch
The Idiot — Fyodor Dostoyevsky
Neuromancer — William Gibson
Harry Potter and the Philosopher’s Stone — J. K. Rowling
Harry Potter and the Chamber of Secrets — J. K. Rowling
Harry Potter and the Prisoner of Azkaban — J. K. Rowling
Harry Potter and the Goblet of Fire — J. K. Rowling
Harry Potter and the Order of the Phoenix — J. K. Rowling
Harry Potter and the Half-Blood Prince — J. K. Rowling
Harry Potter and the Deathly Hallows — J. K. Rowling
The Bad Beginning — Lemony Snicket
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
