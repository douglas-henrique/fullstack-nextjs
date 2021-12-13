import { render, screen } from '@testing-library/react'
import CustomRow from '../'

describe('<CustomRow />', () => {
  it('should render the heading', () => {
    const { container } = render(<CustomRow />)

    expect(screen.getByRole('heading', { name: /CustomRow/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
