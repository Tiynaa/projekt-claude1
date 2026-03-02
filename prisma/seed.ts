// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Products
  const products = [
    {
      slug: 'foret-noire',
      name: 'Forêt Noire',
      subtitle: 'A walk through forgotten woods',
      notes: 'Vetiver · Smoke · Pine',
      description: "Forêt Noire opens with a breath of cold air through pine needles, drifting into a heart of wet earth and smoke. The dry-down settles into vetiver and dark wood — a fragrance that lingers like the memory of a place you've never been.",
      story: 'Inspired by the Black Forest in winter. The perfumer spent three days walking through its depths in January, collecting impressions that became this scent.',
      price: 22000,
      bottleColor: '#3D4A3E',
      stock: 45,
      featured: true,
    },
    {
      slug: 'dune-doree',
      name: 'Dune Dorée',
      subtitle: 'The warmth of golden sand at dusk',
      notes: 'Oud · Amber · Vanilla',
      description: 'Rich and enveloping, Dune Dorée is a meditation on warmth. Oud from the Middle East meets French amber and Madagascar vanilla in a composition that is simultaneously opulent and intimate.',
      story: 'Created after a journey through Oman. The scent captures that precise moment when the desert turns from gold to amber at sundown.',
      price: 26000,
      bottleColor: '#8C6A30',
      stock: 30,
      featured: true,
    },
    {
      slug: 'sel-marin',
      name: 'Sel Marin',
      subtitle: 'Salt air and open horizon',
      notes: 'Neroli · Sea Salt · White Musk',
      description: 'Sel Marin is clarity in a bottle. Neroli blossoms drift over the salinity of an Atlantic coast, lifted by a clean white musk that leaves skin smelling like morning after rain by the sea.',
      story: 'Born from a summer in Brittany. The perfumer describes it as "the feeling of standing at the edge of everything, looking out."',
      price: 19500,
      bottleColor: '#4A6B7A',
      stock: 60,
      featured: false,
    },
    {
      slug: 'rose-obscure',
      name: 'Rose Obscure',
      subtitle: 'The dark side of beauty',
      notes: 'Bulgarian Rose · Suede · Black Pepper',
      description: 'This is not a gentle rose. Rose Obscure takes the queen of flowers and places her in shadow — surrounded by suede, dusted with black pepper, anchored by a base of patchouli and dark woods.',
      story: 'A deliberate subversion of the rose fragrance. Created for those who find conventional florals too soft, too obvious.',
      price: 24000,
      bottleColor: '#7A3D4A',
      stock: 25,
      featured: true,
    },
    {
      slug: 'cedre-blanc',
      name: 'Cèdre Blanc',
      subtitle: 'Stillness and clarity',
      notes: 'Cedar · Iris · Vetiver',
      description: 'Cèdre Blanc is the scent of an empty room filled with light. Cedar and iris create an architectural space that feels simultaneously warm and cool, lived-in and pristine.',
      story: 'Influenced by Japanese minimalism. The perfumer worked for six months to remove every superfluous note, until only the essential remained.',
      price: 21500,
      bottleColor: '#5C5040',
      stock: 40,
      featured: false,
    },
    {
      slug: 'solstice',
      name: 'Solstice',
      subtitle: 'Light at its longest',
      notes: 'Bergamot · White Musk · Skin',
      description: 'The lightest fragrance in our collection. Solstice was designed to smell like skin — warm, clean, alive. Bergamot lifts into white musk and slowly disappears into you.',
      story: 'Created during the summer solstice in Provence. It smells like the longest day of the year feels.',
      price: 18500,
      bottleColor: '#7A6840',
      stock: 70,
      featured: false,
    },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
  }

  // Blog posts
  const posts = [
    {
      slug: 'art-of-layering-fragrances',
      title: 'The Art of Layering Fragrances',
      excerpt: 'How to combine scents to create something uniquely yours — a guide to fragrance layering for the curious nose.',
      content: `Fragrance layering is one of perfumery's great pleasures and greatest mysteries. The idea is simple: apply more than one fragrance simultaneously to create something neither could achieve alone. The practice, however, requires intuition, experimentation, and patience.

**Start with anchors**

Every layered composition needs a foundation — something that sits close to the skin and lasts. Our Forêt Noire or Dune Dorée work beautifully as base layers. Their depth and longevity give lighter fragrances something to rest upon.

**Add the middle voice**

This is where your personality enters. Rose Obscure worn over Sel Marin creates an unexpected coastal rose that shouldn't work — and does. Cèdre Blanc over Dune Dorée builds a spiced wood that transforms across the day.

**The rule of three**

Rarely does one need more than three fragrances layered. Two is often perfect. Three is the maximum before the composition becomes muddled. Think of it like cooking: restraint produces clarity.

**Application order matters**

Apply the heaviest, most complex fragrance first. Let it dry for 30 seconds. Then add lighter layers on top. This ensures each note has space to breathe before the next arrives.

**Skin chemistry is everything**

What works on paper — or on someone else — may read differently on your skin. Your body heat, pH, and natural oils change every fragrance. Experiment on your own skin, never on paper strips.

The most personal fragrance you will ever wear is one you created yourself. We encourage it.`,
      category: 'Craft',
      readTime: 6,
      published: true,
      publishedAt: new Date('2025-01-15'),
    },
    {
      slug: 'sourcing-rare-ingredients',
      title: 'Sourcing Rare Ingredients: A Journey',
      excerpt: 'From the oud forests of Assam to the rose fields of Kazanlak — how we find the world\'s finest raw materials.',
      content: `Every fragrance begins long before it reaches a perfumer's organ. It begins in a field, a forest, a distillery in a place most people will never visit. Sourcing these materials is as much an art as the blending that follows.

**Bulgarian Rose — Kazanlak Valley**

The Rose Valley of Bulgaria produces some of the finest rosa damascena in the world. The harvest window is precisely 20 days in May. Each blossom must be picked before 10am. One kilogram of absolute requires approximately 3.5 tons of petals. We work with the same family-run distillery we've sourced from since 2019.

**Oud — Assam, India**

Genuine agarwood oud is one of the most expensive raw materials in the world. The resin forms inside Aquilaria trees when they become infected with a particular mold — a process that takes decades. We source only ethically farmed oud from plantations that replant faster than they harvest.

**Vetiver — Haiti and Réunion**

Haitian vetiver has a smoky, earthy quality that differs markedly from Réunion's cleaner, more floral expression. We use both, in different formulations, for exactly this reason. The roots are steam-distilled after 18 months of growth.

**Transparency is not optional**

We believe you should know where your fragrance comes from. Every ingredient in every Sève fragrance is traceable to its source. We publish this information because the people who grow and tend these materials deserve recognition as much as the perfumers who transform them.`,
      category: 'Ingredients',
      readTime: 8,
      published: true,
      publishedAt: new Date('2025-02-03'),
    },
    {
      slug: 'fragrance-and-memory',
      title: 'Fragrance and Memory: The Science of Scent',
      excerpt: 'Why does a particular smell transport you instantly to a specific moment? The neuroscience of olfactory memory.',
      content: `Of all the senses, smell has the most direct pathway to memory. This is not metaphor — it is anatomy.

**The olfactory system**

When you inhale a scent, odor molecules travel through the nasal cavity to the olfactory epithelium, where they bind to receptor neurons. These neurons send signals directly to the olfactory bulb, which connects immediately to two critical brain regions: the amygdala (which processes emotion) and the hippocampus (which is central to memory formation).

This is why smell bypasses the rational, analytical mind in a way that sound and vision cannot. A smell does not remind you of something — it returns you to it.

**The Proustian phenomenon**

Marcel Proust described it precisely in his novel — the madeleine dipped in tea that returns the narrator entirely to his childhood in Combray. Researchers now call this involuntary autobiographical memory "the Proustian phenomenon." It is triggered more reliably and vividly by smell than by any other sense.

**Why fragrances become yours**

When you wear a perfume consistently during a particular period of your life — first love, a summer abroad, a period of great work — the scent becomes encoded alongside those memories. Returning to it years later does not merely remind you of those times. For a moment, you are there.

**Creating new memories**

This is why we believe choosing a fragrance is significant. The scent you wear today is being woven into the memories of tomorrow. Choose accordingly.`,
      category: 'Science',
      readTime: 7,
      published: true,
      publishedAt: new Date('2025-02-20'),
    },
  ]

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
  }

  console.log('✓ Database seeded successfully')
}

main().catch(console.error).finally(() => prisma.$disconnect())
