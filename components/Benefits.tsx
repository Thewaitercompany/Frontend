export default function Benefits() {
  const benefits = [
    {
      title: "Streamline Operations",
      items: [
        "Live Inventory: Real-time stock tracking, no spreadsheets.",
        "Seamless Automation: Orders to suppliers, all in one flow.",
        "Error-Free Performance: Minimize delays and human mistakes."
      ]
    },
    {
      title: "Maximize Profits",
      items: [
        "Smart Reordering: Avoid stockouts and overordering with automated inventory updates.",
        "Waste Reduction: Align supplies with demand to cut costs and minimize waste.",
        "Built to Scale: Easily scale from a single cafe to a multi-location enterprise with TWC's flexible solutions."
      ]
    },
    {
      title: "Simplify Setup",
      items: [
        "Quick Onboarding: Get started quickly with TWC's intuitive interface, reducing training time.",
        "24/7 Expert Support: Enjoy round-the-clock assistance to maximize system benefits."
      ]
    },
    {
      title: "Dependable & Secure",
      items: [
        "Robust Security: Protect your data and operations with enhanced safeguards.",
        "Focus on Excellence: Free your team from backend logistics to prioritize exceptional food and service."
      ]
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-[#e6d7cf] p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-[#5d4d41] mb-4">{benefit.title}</h3>
              <ul className="space-y-2">
                {benefit.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-[#8c7569] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

