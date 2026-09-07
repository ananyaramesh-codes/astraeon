export type EvolutionPhase = {
  label: string
  detail: string
  active?: boolean
}

export type Connection = {
  label: string
  kind: string
  detail: string
}

export type StarData = {
  id: string
  type: "star"
  name: string
  designation: string
  pronunciation: string
  constellation: string
  distance: string
  magnitude: string
  spectralType: string
  coordinates: string
  color: string
  size: number
  /** position on the exploration map, in percent */
  map: { x: number; y: number }
  tagline: string
  story: string[]
  life: EvolutionPhase[]
  connections: Connection[]
}

export type ConstellationStar = {
  name: string
  /** 2D position as seen from Earth, in a 0-100 viewbox */
  sky: { x: number; y: number }
  /** distance in light-years, used to compute Z separation */
  lightYears: number
  magnitude: number
}

export type ConstellationData = {
  id: string
  type: "constellation"
  name: string
  designation: string
  meaning: string
  distance: string
  coordinates: string
  color: string
  map: { x: number; y: number }
  tagline: string
  story: string[]
  stars: ConstellationStar[]
  /** index pairs into `stars` defining the drawn figure */
  lines: [number, number][]
  connections: Connection[]
}

export type CelestialObject = StarData | ConstellationData

export const stars: StarData[] = [
  {
    id: "betelgeuse",
    type: "star",
    name: "Betelgeuse",
    designation: "Alpha Orionis · HR 2061",
    pronunciation: "ˈbɛtəldʒuːz",
    constellation: "Orion",
    distance: "548 light-years",
    magnitude: "+0.42 (variable)",
    spectralType: "M1–M2 Ia-ab red supergiant",
    coordinates: "05h 55m 10s · +07° 24′ 25″",
    color: "#c97b52",
    size: 26,
    map: { x: 62, y: 38 },
    tagline: "A dying giant on the shoulder of the hunter.",
    story: [
      "Betelgeuse is a star living out its final act. A red supergiant so vast that, placed where our Sun sits, its surface would swallow the orbit of Jupiter.",
      "It burns with the restless light of a star running out of fuel — brightening and dimming over months as its bloated outer layers heave and cool. In 2019 it dimmed so dramatically that astronomers wondered if the end had come. It had merely exhaled a veil of dust.",
      "When it finally collapses, it will detonate as a supernova bright enough to be seen in daylight — a farewell written across 548 years of travelling light.",
    ],
    life: [
      { label: "Stellar nursery", detail: "Born from a collapsing cloud of gas and dust roughly 10 million years ago." },
      { label: "Blue-white main sequence", detail: "Fused hydrogen fiercely as a hot, massive O-type star." },
      { label: "Red supergiant", detail: "Swollen and cooled, fusing heavier elements in shells. It is here now.", active: true },
      { label: "Core collapse", detail: "Iron core gives way, triggering a Type II supernova." },
      { label: "Neutron star", detail: "A city-sized remnant left glowing in an expanding nebula." },
    ],
    connections: [
      { label: "Orion", kind: "Constellation", detail: "Marks the hunter's right shoulder." },
      { label: "Future supernova", kind: "Event", detail: "Will briefly outshine every star in the night sky." },
      { label: "Rigel", kind: "Counterpart", detail: "The cool giant answering Orion's hot blue foot." },
    ],
  },
  {
    id: "sirius",
    type: "star",
    name: "Sirius",
    designation: "Alpha Canis Majoris · HR 2491",
    pronunciation: "ˈsɪriəs",
    constellation: "Canis Major",
    distance: "8.6 light-years",
    magnitude: "−1.46",
    spectralType: "A1 V main sequence",
    coordinates: "06h 45m 09s · −16° 42′ 58″",
    color: "#dfeaf4",
    size: 30,
    map: { x: 30, y: 66 },
    tagline: "The brightest star in the night sky, and one of the nearest.",
    story: [
      "Sirius blazes brighter than any other star we can see — not because it is extraordinary, but because it is close. Only eight and a half light-years away, its clean white light has guided navigators and calendars for millennia.",
      "The ancient Egyptians timed the flooding of the Nile to its dawn return. The Greeks named the sweltering weeks of its reappearance the 'dog days'.",
      "It hides a secret companion: Sirius B, a white dwarf no larger than Earth yet nearly as heavy as the Sun — the burnt-out heart of a star that died before ours was old.",
    ],
    life: [
      { label: "Formation", detail: "Condensed from a molecular cloud around 240 million years ago." },
      { label: "Main sequence", detail: "Steadily fusing hydrogen as a hot A-type star.", active: true },
      { label: "Subgiant expansion", detail: "Will swell and cool in roughly a billion years." },
      { label: "Red giant", detail: "Outer layers drift away as a planetary nebula." },
      { label: "White dwarf", detail: "Follows its companion into a slow cosmic cooling." },
    ],
    connections: [
      { label: "Sirius B", kind: "Companion", detail: "An Earth-sized white dwarf orbiting every 50 years." },
      { label: "Canis Major", kind: "Constellation", detail: "The greater dog following Orion across the sky." },
      { label: "The dog days", kind: "Culture", detail: "Named for its heliacal rising in late summer." },
    ],
  },
  {
    id: "rigel",
    type: "star",
    name: "Rigel",
    designation: "Beta Orionis · HR 1713",
    pronunciation: "ˈraɪdʒəl",
    constellation: "Orion",
    distance: "863 light-years",
    magnitude: "+0.13",
    spectralType: "B8 Ia blue supergiant",
    coordinates: "05h 14m 32s · −08° 12′ 06″",
    color: "#9fc4ff",
    size: 24,
    map: { x: 74, y: 62 },
    tagline: "A blue-white beacon burning tens of thousands of times brighter than the Sun.",
    story: [
      "Rigel is Orion's brilliant foot — a blue supergiant pouring out light with a ferocity our Sun could never match. If it stood where the Sun does, its glare would fill the daytime sky.",
      "Its heat gives it that cold blue-white hue, the signature of a surface many times hotter than our own star. Youth spent lavishly, it too is bound for a violent end.",
      "Though it appears as one point of light, Rigel is a system of several stars, its faint companions lost in the primary's overwhelming glow.",
    ],
    life: [
      { label: "Massive birth", detail: "Formed just 8 million years ago from a dense cloud." },
      { label: "Blue supergiant", detail: "Fusing helium and heavier elements at tremendous rate.", active: true },
      { label: "Red supergiant phase", detail: "May swell and redden as its core evolves." },
      { label: "Supernova", detail: "Ends in a catastrophic core-collapse explosion." },
      { label: "Compact remnant", detail: "Leaves behind a neutron star or black hole." },
    ],
    connections: [
      { label: "Orion", kind: "Constellation", detail: "Anchors the hunter's raised foot." },
      { label: "Betelgeuse", kind: "Counterpart", detail: "The hot blue answer to Orion's cool red shoulder." },
      { label: "Rigel B/C", kind: "Companions", detail: "A tight cluster of dimmer stellar siblings." },
    ],
  },
  {
    id: "polaris",
    type: "star",
    name: "Polaris",
    designation: "Alpha Ursae Minoris · HR 424",
    pronunciation: "poʊˈlɛərɪs",
    constellation: "Ursa Minor",
    distance: "433 light-years",
    magnitude: "+1.98 (variable)",
    spectralType: "F7 Ib supergiant",
    coordinates: "02h 31m 49s · +89° 15′ 51″",
    color: "#fbe9c4",
    size: 22,
    map: { x: 46, y: 16 },
    tagline: "The still point of the turning sky — the North Star.",
    story: [
      "Almost directly above Earth's northern axis, Polaris barely moves as the heavens wheel around it. For navigators and wanderers it has meant one thing above all: this way is north.",
      "It is not a single star but a small family, led by a rhythmically pulsing yellow supergiant — a Cepheid whose steady beat helps astronomers measure the distances of galaxies.",
      "Its stillness is temporary. Earth's slow wobble means that over thousands of years the pole drifts, and other stars have held — and will hold — the title of North Star.",
    ],
    life: [
      { label: "Formation", detail: "Condensed from interstellar gas long before recorded history." },
      { label: "Cepheid supergiant", detail: "A pulsating yellow supergiant used as a cosmic yardstick.", active: true },
      { label: "Continued expansion", detail: "Will keep evolving through unstable giant phases." },
      { label: "Shell shedding", detail: "Sheds outer layers as fusion falters." },
      { label: "Stellar remnant", detail: "Fades toward a slow, quiet end." },
    ],
    connections: [
      { label: "Ursa Minor", kind: "Constellation", detail: "Tips the handle of the Little Dipper." },
      { label: "Celestial pole", kind: "Geometry", detail: "Sits within one degree of true north." },
      { label: "Cepheid ladder", kind: "Science", detail: "Its pulses calibrate distances across the universe." },
    ],
  },
]

