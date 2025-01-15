import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import DemoForm from '@/components/DemoForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3e8e2]">
      <Header />
      <main>
        <Hero />
        <Features />
        <DemoForm />
      </main>
      <Footer />
    </div>
  )
}

