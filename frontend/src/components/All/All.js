import Ongoing from '../Ongoing/Ongoing'
import Completed from '../Completed/Completed'
import Late from '../Late/Late'

export default function All(props) {
  return (
    <>
      <div style={{ marginBottom: 8 + 'rem' }}>
        <Ongoing />
      </div>
      <div style={{ marginBottom: 8 + 'rem' }}>
        <Completed />
      </div>
      <div style={{ marginBottom: 8 + 'rem' }}>
        <Late />
      </div>
    </>
  )
}