export const constellations: ConstellationData[] = [
  {
    id: "orion",
    type: "constellation",
    name: "Orion",
    designation: "The Hunter · Ori",
    meaning: "The hunter of Greek myth, striding across the winter sky",
    distance: "243 – 1,340 light-years across",
    coordinates: "05h 30m · +00°",
    color: "#a28157",
    map: { x: 68, y: 50 },
    tagline: "A figure of stars that only looks like a figure from here.",
    story: [
      "Orion is the most recognised pattern in the night sky — a hunter drawn in first-magnitude stars, his belt of three a signpost visible from nearly everywhere on Earth.",
      "But the hunter is an illusion of perspective. The stars that trace his shape lie at wildly different distances, from 240 to over 1,300 light-years away. They form a figure only because we happen to view them from this one point in the galaxy.",
      "Toggle between the sky we know and the truth of space, and watch the hunter come apart — nine stars scattered across a thousand light-years, briefly aligned for our eyes alone.",
    ],
    stars: [
      { name: "Betelgeuse", sky: { x: 30, y: 20 }, lightYears: 548, magnitude: 0.42 },
      { name: "Bellatrix", sky: { x: 66, y: 24 }, lightYears: 250, magnitude: 1.64 },
      { name: "Alnitak", sky: { x: 40, y: 52 }, lightYears: 1260, magnitude: 1.77 },
      { name: "Alnilam", sky: { x: 50, y: 54 }, lightYears: 1340, magnitude: 1.69 },
      { name: "Mintaka", sky: { x: 60, y: 56 }, lightYears: 1200, magnitude: 2.23 },
      { name: "Saiph", sky: { x: 38, y: 84 }, lightYears: 650, magnitude: 2.09 },
      { name: "Rigel", sky: { x: 66, y: 86 }, lightYears: 863, magnitude: 0.13 },
    ],
    // Betelgeuse-Bellatrix (shoulders), shoulders to belt, belt, belt to feet, feet
    lines: [
      [0, 1],
      [0, 2],
      [1, 4],
      [2, 3],
      [3, 4],
      [2, 5],
      [4, 6],
      [5, 6],
    ],
    connections: [
      { label: "Betelgeuse", kind: "Member star", detail: "The red supergiant shoulder, bound for supernova." },
      { label: "Rigel", kind: "Member star", detail: "The blue supergiant foot, brightest in the figure." },
      { label: "Orion Nebula", kind: "Deep sky", detail: "A stellar nursery hanging from the hunter's sword." },
    ],
  },
]

export const celestialObjects: CelestialObject[] = [...stars, ...constellations]

export function findObject(id: string): CelestialObject | undefined {
  return celestialObjects.find((o) => o.id === id)
}
