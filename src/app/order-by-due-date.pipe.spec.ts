import { OrderByDueDatePipe } from './order-by-due-date.pipe';

describe('OrderByDueDatePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByDueDatePipe();
    expect(pipe).toBeTruthy();
  });
});
