/**
 * App.jsx — Root application component.
 *
 * Architecture changed from vertical-scroll SPA to horizontal carousel.
 * The Carousel component composes all three slides internally.
 * Navbar and Footer are absorbed into slide-level components.
 */
import Carousel from './components/Carousel'

export default function App() {
  return <Carousel />
}
