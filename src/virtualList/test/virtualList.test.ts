import { render } from '@testing-library/vue'
import VirtualList from '../src/virtualList'
describe('virtualList test', () => {
  test('virtualList init render', async () => {
    const { getByRole } = render(VirtualList)
    getByRole('virtualList')
  })
})
