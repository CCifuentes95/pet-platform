const services = [
  {
    name: "Bath & Brush",
    description: "Full bath, blow dry, and brush-out for a clean, fresh coat.",
    duration: "60 min",
    price: "$45",
  },
  {
    name: "Full Groom",
    description: "Bath, haircut, nail trim, ear cleaning, and finishing touches.",
    duration: "90 min",
    price: "$75",
  },
  {
    name: "Nail Trim",
    description: "Quick nail clipping and filing to keep paws comfortable.",
    duration: "15 min",
    price: "$18",
  },
  {
    name: "Puppy First Groom",
    description: "Gentle intro session designed for pups visiting the salon for the first time.",
    duration: "45 min",
    price: "$40",
  },
];

const steps = [
  {
    step: "1",
    title: "Pick a Service",
    description: "Browse our grooming packages and choose what your pet needs.",
  },
  {
    step: "2",
    title: "Choose a Time",
    description: "See real-time availability and book a slot that works for you.",
  },
  {
    step: "3",
    title: "Drop Off & Relax",
    description: "Bring your pet in and we'll handle the rest. Updates sent by email.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="max-w-lg text-5xl font-bold tracking-tight text-balance">
          Professional grooming your pet deserves
        </h1>
        <p className="mt-5 max-w-md text-lg leading-8 text-muted-foreground text-pretty">
          Book a grooming appointment online in minutes. Trusted groomers, flexible scheduling, happy pets.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/services"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Book an Appointment
          </a>
          <a
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-7 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Sign In
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border px-6 py-20" aria-labelledby="services-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="services-heading" className="text-center text-2xl font-semibold tracking-tight text-balance">
            Our Services
          </h2>
          <p className="mt-3 text-center text-muted-foreground text-pretty">
            Everything your pet needs, handled by experienced professionals.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2" role="list">
            {services.map((service) => (
              <li
                key={service.name}
                className="rounded-xl border border-border bg-card p-6 text-card-foreground"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold">{service.name}</h3>
                  <span className="shrink-0 text-sm font-medium tabular-nums">{service.price}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">{service.duration}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-muted/40 px-6 py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="how-heading" className="text-center text-2xl font-semibold tracking-tight text-balance">
            How It Works
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3" role="list">
            {steps.map((item) => (
              <li key={item.step} className="flex flex-col items-center text-center">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                >
                  {item.step}
                </span>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Pet Platform. All rights reserved.
      </footer>
    </div>
  );
}
