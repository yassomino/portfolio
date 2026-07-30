import MotionProvider from '@/components/MotionProvider'
import ClickFX from '@/components/ClickFX'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <MotionProvider>
      <ClickFX />
      <Navigation />

      <main>
        <Hero />
        <Projects />
        <Experience />
        <TechStack />
        <Contact />
      </main>

      <Footer />
    </MotionProvider>
  )
}
